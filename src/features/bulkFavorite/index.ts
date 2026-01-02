/**
 * BulkFavorite Module - Public API
 * 
 * Provides bulk favorite/unfavorite functionality for inventory items.
 * Renders floating buttons when inventory panel is open.
 * 
 * @module MGBulkFavorite
 */

// Types
import type { BulkFavoriteConfig, BulkFavoritePosition } from './types';
import { DEFAULT_CONFIG, STORAGE_KEY } from './types';

// Internal modules
import { loadConfig, saveConfig, setPosition, isEnabled } from './state';
import { bulkFavorite } from './logic';
import {
    startWatching,
    stopWatching,
    setEnabled as setEnabledInternal,
    renderButton,
    removeButton,
} from './render';

// ─────────────────────────────────────────────────────────────────────────────
// Module State
// ─────────────────────────────────────────────────────────────────────────────

let initialized = false;

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * BulkFavorite Module
 * @module MGBulkFavorite
 */
export const MGBulkFavorite = {
    // ─── Required Module API ───

    /**
     * Initialize the BulkFavorite module
     * Starts watching for inventory panel if enabled
     * Idempotent: safe to call multiple times
     */
    init(): void {
        if (initialized) return;
        const config = loadConfig();
        if (config.enabled) {
            startWatching();
        }
        initialized = true;
        console.log('✅ [MGBulkFavorite] Initialized');
    },

    /**
     * Check if module is ready/initialized
     */
    isReady(): boolean {
        return initialized;
    },

    // ─── Configuration ───

    /** Default configuration */
    DEFAULT_CONFIG,

    /** Storage key for persistence */
    STORAGE_KEY,

    /** Load current configuration */
    loadConfig,

    /** Save configuration */
    saveConfig,

    /** Check if feature is enabled */
    isEnabled,

    /** Set button position */
    setPosition,

    // ─── Actions ───

    /**
     * Bulk favorite/unfavorite all items in inventory
     * @param favorite - true to favorite, false to unfavorite
     * @returns Number of items changed
     */
    bulkFavorite,

    // ─── Lifecycle ───

    /**
     * Start watching for inventory panel
     */
    start: startWatching,

    /**
     * Stop watching and remove UI
     */
    stop: stopWatching,

    /**
     * Enable or disable the feature
     */
    setEnabled: setEnabledInternal,

    /**
     * Manually render button on an element
     */
    renderButton,

    /**
     * Remove rendered button
     */
    removeButton,

    /**
     * Cleanup module resources
     */
    destroy(): void {
        stopWatching();
        initialized = false;
    },
} as const;

// ─── Backward Compatibility (Deprecated) ───

/**
 * @deprecated Use MGBulkFavorite instead
 */
export const BulkFavorite = MGBulkFavorite;

// Legacy individual exports
export {
    loadConfig,
    saveConfig,
    setPosition,
    isEnabled,
    bulkFavorite,
    startWatching as start,
    stopWatching as stop,
    setEnabledInternal as setEnabled,
    renderButton,
    removeButton,
};

// ─── Type Exports ───
export type { BulkFavoriteConfig, BulkFavoritePosition };
export { DEFAULT_CONFIG, STORAGE_KEY };
