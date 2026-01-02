/**
 * AutoFavorite Feature - Public API
 * 
 * Level 3: Re-exports from types, state, logic
 * This is the ONLY file external code should import from
 */

// Types
import type {
    AutoFavoriteConfig,
    SimpleAutoFavoriteConfig,
    FavoriteableItem,
} from './types';

import { DEFAULT_CONFIG, STORAGE_KEY } from './types';
import * as State from './state';
import * as Logic from './logic';

/**
 * AutoFavorite Module
 * @module MGAutoFavorite
 */
export const MGAutoFavorite = {
    // ─── Required Module API ───
    /**
     * Initialize the AutoFavorite module
     * Idempotent: safe to call multiple times
     */
    init(): void {
        if (this.isReady()) return;
        Logic.start();
    },

    /**
     * Check if module is ready/initialized
     */
    isReady(): boolean {
        return State.isEnabled();
    },

    // ─── Types ───
    DEFAULT_CONFIG,
    STORAGE_KEY,

    // ─── State API ───
    loadConfig: State.loadConfig,
    saveConfig: State.saveConfig,
    updateConfig: State.updateConfig,
    updateSimpleConfig: State.updateSimpleConfig,
    setFavoriteSpecies: State.setFavoriteSpecies,
    setFavoriteMutations: State.setFavoriteMutations,
    isEnabled: State.isEnabled,

    // ─── Logic API ───
    start: Logic.start,
    stop: Logic.stop,
    setEnabled: Logic.setEnabled,
    shouldFavorite: Logic.shouldFavorite,
    getGameMutations: Logic.getGameMutations,
} as const;

// ─── Backward Compatibility (Deprecated) ───
/**
 * @deprecated Use MGAutoFavorite instead
 */
export const AutoFavorite = MGAutoFavorite;

// ─── Type Exports ───
export type {
    AutoFavoriteConfig,
    SimpleAutoFavoriteConfig,
    FavoriteableItem,
};
