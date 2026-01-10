/**
 * Growth Timers State Management
 *
 * Manages feature configuration and runtime cache.
 * Uses storage wrapper for persistence.
 *
 * Per .claude/rules/features.md:
 * - Use FEATURE_KEYS for storage (not MODULE_KEYS)
 * - Storage keys use feature: prefix automatically
 * - Config must be JSON-serializable
 *
 * @module state
 */

import { storageGet, storageSet } from '../../utils/storage';
import type { GrowthTimersConfig, GrowthTimer } from './types';
import { DEFAULT_CONFIG } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// Storage Keys
// ─────────────────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'feature:growthTimers:config';

// ─────────────────────────────────────────────────────────────────────────────
// Runtime Cache
// ─────────────────────────────────────────────────────────────────────────────

let cachedConfig: GrowthTimersConfig | null = null;
let eggTimersCache: Map<string, GrowthTimer[]> = new Map();
let plantTimersCache: Map<string, GrowthTimer[]> = new Map();
let lastUpdate = 0;

// ─────────────────────────────────────────────────────────────────────────────
// Configuration Management
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Load configuration from storage
 */
export function loadConfig(): GrowthTimersConfig {
    if (cachedConfig) {
        return cachedConfig;
    }

    const stored = storageGet<GrowthTimersConfig>(STORAGE_KEY, DEFAULT_CONFIG);
    cachedConfig = stored;
    return cachedConfig;
}

/**
 * Save configuration to storage
 */
export function saveConfig(config: GrowthTimersConfig): void {
    cachedConfig = config;
    storageSet(STORAGE_KEY, config);
}

/**
 * Update configuration (partial update)
 */
export function updateConfig(updates: Partial<GrowthTimersConfig>): void {
    const config = loadConfig();
    const updated = { ...config, ...updates };
    saveConfig(updated);
}

// ─────────────────────────────────────────────────────────────────────────────
// Cache Management
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get cached egg timers for a team
 */
export function getCachedEggTimers(teamId: string): GrowthTimer[] | null {
    return eggTimersCache.get(teamId) ?? null;
}

/**
 * Set cached egg timers for a team
 */
export function setCachedEggTimers(teamId: string, timers: GrowthTimer[]): void {
    eggTimersCache.set(teamId, timers);
    lastUpdate = Date.now();
}

/**
 * Get cached plant timers for a team
 */
export function getCachedPlantTimers(teamId: string): GrowthTimer[] | null {
    return plantTimersCache.get(teamId) ?? null;
}

/**
 * Set cached plant timers for a team
 */
export function setCachedPlantTimers(teamId: string, timers: GrowthTimer[]): void {
    plantTimersCache.set(teamId, timers);
    lastUpdate = Date.now();
}

/**
 * Clear all caches
 */
export function clearCache(): void {
    eggTimersCache.clear();
    plantTimersCache.clear();
    lastUpdate = 0;
}

/**
 * Get timestamp of last cache update
 */
export function getLastUpdate(): number {
    return lastUpdate;
}
