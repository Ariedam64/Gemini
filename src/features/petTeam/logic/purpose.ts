/**
 * Team Purpose Detection
 *
 * Analyzes team composition to infer purpose based on pet abilities.
 * Enables intelligent default feature selection and smart display management.
 *
 * Per .claude/rules/features.md:
 * - Features are self-contained with clear boundaries
 * - No side effects on import
 * - Pure functions for testability
 *
 * @module purpose
 */

import type { PetTeam } from '../types';
import type { UnifiedPet } from '../../../globals/core/types';
import { getPetsForTeam } from './team';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Team purpose categories
 */
export type TeamPurpose =
    | 'xp-farming'        // Leveling pets to max STR
    | 'coin-farming'      // Passive/active coin generation
    | 'crop-farming'      // Growing crops (mutations, speed, scale)
    | 'time-reduction'    // Reducing egg/crop wait times
    | 'mutation-hunting'  // Rare mutation collection
    | 'efficiency'        // Long-term use, minimal interaction
    | 'hatching'          // Egg hatching optimization
    | 'balanced'          // Mixed purpose
    | 'unknown';          // Cannot determine

/**
 * Purpose analysis result with confidence scoring
 */
export interface TeamPurposeAnalysis {
    /** Primary detected purpose */
    primary: TeamPurpose;

    /** Confidence in primary purpose (0-1) */
    confidence: number;

    /** Secondary purposes (sorted by confidence) */
    secondary: Array<{ purpose: TeamPurpose; confidence: number }>;

    /** Suggested features to display (ordered by relevance) */
    suggestedFeatures: string[];

