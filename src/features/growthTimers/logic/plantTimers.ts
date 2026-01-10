/**
 * Plant Timer Calculations
 *
 * Calculates growth timers for plants in the garden.
 * Filters plants by team boosts and calculates adjusted maturation times.
 *
 * Per .claude/rules/core.md:
 * - No hardcoded game data (use MGData and Globals)
 * - State via Globals (no ad-hoc globals)
 * - Pure calculation functions
 *
 * @module plantTimers
 */

import { Globals } from '../../../globals';
import { MGPetTeam } from '../../petTeam';
import type { GrowthTimer } from '../types';
import { calculatePlantBoosts, calculateBoostStats } from './boostCalculator';

// ─────────────────────────────────────────────────────────────────────────────
// Plant Timer Calculations
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calculate plant growth timers for a team
 *
 * Filters plants to show only those boosted by the team's abilities.
 * Calculates adjusted maturation times based on boost effects.
 *
 * @param teamId - Team ID to calculate timers for
 * @returns Array of growth timers for plants boosted by this team
 */
export function calculatePlantTimers(teamId: string): GrowthTimer[] {
    // Get team and pets
    const team = MGPetTeam.getTeam(teamId);
    if (!team) return [];

    const pets = MGPetTeam.getPetsForTeam(team);
    if (pets.length === 0) return [];

    // Calculate boosts from team
    const boosts = calculatePlantBoosts(pets);
    if (boosts.length === 0) {
        // No boosts = show all plants with no adjustments
        return [];
    }

    const stats = calculateBoostStats(boosts);

    // Get plants from garden
    // TODO: Access plants via Globals.myGarden or MGData when available
    // For now, return empty array until we have access to garden data
    const plants: GrowthTimer[] = [];

    // NOTE: Implementation will be completed once garden data access is available
    // Expected pattern:
    // const garden = Globals.myGarden.get();
    // const plants = garden.plants.filter(plant => plant.plantedAt && !plant.matured);
    // const timers = plants.map(plant => calculatePlantTimer(plant, boosts, stats));

    return plants;
}

/**
 * Calculate single plant timer
 *
 * @param plant - Plant data from garden
 * @param boosts - Active boosts affecting this plant
 * @param stats - Aggregate boost stats
 * @returns Growth timer for this plant
 */
function calculatePlantTimer(
    plant: any, // TODO: Type when garden data access available
    boosts: any[],
    stats: { procsPerHour: number; timeReductionPerHour: number }
): GrowthTimer {
    const now = Date.now();
    const elapsedMs = now - plant.plantedAt;
    const elapsedHours = elapsedMs / 3600000;

    // Calculate time reduction
    const totalReductionMs = elapsedHours * stats.timeReductionPerHour * 60000;
    const adjustedMaturedAt = plant.baseMaturedAt - totalReductionMs;
    const remainingMs = Math.max(0, adjustedMaturedAt - now);

    return {
        id: plant.tileIndex,
        type: 'plant',
        tileIndex: plant.tileIndex,
        position: plant.position,
        species: plant.floraSpecies,
        plantedAt: plant.plantedAt,
        baseMaturedAt: plant.maturedAt || plant.baseMaturedAt,
        adjustedMaturedAt,
        remainingMs,
        activeBoosts: boosts,
        procsPerHour: stats.procsPerHour,
        timeReductionPerHour: stats.timeReductionPerHour,
    };
}

/**
 * Get all plant timers (unfiltered, for Garden tab)
 *
 * @returns All plant timers across all teams
 */
export function getAllPlantTimers(): GrowthTimer[] {
    // TODO: Implement when garden data access available
    return [];
}
