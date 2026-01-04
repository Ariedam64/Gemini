/**
 * PetTeam Feature - Active Team Logic
 *
 * Manages which team is currently active (pets in-game)
 */

import { getMyPets } from '../../../globals/variables/myPets';
import { loadConfig, saveConfig } from '../state';
import type { TeamId } from '../types';

/**
 * Detect which team is currently active based on in-game pets
 * @returns Team ID if a matching team is found, null otherwise
 */
export function detectActiveTeam(): TeamId | null {
    const myPets = getMyPets();
    const activePets = myPets.get().byLocation.active;

    if (activePets.length === 0) {
        return null;
    }

    // Get active pet IDs (sorted for comparison)
    const activePetIds = activePets.map((p) => p.id).sort();

    // Find matching team
    const config = loadConfig();
    for (const team of config.teams) {
        const teamPetIds = team.petIds.filter((id) => id !== '').sort();

        // Check if arrays match (order-independent)
        if (
            teamPetIds.length === activePetIds.length &&
            teamPetIds.every((id, index) => id === activePetIds[index])
        ) {
            return team.id;
        }
    }

    return null;
}

/**
 * Get the currently active team ID
 * Auto-detects if not set or if pets changed
 * @returns Active team ID or null if no team is active
 */
export function getActiveTeamId(): TeamId | null {
    const detected = detectActiveTeam();

    // Auto-update if detection differs from stored value
    const config = loadConfig();
    if (detected !== config.activeTeamId) {
        config.activeTeamId = detected;
        saveConfig(config);
    }

    return detected;
}

/**
 * Set the active team
 * @param teamId - Team ID to set as active (or null to clear)
 */
export function setActiveTeamId(teamId: TeamId | null): void {
    const config = loadConfig();
    config.activeTeamId = teamId;
    saveConfig(config);
}

/**
 * Check if a team is currently active
 * @param teamId - Team ID to check
 * @returns true if this team is active, false otherwise
 */
export function isActiveTeam(teamId: TeamId): boolean {
    return getActiveTeamId() === teamId;
}
