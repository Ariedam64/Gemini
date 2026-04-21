/**
 * Calculators Module - Public API
 *
 * Provides game calculation utilities for crops, pets, mutations, XP, and feeds.
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
export * from './logic/petHutch';
// Note: xp and feed are exported as namespaces only (via MGCalculators.xp/feed)
// to avoid naming conflicts with pet.ts functions

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
  calculatePetDustValue,
} from './logic/pet';

import {
  calculateHutchCapacity,
  getNextHutchUpgrade,
} from './logic/petHutch';

import {
  calculateMutationMultiplier,
  getMutationValue,
  isGrowthMutation,
  isEnvironmentalMutation,
} from './logic/mutation';

import * as xp from './logic/xp';
import * as feed from './logic/feed';

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
    calculateDustValue: calculatePetDustValue,
  },

  // ─── Pet Hutch Calculators ───
  petHutch: {
    calculateCapacity: calculateHutchCapacity,
    getNextUpgrade: getNextHutchUpgrade,
  },

  // ─── Mutation Calculators ───
  mutation: {
    calculateMultiplier: calculateMutationMultiplier,
    getValue: getMutationValue,
    isGrowth: isGrowthMutation,
    isEnvironmental: isEnvironmentalMutation,
  },

  // ─── XP Calculators ───
  xp,

  // ─── Feed Calculators ───
  feed,
} as const;
