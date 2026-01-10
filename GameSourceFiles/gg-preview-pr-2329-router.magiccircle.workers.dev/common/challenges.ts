export enum ChallengeType {
  DailyBread = 'challenge_daily_bread',
}

export const challengeTypes = Object.values(ChallengeType);

export function isChallengeType(type: string): type is ChallengeType {
  return challengeTypes.includes(type as ChallengeType);
}

export const challengeRewards = {
  [ChallengeType.DailyBread]: 100,
} satisfies Record<ChallengeType, number>;
