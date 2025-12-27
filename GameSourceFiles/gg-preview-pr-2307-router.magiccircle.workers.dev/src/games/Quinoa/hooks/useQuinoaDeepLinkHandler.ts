import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { pendingDeepLinkNotificationAtom } from '@/store/deepLinkNotification';
import { playSfx } from '@/audio/useQuinoaAudio';
import { setActiveModal } from '../atoms/modalAtom';

export function useQuinoaDeepLinkHandler() {
  const [pendingDeepLink, setPendingDeepLink] = useAtom(
    pendingDeepLinkNotificationAtom
  );

  useEffect(() => {
    const deepLinkData = pendingDeepLink;
    if (deepLinkData?.game === 'Quinoa') {
      if (deepLinkData.target.kind === 'seedshop') {
        playSfx('Shop_Open');
        setActiveModal('seedShop');
      }
      setPendingDeepLink(null);
    }
  }, [pendingDeepLink, setPendingDeepLink]);
}
