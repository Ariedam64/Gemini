/**
 * XP Tracker Feature - Public API
 *
 * Per .claude/rules/features.md:
 * - Exports init(), isReady(), and public API
 * - Feature must be toggleable
 * - Side effects only when enabled
 *
 * @module MGXPTracker
 */

import { Globals } from '../../globals';
import { MGData } from '../../modules';
import * as state from './state';
import {
    type PetXpProgress,
    type CombinedXpBoostStats,
    type XpTrackerConfig,
    XP_PER_HOUR,
    FEATURE_NAME,
    LOG_PREFIX,
} from './types';
import {
    calculateCurrentStrength,
    calculateMaxStrength,
    calculateHoursToNextStrength,
    calculateHoursToMaxStrength,
} from '../../modules/calculators/logic/xp';
import {
    hasXpBoostAbility,
    getPrimaryXpBoostStats,
    calculateCombinedXpBoostStats,
} from './logic/xpBoost';
import {
    calculateFeedsToNextStrength,
    calculateFeedsToMaxStrength,
    calculateAdjustedFeedsToMax,
} from '../../modules/calculators/logic/feed';
import { filterAndSortPets, sortPets } from './logic/sorting';

// Re-export types for external use
export * from './types';
export { filterAndSortPets, sortPets } from './logic/sorting';
export { calculateTeamXpData, calculateTeamProgressPercent, calculatePetXpData, formatHoursCompact } from './logic/teamXpCalculations';

// ─────────────────────────────────────────────────────────────────────────────
// Internal State
// ─────────────────────────────────────────────────────────────────────────────

let initialized = false;
let updateInterval: ReturnType<typeof setInterval> | null = null;
let cachedProgress: PetXpProgress[] = [];
let cachedCombinedStats: CombinedXpBoostStats | null = null;

// ─────────────────────────────────────────────────────────────────────────────
// Core XP Progress Building
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Build XP progress data for a single pet
 */
