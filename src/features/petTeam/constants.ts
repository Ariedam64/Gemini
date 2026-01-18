/**
 * Tracker System Parameters
 * 
 * Central configuration for:
 * 1. Team Purpose Detection (Scoring Weights)
 * 2. Ability Categories (for detection logic)
 * 3. Display Thresholds (for strict filtering)
 * 
 * Part of the petTeam feature module.
 */

// ─────────────────────────────────────────────────────────────────────────────
// 1. Scoring Weights
// ─────────────────────────────────────────────────────────────────────────────

export const TEAM_PURPOSE_SCORING = {
    // XP Farming
    XP: {
        BOOST_PAIR: 0.85,           // 1 XP Boost + 2 High-Need Pets
        LEVELING_PAIR: 0.75,        // 2 Leveling Pets + 1 High-Need Pet
        PASSIVE_LEVELING: 0.5,      // Just pets below max STR
        STR_DISTANCE_THRESHOLD: 0.15, // Needed % distance from max STR to count as "High Need"
    },

    // Economy (Coin/Crop)
    ECONOMY: {
        DEDICATED_COIN: 0.9,        // 1+ Coin Finder (no granters)
        META_SELLING: 0.85,         // Sell Boost + Crop Refund
        PASSIVE_EFFICIENCY: 0.65,   // Coin Finder with Granter (hybrid)

        ENDGAME_HARVEST: 0.95,      // 3x Double Harvest
        SYNERGY_BONUS: 0.1,         // Bonus for Double Harvest + Crop Refund on same pet
        EARLY_REGROW: 0.7,          // Crop Mutation without Double Harvest
    },

    // Hatching
    HATCHING: {
        TIER_3_MAX_STR: 0.95,       // Max score for high-tier max strength boost
        RAINBOW_HUNTING: 0.7,       // Base score for mutation/double/refund combos
        COMBO_BONUS: 0.05,          // Bonus for each additional hatching ability
    },

    // Generic
    TIER_BONUS: 0.05,               // Bonus per average ability tier
    CONFIDENCE_THRESHOLD: 0.6,      // Minimum score to be considered a primary purpose
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. Ability Categories
// ─────────────────────────────────────────────────────────────────────────────

export const ABILITY_CATEGORIES = {
    XP_BOOST: ['PetXpBoost', 'PetXpBoostII', 'PetXpBoostIII', 'SnowyPetXpBoost'],

    COIN_FINDER: ['CoinFinderI', 'CoinFinderII', 'CoinFinderIII', 'SnowyCoinFinder'],

    SELL_BOOST: ['SellBoostI', 'SellBoostII', 'SellBoostIII', 'SellBoostIV'],

    CROP_REFUND_HARVEST: ['ProduceRefund', 'DoubleHarvest'],

    PLANT_GROWTH: ['PlantGrowthBoost', 'PlantGrowthBoostII', 'PlantGrowthBoostIII', 'SnowyPlantGrowthBoost'],

    CROP_SIZE: ['ProduceScaleBoost', 'ProduceScaleBoostII', 'ProduceScaleBoostIII', 'SnowyCropSizeBoost'],

    CROP_MUTATION: ['ProduceMutationBoost', 'ProduceMutationBoostII', 'ProduceMutationBoostIII', 'SnowyCropMutationBoost'],

    SEED_FINDER: ['SeedFinderI', 'SeedFinderII', 'SeedFinderIII', 'SeedFinderIV'],

    EGG_GROWTH: ['EggGrowthBoost', 'EggGrowthBoostII_NEW', 'EggGrowthBoostII', 'SnowyEggGrowthBoost'],

    HUNGER_BOOST: ['HungerBoost', 'HungerBoostII', 'HungerBoostIII', 'SnowyHungerBoost'],

    HUNGER_RESTORE: ['HungerRestore', 'HungerRestoreII', 'HungerRestoreIII', 'SnowyHungerRestore'],

    RARE_GRANTERS: ['FrostGranter', 'GoldGranter', 'RainbowGranter'],

    COMMON_GRANTERS: ['RainDance', 'SnowGranter'],

    MAX_STR_BOOST: ['PetHatchSizeBoost', 'PetHatchSizeBoostII', 'PetHatchSizeBoostIII'],

    HATCH_XP: ['PetAgeBoost', 'PetAgeBoostII', 'PetAgeBoostIII'],

    PET_MUTATION: ['PetMutationBoost', 'PetMutationBoostII', 'PetMutationBoostIII'],

    DOUBLE_HATCH: ['DoubleHatch'],

    PET_REFUND: ['PetRefund', 'PetRefundII'],
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// 3. Display Logic Rules
// ─────────────────────────────────────────────────────────────────────────────

export const DISPLAY_RULES = {
    // XP Panel Rules
    XP: {
        HIDE_IF_MAX_STR_NO_BOOST: true, // Strict Rule: Hide XP for Max STR pets unless they provide boosts
    },

    // Strict Mode Map: Which panels are allowed for which Team Purpose?
    // If a purpose is NOT in the list, the panel is hidden (unless specific overrides apply)
    ALLOWED_PANELS: {
        'xp-farming': ['xp'],
        'coin-farming': ['coin', 'xp', 'hatch'], // Added hatch for mixed teams
        'crop-farming': ['growth', 'coin', 'xp', 'hatch'], // Added hatch for granter+refund teams
        'time-reduction': ['growth', 'xp'],
        'mutation-hunting': ['growth', 'coin', 'xp'],
        'hatching': ['hatch', 'xp'], // Hatching + XP logic
        'efficiency': ['xp'],
        'balanced': ['xp', 'growth', 'coin', 'hatch'], // All allowed for balanced
        'unknown': ['xp', 'growth', 'coin', 'hatch'],
    } as Record<string, string[]>,
};
