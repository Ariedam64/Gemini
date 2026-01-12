/**
 * Crop Value Indicator - State Management
 * Handles configuration loading and persistence
 */

import { storageGet, storageSet } from '../../utils/storage';
import { DEFAULT_CONFIG, STORAGE_KEY } from './types';
import type { CropValueIndicatorConfig } from './types';

/**
 * Load configuration from storage
 */
export function loadConfig(): CropValueIndicatorConfig {
  return storageGet<CropValueIndicatorConfig>(STORAGE_KEY, DEFAULT_CONFIG);
}

/**
 * Save configuration to storage
 */
export function saveConfig(config: CropValueIndicatorConfig): void {
  storageSet(STORAGE_KEY, config);
}
