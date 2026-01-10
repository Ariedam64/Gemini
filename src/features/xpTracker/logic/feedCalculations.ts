/**
 * XP Tracker - Feed Calculation Logic
 *
 * MVP implementation: Calculates feeds until next/max strength
 * assuming full hunger replenishment per feed.
 *
 * Level 2: Imports from types.ts and xpCalculations.ts
 */

import { XP_PER_HOUR } from '../types';
import { MGData } from '../../../modules/data';

// ─────────────────────────────────────────────────────────────────────────────
// Feed Calculations (MVP - Simple Version)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get hunger drain rate per hour from coinsToFullyReplenishHunger
 * MVP assumption: Hunger drains linearly from 100 to 0
 *
 * Based on game mechanics:
 * - coinsToFullyReplenishHunger correlates with hunger drain
 * - Pets with higher costs drain slower
 */
export function getHungerDrainPerHour(species: string): number {
    const petsData = MGData.get('pets');
    if (!petsData) return 100 / 24; // Default: drains in 24 hours

    const petEntry = petsData[species] as { coinsToFullyReplenishHunger?: number } | undefined;
    if (!petEntry?.coinsToFullyReplenishHunger) return 100 / 24;

    // Higher cost pets = slower drain (rough estimate)
    // This is a simplification - actual drain varies by pet
    // MVP: Assume all pets drain hunger at roughly 4.17% per hour (24h to empty)
    return 100 / 24;
}

/**
 * Calculate hours of activity remaining from current hunger
 *
 * @param currentHunger - Current hunger (0-100)
 * @param hungerDrainPerHour - Hunger drain rate per hour
 * @returns Hours until hunger hits 0
 */
export function calculateHoursUntilStarving(
    currentHunger: number,
    hungerDrainPerHour: number
): number {
    if (currentHunger <= 0) return 0;
    if (hungerDrainPerHour <= 0) return Infinity;

    return currentHunger / hungerDrainPerHour;
}

/**
 * Calculate feeds needed to reach a target duration
 *
 * MVP Implementation:
 * - Each feed restores hunger to 100
 * - Calculate how many 100->0 cycles fit in the remaining time
 *
 * @param hoursRemaining - Hours until target (next/max strength)
 * @param currentHunger - Current hunger (0-100)
 * @param hungerDrainPerHour - Hunger drain rate per hour
 * @returns Number of feeds needed
 */
export function calculateFeedsForDuration(
    hoursRemaining: number,
    currentHunger: number,
    hungerDrainPerHour: number
): number {
    if (hoursRemaining <= 0) return 0;
    if (hungerDrainPerHour <= 0) return 0;

    // Hours covered by current hunger
    const hoursFromCurrentHunger = currentHunger / hungerDrainPerHour;

    // If current hunger covers the remaining time, no feeds needed
    if (hoursFromCurrentHunger >= hoursRemaining) return 0;

    // Remaining hours after current hunger depletes
    const hoursAfterStarving = hoursRemaining - hoursFromCurrentHunger;

    // Each full feed gives 100% hunger = 100 / drainRate hours
    const hoursPerFeed = 100 / hungerDrainPerHour;

    // Feeds needed (ceiling to ensure full coverage)
    return Math.ceil(hoursAfterStarving / hoursPerFeed);
}

/**
 * Calculate feeds until next strength level
 */
export function calculateFeedsToNextStrength(
    species: string,
    currentHunger: number,
    hoursToNextStrength: number
): number {
    const hungerDrainPerHour = getHungerDrainPerHour(species);
    return calculateFeedsForDuration(hoursToNextStrength, currentHunger, hungerDrainPerHour);
}

/**
 * Calculate feeds until max strength
 */
export function calculateFeedsToMaxStrength(
    species: string,
    currentHunger: number,
    hoursToMaxStrength: number
): number {
    const hungerDrainPerHour = getHungerDrainPerHour(species);
    return calculateFeedsForDuration(hoursToMaxStrength, currentHunger, hungerDrainPerHour);
}

/**
 * For max-STR XP Boost pets, calculate feeds based on OTHER leveling pets
 *
 * When an XP Boost pet is at max strength but other pets are still leveling,
 * we show feeds remaining based on the longest-leveling other pet.
 *
 * @param isAtMaxStrength - Whether this pet is at max strength
 * @param hasXpBoost - Whether this pet has an XP Boost ability
 * @param species - Pet species
 * @param currentHunger - Current hunger
 * @param ownHoursToMax - This pet's hours to max (0 if already max)
 * @param longestOtherHoursToMax - Longest time to max among other active pets
 * @returns Adjusted feeds to max
 */
export function calculateAdjustedFeedsToMax(
    isAtMaxStrength: boolean,
    hasXpBoost: boolean,
    species: string,
    currentHunger: number,
    ownHoursToMax: number,
    longestOtherHoursToMax: number
): number {
    // If not at max strength, use own hours
    if (!isAtMaxStrength) {
        return calculateFeedsToMaxStrength(species, currentHunger, ownHoursToMax);
    }

    // If at max strength and has XP Boost, use other pets' timeline
    if (hasXpBoost && longestOtherHoursToMax > 0) {
        return calculateFeedsToMaxStrength(species, currentHunger, longestOtherHoursToMax);
    }

    // At max, no XP boost or no other pets leveling
    return 0;
}
