/**
 * Growth Timers Types
 *
 * Type definitions for the Growth Timers feature.
 * Tracks egg and plant growth with team boost calculations.
 *
 * Per .claude/rules/features.md:
 * - Features are optional, toggleable functionality
 * - Must have enabled: boolean in config
 * - Storage keys use feature: prefix
 *
 * @module types
 */

import type { XY } from '../../globals/core/types';

// ─────────────────────────────────────────────────────────────────────────────
// Core Types
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Growth timer for a single egg or plant
 */
export interface GrowthTimer {
    /** Unique identifier (tileIndex) */
    id: string;

    /** Timer type */
    type: 'egg' | 'plant';

    /** Tile location in garden */
    tileIndex: string;
    position: XY;

    /** Species for sprite rendering (egg type or plant species) */
    species: string;

    /** When planted (timestamp) */
    plantedAt: number;

    /** Original maturation time from server */
    baseMaturedAt: number;

    /** Adjusted maturation time with boosts applied */
    adjustedMaturedAt: number;

    /** Remaining milliseconds until maturation */
    remainingMs: number;

    /** Active boosts affecting this timer */
    activeBoosts: BoostInfo[];

    /** Calculated procs per hour from all boosts */
    procsPerHour: number;

    /** Total time reduction per hour (minutes) */
    timeReductionPerHour: number;
}

/**
 * Boost information from a pet ability
 */
export interface BoostInfo {
    /** Pet providing the boost */
    petId: string;
    petName: string;

    /** Ability ID (e.g., 'EggGrowthBoostII') */
    abilityId: string;

    /** Proc rate (0-1, e.g., 0.27 = 27%) */
    procRate: number;

    /** Fixed minutes reduced per proc */
    minutesPerProc: number;
}

/**
 * Boost ability data (from 01-ABILITY-SYSTEM-REFERENCE.md)
 */
export interface BoostAbilityData {
    procRate: number;
    minutesPerProc: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Configuration
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Growth Timers feature configuration
 */
export interface GrowthTimersConfig {
    /** Feature enabled toggle */
    enabled: boolean;

    /** Update interval in milliseconds */
    updateIntervalMs: number;

    /** Show history in Garden tab */
    showHistory: boolean;

    /** Max history entries to keep */
    historyLimit: number;
}

/**
 * Default configuration
 */
export const DEFAULT_CONFIG: GrowthTimersConfig = {
    enabled: false,
    updateIntervalMs: 5000, // 5 seconds (will adjust for mobile)
    showHistory: true,
    historyLimit: 10,
};

// ─────────────────────────────────────────────────────────────────────────────
// Boost Ability Constants
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Egg Growth Boost abilities
 * Based on 01-ABILITY-SYSTEM-REFERENCE.md
 */
export const EGG_BOOST_ABILITIES: Record<string, BoostAbilityData> = {
    'EggGrowthBoost': { procRate: 0.21, minutesPerProc: 7 },
    'EggGrowthBoostII_NEW': { procRate: 0.24, minutesPerProc: 9 },
    'EggGrowthBoostII': { procRate: 0.27, minutesPerProc: 11 },
    'SnowyEggGrowthBoost': { procRate: 0.35, minutesPerProc: 10 },
};

/**
 * Plant Growth Boost abilities
 * Based on 01-ABILITY-SYSTEM-REFERENCE.md
 */
export const PLANT_BOOST_ABILITIES: Record<string, BoostAbilityData> = {
    'PlantGrowthBoost': { procRate: 0.24, minutesPerProc: 3 },
    'PlantGrowthBoostII': { procRate: 0.27, minutesPerProc: 5 },
    'PlantGrowthBoostIII': { procRate: 0.30, minutesPerProc: 7 },
    'SnowyPlantGrowthBoost': { procRate: 0.40, minutesPerProc: 6 },
};

/**
 * All growth boost ability IDs
 */
export const ALL_GROWTH_BOOST_ABILITIES = [
    ...Object.keys(EGG_BOOST_ABILITIES),
    ...Object.keys(PLANT_BOOST_ABILITIES),
] as const;
