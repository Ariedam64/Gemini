// src/modules/assets/index.ts
// MGAssets - Generates base URLs for game assets

import { initializeBaseUrl, getBaseUrl, getAssetUrl, isModuleReady } from "./logic/urls";

export type { AssetsInitOptions } from "./types";

/**
 * MGAssets module - Asset URL generation
 *
 * Provides base URL and helpers for accessing game assets.
 * Pattern: https://magicgarden.gg/version/<hash>/assets/
 *
 * @example
 * ```typescript
 * // Get base URL (auto-initializes)
 * const baseUrl = await MGAssets.base();
 *
 * // Get full asset URL
 * const spriteUrl = await MGAssets.url('sprites/plant.json');
 *
 * // Manual initialization
 * await MGAssets.init();
 *
 * // Check if ready
 * if (MGAssets.isReady()) {
 *   const baseUrl = await MGAssets.base();
 * }
 * ```
 */
export const MGAssets = {
  /**
   * Initialize base URL from game version
   * Safe to call multiple times (uses cache)
   */
  init: initializeBaseUrl,

  /**
   * Check if module is ready
   */
  isReady: isModuleReady,

  /**
   * Get the base URL for assets
   * Auto-initializes if needed
   */
  base: getBaseUrl,

  /**
   * Get the full URL for a relative asset path
   *
   * @param relativePath - Relative path from assets base (e.g., 'sprites/plant.json')
   * @returns Full URL to the asset
   */
  url: getAssetUrl,
};
