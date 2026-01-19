/**
 * Unified Storage Wrapper (Tampermonkey GM_*)
 *
 * Provides type-safe storage using Tampermonkey's GM_getValue/GM_setValue.
 * All keys are automatically prefixed with 'gemini:' for namespacing.
 *
 * All storage keys are defined here with descriptions to prevent typos
 * and provide a single source of truth.
 *
 * @example
 * import { storageGet, storageSet, KEYS } from '@/utils/storage';
 *
 * const config = storageGet(KEYS.FEATURE.AUTO_FAVORITE, { enabled: false });
 * storageSet(KEYS.FEATURE.AUTO_FAVORITE, { enabled: true });
 */

const STORAGE_PREFIX = 'gemini:';

// ─────────────────────────────────────────────────────────────────────────────
// Storage Keys Registry
// ─────────────────────────────────────────────────────────────────────────────

/** Keys for HUD and UI state */
export const HUD_KEYS = {
    /** Main HUD state (open/closed, width, active tab) */
    STATE: 'hud:state',
    /** Current theme selection */
    THEME: 'hud:theme',
} as const;

/** Keys for section-level persistent state */
export const SECTION_KEYS = {
    /** All sections combined state (legacy format) */
    ALL: 'sections',
    /** Settings section state */
    SETTINGS: 'sections:settings',
    /** Test section state */
    TEST: 'sections:test',
} as const;

/** Keys for core modules (infrastructure - per .claude/rules/modules.md) */
export const MODULE_KEYS = {
    /** Audio module custom sounds library */
    AUDIO_CUSTOM_SOUNDS: 'module:audio:customSounds',
} as const;

/** Keys for global variables persistent state */
export const GLOBAL_KEYS = {
    /** myPets ability logs storage */
    MY_PETS_ABILITY_LOGS: 'global:myPets:abilityLogs',
} as const;

/** Keys for optional features (per .claude/rules/features.md) */
export const FEATURE_KEYS = {
    /** Auto-favorite feature config */
    AUTO_FAVORITE: 'feature:autoFavorite:config',
    /** Auto-favorite UI configuration */
    AUTO_FAVORITE_UI: 'feature:autoFavorite:ui',
    /** Journal checker feature config */
    JOURNAL_CHECKER: 'feature:journalChecker:config',
    /** Bulk favorite feature config */
    BULK_FAVORITE: 'feature:bulkFavorite:config',
    /** Achievements feature data */
    ACHIEVEMENTS: 'feature:achievements:data',
    /** Stats tracker feature data */
    TRACKER_STATS: 'feature:tracker:stats',
    /** Anti-AFK feature config */
    ANTI_AFK: 'feature:antiAfk:config',
    /** Master feature settings config */
    CONFIG: 'feature:config',
    /** Pet team feature config */
    PET_TEAM: 'feature:petTeam:config',
    /** XP Tracker feature config */
    XP_TRACKER: 'feature:xpTracker:config',
    /** Crop value indicator feature config */
    CROP_VALUE_INDICATOR: 'feature:cropValueIndicator:config',
    /** Crop size indicator feature config */
    CROP_SIZE_INDICATOR: 'feature:cropSizeIndicator:config',
    /** Shop notifier feature config */
    SHOP_NOTIFIER: 'feature:shopNotifier:config',
    /** Weather notifier feature config */
    WEATHER_NOTIFIER: 'feature:weatherNotifier:config',
} as const;

/** Keys for development/debug purposes */
export const DEV_KEYS = {
    /** Auto-reload toggle for HMR */
    AUTO_RELOAD: 'dev:auto-reload',
} as const;

/**
 * All storage keys in one object for convenience
 */
