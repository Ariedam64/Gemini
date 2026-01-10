import { useEffect } from 'react';
import { ChallengeType } from '@/common/challenges';
import type { UserChallenge } from '@/common/prisma/generated/browser';
import { useIsUserAuthenticated } from '@/store/store';
import { post } from '@/utils';
import { usePresentableProducer } from '..';
import { DailyChallengeCompletePresentableRenderer } from './DailyChallengeCompletePresentable';

export const refreshChallenges = async () => {
  const incompleteChallenges = await post<UserChallenge[]>(
    '/challenges/refresh'
  );
  return incompleteChallenges;
};

export function useChallengesPresentableProducer(priority: number) {
  const { setPresentables } = usePresentableProducer(priority);
  const isUserAuthenticated = useIsUserAuthenticated();

  useEffect(() => {
    (async () => {
      if (!isUserAuthenticated) {
        return;
      }
      const incompleteChallenges = await refreshChallenges();
      setPresentables(
        incompleteChallenges
          .filter((challenge) => challenge.type === ChallengeType.DailyBread)
          .map((challenge) => ({
            id: 'challenge-' + challenge.id,
            presentable: {
              type: 'DailyChallengeComplete',
              component: (
                <DailyChallengeCompletePresentableRenderer
                  challenge={challenge}
                />
              ),
            },
          }))
      );
    })().catch(console.error);
  }, [isUserAuthenticated]);
}
