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
import { ABILITY_CATEGORIES, TEAM_PURPOSE_SCORING, DISPLAY_RULES } from '../constants';

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

// Ability categories are now imported from constants.ts

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
    // Implements STR Distance logic from system_analysis.md
    const xpBoostCount = countPetsWithAbility(pets, ABILITY_CATEGORIES.XP_BOOST);
    const strThreshold = TEAM_PURPOSE_SCORING.XP.STR_DISTANCE_THRESHOLD;

    // Calculate STR distance for each pet
    const petsWithHighNeed = pets.filter(p => {
        if (p.maxStrength === 0) return false;
        const distance = (p.maxStrength - p.currentStrength) / p.maxStrength;
        return distance > strThreshold;
    });

    const highNeedCount = petsWithHighNeed.length;
    const levelingPets = pets.filter(p => p.currentStrength < p.maxStrength).length;

    // High Confidence: 1 XP Boost + 2 High-Need Pets
    if (xpBoostCount >= 1 && highNeedCount >= 2) {
        scores['xp-farming'] = TEAM_PURPOSE_SCORING.XP.BOOST_PAIR;
        reasons.push(`1 XP Boost + ${highNeedCount} high-need pets (>${strThreshold * 100}% STR distance)`);
    }
    // Medium Confidence: 2+ XP Boosts
    else if (xpBoostCount >= 2) {
        const avgTier = getAverageTier(pets, ABILITY_CATEGORIES.XP_BOOST);
        scores['xp-farming'] = TEAM_PURPOSE_SCORING.XP.LEVELING_PAIR + (avgTier * TEAM_PURPOSE_SCORING.TIER_BONUS);
        reasons.push(`${xpBoostCount} XP Boost pets (avg tier ${avgTier.toFixed(1)})`);
    }
    // Medium Confidence: 2 Leveling Pets + 1 High-Need Pet
    else if (levelingPets >= 2 && highNeedCount >= 1) {
        scores['xp-farming'] = TEAM_PURPOSE_SCORING.XP.LEVELING_PAIR;
        reasons.push(`${levelingPets} leveling pets with ${highNeedCount} high-need`);
    }
    // Low Confidence: Just leveling pets
    else if (levelingPets >= 2) {
        scores['xp-farming'] = TEAM_PURPOSE_SCORING.XP.PASSIVE_LEVELING;
        reasons.push(`${levelingPets} pets below max STR`);
    }

    // --- COIN FARMING DETECTION ---
    // Implements Economy logic from system_analysis.md
    const coinFinderCount = countPetsWithAbility(pets, ABILITY_CATEGORIES.COIN_FINDER);
    const sellBoostCount = countPetsWithAbility(pets, ABILITY_CATEGORIES.SELL_BOOST);
    const cropRefundHarvestCount = countPetsWithAbility(pets, ABILITY_CATEGORIES.CROP_REFUND_HARVEST);
    const rareGranterCount = countPetsWithAbility(pets, ABILITY_CATEGORIES.RARE_GRANTERS);
    const commonGranterCount = countPetsWithAbility(pets, ABILITY_CATEGORIES.COMMON_GRANTERS);

    // Check if Coin Finder has Granters (passive efficiency vs dedicated coin farming)
    const coinFinderHasGranters = pets.some(p =>
        hasAbilityFrom(p, ABILITY_CATEGORIES.COIN_FINDER) &&
        (hasAbilityFrom(p, ABILITY_CATEGORIES.RARE_GRANTERS) || hasAbilityFrom(p, ABILITY_CATEGORIES.COMMON_GRANTERS))
    );

    // Dedicated Coin Farming (no granters)
    if (coinFinderCount >= 1 && !coinFinderHasGranters) {
        scores['coin-farming'] = TEAM_PURPOSE_SCORING.ECONOMY.DEDICATED_COIN;
        reasons.push('Dedicated Coin Finder team (no granters)');
    }
    // Meta Selling Team
    else if (sellBoostCount >= 1 && cropRefundHarvestCount >= 1) {
        scores['coin-farming'] = TEAM_PURPOSE_SCORING.ECONOMY.META_SELLING;
        reasons.push('Meta Selling Team (Sell Boost + Crop Refund/Harvest)');
    }
    // Passive Efficiency (Coin Finder with Granters)
    else if (coinFinderCount >= 1 && coinFinderHasGranters) {
        scores['coin-farming'] = TEAM_PURPOSE_SCORING.ECONOMY.PASSIVE_EFFICIENCY;
        scores['efficiency'] = Math.max(scores['efficiency'] || 0, TEAM_PURPOSE_SCORING.ECONOMY.PASSIVE_EFFICIENCY);
        reasons.push('Coin Finder + Granter (passive efficiency)');
    }
    // Sell-focused (without full meta combo)
    else if (sellBoostCount >= 1 || cropRefundHarvestCount >= 1) {
        scores['coin-farming'] = Math.max(scores['coin-farming'] || 0, 0.7);
        reasons.push('Sell/Refund abilities (coin efficiency)');
    }

    // --- CROP FARMING DETECTION ---
    // Implements Crop Farming logic from system_analysis.md
    const plantGrowthCount = countPetsWithAbility(pets, ABILITY_CATEGORIES.PLANT_GROWTH);
    const cropMutationCount = countPetsWithAbility(pets, ABILITY_CATEGORIES.CROP_MUTATION);
    const cropSizeCount = countPetsWithAbility(pets, ABILITY_CATEGORIES.CROP_SIZE);
    const doubleHarvestCount = pets.filter(p => p.abilities.includes('DoubleHarvest')).length;
    const produceRefundCount = pets.filter(p => p.abilities.includes('ProduceRefund')).length;

    // Check for capybara synergy (Double Harvest + Crop Refund on same pet)
    const capybaraSynergy = pets.some(p =>
        p.abilities.includes('DoubleHarvest') && p.abilities.includes('ProduceRefund')
    );

    // Endgame Harvest Team (3x Double Harvest)
    if (doubleHarvestCount >= 3) {
        let score = TEAM_PURPOSE_SCORING.ECONOMY.ENDGAME_HARVEST;
        if (capybaraSynergy) {
            score += TEAM_PURPOSE_SCORING.ECONOMY.SYNERGY_BONUS;
        }
        scores['crop-farming'] = Math.max(scores['crop-farming'] || 0, score);
        reasons.push('Endgame Harvest Team (3x Double Harvest)' + (capybaraSynergy ? ' + capybara synergy' : ''));
    }
    // Double Harvest + Crop Refund combo
    else if (doubleHarvestCount >= 1 && produceRefundCount >= 1) {
        let score = 0.85;
        if (capybaraSynergy) {
            score += TEAM_PURPOSE_SCORING.ECONOMY.SYNERGY_BONUS;
        }
        scores['crop-farming'] = Math.max(scores['crop-farming'] || 0, score);
        reasons.push('Double Harvest + Crop Refund' + (capybaraSynergy ? ' (same pet - capybara)' : ''));
    }
    // Early Game Regrow Team (Crop Mutation without Double Harvest)
    else if (cropMutationCount >= 1 && doubleHarvestCount === 0) {
        scores['crop-farming'] = Math.max(scores['crop-farming'] || 0, TEAM_PURPOSE_SCORING.ECONOMY.EARLY_REGROW);
        reasons.push('Early Game Regrow Team (Crop Mutation)');
    }

    // Rare Granters (ultra-rare mutations)
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

    // Generic crop abilities (fallback)
    const cropAbilityCount = plantGrowthCount + cropMutationCount + cropSizeCount + commonGranterCount;
    if (cropAbilityCount >= 2 && !scores['crop-farming']) {
        const avgTier = (
            getAverageTier(pets, ABILITY_CATEGORIES.PLANT_GROWTH) +
            getAverageTier(pets, ABILITY_CATEGORIES.CROP_MUTATION) +
            getAverageTier(pets, ABILITY_CATEGORIES.CROP_SIZE)
        ) / 3;

        scores['crop-farming'] = Math.max(scores['crop-farming'] || 0, 0.7 + (avgTier * 0.03));
        reasons.push(`${cropAbilityCount} crop-related abilities`);
    }

    // --- TIME REDUCTION DETECTION ---
    const eggGrowthCount = countPetsWithAbility(pets, ABILITY_CATEGORIES.EGG_GROWTH);

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
    const hungerBoostCount = countPetsWithAbility(pets, ABILITY_CATEGORIES.HUNGER_BOOST);
    const hungerRestoreCount = countPetsWithAbility(pets, ABILITY_CATEGORIES.HUNGER_RESTORE);

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
    // Implements Hatching logic from constants.ts
    const maxStrCount = countPetsWithAbility(pets, ABILITY_CATEGORIES.MAX_STR_BOOST);
    const hatchXpCount = countPetsWithAbility(pets, ABILITY_CATEGORIES.HATCH_XP);
    const petMutationCount = countPetsWithAbility(pets, ABILITY_CATEGORIES.PET_MUTATION);
    const doubleHatchCount = countPetsWithAbility(pets, ABILITY_CATEGORIES.DOUBLE_HATCH);
    const petRefundCount = countPetsWithAbility(pets, ABILITY_CATEGORIES.PET_REFUND);

    // Max STR Boost (late-game meta)
    if (maxStrCount >= 1) {
        const avgTier = getAverageTier(pets, ABILITY_CATEGORIES.MAX_STR_BOOST);
        const tierScore = avgTier >= 3 ? TEAM_PURPOSE_SCORING.HATCHING.TIER_3_MAX_STR : 0.85;
        scores['hatching'] = tierScore + (avgTier * TEAM_PURPOSE_SCORING.TIER_BONUS);
        reasons.push(`Max Strength Boost (tier ${avgTier.toFixed(1)}) - late-game meta`);
    }

    // Rainbow hunting abilities
    if (petMutationCount >= 1 || doubleHatchCount >= 1 || petRefundCount >= 1) {
        const comboCount = petMutationCount + doubleHatchCount + petRefundCount;
        const comboScore = TEAM_PURPOSE_SCORING.HATCHING.RAINBOW_HUNTING + (comboCount * TEAM_PURPOSE_SCORING.HATCHING.COMBO_BONUS);
        scores['hatching'] = Math.max(scores['hatching'] || 0, comboScore);
        reasons.push(`${comboCount} rainbow hunting abilities`);
    }

    // Hatch XP (early-game, overshadowed by max STR)
    if (hatchXpCount >= 1 && !scores['hatching']) {
        scores['hatching'] = 0.5;
        reasons.push('Hatch XP Boost (early-game focus)');
    }

    // Hatching Majority Override - If majority of pets have hatching abilities, prioritize hatching
    // This prevents incidental granters (e.g., gold chicken with pet refund) from triggering crop-farming
    const totalHatchingPets = pets.filter(p =>
        hasAbilityFrom(p, ABILITY_CATEGORIES.MAX_STR_BOOST) ||
        hasAbilityFrom(p, ABILITY_CATEGORIES.PET_MUTATION) ||
        hasAbilityFrom(p, ABILITY_CATEGORIES.DOUBLE_HATCH) ||
        hasAbilityFrom(p, ABILITY_CATEGORIES.PET_REFUND)
    ).length;

    if (totalHatchingPets >= Math.ceil(pets.length * 0.67) && scores['hatching']) {
        // 2 out of 3, or 3 out of 3 pets have hatching abilities
        scores['hatching'] = Math.max(scores['hatching'], 0.97); // Override any incidental granters

        // Only suppress crop-farming if ALL crop-related pets also have hatching abilities
        // This prevents suppressing Capybara-type pets in mixed teams
        if (scores['crop-farming'] && scores['crop-farming'] < 0.97) {
            const pureCropPets = pets.filter(p =>
                (hasAbilityFrom(p, ABILITY_CATEGORIES.CROP_REFUND_HARVEST) ||
                    hasAbilityFrom(p, ABILITY_CATEGORIES.CROP_SIZE) ||
                    hasAbilityFrom(p, ABILITY_CATEGORIES.CROP_MUTATION)) &&
                !hasAbilityFrom(p, ABILITY_CATEGORIES.PET_REFUND) &&
                !hasAbilityFrom(p, ABILITY_CATEGORIES.DOUBLE_HATCH) &&
                !hasAbilityFrom(p, ABILITY_CATEGORIES.PET_MUTATION) &&
                !hasAbilityFrom(p, ABILITY_CATEGORIES.MAX_STR_BOOST)
            );

            if (pureCropPets.length === 0) {
                delete scores['crop-farming'];
                reasons.push('Suppressed crop-farming (hatching majority override)');
            }
        }
        reasons.push(`Hatching Majority (${totalHatchingPets}/${pets.length} pets) - clear team purpose`);
    }

    // --- DETERMINE PRIMARY AND SECONDARY PURPOSES ---
    const sortedPurposes = (Object.entries(scores) as [TeamPurpose, number][])
        .sort(([, a], [, b]) => b - a);

    if (sortedPurposes.length === 0) {
        return {
            primary: 'balanced',
            confidence: 0.3,
            secondary: [],
            suggestedFeatures: ['xp', 'growth', 'coin', 'hatch'], // Show all panels for unknown
            reasons: ['Mixed or unclear purpose'],
        };
    }

    const [primary, confidence] = sortedPurposes[0];
    const secondary = sortedPurposes.slice(1).map(([purpose, conf]) => ({ purpose, confidence: conf }));

    // --- ENFORCE CONFIDENCE THRESHOLD ---
    // If confidence is below threshold, show all panels (balanced mode)
    if (confidence < TEAM_PURPOSE_SCORING.CONFIDENCE_THRESHOLD) {
        return {
            primary: 'balanced',
            confidence: confidence,
            secondary: sortedPurposes.map(([purpose, conf]) => ({ purpose, confidence: conf })),
            suggestedFeatures: ['xp', 'growth', 'coin', 'hatch'],
            reasons: [...reasons, `Low confidence (${(confidence * 100).toFixed(0)}%) - showing all panels`],
        };
    }

    // --- MAP PURPOSE TO SUGGESTED FEATURES ---
    const featureMap: Record<TeamPurpose, string[]> = {
        'xp-farming': ['xp'],
        'coin-farming': ['coin', 'growth', 'xp'],  // coin first, then growth (was 'crop')
        'crop-farming': ['growth', 'coin', 'xp'],  // growth for crops (was 'crop')
        'time-reduction': ['growth', 'xp'],  // growth panel for timers (was 'timer')
        'mutation-hunting': ['growth', 'coin', 'xp'],  // growth for mutations (was 'mutation')
        'efficiency': ['xp'],  // simplified, removed non-existent panels
        'hatching': ['hatch', 'growth', 'xp'],  // hatch first, then growth (was 'mutation')
        'balanced': ['xp', 'growth', 'coin', 'hatch'],  // all panels for balanced
        'unknown': ['xp', 'growth', 'coin', 'hatch'],  // all panels for unknown
    };

    return {
        primary,
        confidence,
        secondary,
        suggestedFeatures: featureMap[primary] || ['xp', 'growth', 'coin', 'hatch'],
        reasons,
    };
}
