/**
 * Value Panel Constants
 *
 * Constants and ability categorization for value panel calculations.
 *
 * @module valuePanel/helpers/constants
 */

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

export const MAX_TARGET_STRENGTH = 100;

// Friend bonus multiplier (50% assumed - can be configured)
// This matches QPM's assumption for more accurate value calculations
export const FRIEND_BONUS_MULTIPLIER = 1.5;

// ─────────────────────────────────────────────────────────────────────────────
// Ability Categories
// ─────────────────────────────────────────────────────────────────────────────

export const SIZE_BOOST_ABILITIES = [
    'ProduceScaleBoost',
    'ProduceScaleBoostII',
    'ProduceScaleBoostIII',
    'SnowyCropSizeBoost',
] as const;

export const MUTATION_BOOST_ABILITIES = [
    'ProduceMutationBoost',
    'ProduceMutationBoostII',
    'ProduceMutationBoostIII',
    'SnowyCropMutationBoost',
] as const;

export const GRANTER_ABILITIES = [
    'RainDance',
    'SnowGranter',
    'FrostGranter',
    'GoldGranter',
    'RainbowGranter',
] as const;

export const HARVEST_ABILITIES = ['DoubleHarvest'] as const;
export const REFUND_ABILITIES = ['ProduceRefund'] as const;
