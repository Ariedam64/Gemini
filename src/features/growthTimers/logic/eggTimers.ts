/**
 * Egg Timer Calculations
 *
 * Calculates growth timers for eggs in the garden.
 * Filters eggs by team boosts and calculates adjusted maturation times.
 *
 * Per .claude/rules/core.md:
 * - No hardcoded game data (use MGData and Globals)
 * - State via Globals (no ad-hoc globals)
 * - Pure calculation functions
 *
 * @module eggTimers
 */

import { Globals } from '../../../globals';
import { MGPetTeam } from '../../petTeam';
import type { GrowthTimer } from '../types';
import { calculateEggBoosts, calculateBoostStats } from './boostCalculator';

// ─────────────────────────────────────────────────────────────────────────────
// Egg Timer Calculations
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calculate egg growth timers for a team
 *
 * Filters eggs to show only those boosted by the team's abilities.
 * Calculates adjusted maturation times based on boost effects.
 *
 * @param teamId - Team ID to calculate timers for
 * @returns Array of growth timers for eggs boosted by this team
 */
export function calculateEggTimers(teamId: string): GrowthTimer[] {
    // Get team and pets
    const team = MGPetTeam.getTeam(teamId);
    if (!team) return [];

    const pets = MGPetTeam.getPetsForTeam(team);
    if (pets.length === 0) return [];

    // Calculate boosts from team
    const boosts = calculateEggBoosts(pets);
    if (boosts.length === 0) {
        // No boosts = show all eggs with no adjustments
        return [];
    }

    const stats = calculateBoostStats(boosts);

    // Get eggs from garden
    // TODO: Access eggs via Globals.myGarden or MGData when available
    // For now, return empty array until we have access to garden data
    const eggs: GrowthTimer[] = [];

    // NOTE: Implementation will be completed once garden data access is available
    // Expected pattern:
    // const garden = Globals.myGarden.get();
    // const eggs = garden.eggs.filter(egg => egg.plantedAt && !egg.matured);
    // const timers = eggs.map(egg => calculateEggTimer(egg, boosts, stats));

    return eggs;
}

/**
 * Calculate single egg timer
 *
 * @param egg - Egg data from garden
 * @param boosts - Active boosts affecting this egg
 * @param stats - Aggregate boost stats
 * @returns Growth timer for this egg
 */
function calculateEggTimer(
    egg: any, // TODO: Type when garden data access available
    boosts: any[],
    stats: { procsPerHour: number; timeReductionPerHour: number }
): GrowthTimer {
    const now = Date.now();
    const elapsedMs = now - egg.plantedAt;
    const elapsedHours = elapsedMs / 3600000;

    // Calculate time reduction
    const totalReductionMs = elapsedHours * stats.timeReductionPerHour * 60000;
    const adjustedMaturedAt = egg.baseMaturedAt - totalReductionMs;
    const remainingMs = Math.max(0, adjustedMaturedAt - now);

    return {
        id: egg.tileIndex,
        type: 'egg',
        tileIndex: egg.tileIndex,
        position: egg.position,
        species: egg.eggId,
        plantedAt: egg.plantedAt,
        baseMaturedAt: egg.maturedAt || egg.baseMaturedAt,
        adjustedMaturedAt,
        remainingMs,
        activeBoosts: boosts,
        procsPerHour: stats.procsPerHour,
        timeReductionPerHour: stats.timeReductionPerHour,
    };
}

/**
 * Get all egg timers (unfiltered, for Garden tab)
 *
 * @returns All egg timers across all teams
 */
export function getAllEggTimers(): GrowthTimer[] {
    // TODO: Implement when garden data access available
    return [];
}
