/**
 * EggLocker feature
 * Blocks hatching of specific egg types based on a configurable blocked list
 */

import { loadConfig, saveConfig, blockEgg as stateBlockEgg, unblockEgg as stateUnblockEgg } from './state';
import { MGData } from '../../modules/data';
import { EggLockerInject } from '../../ui/inject/qol/eggLocker';

// Import middleware to ensure it's loaded (auto-registers itself)
import './middleware';

/**
 * Feature initialization state
 */
let initialized = false;

/**
 * Initialize the EggLocker feature
 */
function init(): void {
    if (initialized) {
        return;
    }

    const config = loadConfig();
    if (!config.enabled) {
        console.log('[EggLocker] Disabled');
        return;
    }

    initialized = true;

    // Initialize UI inject (purple border + lock icon on egg cards)
    EggLockerInject.init();

    console.log('[EggLocker] Initialized');
}

/**
 * Destroy the EggLocker feature
 */
function destroy(): void {
    if (!initialized) {
        return;
    }

    // Destroy UI inject
    EggLockerInject.destroy();

    initialized = false;
    console.log('[EggLocker] Destroyed');
}

/**
 * Check if the feature is enabled
 */
function isEnabled(): boolean {
    return loadConfig().enabled;
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
 * Get all available egg types from game data (dynamic, never hardcoded)
 */
function getAvailableEggs(): string[] {
    const eggs = MGData.get('eggs') as Record<string, unknown> | null;
    if (!eggs) return [];
    return Object.keys(eggs);
}

/**
 * Get currently blocked egg types
 */
function getBlockedEggs(): string[] {
    return loadConfig().blockedEggs;
}

/**
 * Block an egg type from hatching
 */
function blockEgg(eggId: string): void {
    stateBlockEgg(eggId);
}

/**
 * Unblock an egg type
 */
function unblockEgg(eggId: string): void {
    stateUnblockEgg(eggId);
}

/**
 * Clear all blocked eggs
 */
function clearBlocks(): void {
    const config = loadConfig();
    config.blockedEggs = [];
    saveConfig(config);
}

/**
 * Public API
 */
export const MGEggLocker = {
    // Lifecycle
    init,
    destroy,
    isEnabled,
    setEnabled,

    // Egg management
    getAvailableEggs,
    getBlockedEggs,
    blockEgg,
    unblockEgg,
    clearBlocks,
};

export type { EggLockerConfig } from './types';
