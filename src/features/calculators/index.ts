/**
 * Calculators Module - Public API
 * 
 * Provides game calculation utilities for crops, pets, and mutations.
 * These are pure utility functions that don't require initialization.
 * 
 * @module MGCalculators
 */

// ─────────────────────────────────────────────────────────────────────────────
// Export all calculator modules
// ─────────────────────────────────────────────────────────────────────────────

export * from './logic/crop';
export * from './logic/pet';
export * from './logic/mutation';

// ─────────────────────────────────────────────────────────────────────────────
// MGCalculators API
// ─────────────────────────────────────────────────────────────────────────────

import {
  calculateCropSize,
  calculateCropSellPrice,
  calculateCropProgress,
  isCropReady,
  getCropData,
} from './logic/crop';

import {
  calculatePetAge,
  calculateMaxStrength,
  calculateCurrentStrength,
  isPetMature,
  calculateStrengthPerHour,
  getPetData,
} from './logic/pet';

import {
  calculateMutationMultiplier,
  getMutationValue,
  isGrowthMutation,
  isEnvironmentalMutation,
} from './logic/mutation';

/**
 * Calculators Module
 * 
 * Note: This is a utility module with pure functions.
 * init()/isReady() are provided for API consistency but are no-ops.
 * 
 * @module MGCalculators
 */
export const MGCalculators = {
  // ─── Required Module API ───
  init(): void { /* no-op: pure utility functions */ },
  isReady(): boolean { return true; },

  // ─── Crop Calculators ───
  crop: {
    calculateSize: calculateCropSize,
    calculateSellPrice: calculateCropSellPrice,
    calculateProgress: calculateCropProgress,
    isReady: isCropReady,
    getData: getCropData,
  },

  // ─── Pet Calculators ───
  pet: {
    calculateAge: calculatePetAge,
    calculateMaxStrength: calculateMaxStrength,
    calculateCurrentStrength: calculateCurrentStrength,
    isMature: isPetMature,
    calculateStrengthPerHour: calculateStrengthPerHour,
    getData: getPetData,
  },

  // ─── Mutation Calculators ───
  mutation: {
    calculateMultiplier: calculateMutationMultiplier,
    getValue: getMutationValue,
    isGrowth: isGrowthMutation,
    isEnvironmental: isEnvironmentalMutation,
  },
} as const;