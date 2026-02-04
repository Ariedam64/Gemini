/**
 * Coin Calculations
 *
 * Delta calculation functions for ability value changes.
 *
 * @module valuePanel/helpers/coinCalculations
 */

import { calculateCropSellPrice, getCropData } from '../../../../../../../modules/calculators/logic/crop';
import { FRIEND_BONUS_MULTIPLIER } from './constants';

// ─────────────────────────────────────────────────────────────────────────────
// Coin Calculations
// ─────────────────────────────────────────────────────────────────────────────

export function calculateSizeBoostDelta(
    species: string,
    targetScale: number,
    mutations: string[],
    scaleIncreasePct: number,
    friendBonus: number = FRIEND_BONUS_MULTIPLIER
): number {
    const cropData = getCropData(species);
    if (!cropData) return 0;

    const currentValue = calculateCropSellPrice(species, targetScale, mutations) * friendBonus;
    const newScale = Math.min(targetScale * (1 + scaleIncreasePct / 100), cropData.maxScale);
    const newValue = calculateCropSellPrice(species, newScale, mutations) * friendBonus;

    return Math.max(0, newValue - currentValue);
}

export function calculateGranterDelta(
    species: string,
    targetScale: number,
    mutations: string[],
    grantedMutation: string,
    friendBonus: number = FRIEND_BONUS_MULTIPLIER
): number {
    if (mutations.includes(grantedMutation)) return 0;

    const currentValue = calculateCropSellPrice(species, targetScale, mutations) * friendBonus;
    const newMutations = [...mutations, grantedMutation];
    const newValue = calculateCropSellPrice(species, targetScale, newMutations) * friendBonus;

    return Math.max(0, newValue - currentValue);
}
