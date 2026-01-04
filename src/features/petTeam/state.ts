/**
 * PetTeam Feature - State Management
 *
 * Level 1: Only imports from types.ts and shared utilities
 */

import { storageGet, storageSet } from '../../utils/storage';
import { STORAGE_KEY, DEFAULT_CONFIG } from './types';
import type { PetTeamConfig } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// Storage Operations
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Load pet team configuration from storage
 * @returns Current config or default if not found
 */
export function loadConfig(): PetTeamConfig {
    return storageGet(STORAGE_KEY, DEFAULT_CONFIG);
}

/**
 * Save pet team configuration to storage
 * @param config - Configuration to save
 */
export function saveConfig(config: PetTeamConfig): void {
    storageSet(STORAGE_KEY, config);
}

/**
 * Update pet team configuration with partial updates
 * @param updates - Partial configuration updates
 * @returns Updated configuration
 */
export function updateConfig(updates: Partial<PetTeamConfig>): PetTeamConfig {
    const current = loadConfig();
    const updated = { ...current, ...updates };
    saveConfig(updated);
    return updated;
}

/**
 * Check if pet team feature is enabled
 * @returns true if enabled, false otherwise
 */
export function isEnabled(): boolean {
    const config = loadConfig();
    return config.enabled;
}

/**
 * Set enabled state of pet team feature
 * @param enabled - New enabled state
 */
export function setEnabled(enabled: boolean): void {
    updateConfig({ enabled });
}
