/**
 * Value Panel Helpers
 *
 * Shared helper functions for value/coin panel rendering.
 * Extracted from valuePanel.ts for maintainability.
 *
 * @module valuePanel/helpers
 */

import type { UnifiedPet } from '../../../../../../globals/core/types';
import { Globals } from '../../../../../../globals';
import { MGData } from '../../../../../../modules/data';
import { calculateCropSellPrice, getCropData } from '../../../../../../modules/calculators/logic/crop';

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

export const MAX_TARGET_STRENGTH = 100;

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

// ─────────────────────────────────────────────────────────────────────────────
// DOM Helpers
// ─────────────────────────────────────────────────────────────────────────────

export function el(tag: string, className?: string, text?: string): HTMLElement {
    const elem = document.createElement(tag);
    if (className) elem.className = className;
    if (text) elem.textContent = text;
    return elem;
}

export function formatCoin(value: number): string {
    if (value >= 1_000_000_000_000) {
        // Trillions: 43.67T
        return `${(value / 1_000_000_000_000).toFixed(2)}T`;
    } else if (value >= 1_000_000_000) {
        // Billions: 452.12B
        return `${(value / 1_000_000_000).toFixed(2)}B`;
    } else if (value >= 1_000_000) {
        // Millions: 245.54M
        return `${(value / 1_000_000).toFixed(2)}M`;
    } else if (value >= 1000) {
        // Thousands: 34.6k or 456k
        const thousands = value / 1000;
        return thousands >= 100 ? `${Math.round(thousands)}k` : `${thousands.toFixed(1)}k`;
    }
    return String(Math.round(value));
}

// ─────────────────────────────────────────────────────────────────────────────
// Ability Utilities
// ─────────────────────────────────────────────────────────────────────────────

export function getAbilityData(abilityId: string) {
    const abilities = MGData.get('abilities');
    if (!abilities) return null;

    const ability = abilities[abilityId] as {
        name?: string;
        baseProbability?: number;
        baseParameters?: {
            scaleIncreasePercentage?: number;
            mutationChanceIncreasePercentage?: number;
            grantedMutations?: string[];
            requiredWeather?: string;
        };
    } | undefined;

    if (!ability) return null;

    return {
        id: abilityId,
        name: ability.name ?? abilityId,
        baseProbability: ability.baseProbability ?? 0,
        scaleIncreasePercentage: ability.baseParameters?.scaleIncreasePercentage ?? 0,
        mutationChanceIncreasePercentage: ability.baseParameters?.mutationChanceIncreasePercentage ?? 0,
        grantedMutations: ability.baseParameters?.grantedMutations ?? [],
        requiredWeather: ability.baseParameters?.requiredWeather ?? null,
    };
}

export function hasAbility(pet: UnifiedPet, abilities: readonly string[]): boolean {
    return pet.abilities.some(a => (abilities as readonly string[]).includes(a));
}

export function isAbilityActive(
    pet: UnifiedPet,
    abilityId: string,
    currentWeather: string | null
): boolean {
    if (pet.hunger <= 0) return false;

    const abilityData = getAbilityData(abilityId);
    if (!abilityData) return false;

    if (abilityData.requiredWeather && currentWeather !== abilityData.requiredWeather) {
        return false;
    }

    return true;
}

export function getStrengthFactor(pet: UnifiedPet): number {
    // Use pet's actual maxStrength for accurate scaling
    // Wiki: "Max Strength ranges from 80 to 100"
    // A pet at max STR should have 100% effectiveness regardless of their max value
    return pet.currentStrength / pet.maxStrength;
}

export function getScaledProbability(baseProbability: number, strengthFactor: number): number {
    return Math.min(100, baseProbability * strengthFactor);
}

// ─────────────────────────────────────────────────────────────────────────────
// Coin Calculations
// ─────────────────────────────────────────────────────────────────────────────

export function calculateSizeBoostDelta(
    species: string,
    targetScale: number,
    mutations: string[],
    scaleIncreasePct: number
): number {
    const cropData = getCropData(species);
    if (!cropData) return 0;

    const currentValue = calculateCropSellPrice(species, targetScale, mutations);
    const newScale = Math.min(targetScale * (1 + scaleIncreasePct / 100), cropData.maxScale);
    const newValue = calculateCropSellPrice(species, newScale, mutations);

    return Math.max(0, newValue - currentValue);
}

export function calculateGranterDelta(
    species: string,
    targetScale: number,
    mutations: string[],
    grantedMutation: string
): number {
    if (mutations.includes(grantedMutation)) return 0;

    const currentValue = calculateCropSellPrice(species, targetScale, mutations);
    const newMutations = [...mutations, grantedMutation];
    const newValue = calculateCropSellPrice(species, targetScale, newMutations);

    return Math.max(0, newValue - currentValue);
}

// ─────────────────────────────────────────────────────────────────────────────
// UI Builders
// ─────────────────────────────────────────────────────────────────────────────

