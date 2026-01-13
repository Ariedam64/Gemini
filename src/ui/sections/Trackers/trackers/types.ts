/**
 * Trackers Types
 *
 * Shared interfaces for tracker definitions and comparison data.
 *
 * Per .claude/rules/core.md:
 * - Explicit types (no `any`)
 * - Clear, self-documenting interfaces
 *
 * @module types
 */

import type { PetTeam } from '../../../../features/petTeam/types';
import type { TeamPurposeAnalysis } from '../../../../features/petTeam/logic/purpose';

/**
 * Tracker Definition
 *
 * Defines how a tracker integrates into the registry.
 * NOT an adapter - direct instantiation pattern.
 */
export interface TrackerDefinition {
  /** Unique tracker ID (e.g., 'xp', 'growth', 'value') */
  id: string;

  /** Display label (e.g., 'XP Tracker', 'Growth Tracker') */
  label: string;

  /** Display icon/emoji (e.g., '📊', '⏱️', '💰') */
  icon: string;

  /**
   * Display priority (higher = preferred when multiple trackers relevant)
   * Used for fallback selection when purpose confidence is equal
   */
  priority: number;

  /**
   * When is this tracker relevant?
   *
   * @param purpose - Team purpose analysis from detectTeamPurpose()
   * @returns Confidence score 0-1 (0 = not relevant, 1 = highly relevant)
   *
   * @example
   * isRelevant: (purpose) => {
   *   if (purpose.primary === 'xp-farming') return purpose.confidence;
   *   if (purpose.primary === 'balanced') return 0.8;
   *   return 0.5; // Always somewhat relevant
   * }
   */
  isRelevant: (purpose: TeamPurposeAnalysis) => number;

  /**
   * Render the tracker UI
   *
   * @param team - Pet team to display tracker for
   * @param container - DOM container to append tracker to
   * @returns Cleanup function (called when tracker is destroyed)
   *
   * @example
   * render: (team, container) => {
   *   const tracker = new XpTracker({ teamId: team.id });
   *   container.appendChild(tracker.build());
   *
   *   const unsub = Globals.abilityLogs.subscribe(() => tracker.refresh());
   *
   *   return () => {
   *     unsub();
   *     tracker.destroy();
   *   };
   * }
   */
  render: (team: PetTeam, container: HTMLElement) => () => void;

  /**
   * Get comparison data for overlay (optional)
   *
   * Calculates diffs between primary and comparison teams.
   * If omitted, comparison mode will not show diff indicators.
   */
  getComparisonData?: (
    primaryTeam: PetTeam,
    compareTeam: PetTeam
  ) => ComparisonData[];

  /**
   * Get pet-level comparison data for versus rows (optional)
   *
   * @returns Array of pet pairs, each containing metrics for both pets
   */
  getPetComparisonData?: (
    primaryTeam: PetTeam,
    compareTeam: PetTeam
  ) => PetPairComparison[];
}

/**
 * Pet Pair Comparison
 *
 * Represents a comparison between two pets in the same slot
 */
export interface PetPairComparison {
  primaryPet: {
    id: string;
    name: string;
    species: string;
    mutations: string[];
    abilities: string[];
    metrics: ComparisonDataPoint[];
  };
  comparisonPet: {
    id: string;
    name: string;
    species: string;
    mutations: string[];
    abilities: string[];
    metrics: ComparisonDataPoint[];
  };
}

/**
 * Comparison Data Point
 * Simplified metric for pet-level display
 */
export interface ComparisonDataPoint {
  label: string;
  value: number;
  format: 'number' | 'percentage' | 'time';
}

/**
 * Comparison Data
 *
 * Represents a single stat comparison between two teams.
 * Used by ComparisonOverlay to inject diff indicators.
 */
export interface ComparisonData {
  /** Value for primary team */
  primaryValue: number;

  /** Value for comparison team */
  comparisonValue: number;

  /** Human-readable label (e.g., 'Total XP/hr', 'Growth Speed') */
  label: string;

  /**
   * Format type for display
   * - 'number': Display as numeric value (e.g., 5400)
   * - 'percentage': Display as percentage (e.g., 75%)
   * - 'time': Display as time duration (e.g., 2h 30m)
   */
  format: 'number' | 'percentage' | 'time';
}

/**
 * Tracker Instance
 *
 * Common interface that all tracker part classes should implement.
 * Not strictly enforced, but recommended for consistency.
 */
export interface TrackerInstance {
  /** Root DOM element */
  root: HTMLElement;

  /** Build the tracker UI */
  build(): HTMLElement;

  /** Refresh/update the tracker display */
  refresh(): void;

  /** Cleanup and destroy the tracker */
  destroy(): void;
}
