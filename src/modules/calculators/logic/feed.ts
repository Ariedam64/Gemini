/**
 * Feed Calculation Logic
 *
 * Calculates feeds until next/max strength
 * assuming full hunger replenishment per feed.
 */

import { XP_PER_HOUR, PET_HUNGER_DEPLETION_MINUTES } from '../types';
import { MGData } from '../../data';

// ─────────────────────────────────────────────────────────────────────────────
// Feed Calculations
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get hunger depletion rate per hour
 * Formula from QPM: rate = (hungerCap / depletionMinutes) * 60
 *
 * Uses MGData for hungerCap, wiki data for depletion times.
 */
export function getHungerDrainPerHour(species: string): number {
    const petsData = MGData.get('pets');
    if (!petsData) return 100 / 24; // Fallback

    const petEntry = petsData[species] as { coinsToFullyReplenishHunger?: number } | undefined;
    if (!petEntry?.coinsToFullyReplenishHunger) return 100 / 24;

    // Get species-specific depletion time (minutes)
    const depletionMinutes = PET_HUNGER_DEPLETION_MINUTES[species];
    if (!depletionMinutes) {
        console.warn(`[Feed] Unknown species "${species}", using 60min default`);
        return (petEntry.coinsToFullyReplenishHunger / 60) * 60;
    }

    // QPM Formula:
    // hungerCap = coinsToFullyReplenishHunger (max hunger value)
    // depletionRatePerMinute = hungerCap / depletionMinutes
    // depletionRatePerHour = depletionRatePerMinute * 60
    const hungerCap = petEntry.coinsToFullyReplenishHunger;
    const depletionRatePerMinute = hungerCap / depletionMinutes;
    const depletionRatePerHour = depletionRatePerMinute * 60;

    // Return actual depletion rate in hunger units per hour
    // Game tracks hunger as coin value (0 to hungerCap), not percentage
    return depletionRatePerHour;
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
 * Implementation:
 * - Each feed restores hunger to hungerCap (full hunger)
 * - Calculate how many hunger cycles fit in the remaining time
 * - hungerDrainPerHour is in actual hunger units per hour
 *
 * @param hoursRemaining - Hours until target (next/max strength)
 * @param currentHunger - Current hunger in coin units
 * @param hungerDrainPerHour - Hunger drain rate in coin units per hour
 * @param hungerCap - Max hunger for this species
 * @returns Number of feeds needed
 */
export function calculateFeedsForDuration(
    hoursRemaining: number,
    currentHunger: number,
    hungerDrainPerHour: number,
    hungerCap: number
): number {
    if (hoursRemaining <= 0) return 0;
    if (hungerDrainPerHour <= 0) return 0;

    // Hours covered by current hunger
    const hoursFromCurrentHunger = currentHunger / hungerDrainPerHour;

    // If current hunger covers the remaining time, no feeds needed
    if (hoursFromCurrentHunger >= hoursRemaining) return 0;

    // Remaining hours after current hunger depletes
    const hoursAfterStarving = hoursRemaining - hoursFromCurrentHunger;

    // Each full feed restores to hungerCap
    const hoursPerFeed = hungerCap / hungerDrainPerHour;

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
    const petsData = MGData.get('pets');
    if (!petsData) return 0;

    const petEntry = petsData[species] as { coinsToFullyReplenishHunger?: number } | undefined;
    if (!petEntry?.coinsToFullyReplenishHunger) return 0;

    const hungerCap = petEntry.coinsToFullyReplenishHunger;
    const hungerDrainPerHour = getHungerDrainPerHour(species);

    return calculateFeedsForDuration(hoursToNextStrength, currentHunger, hungerDrainPerHour, hungerCap);
}

/**
 * Calculate feeds until max strength
 */
export function calculateFeedsToMaxStrength(
    species: string,
    currentHunger: number,
    hoursToMaxStrength: number
): number {
    const petsData = MGData.get('pets');
    if (!petsData) return 0;

    const petEntry = petsData[species] as { coinsToFullyReplenishHunger?: number } | undefined;
    if (!petEntry?.coinsToFullyReplenishHunger) return 0;

    const hungerCap = petEntry.coinsToFullyReplenishHunger;
    const hungerDrainPerHour = getHungerDrainPerHour(species);

    return calculateFeedsForDuration(hoursToMaxStrength, currentHunger, hungerDrainPerHour, hungerCap);
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
