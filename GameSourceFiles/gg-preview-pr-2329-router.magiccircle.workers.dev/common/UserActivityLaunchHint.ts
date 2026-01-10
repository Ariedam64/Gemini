export enum UserActivityLaunchHint {
  PlayFromStreakReminder = 'PlayFromStreakReminder',
  MuteDailyStreakReminder = 'MuteDailyStreakReminder',
  MiniAvocadoWrite = 'MiniAvocadoWrite',
  MiniAvocadoVote = 'MiniAvocadoVote',
  MiniAvocadoResults = 'MiniAvocadoResults',
  Avocado = 'Avocado',
  Durian = 'Durian',
  Trio = 'Trio',
  Nectarine = 'Nectarine',
  // NotificationSettings = 'NotificationSettings',
}

/**
 * Checks if a value is a valid UserActivityLaunchHint
 * @param value The value to check
 * @returns True if the value is a valid UserActivityLaunchHint, false otherwise
 */
export function isValidActivityLaunchHint(
  value: unknown
): value is UserActivityLaunchHint {
  return (
    typeof value === 'string' &&
    Object.values(UserActivityLaunchHint).includes(
      value as UserActivityLaunchHint
    )
  );
}
