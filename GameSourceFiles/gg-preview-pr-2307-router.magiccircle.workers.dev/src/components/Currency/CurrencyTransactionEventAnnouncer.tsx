import { atom, useAtom, useSetAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import { playSfx } from '@/audio/useQuinoaAudio';
import type { CurrencyTransactionEvent } from '@/common/types/currencies';
import McFlex from '@/components/McFlex/McFlex';
import { RiveErrorBoundary } from '@/components/rive/RiveErrorFallback';
import { platform } from '@/environment';
import { useUser } from '@/user';
import { delay } from '@/utils/delay';
import Rive_BreadEarned from './Rive_BreadEarned/Rive_BreadEarned';
import { wiggleBreadCounterWidget } from './wiggleCurrencyCounters';

const lastCurrencyTransactionAtom = atom<CurrencyTransactionEvent | undefined>(
  undefined
);

// eslint-disable-next-line react-refresh/only-export-components
export const useAnnounceCurrencyEvent = () => {
  const setLastCurrencyTransaction = useSetAtom(lastCurrencyTransactionAtom);
  return useCallback(
    (event: CurrencyTransactionEvent) => {
      setLastCurrencyTransaction(event);
    },
    [setLastCurrencyTransaction]
  );
};

/**
 * Renders a Rive animation showing currency (bread) being earned by the player, wiggles the bread widget,
 * and updates their bread balance.
 *
 * This component works by utilizing the lastCurrencyTransaction atom which receives websocket messages
 * from the RoomManager when players earn rewards (e.g. winning a round of Kiwi).
 *
 * The hasCurrencyRewardAnimationStarted atom determines WHEN we should trigger the announcer animation.
 * We don't always want to show the animation immediately when receiving a transaction event, since the timing
 * of the websocket message is arbitrary. For example, in Avocado, we want to wait until certain game animations
 * have completed before showing the bread reward animation. Each game handles during which windows they will
 * allow currency events to be announced by setting hasCurrencyRewardAnimationStarted appropriately.
 */
const CurrencyTransactionEventAnnouncer: React.FC = () => {
  const { mutateUser } = useUser();
  const [lastCurrencyTransaction, setLastCurrencyTransaction] = useAtom(
    lastCurrencyTransactionAtom
  );
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!lastCurrencyTransaction) {
      return;
    }
    setIsVisible(true);
    playSfx('Score_Promotion');
    void (async () => {
      const riveBreadEarnedDuration = 1.5;
      await delay(riveBreadEarnedDuration);
      setIsVisible(false);
      playSfx('Bread_DonePopping');
      void wiggleBreadCounterWidget();
      void mutateUser(
        (prev) =>
          prev && {
            ...prev,
            currencyBalance: lastCurrencyTransaction.updatedBalance,
          },
        { revalidate: false }
      ).catch(console.error);
      setLastCurrencyTransaction(undefined);
    })().catch(console.error);
  }, [lastCurrencyTransaction]);

  if (!isVisible) return null;
  return (
    <McFlex
      id="CurrencyTransactionEventAnnouncer"
      position="absolute"
      top="0"
      zIndex="CurrencyTransactionEventAnnouncer"
      pointerEvents="none"
      transform={platform === 'mobile' ? 'rotate(-14deg)' : undefined}
    >
      <RiveErrorBoundary>
        <Rive_BreadEarned amount={lastCurrencyTransaction?.amount ?? 0} />
      </RiveErrorBoundary>
    </McFlex>
  );
};

export default CurrencyTransactionEventAnnouncer;
