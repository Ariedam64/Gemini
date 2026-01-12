// src/modules/calculators/mutation.ts
// Mutation calculation utilities - verified from game source

/**
 * Mutation values from game wiki
 * Source: https://wiki.magiccircle.gg/
 */
const MUTATION_VALUES = {
  // Growth mutations (exclusive)
  Gold: 25,
  Rainbow: 50,

  // Weather conditions (stack additively)
  Wet: 2,
  Chilled: 2,
  Frozen: 10,

  // Time-based conditions (stack additively with weather)
  Dawnlit: 2,
  Dawnbound: 3,
  Amberlit: 5,
  Amberbound: 6,
} as const;

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
        growthMutation = MUTATION_VALUES.Rainbow;
      } else if (growthMutation === 1) {
        growthMutation = MUTATION_VALUES.Gold;
      }
    } else if (mut in MUTATION_VALUES) {
      // Conditions (weather + time) stack additively
      conditionSum += MUTATION_VALUES[mut as keyof typeof MUTATION_VALUES];
      conditionCount++;
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
  return MUTATION_VALUES[mutation as keyof typeof MUTATION_VALUES] ?? null;
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
  return Object.keys(MUTATION_VALUES);
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