/**
 * Boost Calculator Logic
 *
 * Calculates growth boosts from pet abilities.
 * Based on ability data from 01-ABILITY-SYSTEM-REFERENCE.md.
 *
 * Per .claude/rules/core.md:
 * - No hardcoded game data (use ability constants from types.ts)
 * - Pure functions for testability
 * - No side effects
 *
 * @module boostCalculator
 */

import type { UnifiedPet } from '../../../globals/core/types';
import type { BoostInfo } from '../types';
import { EGG_BOOST_ABILITIES, PLANT_BOOST_ABILITIES } from '../types';

// ─────────────────────────────────────────────────────────────────────────────
// Boost Detection
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calculate egg growth boosts from active pets
 *
 * @param activePets - Pets currently in active team
 * @returns Array of boost info from each pet's egg growth abilities
 */
export function calculateEggBoosts(activePets: UnifiedPet[]): BoostInfo[] {
    const boosts: BoostInfo[] = [];

    for (const pet of activePets) {
        for (const ability of pet.abilities) {
            if (ability in EGG_BOOST_ABILITIES) {
                const data = EGG_BOOST_ABILITIES[ability];
                boosts.push({
                    petId: pet.id,
                    petName: pet.name || pet.petSpecies,
                    abilityId: ability,
                    procRate: data.procRate,
                    minutesPerProc: data.minutesPerProc,
                });
            }
        }
    }

    return boosts;
}

/**
 * Calculate plant growth boosts from active pets
 *
 * @param activePets - Pets currently in active team
 * @returns Array of boost info from each pet's plant growth abilities
 */
export function calculatePlantBoosts(activePets: UnifiedPet[]): BoostInfo[] {
    const boosts: BoostInfo[] = [];

    for (const pet of activePets) {
        for (const ability of pet.abilities) {
            if (ability in PLANT_BOOST_ABILITIES) {
                const data = PLANT_BOOST_ABILITIES[ability];
                boosts.push({
                    petId: pet.id,
                    petName: pet.name || pet.petSpecies,
                    abilityId: ability,
                    procRate: data.procRate,
                    minutesPerProc: data.minutesPerProc,
                });
            }
        }
    }

    return boosts;
}

// ─────────────────────────────────────────────────────────────────────────────
// Boost Statistics
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calculate boost statistics from boost info array
 *
 * Formula:
 * - procsPerHour = procRate * 60
 * - timeReductionPerHour = procsPerHour * minutesPerProc
 *
 * @param boosts - Array of boost info
 * @returns Aggregate boost statistics
 */
export function calculateBoostStats(boosts: BoostInfo[]): {
    procsPerHour: number;
    timeReductionPerHour: number;
} {
    let totalProcsPerHour = 0;
    let totalReductionPerHour = 0;

    for (const boost of boosts) {
        const procsPerHour = boost.procRate * 60;
        totalProcsPerHour += procsPerHour;
        totalReductionPerHour += procsPerHour * boost.minutesPerProc;
    }

    return {
        procsPerHour: totalProcsPerHour,
        timeReductionPerHour: totalReductionPerHour,
    };
}

/**
 * Check if a team has any egg growth boosts
 *
 * @param pets - Pets in team
 * @returns True if team has egg growth boost abilities
 */
export function hasEggBoosts(pets: UnifiedPet[]): boolean {
    return pets.some(pet =>
        pet.abilities.some(ability => ability in EGG_BOOST_ABILITIES)
    );
}

/**
 * Check if a team has any plant growth boosts
 *
 * @param pets - Pets in team
 * @returns True if team has plant growth boost abilities
 */
export function hasPlantBoosts(pets: UnifiedPet[]): boolean {
    return pets.some(pet =>
        pet.abilities.some(ability => ability in PLANT_BOOST_ABILITIES)
    );
}
