/**
 * Stats Calculations
 *
 * Stats aggregation and UI builder functions for value panel.
 *
 * @module valuePanel/helpers/statsCalculations
 */

import type { UnifiedPet } from '../../../../../../../globals/core/types';
import { Globals } from '../../../../../../../globals';
import { MGData } from '../../../../../../../modules/data';
import { calculateCropSellPrice } from '../../../../../../../modules/calculators/logic/crop';
import {
    SIZE_BOOST_ABILITIES,
    MUTATION_BOOST_ABILITIES,
    GRANTER_ABILITIES,
    HARVEST_ABILITIES,
    REFUND_ABILITIES,
    FRIEND_BONUS_MULTIPLIER
} from './constants';
import {
    el,
    getAbilityData,
    isAbilityActive,
    getStrengthFactor,
    getScaledProbability
} from './abilityUtils';
import { calculateSizeBoostDelta, calculateGranterDelta } from './coinCalculations';

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
    const matureCrops = garden.crops.mature;

    // Filter crops if filter is provided
    // CRITICAL: Only use mature crops - abilities can't affect growing crops
    const crops = tileFilter
        ? matureCrops.filter(c => tileFilter.has(String(c.tileIndex)))
        : matureCrops;

    if (crops.length === 0) {
        return { perProc: 0, perHour: 0 };
    }

    // Use weighted average approach (matches QPM for accuracy)
    let totalEffectPerHour = 0;
    let totalProcsPerHour = 0;

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

            // Calculate weighted delta by fruit count (matches QPM)
            let weightedDelta = 0;
            let totalWeight = 0;

            for (const crop of crops) {
                const weight = Math.max(1, Math.floor(crop.fruitCount));

                const delta = calculateSizeBoostDelta(
                    crop.species,
                    crop.targetScale,
                    crop.mutations,
                    scaledIncrease
                );

                weightedDelta += delta * weight;
                totalWeight += weight;
            }

            const avgDeltaPerProc = totalWeight > 0 ? weightedDelta / totalWeight : 0;

            // Accumulate weighted by proc rate
            totalEffectPerHour += avgDeltaPerProc * procsPerHour;
            totalProcsPerHour += procsPerHour;
        }
    }

    // Weighted average: total effect per hour / total procs per hour
    const avgPerProc = totalProcsPerHour > 0 ? totalEffectPerHour / totalProcsPerHour : 0;

    return { perProc: avgPerProc, perHour: totalEffectPerHour };
}

export function calculateMutationBoostStats(pets: UnifiedPet[], currentWeather: string | null, tileFilter?: Set<string>) {
    const garden = Globals.myGarden.get();
    const matureCrops = garden.crops.mature;
    const weatherData = Globals.weather.get();
    const weatherInfo = MGData.get('weather');

    // Filter crops if filter is provided
    // CRITICAL: Only use mature crops - abilities can't affect growing crops
    const crops = tileFilter
        ? matureCrops.filter(c => tileFilter.has(String(c.tileIndex)))
        : matureCrops;

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
    const matureCrops = garden.crops.mature;

    // Filter crops if filter is provided
    // CRITICAL: Only use mature crops - abilities can't affect growing crops
    const crops = tileFilter
        ? matureCrops.filter(c => tileFilter.has(String(c.tileIndex)))
        : matureCrops;

    if (crops.length === 0) {
        return { perProc: 0, perHour: 0 };
    }

    // Use weighted average approach (matches QPM for accuracy)
    let totalEffectPerHour = 0;
    let totalProcsPerHour = 0;

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

            // Calculate weighted delta by fruit count (matches QPM)
            let weightedDelta = 0;
            let totalWeight = 0;

            for (const crop of crops) {
                // Filter crops based on mutation type
                // Color mutations (Gold/Rainbow) are mutually exclusive - skip if crop has ANY color mutation
                // Weather mutations stack - only skip if crop already has the specific weather mutation
                const isColorMutation = grantedMutation === 'Gold' || grantedMutation === 'Rainbow';

                if (isColorMutation) {
                    // For color mutations: exclude crops with Gold OR Rainbow (matches QPM logic)
                    const hasGold = crop.mutations.includes('Gold');
                    const hasRainbow = crop.mutations.includes('Rainbow');
                    if (hasGold || hasRainbow) {
                        continue;
                    }
                } else {
                    // For weather mutations: only exclude if crop already has this specific mutation
                    if (crop.mutations.includes(grantedMutation)) {
                        continue;
                    }
                }

                const weight = Math.max(1, Math.floor(crop.fruitCount));

                const delta = calculateGranterDelta(
                    crop.species,
                    crop.targetScale,
                    crop.mutations,
                    grantedMutation
                );

                weightedDelta += delta * weight;
                totalWeight += weight;
            }

            const avgDeltaPerProc = totalWeight > 0 ? weightedDelta / totalWeight : 0;
            const effectPerHour = avgDeltaPerProc * procsPerHour;

            // Accumulate weighted by proc rate
            totalEffectPerHour += effectPerHour;
            totalProcsPerHour += procsPerHour;
        }
    }

    // Weighted average: total effect per hour / total procs per hour
    const avgPerProc = totalProcsPerHour > 0 ? totalEffectPerHour / totalProcsPerHour : 0;

    return { perProc: avgPerProc, perHour: totalEffectPerHour };
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
        const value = calculateCropSellPrice(crop.species, crop.targetScale, crop.mutations) * FRIEND_BONUS_MULTIPLIER;
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
        const value = calculateCropSellPrice(crop.species, crop.targetScale, crop.mutations) * FRIEND_BONUS_MULTIPLIER;
        expectedCoins += value * totalProbability;
    }

    return { expectedCrops, expectedCoins };
}