    /** Human-readable explanation of detection */
    reasons: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Ability Category Definitions
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Ability categories for purpose detection
 * Based on 01-ABILITY-SYSTEM-REFERENCE.md
 */
const AbilityCategories = {
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

    // Unwanted / Ignore
    IGNORE: ['Copycat', 'ProduceEater'],
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Check if pet has any abilities from a category
 */
function hasAbilityFrom(pet: UnifiedPet, category: readonly string[]): boolean {
    return pet.abilities.some(ability => category.includes(ability));
}

/**
 * Count pets with abilities from a category
 */
function countPetsWithAbility(pets: UnifiedPet[], category: readonly string[]): number {
    return pets.filter(pet => hasAbilityFrom(pet, category)).length;
}

/**
 * Get ability tier from ability ID (I=1, II=2, III=3, IV=4)
 */
function getAbilityTier(abilityId: string): number {
    if (abilityId.includes('IV')) return 4;
    if (abilityId.includes('III') || abilityId === 'EggGrowthBoostII') return 3; // EggGrowthBoostII is actually tier 3
    if (abilityId.includes('II') || abilityId.includes('_NEW')) return 2;
    return 1;
}

/**
 * Calculate average tier for a category
 */
function getAverageTier(pets: UnifiedPet[], category: readonly string[]): number {
    const tiers = pets
        .flatMap(pet => pet.abilities.filter(a => category.includes(a)))
        .map(getAbilityTier);

    if (tiers.length === 0) return 0;
    return tiers.reduce((sum, tier) => sum + tier, 0) / tiers.length;
}

// ─────────────────────────────────────────────────────────────────────────────
// Purpose Detection Algorithm
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Detect team purpose with confidence scoring
 *
 * @param team - Pet team to analyze
 * @returns Purpose analysis with primary, secondary, and suggested features
 *
 * @example
 * const analysis = detectTeamPurpose(team);
 * console.log(`Primary: ${analysis.primary} (${analysis.confidence * 100}%)`);
 * console.log(`Suggested features: ${analysis.suggestedFeatures.join(', ')}`);
 */
export function detectTeamPurpose(team: PetTeam): TeamPurposeAnalysis {
    const pets = getPetsForTeam(team);

    if (pets.length === 0) {
        return {
            primary: 'unknown',
            confidence: 0,
            secondary: [],
            suggestedFeatures: [],
            reasons: ['Team has no pets'],
        };
    }

    const reasons: string[] = [];
    const scores: Partial<Record<TeamPurpose, number>> = {};

    // --- XP FARMING DETECTION ---
    const xpBoostCount = countPetsWithAbility(pets, AbilityCategories.XP_BOOST);
    const levelingPets = pets.filter(p => p.currentStrength < p.maxStrength).length;

    if (xpBoostCount >= 2) {
        const avgTier = getAverageTier(pets, AbilityCategories.XP_BOOST);
        scores['xp-farming'] = 0.75 + (avgTier * 0.05); // Max 0.9 with tier III
        reasons.push(`${xpBoostCount} XP Boost pets (avg tier ${avgTier.toFixed(1)})`);
    } else if (xpBoostCount === 1 && levelingPets >= 1) {
        scores['xp-farming'] = 0.7;
        reasons.push(`1 XP Boost pet with ${levelingPets} leveling pet(s)`);
    } else if (levelingPets >= 2) {
        scores['xp-farming'] = 0.5;
        reasons.push(`${levelingPets} pets below max STR`);
    }

    // --- COIN FARMING DETECTION ---
    const coinFinderCount = countPetsWithAbility(pets, AbilityCategories.COIN_FINDER);
    const sellBoostCount = countPetsWithAbility(pets, AbilityCategories.SELL_BOOST);
    const cropRefundHarvestCount = countPetsWithAbility(pets, AbilityCategories.CROP_REFUND_HARVEST);

    if (coinFinderCount >= 1) {
        const avgTier = getAverageTier(pets, AbilityCategories.COIN_FINDER);
        scores['coin-farming'] = Math.max(scores['coin-farming'] || 0, 0.65 + (avgTier * 0.05));
        reasons.push(`${coinFinderCount} Coin Finder pet(s) (tier ${avgTier.toFixed(1)})`);
    }

    if (sellBoostCount >= 1 && cropRefundHarvestCount >= 1) {
        scores['coin-farming'] = Math.max(scores['coin-farming'] || 0, 0.85);
        reasons.push('Sell Boost + Crop Refund/Double Harvest combo');
    } else if (cropRefundHarvestCount >= 1) {
        scores['coin-farming'] = Math.max(scores['coin-farming'] || 0, 0.75);
        reasons.push('Crop Refund or Double Harvest (coin efficiency)');
    }

    // --- CROP FARMING DETECTION ---
    const rareGranterCount = countPetsWithAbility(pets, AbilityCategories.RARE_GRANTERS);
    const commonGranterCount = countPetsWithAbility(pets, AbilityCategories.COMMON_GRANTERS);
    const plantGrowthCount = countPetsWithAbility(pets, AbilityCategories.PLANT_GROWTH);
    const cropMutationCount = countPetsWithAbility(pets, AbilityCategories.CROP_MUTATION);
    const cropSizeCount = countPetsWithAbility(pets, AbilityCategories.CROP_SIZE);

    if (rareGranterCount >= 1) {
        const hasRainbow = pets.some(p => p.abilities.includes('RainbowGranter'));
        const hasGold = pets.some(p => p.abilities.includes('GoldGranter'));

        if (hasRainbow) {
            scores['crop-farming'] = Math.max(scores['crop-farming'] || 0, 0.95);
            reasons.push('Rainbow Granter (ultra-rare, intentional)');
        } else if (hasGold) {
            scores['crop-farming'] = Math.max(scores['crop-farming'] || 0, 0.9);
            reasons.push('Gold Granter (ultra-rare)');
        } else {
            scores['crop-farming'] = Math.max(scores['crop-farming'] || 0, 0.75);
            reasons.push('Frost Granter (rare mutation)');
        }
    }

    const cropAbilityCount = plantGrowthCount + cropMutationCount + cropSizeCount + commonGranterCount;
    if (cropAbilityCount >= 2) {
        const avgTier = (
            getAverageTier(pets, AbilityCategories.PLANT_GROWTH) +
            getAverageTier(pets, AbilityCategories.CROP_MUTATION) +
            getAverageTier(pets, AbilityCategories.CROP_SIZE)
        ) / 3;

        scores['crop-farming'] = Math.max(scores['crop-farming'] || 0, 0.7 + (avgTier * 0.03));
        reasons.push(`${cropAbilityCount} crop-related abilities`);
    }

    // --- TIME REDUCTION DETECTION ---
    const eggGrowthCount = countPetsWithAbility(pets, AbilityCategories.EGG_GROWTH);

    if (eggGrowthCount >= 1) {
        // TODO: Check if team has active turtle eggs in garden (requires game state integration)
        scores['time-reduction'] = 0.7;
        reasons.push(`${eggGrowthCount} Egg Growth Boost pet(s)`);
    }

    if (plantGrowthCount >= 1 && !scores['crop-farming']) {
        // Only count as time-reduction if not already crop-farming
        scores['time-reduction'] = Math.max(scores['time-reduction'] || 0, 0.5);
        reasons.push('Plant Growth Boost (crop speed)');
    }

    // --- MUTATION HUNTING DETECTION ---
    if (rareGranterCount >= 1 || cropMutationCount >= 1) {
        const hasRainbow = pets.some(p => p.abilities.includes('RainbowGranter'));
        const hasGold = pets.some(p => p.abilities.includes('GoldGranter'));

        if (hasRainbow || hasGold) {
            scores['mutation-hunting'] = 0.95;
            reasons.push(`${hasRainbow ? 'Rainbow' : 'Gold'} Granter (mutation focus)`);
        } else if (cropMutationCount >= 1) {
            scores['mutation-hunting'] = 0.8;
            reasons.push('Crop Mutation Boost (targeted hunting)');
        }
    }

    // --- EFFICIENCY DETECTION ---
    const hungerBoostCount = countPetsWithAbility(pets, AbilityCategories.HUNGER_BOOST);
    const hungerRestoreCount = countPetsWithAbility(pets, AbilityCategories.HUNGER_RESTORE);

    if (hungerBoostCount >= 1 && hungerRestoreCount >= 1) {
        scores['efficiency'] = 0.85;
        reasons.push('Hunger Boost + Hunger Restore (long-term setup)');
    } else if (hungerBoostCount >= 1 || hungerRestoreCount >= 1) {
        scores['efficiency'] = 0.6;
        reasons.push('Hunger management (reduced feeding)');
    }

    // Count passive abilities (Coin Finder, Granters, etc.)
    const passiveAbilityCount = coinFinderCount + rareGranterCount + commonGranterCount;
    if (passiveAbilityCount >= 2) {
        scores['efficiency'] = Math.max(scores['efficiency'] || 0, 0.6);
        reasons.push(`${passiveAbilityCount} passive abilities (passive gains)`);
    }

    // --- HATCHING OPTIMIZATION DETECTION ---
    const maxStrCount = countPetsWithAbility(pets, AbilityCategories.MAX_STR_BOOST);
    const hatchXpCount = countPetsWithAbility(pets, AbilityCategories.HATCH_XP);
    const petMutationCount = countPetsWithAbility(pets, AbilityCategories.PET_MUTATION);
    const doubleHatchCount = countPetsWithAbility(pets, AbilityCategories.DOUBLE_HATCH);
    const petRefundCount = countPetsWithAbility(pets, AbilityCategories.PET_REFUND);

    if (maxStrCount >= 1) {
        const avgTier = getAverageTier(pets, AbilityCategories.MAX_STR_BOOST);
        scores['hatching'] = 0.85 + (avgTier * 0.05); // Max 0.95 with tier III
        reasons.push(`Max Strength Boost (tier ${avgTier.toFixed(1)}) - late-game meta`);
    }

    if (petMutationCount >= 1 || doubleHatchCount >= 1 || petRefundCount >= 1) {
        const comboCount = petMutationCount + doubleHatchCount + petRefundCount;
        scores['hatching'] = Math.max(scores['hatching'] || 0, 0.7 + (comboCount * 0.05));
        reasons.push(`${comboCount} rainbow hunting abilities`);
    }

    if (hatchXpCount >= 1 && !scores['hatching']) {
        // Only count if no other hatching focus (overshadowed late-game)
        scores['hatching'] = 0.5;
        reasons.push('Hatch XP Boost (early-game focus)');
    }

    // --- DETERMINE PRIMARY AND SECONDARY PURPOSES ---
    const sortedPurposes = (Object.entries(scores) as [TeamPurpose, number][])
        .sort(([, a], [, b]) => b - a);

    if (sortedPurposes.length === 0) {
        return {
            primary: 'balanced',
            confidence: 0.3,
            secondary: [],
            suggestedFeatures: ['xp'], // Default to XP if unknown
            reasons: ['Mixed or unclear purpose'],
        };
    }

    const [primary, confidence] = sortedPurposes[0];
    const secondary = sortedPurposes.slice(1).map(([purpose, conf]) => ({ purpose, confidence: conf }));

    // --- MAP PURPOSE TO SUGGESTED FEATURES ---
    const featureMap: Record<TeamPurpose, string[]> = {
        'xp-farming': ['xp'],
        'coin-farming': ['coin', 'crop', 'xp'],
        'crop-farming': ['crop', 'mutation', 'xp'],
        'time-reduction': ['timer', 'xp'],
        'mutation-hunting': ['mutation', 'crop', 'xp'],
        'efficiency': ['efficiency', 'hunger', 'xp'],
        'hatching': ['hatch', 'mutation', 'xp'],
        'balanced': ['xp', 'ability'],
        'unknown': ['xp'],
    };

    return {
        primary,
        confidence,
        secondary,
        suggestedFeatures: featureMap[primary] || ['xp'],
        reasons,
    };
}
