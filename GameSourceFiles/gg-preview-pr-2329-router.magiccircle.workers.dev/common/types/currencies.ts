import { PlayerId } from './player';

export enum CurrencyGrantType {
  NewPlayerGrant = 'NewPlayerGrant',
  AdminGrant = 'AdminGrant',
  MiniAvocadoAnswerPrize = 'MiniAvocadoAnswerPrize',
  DefaultCosmeticReplacement = 'DefaultCosmeticReplacement',
}

export enum CurrencyTransactionPurpose {
  CosmeticPurchase = 'CosmeticPurchase',
  GrantClaim = 'GrantClaim',
  ChallengeClaim = 'ChallengeClaim',
  PollCompletion = 'PollCompletion',
  MiniAvocadoAnswer = 'MiniAvocadoAnswer',
  KingPayout = 'KingPayout',
  Transfer = 'Transfer',
  JalapenoRoundWin = 'JalapenoRoundWin',
  JalapenoGameWin = 'JalapenoGameWin',
  AvocadoJudgesChoice = 'AvocadoJudgesChoice',
  PeachEnergyPurchase = 'PeachEnergyPurchase',

  // One-time claimable rewards (used directly as CurrencyTransactionPurpose values)
  OneTimeReward_PreorderOnAppStore = 'OneTimeReward_PreorderOnAppStore',
  OneTimeReward_DownloadOnAppStore = 'OneTimeReward_DownloadOnAppStore',
  OneTimeReward_JoinFirstPartyDiscord = 'OneTimeReward_JoinFirstPartyDiscord',
  OneTimeReward_FollowOnTwitter = 'OneTimeReward_FollowOnTwitter',
  OneTimeReward_FollowOnTikTok = 'OneTimeReward_FollowOnTikTok',
  OneTimeReward_FollowOnInstagram = 'OneTimeReward_FollowOnInstagram',
  OneTimeReward_SubscribeOnYouTube = 'OneTimeReward_SubscribeOnYouTube',
}

export const breadWidgetGrantTypes: CurrencyGrantType[] = [
  CurrencyGrantType.NewPlayerGrant,
  CurrencyGrantType.AdminGrant,
  CurrencyGrantType.DefaultCosmeticReplacement,
];

export enum CreditTransactionPurpose {
  AdminGrant = 'AdminGrant',
  PurchaseCreditsWithDiscordSKU = 'PurchaseCreditsWithDiscordSKU',
  PurchaseCreditsWithApple = 'PurchaseCreditsWithApple',
  QuinoaSeedPurchase = 'QuinoaSeedPurchase',
  QuinoaToolPurchase = 'QuinoaToolPurchase',
  QuinoaEggPurchase = 'QuinoaEggPurchase',
  QuinoaDecorPurchase = 'QuinoaDecorPurchase',
  QuinoaSeedRestock = 'QuinoaSeedRestock',
  QuinoaEggRestock = 'QuinoaEggRestock',
  QuinoaToolRestock = 'QuinoaToolRestock',
  QuinoaDecorRestock = 'QuinoaDecorRestock',
  QuinoaInstaGrow = 'QuinoaInstaGrow',
}

export type CurrencyTransactionEvent = {
  playerId: PlayerId;
  updatedBalance: number;
  amount: number;
  purpose: CurrencyTransactionPurpose;
  transactionId: number;
};
