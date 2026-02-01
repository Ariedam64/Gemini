/**
 * AbilitiesInject - Public API
 *
 * Injects pet abilities tracking into the game's journal modal.
 * Matches the simple pattern from cropSizeIndicator.
 *
 * Per ui/ui.inject.md: exports init(), destroy(), isEnabled()
 */

import { init, destroy, isEnabled } from './inject';

/**
 * AbilitiesInject Public API
 * Per ui/ui.inject.md: each injection feature must export this interface
 */
export const AbilitiesInject = {
  /**
   * Initialize and start watching for pet species pages
   * Idempotent: safe to call multiple times
   */
  init,

  /**
   * Remove all injected elements and cleanup
   * Stops observer and removes any injected content
   */
  destroy,

  /**
   * Check if injection is active
   */
  isEnabled,
};

// Export types for advanced usage
export type { AbilityProgress } from './data';