function buildPetXpProgress(pet: {
    id: string;
    petSpecies: string;
    name: string;
    xp: number;
    hunger: number;
    targetScale: number;
    abilities: string[];
    mutations: string[];
    location: 'active' | 'inventory' | 'hutch';
}, currentWeather: string | null, combinedBoostXpPerHour: number): PetXpProgress {
    const maxStrength = calculateMaxStrength(pet.petSpecies, pet.targetScale);
    const currentStrength = calculateCurrentStrength(pet.petSpecies, pet.xp, maxStrength);
    const isMaxStrength = currentStrength >= maxStrength;
    const isStarving = pet.hunger <= 0;

    // Calculate XP rates
    const baseXpPerHour = isStarving ? 0 : XP_PER_HOUR;

    // Get XP Boost stats if pet has the ability
    const xpBoostStats = getPrimaryXpBoostStats(pet.abilities, currentStrength, currentWeather);

    // Total XP per hour includes base + all XP boost contributions from active team
    // For active pets: they receive combined boost from all boosters
    const ownBoostXpPerHour = xpBoostStats?.isActive ? xpBoostStats.expectedXpPerHour : 0;
    const totalXpPerHour = pet.location === 'active' && !isStarving
        ? baseXpPerHour + combinedBoostXpPerHour
        : 0;

    // Calculate time remaining
    const hoursToNextStrength = calculateHoursToNextStrength(
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
    const feedsToNextStrength = calculateFeedsToNextStrength(
        pet.petSpecies,
        pet.hunger,
        hoursToNextStrength
    );

    const feedsToMaxStrength = calculateFeedsToMaxStrength(
        pet.petSpecies,
        pet.hunger,
        hoursToMaxStrength
    );

    return {
        id: pet.id,
        species: pet.petSpecies,
        name: pet.name,
        xp: pet.xp,
        hunger: pet.hunger,
        location: pet.location,
        isStarving,
        currentStrength,
        maxStrength,
        isMaxStrength,
        hoursToNextStrength,
        hoursToMaxStrength,
        feedsToNextStrength,
        feedsToMaxStrength,
        baseXpPerHour,
        totalXpPerHour,
        xpBoostStats,
        targetScale: pet.targetScale,
        abilities: pet.abilities,
        mutations: pet.mutations,
    };
}

/**
 * Build XP progress for all pets
 */
function buildAllPetsProgress(): PetXpProgress[] {
    const myPets = Globals.myPets.get();
    const weather = Globals.weather.get();
    const currentWeather = weather.isActive ? weather.type : null;

    // Get all active pets for XP boost calculation
    const activePets = myPets.byLocation.active;

    // Calculate combined XP boost stats from active boosters
    const boosterData = activePets
        .filter((p: typeof activePets[number]) => !p.isMature || hasXpBoostAbility(p.abilities)) // Include mature boosters
        .filter((p: typeof activePets[number]) => p.hunger > 0) // Must not be starving
        .map((p: typeof activePets[number]) => ({
            petId: p.id,
            petName: p.name ?? '',
            abilities: p.abilities,
            strength: p.currentStrength,
        }));

    const combinedStats = calculateCombinedXpBoostStats(boosterData, currentWeather);
    cachedCombinedStats = combinedStats;

    // Build progress for all pets
    const allProgress: PetXpProgress[] = [];

    for (const pet of myPets.all) {
        const progress = buildPetXpProgress(
            {
                id: pet.id,
                petSpecies: pet.petSpecies,
                name: pet.name ?? '',
                xp: pet.xp,
                hunger: pet.hunger,
                targetScale: pet.targetScale,
                abilities: pet.abilities,
                mutations: pet.mutations,
                location: pet.location,
            },
            currentWeather,
            combinedStats.totalBonusXpPerHour
        );
        allProgress.push(progress);
    }

    // Adjust feeds for max-STR XP Boost pets
    const longestHoursToMax = Math.max(0, ...allProgress.map(p => p.hoursToMaxStrength));

    for (const progress of allProgress) {
        if (progress.isMaxStrength && progress.xpBoostStats) {
            progress.feedsToMaxStrength = calculateAdjustedFeedsToMax(
                true,
                true,
                progress.species,
                progress.hunger,
                0,
                longestHoursToMax
            );
        }
    }

    return allProgress;
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Initialize XP Tracker feature
 */
function init(): void {
    if (initialized) return;

    const config = state.loadConfig();
    if (!config.enabled) {
        console.log(`${LOG_PREFIX} ${FEATURE_NAME} disabled`);
        return;
    }

    console.log(`${LOG_PREFIX} Initializing ${FEATURE_NAME}...`);

    // Initial data build
    if (MGData.isReady()) {
        cachedProgress = buildAllPetsProgress();
    }

    initialized = true;
    console.log(`${LOG_PREFIX} ${FEATURE_NAME} initialized`);
}

/**
 * Check if feature is ready
 */
function isReady(): boolean {
    return initialized && MGData.isReady();
}

/**
 * Get XP progress for all pets
 */
function getAllPetsProgress(): PetXpProgress[] {
    if (!isReady()) return [];
    return cachedProgress;
}

/**
 * Get XP progress for active pets only
 */
function getActivePetsProgress(): PetXpProgress[] {
    return getAllPetsProgress().filter(p => p.location === 'active');
}

/**
 * Get combined XP Boost stats
 */
function getCombinedBoostStats(): CombinedXpBoostStats | null {
    return cachedCombinedStats;
}

/**
 * Refresh XP progress data
 */
function refresh(): void {
    if (!isReady()) return;
    cachedProgress = buildAllPetsProgress();
}

/**
 * Start automatic updates
 */
function startAutoUpdate(intervalMs?: number): void {
    stopAutoUpdate();

    const config = state.loadConfig();
    const interval = intervalMs ?? config.updateIntervalMs;

    updateInterval = setInterval(() => {
        if (state.isEnabled()) {
            refresh();
        }
    }, interval);
}

/**
 * Stop automatic updates
 */
function stopAutoUpdate(): void {
    if (updateInterval) {
        clearInterval(updateInterval);
        updateInterval = null;
    }
}

/**
 * Cleanup feature resources
 */
function destroy(): void {
    if (!initialized) return;

    stopAutoUpdate();
    initialized = false;
    cachedProgress = [];
    cachedCombinedStats = null;

    console.log(`${LOG_PREFIX} ${FEATURE_NAME} destroyed`);
}

/**
 * Get filtered and sorted pets based on current config
 */
function getFilteredPets(): PetXpProgress[] {
    const config = state.loadConfig();
    return filterAndSortPets(getAllPetsProgress(), {
        sortBy: config.sortBy,
        filterSpecies: config.filterSpecies,
        filterHasXpBoost: config.filterHasXpBoost,
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// Module Export
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Set enabled state and handle initialization/cleanup
 */
function setEnabled(enabled: boolean): void {
    state.setEnabled(enabled);

    if (enabled) {
        // Re-initialize if enabling
        initialized = false;
        init();
        // Trigger initial data build
        if (MGData.isReady()) {
            refresh();
        }
        console.log(`${LOG_PREFIX} ${FEATURE_NAME} enabled`);
    } else {
        // Cleanup if disabling
        destroy();
        console.log(`${LOG_PREFIX} ${FEATURE_NAME} disabled`);
    }
}

export const MGXPTracker = {
    // Required API
    init,
    isReady,
    destroy,

    // Config
    loadConfig: state.loadConfig,
    saveConfig: state.saveConfig,
    updateConfig: state.updateConfig,
    isEnabled: state.isEnabled,
    setEnabled,

    // Data
    getAllPetsProgress,
    getActivePetsProgress,
    getCombinedBoostStats,
    getFilteredPets,
    refresh,

    // Auto-update
    startAutoUpdate,
    stopAutoUpdate,

    // Utilities
    sortPets,
    filterAndSortPets,
} as const;

export default MGXPTracker;
