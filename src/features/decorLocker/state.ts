/**
 * DecorLocker state management
 */

import { storageGet, storageSet, KEYS, EVENTS } from '../../utils/storage';
import type { DecorLockerConfig } from './types';
import { DEFAULT_CONFIG } from './types';

/**
 * Load configuration from storage
 */
export function loadConfig(): DecorLockerConfig {
    const stored = storageGet<DecorLockerConfig>(
        KEYS.FEATURE.DECOR_LOCKER,
        DEFAULT_CONFIG
    );

    return {
        ...DEFAULT_CONFIG,
        ...stored,
        blockedDecors: stored.blockedDecors || [],
    };
}

/**
 * Save configuration to storage
 */
export function saveConfig(config: DecorLockerConfig): void {
    storageSet(KEYS.FEATURE.DECOR_LOCKER, config);
}

/**
 * Block a decor type from pickup
 */
export function blockDecor(decorId: string): void {
    const config = loadConfig();
    if (!config.blockedDecors.includes(decorId)) {
        config.blockedDecors.push(decorId);
        saveConfig(config);
        window.dispatchEvent(new CustomEvent(EVENTS.DECOR_LOCKER_LOCKS_UPDATED));
    }
}

/**
 * Unblock a decor type
 */
export function unblockDecor(decorId: string): void {
    const config = loadConfig();
    config.blockedDecors = config.blockedDecors.filter((id) => id !== decorId);
    saveConfig(config);
    window.dispatchEvent(new CustomEvent(EVENTS.DECOR_LOCKER_LOCKS_UPDATED));
}
