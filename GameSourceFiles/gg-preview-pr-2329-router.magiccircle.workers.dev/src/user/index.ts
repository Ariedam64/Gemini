import { useAtom, useAtomValue } from 'jotai';
import { useMemo } from 'react';
import useSWR, { type SWRConfiguration } from 'swr';
import { type ChallengeType, challengeRewards } from '@/common/challenges';
import type {
  UserChallenge,
  UserCosmeticItem,
} from '@/common/prisma/generated/browser';
import { getIsRewardDay } from '@/common/streaks';
import type { CurrencyGrantType } from '@/common/types/currencies';
import { type GameName, gameNames } from '@/common/types/games';
import type {
  ClaimGrantResponse,
  ClaimPendingGrantsResponse,
  GetCreditsResponse,
  GetGameUserStatusesResponse,
  GetSpicyContentPreferenceResponse,
  GetUnclaimedGrantsResponse,
} from '@/common/types/me';
import type { DatabaseUser, UserStreakResponse } from '@/common/types/user';
import { useStreak } from '@/components/Streak/useStreak';
import { creditsBalanceAtom, useIsUserAuthenticated } from '@/store/store';
import { post, sendRequest } from '@/utils';

// SWR convention is to call the fetcher function `fetcher`
// See: https://swr.vercel.app/docs/data-fetching
const fetcher = sendRequest;

export function useAuthenticatedResource<JSON>(params: {
  path: string;
  json?: unknown;
  SWRConfiguration?: SWRConfiguration;
}) {
  const { path, json, SWRConfiguration = {} } = params;
  const isUserAuthenticated = useIsUserAuthenticated();
  // If the user is not authenticated, return null
  // This is a "conditional fetch", which is a way to tell SWR to only fetch
  // the resource if a certain condition is met.
  const pathWithAuth = isUserAuthenticated ? path : null;
  return useSWR<JSON, string>(
    pathWithAuth,

    json
      ? () => fetcher(path, json)
      : (path: string) => {
          if (path.startsWith('/api/')) {
            return fetcher(path, undefined, {
              headers: { 'X-No-Room-Scope': 'true' },
            });
          }
          return fetcher(path);
        },
    SWRConfiguration
  );
}

export const useUser = () => {
  const { data, error, isLoading, mutate } = useAuthenticatedResource<
    DatabaseUser | undefined
  >({ path: '/me' });
  return { user: data, error, isLoading, mutateUser: mutate };
};

export const useCurrencyBalance = () => {
  const { user } = useUser();
  return user?.currencyBalance ?? 0;
};

export const useCreditsBalance = () => {
  const { data, mutate } = useAuthenticatedResource<GetCreditsResponse>({
    path: '/me/credits',
  });

  return {
    availableCredits: data?.availableCredits ?? 0,
    mutateCreditsBalance: mutate,
  };
};

/**
 * Hook to get the credits balance from the atom
 * This is more performant than useCreditsBalance for components that just need to read the value
 */
export const useCreditsBalanceFromAtom = () => {
  return useAtomValue(creditsBalanceAtom);
};

/**
 * Hook to get both the credits balance and a setter function
 * Useful for optimistic updates
 */
export const useCreditsBalanceAtom = () => {
  return useAtom(creditsBalanceAtom);
};

export const useUnclaimedGrantsAmount = (types?: CurrencyGrantType[]) => {
  const queryParams = types
    ? new URLSearchParams({ types: types.join(',') })
    : null;
  const path = queryParams ? `/me/grants?${queryParams}` : '/me/grants';
  const { data, error, isLoading, mutate } =
    useAuthenticatedResource<GetUnclaimedGrantsResponse>({
      path,
    });
  return {
    totalAmountUnclaimed: data?.totalAmountUnclaimed ?? 0,
    error,
    isLoading,
    mutateTotalAmountUnclaimed: async (totalAmountUnclaimed: number) => {
      await mutate({ totalAmountUnclaimed });
    },
  };
};

export function useMe_UserCosmeticItems() {
  const { data, error, isLoading, mutate } = useAuthenticatedResource<
    UserCosmeticItem[]
  >({
    path: '/me/cosmetics',
  });

  return {
    myCosmeticItems: data ?? [],
    error,
    isLoading,
    mutate,
  };
}

export async function claimPendingGrants(grantTypes?: CurrencyGrantType[]) {
  return await post<ClaimPendingGrantsResponse>(
    '/me/grants/claim',
    grantTypes ? { types: grantTypes } : undefined
  );
}

/**
 * Returns a function that increases the current user's currencyBalance by the
 * specified amount. This function is intended to be passed to SWR's mutate as
 * optimisticData.
 *
 * @param {number} amount - The amount by which to increase the currency
 * balance.
 */
function optimisticallyIncreaseCurrencyBalance(amount: number) {
  return (
    _currentData: DatabaseUser | undefined,
    displayedData: DatabaseUser | undefined
  ) => {
    if (!displayedData) return displayedData;
    return {
      ...displayedData,
      currencyBalance: displayedData.currencyBalance + amount,
    };
  };
}

/**
 * Hook that returns a function to optimistically complete a user challenge.
 * This function will update the user's currency balance optimistically and then
 * send a request to complete the challenge on the server.
 *
 * @returns A function that takes a UserChallenge object and completes the challenge optimistically.
 */
