/**
 * Journal Guide - Scoring Engine
 *
 * Assigns difficulty scores to missing journal variants/abilities,
 * applies context modifiers, and groups into tiers for UI display.
 *
 * Weather mutation scoring is dynamic: unknown weather mutations get
 * generic scoring based on their weather chance data from MGData.
 */

import type { UserContext, SpeciesContext } from './context';
import { hasMutatedCropsFor } from './context';
import { getDisplayName } from '../_shared/names';
import { MGData } from '../../../../modules';
import {
    isWeatherMutation,
    isChargedMutation,
    isGrowthMutation,
    getWeatherForMutation,
    getChargedMutationInfo,
    getWeatherGroupId,
    getWeatherName,
    getMutationDisplayName,
} from './weatherMutationRegistry';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type Tier = 'available' | 'easy' | 'setup' | 'rare';

export interface Recommendation {
    speciesId: string;
    type: 'crop' | 'pet';
    displayName: string;
    variantId: string;
    score: number;
    tier: Tier;
    actionHint: string;
    isAbility?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Rarity & Growth Time Helpers
// ─────────────────────────────────────────────────────────────────────────────

function getCropRarityScore(speciesId: string): number {
    try {
        const plants = MGData.get('plants') as Record<string, any> | null;
        const rarity = plants?.[speciesId]?.seed?.rarity ?? 0;
        return [5, 8, 12, 18, 25, 35, 45][rarity] || 15;
    } catch {
        return 15;
    }
}

function getCropGrowTimeScore(speciesId: string): number {
    try {
        const plants = MGData.get('plants') as Record<string, any> | null;
        const seconds = plants?.[speciesId]?.plant?.secondsToMature ?? 0;
        if (seconds === 0) return 0;
        if (seconds < 300) return 2;
        if (seconds < 3600) return 5;
        if (seconds < 43200) return 8;
        return 12;
    } catch {
        return 5;
    }
}

function getPetRarityScore(speciesId: string): number {
    try {
        const pets = MGData.get('pets') as Record<string, any> | null;
        const rarity = pets?.[speciesId]?.pet?.rarity ?? 0;
        return [5, 10, 20, 35, 50][rarity] || 20;
    } catch {
        return 20;
    }
}

function getPetMaturityTimeScore(speciesId: string): number {
    try {
        const pets = MGData.get('pets') as Record<string, any> | null;
        const hours = pets?.[speciesId]?.pet?.hoursToMature ?? 12;
        if (hours <= 24) return 2;
        if (hours <= 72) return 5;
        if (hours <= 100) return 8;
        return 12;
    } catch {
        return 5;
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Base Difficulty Scores
// ─────────────────────────────────────────────────────────────────────────────

/** Known base scores for specific variants */
const KNOWN_BASE_SCORES: Record<string, number> = {
    'Normal': 10,
    'Max Weight': 20,
    'Wet': 30,
    'Chilled': 40,
    'Frozen': 50,
    'Dawnlit': 55,
    'Ambershine': 60,
    'Gold': 70,
    'Rainbow': 100,
    'Dawncharged': 85,
    'Ambercharged': 90,
    // Pet variants
    'Gold:pet': 40,
    'Rainbow:pet': 90,
    'Max Weight:pet': 70,
    'Normal:pet': 5,
};

/** Dynamic base score for unknown mutations based on category */
function getBaseScore(variantId: string, isPet: boolean): number {
    const key = isPet ? `${variantId}:pet` : variantId;
    if (KNOWN_BASE_SCORES[key] !== undefined) return KNOWN_BASE_SCORES[key];
    if (KNOWN_BASE_SCORES[variantId] !== undefined) return KNOWN_BASE_SCORES[variantId];

    // Dynamic score based on mutation type
    if (isChargedMutation(variantId)) return 85; // charged = very difficult
    if (isWeatherMutation(variantId)) {
        // Score based on weather groupId (Hydro = common/easier, Lunar = rare/harder)
        const weatherId = getWeatherForMutation(variantId);
        if (weatherId) {
            const groupId = getWeatherGroupId(weatherId);
            if (groupId === 'Hydro') return 35;   // Hydro weathers are more frequent
            if (groupId === 'Lunar') return 55;    // Lunar weathers are rarer
            return 45; // ungrouped weather
        }
        return 50; // default weather mutation
    }
    if (isGrowthMutation(variantId)) return 70;

    return 50; // fallback for truly unknown mutations
}

// ─────────────────────────────────────────────────────────────────────────────
// Hint Formatting
// ─────────────────────────────────────────────────────────────────────────────

/** Format hint as "(MutationDisplayName) (SpeciesName): (action)" */
function formatHint(variantId: string, displayName: string, action: string): string {
    const mutName = getMutationDisplayName(variantId);
    return `${mutName} ${displayName}: ${action}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Generic Weather Mutation Modifiers
// ─────────────────────────────────────────────────────────────────────────────

function applyWeatherMutationModifiers(
    baseScore: number,
    variantId: string,
    species: SpeciesContext,
    ctx: UserContext,
    displayName: string,
): { score: number; hint: string } | null {
    const weatherId = getWeatherForMutation(variantId);
    if (!weatherId) return null;

    let score = baseScore;
    let hint = '';

    const hasMutBoost = ctx.petAbilities.cropMutationBoost === 'active';
    const hasMutated = hasMutatedCropsFor(species, variantId);
    const weatherName = getWeatherName(weatherId);

    // Check if weather is active
    const isActive = ctx.weather.activeWeathers.has(weatherId) ||
        (weatherId === 'Frost' && (ctx.weather.activeWeathers.has('Frost') || ctx.weather.activeWeathers.has('Snow')));
    const isPredicted = ctx.weather.predictedWeathers.has(weatherId) ||
        (weatherId === 'Rain' && ctx.weather.rainPredictedSoon);

    if (hasMutated && species.hasMatureCrops) {
        score = Math.min(score, 1);
        hint = formatHint(variantId, displayName, 'Pot + log mutated crops now!');
    } else if (isActive && species.hasMatureCrops) {
        score = Math.min(score, hasMutBoost ? 2 : 3);
        hint = formatHint(variantId, displayName, `${weatherName} active! Harvest now`);
    } else if (isActive && species.hasSeeds) {
        score = 14;
        hint = formatHint(variantId, displayName, `${weatherName} active! Plant seeds`);
    } else if (isPredicted && species.hasMatureCrops) {
        score = 12;
        hint = formatHint(variantId, displayName, `${weatherName} expected soon — crops ready`);
    } else if (isPredicted) {
        score = 20;
        hint = formatHint(variantId, displayName, `${weatherName} expected soon — grow crops`);
    } else if (species.hasMatureCrops) {
        score = 28;
        hint = formatHint(variantId, displayName, `Wait for ${weatherName}`);
    } else {
        score = 40;
        hint = formatHint(variantId, displayName, `Grow crops, then wait for ${weatherName}`);
    }

    return { score, hint };
}

function applyChargedMutationModifiers(
    baseScore: number,
    variantId: string,
    species: SpeciesContext,
    ctx: UserContext,
    displayName: string,
): { score: number; hint: string } | null {
    const chargedInfo = getChargedMutationInfo(variantId);
    if (!chargedInfo) return null;

    let score = baseScore;
    let hint = '';

    const { baseMutation, weatherId, celestialCheck } = chargedInfo;
    const weatherName = getWeatherName(weatherId);
    const baseDisplayName = getMutationDisplayName(baseMutation);
    const hasBaseMutated = hasMutatedCropsFor(species, baseMutation);

    // Check celestial plant
    let hasCelestial = false;
    let celestialName = 'celestial plant';
    if (celestialCheck === 'hasDawnbinder') {
        hasCelestial = ctx.hasDawnbinder;
        celestialName = 'Dawnbinder';
    } else if (celestialCheck === 'hasMoonbinder') {
        hasCelestial = ctx.hasMoonbinder;
        celestialName = 'Moonbinder';
    }

    const isActive = ctx.weather.activeWeathers.has(weatherId);

    if (isActive && hasCelestial && hasBaseMutated) {
        score = 15;
        hint = formatHint(variantId, displayName, `${weatherName} active! 25%/min to charge`);
    } else if (hasCelestial && hasBaseMutated) {
        score = 32;
        hint = formatHint(variantId, displayName, `Wait for ${weatherName} (25%/min)`);
    } else if (hasCelestial) {
        score = 52;
        hint = formatHint(variantId, displayName, `Get ${baseDisplayName} first, place next to ${celestialName}`);
    } else {
        score = baseScore;
        hint = formatHint(variantId, displayName, `Wait for ${weatherName} and place next to ${celestialName}`);
    }

    return { score, hint };
}

// ─────────────────────────────────────────────────────────────────────────────
// Context Modifiers
// ─────────────────────────────────────────────────────────────────────────────

function applyCropModifiers(
    baseScore: number,
    variantId: string,
    species: SpeciesContext,
    ctx: UserContext,
    displayName: string,
): { score: number; hint: string } {
    let score = baseScore;
    let hint = '';

    switch (variantId) {
        case 'Normal': {
            const rarityScore = getCropRarityScore(species.speciesId);
            const growTimeScore = getCropGrowTimeScore(species.speciesId);
            const calcBaseScore = rarityScore + growTimeScore;

            if (species.hasMatureCrops) {
                score = Math.min(score, 1);
                hint = formatHint(variantId, displayName, 'Pot + log a mature crop now!');
            } else if (species.hasSeeds) {
                score = Math.min(calcBaseScore, 20);
                const time = getCropGrowTimeScore(species.speciesId);
                if (time === 0) hint = formatHint(variantId, displayName, 'Plant seeds and pot + log immediately!');
                else if (time <= 2) hint = formatHint(variantId, displayName, 'Plant seeds — matures in minutes');
                else if (time <= 5) hint = formatHint(variantId, displayName, 'Plant seeds — matures in 5-60 min');
                else hint = formatHint(variantId, displayName, 'Plant seeds — long grow time');
            } else {
                score = calcBaseScore;
                const rarity = getCropRarityScore(species.speciesId);
                if (rarity <= 5) hint = formatHint(variantId, displayName, 'Buy common seeds from shop');
                else if (rarity <= 12) hint = formatHint(variantId, displayName, 'Buy uncommon/rare seeds from shop');
                else hint = formatHint(variantId, displayName, 'Buy rare seeds from shop');
            }
            break;
        }
        case 'Max Weight': {
            if (species.hasMatureCrops && ctx.petAbilities.cropSizeBoost === 'active') {
                score = Math.min(score, 1);
                hint = formatHint(variantId, displayName, 'Size boost pet active!');
            } else if (species.hasMatureCrops && ctx.petAbilities.cropSizeBoost === 'owned') {
                score = 8;
                hint = formatHint(variantId, displayName, 'Activate size boost pet, then pot + log');
            } else if (species.hasMatureCrops) {
                score = 15;
                hint = formatHint(variantId, displayName, 'Need a pet with CropSizeBoost ability');
            } else {
                hint = formatHint(variantId, displayName, 'Grow crops and use size boost pet');
            }
            break;
        }
        case 'Frozen': {
            if (hasMutatedCropsFor(species, 'Chilled') && hasMutatedCropsFor(species, 'Wet')) {
                score = Math.min(score, 1);
                hint = formatHint(variantId, displayName, 'Wet + Chilled crops ready — pot + log now!');
            } else if (ctx.weather.isSnowing && hasMutatedCropsFor(species, 'Wet')) {
                score = 10;
                hint = formatHint(variantId, displayName, 'Snowing! Wet crops → Chilled → Frozen');
            } else if (ctx.weather.isRaining && hasMutatedCropsFor(species, 'Chilled')) {
                score = 10;
                hint = formatHint(variantId, displayName, 'Raining! Chilled crops → Wet → Frozen');
            } else if (ctx.weather.isSnowing || ctx.weather.isRaining) {
                score = 25;
                hint = formatHint(variantId, displayName, 'Get both Wet and Chilled on same crop');
            } else {
                hint = formatHint(variantId, displayName, 'Need Wet + Chilled combo (rain + snow)');
            }
            break;
        }
        case 'Gold': {
            if (species.hasMatureCrops && ctx.petAbilities.goldGranter === 'active') {
                score = Math.min(score, 1);
                hint = formatHint(variantId, displayName, 'Gold pet active! Pot + log (0.72%)');
            } else if (species.hasMatureCrops && ctx.petAbilities.goldGranter === 'owned') {
                score = 10;
                hint = formatHint(variantId, displayName, 'Activate Gold granter pet (0.72%)');
            } else if (ctx.petAbilities.goldGranter !== 'none') {
                score = 25;
                hint = formatHint(variantId, displayName, 'Grow crops + use Gold granter (0.72%)');
            } else {
                hint = formatHint(variantId, displayName, 'Need a pet with GoldGranter ability');
            }
            break;
        }
        case 'Rainbow': {
            if (species.hasMatureCrops && ctx.petAbilities.rainbowGranter === 'active') {
                score = Math.min(score, 1);
                hint = formatHint(variantId, displayName, 'Rainbow pet active! Pot + log (0.72%)');
            } else if (species.hasMatureCrops && ctx.petAbilities.rainbowGranter === 'owned') {
                score = 15;
                hint = formatHint(variantId, displayName, 'Activate Rainbow granter pet (0.72%)');
            } else if (ctx.petAbilities.rainbowGranter !== 'none') {
                score = 40;
                hint = formatHint(variantId, displayName, 'Grow crops + use Rainbow granter (0.72%)');
            } else {
                hint = formatHint(variantId, displayName, 'Need a pet with RainbowGranter ability');
            }
            break;
        }
        default: {
            // Try charged mutation modifiers first
            if (isChargedMutation(variantId)) {
                const result = applyChargedMutationModifiers(baseScore, variantId, species, ctx, displayName);
                if (result) return result;
            }

            // Try weather mutation modifiers
            if (isWeatherMutation(variantId)) {
                const result = applyWeatherMutationModifiers(baseScore, variantId, species, ctx, displayName);
                if (result) return result;
            }

            // Fallback for truly unknown mutations
            hint = formatHint(variantId, displayName, 'Obtain this variant');
        }
    }

    return { score, hint };
}

function applyPetModifiers(
    baseScore: number,
    variantId: string,
    species: SpeciesContext,
    ctx: UserContext,
    displayName: string,
): { score: number; hint: string } {
    let score = baseScore;
    let hint = '';

    switch (variantId) {
        case 'Normal': {
            const rarityScore = getPetRarityScore(species.speciesId);
            const maturityScore = getPetMaturityTimeScore(species.speciesId);
            const calcBaseScore = rarityScore + maturityScore;

            if (species.hasEggs) {
                score = Math.min(calcBaseScore / 2, 10);
                const maturity = getPetMaturityTimeScore(species.speciesId);
                if (maturity <= 2) hint = formatHint(variantId, displayName, 'Hatch egg — matures in 12-24 hours');
                else if (maturity <= 5) hint = formatHint(variantId, displayName, 'Hatch egg — matures in ~3 days');
                else hint = formatHint(variantId, displayName, 'Hatch egg — long maturity time');
            } else {
                score = calcBaseScore;
                const rarity = getPetRarityScore(species.speciesId);
                if (rarity <= 5) hint = formatHint(variantId, displayName, 'Get Common Egg from shop');
                else if (rarity <= 20) hint = formatHint(variantId, displayName, 'Get Uncommon/Rare Egg from shop');
                else hint = formatHint(variantId, displayName, 'Get Legendary/Mythic Egg from shop');
            }
            break;
        }
        case 'Max Weight': {
            if (ctx.petAbilities.maxStrengthBoost === 'active') {
                score = 10;
                hint = formatHint(variantId, displayName, 'Max strength pet active — grow to max');
            } else if (ctx.petAbilities.maxStrengthBoost === 'owned') {
                score = 20;
                hint = formatHint(variantId, displayName, 'Activate MaxStrengthBoost pet');
            } else {
                hint = formatHint(variantId, displayName, 'Hatch a pet with Max STR 70/100');
            }
            break;
        }
        case 'Gold': {
            if (ctx.petAbilities.petMutationBoost === 'active') {
                score = 20;
                hint = formatHint(variantId, displayName, 'Mutation boost active — 0.72% chance');
            } else if (species.hasEggs) {
                score = 30;
                hint = formatHint(variantId, displayName, 'Hatch eggs — 0.72% chance');
            } else {
                hint = formatHint(variantId, displayName, 'Hatch eggs (0.72% chance)');
            }
            break;
        }
        case 'Rainbow': {
            if (ctx.petAbilities.petMutationBoost === 'active') {
                score = 30;
                hint = formatHint(variantId, displayName, 'Mutation boost active — 0.72% chance');
            } else if (species.hasEggs) {
                score = 50;
                hint = formatHint(variantId, displayName, 'Hatch eggs — 0.72% chance');
            } else {
                hint = formatHint(variantId, displayName, 'Hatch eggs (0.72% chance)');
            }
            break;
        }
        default: {
            hint = formatHint(variantId, displayName, 'Obtain this variant');
        }
    }

    return { score, hint };
}

// ─────────────────────────────────────────────────────────────────────────────
// Tier Assignment
// ─────────────────────────────────────────────────────────────────────────────

function assignTier(score: number): Tier {
    if (score <= 5) return 'available';
    if (score <= 25) return 'easy';
    if (score <= 60) return 'setup';
    return 'rare';
}

export const TIER_ORDER: Tier[] = ['available', 'easy', 'setup', 'rare'];

export const TIER_LABELS: Record<Tier, string> = {
    available: 'Available Now',
    easy: 'Easy',
    setup: 'Needs Setup',
    rare: 'Rare',
};

export const TIER_COLORS: Record<Tier, string> = {
    available: '#4CAF50',
    easy: '#FFB300',
    setup: '#FF9800',
    rare: '#F44336',
};

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

export function computeAllRecommendations(ctx: UserContext): Recommendation[] {
    const recommendations: Recommendation[] = [];

    for (const [speciesId, species] of ctx.speciesContexts) {
        if (species.isComplete) continue;

        const displayName = getDisplayName(speciesId, species.type);

        // Score missing variants
        for (const variantId of species.variantsMissing) {
            const baseScore = getBaseScore(variantId, species.type === 'pet');

            const { score, hint } = species.type === 'crop'
                ? applyCropModifiers(baseScore, variantId, species, ctx, displayName)
                : applyPetModifiers(baseScore, variantId, species, ctx, displayName);

            recommendations.push({
                speciesId,
                type: species.type,
                displayName,
                variantId,
                score,
                tier: assignTier(score),
                actionHint: hint,
            });
        }

        // Score missing abilities (pets only)
        if (species.type === 'pet' && species.abilitiesMissing) {
            for (const abilityId of species.abilitiesMissing) {
                const score = 35;
                const hint = `${abilityId} ${displayName}: Trigger this ability`;

                recommendations.push({
                    speciesId,
                    type: 'pet',
                    displayName,
                    variantId: abilityId,
                    score,
                    tier: assignTier(score),
                    actionHint: hint,
                    isAbility: true,
                });
            }
        }
    }

    // Sort by score ascending (easiest first)
    recommendations.sort((a, b) => a.score - b.score);

    return recommendations;
}

export function groupByTier(recommendations: Recommendation[]): Map<Tier, Recommendation[]> {
    const groups = new Map<Tier, Recommendation[]>();
    for (const tier of TIER_ORDER) {
        groups.set(tier, []);
    }
    for (const rec of recommendations) {
        groups.get(rec.tier)!.push(rec);
    }
    return groups;
}

export function countAvailableNow(recommendations: Recommendation[]): number {
    return recommendations.filter(r => r.tier === 'available').length;
}
