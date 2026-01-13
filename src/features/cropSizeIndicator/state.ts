/**
 * Crop Size Indicator - State Management
 * Handles configuration loading and persistence
 */

import { storageGet, storageSet } from '../../utils/storage';
import { DEFAULT_CONFIG, STORAGE_KEY } from './types';
import type { CropSizeIndicatorConfig } from './types';

/**
 * Load configuration from storage
 */
export function loadConfig(): CropSizeIndicatorConfig {
  return storageGet<CropSizeIndicatorConfig>(STORAGE_KEY, DEFAULT_CONFIG);
}

/**
 * Save configuration to storage
 */
export function saveConfig(config: CropSizeIndicatorConfig): void {
  storageSet(STORAGE_KEY, config);
}
