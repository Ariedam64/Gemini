import type { DiscordSDK } from '@discord/embedded-app-sdk';
import { t } from '@lingui/core/macro';
import { getDefaultStore } from 'jotai';
import { mutate } from 'swr';
import type {
  DatabaseUser,
  MagicCircleAuthenticationRequestDiscord,
  MagicCircleAuthenticationRequestWeb,
  MagicCircleAuthenticationResponseDiscord,
  MagicCircleAuthenticationResponseWeb,
  UserStreakResponse,
} from '@/common/types/user';
import { initialStreakStateAtom } from '@/components/Streak/store';
import { surface } from '@/environment';
import { discordAccessTokenAtom, jwtAtom, playerIdAtom } from '@/store/store';
import { post, sendRequest } from '@/utils';
import {
  authenticateWithDiscord,
  requestDiscordAuthorizationCode,
} from './discord/surfaces/discord';
import {
  getDiscordOAuthGrantRequest,
  getSignInWithAppleGrantRequest,
} from './discord/surfaces/web';

const { set } = getDefaultStore();

/**
 * Authenticates the user and creates a database entry.
 *
 * Surface-specific behavior:
 * - For Discord:
 *   1) Requests an authorization code from the Discord Embedded SDK.
 *   2) Calls the server with that code. The server will prefer an existing, non-expired JWT to avoid unnecessary
 *      code→token exchanges (Discord rate limited). If needed, it exchanges the code for a fresh token.
 *   3) Attempts SDK `authenticate` with the access token. If the SDK signals a user/token mismatch (error code 4009),
 *      we treat it as a "token_mismatch" result: clear the stored JWT and retry once to bind the session to the
 *      currently active Discord account (covers Discord "Multiple Accounts").
 * - For Web:
 *   1) Attempts Discord OAuth2 via redirect if a grant is present; otherwise tries an existing JWT.
 *   2) If not authenticated, plays anonymously.
 * - For Apple:
 *   1) Attempts Apple Sign In using an OAuth code provided by the native app.
 *   2) If authentication fails or no code provided, falls back to anonymous play (except where unsupported).
 *
 * @returns {Promise<DatabaseUser | null>} Resolves with the authenticated `DatabaseUser`, or `null` for anonymous play.
 * @throws {Error} On unrecoverable authentication errors or database user creation failures.
 */
