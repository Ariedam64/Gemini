// src/modules/data/index.ts
// MGData - Game data module (fetched from MG API)

import { fetchGameData } from "./logic/fetch";
import { resolveSprites } from "./logic/sprites";
import { getData, getAllData, hasData, waitForData, waitForAnyData } from "./logic/accessors";
import { state } from "./state";

export type { DataKey, DataBag, AbilityColor } from "./types";
export type { ActivityLogEntry, PetAbilityAction } from "./logic/abilityFormatter";
export { formatAbilityLog, filterPetAbilityLogs, isPetAbilityAction, PET_ABILITY_ACTIONS } from "./logic/abilityFormatter";

/**
 * MGData module - Game data from MG API
 *
 * Fetches all game data (plants, pets, items, mutations, etc.) from the external API.
 *
 * @example
 * ```typescript
 * await MGData.init();
 *
 * const plants = MGData.get('plants');
 * const mutations = MGData.get('mutations');
 *
 * if (MGData.isReady()) {
 *   console.log('All data loaded');
 * }
 * ```
 */
export const MGData = {
  /**
   * Initialize module (fetch data from API)
   * Safe to call multiple times
   */
  async init(): Promise<void> {
    await fetchGameData();
  },

  /**
   * Check if data has been loaded
   */
  isReady(): boolean {
    return state.ready;
  },

  /**
   * Get data for a specific key
   */
  get: getData,

  /**
   * Get all data
   */
  getAll: getAllData,

  /**
   * Check if data exists for a specific key
   */
  has: hasData,

  /**
   * Wait for specific data to be available
   */
  waitFor: waitForData,

  /**
   * Wait for any data to be available
   */
  waitForAny: waitForAnyData,

  /**
   * Resolve sprite IDs for all data
   * (Call after MGSprite is initialized)
   */
  resolveSprites,

  /**
   * Cleanup (no-op, kept for API compatibility)
   */
  cleanup(): void {
    // Nothing to clean up - data is fetched once
  },
};
