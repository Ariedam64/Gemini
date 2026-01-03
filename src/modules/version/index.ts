// src/modules/version/index.ts
// MGVersion - Detects the game version from script tags

import { detectVersion, getVersion, isVersionReady, waitForVersion } from "./logic/detection";

export type { VersionInitOptions, VersionWaitOptions } from "./types";

/**
 * MGVersion module - Game version detection
 *
 * Scans script tags to find the game version hash.
 * Supports patterns: /version/<hash>/... or /r/12345/version/<hash>/...
 *
 * @example
 * ```typescript
 * // Get version (auto-detects if needed)
 * const version = MGVersion.get();
 *
 * // Wait for version to be available
 * const version = await MGVersion.wait();
 *
 * // Manual initialization
 * MGVersion.init();
 *
 * // Check if ready
 * if (MGVersion.isReady()) {
 *   console.log(MGVersion.get());
 * }
 * ```
 */
export const MGVersion = {
  /**
   * Scan script tags to detect game version
   * Safe to call multiple times (uses cache)
   */
  init: detectVersion,

  /**
   * Check if version has been detected
   */
  isReady: isVersionReady,

  /**
   * Get the current game version
   * Auto-detects if not already initialized
   */
  get: getVersion,

  /**
   * Wait for the game version to be available
   * Polls until version is found or timeout occurs
   *
   * @param options - Wait configuration
   * @throws Error if timeout is reached
   */
  wait: waitForVersion,
};
