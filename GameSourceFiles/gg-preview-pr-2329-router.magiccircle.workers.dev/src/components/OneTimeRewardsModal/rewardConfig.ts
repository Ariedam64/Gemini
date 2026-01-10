import { msg } from '@lingui/core/macro';
import {
  MagicCircleAppStoreUrl,
  MagicCircleDiscordServerInviteUrl,
} from '@/common/constants';
import { CurrencyTransactionPurpose } from '@/common/types/currencies';
import {
  type OneTimeRewardPurpose,
  oneTimeClaimableRewardRewards,
} from '@/common/types/one-time-claimable-rewards';

export interface RewardConfig {
  purpose: OneTimeRewardPurpose;
  label: ReturnType<typeof msg>;
  url: string | null;
  amount: number;
  hideOnNonIOSMobile?: boolean;
}

/**
 * Reward configurations array with translatable labels
 */
export const rewardConfigs: RewardConfig[] = [
  {
    purpose: CurrencyTransactionPurpose.OneTimeReward_DownloadOnAppStore,
    label: msg`Get the iOS app`,
    url: MagicCircleAppStoreUrl,
    amount:
      oneTimeClaimableRewardRewards[
        CurrencyTransactionPurpose.OneTimeReward_DownloadOnAppStore
      ],
    hideOnNonIOSMobile: true,
  },
  {
    purpose: CurrencyTransactionPurpose.OneTimeReward_JoinFirstPartyDiscord,
    label: msg`Join the Discord`,
    url: MagicCircleDiscordServerInviteUrl,
    amount:
      oneTimeClaimableRewardRewards[
        CurrencyTransactionPurpose.OneTimeReward_JoinFirstPartyDiscord
      ],
  },
  {
    purpose: CurrencyTransactionPurpose.OneTimeReward_SubscribeOnYouTube,
    label: msg`Subscribe on YouTube`,
    url: 'https://www.youtube.com/@magiccirclegames',
    amount:
      oneTimeClaimableRewardRewards[
        CurrencyTransactionPurpose.OneTimeReward_SubscribeOnYouTube
      ],
  },
  {
    purpose: CurrencyTransactionPurpose.OneTimeReward_FollowOnTikTok,
    label: msg`Follow us on TikTok`,
    url: 'https://www.tiktok.com/@gamesbyavi',
    amount:
      oneTimeClaimableRewardRewards[
        CurrencyTransactionPurpose.OneTimeReward_FollowOnTikTok
      ],
  },
  {
    purpose: CurrencyTransactionPurpose.OneTimeReward_FollowOnTwitter,
    label: msg`Follow us on X`,
    url: 'https://twitter.com/magiccircle_gg',
    amount:
      oneTimeClaimableRewardRewards[
        CurrencyTransactionPurpose.OneTimeReward_FollowOnTwitter
      ],
  },
  {
    purpose: CurrencyTransactionPurpose.OneTimeReward_FollowOnInstagram,
    label: msg`Follow us on Instagram`,
    url: 'https://www.instagram.com/magiccircle.games',
    amount:
      oneTimeClaimableRewardRewards[
        CurrencyTransactionPurpose.OneTimeReward_FollowOnInstagram
      ],
  },
];

/**
 * Filters rewards based on platform requirements
 */
export const filterRewardsForPlatform = (
  isNonIOSMobile: boolean
): RewardConfig[] => {
  return rewardConfigs.filter((config) => {
    if (config.hideOnNonIOSMobile && isNonIOSMobile) {
      return false;
    }
    return true;
  });
};

/**
 * Helper function to get config by purpose
 */
export const getConfigByPurpose = (
  purpose: OneTimeRewardPurpose
): RewardConfig | undefined => {
  return rewardConfigs.find((config) => config.purpose === purpose);
};
