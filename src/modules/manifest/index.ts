// src/modules/manifest/index.ts
// MGManifest - Loads and parses the game manifest.json

import { initializeManifest, isModuleReady, loadManifest, getBundleByName, extractJsonFiles } from "./logic/loading";

export type { Manifest, ManifestAsset, ManifestBundle, ManifestLoadOptions } from "./types";

/**
 * MGManifest module - Manifest loading and parsing
 *
 * Loads and caches the game's manifest.json file which contains
 * asset bundle information (sprites, audio, data files, etc.).
 *
 * @example
 * ```typescript
 * // Load manifest (auto-initializes)
 * const manifest = await MGManifest.load();
 *
 * // Get a specific bundle
 * const bundle = MGManifest.getBundle(manifest, 'sprites');
 *
 * // List all JSON files from bundle
 * const jsonFiles = MGManifest.listJsonFromBundle(bundle);
 *
 * // Manual initialization
 * await MGManifest.init();
 *
 * // Check if ready
 * if (MGManifest.isReady()) {
 *   const manifest = await MGManifest.load();
 * }
 * ```
 */
export const MGManifest = {
  /**
   * Initialize module by loading default manifest
   * Safe to call multiple times (uses cache)
   */
  init: initializeManifest,

  /**
   * Check if module is ready
   */
  isReady: isModuleReady,

  /**
   * Load manifest.json from base URL
   * Auto-caches by base URL
   *
   * @param options - Load options (optional base URL)
   * @returns Parsed manifest object
   */
  load: loadManifest,

  /**
   * Get a specific bundle from manifest by name
   *
   * @param manifest - The manifest object
   * @param bundleName - Name of the bundle to find
   * @returns Bundle object or null if not found
   */
  getBundle: getBundleByName,

  /**
   * List all JSON files from a bundle (excluding manifest.json)
   *
   * @param bundle - The bundle to extract JSON files from
   * @returns Array of JSON file paths
   */
  listJsonFromBundle: extractJsonFiles,
};
