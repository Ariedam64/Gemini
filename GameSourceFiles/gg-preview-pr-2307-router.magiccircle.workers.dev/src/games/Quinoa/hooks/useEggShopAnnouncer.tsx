import { Trans } from '@lingui/react/macro';
import { useAtomValue } from 'jotai';
import { useEffect, useRef } from 'react';
import { playSfx } from '@/audio/useQuinoaAudio';
import { BASE_URL } from '@/environment';
import {
  eggShopCustomRestockInventoryAtom,
  eggShopRestockSecondsAtom,
  isDecorShopAboutToRestockAtom,
} from '@/Quinoa/atoms/shopAtoms';
import { areShopAnnouncersEnabledAtom } from '@/Quinoa/atoms/taskAtoms';
import { sendQuinoaToast } from '@/Quinoa/atoms/toastAtoms';
import { teleport } from '../World/teleport';

const toastStaggerAmount = 5000;

const useEggShopAnnouncer = () => {
  const restockSeconds = useAtomValue(eggShopRestockSecondsAtom);
  const customEggShopInfo = useAtomValue(eggShopCustomRestockInventoryAtom);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const areShopAnnouncersEnabled = useAtomValue(areShopAnnouncersEnabledAtom);
  const isDecorShopAboutToRestock = useAtomValue(isDecorShopAboutToRestockAtom);

  const onClickToast = () => {
    teleport('eggShop');
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
        title: <Trans>Eggs Restocked!</Trans>,
        subtitle: <Trans>Visit the Egg Shop for new eggs.</Trans>,
        strokeColor: 'Purple.Magic',
        backgroundImage: `${BASE_URL}/assets/ui/eggs-restocked.webp`,
        onClick: onClickToast,
        isStackable: true,
        duration: 5_000,
      });
    }, 1000 + toastStaggerAmount);
  }, [restockSeconds, isDecorShopAboutToRestock]);

  useEffect(() => {
    if (customEggShopInfo && timeoutRef.current && restockSeconds !== 1) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [customEggShopInfo]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
};

export default useEggShopAnnouncer;
