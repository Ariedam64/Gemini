/**
 * HarvestLocker state management
 */

import { storageGet, storageSet, KEYS } from '../../utils/storage';
import type { HarvestLockerConfig } from './types';
import { DEFAULT_CONFIG } from './types';

/**
 * Load configuration from storage
 */
export function loadConfig(): HarvestLockerConfig {
    const stored = storageGet<HarvestLockerConfig>(
        KEYS.FEATURE.HARVEST_LOCKER,
        DEFAULT_CONFIG
    );

    // Merge with defaults to handle missing properties
    return {
        ...DEFAULT_CONFIG,
        ...stored,
        globalCriteria: {
            ...DEFAULT_CONFIG.globalCriteria,
            ...stored.globalCriteria,
        },
        speciesOverrides: stored.speciesOverrides || {},
        manualLocks: stored.manualLocks || [],
    };
}

/**
 * Save configuration to storage
 */
export function saveConfig(config: HarvestLockerConfig): void {
    storageSet(KEYS.FEATURE.HARVEST_LOCKER, config);
}

/**
 * Update configuration (partial update + save)
 */
export function updateConfig(updates: Partial<HarvestLockerConfig>): HarvestLockerConfig {
    const current = loadConfig();
    const updated = { ...current, ...updates };
    saveConfig(updated);
    return updated;
}
