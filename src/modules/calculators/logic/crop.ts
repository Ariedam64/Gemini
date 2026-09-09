// src/modules/calculators/crop.ts
// Crop calculation utilities - verified from game source

import { MGData } from '../../data';
import { calculateMutationMultiplier } from './mutation';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface CropBaseData {
  baseSellPrice: number;
  baseWeight: number;
  maxSizeMultiplier: number;
  growTime: number;
}

/** Lowest Crop Size the game stores on a grow slot. */
export const CROP_SIZE_MIN = 50;
/** Highest Crop Size the game stores on a grow slot. */
export const CROP_SIZE_MAX = 100;

const SIZE_SPAN = CROP_SIZE_MAX - CROP_SIZE_MIN;

/** Lower bound of the pre-rework fractional scale. */
const LEGACY_SCALE_MIN = 1;

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Normalize a grow slot's Crop Size to the whole number in [50, 100] the game
 * itself uses for value, visuals and boosts.
 *
 * A slot now carries that number directly in `size`. Anything below 50 is a
 * pre-rework fractional `targetScale` (1 → `maxSizeMultiplier`) and is
 * converted back, so replayed captures and stale clients still resolve.
 *
 * @param species Crop species name
 * @param size Crop Size (50-100), or a legacy fractional scale
 * @returns Crop Size (50-100)
 */
export function calculateCropSize(species: string, size: number): number {
  if (!Number.isFinite(size)) return CROP_SIZE_MIN;
  if (size >= CROP_SIZE_MIN) return clampCropSize(size);

  // Legacy fractional scale.
  const plantData = getCropData(species);
  const maxMultiplier = plantData?.maxSizeMultiplier ?? 1;
  if (maxMultiplier <= LEGACY_SCALE_MIN) return CROP_SIZE_MIN;

  const clamped = Math.min(maxMultiplier, Math.max(LEGACY_SCALE_MIN, size));
  const progress = (clamped - LEGACY_SCALE_MIN) / (maxMultiplier - LEGACY_SCALE_MIN);
  return clampCropSize(CROP_SIZE_MIN + progress * SIZE_SPAN);
}

/**
 * Clamp a raw value the way the game does before using it as a Crop Size.
 */
export function clampCropSize(size: number): number {
  if (!Number.isFinite(size)) return CROP_SIZE_MIN;
  return Math.min(CROP_SIZE_MAX, Math.max(CROP_SIZE_MIN, Math.round(size)));
}

/**
 * Coin/weight/visual multiplier the game derives from a crop's Size.
 *
 * Formula: 1 + (maxSizeMultiplier - 1) × (size - 50) / 50
 * So Size 50 is worth 1× base and Size 100 is worth `maxSizeMultiplier`× base.
 *
 * @param species Crop species name
 * @param size Crop Size (50-100)
 * @returns Multiplier (1 - maxSizeMultiplier)
 */
export function calculateCropSizeMultiplier(species: string, size: number): number {
  const plantData = getCropData(species);
  if (!plantData) return 1;

  const maxMultiplier = plantData.maxSizeMultiplier;
  if (!(maxMultiplier > 1)) return 1;

  const progress = (calculateCropSize(species, size) - CROP_SIZE_MIN) / SIZE_SPAN;
  return 1 + (maxMultiplier - 1) * progress;
}

/**
 * Calculate a crop's weight from its Size
 *
 * Formula: baseWeight × sizeMultiplier
 *
 * @param species Crop species name
 * @param size Crop Size (50-100)
 * @returns Weight in kg, or 0 when the species is unknown
 */
export function calculateCropWeight(species: string, size: number): number {
  const plantData = getCropData(species);
  if (!plantData) return 0;

  return plantData.baseWeight * calculateCropSizeMultiplier(species, size);
}

/**
 * Calculate crop sell price based on Size and mutations
 *
 * Formula: baseSellPrice × sizeMultiplier × mutationMultiplier
 *
 * @param species Crop species name
 * @param size Crop Size (50-100)
 * @param mutations Array of mutation names
 * @returns Sell price in coins
 */
export function calculateCropSellPrice(
  species: string,
  size: number,
  mutations: string[]
): number {
  const plantData = getCropData(species);
  if (!plantData) return 0;

  const baseSellPrice = plantData.baseSellPrice;
  const sizeMultiplier = calculateCropSizeMultiplier(species, size);
  const mutationMultiplier = calculateMutationMultiplier(mutations);

  return Math.round(baseSellPrice * sizeMultiplier * mutationMultiplier);
}

/**
 * Calculate crop growth progress (0-100)
 *
 * @param startTime Crop plant time (timestamp)
 * @param endTime Crop ready time (timestamp)
 * @param currentTime Current time (timestamp)
 * @returns Progress percentage (0-100)
 */
export function calculateCropProgress(
  startTime: number,
  endTime: number,
  currentTime: number
): number {
  if (currentTime >= endTime) return 100;
  if (currentTime <= startTime) return 0;

  const duration = endTime - startTime;
  const elapsed = currentTime - startTime;
  return Math.floor((elapsed / duration) * 100);
}

/**
 * Check if crop is ready to harvest
 *
 * @param endTime Crop ready time (timestamp)
 * @param currentTime Current time (timestamp)
 * @returns True if ready
 */
export function isCropReady(endTime: number, currentTime: number): boolean {
  return currentTime >= endTime;
}

/**
 * Calculate time remaining until crop is ready
 *
 * @param endTime Crop ready time (timestamp)
 * @param currentTime Current time (timestamp)
 * @returns Seconds remaining (0 if ready)
 */
export function calculateTimeRemaining(endTime: number, currentTime: number): number {
  const remaining = Math.max(0, endTime - currentTime);
  return Math.floor(remaining / 1000);
}

/**
 * Get crop base data from MGData catalog
 *
 * @param species Crop species name
 * @returns Base crop data or null if not found
 */
export function getCropData(species: string): CropBaseData | null {
  const plantsData = MGData.get('plants');
  if (!plantsData) return null;

  const plantData = plantsData[species] as any;
  if (!plantData?.crop) return null;

  return {
    baseSellPrice: plantData.crop.baseSellPrice ?? 0,
    baseWeight: plantData.crop.baseWeight ?? 0,
    // `maxScale` is the pre-rework name, kept as a fallback for stale catalogs.
    maxSizeMultiplier: plantData.crop.maxSizeMultiplier ?? plantData.crop.maxScale ?? 1,
    growTime: plantData.crop.growTime ?? 0,
  };
}

/**
 * Calculate total value of multiple crops
 *
 * @param crops Array of {species, size, mutations}
 * @returns Total sell price
 */
export function calculateTotalCropValue(
  crops: Array<{ species: string; size: number; mutations: string[] }>
): number {
  return crops.reduce(
    (total, crop) => total + calculateCropSellPrice(crop.species, crop.size, crop.mutations),
    0
  );
}