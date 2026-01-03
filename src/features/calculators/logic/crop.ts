// src/features/calculators/crop.ts
// Crop calculation utilities - verified from game source

import { MGData } from '../../../modules';
import { calculateMutationMultiplier } from './mutation';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface CropBaseData {
  baseSellPrice: number;
  maxScale: number;
  growTime: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calculate crop size (50-100) based on targetScale
 *
 * From game source: common/games/Quinoa/systems/flora/utils/getTargetSize.ts
 *
 * Formula:
 * - targetScale 1.0 = 50% size
 * - targetScale maxScale = 100% size
 * - Linear interpolation between 50-100
 *
 * @param species Crop species name
 * @param targetScale Target scale value (1.0 - maxScale)
 * @returns Size percentage (50-100)
 */
export function calculateCropSize(species: string, targetScale: number): number {
  const plantData = getCropData(species);
  if (!plantData) return 50;

  const maxScale = plantData.maxScale;

  // Scale 1.0 = 50% size
  if (targetScale <= 1) return 50;

  // Max scale = 100% size
  if (targetScale >= maxScale) return 100;

  // Linear interpolation between 50-100
  const progress = (targetScale - 1) / (maxScale - 1);
  return Math.floor(50 + 50 * progress);
}

/**
 * Calculate crop sell price based on targetScale and mutations
 *
 * From game source: common/games/Quinoa/utils/produce.ts
 *
 * Formula: baseSellPrice × targetScale × mutationMultiplier
 *
 * @param species Crop species name
 * @param targetScale Target scale value
 * @param mutations Array of mutation names
 * @returns Sell price in coins
 */
export function calculateCropSellPrice(
  species: string,
  targetScale: number,
  mutations: string[]
): number {
  const plantData = getCropData(species);
  if (!plantData) return 0;

  const baseSellPrice = plantData.baseSellPrice;
  const mutationMultiplier = calculateMutationMultiplier(mutations);

  return Math.round(baseSellPrice * targetScale * mutationMultiplier);
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
    maxScale: plantData.crop.maxScale ?? 1,
    growTime: plantData.crop.growTime ?? 0,
  };
}

/**
 * Calculate total value of multiple crops
 *
 * @param crops Array of {species, targetScale, mutations}
 * @returns Total sell price
 */
export function calculateTotalCropValue(
  crops: Array<{ species: string; targetScale: number; mutations: string[] }>
): number {
  return crops.reduce(
    (total, crop) =>
      total + calculateCropSellPrice(crop.species, crop.targetScale, crop.mutations),
    0
  );
}