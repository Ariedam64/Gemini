import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { playSfx } from '@/audio/useQuinoaAudio';
import { pendingDeepLinkNotificationAtom } from '@/store/deepLinkNotification';
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
