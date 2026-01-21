/**
 * Weather Notifier - State Management
 */

import { storageGet, storageSet } from "../../utils/storage";
import { DEFAULT_CONFIG, STORAGE_KEY } from "./types";
import type { WeatherNotifierConfig } from "./types";

/**
 * Normalize tracked weathers array
 */
function normalizeTrackedWeathers(weathers?: string[] | null): string[] {
  return Array.isArray(weathers) ? [...weathers] : [];
}

/**
 * Clone tracked weathers array
 */
function cloneTrackedWeathers(weathers: string[]): string[] {
  return [...weathers];
}

/**
 * Load configuration from storage
 */
export function loadConfig(): WeatherNotifierConfig {
  const stored = storageGet<WeatherNotifierConfig>(STORAGE_KEY, DEFAULT_CONFIG);
  return {
    enabled: stored?.enabled ?? false,
    trackedWeathers: normalizeTrackedWeathers(stored?.trackedWeathers),
  };
}

/**
 * Save configuration to storage
 */
export function saveConfig(config: WeatherNotifierConfig): void {
  storageSet(STORAGE_KEY, {
    enabled: config.enabled,
    trackedWeathers: cloneTrackedWeathers(config.trackedWeathers),
  });
}

/**
 * Update configuration with partial changes
 */
export function updateConfig(updates: Partial<WeatherNotifierConfig>): WeatherNotifierConfig {
  const current = loadConfig();
  const updated: WeatherNotifierConfig = {
    ...current,
    ...updates,
  };

  if (updates.trackedWeathers) {
    updated.trackedWeathers = normalizeTrackedWeathers(updates.trackedWeathers);
  }

  saveConfig(updated);
  return updated;
}

/**
 * Check if feature is enabled
 */
export function isEnabled(): boolean {
  return loadConfig().enabled;
}

/**
 * Set enabled flag in storage
 */
export function setEnabled(enabled: boolean): void {
  updateConfig({ enabled });
}

/**
 * Get tracked weathers list
 */
export function getTrackedWeathers(): string[] {
  return cloneTrackedWeathers(loadConfig().trackedWeathers);
}

/**
 * Check if a weather is tracked
 */
export function isWeatherTracked(weatherId: string): boolean {
  const tracked = getTrackedWeathers();
  return tracked.includes(weatherId);
}

/**
 * Add a weather to the tracked list
 */
export function addTrackedWeather(weatherId: string): void {
  const config = loadConfig();
  const trackedWeathers = cloneTrackedWeathers(config.trackedWeathers);

  if (trackedWeathers.includes(weatherId)) return;

  trackedWeathers.push(weatherId);

  // Auto-enable feature when adding first tracked weather
  const shouldEnable = !config.enabled && trackedWeathers.length > 0;
  const updated = {
    ...config,
    trackedWeathers,
    enabled: shouldEnable ? true : config.enabled,
  };

  saveConfig(updated);

  // Emit change event
  const event = new CustomEvent("gemini:tracked-weathers-changed", {
    detail: { weatherId, action: "add", shouldReinit: shouldEnable },
  });
  window.dispatchEvent(event);

  // Emit event to check if this weather is currently active (for immediate notification)
  const checkEvent = new CustomEvent("gemini:weather-tracked-check", {
    detail: { weatherId },
  });
  window.dispatchEvent(checkEvent);
}

/**
 * Remove a weather from the tracked list
 */
export function removeTrackedWeather(weatherId: string): void {
  const config = loadConfig();
  const trackedWeathers = cloneTrackedWeathers(config.trackedWeathers);
  const next = trackedWeathers.filter((id) => id !== weatherId);

  if (next.length === trackedWeathers.length) return;

  // Auto-disable feature when removing last tracked weather
  const shouldDisable = config.enabled && next.length === 0;
  const updated = {
    ...config,
    trackedWeathers: next,
    enabled: shouldDisable ? false : config.enabled,
  };

  saveConfig(updated);

  // Emit change event
  const event = new CustomEvent("gemini:tracked-weathers-changed", {
    detail: { weatherId, action: "remove", shouldReinit: shouldDisable },
  });
  window.dispatchEvent(event);
}

/**
 * Reset tracked weathers list
 */
export function resetTrackedWeathers(): void {
  const config = loadConfig();
  saveConfig({ ...config, trackedWeathers: [] });
}
