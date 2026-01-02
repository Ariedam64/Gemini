/**
 * BulkFavorite Feature - State Management
 * 
 * Level 1: Imports types only
 */

import { storageGet, storageSet } from '../../utils/storage';
import type { BulkFavoriteConfig, BulkFavoritePosition } from './types';
import { STORAGE_KEY, DEFAULT_CONFIG } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// Config Operations
// ─────────────────────────────────────────────────────────────────────────────

export function loadConfig(): BulkFavoriteConfig {
    return storageGet<BulkFavoriteConfig>(STORAGE_KEY, DEFAULT_CONFIG);
}

export function saveConfig(config: BulkFavoriteConfig): void {
    storageSet(STORAGE_KEY, config);
}

export function setPosition(position: BulkFavoritePosition): void {
    const config = loadConfig();
    config.position = position;
    saveConfig(config);
}

export function isEnabled(): boolean {
    return loadConfig().enabled;
}
