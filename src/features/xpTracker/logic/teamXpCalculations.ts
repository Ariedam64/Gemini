/**
 * Team XP Calculations
 *
 * Calculate XP data for specific pet teams (not all pets).
 * Used for inline XP tracking in Pets section.
 *
 * Level 2: Imports from types.ts and other logic files
 */

import { Globals } from '../../../globals';
import { MGData } from '../../../modules/data';
import type { UnifiedPet } from '../../../globals/core/types';
import type { TeamXpData, TeamPetXpData, TeamXpSummary } from '../../../ui/sections/Pets/parts/TeamXpPanel';
import type { PetTeam } from '../../petTeam/types';
import { MGPetTeam } from '../../petTeam';
import {
    calculateCurrentStrength,
    calculateMaxStrength,
    calculateHoursToNextStrength,
    calculateHoursToMaxStrength,
} from '../../../modules/calculators/logic/xp';
import {
    calculateFeedsToNextStrength,
    calculateFeedsToMaxStrength,
    calculateAdjustedFeedsToMax,
} from '../../../modules/calculators/logic/feed';
import {
    hasXpBoostAbility,
    getPrimaryXpBoostStats,
    calculateCombinedXpBoostStats,
} from './xpBoost';
import { XP_PER_HOUR } from '../types';

// ─────────────────────────────────────────────────────────────────────────────
// Team XP Calculation
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calculate full XP data for a specific pet team
 *
 * @param teamId - The team ID to calculate XP for
 * @returns Team XP data or null if team not found
 */
export function calculateTeamXpData(teamId: string): TeamXpData | null {
    // Get the team
    const team = MGPetTeam.getTeam(teamId);
    if (!team) return null;

    // Get pets for this team
    const teamPets = getTeamPets(team);
    if (teamPets.length === 0) {
        // Empty team - return minimal data
        return {
            teamId: team.id,
            teamName: team.name,
            pets: [],
            teamSummary: {
                baseXpPerHour: XP_PER_HOUR,
                bonusXpPerHour: 0,
                totalXpPerHour: XP_PER_HOUR,
                activeBoosterCount: 0,
                totalProcsPerHour: 0,
            },
        };
    }

    // Get current weather
    const weather = Globals.weather.get();
    const currentWeather = weather.isActive ? weather.type : null;

    // Calculate combined XP boost stats from this team
    const boosterData = teamPets
        .filter(p => !p.isMature || hasXpBoostAbility(p.abilities)) // Include mature boosters
        .filter(p => p.hunger > 0) // Must not be starving
        .map(p => ({
            petId: p.id,
            petName: p.name ?? '',
            abilities: p.abilities,
            strength: p.currentStrength,
        }));

    const combinedBoostStats = calculateCombinedXpBoostStats(boosterData, currentWeather);

    // Calculate per-pet data
    const petsData: TeamPetXpData[] = [];
    const longestHoursToMax = calculateLongestHoursToMax(teamPets, combinedBoostStats.totalBonusXpPerHour);

    for (const pet of teamPets) {
        const petData = calculatePetXpData(pet, currentWeather, combinedBoostStats.totalBonusXpPerHour, longestHoursToMax);
        petsData.push(petData);
    }

    // Build team summary
    const teamSummary: TeamXpSummary = {
        baseXpPerHour: XP_PER_HOUR,
        bonusXpPerHour: combinedBoostStats.totalBonusXpPerHour,
        totalXpPerHour: XP_PER_HOUR + combinedBoostStats.totalBonusXpPerHour,
        activeBoosterCount: combinedBoostStats.activeBoosterCount,
        totalProcsPerHour: combinedBoostStats.totalProcsPerHour,
    };

    return {
        teamId: team.id,
        teamName: team.name,
        pets: petsData,
        teamSummary,
    };
}

/**
 * Get UnifiedPet objects for a team's pet IDs
 */
function getTeamPets(team: PetTeam): UnifiedPet[] {
    const myPets = Globals.myPets.get();
    const pets: UnifiedPet[] = [];

    for (const petId of team.petIds) {
        if (!petId) continue; // Skip empty slots

        const pet = myPets.all.find(p => p.id === petId);
        if (pet) {
            pets.push(pet);
        }
    }

    return pets;
}

/**
 * Calculate longest hours to max among non-max pets
 * Used for calculating supporting feeds for max-STR XP boosters
 */
