// src/modules/calculators/mutation.ts
// Mutation calculation utilities - verified from game source

/**
 * Mutation values from game source
 * Source: common/games/Quinoa/utils/produce.ts
 */
const MUTATION_VALUES = {
  Gold: 25,
  Rainbow: 50,
  Frozen: 10,
  Chilled: 5,
  Wet: 2,
} as const;

/**
 * Growth mutations (exclusive - only one applies)
 */
const GROWTH_MUTATIONS = new Set(['Gold', 'Rainbow']);

/**
 * Environmental mutations (stack additively)
 */
const ENVIRONMENTAL_MUTATIONS = new Set(['Frozen', 'Chilled', 'Wet']);

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calculate mutation value multiplier
 *
 * From game source: common/games/Quinoa/utils/produce.ts
 *
 * Formula: growth × (1 + envSum - envCount)
 * - Growth mutations (Gold 25x, Rainbow 50x) are exclusive (Rainbow takes precedence)
 * - Environmental mutations (Wet 2x, Frozen 10x, Chilled 5x) stack additively
 *
 * @param mutations Array of mutation names
 * @returns Multiplier value
 */
export function calculateMutationMultiplier(mutations: string[]): number {
  let growthMutation = 1;      // Gold or Rainbow (only one applies)
  let environmentSum = 0;      // Sum of environmental mutations
  let environmentCount = 0;    // Count of environmental mutations

  for (const mut of mutations) {
    if (mut === 'Gold' || mut === 'Rainbow') {
      // Growth mutations are exclusive (Rainbow takes precedence)
      if (mut === 'Rainbow') {
        growthMutation = MUTATION_VALUES.Rainbow;
      } else if (growthMutation === 1) {
        growthMutation = MUTATION_VALUES.Gold;
      }
    } else if (mut in MUTATION_VALUES) {
      // Environmental mutations stack additively
      environmentSum += MUTATION_VALUES[mut as keyof typeof MUTATION_VALUES];
      environmentCount++;
    }
  }

  // Formula: growth × (1 + envSum - envCount)
  return growthMutation * (1 + environmentSum - environmentCount);
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
 * Check if mutation is environmental type
 *
 * @param mutation Mutation name
 * @returns True if environmental mutation
 */
export function isEnvironmentalMutation(mutation: string): boolean {
  return ENVIRONMENTAL_MUTATIONS.has(mutation);
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
  type: 'growth' | 'environmental';
} | null {
  const value = getMutationValue(mutation);
  if (value === null) return null;

  return {
    name: mutation,
    value,
    type: isGrowthMutation(mutation) ? 'growth' : 'environmental',
  };
}