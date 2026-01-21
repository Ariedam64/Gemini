// src/modules/shopActions/index.ts
// MGShopActions - Shop purchase actions module

import { buySeed, buyAllSeeds } from "./logic/seed";
import { buyEgg, buyAllEggs } from "./logic/egg";
import { buyDecor, buyAllDecors } from "./logic/decor";
import { buyTool, buyAllTools } from "./logic/tool";

export type { PurchaseResult, BulkPurchaseResult, ShopType } from "./types";

let initialized = false;

/**
 * MGShopActions module - Shop purchase actions
 *
 * Provides utilities for purchasing items from various shops.
 *
 * @example
 * ```typescript
 * // Initialize
 * MGShopActions.init();
 *
 * // Buy a single seed
 * const result = MGShopActions.seed.buy('Carrot');
 *
 * // Buy all available seeds
 * const bulkResult = MGShopActions.seed.buyAll('Carrot');
 *
 * // Buy eggs, decors, tools
 * MGShopActions.egg.buy('CommonEgg');
 * MGShopActions.egg.buyAll('CommonEgg');
 * MGShopActions.decor.buy('Fence');
 * MGShopActions.decor.buyAll('Fence');
 * MGShopActions.tool.buy('WateringCan');
 * MGShopActions.tool.buyAll('WateringCan');
 * ```
 */
export const MGShopActions = {
  /**
   * Initialize module
   * Safe to call multiple times
   */
  init(): void {
    if (initialized) return;
    initialized = true;
    console.log("[MGShopActions] Initialized");
  },

  /**
   * Check if module is ready
   */
  isReady(): boolean {
    return initialized;
  },

  /**
   * Seed shop actions
   */
  seed: {
    /**
     * Buy a single seed by species
     */
    buy: buySeed,

    /**
     * Buy all available seeds of a species
     */
    buyAll: buyAllSeeds,
  },

  /**
   * Egg shop actions
   */
  egg: {
    /**
     * Buy a single egg by ID
     */
    buy: buyEgg,

    /**
     * Buy all available eggs of a specific ID
     */
    buyAll: buyAllEggs,
  },

  /**
   * Decor shop actions
   */
  decor: {
    /**
     * Buy a single decor by ID
     */
    buy: buyDecor,

    /**
     * Buy all available decors of a specific ID
     */
    buyAll: buyAllDecors,
  },

  /**
   * Tool shop actions
   */
  tool: {
    /**
     * Buy a single tool by ID
     */
    buy: buyTool,

    /**
     * Buy all available tools of a specific ID
     */
    buyAll: buyAllTools,
  },
};