function calculateLongestHoursToMax(pets: UnifiedPet[], teamBonusXpPerHour: number): number {
    let longest = 0;

    for (const pet of pets) {
        const maxStr = calculateMaxStrength(pet.petSpecies, pet.targetScale);
        const currentStr = calculateCurrentStrength(pet.petSpecies, pet.xp, maxStr);

        if (currentStr >= maxStr) continue; // Skip max-STR pets

        const totalXpPerHour = pet.hunger > 0 ? XP_PER_HOUR + teamBonusXpPerHour : 0;
        const hoursToMax = calculateHoursToMaxStrength(
            pet.petSpecies,
            pet.xp,
            maxStr,
            totalXpPerHour > 0 ? totalXpPerHour : XP_PER_HOUR
        );

        longest = Math.max(longest, hoursToMax);
    }

    return longest;
}

/**
 * Calculate XP data for a single pet
 */
export function calculatePetXpData(
    pet: UnifiedPet,
    currentWeather: string | null,
    teamBonusXpPerHour: number,
    longestHoursToMax: number
): TeamPetXpData {
    const maxStrength = calculateMaxStrength(pet.petSpecies, pet.targetScale);
    const currentStrength = calculateCurrentStrength(pet.petSpecies, pet.xp, maxStrength);
    const isMaxStrength = currentStrength >= maxStrength;
    const isStarving = pet.hunger <= 0;

    // Calculate XP rates
    const baseXpPerHour = isStarving ? 0 : XP_PER_HOUR;
    const totalXpPerHour = isStarving ? 0 : baseXpPerHour + teamBonusXpPerHour;

    // Get XP Boost stats if pet has the ability
    const xpBoostStats = getPrimaryXpBoostStats(pet.abilities, currentStrength, currentWeather);

    // Calculate time remaining
    const hoursToNextStrength = isMaxStrength ? null : calculateHoursToNextStrength(
        pet.petSpecies,
        pet.xp,
        currentStrength,
        maxStrength,
        totalXpPerHour > 0 ? totalXpPerHour : XP_PER_HOUR
    );

    const hoursToMaxStrength = calculateHoursToMaxStrength(
        pet.petSpecies,
        pet.xp,
        maxStrength,
        totalXpPerHour > 0 ? totalXpPerHour : XP_PER_HOUR
    );

    // Calculate feeds
    const feedsToNextStrength = hoursToNextStrength !== null
        ? calculateFeedsToNextStrength(pet.petSpecies, pet.hunger, hoursToNextStrength)
        : null;

    const feedsToMaxStrength = calculateFeedsToMaxStrength(
        pet.petSpecies,
        pet.hunger,
        hoursToMaxStrength
    );

    // Calculate supporting feeds for max-STR XP boosters
    const supportingFeeds = (isMaxStrength && xpBoostStats && longestHoursToMax > 0)
        ? calculateAdjustedFeedsToMax(
            true,
            true,
            pet.petSpecies,
            pet.hunger,
            0,
            longestHoursToMax
        )
        : null;

    return {
        id: pet.id,
        name: pet.name ?? '',
        species: pet.petSpecies,
        currentStrength,
        maxStrength,
        isMaxStrength,
        xpPerHour: totalXpPerHour,
        hoursToNextStrength,
        hoursToMaxStrength,
        feedsToNextStrength,
        feedsToMaxStrength,
        isStarving,
        hunger: pet.hunger,
        xpBoostStats,
        supportingFeeds,
        mutations: pet.mutations,
        targetScale: pet.targetScale,
    };
}

// ─────────────────────────────────────────────────────────────────────────────
// Team Progress Calculation
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calculate average team progress (% to max STR)
 * Used for collapsed team progress badges
 *
 * @param teamId - The team ID to calculate progress for
 * @returns Average progress percentage (0-100)
 */
export function calculateTeamProgressPercent(teamId: string): number {
    const team = MGPetTeam.getTeam(teamId);
    if (!team) return 0;

    const pets = getTeamPets(team);
    if (pets.length === 0) return 0;

    // Calculate each pet's progress percentage
    const percentages = pets.map(pet => {
        const maxStr = calculateMaxStrength(pet.petSpecies, pet.targetScale);
        const currentStr = calculateCurrentStrength(pet.petSpecies, pet.xp, maxStr);
        return (currentStr / maxStr) * 100;
    });

    // Return average
    return percentages.reduce((sum, p) => sum + p, 0) / percentages.length;
}

/**
 * Format hours to compact readable string (e.g. 1.5h, 45m, 2d 5h)
 */
export function formatHoursCompact(hours: number): string {
    if (!isFinite(hours) || hours <= 0) return '0m';
    if (hours < 1) {
        const minutes = Math.ceil(hours * 60);
        return `${minutes}m`;
    } else if (hours < 24) {
        return `${hours.toFixed(1)}h`;
    } else {
        const days = Math.floor(hours / 24);
        const remainingHours = Math.floor(hours % 24);
        return `${days}d ${remainingHours}h`;
    }
}
