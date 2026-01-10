/**
 * Represents the possible states of a user's daily streak.
 */
export type StreakState = {
  status: 'active' | 'incomplete' | 'warning' | 'inactive';
  streakCount: number;
  /** Whether the streak is a reward day. */
  isRewardDay: boolean;
};

/**
 * The frequency of streak rewards in days.
 */
export const StreakRewardFrequency = 7;

/**
 * The maximum streak day that qualifies for a reward.
 */
export const MaxStreakRewardDay = 98;

export function getIsRewardDay(streakCount: number): boolean {
  return (
    streakCount > 0 &&
    streakCount % StreakRewardFrequency === 0 &&
    streakCount <= MaxStreakRewardDay
  );
}
