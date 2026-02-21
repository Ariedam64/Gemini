/**
 * Journal Guide - Badge Selection
 *
 * Determines which badge to show on each species' progress bar.
 * Uses a priority chain: rarer/more-actionable variants shown first.
 *
 * Weather mutation badges are generated dynamically from MGData
 * so new weather types get functional badges automatically.
 */

import type { UserContext, SpeciesContext } from './context';
import { hasMutatedCropsFor } from './context';
import { MGData } from '../../../../modules';
import type { AbilityColor } from '../../../../modules/data';
import { getDisplayName } from '../_shared/names';
import {
    getMutationColor,
    getWeatherForMutation,
    getWeatherIcon,
    getWeatherName,
    getMutationDisplayName,
    isChargedMutation,
    getChargedMutationInfo,
    getWeatherMutationIds,
    getChargedMutationIds,
} from './weatherMutationRegistry';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface BadgeInfo {
    key: string;           // Unique key for diffing (e.g. "Rain:Wet:active")
    variantId: string;     // The variant this badge represents
    icon: string | null;   // Weather icon sprite name (null = no weather icon)
    label: string;         // Short tooltip text
    isActive: boolean;     // Currently actionable (pulse animation)
    isPredicted: boolean;  // Predicted soon (no pulse)
    bgColor: string;       // Badge background color
    isAbility?: boolean;   // Whether this is an ability badge
}

// ─────────────────────────────────────────────────────────────────────────────
// Rarity & Shop Helpers
// ─────────────────────────────────────────────────────────────────────────────

function getCropRarity(speciesId: string): number {
    try {
        const plants = MGData.get('plants') as Record<string, any> | null;
        return plants?.[speciesId]?.seed?.rarity ?? 0;
    } catch {
        return 0;
    }
}

function getPetRarity(speciesId: string): number {
    try {
        const pets = MGData.get('pets') as Record<string, any> | null;
        return pets?.[speciesId]?.pet?.rarity ?? 0;
    } catch {
        return 0;
    }
}

function isSeedInShop(_speciesId: string): boolean {
    // Shop inventory is not available via MGData; return false for now
    return false;
}

function isEggInShop(_petSpeciesId: string): boolean {
    // Shop inventory is not available via MGData; return false for now
    return false;
}

// ─────────────────────────────────────────────────────────────────────────────
// Color Helpers
// ─────────────────────────────────────────────────────────────────────────────

function getAbilityColor(abilityId: string): string {
    const abilities = MGData.get('abilities') as Record<string, { name?: string; color?: AbilityColor }> | null;
    const ability = abilities?.[abilityId];
    return ability?.color?.bg || 'rgba(100, 100, 100, 0.9)';
}

const COLORS = {
    normal: '#A88A6B',
    ability: '#8B3E98',
    rainbow: 'linear-gradient(45deg, rgba(200,0,0,0.9), rgba(200,120,0,0.9), rgba(160,170,30,0.9), rgba(60,170,60,0.9), rgba(50,170,170,0.9), rgba(40,150,180,0.9), rgba(20,90,180,0.9), rgba(70,30,150,0.9))',
};

