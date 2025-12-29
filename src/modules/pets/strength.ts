// src/modules/core/petStrength.ts
// Pet Strength Helper - Enrichment utilities for UnifiedPet data
// Refactored to use calculator modules

import type { UnifiedPet } from '../../globals/core/types';
import {
  calculatePetAge,
  calculateMaxStrength,
  calculateCurrentStrength,
  isPetMature,
  calculateStrengthPerHour,
  calculateHoursToMaxStrength,
  calculateStrengthProgress,
} from '../calculators';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface PetStrengthData {
  current: number;        // Current strength (50-100)
  max: number;            // Max strength based on targetScale (80-100)
  progress: number;       // Progress to max (0-1)
  age: number;            // Age in hours
  isMature: boolean;      // Has reached maturity
  strengthPerHour: number; // Strength gained per hour
  hoursToMax: number;     // Hours remaining to reach max strength
}

export interface EnrichedPet extends UnifiedPet {
  strength: PetStrengthData;
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calculate comprehensive strength data for a pet
 * Uses calculator modules for all calculations
 */
export function calculatePetStrength(pet: UnifiedPet): PetStrengthData {
  // Calculate using calculator modules
  const age = calculatePetAge(pet.xp);
  const max = calculateMaxStrength(pet.petSpecies, pet.targetScale);
  const current = calculateCurrentStrength(pet.petSpecies, pet.xp, max);
  const isMature = isPetMature(pet.petSpecies, age);
  const strengthPerHour = calculateStrengthPerHour(pet.petSpecies);
  const hoursToMax = calculateHoursToMaxStrength(current, max, strengthPerHour);
  const progress = calculateStrengthProgress(current, max);

  return {
    current,
    max,
    progress,
    age,
    isMature,
    strengthPerHour,
    hoursToMax,
  };
}

/**
 * Enrich a pet with strength data
 *
 * NOTE: Since UnifiedPet now includes automatic strength fields (age, currentStrength, maxStrength, isMature),
 * this function is primarily for backwards compatibility and to provide the aggregated PetStrengthData object.
 */
export function enrichPetWithStrength(pet: UnifiedPet): EnrichedPet {
  return {
    ...pet,
    strength: calculatePetStrength(pet),
  };
}

/**
 * Enrich multiple pets with strength data
 */
export function enrichPetsWithStrength(pets: UnifiedPet[]): EnrichedPet[] {
  return pets.map(enrichPetWithStrength);
}

/**
 * Get strength statistics for a collection of pets
 */
export function getPetStrengthStats(pets: UnifiedPet[]): {
  averageCurrent: number;
  averageMax: number;
  totalMature: number;
  totalImmature: number;
  strongestPet: EnrichedPet | null;
  weakestPet: EnrichedPet | null;
} {
  if (pets.length === 0) {
    return {
      averageCurrent: 0,
      averageMax: 0,
      totalMature: 0,
      totalImmature: 0,
      strongestPet: null,
      weakestPet: null,
    };
  }

  const enrichedPets = enrichPetsWithStrength(pets);

  const totalCurrent = enrichedPets.reduce((sum, p) => sum + p.strength.current, 0);
  const totalMax = enrichedPets.reduce((sum, p) => sum + p.strength.max, 0);
  const totalMature = enrichedPets.filter(p => p.strength.isMature).length;
  const totalImmature = enrichedPets.length - totalMature;

  const strongestPet = enrichedPets.reduce((strongest, pet) =>
    pet.strength.max > (strongest?.strength.max || 0) ? pet : strongest,
    enrichedPets[0]
  );

  const weakestPet = enrichedPets.reduce((weakest, pet) =>
    pet.strength.max < (weakest?.strength.max || Infinity) ? pet : weakest,
    enrichedPets[0]
  );

  return {
    averageCurrent: Math.round(totalCurrent / enrichedPets.length),
    averageMax: Math.round(totalMax / enrichedPets.length),
    totalMature,
    totalImmature,
    strongestPet,
    weakestPet,
  };
}