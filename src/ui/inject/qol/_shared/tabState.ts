/**
 * Cross-feature tab state coordination for journal injections
 *
 * Manages custom tab activation (All/Guide) and coordinates with native tabs (Crops/Pets).
 * Ensures mutual exclusion between custom tabs and proper native tab retraction.
 */

import { deactivateNativeTabs, reactivateNativeTabs } from './dom';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type CustomTab = 'all' | 'guide' | null;

type TabChangeListener = (tab: CustomTab) => void;

// ─────────────────────────────────────────────────────────────────────────────
// State
// ─────────────────────────────────────────────────────────────────────────────

let activeCustomTab: CustomTab = null;
const listeners = new Set<TabChangeListener>();

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get the currently active custom tab.
 * @returns 'all', 'guide', or null (when native tab is active)
 */
export function getActiveCustomTab(): CustomTab {
    return activeCustomTab;
}

/**
 * Set the active custom tab.
 * Handles native tab retraction/reactivation and notifies all listeners.
 *
 * @param tab - 'all', 'guide', or null (to deactivate custom tabs)
 */
export function setActiveCustomTab(tab: CustomTab): void {
    if (tab === activeCustomTab) return;

    activeCustomTab = tab;

    // Retract native tabs when custom tab activates
    if (tab !== null) {
        deactivateNativeTabs();
    } else {
        // Reactivate native tabs when custom tab deactivates
        reactivateNativeTabs();
    }

    // Notify all listeners
    for (const fn of listeners) {
        try {
            fn(tab);
        } catch (err) {
            console.warn('[TabState] Listener error:', err);
        }
    }
}

/**
 * Subscribe to tab state changes.
 * Returns an unsubscribe function compatible with CleanupTracker.add().
 *
 * @param fn - Callback receiving the new tab state
 * @returns Unsubscribe function
 */
export function onCustomTabChange(fn: TabChangeListener): () => void {
    listeners.add(fn);
    return () => listeners.delete(fn);
}

/**
 * Check if any custom tab is currently active.
 * @returns true if All or Guide tab is active
 */
export function isCustomTabActive(): boolean {
    return activeCustomTab !== null;
}

/**
 * Reset tab state (call on journal close or feature destroy).
 * Clears active tab and removes all listeners.
 */
export function resetTabState(): void {
    activeCustomTab = null;
    listeners.clear();
}
