// src/modules/calculators/pet.ts
// Pet calculation utilities - verified from game source

import { MGData } from "../core/data";

// ─────────────────────────────────────────────────────────────────────────────
// Constants from game source
// Source: common/games/Quinoa/utils/pets.ts
// ─────────────────────────────────────────────────────────────────────────────

const XP_PER_HOUR = 3600;
const BASE_TARGET_STRENGTH = 80;
const MAX_TARGET_STRENGTH = 100;
const STRENGTH_GAINED = 30;

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface PetBaseData {
  hoursToMature: number;
  maxScale: number;
  abilities: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calculate pet age in hours
 *
 * From game source: common/games/Quinoa/utils/pets.ts
 *
 * Formula: xp / 3600
 *
 * @param xp Pet XP value
 * @returns Age in hours
 */
export function calculatePetAge(xp: number): number {
  return xp / XP_PER_HOUR;
}

/**
 * Calculate max strength based on targetScale (80-100)
 *
 * From game source: common/games/Quinoa/utils/pets.ts
 *
 * Formula:
 * - targetScale 1.0 = 80 strength
 * - targetScale maxScale = 100 strength
 * - Linear interpolation between 80-100
 *
 * @param species Pet species name
 * @param targetScale Target scale value (1.0 - maxScale)
 * @returns Max strength (80-100)
 */
export function calculateMaxStrength(species: string, targetScale: number): number {
  const petData = getPetData(species);
  if (!petData) return BASE_TARGET_STRENGTH;

  const maxScale = petData.maxScale;

  // Scale 1.0 = 80 strength
  if (targetScale <= 1) return BASE_TARGET_STRENGTH;

  // Max scale = 100 strength
  if (targetScale >= maxScale) return MAX_TARGET_STRENGTH;

  // Linear interpolation between 80-100
  const progress = (targetScale - 1) / (maxScale - 1);
  return Math.floor(BASE_TARGET_STRENGTH + 20 * progress);
}

/**
 * Calculate current strength based on XP
 *
 * From game source: common/games/Quinoa/utils/pets.ts
 *
 * Formula:
 * - hoursGrown = xp / 3600
 * - strengthPerHour = 30 / hoursToMature
 * - strengthGained = min(strengthPerHour × hoursGrown, 30)
 * - startingStrength = maxStrength - 30
 * - currentStrength = floor(startingStrength + strengthGained)
 *
 * @param species Pet species name
 * @param xp Pet XP value
 * @param maxStrength Max strength (from calculateMaxStrength)
 * @returns Current strength (50-100)
 */
export function calculateCurrentStrength(
  species: string,
  xp: number,
  maxStrength: number
): number {
  const petData = getPetData(species);
  if (!petData) return maxStrength - STRENGTH_GAINED;

  const hoursToMature = petData.hoursToMature;
  const hoursGrown = xp / XP_PER_HOUR;

  const strengthPerHour = STRENGTH_GAINED / hoursToMature;
  const strengthGained = Math.min(strengthPerHour * hoursGrown, STRENGTH_GAINED);

  const startingStrength = maxStrength - STRENGTH_GAINED;
  return Math.floor(startingStrength + strengthGained);
}

/**
 * Check if pet is mature
 *
 * @param species Pet species name
 * @param age Pet age in hours
 * @returns True if mature
 */
export function isPetMature(species: string, age: number): boolean {
  const petData = getPetData(species);
  if (!petData) return false;

  return age >= petData.hoursToMature;
}

/**
 * Calculate strength gain per hour
 *
 * @param species Pet species name
 * @returns Strength per hour
 */
export function calculateStrengthPerHour(species: string): number {
  const petData = getPetData(species);
  if (!petData) return 0;

  return STRENGTH_GAINED / petData.hoursToMature;
}

/**
 * Calculate hours remaining to reach max strength
 *
 * @param currentStrength Current strength value
 * @param maxStrength Max strength value
 * @param strengthPerHour Strength gain per hour
 * @returns Hours remaining
 */
export function calculateHoursToMaxStrength(
  currentStrength: number,
  maxStrength: number,
  strengthPerHour: number
): number {
  const strengthRemaining = maxStrength - currentStrength;
  if (strengthRemaining <= 0) return 0;
  if (strengthPerHour <= 0) return 0;

  return strengthRemaining / strengthPerHour;
}

/**
 * Calculate time until pet matures
 *
 * @param species Pet species name
 * @param currentAge Current age in hours
 * @returns Hours until mature (0 if already mature)
 */
export function calculateHoursToMature(species: string, currentAge: number): number {
  const petData = getPetData(species);
  if (!petData) return 0;

  const remaining = petData.hoursToMature - currentAge;
  return Math.max(0, remaining);
}

/**
 * Get pet base data from MGData catalog
 *
 * @param species Pet species name
 * @returns Base pet data or null if not found
 */
export function getPetData(species: string): PetBaseData | null {
  const petsData = MGData.get('pets');
  if (!petsData) return null;

  const petData = petsData[species] as any;
  if (!petData) return null;

  return {
    hoursToMature: petData.hoursToMature ?? 0,
    maxScale: petData.maxScale ?? 1,
    abilities: petData.abilities ?? [],
  };
}

/**
 * Calculate strength progress (0-1)
 *
 * @param currentStrength Current strength
 * @param maxStrength Max strength
 * @returns Progress ratio (0-1)
 */
export function calculateStrengthProgress(
  currentStrength: number,
  maxStrength: number
): number {
  if (maxStrength <= 0) return 1;
  return Math.min(1, currentStrength / maxStrength);
}