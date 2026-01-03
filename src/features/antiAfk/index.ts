/**
 * Anti-AFK Feature - Public API
 *
 * Prevents AFK detection by the game through multiple mechanisms.
 * Can be toggled on/off at runtime.
 *
 * @module MGAntiAfk
 */

import { storageGet, storageSet } from '../../utils/storage';
import { AntiAfkConfig, DEFAULT_CONFIG, STORAGE_KEY } from './types';
import { start as startAntiAfk, stop as stopAntiAfk } from './logic/antiAfk';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export * from './types';

// ─────────────────────────────────────────────────────────────────────────────
// State
// ─────────────────────────────────────────────────────────────────────────────

let initialized = false;
let running = false;

// ─────────────────────────────────────────────────────────────────────────────
// Configuration
// ─────────────────────────────────────────────────────────────────────────────

function loadConfig(): AntiAfkConfig {
    return storageGet(STORAGE_KEY, DEFAULT_CONFIG);
}

function saveConfig(config: AntiAfkConfig): void {
    storageSet(STORAGE_KEY, config);
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

export const MGAntiAfk = {
    /**
     * Initialize the Anti-AFK feature
     * Starts if enabled in config
     * Idempotent: safe to call multiple times
     */
    init(): void {
        if (initialized) return;

        const config = loadConfig();
        initialized = true;

        if (config.enabled) {
            startAntiAfk();
            running = true;
            console.log('[MGAntiAfk] Initialized and started');
        } else {
            console.log('[MGAntiAfk] Initialized but disabled');
        }
    },

    /**
     * Check if feature is initialized
     */
    isReady(): boolean {
        return initialized;
    },

    /**
     * Check if anti-AFK is currently running
     */
    isRunning(): boolean {
        return running;
    },

    /**
     * Check if anti-AFK is enabled in config
     */
    isEnabled(): boolean {
        const config = loadConfig();
        return config.enabled;
    },

    /**
     * Enable anti-AFK
     * Starts immediately if not already running
     */
    enable(): void {
        const config = loadConfig();
        config.enabled = true;
        saveConfig(config);

        if (!running) {
            startAntiAfk();
            running = true;
            console.log('[MGAntiAfk] Enabled');
        }
    },

    /**
     * Disable anti-AFK
     * Stops immediately if running
     */
    disable(): void {
        const config = loadConfig();
        config.enabled = false;
        saveConfig(config);

        if (running) {
            stopAntiAfk();
            running = false;
            console.log('[MGAntiAfk] Disabled');
        }
    },

    /**
     * Toggle anti-AFK on/off
     */
    toggle(): void {
        if (MGAntiAfk.isEnabled()) {
            MGAntiAfk.disable();
        } else {
            MGAntiAfk.enable();
        }
    },

    /**
     * Get current configuration
     */
    getConfig(): AntiAfkConfig {
        return loadConfig();
    },

    /**
     * Update configuration
     */
    updateConfig(config: Partial<AntiAfkConfig>): void {
        const current = loadConfig();
        const updated = { ...current, ...config };
        saveConfig(updated);

        if (updated.enabled && !running) {
            startAntiAfk();
            running = true;
        } else if (!updated.enabled && running) {
            stopAntiAfk();
            running = false;
        }
    },

    /**
     * Cleanup feature resources
     */
    destroy(): void {
        if (running) {
            stopAntiAfk();
            running = false;
        }
        initialized = false;
        console.log('[MGAntiAfk] Destroyed');
    },
} as const;
