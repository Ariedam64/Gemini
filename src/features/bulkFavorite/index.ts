/**
 * BulkFavorite Feature - Public API
 *
 * Provides bulk favorite/unfavorite functionality for inventory items.
 * UI rendering is handled by the UI injection layer (src/ui/inject/qol/bulkFavorite).
 *
 * @module MGBulkFavorite
 */

// Types
import type { BulkFavoriteConfig, BulkFavoritePosition } from './types';
import { DEFAULT_CONFIG, STORAGE_KEY } from './types';

// Internal modules
import { loadConfig, saveConfig, setPosition, isEnabled } from './state';
import { bulkFavorite } from './logic/bulkFavorite';

// ─────────────────────────────────────────────────────────────────────────────
// Module State
// ─────────────────────────────────────────────────────────────────────────────

let initialized = false;

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * BulkFavorite Feature
 * @module MGBulkFavorite
 */
export const MGBulkFavorite = {
    // ─── Required Feature API ───

    /**
     * Initialize the BulkFavorite feature
     * Idempotent: safe to call multiple times
     *
     * Note: UI injection is handled separately by src/ui/inject/qol/bulkFavorite
     */
    init(): void {
        if (initialized) return;
        initialized = true;
        console.log('✅ [MGBulkFavorite] Feature initialized');
    },

    /**
     * Check if feature is ready/initialized
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
     * Cleanup feature resources
     */
    destroy(): void {
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
};

// ─── Type Exports ───
export type { BulkFavoriteConfig, BulkFavoritePosition };
export { DEFAULT_CONFIG, STORAGE_KEY };