export const KEYS = {
    HUD: HUD_KEYS,
    SECTION: SECTION_KEYS,
    MODULE: MODULE_KEYS,
    GLOBAL: GLOBAL_KEYS,
    FEATURE: FEATURE_KEYS,
    DEV: DEV_KEYS,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Event Names (CustomEvent prefixes per .claude/rules/core.md)
// ─────────────────────────────────────────────────────────────────────────────

/** Event names for cross-feature signals (prefixed with gemini:) */
export const EVENTS = {
    /** Storage value changed */
    STORAGE_CHANGE: 'gemini:storage:change',
    /** Journal data updated */
    JOURNAL_UPDATED: 'gemini:journal-updated',
    /** HUD open state changed */
    HUD_OPEN_CHANGE: 'gemini:hud-open-change',
    /** Layout resize request */
    LAYOUT_RESIZE: 'gemini:layout-resize',
    /** Manual HMR toggle */
    TOGGLE_MANUAL_HMR: 'gemini:toggle-manual-hmr',
    /** Update pending notification */
    UPDATE_PENDING: 'gemini:update-pending',
    /** Force reload request */
    FORCE_RELOAD: 'gemini:force-reload',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Storage Wrapper Functions
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get a value from Tampermonkey storage
 * 
 * @param key - Storage key (will be prefixed with 'gemini:')
 * @param defaultValue - Default value if key doesn't exist
 * @returns Stored value or default
 */
export function storageGet<T>(key: string, defaultValue: T): T {
    try {
        const fullKey = key.startsWith(STORAGE_PREFIX) ? key : STORAGE_PREFIX + key;
        const serialized = GM_getValue(fullKey);

        if (serialized === undefined || serialized === null) {
            return defaultValue;
        }

        // If it's already a string, try to parse it as JSON
        if (typeof serialized === 'string') {
            return JSON.parse(serialized) as T;
        }

        // If it's already an object (shouldn't happen with proper usage), return it
        return serialized as T;
    } catch (error) {
        console.error(`[Gemini Storage] Failed to read key "${key}":`, error);
        return defaultValue;
    }
}

/**
 * Save a value to Tampermonkey storage
 * 
 * @param key - Storage key (will be prefixed with 'gemini:')
 * @param value - Value to store (will be JSON serialized)
 */
export function storageSet<T>(key: string, value: T): void {
    try {
        const fullKey = key.startsWith(STORAGE_PREFIX) ? key : STORAGE_PREFIX + key;
        const cleanKey = key.startsWith(STORAGE_PREFIX) ? key.slice(STORAGE_PREFIX.length) : key;
        const serialized = JSON.stringify(value);

        GM_setValue(fullKey, serialized);

        // Dispatch event for reactivity within the same window
        window.dispatchEvent(new CustomEvent('gemini:storage:change', {
            detail: { key: cleanKey, value }
        }));
    } catch (error) {
        console.error(`[Gemini Storage] Failed to write key "${key}":`, error);
    }
}

/**
 * Remove a value from Tampermonkey storage
 * 
 * @param key - Storage key (will be prefixed with 'gemini:')
 */
export function storageRemove(key: string): void {
    try {
        const fullKey = key.startsWith(STORAGE_PREFIX) ? key : STORAGE_PREFIX + key;
        GM_setValue(fullKey, undefined as any);
    } catch (error) {
        console.error(`[Gemini Storage] Failed to remove key "${key}":`, error);
    }
}

/**
 * Check if a key exists in Tampermonkey storage
 * 
 * @param key - Storage key (will be prefixed with 'gemini:')
 * @returns true if key exists, false otherwise
 */
export function storageHas(key: string): boolean {
    try {
        const fullKey = key.startsWith(STORAGE_PREFIX) ? key : STORAGE_PREFIX + key;
        const value = GM_getValue(fullKey);
        return value !== undefined && value !== null;
    } catch (error) {
        console.error(`[Gemini Storage] Failed to check key "${key}":`, error);
        return false;
    }
}

/**
 * Migrate old storage keys to new format
 * Call this once during bootstrap to migrate existing data
 */
export function migrateStorageKeys(): void {
    try {
        // Migrate old localStorage keys to GM_* storage
        // This is a one-time migration for users upgrading from localStorage-based storage

        const localStoragePrefix = 'gemini:';
        const keysToMigrate: string[] = [];

        // Find all localStorage keys with gemini: prefix
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(localStoragePrefix)) {
                keysToMigrate.push(key);
            }
        }

        // Migrate each key
        for (const oldKey of keysToMigrate) {
            try {
                const value = localStorage.getItem(oldKey);
                if (value !== null) {
                    // Parse and re-save to GM_* storage
                    const parsed = JSON.parse(value);
                    const cleanKey = oldKey.slice(localStoragePrefix.length);
                    storageSet(cleanKey, parsed);

                    console.log(`[Gemini Storage] Migrated key: ${oldKey}`);
                }
            } catch (err) {
                console.warn(`[Gemini Storage] Failed to migrate key "${oldKey}":`, err);
            }
        }

        // Migrate old 'gemini.sections' key (with dot instead of colon)
        const oldSectionsKey = 'gemini.sections';
        const oldSectionsValue = GM_getValue(oldSectionsKey);
        if (oldSectionsValue !== undefined && oldSectionsValue !== null) {
            storageSet('sections', oldSectionsValue);
            GM_setValue(oldSectionsKey, undefined as any); // Remove old key
            console.log('[Gemini Storage] Migrated: gemini.sections → gemini:sections');
        }

        if (keysToMigrate.length > 0) {
            console.log(`[Gemini Storage] Migration complete. ${keysToMigrate.length} keys migrated from localStorage to GM_* storage.`);
        }
    } catch (error) {
        console.error('[Gemini Storage] Migration failed:', error);
    }
}
