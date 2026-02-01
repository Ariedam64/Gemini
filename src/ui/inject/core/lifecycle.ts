/**
 * Cleanup tracking pattern (per ui/inject.md)
 *
 * Ensures all subscriptions, listeners, and observers are properly cleaned up.
 * Safe to call multiple times.
 */

import type { CleanupTracker } from './types';

/**
 * Create a cleanup tracker for managing subscriptions/listeners
 * Pattern from ui/inject.md
 */
export function createCleanupTracker(): CleanupTracker {
  const cleanups: (() => void)[] = [];

  return {
    add(fn: () => void): void {
      cleanups.push(fn);
    },

    run(): void {
      for (const fn of cleanups) {
        try {
          fn();
        } catch (err) {
          console.warn('[CleanupTracker] Error during cleanup:', err);
        }
      }
    },

    clear(): void {
      cleanups.length = 0;
    },
  };
}

/**
 * Helper: Add a listener and track cleanup
 */
export function addListenerWithCleanup(
  tracker: CleanupTracker,
  target: EventTarget,
  event: string,
  handler: EventListener
): void {
  target.addEventListener(event, handler);
  tracker.add(() => target.removeEventListener(event, handler));
}

/**
 * Helper: Add a timeout and track cleanup
 */
export function addTimeoutWithCleanup(
  tracker: CleanupTracker,
  fn: () => void,
  ms: number
): void {
  const id = setTimeout(fn, ms);
  tracker.add(() => clearTimeout(id));
}

/**
 * Helper: Add an interval and track cleanup
 */
export function addIntervalWithCleanup(
  tracker: CleanupTracker,
  fn: () => void,
  ms: number
): void {
  const id = setInterval(fn, ms);
  tracker.add(() => clearInterval(id));
}

/**
 * Helper: Add observer disconnect to tracker
 */
export function addObserverWithCleanup(
  tracker: CleanupTracker,
  observer: MutationObserver
): void {
  tracker.add(() => observer.disconnect());
}

// ─────────────────────────────────────────────────────────────────────────────
// Mutation Guard
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Shared flag to prevent cascading DOM mutations
 * When any inject feature is processing, other observers should skip
 */
let _mutationGuardActive = false;

/**
 * Check if mutation guard is currently active
 */
export function isMutationGuarded(): boolean {
  return _mutationGuardActive;
}

/**
 * Execute a function with mutation guard protection
 * Prevents other observers from triggering during DOM modifications
 */
export function withMutationGuard(fn: () => void): void {
  if (_mutationGuardActive) return;
  _mutationGuardActive = true;
  try {
    fn();
  } finally {
    _mutationGuardActive = false;
  }
}
