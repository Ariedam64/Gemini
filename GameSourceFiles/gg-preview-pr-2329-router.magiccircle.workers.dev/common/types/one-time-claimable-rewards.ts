import * as v from 'valibot';
import { CurrencyTransactionPurpose } from './currencies';

/**
 * All CurrencyTransactionPurpose values that represent one-time claimable rewards.
 */
export const oneTimeRewardPurposes = [
  CurrencyTransactionPurpose.OneTimeReward_PreorderOnAppStore,
  CurrencyTransactionPurpose.OneTimeReward_DownloadOnAppStore,
  CurrencyTransactionPurpose.OneTimeReward_JoinFirstPartyDiscord,
  CurrencyTransactionPurpose.OneTimeReward_FollowOnTwitter,
  CurrencyTransactionPurpose.OneTimeReward_FollowOnTikTok,
  CurrencyTransactionPurpose.OneTimeReward_FollowOnInstagram,
  CurrencyTransactionPurpose.OneTimeReward_SubscribeOnYouTube,
] as const;

/**
 * Type representing a one-time claimable reward purpose.
 */
export type OneTimeRewardPurpose = (typeof oneTimeRewardPurposes)[number];

/**
 * Reward amounts for each one-time claimable reward.
 */
export const oneTimeClaimableRewardRewards = {
  [CurrencyTransactionPurpose.OneTimeReward_DownloadOnAppStore]: 100,
  // Preorder on App Store is no longer available, but we'll keep it here for now
  [CurrencyTransactionPurpose.OneTimeReward_PreorderOnAppStore]: 100,
  [CurrencyTransactionPurpose.OneTimeReward_JoinFirstPartyDiscord]: 50,
  [CurrencyTransactionPurpose.OneTimeReward_FollowOnTwitter]: 50,
  [CurrencyTransactionPurpose.OneTimeReward_FollowOnTikTok]: 50,
  [CurrencyTransactionPurpose.OneTimeReward_FollowOnInstagram]: 50,
  [CurrencyTransactionPurpose.OneTimeReward_SubscribeOnYouTube]: 50,
} satisfies Record<OneTimeRewardPurpose, number>;

export const claimOneTimeRewardSchema = v.object({
  rewardPurpose: v.picklist(oneTimeRewardPurposes),
});
