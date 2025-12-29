// src/modules/core/calculators/index.ts
// Calculator modules - Reusable game calculation utilities

// ─────────────────────────────────────────────────────────────────────────────
// Export all calculator modules
// ─────────────────────────────────────────────────────────────────────────────

export * from './crop';
export * from './pet';
export * from './mutation';

// ─────────────────────────────────────────────────────────────────────────────
// Re-export commonly used functions for convenience
// ─────────────────────────────────────────────────────────────────────────────

export {
  // Crop calculators
  calculateCropSize,
  calculateCropSellPrice,
  calculateCropProgress,
  isCropReady,
  getCropData,
} from './crop';

export {
  // Pet calculators
  calculatePetAge,
  calculateMaxStrength,
  calculateCurrentStrength,
  isPetMature,
  calculateStrengthPerHour,
  getPetData,
} from './pet';

export {
  // Mutation calculators
  calculateMutationMultiplier,
  getMutationValue,
  isGrowthMutation,
  isEnvironmentalMutation,
} from './mutation';