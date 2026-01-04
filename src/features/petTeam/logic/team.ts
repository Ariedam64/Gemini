/**
 * PetTeam Feature - Team Management Logic
 *
 * Level 2: Imports from types.ts, state.ts, and core modules
 */

import { getMyPets } from '../../../globals/variables/myPets';
import type { UnifiedPet } from '../../../globals/core/types';
import { loadConfig, saveConfig } from '../state';
import type { PetTeam, TeamId } from '../types';
import { MAX_PETS_PER_TEAM, MAX_TEAMS, EMPTY_SLOT } from '../types';

// ─────────────────────────────────────────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Generate a unique team ID (UUID v4)
 * @returns Unique team identifier
 */
function generateTeamId(): TeamId {
    return crypto.randomUUID();
}

/**
 * Get current timestamp
 * @returns Current timestamp in milliseconds
 */
function now(): number {
    return Date.now();
}

/**
 * Normalize pet IDs array to exactly 3 slots
 * @param petIds - Array of pet IDs (can be less than 3)
 * @returns Tuple of exactly 3 pet IDs (filled with empty strings)
 */
function normalizePetIds(petIds: string[] = []): [string, string, string] {
    const normalized: string[] = [...petIds];
    while (normalized.length < MAX_PETS_PER_TEAM) {
        normalized.push(EMPTY_SLOT);
    }
    return [normalized[0] || EMPTY_SLOT, normalized[1] || EMPTY_SLOT, normalized[2] || EMPTY_SLOT];
}

// ─────────────────────────────────────────────────────────────────────────────
// Validation Functions
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Check if a team name is unique
 * @param name - Team name to check
 * @param excludeTeamId - Optional team ID to exclude from check (for updates)
 * @returns true if name is unique, false otherwise
 */
export function isTeamNameUnique(name: string, excludeTeamId?: TeamId): boolean {
    const config = loadConfig();
    const trimmedName = name.trim();

    if (!trimmedName) return false;

    return !config.teams.some(
        (team) => team.name.trim() === trimmedName && team.id !== excludeTeamId
    );
}

/**
 * Check if a team composition is unique (not identical to existing teams)
 * @param petIds - Array of pet IDs to check
 * @param excludeTeamId - Optional team ID to exclude from check (for updates)
 * @returns true if composition is unique, false otherwise
 */
export function isTeamCompositionUnique(petIds: [string, string, string], excludeTeamId?: TeamId): boolean {
    const config = loadConfig();

    // Sort the pet IDs to compare regardless of order
    const sortedNewIds = [...petIds].sort().join(',');

    return !config.teams.some((team) => {
        if (team.id === excludeTeamId) return false;
        const sortedExistingIds = [...team.petIds].sort().join(',');
        return sortedExistingIds === sortedNewIds;
    });
}

/**
 * Validate that pet IDs exist in the player's pet collection
 * @param petIds - Array of pet IDs to validate
 * @returns true if all non-empty IDs are valid, false otherwise
 */
export function validatePetIds(petIds: string[]): boolean {
    const myPets = getMyPets();
    const petsData = myPets.get();
    const validPetIds = new Set(petsData.all.map((pet) => pet.id));

    for (const petId of petIds) {
        if (petId !== EMPTY_SLOT && !validPetIds.has(petId)) {
            return false;
        }
    }

    return true;
}

/**
 * Get unified pet objects for a team
 * @param team - Pet team
 * @returns Array of UnifiedPet objects (may contain fewer than 3 if slots are empty)
 */
export function getPetsForTeam(team: PetTeam): UnifiedPet[] {
    const myPets = getMyPets();
    const petsData = myPets.get();
    const petsMap = new Map(petsData.all.map((pet) => [pet.id, pet]));

    const pets: UnifiedPet[] = [];

    for (const petId of team.petIds) {
        if (petId === EMPTY_SLOT) continue;

        const pet = petsMap.get(petId);
        if (pet) {
            pets.push(pet);
        }
    }

    return pets;
}

// ─────────────────────────────────────────────────────────────────────────────
// CRUD Operations
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Create a new pet team
 * @param name - Team name (must be unique)
 * @param petIds - Optional array of pet IDs (will be normalized to 3 slots)
 * @returns Created team or null if creation failed
 * @throws Error if name is not unique or max teams reached
 */
