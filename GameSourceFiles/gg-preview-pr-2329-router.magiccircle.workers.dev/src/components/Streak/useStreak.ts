import type { UserStreakResponse } from '@/common/types/user';
import { useAuthenticatedResource } from '@/user';

export const useStreak = () => {
  const { data, mutate } = useAuthenticatedResource<UserStreakResponse>({
    path: `/me/streak`,
  });
  return {
    streakState: data?.streakState,
    mutate,
  };
};
