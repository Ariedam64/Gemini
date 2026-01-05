/**
 * AutoFavoriteSettings Section - Persistent State
 *
 * Per ui/sections.md: sections MUST have state.ts using createSectionStore
 */

import { createSectionStore, SectionStateController } from '../core/State';
import { storageGet, storageRemove, FEATURE_KEYS } from '../../../utils/storage';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface AutoFavoriteSettingsSectionState {
    /** Whether Auto-Favorite feature is enabled */
    enabled: boolean;
    /** List of favorited produce/plant species */
    favoriteProduceList: string[];
    /** List of favorited pet species */
    favoritePetsList: string[];
    /** List of enabled mutation filters */
    favoriteMutations: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Defaults
// ─────────────────────────────────────────────────────────────────────────────

const DEFAULTS: AutoFavoriteSettingsSectionState = {
    enabled: false,
    favoriteProduceList: [],
    favoritePetsList: [],
    favoriteMutations: [],
};

// ─────────────────────────────────────────────────────────────────────────────
// Store
// ─────────────────────────────────────────────────────────────────────────────

let storeInstance: SectionStateController<AutoFavoriteSettingsSectionState> | null = null;

/**
 * Initialize the section state store
 * Must be called before using getStore()
 *
 * Includes migration from old storage key to new section store
 */
export async function initSectionState(): Promise<SectionStateController<AutoFavoriteSettingsSectionState>> {
    if (storeInstance) return storeInstance;

    storeInstance = await createSectionStore<AutoFavoriteSettingsSectionState>('tab-auto-favorite', {
        version: 1,
        defaults: DEFAULTS,
    });

    // Migrate old data if exists
    const oldData = storageGet(FEATURE_KEYS.AUTO_FAVORITE_UI, null);
    if (oldData) {
        await storeInstance.set(oldData);
        storageRemove(FEATURE_KEYS.AUTO_FAVORITE_UI);
        console.log('[AutoFavoriteSettings] Migrated old storage to new state');
    }

    return storeInstance;
}

/**
 * Get the section state store
 * Throws if not initialized
 */
export function getStore(): SectionStateController<AutoFavoriteSettingsSectionState> {
    if (!storeInstance) {
        throw new Error('[AutoFavoriteSettings] Section state not initialized. Call initSectionState() first.');
    }
    return storeInstance;
}

/**
 * Check if store is initialized
 */
export function isStoreReady(): boolean {
    return storeInstance !== null;
}
