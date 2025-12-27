import { getDefaultStore } from 'jotai';
import { useEffect } from 'react';
import type { DeepLinkPayloadData } from '@/common/types/deep-links';
import { surface } from '@/environment';
import { pendingDeepLinkNotificationAtom } from '@/store/deepLinkNotification';
import { useIsUserAuthenticated } from '@/store/store';

type OneSignalDeepLinkEnvelope = {
  custom: {
    a: {
      DeepLinkPayloadDataJson: string;
    };
  };
};

export function useAppleDeepLinkListener() {
  const isUserAuthenticated = useIsUserAuthenticated();

  useEffect(() => {
    if (surface !== 'webview') {
      return;
    }

    if (isUserAuthenticated) {
      if (window.webkit?.messageHandlers?.jsReady) {
        window.webkit.messageHandlers.jsReady.postMessage({});
      }
    }
  }, [isUserAuthenticated]);

  useEffect(() => {
    if (surface !== 'webview') {
      return;
    }

    const handleNotification = (
      event: CustomEvent<OneSignalDeepLinkEnvelope>
    ) => {
      try {
        const deepLinkData = JSON.parse(
          event.detail.custom.a.DeepLinkPayloadDataJson
        ) as DeepLinkPayloadData;
        getDefaultStore().set(pendingDeepLinkNotificationAtom, deepLinkData);
      } catch (error) {
        console.error('[apple] error parsing deep link data', error);
      }
    };

    window.addEventListener(
      'magiccircle:notification',
      handleNotification as EventListener
    );

    return () => {
      window.removeEventListener(
        'magiccircle:notification',
        handleNotification as EventListener
      );
    };
  }, []);
}
