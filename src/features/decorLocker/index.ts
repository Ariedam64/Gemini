/**
 * DecorLocker feature
 * Blocks pickup of specific decor types based on a configurable blocked list
 */

import { loadConfig, saveConfig, blockDecor as stateBlockDecor, unblockDecor as stateUnblockDecor } from './state';
import { MGData } from '../../modules/data';
import { DecorLockerInject } from '../../ui/inject/qol/decorLocker';

// Import middleware to ensure it's loaded (auto-registers itself)
import './middleware';

/**
 * Feature initialization state
 */
let initialized = false;

/**
 * Initialize the DecorLocker feature
 */
function init(): void {
    if (initialized) {
        return;
    }

    const config = loadConfig();
    if (!config.enabled) {
        console.log('[DecorLocker] Disabled');
        return;
    }

    initialized = true;

    // Initialize UI inject (purple border + lock icon on decor cards)
    DecorLockerInject.init();

    console.log('[DecorLocker] Initialized');
}

/**
 * Destroy the DecorLocker feature
 */
function destroy(): void {
    if (!initialized) {
        return;
    }

    // Destroy UI inject
    DecorLockerInject.destroy();

    initialized = false;
    console.log('[DecorLocker] Destroyed');
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
 * Get all available decor types from game data (dynamic, never hardcoded)
 */
function getAvailableDecors(): string[] {
    const decors = MGData.get('decor') as Record<string, unknown> | null;
    if (!decors) return [];
    return Object.keys(decors);
}

/**
 * Get currently blocked decor types
 */
function getBlockedDecors(): string[] {
    return loadConfig().blockedDecors;
}

/**
 * Check if a specific decor is blocked
 */
function isDecorBlocked(decorId: string): boolean {
    return loadConfig().blockedDecors.includes(decorId);
}

/**
 * Block a decor type from pickup
 */
function blockDecor(decorId: string): void {
    stateBlockDecor(decorId);
}

/**
 * Unblock a decor type
 */
function unblockDecor(decorId: string): void {
    stateUnblockDecor(decorId);
}

/**
 * Block all available decors from MGData
 */
function blockAllDecors(): void {
    const availableDecors = getAvailableDecors();
    const config = loadConfig();
    config.blockedDecors = availableDecors;
    saveConfig(config);
    window.dispatchEvent(new CustomEvent('gemini:decorLocker-locks-updated'));
}

/**
 * Unblock all decors (clear the blocked list)
 */
function unblockAllDecors(): void {
    const config = loadConfig();
    config.blockedDecors = [];
    saveConfig(config);
    window.dispatchEvent(new CustomEvent('gemini:decorLocker-locks-updated'));
}

/**
 * Clear all blocked decors (alias for unblockAllDecors)
 */
function clearBlocks(): void {
    unblockAllDecors();
}

/**
 * Public API
 */
export const MGDecorLocker = {
    // Lifecycle
    init,
    destroy,
    isEnabled,
    setEnabled,

    // Decor management
    getAvailableDecors,
    getBlockedDecors,
    isDecorBlocked,
    blockDecor,
    unblockDecor,
    blockAllDecors,
    unblockAllDecors,
    clearBlocks,
};

export type { DecorLockerConfig } from './types';
