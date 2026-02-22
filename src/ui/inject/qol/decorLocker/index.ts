/**
 * DecorLocker Decor Card Injection — Public API
 *
 * Per ui/ui.inject.md: each injection feature exports init(), destroy(), isEnabled()
 */

import { startWatching, stopWatching } from './inject';
import { loadConfig } from '../../../../features/decorLocker/state';

let initialized = false;

export const DecorLockerInject = {
    /**
     * Initialize and inject into game UI.
     * Idempotent: safe to call multiple times.
     */
    init(): void {
        if (initialized) return;
        startWatching();
        initialized = true;
    },

    /**
     * Remove all injected elements and stop watching.
     */
    destroy(): void {
        if (!initialized) return;
        stopWatching();
        initialized = false;
    },

    /**
     * Check if the parent feature (DecorLocker) is enabled.
     */
    isEnabled(): boolean {
        const config = loadConfig();
        return config.enabled;
    },
};
