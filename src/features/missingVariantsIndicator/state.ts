/**
 * Missing Variants Indicator - State Management
 */

import { storageGet, storageSet } from '../../utils/storage';
import { STORAGE_KEY, DEFAULT_CONFIG, type MissingVariantsIndicatorConfig } from './types';

export function loadConfig(): MissingVariantsIndicatorConfig {
    return storageGet(STORAGE_KEY, DEFAULT_CONFIG);
}

export function saveConfig(config: MissingVariantsIndicatorConfig): void {
    storageSet(STORAGE_KEY, config);
}
