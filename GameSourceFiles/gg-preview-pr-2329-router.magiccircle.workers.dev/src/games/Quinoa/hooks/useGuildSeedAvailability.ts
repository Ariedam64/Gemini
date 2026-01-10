import useSWR from 'swr';
import type { GetGuildSeedAvailabilityResponse } from '@/common/games/Quinoa/rpc';
import { useIsUserAuthenticated } from '@/store/store';
import { sendRequest } from '@/utils';

const useGuildSeedAvailability = () => {
  const isUserAuthenticated = useIsUserAuthenticated();
  // Only fetch if user is authenticated (conditional fetch)
  const path = isUserAuthenticated
    ? '/games/quinoa/guild-seed-availability'
    : null;

  const { data, isLoading, mutate } = useSWR<GetGuildSeedAvailabilityResponse>(
    path,
    sendRequest,
    {
      // Very aggressive caching - guild data rarely changes
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      // Cache for 10 minutes - guild membership doesn't change often
      refreshInterval: Infinity,
      // Dedupe requests for 5 minutes
      dedupingInterval: 5 * 60 * 1000,
      // Keep stale data while revalidating
      keepPreviousData: true,
    }
  );
  return {
    data: data ?? [],
    isLoading,
    refetch: mutate,
  };
};

export default useGuildSeedAvailability;
