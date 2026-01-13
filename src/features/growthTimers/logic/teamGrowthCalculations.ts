/**
 * Team Growth Calculations
 *
 * Calculate growth timer data for specific pet teams (not all pets).
 * Used for Growth Tracker in Trackers section.
 *
 * Level 2: Imports from types.ts and other logic files
 */

import { Globals } from '../../../globals';
import type { UnifiedPet } from '../../../globals/core/types';
import type { PetTeam } from '../../petTeam/types';
import type {
    TeamGrowthData,
    GrowthStats,
    TeamPetGrowthData,
} from '../../../ui/sections/Trackers/parts/GrowthTracker';
import { MGPetTeam } from '../../petTeam';
import {
    calculateEggBoosts,
    calculatePlantBoosts,
    calculateBoostStats,
} from './boostCalculator';
import { EGG_BOOST_ABILITIES, PLANT_BOOST_ABILITIES } from '../types';
import {
    calculateCurrentStrength,
    calculateMaxStrength,
} from '../../../modules/calculators/logic/xp';

// ─────────────────────────────────────────────────────────────────────────────
// Team Growth Calculation
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calculate full growth data for a specific pet team
 *
 * @param teamId - The team ID to calculate growth for
 * @returns Team growth data or null if team not found
 */
export function calculateTeamGrowthData(teamId: string): TeamGrowthData | null {
    // Get the team
    const team = MGPetTeam.getTeam(teamId);
    if (!team) return null;

    // Get pets for this team
    const teamPets = MGPetTeam.getPetsForTeam(team);

    // Calculate egg and plant stats
    const eggStats = calculateGrowthStats(team, teamPets, 'egg');
    const plantStats = calculateGrowthStats(team, teamPets, 'plant');

    // Build full pet list for the team (always 3 slots)
    const pets: TeamPetGrowthData[] = teamPets.map(pet => {
        const eggBoost = getPetMultiplier(pet, 'egg');
        const plantBoost = getPetMultiplier(pet, 'plant');

        const growthBoosts: TeamPetGrowthData['growthBoosts'] = [];
        if (eggBoost > 1) {
            growthBoosts.push({ type: 'egg', multiplier: eggBoost });
        }
        if (plantBoost > 1) {
            growthBoosts.push({ type: 'plant', multiplier: plantBoost });
        }

        const maxStr = calculateMaxStrength(pet.petSpecies, pet.targetScale);
        const currentStr = calculateCurrentStrength(pet.petSpecies, pet.xp, maxStr);

        return {
            id: pet.id,
            name: pet.name || pet.petSpecies,
            species: pet.petSpecies,
            currentStrength: currentStr,
            maxStrength: maxStr,
            isMaxStrength: currentStr >= maxStr,
            mutations: pet.mutations,
            growthBoosts
        };
    });

    return {
        teamId: team.id,
        teamName: team.name,
        pets,
        eggStats,
        plantStats,
    };
}

/**
 * Calculate growth stats for a specific type (egg or plant)
 */
function calculateGrowthStats(
    team: PetTeam,
    pets: UnifiedPet[],
    type: 'egg' | 'plant'
): GrowthStats | null {
    // Get boosts for this type
    const boosts = type === 'egg' ? calculateEggBoosts(pets) : calculatePlantBoosts(pets);

    if (boosts.length === 0) {
        return null; // No boosters for this type
    }

    // Calculate boost stats
    const stats = calculateBoostStats(boosts);

    // Safety check for multiplier
    const rawMultiplier = (60 + (stats.timeReductionPerHour || 0)) / 60;
    const teamMultiplier = (!rawMultiplier || isNaN(rawMultiplier) || rawMultiplier < 1) ? 1 : rawMultiplier;

    // Get garden data
    const garden = Globals.myGarden.get();
    const growingItems = type === 'egg' ? garden.eggs.growing : garden.crops.growing;
    const now = Date.now();

    // Calculate next ready and average progress
    const { nextReadyMs, nextReadyName, nextReadyId } = findNextReady(growingItems, now, type);
    const avgProgressPercent = calculateAvgProgress(growingItems, now, teamMultiplier, type);

    return {
        type,
        teamMultiplier,
        timeReductionPerHour: stats.timeReductionPerHour,
        growingCount: growingItems.length,
        nextReadyMs,
        nextReadyName,
        nextReadyId,
        avgProgressPercent,
    };
}

/**
 * Find next ready item (egg or crop)
 */
function findNextReady(
    items: any[],
    now: number,
    type: 'egg' | 'plant'
): { nextReadyMs: number; nextReadyName: string | null; nextReadyId: string | null } {
    if (items.length === 0) {
        return { nextReadyMs: 0, nextReadyName: null, nextReadyId: null };
    }

    // Sort by time remaining
    const sorted =
        type === 'egg'
            ? [...items].sort((a, b) => a.maturedAt - b.maturedAt)
            : [...items].sort((a, b) => a.endTime - b.endTime);

    const next = sorted[0];
    const timeKey = type === 'egg' ? 'maturedAt' : 'endTime';
    const nameKey = type === 'egg' ? 'eggId' : 'species';
    const idKey = type === 'egg' ? 'eggId' : 'species'; // For sprites they are usually the same as name for plants/eggs

    return {
        nextReadyMs: Math.max(0, next[timeKey] - now),
        nextReadyName: next[nameKey] || null,
        nextReadyId: next[idKey] || null,
    };
}

/**
 * Calculate average progress percentage
 */
function calculateAvgProgress(
    items: any[],
    now: number,
    speedMultiplier: number,
    type: 'egg' | 'plant'
): number {
    if (items.length === 0) return 0; // 0% if nothing growing (User requested simplification)

    // Safety: Ensure valid multiplier
    const safeMultiplier = (!speedMultiplier || speedMultiplier <= 0 || isNaN(speedMultiplier)) ? 1 : speedMultiplier;

    const percentages = items.map((item) => {
        const startKey = type === 'egg' ? 'plantedAt' : 'startTime';
        const endKey = type === 'egg' ? 'maturedAt' : 'endTime';

        const startTime = item[startKey] || now;
        const endTime = item[endKey] || now; // Fallback to now to prevent huge numbers if missing

        const elapsed = Math.max(0, now - startTime);
        const remainingRaw = Math.max(0, endTime - now);

        // Calculate total effective time correctly
        // total = elapsed + (remaining / multiplier)
        const remainingEffective = remainingRaw / safeMultiplier;
        const totalEffective = elapsed + remainingEffective;

        // Avoid divide by zero
        if (totalEffective <= 0) return 0;

        const percent = (elapsed / totalEffective) * 100;
        return Math.min(100, Math.max(0, percent));
    });

    const total = percentages.reduce((sum, p) => sum + p, 0);
    return Math.round(total / percentages.length) || 0; // Final NaN safety
}

/**
 * Get individual pet multiplier for a specific type
 */
export function getPetMultiplier(pet: UnifiedPet, type: 'egg' | 'plant'): number {
    const capacities = type === 'egg' ? EGG_BOOST_ABILITIES : PLANT_BOOST_ABILITIES;
    let hourlyReduction = 0;

    for (const ability of pet.abilities) {
        if (ability in capacities) {
            const data = capacities[ability];
            const procsPerHour = data.procRate * 60;
            hourlyReduction += procsPerHour * data.minutesPerProc;
        }
    }

    return (60 + hourlyReduction) / 60;
}
