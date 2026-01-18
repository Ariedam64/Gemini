/**
 * Trackers Section State
 *
 * Persistent state for the Trackers section (mode, expanded teams).
 * Uses createSectionStore for GM_* persistence.
 *
 * Per .claude/rules/ui/sections.md:
 * - All fields must be JSON-serializable
 * - Section ID must be stable ('tab-trackers')
 * - Version increment when state shape changes
 *
 * NOTE: Uses async initialization pattern since createSectionStore returns Promise.
 */

import { createSectionStore, type SectionStateController } from '../core/State';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface TrackersState {
    /** Display mode: 'simple' shows summary only, 'detailed' shows full panels */
    mode: 'simple' | 'detailed';

    /** Team IDs currently expanded to show tracker panels */
    expandedTeamIds: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Default State
// ─────────────────────────────────────────────────────────────────────────────

const DEFAULT_STATE: TrackersState = {
    mode: 'simple',
    expandedTeamIds: [],
};

// ─────────────────────────────────────────────────────────────────────────────
// State Store (Singleton with async init)
// ─────────────────────────────────────────────────────────────────────────────

let stateController: SectionStateController<TrackersState> | null = null;
let initPromise: Promise<SectionStateController<TrackersState>> | null = null;

/**
 * Initialize the Trackers state store.
 * Must be called before using getTrackersState() or other helpers.
 */
export async function initTrackersState(): Promise<SectionStateController<TrackersState>> {
    if (stateController) return stateController;

    if (!initPromise) {
        initPromise = createSectionStore<TrackersState>('tab-trackers', {
            version: 2, // New schema - replaces old selectedTeamIds approach
            defaults: DEFAULT_STATE,
        });
    }

    stateController = await initPromise;
    return stateController;
}

/**
 * Get the Trackers state controller.
 * Throws if initTrackersState() hasn't been called.
 */
export function getTrackersState(): SectionStateController<TrackersState> {
    if (!stateController) {
        throw new Error('[TrackersState] State not initialized. Call initTrackersState() first.');
    }
    return stateController;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

export function isTeamExpanded(teamId: string): boolean {
    if (!stateController) return false;
    return stateController.get().expandedTeamIds.includes(teamId);
}

export function toggleTeamExpanded(teamId: string): void {
    if (!stateController) return;

    const current = stateController.get();
    const isExpanded = current.expandedTeamIds.includes(teamId);

    if (isExpanded) {
        stateController.update({
            expandedTeamIds: current.expandedTeamIds.filter((id: string) => id !== teamId),
        });
    } else {
        stateController.update({
            expandedTeamIds: [...current.expandedTeamIds, teamId],
        });
    }
}

export function setTrackerMode(mode: 'simple' | 'detailed'): void {
    if (!stateController) return;
    stateController.update({ mode });
}
