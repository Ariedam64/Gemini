import { t } from '@lingui/core/macro';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import WebSocketCloseCode from '@/common/WebSocketCloseCode';
import { surface } from '@/environment';
import { authenticationFailureAtom } from '@/store/store';

/**
 * Hook that handles authentication failures on iOS by calling back to the native layer.
 * When an authentication failure occurs in iOS WebView, this will trigger the native
 * app to reset authentication state and return the user to the sign-in screen.
 */
export function useIOSAuthFailureHandler() {
  const authenticationFailure = useAtomValue(authenticationFailureAtom);

  useEffect(() => {
    // Only handle auth failures on iOS WebView
    if (
      surface !== 'webview' ||
      !authenticationFailure ||
      // Version expired isn't a real auth failure, it's just a notification to
      // the user that the game needs to be updated. They can take action via the
      // modal in VersionExpiredDialog.
      authenticationFailure === WebSocketCloseCode.VersionExpired
    ) {
      return;
    }
    console.log(
      '🚨 [iOS] Authentication failure detected, notifying native layer'
    );
    // Call the native iOS layer to handle authentication failure
    try {
      if (window.webkit?.messageHandlers?.returnToHomeScreen?.postMessage) {
        window.webkit.messageHandlers.returnToHomeScreen.postMessage({
          message: t`Your login has expired. Please sign in again.`,
          type: 'authentication_failure',
          error: authenticationFailure,
          timestamp: new Date().toISOString(),
        });
      } else {
        console.error(
          '🚨 [iOS] webkit.messageHandlers.returnToHomeScreen not available'
        );
      }
    } catch (error) {
      console.error(
        '🚨 [iOS] Failed to notify native layer of auth failure:',
        error
      );
    }
  }, [authenticationFailure]);
}
