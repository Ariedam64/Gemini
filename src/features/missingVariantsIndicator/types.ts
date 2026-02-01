/**
 * Missing Variants Indicator - Types & Configuration
 * Shows colored letters indicating unlogged crop variants in tooltips
 */

import { FEATURE_KEYS } from '../../utils/storage';

export interface MissingVariantsIndicatorConfig {
    enabled: boolean;
}

export const STORAGE_KEY = FEATURE_KEYS.MISSING_VARIANTS_INDICATOR;

export const DEFAULT_CONFIG: MissingVariantsIndicatorConfig = {
    enabled: false,
};