function getColorForVariant(variant: string): string {
    switch (variant) {
        case 'Rainbow':
            return COLORS.rainbow;
        case 'Gold':
            return getAbilityColor('GoldGranter');
        case 'Max Weight':
            return getAbilityColor('CropSizeBoost');
        case 'Normal':
            return COLORS.normal;
        default:
            return getMutationColor(variant);
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Hint Formatting
// ─────────────────────────────────────────────────────────────────────────────

/** Format badge label as "(MutationDisplayName) (SpeciesName): (action)" */
function badgeHint(variantId: string, species: SpeciesContext, action: string): string {
    const mutName = getMutationDisplayName(variantId);
    const displayName = getDisplayName(species.speciesId, species.type);
    return `${mutName} ${displayName}: ${action}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Badge Generators - Special (unique logic)
// ─────────────────────────────────────────────────────────────────────────────

function rainbowBadge(ctx: UserContext, species: SpeciesContext): BadgeInfo | null {
    if (!species.variantsMissing.includes('Rainbow')) return null;

    if (species.type === 'crop') {
        const petActive = ctx.petAbilities.rainbowGranter === 'active';

        if (species.hasMatureCrops && petActive) {
            return {
                key: 'Rainbow:harvest',
                variantId: 'Rainbow',
                icon: null,
                label: badgeHint('Rainbow', species, 'Rainbow pet active! Harvest (0.72%)'),
                isActive: true,
                isPredicted: false,
                bgColor: getColorForVariant('Rainbow'),
            };
        }

        if (species.hasSeeds && petActive) {
            return {
                key: 'Rainbow:plant',
                variantId: 'Rainbow',
                icon: null,
                label: badgeHint('Rainbow', species, 'Plant seeds (0.72%)'),
                isActive: true,
                isPredicted: false,
                bgColor: getColorForVariant('Rainbow'),
            };
        }

        return null;
    }

    // Pet rainbow
    if (!species.hasEggs) return null;
    const hasMutBoost = ctx.petAbilities.petMutationBoost !== 'none';
    return {
        key: `Rainbow:pet:${hasMutBoost ? 'boost' : 'egg'}`,
        variantId: 'Rainbow',
        icon: null,
        label: badgeHint('Rainbow', species, hasMutBoost ? 'Hatch eggs — 0.72% chance' : 'Hatch eggs'),
        isActive: true,
        isPredicted: false,
        bgColor: getColorForVariant('Rainbow'),
    };
}

function goldBadge(ctx: UserContext, species: SpeciesContext): BadgeInfo | null {
    if (!species.variantsMissing.includes('Gold')) return null;

    if (species.type === 'crop') {
        const petActive = ctx.petAbilities.goldGranter === 'active';

        if (species.hasMatureCrops && petActive) {
            return {
                key: 'Gold:harvest',
                variantId: 'Gold',
                icon: null,
                label: badgeHint('Gold', species, 'Gold pet active! Harvest (0.72%)'),
                isActive: true,
                isPredicted: false,
                bgColor: getColorForVariant('Gold'),
            };
        }

        if (species.hasSeeds && petActive) {
            return {
                key: 'Gold:plant',
                variantId: 'Gold',
                icon: null,
                label: badgeHint('Gold', species, 'Plant seeds (0.72%)'),
                isActive: true,
                isPredicted: false,
                bgColor: getColorForVariant('Gold'),
            };
        }

        return null;
    }

    // Pet gold
    if (!species.hasEggs) return null;
    const hasMutBoost = ctx.petAbilities.petMutationBoost !== 'none';
    return {
        key: `Gold:pet:${hasMutBoost ? 'boost' : 'egg'}`,
        variantId: 'Gold',
        icon: null,
        label: badgeHint('Gold', species, hasMutBoost ? 'Hatch eggs — 0.72% chance' : 'Hatch eggs'),
        isActive: true,
        isPredicted: false,
        bgColor: getColorForVariant('Gold'),
    };
}

function frozenBadge(ctx: UserContext, species: SpeciesContext): BadgeInfo | null {
    if (species.type !== 'crop' || !species.variantsMissing.includes('Frozen')) return null;

    // Only show if actively freezing (snowing + have chilled crops)
    if (ctx.weather.isSnowing && hasMutatedCropsFor(species, 'Chilled')) {
        return {
            key: 'Frozen:active',
            variantId: 'Frozen',
            icon: 'FrostIcon',
            label: badgeHint('Frozen', species, 'Chilled crops may freeze!'),
            isActive: true,
            isPredicted: false,
            bgColor: getMutationColor('Frozen'),
        };
    }

    return null;
}

function maxWeightBadge(ctx: UserContext, species: SpeciesContext): BadgeInfo | null {
    if (!species.variantsMissing.includes('Max Weight')) return null;

    if (species.type === 'crop') {
        if (species.hasMatureCrops && ctx.petAbilities.cropSizeBoost === 'active') {
            return {
                key: 'MaxWeight:crop:harvest',
                variantId: 'Max Weight',
                icon: null,
                label: badgeHint('Max Weight', species, 'Size boost active! Harvest'),
                isActive: true,
                isPredicted: false,
                bgColor: getColorForVariant('Max Weight'),
            };
        }

        if (species.hasSeeds && ctx.petAbilities.cropSizeBoost === 'active') {
            return {
                key: 'MaxWeight:crop:plant',
                variantId: 'Max Weight',
                icon: null,
                label: badgeHint('Max Weight', species, 'Size boost active! Plant seeds'),
                isActive: true,
                isPredicted: false,
                bgColor: getColorForVariant('Max Weight'),
            };
        }

        return null;
    }

    // Pet max weight
    if (species.hasEggs && ctx.petAbilities.maxStrengthBoost === 'active') {
        return {
            key: 'MaxWeight:pet:hatch',
            variantId: 'Max Weight',
            icon: null,
            label: badgeHint('Max Weight', species, 'Strength boost active! Hatch'),
            isActive: true,
            isPredicted: false,
            bgColor: getColorForVariant('Max Weight'),
        };
    }

    return null;
}

function normalBadge(_ctx: UserContext, species: SpeciesContext): BadgeInfo | null {
    if (!species.variantsMissing.includes('Normal')) return null;

    if (species.type === 'crop') {
        if (species.hasMatureCrops) {
            return {
                key: 'Normal:crop:harvest',
                variantId: 'Normal',
                icon: null,
                label: badgeHint('Normal', species, 'Pot + log a mature crop!'),
                isActive: true,
                isPredicted: false,
                bgColor: COLORS.normal,
            };
        }

        if (species.hasSeeds) {
            return {
                key: 'Normal:crop:plant',
                variantId: 'Normal',
                icon: null,
                label: badgeHint('Normal', species, 'Plant seeds'),
                isActive: true,
                isPredicted: false,
                bgColor: COLORS.normal,
            };
        }

        const rarity = getCropRarity(species.speciesId);
        const inShop = isSeedInShop(species.speciesId);
        const shouldShow = rarity <= 1 || inShop;

        if (shouldShow) {
            return {
                key: 'Normal:crop:buy',
                variantId: 'Normal',
                icon: null,
                label: badgeHint('Normal', species, 'Buy seeds from shop'),
                isActive: inShop,
                isPredicted: false,
                bgColor: COLORS.normal,
            };
        }

        return null;
    }

    if (species.type === 'pet') {
        if (species.hasEggs) {
            return {
                key: 'Normal:pet:hatch',
                variantId: 'Normal',
                icon: null,
                label: badgeHint('Normal', species, 'Hatch egg'),
                isActive: true,
                isPredicted: false,
                bgColor: COLORS.normal,
            };
        }

        const rarity = getPetRarity(species.speciesId);
        const inShop = isEggInShop(species.speciesId);
        const shouldShow = rarity <= 1 || inShop;

        if (shouldShow) {
            return {
                key: 'Normal:pet:buy',
                variantId: 'Normal',
                icon: null,
                label: badgeHint('Normal', species, 'Get egg from shop'),
                isActive: inShop,
                isPredicted: false,
                bgColor: COLORS.normal,
            };
        }

        return null;
    }

    return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Badge Generators - Generic Weather Mutation
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Generic badge for any weather-caused mutation (Wet, Chilled, Dawnlit, Ambershine, etc.)
 * Excludes Frozen (composite) and charged mutations (handled separately).
 */
function genericWeatherBadge(
    ctx: UserContext,
    species: SpeciesContext,
    mutationId: string,
): BadgeInfo | null {
    if (species.type !== 'crop' || !species.variantsMissing.includes(mutationId)) return null;

    const weatherId = getWeatherForMutation(mutationId);
    if (!weatherId) return null;

    const icon = getWeatherIcon(weatherId);
    const weatherName = getWeatherName(weatherId);
    const color = getMutationColor(mutationId);
    const hasMutated = hasMutatedCropsFor(species, mutationId);

    // Check if weather is active (handle Frost/Snow equivalence)
    const isActive = ctx.weather.activeWeathers.has(weatherId) ||
        (weatherId === 'Frost' && (ctx.weather.activeWeathers.has('Frost') || ctx.weather.activeWeathers.has('Snow')));
    const isPredicted = ctx.weather.predictedWeathers.has(weatherId) ||
        (weatherId === 'Rain' && ctx.weather.rainPredictedSoon);

    // Priority 1: Ready to harvest mutated crops
    if (hasMutated && species.hasMatureCrops) {
        return {
            key: `${mutationId}:harvest`,
            variantId: mutationId,
            icon,
            label: badgeHint(mutationId, species, 'Pot + log mutated crops!'),
            isActive: true,
            isPredicted: false,
            bgColor: color,
        };
    }

    // Priority 2: Weather active AND have seeds
    if (isActive && species.hasSeeds) {
        return {
            key: `${mutationId}:plant`,
            variantId: mutationId,
            icon,
            label: badgeHint(mutationId, species, `${weatherName} active! Plant seeds`),
            isActive: true,
            isPredicted: false,
            bgColor: color,
        };
    }

    // Priority 3: Weather predicted AND have seeds
    if (isPredicted && species.hasSeeds) {
        return {
            key: `${mutationId}:predicted`,
            variantId: mutationId,
            icon,
            label: badgeHint(mutationId, species, `${weatherName} soon — have seeds ready`),
            isActive: false,
            isPredicted: true,
            bgColor: color,
        };
    }

    return null;
}

/**
 * Generic badge for charged mutations (Dawncharged, Ambercharged, etc.)
 * Requires base mutation crops + celestial plant + correct weather.
 */
function genericChargedBadge(
    ctx: UserContext,
    species: SpeciesContext,
    mutationId: string,
): BadgeInfo | null {
    if (species.type !== 'crop' || !species.variantsMissing.includes(mutationId)) return null;

    const chargedInfo = getChargedMutationInfo(mutationId);
    if (!chargedInfo) return null;

    const { baseMutation, weatherId, celestialCheck } = chargedInfo;
    const icon = getWeatherIcon(weatherId);
    const color = getMutationColor(mutationId);
    const hasBaseMutatedCrops = hasMutatedCropsFor(species, baseMutation);

    // Check celestial plant presence
    let hasCelestial = false;
    if (celestialCheck === 'hasDawnbinder') {
        hasCelestial = ctx.hasDawnbinder;
    } else if (celestialCheck === 'hasMoonbinder') {
        hasCelestial = ctx.hasMoonbinder;
    }

    // Check if weather is active
    const isActive = ctx.weather.activeWeathers.has(weatherId);

    // Only show if actively charging
    if (isActive && hasCelestial && hasBaseMutatedCrops) {
        const weatherName = getWeatherName(weatherId);
        return {
            key: `${mutationId}:active`,
            variantId: mutationId,
            icon,
            label: badgeHint(mutationId, species, `${weatherName} active! Charging`),
            isActive: true,
            isPredicted: false,
            bgColor: color,
        };
    }

    return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Priority Chain (built dynamically)
// ─────────────────────────────────────────────────────────────────────────────

type BadgeGenerator = (ctx: UserContext, species: SpeciesContext) => BadgeInfo | null;

function buildCropBadgeChain(): BadgeGenerator[] {
    const chain: BadgeGenerator[] = [
        rainbowBadge,
        goldBadge,
    ];

    // Add charged mutation badges dynamically
    for (const mutId of getChargedMutationIds()) {
        const id = mutId; // capture for closure
        chain.push((ctx, species) => genericChargedBadge(ctx, species, id));
    }

    // Add weather mutation badges dynamically (excludes Frozen and charged)
    for (const mutId of getWeatherMutationIds()) {
        const id = mutId; // capture for closure
        chain.push((ctx, species) => genericWeatherBadge(ctx, species, id));
    }

    // Frozen badge (unique composite logic)
    chain.push(frozenBadge);

    chain.push(maxWeightBadge);
    chain.push(normalBadge);

    return chain;
}

const PET_BADGE_CHAIN: BadgeGenerator[] = [
    rainbowBadge,
    goldBadge,
    maxWeightBadge,
    normalBadge,
];

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

export function selectBadge(
    speciesId: string,
    category: 'crop' | 'pet',
    ctx: UserContext,
): BadgeInfo | null {
    const species = ctx.speciesContexts.get(speciesId);
    if (!species || species.isComplete) return null;

    const chain = category === 'crop' ? buildCropBadgeChain() : PET_BADGE_CHAIN;

    for (const generator of chain) {
        const badge = generator(ctx, species);
        if (badge) return badge;
    }

    return null;
}