export function useCompleteChallengeOptimistically() {
  const mutateUser = useUser().mutateUser;

  const completeChallengeOptimistically = async (challenge: UserChallenge) => {
    async function completeChallenge() {
      await post(`/challenges/${challenge.id}/complete`);
      return undefined;
    }

    const rewardAmount = challengeRewards[challenge.type as ChallengeType];

    await mutateUser(completeChallenge, {
      optimisticData: optimisticallyIncreaseCurrencyBalance(rewardAmount),
      populateCache: false,
      revalidate: true,
    });
  };

  return completeChallengeOptimistically;
}

export async function claimGrant(grantId: number): Promise<ClaimGrantResponse> {
  return await post(`/me/grants/${grantId}/claim`);
}

export function useSpicyContentPreferenceInDatabase() {
  const { data, error, isLoading, mutate } =
    useAuthenticatedResource<GetSpicyContentPreferenceResponse>({
      path: '/me/spicy-content-preference',
    });
  return {
    isOptedInToSpicyContent: data?.isOptedInToSpicyContent,
    error,
    isLoading,
    mutate,
  };
}

export async function setSpicyContentPreferenceInDatabase(
  isOptedInToSpicyContent: boolean
) {
  return await post(`/me/spicy-content-preference`, {
    isOptedInToSpicyContent,
  });
}

export function useGameUserStatuses() {
  const { data, error, isLoading, mutate } =
    useAuthenticatedResource<GetGameUserStatusesResponse>({
      path: '/me/game-statuses',
    });

  // Ensure default values of 0 for all games
  const defaultData = useMemo(() => {
    const defaultStatuses = {} as GetGameUserStatusesResponse;
    for (const gameName of gameNames) {
      defaultStatuses[gameName] = { numIncompleteTasks: 0 };
    }
    return defaultStatuses;
  }, []);

  return {
    data: data ?? defaultData,
    error,
    isLoading,
    mutate,
  };
}

function optimisticallyCompleteGameTask(
  gameName: GameName,
  numTasksCompleted: number,
  displayedData: GetGameUserStatusesResponse | undefined
) {
  if (!displayedData) {
    return;
  }
  if (displayedData[gameName].numIncompleteTasks === undefined) {
    return;
  }
  return {
    ...displayedData,
    [gameName]: {
      ...displayedData[gameName],
      numIncompleteTasks: Math.max(
        0,
        displayedData[gameName].numIncompleteTasks - numTasksCompleted
      ),
    },
  };
}

/**
 * Creates a function suitable for SWR's optimisticData option to update streak state.
 *
 * @param changeAmount - The amount to change the streak by (+1 to increase, -1 to decrease).
 * @returns A function that takes SWR's currentData and displayedData and returns the new optimistic UserStreakResponse.
 */
function createOptimisticStreakUpdater(changeAmount: number) {
  return (
    _currentData: UserStreakResponse | undefined,
    displayedData: UserStreakResponse | undefined
  ): UserStreakResponse => {
    if (!displayedData) {
      return {
        streakState: { status: 'inactive', streakCount: 0, isRewardDay: false },
      };
    }

    let newStreakCount = displayedData.streakState.streakCount;
    let newStatus = displayedData.streakState.status;

    // If the streak is incomplete or warning, we increment the streak count and set the status to active.
    if (
      changeAmount > 0 &&
      ['incomplete', 'warning'].includes(displayedData.streakState.status)
    ) {
      newStreakCount = displayedData.streakState.streakCount + changeAmount;
      newStatus = 'active';
      // If the streak is inactive, we set the streak count to 1 and set the status to active since
      // the player is starting a new streak.
    } else if (
      changeAmount > 0 &&
      displayedData.streakState.status === 'inactive'
    ) {
      newStreakCount = 1;
      newStatus = 'active';
      // If we are undoing a task and the streak is active, we reverse the addition of the streak count.
      // If the user's previous streak count was 0, we set the status to inactive.
    } else if (
      changeAmount < 0 &&
      displayedData.streakState.status === 'active'
    ) {
      newStreakCount = Math.max(
        0,
        displayedData.streakState.streakCount + changeAmount
      );
      newStatus = newStreakCount > 0 ? 'active' : 'inactive';
    }
    // If the streak is active and we are incrementing the streak count, we don't need to do anything.
    return {
      streakState: {
        status: newStatus,
        streakCount: newStreakCount,
        isRewardDay:
          newStatus === 'active' ? getIsRewardDay(newStreakCount) : false,
      },
    };
  };
}

export function useCompleteGameTask() {
  const { mutate } = useGameUserStatuses();
  const { mutate: mutateStreak } = useStreak();

  return (gameName: GameName, numTasksCompleted: number = 1) => {
    const undoCompletion = () => {
      void mutate(
        (currentData) =>
          optimisticallyCompleteGameTask(
            gameName,
            -numTasksCompleted,
            currentData
          ),
        false
      );
      // Only support "undoing" task completions, not task undos, since we can't
      // know if undoing this task would actaully cause the streak to go up or down
      // (i.e. if the user has performed other tasks besides this one today)
      if (numTasksCompleted > 0) {
        void mutateStreak(undefined, {
          optimisticData: createOptimisticStreakUpdater(-1),
          populateCache: false,
          revalidate: false,
        });
      }
    };

    void mutateStreak(undefined, {
      optimisticData: createOptimisticStreakUpdater(+1),
      populateCache: false,
      revalidate: false,
    });

    void mutate(
      (currentData) =>
        optimisticallyCompleteGameTask(
          gameName,
          numTasksCompleted,
          currentData
        ),
      false
    );

    return undoCompletion;
  };
}
