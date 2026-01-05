/**
 * PetTeam Feature - Active Team Logic
 *
 * Manages which team is currently active (pets in-game)
 */

import { getMyPets } from '../../../globals/variables/myPets';
import { getMyInventory } from '../../../globals/variables/myInventory';
import { loadConfig, saveConfig } from '../state';
import { EMPTY_SLOT, MAX_PETS_PER_TEAM } from '../types';
import * as WebSocket from '../../../websocket/api';
import type { TeamId, PetTeam } from '../types';
import type { MyPetsData, UnifiedPet } from '../../../globals/core/types';

/**
 * Detect which team is currently active based on in-game pets
 * @returns Team ID if a matching team is found, null otherwise
 */
export function detectActiveTeam(): TeamId | null {
    const myPets = getMyPets();
    const activePets = myPets.get().byLocation.active;

    // Get active pet IDs (sorted for comparison)
    const activePetIds = activePets.map((p) => p.id).sort();

    // Find matching team
    const config = loadConfig();
    for (const team of config.teams) {
        const teamPetIds = team.petIds.filter((id) => id !== '').sort();

        // Check if arrays match (order-independent)
        // This handles both empty teams (0 pets) and filled teams
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

/**
 * Activate a team by swapping pets in-game
 * @param team - Team to activate
 * @throws Error if inventory is full
 */
export function activateTeam(team: PetTeam): void {
    const myPets = getMyPets();
    const myInventory = getMyInventory();
    const myPetsState = myPets.get();
    const myInventoryState = myInventory.get();

    // Check if inventory is full
    if (myInventoryState.isFull) {
        throw new Error('Cannot activate team: inventory is full');
    }

    // Get current active pets
    const currentActivePets = myPetsState.byLocation.active;

    // Check if team is already active
    const targetPetIds = team.petIds.filter((id) => id !== EMPTY_SLOT).sort();
    const currentPetIds = currentActivePets.map((p) => p.id).sort();

    if (JSON.stringify(targetPetIds) === JSON.stringify(currentPetIds)) {
        console.log('[PetTeam] Team already active');
        return;
    }

    // Hutch info - calculate remaining space
    const hutchInfo = myPetsState.hutch;
    const hutchSpaceRemaining = hutchInfo.hasHutch
        ? hutchInfo.maxItems - hutchInfo.currentItems
        : 0;

    // Swap team pet by pet
    swapTeamPetByPet(team.petIds, hutchSpaceRemaining, myPetsState);

    // Update active team ID
    setActiveTeamId(team.id);
    console.log('[PetTeam] Team activated successfully');
}

function swapTeamPetByPet(
    targetPetIds: [string, string, string],
    initialHutchSpace: number,
    currentState: MyPetsData
): void {
    const currentActivePets = currentState.byLocation.active;
    let hutchSpaceRemaining = initialHutchSpace;

    console.log(`[PetTeam] Starting swap with ${initialHutchSpace} hutch spaces available`);

    // Process each slot (0, 1, 2) sequentially
    for (let slotIndex = 0; slotIndex < MAX_PETS_PER_TEAM; slotIndex++) {
        const targetPetId = targetPetIds[slotIndex];
        const currentPetAtSlot = currentActivePets[slotIndex] ?? null;

        console.log(`[PetTeam] Slot ${slotIndex}: current=${currentPetAtSlot?.id.slice(0, 8) ?? 'empty'}, target=${targetPetId.slice(0, 8) || 'empty'}, hutchSpace=${hutchSpaceRemaining}`);

        // Case 1: Same pet, skip
        if (currentPetAtSlot?.id === targetPetId) {
            console.log(`[PetTeam] Slot ${slotIndex}: Same pet, skipping`);
            continue;
        }

        // Case 2: Target slot empty, remove active pet
        if (targetPetId === EMPTY_SLOT && currentPetAtSlot) {
            const storeInHutch = hutchSpaceRemaining > 0;
            console.log(`[PetTeam] Slot ${slotIndex}: Removing pet, storeInHutch=${storeInHutch}`);
            removePetFromActive(currentPetAtSlot.id, storeInHutch);
            if (storeInHutch) hutchSpaceRemaining--;
            continue;
        }

        // Case 3: Active slot empty, add pet
        if (!currentPetAtSlot && targetPetId !== EMPTY_SLOT) {
            const targetPet = currentState.all.find((p) => p.id === targetPetId);
            const isFromHutch = targetPet?.location === 'hutch';

            console.log(`[PetTeam] Slot ${slotIndex}: Adding pet, fromHutch=${isFromHutch}`);

            if (isFromHutch) {
                hutchSpaceRemaining++; // Retrieve from hutch frees a space
            }

            addPetToActive(targetPetId, currentState);
            continue;
        }

        // Case 4: Swap two different pets
        if (currentPetAtSlot && targetPetId !== EMPTY_SLOT) {
            const targetPet = currentState.all.find((p) => p.id === targetPetId);
            const isFromHutch = targetPet?.location === 'hutch';

            // If we retrieve from hutch, we free a space (+1)
            // Then we might store the replaced pet (-1)
            // Net effect: if retrieving from hutch, we can always store the replaced pet
            if (isFromHutch) {
                hutchSpaceRemaining++;
            }

            const storeInHutch = hutchSpaceRemaining > 0;
            console.log(`[PetTeam] Slot ${slotIndex}: Swapping pets, fromHutch=${isFromHutch}, storeInHutch=${storeInHutch}`);

            swapPets(currentPetAtSlot.id, targetPetId, currentState, storeInHutch);

            if (storeInHutch) {
                hutchSpaceRemaining--;
            }
            continue;
        }
    }

    console.log(`[PetTeam] Swap complete, ${hutchSpaceRemaining} hutch spaces remaining`);
}

function removePetFromActive(activePetId: string, hasHutchSpace: boolean): void {
    // Store active pet (goes to inventory)
    WebSocket.storePet(activePetId);

    // Put in hutch if space available
    if (hasHutchSpace) {
        WebSocket.putItemInStorage(activePetId);
    }
}

function addPetToActive(targetPetId: string, currentState: MyPetsData): void {
    const pet = currentState.all.find((p) => p.id === targetPetId);
    if (!pet) {
        console.warn(`[PetTeam] Pet ${targetPetId} not found`);
        return;
    }

    // Retrieve from hutch if needed
    if (pet.location === 'hutch') {
        WebSocket.retrieveItemFromStorage(targetPetId);
    }

    // Place pet (now in inventory)
    WebSocket.placePet(targetPetId);
}

function swapPets(
    activePetId: string,
    targetPetId: string,
    currentState: MyPetsData,
    hasHutchSpace: boolean
): void {
    const targetPet = currentState.all.find((p) => p.id === targetPetId);
    if (!targetPet) {
        console.warn(`[PetTeam] Pet ${targetPetId} not found`);
        return;
    }

    // Retrieve from hutch if needed
    if (targetPet.location === 'hutch') {
        WebSocket.retrieveItemFromStorage(targetPetId);
    }

    // Swap pets (activePetId active, targetPetId in inventory)
    WebSocket.swapPet(activePetId, targetPetId);

    // Put old active pet in hutch if space available
    if (hasHutchSpace) {
        WebSocket.putItemInStorage(activePetId);
    }
}
