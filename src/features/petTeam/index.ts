/**
 * PetTeam Feature - Public API
 *
 * Level 3: Re-exports from types, state, logic
 * This is the ONLY file external code should import from
 */

// Types
import type { PetTeam, TeamId, PetTeamConfig, AriesTeam, ImportResult } from './types';
import { DEFAULT_CONFIG, STORAGE_KEY, MAX_PETS_PER_TEAM, MAX_TEAMS, EMPTY_SLOT } from './types';

// State
import * as State from './state';

// Logic
import * as TeamLogic from './logic/team';
import * as ActiveLogic from './logic/active';
import * as ImportLogic from './logic/import';

// ─────────────────────────────────────────────────────────────────────────────
// Module State
// ─────────────────────────────────────────────────────────────────────────────

let initialized = false;

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * PetTeam Module
 * @module MGPetTeam
 */
export const MGPetTeam = {
    // ─── Lifecycle ───
    init(): void {
        if (initialized) return;

        const config = State.loadConfig();
        if (!config.enabled) {
            console.log('[PetTeam] Feature disabled');
            return;
        }

        initialized = true;
        console.log('[PetTeam] Feature initialized');
    },

    destroy(): void {
        if (!initialized) return;
        initialized = false;
        console.log('[PetTeam] Feature destroyed');
    },

    // ─── Configuration ───
    isEnabled: State.isEnabled,
    setEnabled: State.setEnabled,

    // ─── Team Management ───
    createTeam: TeamLogic.createTeam,
    updateTeam: TeamLogic.updateTeam,
    deleteTeam: TeamLogic.deleteTeam,
    renameTeam: TeamLogic.renameTeam,
    getTeam: TeamLogic.getTeam,
    getAllTeams: TeamLogic.getAllTeams,
    getTeamByName: TeamLogic.getTeamByName,
    reorderTeams: TeamLogic.reorderTeams,
    getPetsForTeam: TeamLogic.getPetsForTeam,
    isTeamFull: TeamLogic.isTeamFull,
    getEmptySlots: TeamLogic.getEmptySlots,
    getFilledSlotCount: TeamLogic.getFilledSlotCount,
    isTeamEmpty: TeamLogic.isTeamEmpty,
    isPetInTeam: TeamLogic.isPetInTeam,
    getPetSlotIndex: TeamLogic.getPetSlotIndex,

    // ─── Active Team ───
    getActiveTeamId: ActiveLogic.getActiveTeamId,
    setActiveTeamId: ActiveLogic.setActiveTeamId,
    isActiveTeam: ActiveLogic.isActiveTeam,
    activateTeam: ActiveLogic.activateTeam,

    // ─── Import ───
    importFromAries: ImportLogic.importFromAries,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Type Exports
// ─────────────────────────────────────────────────────────────────────────────

export type { PetTeam, TeamId, PetTeamConfig, AriesTeam, ImportResult };
