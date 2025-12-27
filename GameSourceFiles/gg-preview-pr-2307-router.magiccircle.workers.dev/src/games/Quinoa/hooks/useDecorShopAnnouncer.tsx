import { Trans } from '@lingui/react/macro';
import { useAtomValue } from 'jotai';
import { useEffect, useRef } from 'react';
import { playSfx } from '@/audio/useQuinoaAudio';
import { BASE_URL } from '@/environment';
import {
  decorShopCustomRestockInventoryAtom,
  decorShopRestockSecondsAtom,
} from '@/Quinoa/atoms/shopAtoms';
import { areShopAnnouncersEnabledAtom } from '@/Quinoa/atoms/taskAtoms';
import { sendQuinoaToast } from '@/Quinoa/atoms/toastAtoms';
import { teleport } from '../World/teleport';

const useDecorShopAnnouncer = () => {
  const restockSeconds = useAtomValue(decorShopRestockSecondsAtom);
  const customDecorShopInfo = useAtomValue(decorShopCustomRestockInventoryAtom);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const areShopAnnouncersEnabled = useAtomValue(areShopAnnouncersEnabledAtom);

  const onClickToast = () => {
    teleport('shopsCenter');
  };

  useEffect(() => {
    // If it's one second before the restock, set a one second timeout to show
    // the restock announcement. We do this because it's possible that we enter a new
    // restock window NOT at 5 minutes exactly due to custom restocks.
    if (restockSeconds !== 1 || timeoutRef.current !== null) {
      return;
    }
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      if (!areShopAnnouncersEnabled) {
        return;
      }
      playSfx('AllShopsRestocked');
      // Since all four shops restock at the same time when decor shop is about to restock,
      // we can show a single toast for all shops.
      sendQuinoaToast({
        toastType: 'board',
        title: <Trans>All Shops Restocked!</Trans>,
        subtitle: <Trans>Visit the shops for new items.</Trans>,
        strokeColor: 'Purple.Magic',
        backgroundImage: `${BASE_URL}/assets/ui/all-restocked.webp`,
        onClick: onClickToast,
        isStackable: true,
        duration: 5_000,
      });
    }, 1000);
  }, [restockSeconds]);

  useEffect(() => {
    if (customDecorShopInfo && timeoutRef.current && restockSeconds !== 1) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [customDecorShopInfo]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
};

export default useDecorShopAnnouncer;
