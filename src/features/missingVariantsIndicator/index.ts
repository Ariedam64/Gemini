/**
 * Missing Variants Indicator Feature
 * Displays colored letters showing unlogged crop variants in tooltips
 */

import { render } from './render';
import { loadConfig, saveConfig } from './state';
import type { MissingVariantsIndicatorConfig } from './types';

let initialized = false;

/**
 * Initialize the missing variants indicator
 */
export function init(): void {
    if (initialized) return;

    const config = loadConfig();
    if (!config.enabled) {
        return;
    }

    initialized = true;
    render.init();
    console.log('✅ [MissingVariantsIndicator] Initialized');
}

/**
 * Cleanup and destroy the feature
 */
export function destroy(): void {
    if (!initialized) return;

    render.destroy();
    initialized = false;
    console.log('🛑 [MissingVariantsIndicator] Destroyed');
}

/**
 * Check if feature is initialized and ready
 */
export function isReady(): boolean {
    return initialized;
}

/**
 * Check if feature is enabled in config
 */
export function isEnabled(): boolean {
    const config = loadConfig();
    return config.enabled;
}

/**
 * Enable or disable the feature
 * @param enabled - true to enable, false to disable
 */
export function setEnabled(enabled: boolean): void {
    const config = loadConfig();

    if (config.enabled === enabled) return;

    config.enabled = enabled;
    saveConfig(config);

    if (enabled) {
        init();
    } else {
        destroy();
    }
}

/**
 * Public API
 */
export const MGMissingVariantsIndicator = {
    // Lifecycle
    init,
    destroy,

    // Status
    isReady,
    isEnabled,
    setEnabled,

    // QOL Rendering (DOM injection)
    render,
};

export type { MissingVariantsIndicatorConfig } from './types';
