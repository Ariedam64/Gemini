/**
 * Tracker Registry
 *
 * Central registry of all available trackers.
 * Provides tracker discovery and relevance scoring.
 *
 * Per .claude/rules/core.md:
 * - No over-engineering (simple array, not complex adapter layer)
 * - Minimal abstraction
 * - Clear, explicit patterns
 *
 * @module registry
 */

import type { TrackerDefinition } from './types';
import type { TeamPurposeAnalysis } from '../../../../features/petTeam/logic/purpose';

// Import tracker definitions
import { xpTracker } from './xpTracker';
import { growthTracker } from './growthTracker';

/**
 * All registered tracker definitions
 *
 * To add a new tracker:
 * 1. Create tracker definition file (e.g., valueTracker.ts)
 * 2. Import it above
 * 3. Add to this array
 * 4. Done!
 */
export const TRACKERS: TrackerDefinition[] = [
  xpTracker,      // Priority: 10
  growthTracker,  // Priority: 9
  // valueTracker,   // Priority: 8 (future)
];

/**
 * Get the most relevant tracker for a team purpose
 *
 * Scores all trackers by relevance confidence and returns the best match.
 * Falls back to highest priority tracker if no good matches.
 *
 * @param purpose - Team purpose analysis from detectTeamPurpose()
 * @returns Best matching tracker definition
 *
 * @example
 * const team = MGPetTeam.getTeam('team-123');
 * const purpose = detectTeamPurpose(team);
 * const tracker = getRelevantTracker(purpose);
 * const cleanup = tracker.render(team, container);
 */
export function getRelevantTracker(
  purpose: TeamPurposeAnalysis
): TrackerDefinition {
  // Fallback to first tracker if registry is empty (during development)
  if (TRACKERS.length === 0) {
    throw new Error('[TrackersRegistry] No trackers registered');
  }

  // Score all trackers by relevance
  const scored = TRACKERS.map((tracker) => ({
    tracker,
    score: tracker.isRelevant(purpose),
  })).sort((a, b) => {
    // Sort by score first, then by priority
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return b.tracker.priority - a.tracker.priority;
  });

  // Return the best match
  return scored[0].tracker;
}

/**
 * Get tracker by ID
 *
 * @param id - Tracker ID (e.g., 'xp', 'growth')
 * @returns Tracker definition or undefined if not found
 */
export function getTrackerById(id: string): TrackerDefinition | undefined {
  return TRACKERS.find((tracker) => tracker.id === id);
}

/**
 * Get all registered tracker IDs
 *
 * @returns Array of tracker IDs
 */
export function getTrackerIds(): string[] {
  return TRACKERS.map((tracker) => tracker.id);
}
