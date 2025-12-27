import { atom } from 'jotai';
import type { StreakState } from '@/common/streaks';
import { getNextUTCDate, getStartOfTodayUTC } from '@/common/utils';

// Atom that tracks the target time for the next streak update
// Used to determine when the streak widget should update its display
export const targetStreakTimeAtom = atom(getNextUTCDate(getStartOfTodayUTC()));

export const isStreakAnimationPlayingAtom = atom(false);

/**
 * Stores the initial streak state captured on first fetch.
 * This is used to detect if the streak became active during the session.
 * Once set, this value should NOT be updated - it represents the state
 * at the moment the app started.
 */
export const initialStreakStateAtom = atom<StreakState | null>(null);

/**
 * Set to true when the day rolls over and we should optimistically show
 * the streak animation. This avoids race conditions with server state.
 */
export const shouldTriggerStreakAnimationAtom = atom(false);
