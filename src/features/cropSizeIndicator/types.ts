/**
 * Crop Size Indicator - Types & Configuration
 * Shows size percentage for crops in the game
 */

import { FEATURE_KEYS } from '../../utils/storage';

export interface CropSizeIndicatorConfig {
  enabled: boolean;
}

export const STORAGE_KEY = FEATURE_KEYS.CROP_SIZE_INDICATOR;

export const DEFAULT_CONFIG: CropSizeIndicatorConfig = {
  enabled: false,
};
