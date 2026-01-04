/**
 * BulkFavorite QOL Injection - Public API
 * 
 * Per ui/ui.inject.md: exports init(), destroy(), isEnabled()
 */

import { startWatching, stopWatching, renderButton, removeButton, setEnabled } from './inject';
import { isEnabled as checkEnabled } from '../../../../features/bulkFavorite/state';

let initialized = false;

/**
 * BulkFavorite Injection API
 * Per ui/ui.inject.md: each injection feature must export this interface
 */
export const BulkFavoriteInject = {
    /**
     * Initialize and inject into game UI
     * Idempotent: safe to call multiple times
     */
    init(): void {
        if (initialized) return;
        startWatching();
        initialized = true;
    },

    /**
     * Remove all injected elements
     */
    destroy(): void {
        if (!initialized) return;
        stopWatching();
        initialized = false;
    },

    /**
     * Check if feature is active
     */
    isEnabled(): boolean {
        return checkEnabled();
    },

    // Expose internal functions for advanced usage
    renderButton,
    removeButton,
    startWatching,
    stopWatching,
    setEnabled,
};

export { startWatching, stopWatching, renderButton, removeButton, setEnabled };
