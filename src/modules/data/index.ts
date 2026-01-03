// src/modules/data/index.ts
// MGData - Game data capture module

import { installObjectHooks, restoreObjectHooks } from "./logic/hooks";
import { startPulseScanning, stopPulseScanning } from "./logic/scanning";
import { startWeatherPolling, stopWeatherPolling } from "./logic/weather";
import { resolveSprites } from "./logic/sprites";
import { getData, getAllData, hasData, waitForData, waitForAnyData } from "./logic/accessors";
import { isAllDataCaptured } from "./logic/capture";

export type { CapturedDataKey, DataKey, DataBag } from "./types";

/**
 * MGData module - Game data capture via Object.* hooks
 *
 * Captures game data (plants, pets, items, mutations, etc.) by hooking Object.keys/values/entries.
 * Starts pulse scanning on init to capture data even if it loads minutes after mod init.
 * Automatically restores hooks when all data is captured.
 *
 * @example
 * ```typescript
 * // Initialize (installs hooks and starts scanning)
 * await MGData.init();
 *
 * // Get specific data
 * const plants = MGData.get('plants');
 * const mutations = MGData.get('mutations');
 *
 * // Get all captured data
 * const allData = MGData.getAll();
 *
 * // Check if data exists
 * if (MGData.has('plants')) {
 *   console.log('Plants data captured');
 * }
 *
 * // Wait for specific data
 * await MGData.waitFor('plants');
 *
 * // Check if ready (all data captured)
 * if (MGData.isReady()) {
 *   console.log('All data captured');
 * }
 *
 * // Cleanup (restores hooks and stops scanning)
 * MGData.cleanup();
 * ```
 */
export const MGData = {
  /**
   * Initialize module (install hooks, start scanning and weather polling)
   * Safe to call multiple times
   */
  async init(): Promise<void> {
    installObjectHooks();
    startPulseScanning();
    startWeatherPolling();
  },

  /**
   * Check if all data has been captured
   */
  isReady: isAllDataCaptured,

  /**
   * Get captured data for a specific key
   */
  get: getData,

  /**
   * Get all captured data
   */
  getAll: getAllData,

  /**
   * Check if data exists for a specific key
   */
  has: hasData,

  /**
   * Wait for specific data to be captured
   */
  waitFor: waitForData,

  /**
   * Wait for any data to be captured
   */
  waitForAny: waitForAnyData,

  /**
   * Resolve sprite IDs for all captured data
   * (Call after MGSprite is initialized)
   */
  resolveSprites,

  /**
   * Cleanup (restore hooks and stop scanning)
   */
  cleanup(): void {
    restoreObjectHooks();
    stopPulseScanning();
    stopWeatherPolling();
  },
};
