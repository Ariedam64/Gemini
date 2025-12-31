/**
 * AutoFavorite Feature - State Management
 * 
 * Level 1: Imports types only
 * Handles storage persistence
 */

import { storageGet, storageSet } from '../shared/storage';
import type { AutoFavoriteConfig, SimpleAutoFavoriteConfig } from './types';
import { STORAGE_KEY, DEFAULT_CONFIG } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// Config Operations
// ─────────────────────────────────────────────────────────────────────────────

export function loadConfig(): AutoFavoriteConfig {
    return storageGet<AutoFavoriteConfig>(STORAGE_KEY, DEFAULT_CONFIG);
}

export function saveConfig(config: AutoFavoriteConfig): void {
    storageSet(STORAGE_KEY, config);
}

// ─────────────────────────────────────────────────────────────────────────────
// Config Updates
// ─────────────────────────────────────────────────────────────────────────────

export function updateConfig(partial: Partial<AutoFavoriteConfig>): AutoFavoriteConfig {
    const config = loadConfig();
    const updated = { ...config, ...partial };
    saveConfig(updated);
    return updated;
}

export function updateSimpleConfig(partial: Partial<SimpleAutoFavoriteConfig>): AutoFavoriteConfig {
    const config = loadConfig();
    config.mode = 'simple';
    config.simple = { ...config.simple, ...partial };
    saveConfig(config);
    return config;
}

// ─────────────────────────────────────────────────────────────────────────────
// Specific Setters
// ─────────────────────────────────────────────────────────────────────────────

export function setFavoriteSpecies(species: string[]): void {
    updateSimpleConfig({ favoriteSpecies: species });
}

export function setFavoriteMutations(mutations: string[]): void {
    updateSimpleConfig({ favoriteMutations: mutations });
}

export function isEnabled(): boolean {
    return loadConfig().enabled;
}
