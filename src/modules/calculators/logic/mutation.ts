// src/modules/calculators/mutation.ts
// Mutation calculation utilities - verified from game source

import { MGData } from '../../data';

/**
 * Fallback mutation values (used if MGData is unavailable)
 * Source: Game source files - mutationsDex.ts
 *
 * NOTE: Internal IDs differ from display names:
 * - Ambershine (internal) → Amberlit (display) = 5
 * - Ambercharged (internal) → Amberbound (display) = 6
 * - Dawncharged (internal) → Dawnbound (display) = 3
 */
const FALLBACK_MUTATION_VALUES = {
  // Growth mutations (exclusive)
  Gold: 25,
  Rainbow: 50,

  // Weather conditions (stack additively)
  Wet: 2,
  Chilled: 2,
  Frozen: 10,

  // Time-based conditions (stack additively with weather)
  // Using display names (which match game source coinMultiplier values)
  Dawnlit: 2,
  Dawnbound: 3,
  Amberlit: 5,
  Amberbound: 6,
} as const;

/**
 * Get mutation value from MGData (preferred) or fallback to hardcoded values
 */
function getMutationValueFromData(mutation: string): number | null {
  const mutations = MGData.get('mutations');
  if (!mutations) return FALLBACK_MUTATION_VALUES[mutation as keyof typeof FALLBACK_MUTATION_VALUES] ?? null;

  const mutationData = mutations[mutation] as { coinMultiplier?: number } | undefined;
  if (!mutationData || typeof mutationData.coinMultiplier !== 'number') {
    return FALLBACK_MUTATION_VALUES[mutation as keyof typeof FALLBACK_MUTATION_VALUES] ?? null;
  }

  return mutationData.coinMultiplier;
}

// Cache for mutation values to avoid repeated MGData lookups
const mutationValueCache = new Map<string, number>();

/**
 * Get mutation multiplier value (with caching)
 */
function getMutationValueCached(mutation: string): number {
  if (mutationValueCache.has(mutation)) {
    return mutationValueCache.get(mutation)!;
  }

  const value = getMutationValueFromData(mutation) ?? 1;
  mutationValueCache.set(mutation, value);
  return value;
}

/**
 * Growth mutations (exclusive - only one applies)
 */
const GROWTH_MUTATIONS = new Set(['Gold', 'Rainbow']);

/**
 * Weather and time-based conditions (stack additively)
 * Formula: growth × (1 + Σconditions - n_conditions + 1)
 */
const CONDITION_MUTATIONS = new Set([
  'Wet',
  'Chilled',
  'Frozen',
  'Dawnlit',
  'Dawnbound',
  'Amberlit',
  'Amberbound',
]);

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calculate mutation value multiplier
 *
 * From game wiki: https://wiki.magiccircle.gg/
 *
 * Formula: growth × (1 + Σconditions - n_conditions)
 * - Growth mutations (Gold 25x, Rainbow 50x) are exclusive (Rainbow takes precedence)
 * - Conditions (Weather + Time) stack additively using the formula above
 *
 * @param mutations Array of mutation names
 * @returns Multiplier value
 */
export function calculateMutationMultiplier(mutations: string[]): number {
  let growthMutation = 1;      // Gold or Rainbow (only one applies)
  let conditionSum = 0;        // Sum of condition multipliers
  let conditionCount = 0;      // Count of conditions

  for (const mut of mutations) {
    if (mut === 'Gold' || mut === 'Rainbow') {
      // Growth mutations are exclusive (Rainbow takes precedence)
      if (mut === 'Rainbow') {
        growthMutation = getMutationValueCached('Rainbow');
      } else if (growthMutation === 1) {
        growthMutation = getMutationValueCached('Gold');
      }
    } else {
      // Conditions (weather + time) stack additively
      const value = getMutationValueCached(mut);
      if (value > 1) { // Only count valid condition mutations
        conditionSum += value;
        conditionCount++;
      }
    }
  }

  // Formula: growth × (1 + Σconditions - n_conditions)
  return growthMutation * (1 + conditionSum - conditionCount);
}

/**
 * Get mutation value from name
 *
 * @param mutation Mutation name
 * @returns Mutation value or null if unknown
 */
export function getMutationValue(mutation: string): number | null {
  return getMutationValueFromData(mutation);
}

/**
 * Check if mutation is growth type (Gold/Rainbow)
 *
 * @param mutation Mutation name
 * @returns True if growth mutation
 */
export function isGrowthMutation(mutation: string): boolean {
  return GROWTH_MUTATIONS.has(mutation);
}

/**
 * Check if mutation is a condition (weather or time-based)
 *
 * @param mutation Mutation name
 * @returns True if condition mutation
 */
export function isConditionMutation(mutation: string): boolean {
  return CONDITION_MUTATIONS.has(mutation);
}

/**
 * @deprecated Use isConditionMutation instead
 */
export function isEnvironmentalMutation(mutation: string): boolean {
  return isConditionMutation(mutation);
}

/**
 * Get all known mutation names
 *
 * @returns Array of mutation names
 */
export function getAllMutationNames(): string[] {
  const mutations = MGData.get('mutations');
  if (!mutations) {
    return Object.keys(FALLBACK_MUTATION_VALUES);
  }
  return Object.keys(mutations);
}

/**
 * Get mutation info (value and type)
 *
 * @param mutation Mutation name
 * @returns Mutation info or null if unknown
 */
export function getMutationInfo(mutation: string): {
  name: string;
  value: number;
  type: 'growth' | 'condition';
} | null {
  const value = getMutationValue(mutation);
  if (value === null) return null;

  return {
    name: mutation,
    value,
    type: isGrowthMutation(mutation) ? 'growth' : 'condition',
  };
}