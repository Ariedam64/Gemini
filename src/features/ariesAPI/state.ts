/**
 * AriesAPI Feature - State Management
 *
 * Config storage operations (not exposed in public API)
 */

import { storageGet, storageSet } from '../../utils/storage';
import type { AriesAPIConfig } from './types';
import { DEFAULT_CONFIG, STORAGE_KEY } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// Config Operations (Internal)
// ─────────────────────────────────────────────────────────────────────────────

export function loadConfig(): AriesAPIConfig {
    return storageGet<AriesAPIConfig>(STORAGE_KEY, DEFAULT_CONFIG);
}

export function saveConfig(config: AriesAPIConfig): void {
    storageSet(STORAGE_KEY, config);
}

export function updateConfig(partial: Partial<AriesAPIConfig>): AriesAPIConfig {
    const current = loadConfig();
    const updated = { ...current, ...partial };
    saveConfig(updated);
    return updated;
}
