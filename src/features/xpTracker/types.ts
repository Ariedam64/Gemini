/**
 * XP Tracker Feature - Type Definitions
 *
 * Level 0: No imports from this feature
 * Per .claude/rules/features.md
 */

import { FEATURE_KEYS } from '../../utils/storage';

// ─────────────────────────────────────────────────────────────────────────────
// XP Boost Ability IDs
// ─────────────────────────────────────────────────────────────────────────────

/**
 * XP Boost ability IDs
 * These are used to identify XP-generating abilities
 * Ability data is fetched dynamically from MGData.get('abilities')
 */
export const XP_BOOST_ABILITY_IDS = [
    'PetXpBoost',
    'PetXpBoostII',
    'PetXpBoostIII',
    'SnowyPetXpBoost',
] as const;

export type XpBoostAbilityId = typeof XP_BOOST_ABILITY_IDS[number];

// ─────────────────────────────────────────────────────────────────────────────
// Game Constants (re-exported from calculators/types.ts)
// ─────────────────────────────────────────────────────────────────────────────

export {
    XP_PER_HOUR,
    XP_PER_SECOND,
    BASE_TARGET_STRENGTH,
    MAX_TARGET_STRENGTH,
    STRENGTH_GAINED,
    MAX_LEVELS,
    ROLLS_PER_HOUR,
} from '../../modules/calculators/types';

// ─────────────────────────────────────────────────────────────────────────────
// XP Boost Stats Type
// ─────────────────────────────────────────────────────────────────────────────

/** Calculated stats for an XP Boost ability on a pet */
export interface XpBoostStats {
    /** Ability ID (e.g., 'PetXpBoost', 'SnowyPetXpBoost') */
    abilityId: string;
    /** Display name (e.g., 'XP Boost I') */
    abilityName: string;
    /** Ability tier for display (I, II, III, Snowy) */
    tier: 'I' | 'II' | 'III' | 'Snowy';
    /** Base probability per minute (before strength scaling) */
    baseChancePerMinute: number;
    /** Actual probability per minute (after strength scaling) */
    actualChancePerMinute: number;
    /** Base XP per proc (before strength scaling) */
    baseXpPerProc: number;
    /** Actual XP per proc (after strength scaling) */
    actualXpPerProc: number;
    /** Expected procs per hour */
    expectedProcsPerHour: number;
    /** Expected bonus XP per hour from this ability */
    expectedXpPerHour: number;
    /** Weather requirement (null if always active) */
    requiredWeather: 'Frost' | null;
    /** Whether ability is currently active (weather satisfied) */
    isActive: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Pet XP Progress Type
// ─────────────────────────────────────────────────────────────────────────────

/** XP progress data for a single pet */
export interface PetXpProgress {
    /** Pet ID */
    id: string;
    /** Pet species */
    species: string;
    /** Pet name */
    name: string;
    /** Current XP */
    xp: number;
    /** Current hunger (0-100, 0 = starving) */
    hunger: number;
    /** Pet location */
    location: 'active' | 'inventory' | 'hutch';
    /** Whether pet is starving (hunger = 0) */
    isStarving: boolean;
    /** Current strength level */
    currentStrength: number;
    /** Maximum strength level */
    maxStrength: number;
    /** Whether pet has reached max strength */
    isMaxStrength: boolean;
    /** Hours remaining to next strength level */
    hoursToNextStrength: number;
    /** Hours remaining to max strength */
    hoursToMaxStrength: number;
    /** Feeds needed until next strength level (MVP: assumes full replenishment) */
    feedsToNextStrength: number;
    /** Feeds needed until max strength (MVP: assumes full replenishment) */
    feedsToMaxStrength: number;
    /** Base XP per hour (passive only, 3600 if not starving) */
    baseXpPerHour: number;
    /** Total XP per hour including XP Boost contributions */
    totalXpPerHour: number;
    /** XP Boost stats if pet has XP Boost ability */
    xpBoostStats: XpBoostStats | null;
    /** Target scale (determines max strength) */
    targetScale: number;
    /** All pet abilities */
    abilities: string[];
    /** Pet mutations */
    mutations: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Combined XP Stats Type
// ─────────────────────────────────────────────────────────────────────────────

/** Combined XP statistics for all XP Boost pets */
export interface CombinedXpBoostStats {
    /** Total expected bonus XP per hour from all boosters */
    totalBonusXpPerHour: number;
    /** Total expected procs per hour from all boosters */
    totalProcsPerHour: number;
    /** Number of active XP Boost pets */
    activeBoosterCount: number;
    /** List of individual booster stats */
    boosters: Array<{
        petId: string;
        petName: string;
        stats: XpBoostStats;
    }>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Config Types
// ─────────────────────────────────────────────────────────────────────────────

/** Sort options for all-pets list */
export type SortOption =
    | 'closestToMax'
    | 'furthestFromMax'
    | 'species'
    | 'strength'
    | 'location'
    | 'name';

/** XP Tracker configuration */
export interface XpTrackerConfig {
    /** Feature enabled state */
    enabled: boolean;
    /** Current sort option for all-pets list */
    sortBy: SortOption;
    /** Species filter (empty = show all) */
    filterSpecies: string[];
    /** Filter to only show pets with XP Boost ability */
    filterHasXpBoost: boolean;
    /** Update interval in milliseconds (default 3000) */
    updateIntervalMs: number;
    /** Whether the panel is popped out */
    isPoppedOut: boolean;
    /** Pop-out window position (null = default) */
    popOutPosition: { x: number; y: number } | null;
    /** Collapsed sections */
    collapsedSections: {
        activePets: boolean;
        allPets: boolean;
        xpBoostSummary: boolean;
    };
}

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

/** Storage key for XP tracker config */
export const STORAGE_KEY = FEATURE_KEYS.XP_TRACKER;

/** Default configuration */
export const DEFAULT_CONFIG: XpTrackerConfig = {
    enabled: false,
    sortBy: 'closestToMax',
    filterSpecies: [],
    filterHasXpBoost: false,
    updateIntervalMs: 3000,
    isPoppedOut: false,
    popOutPosition: null,
    collapsedSections: {
        activePets: false,
        allPets: false,
        xpBoostSummary: false,
    },
};

/** Feature display name */
export const FEATURE_NAME = 'XP Tracker';

/** Feature log prefix */
export const LOG_PREFIX = '[XpTracker]';
