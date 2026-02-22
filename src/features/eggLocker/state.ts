/**
 * EggLocker state management
 */

import { storageGet, storageSet, KEYS, EVENTS } from '../../utils/storage';
import type { EggLockerConfig } from './types';
import { DEFAULT_CONFIG } from './types';

/**
 * Load configuration from storage
 */
export function loadConfig(): EggLockerConfig {
    const stored = storageGet<EggLockerConfig>(
        KEYS.FEATURE.EGG_LOCKER,
        DEFAULT_CONFIG
    );

    return {
        ...DEFAULT_CONFIG,
        ...stored,
        blockedEggs: stored.blockedEggs || [],
    };
}

/**
 * Save configuration to storage
 */
export function saveConfig(config: EggLockerConfig): void {
    storageSet(KEYS.FEATURE.EGG_LOCKER, config);
}

/**
 * Block an egg type from hatching
 */
export function blockEgg(eggId: string): void {
    const config = loadConfig();
    if (!config.blockedEggs.includes(eggId)) {
        config.blockedEggs.push(eggId);
        saveConfig(config);
        window.dispatchEvent(new CustomEvent(EVENTS.EGG_LOCKER_LOCKS_UPDATED));
    }
}

/**
 * Unblock an egg type
 */
export function unblockEgg(eggId: string): void {
    const config = loadConfig();
    config.blockedEggs = config.blockedEggs.filter((id) => id !== eggId);
    saveConfig(config);
    window.dispatchEvent(new CustomEvent(EVENTS.EGG_LOCKER_LOCKS_UPDATED));
}
