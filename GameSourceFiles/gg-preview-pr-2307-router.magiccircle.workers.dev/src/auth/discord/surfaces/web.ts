import { t } from '@lingui/core/macro';
import { getDefaultStore } from 'jotai';
import { CookieName } from '@/common/cookies';
import { Identifiers } from '@/common/identifiers';
import type { DiscordAuthorizationCodeRequest } from '@/common/types/discord';
import WebSocketCloseCode from '@/common/WebSocketCloseCode';
import RoomConnection from '@/connection/RoomConnection';
import { closeDiscordActivity } from '@/discord-sdk/utils';
import { DiscordClientId, surface } from '@/environment';
import { playerIdAtom } from '@/store/store';
import { getCurrentRoomId, post } from '@/utils';
import { scopes } from '../scopes';

export function redirectToDiscordLogin() {
  const roomId = getCurrentRoomId();
  if (!roomId) {
    throw new Error('No room ID found');
  }
  const redirectUri = `${window.location.origin}/oauth2/redirect`;

  document.cookie = `${CookieName.mc_oauth_redirect_uri}=${redirectUri}; path=/oauth2/redirect;`;
  document.cookie = `${CookieName.mc_oauth_room_id}=${roomId}; path=/oauth2/redirect;`;

  const discordAuthUrl = new URL('https://discord.com/oauth2/authorize');
  discordAuthUrl.searchParams.set('client_id', DiscordClientId);
  discordAuthUrl.searchParams.set('response_type', 'code');
  discordAuthUrl.searchParams.set('redirect_uri', redirectUri);
  discordAuthUrl.searchParams.set('scope', scopes.join(' '));
  // discordAuthUrl.searchParams.set('prompt', 'none');
  window.location.href = discordAuthUrl.toString();
}

function getSearchParam(name: string): string | null {
  return new URL(window.location.href).searchParams.get(name);
}

function deleteSearchParam(name: string) {
  const searchParams = new URL(window.location.href).searchParams;
  searchParams.delete(name);
  const newSearchParams = searchParams.toString();
  const newUrl = newSearchParams
    ? `${window.location.origin}${window.location.pathname}?${newSearchParams}`
    : `${window.location.origin}${window.location.pathname}`;
  window.history.replaceState({}, document.title, newUrl);
}

/**
 * Gets Apple Sign In authorization code from URL query parameters.
 * These are passed by the iOS app when opening the WKWebView.
 */
export function getSignInWithAppleGrantRequest(): string | undefined {
  const code = getSearchParam('appleOAuthCode');
  if (code) {
    deleteSearchParam('appleOAuthCode');
    return code;
  }
  return undefined;
}

export function getDiscordOAuthGrantRequest():
  | DiscordAuthorizationCodeRequest
  | undefined {
  const code = getSearchParam('discordOAuthCode');
  const redirect_uri = getSearchParam('discordOAuthRedirectUri');

  // Remove the discordOAuthCode and discordOAuthRedirectUri from the search
  // params, so that we don't re-use them, regardless of whether the request
  // succeeds or fails.
  deleteSearchParam('discordOAuthCode');
  deleteSearchParam('discordOAuthRedirectUri');

  if (code && redirect_uri) {
    return { code, redirect_uri };
  }
}

export const logOut = async (): Promise<void> => {
  await post('/user/logout');
  // Leave the room gracefully
  RoomConnection.getInstance().disconnect(
    WebSocketCloseCode.PlayerLeftVoluntarily
  );
  // We need to make sure to reset the identifier here because it gets persisted
  // to local storage and will be used to bootstrap the posthog distinct ID when
  // the page is reloaded.
  // Note: we decided NOT to call posthog.reset() because it doesn't provide a
  // way for us to supply it with another distinct ID of our choosing, only a
  // posthog-generated UUID
  // Posthog bug: https://github.com/PostHog/posthog-js/issues/862
  getDefaultStore().set(playerIdAtom, Identifiers.generatePlayerId());

  if (surface === 'webview') {
    // On iOS, we don't want to reload the page, as that's jarring.
    // Instead, we'll post a message to the native side to handle it.
    if (window.webkit?.messageHandlers?.returnToHomeScreen?.postMessage) {
      window.webkit.messageHandlers.returnToHomeScreen.postMessage({
        message: t`You have been signed out.`,
        type: 'user_signed_out',
        timestamp: new Date().toISOString(),
      });
    }
  } else if (surface === 'web') {
    // Reload the page to cause the user to be re-identified to Posthog and Sentry
    window.location.reload();
  } else if (surface === 'discord') {
    closeDiscordActivity('User logged out');
  }
};