export function buildStatRow(label: string, perProc: string, perHour: string): HTMLElement {
    const row = el('div', 'stat-row');
    row.appendChild(el('span', 'stat__label', label));
    row.appendChild(el('span', 'stat__value', perProc));
    row.appendChild(el('span', 'stat__timer', perHour));
    return row;
}

export function buildHarvestRow(label: string, crops: string, coins: string): HTMLElement {
    const row = el('div', 'stat-row');
    row.appendChild(el('span', 'stat__label', label));
    row.appendChild(el('span', 'stat__value', crops));
    row.appendChild(el('span', 'stat__timer', coins));
    return row;
}

// ─────────────────────────────────────────────────────────────────────────────
// Stats Calculations
// ─────────────────────────────────────────────────────────────────────────────

export function calculateSizeBoostStats(pets: UnifiedPet[], currentWeather: string | null, tileFilter?: Set<string>) {
    const garden = Globals.myGarden.get();
    const allCrops = garden.crops.all;

    // Filter crops if filter is provided
    const crops = tileFilter
        ? allCrops.filter(c => tileFilter.has(String(c.tileIndex)))
        : allCrops;

    if (crops.length === 0) {
        return { perProc: 0, perHour: 0 };
    }

    let totalProcsPerHour = 0;
    let totalDeltaPerProc = 0;

    for (const pet of pets) {
        const strengthFactor = getStrengthFactor(pet);

        for (const abilityId of SIZE_BOOST_ABILITIES) {
            if (!pet.abilities.includes(abilityId)) continue;
            if (!isAbilityActive(pet, abilityId, currentWeather)) continue;

            const abilityData = getAbilityData(abilityId);
            if (!abilityData) continue;

            const scaledProb = getScaledProbability(abilityData.baseProbability, strengthFactor);
            const scaledIncrease = abilityData.scaleIncreasePercentage * strengthFactor;
            const procsPerHour = (scaledProb / 100) * 60;

            let totalDelta = 0;
            for (const crop of crops) {
                const delta = calculateSizeBoostDelta(
                    crop.species,
                    crop.targetScale,
                    crop.mutations,
                    scaledIncrease
                );
                totalDelta += delta;
            }
            const avgDelta = totalDelta / crops.length;

            totalProcsPerHour += procsPerHour;
            totalDeltaPerProc += avgDelta;
        }
    }

    const avgPerProc = pets.length > 0 ? totalDeltaPerProc / pets.length : 0;
    const perHour = totalProcsPerHour * avgPerProc;

    return { perProc: avgPerProc, perHour };
}

export function calculateMutationBoostStats(pets: UnifiedPet[], currentWeather: string | null, tileFilter?: Set<string>) {
    const garden = Globals.myGarden.get();
    const allCrops = garden.crops.all;
    const weatherData = Globals.weather.get();
    const weatherInfo = MGData.get('weather');

    // Filter crops if filter is provided
    const crops = tileFilter
        ? allCrops.filter(c => tileFilter.has(String(c.tileIndex)))
        : allCrops;

    if (crops.length === 0 || !weatherData.isActive || !weatherInfo) {
        return { perProc: 0, perHour: 0 };
    }

    const currentWeatherData = weatherInfo[weatherData.type] as {
        mutator?: {
            mutation?: string;
            chancePerMinutePerCrop?: number;
        };
    } | undefined;

    if (!currentWeatherData?.mutator) {
        return { perProc: 0, perHour: 0 };
    }

    const baseChance = currentWeatherData.mutator.chancePerMinutePerCrop ?? 0;
    const grantedMutation = currentWeatherData.mutator.mutation ?? '';

    let totalIncrease = 0;
    for (const pet of pets) {
        const strengthFactor = getStrengthFactor(pet);

        for (const abilityId of MUTATION_BOOST_ABILITIES) {
            if (!pet.abilities.includes(abilityId)) continue;
            if (!isAbilityActive(pet, abilityId, currentWeather)) continue;

            const abilityData = getAbilityData(abilityId);
            if (!abilityData) continue;

            const scaledIncrease = abilityData.mutationChanceIncreasePercentage * strengthFactor;
            totalIncrease += scaledIncrease;
        }
    }

    const additionalChance = baseChance * (totalIncrease / 100);
    const additionalProcsPerHour = crops.length * (additionalChance / 100) * 60;

    let totalDelta = 0;
    for (const crop of crops) {
        const delta = calculateGranterDelta(
            crop.species,
            crop.targetScale,
            crop.mutations,
            grantedMutation
        );
        totalDelta += delta;
    }
    const avgDelta = crops.length > 0 ? totalDelta / crops.length : 0;

    return { perProc: avgDelta, perHour: additionalProcsPerHour * avgDelta };
}

