/**
 * JournalChecker Section - Persistent State
 * 
 * Per ui/sections.md: sections MUST have state.ts using createSectionStore
 */

import { createSectionStore, SectionStateController } from '../core/State';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type TabId = 'all' | 'plants' | 'pets';
export type CategoryId = 'plants' | 'pets';

export interface JournalCheckerSectionState {
    /** Currently active tab */
    activeTab: TabId;
    /** Expanded category sections */
    expandedCategories: CategoryId[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Defaults
// ─────────────────────────────────────────────────────────────────────────────

const DEFAULTS: JournalCheckerSectionState = {
    activeTab: 'all',
    expandedCategories: [],
};

// ─────────────────────────────────────────────────────────────────────────────
// Store
// ─────────────────────────────────────────────────────────────────────────────

let storeInstance: SectionStateController<JournalCheckerSectionState> | null = null;

/**
 * Initialize the section state store
 * Must be called before using getState/setState
 */
export async function initSectionState(): Promise<SectionStateController<JournalCheckerSectionState>> {
    if (storeInstance) return storeInstance;

    storeInstance = await createSectionStore<JournalCheckerSectionState>('tab-journal-checker', {
        version: 1,
        defaults: DEFAULTS,
    });

    return storeInstance;
}

/**
 * Get the section state store
 * Throws if not initialized
 */
export function getStore(): SectionStateController<JournalCheckerSectionState> {
    if (!storeInstance) {
        throw new Error('[JournalChecker] Section state not initialized. Call initSectionState() first.');
    }
    return storeInstance;
}

/**
 * Check if store is initialized
 */
export function isStoreReady(): boolean {
    return storeInstance !== null;
}