export function createTeam(name: string, petIds: string[] = []): PetTeam {
    const config = loadConfig();

    // Validate team count
    if (config.teams.length >= MAX_TEAMS) {
        throw new Error(`Maximum number of teams (${MAX_TEAMS}) reached`);
    }

    // Validate name uniqueness
    if (!isTeamNameUnique(name)) {
        throw new Error(`Team name "${name}" already exists`);
    }

    // Validate name is not empty
    const trimmedName = name.trim();
    if (!trimmedName) {
        throw new Error('Team name cannot be empty');
    }

    // Normalize pet IDs
    const normalizedPetIds = normalizePetIds(petIds);

    // Validate pet IDs exist
    if (!validatePetIds(normalizedPetIds)) {
        throw new Error('One or more pet IDs do not exist');
    }

    // Validate team composition is unique
    if (!isTeamCompositionUnique(normalizedPetIds)) {
        throw new Error('A team with this exact composition already exists');
    }

    // Create team
    const team: PetTeam = {
        id: generateTeamId(),
        name: trimmedName,
        petIds: normalizedPetIds,
        createdAt: now(),
        updatedAt: now(),
    };

    // Save to storage
    config.teams.push(team);
    saveConfig(config);

    return team;
}

/**
 * Update an existing pet team
 * @param teamId - Team ID to update
 * @param updates - Partial team updates (excluding id and createdAt)
 * @returns Updated team or null if not found
 * @throws Error if name is not unique
 */
export function updateTeam(
    teamId: TeamId,
    updates: Partial<Omit<PetTeam, 'id' | 'createdAt'>>
): PetTeam | null {
    const config = loadConfig();
    const teamIndex = config.teams.findIndex((t) => t.id === teamId);

    if (teamIndex === -1) {
        return null;
    }

    const team = config.teams[teamIndex];

    // Validate name uniqueness if name is being updated
    if (updates.name !== undefined) {
        const trimmedName = updates.name.trim();
        if (!trimmedName) {
            throw new Error('Team name cannot be empty');
        }
        if (!isTeamNameUnique(trimmedName, teamId)) {
            throw new Error(`Team name "${trimmedName}" already exists`);
        }
        updates.name = trimmedName;
    }

    // Validate pet IDs if being updated
    if (updates.petIds !== undefined) {
        const normalizedPetIds = normalizePetIds(updates.petIds);
        if (!validatePetIds(normalizedPetIds)) {
            throw new Error('One or more pet IDs do not exist');
        }
        if (!isTeamCompositionUnique(normalizedPetIds, teamId)) {
            throw new Error('A team with this exact composition already exists');
        }
        updates.petIds = normalizedPetIds;
    }

    // Update team
    const updatedTeam: PetTeam = {
        ...team,
        ...updates,
        id: team.id, // Ensure ID cannot be changed
        createdAt: team.createdAt, // Ensure createdAt cannot be changed
        updatedAt: now(),
    };

    config.teams[teamIndex] = updatedTeam;
    saveConfig(config);

    return updatedTeam;
}

/**
 * Delete a pet team
 * @param teamId - Team ID to delete
 * @returns true if deleted, false if not found
 */
export function deleteTeam(teamId: TeamId): boolean {
    const config = loadConfig();
    const initialLength = config.teams.length;

    config.teams = config.teams.filter((team) => team.id !== teamId);

    if (config.teams.length === initialLength) {
        return false;
    }

    saveConfig(config);
    return true;
}

/**
 * Get a specific team by ID
 * @param teamId - Team ID to retrieve
 * @returns Team or null if not found
 */
export function getTeam(teamId: TeamId): PetTeam | null {
    const config = loadConfig();
    return config.teams.find((team) => team.id === teamId) ?? null;
}

/**
 * Get all teams
 * @returns Array of all teams (in stored order)
 */
export function getAllTeams(): PetTeam[] {
    const config = loadConfig();
    return [...config.teams];
}

/**
 * Get team by name
 * @param name - Team name to search for
 * @returns Team or null if not found
 */
export function getTeamByName(name: string): PetTeam | null {
    const config = loadConfig();
    const trimmedName = name.trim();
    return config.teams.find((team) => team.name.trim() === trimmedName) ?? null;
}

/**
 * Reorder teams
 * @param teamIds - Array of team IDs in the desired order
 * @returns true if reordering succeeded, false otherwise
 */
export function reorderTeams(teamIds: TeamId[]): boolean {
    const config = loadConfig();

    // Validate all team IDs exist
    const teamMap = new Map(config.teams.map((team) => [team.id, team]));

    if (teamIds.length !== config.teams.length) {
        return false;
    }

    for (const teamId of teamIds) {
        if (!teamMap.has(teamId)) {
            return false;
        }
    }

    // Reorder teams
    config.teams = teamIds.map((teamId) => teamMap.get(teamId)!);
    saveConfig(config);

    return true;
}

/**
 * Rename a pet team
 * @param teamId - Team ID to rename
 * @param newName - New team name (must be unique)
 * @returns true if renamed successfully, false otherwise
 */
export function renameTeam(teamId: TeamId, newName: string): boolean {
    try {
        const result = updateTeam(teamId, { name: newName });
        return result !== null;
    } catch (err) {
        console.warn(`[PetTeam] Failed to rename team ${teamId}:`, err);
        return false;
    }
}
