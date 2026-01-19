/**
 * Weather Notifier - Type definitions
 */

import { FEATURE_KEYS } from "../../utils/storage";

/**
 * Weather notifier configuration
 */
export interface WeatherNotifierConfig {
  enabled: boolean;
  trackedWeathers: string[]; // List of weather IDs to track
}

/**
 * Storage key for weather notifier config
 */
export const STORAGE_KEY = FEATURE_KEYS.WEATHER_NOTIFIER;

/**
 * Default configuration
 */
export const DEFAULT_CONFIG: WeatherNotifierConfig = {
  enabled: false,
  trackedWeathers: [],
};
