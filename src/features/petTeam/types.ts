/**
 * PetTeam Feature - Type Definitions
 *
 * Level 0: No imports from this feature
 */

import { FEATURE_KEYS } from '../../utils/storage';

// ─────────────────────────────────────────────────────────────────────────────
// Core Types
// ─────────────────────────────────────────────────────────────────────────────

export type TeamId = string;

/**
 * A team of pets (up to 3 pets as per game limitation)
 * Pet IDs can be empty strings for vacant slots
 */
export interface PetTeam {
    /** Unique identifier (UUID v4) */
    id: TeamId;
    /** Team name (must be unique) */
    name: string;
    /** Array of exactly 3 pet IDs (empty string for vacant slots) */
    petIds: [string, string, string];
    /** Timestamp of creation (Date.now()) */
    createdAt: number;
    /** Timestamp of last modification (Date.now()) */
    updatedAt: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Config Types
// ─────────────────────────────────────────────────────────────────────────────

export interface PetTeamConfig {
    /** Feature enabled state */
    enabled: boolean;
    /** List of created teams */
    teams: PetTeam[];
    /** ID of the currently active team (pets currently in-game) */
    activeTeamId: TeamId | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

/** Storage key for pet team config */
export const STORAGE_KEY = FEATURE_KEYS.PET_TEAM;

/** Default configuration */
export const DEFAULT_CONFIG: PetTeamConfig = {
    enabled: false,
    teams: [],
    activeTeamId: null,
};

/** Maximum number of pets per team (game limitation) */
export const MAX_PETS_PER_TEAM = 3;

/** Maximum number of teams allowed */
export const MAX_TEAMS = 50;

/** Empty slot identifier */
export const EMPTY_SLOT = '';

// ─────────────────────────────────────────────────────────────────────────────
// Import Types
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Aries mod team format (from localStorage['aries_mod'].pets.teams)
 */
export interface AriesTeam {
    id: string;
    name: string;
    slots: (string | null)[];
}

/**
 * Result of import operation
 */
export interface ImportResult {
    success: boolean;
    source: 'aries' | 'none';
    imported: number;
    errors: string[];
}
