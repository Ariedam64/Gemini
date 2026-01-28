/**
 * HarvestLocker feature
 * Prevents accidental harvesting of crops based on configurable criteria
 */

import { loadConfig, saveConfig } from './state';
import { start, stop, isSlotLocked, getLockedSlots, updateLockConfig } from './logic/core';
import type { HarvestLockerConfig, ScaleLockCriteria } from './types';

// Import middleware to ensure it's loaded (auto-registers itself)
import './middleware';

/**
 * Feature initialization state
 */
let initialized = false;

/**
 * Initialize the HarvestLocker feature
 */
function init(): void {
    if (initialized) {
        console.warn('[HarvestLocker] Already initialized');
        return;
    }

    const config = loadConfig();

    if (!config.enabled) {
        console.log('[HarvestLocker] Disabled');
        return;
    }

    initialized = true;

    // Start core logic
    start(config);

    console.log('[HarvestLocker] Initialized');
}

/**
 * Destroy the HarvestLocker feature
 */
function destroy(): void {
    if (!initialized) {
        return;
    }

    // Stop core logic
    stop();

    initialized = false;
    console.log('[HarvestLocker] Destroyed');
}

/**
 * Check if the feature is enabled
 */
function isEnabled(): boolean {
    const config = loadConfig();
    return config.enabled;
}

/**
 * Enable or disable the feature
 */
function setEnabled(enabled: boolean): void {
    const config = loadConfig();
    config.enabled = enabled;
    saveConfig(config);

    if (enabled && !initialized) {
        init();
    } else if (!enabled && initialized) {
        destroy();
    }
}

/**
 * Check if a specific slot is locked
 */
function isLocked(slot: string, slotsIndex: number): boolean {
    return isSlotLocked(slot, slotsIndex);
}

/**
 * Get all currently locked slot IDs
 */
function getAllLockedSlots(): string[] {
    return getLockedSlots();
}

/**
 * Lock a slot manually
 */
function lockSlot(slot: string, slotsIndex: number): void {
    const config = loadConfig();
    const slotId = `${slot}-${slotsIndex}`;

    if (!config.manualLocks.includes(slotId)) {
        config.manualLocks.push(slotId);
        saveConfig(config);
        updateLockConfig(config);
    }
}

/**
 * Unlock a manually locked slot
 */
function unlockSlot(slot: string, slotsIndex: number): void {
    const config = loadConfig();
    const slotId = `${slot}-${slotsIndex}`;

    config.manualLocks = config.manualLocks.filter((id) => id !== slotId);
    saveConfig(config);
    updateLockConfig(config);
}

/**
 * Clear all manual locks
 */
function clearManualLocks(): void {
    const config = loadConfig();
    config.manualLocks = [];
    saveConfig(config);
    updateLockConfig(config);
}

/**
 * Set global scale lock criteria
 */
function setGlobalScaleLock(enabled: boolean, minPercentage: number): void {
    const config = loadConfig();
    config.globalCriteria.lockByScale = { enabled, minPercentage };
    saveConfig(config);
    updateLockConfig(config);
}

/**
 * Set global mutation lock criteria
 */
function setGlobalMutationLock(mutations: string[]): void {
    const config = loadConfig();
    config.globalCriteria.lockedMutations = mutations;
    saveConfig(config);
    updateLockConfig(config);
}

/**
 * Set scale lock criteria for a specific species
 */
function setSpeciesScaleLock(species: string, enabled: boolean, minPercentage: number): void {
    const config = loadConfig();

    if (!config.speciesOverrides[species]) {
        config.speciesOverrides[species] = {};
    }

    config.speciesOverrides[species].lockByScale = { enabled, minPercentage };
    saveConfig(config);
    updateLockConfig(config);
}

/**
 * Set mutation lock criteria for a specific species
 */
function setSpeciesMutationLock(species: string, mutations: string[]): void {
    const config = loadConfig();

    if (!config.speciesOverrides[species]) {
        config.speciesOverrides[species] = {};
    }

    config.speciesOverrides[species].lockedMutations = mutations;
    saveConfig(config);
    updateLockConfig(config);
}

/**
 * Clear all overrides for a specific species
 */
function clearSpeciesOverride(species: string): void {
    const config = loadConfig();
    delete config.speciesOverrides[species];
    saveConfig(config);
    updateLockConfig(config);
}

/**
 * Get current configuration
 */
function getConfig(): HarvestLockerConfig {
    return loadConfig();
}

/**
 * Public API
 */
export const MGHarvestLocker = {
    // Lifecycle
    init,
    destroy,
    isEnabled,
    setEnabled,

    // Locks query
    isLocked,
    getAllLockedSlots,

    // Manual locks
    lockSlot,
    unlockSlot,
    clearManualLocks,

    // Global criteria
    setGlobalScaleLock,
    setGlobalMutationLock,

    // Species-specific criteria
    setSpeciesScaleLock,
    setSpeciesMutationLock,
    clearSpeciesOverride,

    // Configuration
    getConfig,
};

/**
 * Type exports
 */
export type { HarvestLockerConfig, ScaleLockCriteria } from './types';
