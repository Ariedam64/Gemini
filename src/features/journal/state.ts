/**
 * Journal Feature - State Management
 *
 * Level 1: Imports types only
 */

import { storageGet, storageSet, FEATURE_KEYS } from '../../utils/storage';
import type { JournalConfig } from './types';
import { STORAGE_KEY, DEFAULT_CONFIG } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// Config Operations
// ─────────────────────────────────────────────────────────────────────────────

export function loadConfig(): JournalConfig {
    // Migration: check for old journalChecker config on first load
    const existing = storageGet<JournalConfig | null>(STORAGE_KEY, null);
    if (existing) return existing;

    // Check for old key, migrate if found
    const oldConfig = storageGet<Record<string, unknown> | null>(FEATURE_KEYS.JOURNAL_CHECKER, null);
    if (oldConfig) {
        // Old config only had useInGameAbilities; map to new shape
        storageSet(STORAGE_KEY, DEFAULT_CONFIG);
        return DEFAULT_CONFIG;
    }

    return DEFAULT_CONFIG;
}

export function saveConfig(config: JournalConfig): void {
    storageSet(STORAGE_KEY, config);
}
