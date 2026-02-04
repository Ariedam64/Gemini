/**
 * HarvestLocker feature
 * Prevents accidental harvesting of crops based on configurable rules
 */

import {
    loadConfig,
    saveConfig,
    createRule,
    addOverallRule,
    addSpeciesRule,
    updateRule,
    deleteRule,
    cloneRuleToSpecies,
} from './state';
import { start, stop, isSlotLocked, getLockedSlots, updateLockConfig } from './logic/core';
import type { HarvestLockerConfig, HarvestRule, RuleMode, MutationMatchMode } from './types';
import { HarvestLockerInject } from '../../ui/inject/qol/harvestLocker';

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

    // Start crop card injection (red border + lock icon on locked crops)
    HarvestLockerInject.init();

    console.log('[HarvestLocker] Initialized');
}

/**
 * Destroy the HarvestLocker feature
 */
function destroy(): void {
    if (!initialized) {
        return;
    }

    // Stop injection first (may still read core state during cleanup)
    HarvestLockerInject.destroy();

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
 * Get current configuration
 */
function getConfig(): HarvestLockerConfig {
    return loadConfig();
}

/* ───────────────────── Rule Management ───────────────────── */

/**
 * Get all overall rules
 */
function getOverallRules(): HarvestRule[] {
    const config = loadConfig();
    return config.overallRules;
}

/**
 * Get rules for a specific species
 */
function getSpeciesRules(species: string): HarvestRule[] {
    const config = loadConfig();
    return config.speciesRules[species] || [];
}

/**
 * Get all species that have rules
 */
function getAllSpeciesWithRules(): string[] {
    const config = loadConfig();
    return Object.keys(config.speciesRules);
}

/**
 * Create and add a new overall rule
 */
function addNewOverallRule(
    name: string,
    mode: RuleMode,
    sizeCondition?: { enabled: boolean; minPercentage: number },
    mutationCondition?: { enabled: boolean; mutations: string[]; matchMode: MutationMatchMode }
): HarvestRule {
    const rule = createRule(name, mode, sizeCondition, mutationCondition);
    addOverallRule(rule);
    updateLockConfig(loadConfig());
    return rule;
}

/**
 * Create and add a new species-specific rule
 */
function addNewSpeciesRule(
    species: string,
    name: string,
    mode: RuleMode,
    sizeCondition?: { enabled: boolean; minPercentage: number },
    mutationCondition?: { enabled: boolean; mutations: string[]; matchMode: MutationMatchMode }
): HarvestRule {
    const rule = createRule(name, mode, sizeCondition, mutationCondition);
    addSpeciesRule(species, rule);
    updateLockConfig(loadConfig());
    return rule;
}

/**
 * Update an existing rule
 */
function modifyRule(ruleId: string, updates: Partial<HarvestRule>): void {
    updateRule(ruleId, updates);
    updateLockConfig(loadConfig());
}

/**
 * Delete a rule
 */
function removeRule(ruleId: string): void {
    deleteRule(ruleId);
    updateLockConfig(loadConfig());
}

/**
 * Toggle a rule's enabled state
 */
function toggleRule(ruleId: string, enabled: boolean): void {
    updateRule(ruleId, { enabled });
    updateLockConfig(loadConfig());
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

    // Rule management
    getOverallRules,
    getSpeciesRules,
    getAllSpeciesWithRules,
    addNewOverallRule,
    addNewSpeciesRule,
    modifyRule,
    removeRule,
    toggleRule,
    cloneRuleToSpecies,

    // Configuration
    getConfig,
};

/**
 * Type exports
 */
export type {
    HarvestLockerConfig,
    HarvestRule,
    RuleMode,
    MutationMatchMode,
    SizeCondition,
    MutationCondition,
} from './types';
