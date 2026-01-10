import { Trans } from '@lingui/react/macro';
import { useAtomValue } from 'jotai';
import { useEffect, useRef } from 'react';
import { playSfx } from '@/audio/useQuinoaAudio';
import { BASE_URL } from '@/environment';
import {
  isDecorShopAboutToRestockAtom,
  seedShopCustomRestockInventoryAtom,
  seedShopRestockSecondsAtom,
} from '@/Quinoa/atoms/shopAtoms';
import { areShopAnnouncersEnabledAtom } from '@/Quinoa/atoms/taskAtoms';
import { sendQuinoaToast } from '@/Quinoa/atoms/toastAtoms';
import { teleport } from '../World/teleport';

const useSeedShopAnnouncer = () => {
  const restockSeconds = useAtomValue(seedShopRestockSecondsAtom);
  const customSeedShopInfo = useAtomValue(seedShopCustomRestockInventoryAtom);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const areShopAnnouncersEnabled = useAtomValue(areShopAnnouncersEnabledAtom);
  const isDecorShopAboutToRestock = useAtomValue(isDecorShopAboutToRestockAtom);

  const onClickToast = () => {
    teleport('seedShop');
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
      // Skip showing individual shop toast if decor shop is about to restock
      // Will show "All Shops Restocked!" instead
      if (isDecorShopAboutToRestock) {
        return;
      }
      playSfx('SeedShopRestocked');
      sendQuinoaToast({
        toastType: 'board',
        title: <Trans>Seeds Restocked!</Trans>,
        subtitle: <Trans>Visit the Seed Shop for new seeds.</Trans>,
        strokeColor: '#378A5D',
        backgroundImage: `${BASE_URL}/assets/ui/seeds-restocked.webp`,
        onClick: onClickToast,
        isStackable: true,
        topOffset: 8,
        duration: 5_000,
      });
    }, 1000);
  }, [restockSeconds, isDecorShopAboutToRestock]);

  useEffect(() => {
    if (customSeedShopInfo && timeoutRef.current && restockSeconds !== 1) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [customSeedShopInfo]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
};

export default useSeedShopAnnouncer;
