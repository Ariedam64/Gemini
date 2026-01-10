/**
 * Growth Timers Feature
 *
 * Public API for the Growth Timers feature.
 * Tracks egg and plant growth with team boost calculations.
 *
 * Per .claude/rules/features.md:
 * - Features are optional, toggleable functionality
 * - Must export MGFeatureName object
 * - Minimal public API (hide internal helpers)
 * - Safe to call init() multiple times
 *
 * @module growthTimers
 */

import type { GrowthTimer } from './types';
import { loadConfig, saveConfig, updateConfig } from './state';
import { calculateEggTimers, getAllEggTimers } from './logic/eggTimers';
import { calculatePlantTimers, getAllPlantTimers } from './logic/plantTimers';
import { calculateEggBoosts, calculatePlantBoosts, calculateBoostStats } from './logic/boostCalculator';
import { MGPetTeam } from '../petTeam';

// ─────────────────────────────────────────────────────────────────────────────
// Initialization
// ─────────────────────────────────────────────────────────────────────────────

let initialized = false;

function init(): void {
    if (initialized) return;

    const config = loadConfig();
    if (!config.enabled) {
        console.log('[GrowthTimers] Disabled');
        return;
    }

    initialized = true;
    console.log('[GrowthTimers] Initialized');
}

function destroy(): void {
    if (!initialized) return;
    initialized = false;
    console.log('[GrowthTimers] Destroyed');
}

// ─────────────────────────────────────────────────────────────────────────────
// Configuration
// ─────────────────────────────────────────────────────────────────────────────

function isEnabled(): boolean {
    const config = loadConfig();
    return config.enabled;
}

function setEnabled(enabled: boolean): void {
    updateConfig({ enabled });

    if (enabled && !initialized) {
        init();
    } else if (!enabled && initialized) {
        destroy();
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Timer Data Access
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get egg growth timers for a specific team
 *
 * @param teamId - Team ID to get timers for
 * @returns Array of egg timers filtered by team's boosts
 */
function getEggTimers(teamId: string): GrowthTimer[] {
    if (!initialized) return [];
    return calculateEggTimers(teamId);
}

/**
 * Get plant growth timers for a specific team
 *
 * @param teamId - Team ID to get timers for
 * @returns Array of plant timers filtered by team's boosts
 */
function getPlantTimers(teamId: string): GrowthTimer[] {
    if (!initialized) return [];
    return calculatePlantTimers(teamId);
}

/**
 * Get all egg timers (unfiltered, for Garden tab)
 *
 * @returns All egg timers
 */
function getAllEggs(): GrowthTimer[] {
    if (!initialized) return [];
    return getAllEggTimers();
}

/**
 * Get all plant timers (unfiltered, for Garden tab)
 *
 * @returns All plant timers
 */
function getAllPlants(): GrowthTimer[] {
    if (!initialized) return [];
    return getAllPlantTimers();
}

/**
 * Get boost statistics for a team
 *
 * @param teamId - Team ID
 * @param type - Timer type ('egg' or 'plant')
 * @returns Boost statistics
 */
function getBoostStats(
    teamId: string,
    type: 'egg' | 'plant'
): { procsPerHour: number; timeReductionPerHour: number } {
    const team = MGPetTeam.getTeam(teamId);
    if (!team) return { procsPerHour: 0, timeReductionPerHour: 0 };

    const pets = MGPetTeam.getPetsForTeam(team);
    if (pets.length === 0) return { procsPerHour: 0, timeReductionPerHour: 0 };

    const boosts = type === 'egg'
        ? calculateEggBoosts(pets)
        : calculatePlantBoosts(pets);

    return calculateBoostStats(boosts);
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

export const MGGrowthTimers = {
    // Lifecycle
    init,
    destroy,

    // Configuration
    isEnabled,
    setEnabled,

    // Data access
    getEggTimers,
    getPlantTimers,
    getAllEggs,
    getAllPlants,
    getBoostStats,
};

// ─────────────────────────────────────────────────────────────────────────────
// Type Exports
// ─────────────────────────────────────────────────────────────────────────────

export type { GrowthTimer, BoostInfo, GrowthTimersConfig } from './types';
