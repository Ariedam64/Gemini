// src/modules/environment/index.ts
// MGEnvironment - Detects user environment (OS, browser, platform, surface)

import {
  initializeEnvironment,
  isModuleReady,
  detectEnvironment,
  detectOS,
  detectBrowser,
  checkIsDiscord,
  checkIsMobile,
} from "./logic/detection";
import { setPlatformOverride } from "./state";

export type { EnvironmentInfo, OS, Platform, Surface, Orientation } from "./types";

/**
 * MGEnvironment module - Environment detection
 *
 * Detects user environment information: OS, browser, platform (desktop/mobile),
 * surface (Discord/web), viewport sizes, and orientation.
 *
 * @example
 * ```typescript
 * // Initialize and detect environment
 * MGEnvironment.init();
 *
 * // Get complete environment info
 * const env = MGEnvironment.detect();
 * console.log(env.os, env.browser, env.platform);
 *
 * // Quick checks
 * if (MGEnvironment.isDiscord()) { ... }
 * if (MGEnvironment.isMobile()) { ... }
 *
 * // Override platform detection
 * MGEnvironment.setPlatformOverride('mobile');
 *
 * // Check if ready
 * if (MGEnvironment.isReady()) {
 *   const env = MGEnvironment.detect();
 * }
 * ```
 */
export const MGEnvironment = {
  /**
   * Initialize module by detecting environment
   * Safe to call multiple times (uses cache)
   */
  init: initializeEnvironment,

  /**
   * Check if module is ready
   */
  isReady: isModuleReady,

  /**
   * Detect complete environment information
   * Cached after first call
   *
   * @returns Environment info object
   */
  detect: detectEnvironment,

  /**
   * Check if running on Discord
   *
   * @returns True if running in Discord iframe
   */
  isDiscord: checkIsDiscord,

  /**
   * Check if running on mobile device
   *
   * @returns True if mobile platform
   */
  isMobile: checkIsMobile,

  /**
   * Detect operating system
   *
   * @returns OS identifier
   */
  detectOS,

  /**
   * Detect browser
   *
   * @returns Browser name
   */
  detectBrowser,

  /**
   * Override platform detection (desktop or mobile)
   * Useful for testing or forcing specific behavior
   *
   * @param platform - Platform override or null to reset
   */
  setPlatformOverride,
};
