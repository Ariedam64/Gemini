/**
 * StorageValueIndicator Inject - Public API
 *
 * Per ui/ui.inject.md: exports init(), destroy(), isEnabled()
 */

import { init, destroy, isEnabled } from './inject';

export const StorageValueIndicatorInject = {
  init,
  destroy,
  isEnabled,
};
