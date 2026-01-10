/**
 * XP Tracker Feature - State Management
 *
 * Level 1: Only imports from types.ts and shared utilities
 * Per .claude/rules/features.md
 */

import { storageGet, storageSet } from '../../utils/storage';
import { STORAGE_KEY, DEFAULT_CONFIG } from './types';
import type { XpTrackerConfig, SortOption } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// Storage Operations
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Load XP tracker configuration from storage
 * @returns Current config or default if not found
 */
export function loadConfig(): XpTrackerConfig {
    return storageGet(STORAGE_KEY, DEFAULT_CONFIG);
}

/**
 * Save XP tracker configuration to storage
 * @param config - Configuration to save
 */
export function saveConfig(config: XpTrackerConfig): void {
    storageSet(STORAGE_KEY, config);
}

/**
 * Update XP tracker configuration with partial updates
 * @param updates - Partial configuration updates
 * @returns Updated configuration
 */
export function updateConfig(updates: Partial<XpTrackerConfig>): XpTrackerConfig {
    const current = loadConfig();
    const updated = { ...current, ...updates };
    saveConfig(updated);
    return updated;
}

/**
 * Check if XP tracker feature is enabled
 * @returns true if enabled, false otherwise
 */
export function isEnabled(): boolean {
    const config = loadConfig();
    return config.enabled;
}

/**
 * Set enabled state of XP tracker feature
 * @param enabled - New enabled state
 */
export function setEnabled(enabled: boolean): void {
    updateConfig({ enabled });
}

// ─────────────────────────────────────────────────────────────────────────────
// Config Convenience Methods
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Set sort option for all-pets list
 */
export function setSortBy(sortBy: SortOption): void {
    updateConfig({ sortBy });
}

/**
 * Set species filter
 */
export function setFilterSpecies(filterSpecies: string[]): void {
    updateConfig({ filterSpecies });
}

/**
 * Toggle XP Boost filter
 */
export function setFilterHasXpBoost(filterHasXpBoost: boolean): void {
    updateConfig({ filterHasXpBoost });
}

/**
 * Set pop-out state
 */
export function setIsPoppedOut(isPoppedOut: boolean): void {
    updateConfig({ isPoppedOut });
}

/**
 * Set pop-out position
 */
export function setPopOutPosition(position: { x: number; y: number } | null): void {
    updateConfig({ popOutPosition: position });
}

/**
 * Toggle collapsed section
 */
export function toggleSection(section: keyof XpTrackerConfig['collapsedSections']): void {
    const config = loadConfig();
    updateConfig({
        collapsedSections: {
            ...config.collapsedSections,
            [section]: !config.collapsedSections[section],
        },
    });
}