export async function signIn(): Promise<DatabaseUser | null> {
  switch (surface) {
    case 'discord': {
      const { code, discordSdk } = await requestDiscordAuthorizationCode();
      const response = await authenticateWithMagicCircleDiscord(
        discordSdk,
        code
      );
      const authResult = await authenticateWithDiscord(
        discordSdk,
        response.discordAccessToken
      );
      // A token_mismatch can happen if the user uses the "Switch Accounts" feature to log in to
      // Discord, and then tries to authenticate with a different account - we need to
      // NOT use their old credentials, but unfortunately there doesn't seem to be a
      // way to check for this sooner in the authentication flow than at this stage.
      if (authResult.kind === 'token_mismatch') {
        console.warn(
          'Discord auth token does not match the active Discord account (likely due to Multiple Accounts). Clearing stored JWT and retrying with a fresh session.',
          authResult.error
        );
        // Clear JWT and try again, which will trigger a new code→token exchange.
        set(jwtAtom, undefined);
        return await signIn();
      }
      console.log(
        `Successfully authenticated user ${authResult.auth.user.username} (${authResult.auth.user.id}) with Discord SDK`
      );
      set(discordAccessTokenAtom, response.discordAccessToken);
      set(playerIdAtom, response.databaseUser.id);
      set(jwtAtom, response.jwt);
      return response.databaseUser;
    }

    case 'webview':
    case 'web': {
      const signInWithAppleAuthorizationCode = getSignInWithAppleGrantRequest();

      if (signInWithAppleAuthorizationCode) {
        // Apple Sign In - use the 'apple' discriminant
        const response = await authenticateWithMagicCircleWeb({
          provider: 'apple',
          appleAuthCode: signInWithAppleAuthorizationCode,
        });
        if (response.isAuthenticated) {
          set(playerIdAtom, response.databaseUser.id);
          return response.databaseUser;
        }
        // in iOS, anonymous play is not supported, so we need to throw an error
        throw new Error('Failed to authenticate with Apple');
      }
      // Check if this is a guest play session
      const urlParams = new URLSearchParams(window.location.search);
      const isGuestPlay = urlParams.get('guestPlay') === 'true';
      // Consume the guestPlay parameter by removing it from the URL
      if (isGuestPlay) {
        urlParams.delete('guestPlay');
        const newUrl = new URL(window.location.href);
        newUrl.search = urlParams.toString();
        window.history.replaceState({}, '', newUrl.toString());
      }
      // If we're coming from a Discord OAuth2 redirect, we need to exchange the
      // code for a token. Otherwise, we'll expect to have a valid JWT which will be sent via cookie.
      const discordOAuthGrantRequest = getDiscordOAuthGrantRequest();

      try {
        // Use either 'discord' discriminant (with new code) or 'existing' (JWT-based)
        const response = await authenticateWithMagicCircleWeb(
          discordOAuthGrantRequest
            ? {
                provider: 'discord',
                grantRequest: discordOAuthGrantRequest,
              }
            : {
                provider: 'maybe-existing-jwt',
              }
        );
        if (response.isAuthenticated) {
          if (surface === 'webview') {
            set(playerIdAtom, response.databaseUser.id);
          }
          return response.databaseUser;
        } else if (surface === 'webview' && !isGuestPlay) {
          // Not authenticated and no guestPlay parameter - likely a returning guest
          // Notify iOS to go back to auth screen (without intro video)
          if (window.webkit?.messageHandlers?.returnToHomeScreen?.postMessage) {
            window.webkit.messageHandlers.returnToHomeScreen.postMessage({
              message: t`Guest session ended. Please choose how to play.`,
              type: 'guest_session_expired',
              timestamp: new Date().toISOString(),
            });
          } else {
            throw new Error('returnToHomeScreen message handler not available');
          }
          return null;
        }
        // If we're not authenticated, we'll play anonymously
        return null;
      } catch {
        console.error('Failed to authenticate', {
          surface,
          isGuestPlay,
          discordOAuthGrantRequest,
        });
        // If we fail to authenticate, we'll also play anonymously, except in iOS
        // where anonymous play is not supported (unless it's guest play).
        if (surface === 'webview' && !isGuestPlay) {
          // Authentication failed and no guestPlay parameter - likely a returning guest
          // Notify iOS to go back to auth screen (without intro video)
          if (window.webkit?.messageHandlers?.returnToHomeScreen?.postMessage) {
            window.webkit.messageHandlers.returnToHomeScreen.postMessage({
              message: t`Guest session ended. Please choose how to play.`,
              type: 'guest_session_expired',
              timestamp: new Date().toISOString(),
            });
          } else {
            throw new Error('returnToHomeScreen message handler not available');
          }
        }
        return null;
      }
    }
  }
}

/**
 * Populates the SWR cache with user data and captures initial streak state.
 * Streak is fetched here (before any game activity) to detect streak increases.
 */
export async function populateSwrCache(user: DatabaseUser): Promise<void> {
  await Promise.all([
    sendRequest<UserStreakResponse>('/me/streak').then((data) =>
      set(initialStreakStateAtom, data.streakState)
    ),
    mutate('/me', user, { revalidate: false, populateCache: true }),
    mutate('/me/grants'),
  ]);
}

/**
 * Authenticates a user through the Discord surface by sending their authorization code
 * along with Discord-specific metadata to Magic Circle.
 *
 * @param discordSdk - The initialized Discord SDK instance used for authentication
 * @param code - The OAuth2 authorization code received from Discord after user authorization
 * @returns A Promise that resolves to an authentication response containing:
 *          - databaseUser: The user's database record with profile information
 *          - jwt: A JSON Web Token for subsequent authenticated requests
 *          - discordAccessToken: The Discord OAuth2 access token for API access
 * @throws {Error} If the Discord SDK is not properly initialized in the application
 * @throws {StatusError} If the authentication request fails with a specific HTTP status code
 *                      (e.g. 401 for unauthorized, 400 for invalid request)
 */
async function authenticateWithMagicCircleDiscord(
  discordSdk: DiscordSDK,
  code: string
): Promise<MagicCircleAuthenticationResponseDiscord> {
  const request: MagicCircleAuthenticationRequestDiscord = {
    grantRequest: { code },
    activityInstanceId: discordSdk.instanceId,
    guildId: discordSdk.guildId ?? undefined,
  };

  return await post<MagicCircleAuthenticationResponseDiscord>(
    '/user/authenticate-discord',
    request
  );
}

/**
 * Authenticates a user through the web surface by sending their authorization code
 * to Magic Circle. This unified endpoint handles both Discord and Apple authentication.
 *
 * @param request - A discriminated union of authentication requests
 * @returns Promise resolving to the authentication response containing user data
 */
async function authenticateWithMagicCircleWeb(
  request: MagicCircleAuthenticationRequestWeb
): Promise<MagicCircleAuthenticationResponseWeb> {
  return await post<MagicCircleAuthenticationResponseWeb>(
    '/user/authenticate-web',
    request
  );
}
