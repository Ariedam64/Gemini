/**
 * Crop Value Indicator - Types & Configuration
 * Shows coin value for crops in the game
 */

import { FEATURE_KEYS } from '../../utils/storage';

export interface CropValueIndicatorConfig {
  enabled: boolean;
}

export const STORAGE_KEY = FEATURE_KEYS.CROP_VALUE_INDICATOR;

export const DEFAULT_CONFIG: CropValueIndicatorConfig = {
  enabled: false,
};