export function calculateGranterStats(pets: UnifiedPet[], currentWeather: string | null, tileFilter?: Set<string>) {
    const garden = Globals.myGarden.get();
    const allCrops = garden.crops.all;

    // Filter crops if filter is provided
    const crops = tileFilter
        ? allCrops.filter(c => tileFilter.has(String(c.tileIndex)))
        : allCrops;

    if (crops.length === 0) {
        return { perProc: 0, perHour: 0 };
    }

    let totalProcsPerHour = 0;
    let totalDeltaPerProc = 0;

    for (const pet of pets) {
        const strengthFactor = getStrengthFactor(pet);

        for (const abilityId of GRANTER_ABILITIES) {
            if (!pet.abilities.includes(abilityId)) continue;
            if (!isAbilityActive(pet, abilityId, currentWeather)) continue;

            const abilityData = getAbilityData(abilityId);
            if (!abilityData) continue;

            const scaledProb = getScaledProbability(abilityData.baseProbability, strengthFactor);
            const procsPerHour = (scaledProb / 100) * 60;

            const grantedMutations = abilityData.grantedMutations;
            if (grantedMutations.length === 0) continue;

            const grantedMutation = grantedMutations[0];

            let totalDelta = 0;
            for (const crop of crops) {
                const delta = calculateGranterDelta(
                    crop.species,
                    crop.targetScale,
                    crop.mutations,
                    grantedMutation
                );
                totalDelta += delta;
            }
            const avgDelta = totalDelta / crops.length;

            totalProcsPerHour += procsPerHour;
            totalDeltaPerProc += avgDelta;
        }
    }

    const avgPerProc = pets.length > 0 ? totalDeltaPerProc / pets.length : 0;
    const perHour = totalProcsPerHour * avgPerProc;

    return { perProc: avgPerProc, perHour };
}

export function calculateHarvestStats(pets: UnifiedPet[], currentWeather: string | null, tileFilter?: Set<string>) {
    const garden = Globals.myGarden.get();
    const allCrops = garden.crops.all;
    const allMature = garden.crops.mature;

    // Filter items if filter is provided
    // Logic: Filter all and mature separately, then use mature if any are in selection
    const filteredAll = tileFilter ? allCrops.filter(c => tileFilter.has(String(c.tileIndex))) : allCrops;
    const filteredMature = tileFilter ? allMature.filter(c => tileFilter.has(String(c.tileIndex))) : allMature;

    const harvestable = filteredMature.length > 0 ? filteredMature : filteredAll;

    if (harvestable.length === 0) {
        return { expectedCrops: 0, expectedCoins: 0 };
    }

    let totalProbability = 0;

    for (const pet of pets) {
        const strengthFactor = getStrengthFactor(pet);

        for (const abilityId of HARVEST_ABILITIES) {
            if (!pet.abilities.includes(abilityId)) continue;
            if (!isAbilityActive(pet, abilityId, currentWeather)) continue;

            const abilityData = getAbilityData(abilityId);
            if (!abilityData) continue;

            const scaledProb = getScaledProbability(abilityData.baseProbability, strengthFactor);
            totalProbability += scaledProb / 100;
        }
    }

    const expectedCrops = harvestable.length * totalProbability;

    let expectedCoins = 0;
    for (const crop of harvestable) {
        const value = calculateCropSellPrice(crop.species, crop.targetScale, crop.mutations);
        expectedCoins += value * totalProbability;
    }

    return { expectedCrops, expectedCoins };
}

export function calculateRefundStats(pets: UnifiedPet[], currentWeather: string | null, tileFilter?: Set<string>) {
    const garden = Globals.myGarden.get();
    const allCrops = garden.crops.all;
    const allMature = garden.crops.mature;

    // Filter items if filter is provided
    // Logic: Filter all and mature separately, then use mature if any are in selection
    const filteredAll = tileFilter ? allCrops.filter(c => tileFilter.has(String(c.tileIndex))) : allCrops;
    const filteredMature = tileFilter ? allMature.filter(c => tileFilter.has(String(c.tileIndex))) : allMature;

    const harvestable = filteredMature.length > 0 ? filteredMature : filteredAll;

    if (harvestable.length === 0) {
        return { expectedCrops: 0, expectedCoins: 0 };
    }

    let totalProbability = 0;

    for (const pet of pets) {
        const strengthFactor = getStrengthFactor(pet);

        for (const abilityId of REFUND_ABILITIES) {
            if (!pet.abilities.includes(abilityId)) continue;
            if (!isAbilityActive(pet, abilityId, currentWeather)) continue;

            const abilityData = getAbilityData(abilityId);
            if (!abilityData) continue;

            const scaledProb = getScaledProbability(abilityData.baseProbability, strengthFactor);
            totalProbability += scaledProb / 100;
        }
    }

    const expectedCrops = harvestable.length * totalProbability;

    let expectedCoins = 0;
    for (const crop of harvestable) {
        const value = calculateCropSellPrice(crop.species, crop.targetScale, crop.mutations);
        expectedCoins += value * totalProbability;
    }

    return { expectedCrops, expectedCoins };
}
