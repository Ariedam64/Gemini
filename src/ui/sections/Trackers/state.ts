/**
 * Trackers Section State
 *
 * Per .claude/rules/ui/sections.md:
 * - All fields must be JSON-serializable
 * - Section ID must be stable (used as storage key)
 * - Increment version when state shape changes
 *
 * @module state
 */

import { createSectionStore, type SectionStateController } from '../core/State';

/**
 * Deep equality check for state objects (PERFORMANCE FIX)
 * Prevents unnecessary subscriber notifications when state hasn't actually changed
 */
function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== 'object' || typeof b !== 'object') return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key)) return false;

    const valA = a[key];
    const valB = b[key];

    // Handle arrays
    if (Array.isArray(valA) && Array.isArray(valB)) {
      if (valA.length !== valB.length) return false;
      for (let i = 0; i < valA.length; i++) {
        if (valA[i] !== valB[i]) return false;
      }
      continue;
    }

    // Handle nested objects
    if (typeof valA === 'object' && typeof valB === 'object') {
      if (!deepEqual(valA, valB)) return false;
      continue;
    }

    // Handle primitives
    if (valA !== valB) return false;
  }

  return true;
}

export interface TrackersState {
  /**
   * Selected team IDs (max 2 for comparison)
   * Empty array = no teams selected
   */
  selectedTeamIds: string[];

  /**
   * Last active tracker view per team (for persistence)
   * Maps teamId to trackerId (e.g., 'team-123' -> 'xp')
   */
  lastTrackerView: Record<string, string>;

  /**
   * Expanded state (future: collapsible sections)
   */
  expanded: boolean;

  /**
   * Comparison details expanded state (accordion)
   */
  comparisonDetailsExpanded: boolean;
}

const DEFAULT_STATE: TrackersState = {
  selectedTeamIds: [],
  lastTrackerView: {},
  expanded: true,
  comparisonDetailsExpanded: false,
};

export type TrackersStateController = SectionStateController<TrackersState> & {
  subscribe(callback: (state: TrackersState) => void): () => void;
};

let stateController: TrackersStateController | null = null;
const subscribers: Set<(state: TrackersState) => void> = new Set();

/**
 * Initialize Trackers state
 * Must be called before using state
 */
export async function initTrackersState(): Promise<TrackersStateController> {
  if (stateController) return stateController;

  const base = await createSectionStore<TrackersState>('tab-trackers', {
    version: 2,
    defaults: DEFAULT_STATE,
  });

  function notify() {
    const currentState = base.get();
    for (const callback of subscribers) {
      callback(currentState);
    }
  }

  function subscribe(callback: (state: TrackersState) => void): () => void {
    subscribers.add(callback);
    return () => {
      subscribers.delete(callback);
    };
  }

  function set(next: TrackersState): void {
    const prev = base.get();
    // PERFORMANCE: Only notify if state actually changed
    if (!deepEqual(prev, next)) {
      base.set(next);
      notify();
    }
  }

  function update(patch: Partial<TrackersState> | ((draft: TrackersState) => void)): void {
    const prev = base.get();
    base.update(patch);
    const next = base.get();
    // PERFORMANCE: Only notify if state actually changed
    if (!deepEqual(prev, next)) {
      notify();
    }
  }

  stateController = {
    get: base.get,
    set,
    update,
    save: base.save,
    subscribe,
  };

  return stateController;
}

/**
 * Get initialized state controller
 * Throws if not initialized
 */
export function getTrackersState(): TrackersStateController {
  if (!stateController) {
    throw new Error('[TrackersState] Not initialized. Call initTrackersState() first.');
  }
  return stateController;
}
