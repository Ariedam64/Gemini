import { useEffect } from 'react';
import type { UnclaimedMiniAvocadoPrizesResponse } from '@/common/games/avocado-mini/types';
import { useIsUserAuthenticated } from '@/store/store';
import { sendRequest } from '@/utils';
import { usePresentableProducer } from '..';
import { MiniAvocadoPrizePresentableRenderer } from './MiniAvocadoPrizePresentable';

export const fetchMiniAvocadoPrizes =
  async (): Promise<UnclaimedMiniAvocadoPrizesResponse> => {
    const prizes = await sendRequest<UnclaimedMiniAvocadoPrizesResponse>(
      '/games/mini-avocado/unclaimed-prizes'
    );
    return prizes;
  };

export function useMiniAvocadoPrizePresentableProducer(priority: number) {
  const { setPresentables } = usePresentableProducer(priority);
  const isUserAuthenticated = useIsUserAuthenticated();

  useEffect(() => {
    (async () => {
      if (!isUserAuthenticated) {
        return;
      }
      const prizes = await fetchMiniAvocadoPrizes();
      if (prizes.length > 0) {
        // TODO: Support multiple prize
        const prize = prizes[0];
        setPresentables([
          {
            id: 'miniavocado-prize-' + prize.id,
            presentable: {
              type: 'MiniAvocadoPrize',
              component: (
                <MiniAvocadoPrizePresentableRenderer
                  questionText={prize.avocadoMiniDailyQuestion.questionText}
                  answerText={prize.answerText}
                  questionDate={prize.avocadoMiniDailyQuestion.date}
                />
              ),
            },
          },
        ]);
      }
    })().catch(console.error);
  }, [isUserAuthenticated]);
}
