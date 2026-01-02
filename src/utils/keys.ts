/**
 * Centralized Storage Keys Registry
 * 
 * All storage keys must be defined here with descriptions.
 * This prevents typos and provides a single source of truth.
 * 
 * Keys are NOT prefixed with 'gemini:' here - the storage wrapper
 * in src/utils/storage.ts adds the prefix automatically.
 * 
 * @module STORAGE_KEYS
 */

// ─────────────────────────────────────────────────────────────────────────────
// HUD & UI Keys
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

// ─────────────────────────────────────────────────────────────────────────────
// Feature Keys
// ─────────────────────────────────────────────────────────────────────────────

/** Keys for feature configurations (UI settings panels) */
export const FEATURE_KEYS = {
    /** Master feature settings config */
    CONFIG: 'features:config',
    /** Auto-favorite UI configuration */
    AUTO_FAVORITE_UI: 'features:autoFavorite:ui',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Module Keys
// ─────────────────────────────────────────────────────────────────────────────

/** Keys for module-level persistence (per .claude/rules/modules.md) */
export const MODULE_KEYS = {
    /** Auto-favorite module config */
    AUTO_FAVORITE: 'module:autoFavorite:config',
    /** Journal checker module config */
    JOURNAL_CHECKER: 'module:journalChecker:config',
    /** Bulk favorite module config */
    BULK_FAVORITE: 'module:bulkFavorite:config',
    /** Achievements module data */
    ACHIEVEMENTS: 'module:achievements:data',
    /** Stats tracker module data */
    TRACKER_STATS: 'module:tracker:stats',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Dev Keys
// ─────────────────────────────────────────────────────────────────────────────

/** Keys for development/debug purposes */
export const DEV_KEYS = {
    /** Auto-reload toggle for HMR */
    AUTO_RELOAD: 'dev:auto-reload',
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
// Unified Export
// ─────────────────────────────────────────────────────────────────────────────

/**
 * All storage keys in one object for convenience
 */
export const STORAGE_KEYS = {
    HUD: HUD_KEYS,
    SECTION: SECTION_KEYS,
    FEATURE: FEATURE_KEYS,
    MODULE: MODULE_KEYS,
    DEV: DEV_KEYS,
} as const;

/**
 * Key descriptions for debugging and documentation
 */
export const KEY_DESCRIPTIONS: Record<string, string> = {
    // HUD
    [HUD_KEYS.STATE]: 'HUD window state (open, width, active tab)',
    [HUD_KEYS.THEME]: 'Selected theme name',

    // Sections
    [SECTION_KEYS.ALL]: 'Combined sections state (legacy)',
    [SECTION_KEYS.SETTINGS]: 'Settings section persistent state',
    [SECTION_KEYS.TEST]: 'Test section persistent state',

    // Features
    [FEATURE_KEYS.CONFIG]: 'Master feature toggles configuration',
    [FEATURE_KEYS.AUTO_FAVORITE_UI]: 'Auto-favorite UI panel configuration',

    // Modules
    [MODULE_KEYS.AUTO_FAVORITE]: 'Auto-favorite module config (enabled, rules)',
    [MODULE_KEYS.JOURNAL_CHECKER]: 'Journal checker module config',
    [MODULE_KEYS.BULK_FAVORITE]: 'Bulk favorite module config',
    [MODULE_KEYS.ACHIEVEMENTS]: 'Achievements module data (unlocked, progress)',
    [MODULE_KEYS.TRACKER_STATS]: 'Stats tracker data (session, allTime)',

    // Dev
    [DEV_KEYS.AUTO_RELOAD]: 'Auto-reload toggle for development HMR',
};

