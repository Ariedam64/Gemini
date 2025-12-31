/**
 * JournalChecker Feature - State Management
 * 
 * Level 1: Imports types only
 */

import { storageGet, storageSet } from '../shared/storage';
import type { JournalCheckerConfig } from './types';
import { STORAGE_KEY, DEFAULT_CONFIG } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// Config Operations
// ─────────────────────────────────────────────────────────────────────────────

export function loadConfig(): JournalCheckerConfig {
    return storageGet<JournalCheckerConfig>(STORAGE_KEY, DEFAULT_CONFIG);
}

export function saveConfig(config: JournalCheckerConfig): void {
    storageSet(STORAGE_KEY, config);
}

export function isEnabled(): boolean {
    return loadConfig().enabled;
}

export function setAutoRefresh(enabled: boolean): void {
    const config = loadConfig();
    config.autoRefresh = enabled;
    saveConfig(config);
}

export function setRefreshInterval(ms: number): void {
    const config = loadConfig();
    config.refreshIntervalMs = ms;
    saveConfig(config);
}
