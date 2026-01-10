import { useLingui as useLinguiRuntime } from '@lingui/react';
import { useMemo } from 'react';
import type { CurrencyTransactionPurpose } from '@/common/types/currencies';
import type { OneTimeRewardPurpose } from '@/common/types/one-time-claimable-rewards';
import { isNonIOSMobile } from '@/environment';
import { useAuthenticatedResource } from '@/user';
import {
  filterRewardsForPlatform,
  getConfigByPurpose as getConfigByPurposeUtil,
  type RewardConfig,
} from './rewardConfig';

export type { RewardConfig };

export interface RenderedRewardConfig {
  purpose: OneTimeRewardPurpose;
  label: string;
  url: string | null;
  amount: number;
  showOnlyOnIOS?: boolean;
}

export const useRewardConfig = () => {
  const { _ } = useLinguiRuntime();
  // Filter rewards based on platform and render labels
  const availableRewards = useMemo(() => {
    return filterRewardsForPlatform(isNonIOSMobile).map(
      (config): RenderedRewardConfig => ({
        ...config,
        label: _(config.label),
      })
    );
  }, [isNonIOSMobile, _]);
  // Helper function to get config by purpose
  const getConfigByPurpose = (
    purpose: OneTimeRewardPurpose
  ): RenderedRewardConfig | undefined => {
    const config = getConfigByPurposeUtil(purpose);
    if (!config) {
      return;
    }
    return {
      ...config,
      label: _(config.label),
    };
  };
  return {
    availableRewards,
    getConfigByPurpose,
    isAndroid: isNonIOSMobile,
  };
};
/**
 * Hook to fetch and manage claimed rewards data using SWR
 */
export const useClaimedRewards = () => {
  const { availableRewards } = useRewardConfig();
  const {
    data: claimedRewardsArray,
    error,
    isLoading,
    mutate,
  } = useAuthenticatedResource<{
    claimedRewards: CurrencyTransactionPurpose[];
  }>({
    path: '/me/one-time-rewards',
  });
  // Convert array to Set for easier lookups
  const claimedRewards = useMemo(() => {
    return new Set(claimedRewardsArray?.claimedRewards ?? []);
  }, [claimedRewardsArray]);
  // Derived state: check if user has any unclaimed rewards
  const hasUnclaimedRewards = useMemo(() => {
    return availableRewards.some(
      (reward) => !claimedRewards.has(reward.purpose)
    );
  }, [availableRewards, claimedRewards]);
  // Method to mark a reward as claimed (for optimistic updates)
  const markRewardAsClaimed = (purpose: CurrencyTransactionPurpose) => {
    mutate(
      (currentData) => {
        if (!currentData) {
          return currentData;
        }
        const existingClaimed = currentData.claimedRewards || [];
        if (existingClaimed.includes(purpose)) {
          return currentData;
        }
        return {
          claimedRewards: [...existingClaimed, purpose],
        };
      },
      {
        revalidate: false, // Don't revalidate immediately since this is optimistic
      }
    ).catch(console.error);
  };
  return {
    claimedRewards,
    hasUnclaimedRewards,
    isLoading,
    error,
    markRewardAsClaimed,
    mutate,
  };
};
