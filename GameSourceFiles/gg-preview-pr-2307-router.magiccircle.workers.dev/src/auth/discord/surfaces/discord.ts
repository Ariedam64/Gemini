import type { DiscordSDK } from '@discord/embedded-app-sdk';
import * as Sentry from '@sentry/react';
import { getDefaultStore } from 'jotai';
import { posthog } from 'posthog-js';
import RoomConnection from '@/connection/RoomConnection';
import { closeDiscordActivity } from '@/discord-sdk/utils';
import { DiscordClientId, surface } from '@/environment';
import { isSupportedLocale, setLocaleFromOutsideReact } from '@/localization';
import {
  discordActivityInstanceParticipantUserIdsAtom,
  discordSdkAtom,
  discordSpeakingUsersAtom,
  isDiscordHardwareAccelerationEnabledAtom,
  playerIdAtom,
} from '@/store/store';
import { scopes } from '../scopes';

async function encourageHardwareAccelerationAndSetHardwareAccelerationJotaiAtom() {
  const { set } = getDefaultStore();
  const discordSdk = getDiscordSdkInstance();
  // This API is only available on the web surface as of 09/2024.
  // https://discord.com/developers/docs/developer-tools/embedded-app-sdk#encouragehardwareacceleration
  if (discordSdk.platform !== 'desktop') {
    return;
  }
  const { enabled: isHardwareAccelerationEnabled } =
    await discordSdk.commands.encourageHardwareAcceleration();

  if (!isHardwareAccelerationEnabled) {
    console.warn('Hardware acceleration is disabled');
  } else {
    console.log('Hardware acceleration is enabled');
  }
  // Add a tag to this session in Sentry to track whether hardware acceleration is enabled
  Sentry.setTag(
    'discord_hardware_acceleration_enabled',
    isHardwareAccelerationEnabled
  );
  // Make the hardware acceleration state available via Jotai atom
  set(isDiscordHardwareAccelerationEnabledAtom, isHardwareAccelerationEnabled);
}

async function initializeDiscordSdkInstance(): Promise<DiscordSDK> {
  if (surface !== 'discord') {
    throw new Error(`Discord Embedded SDK is not available on ${surface}`);
  }
  const { get, set } = getDefaultStore();
  let discordSdk: DiscordSDK | undefined;
  discordSdk = get(discordSdkAtom);

  // If the Discord SDK is already initialized, return it
  if (discordSdk) {
    return discordSdk;
  }

  // If the Discord SDK is not initialized, initialize it
  // Note that calling discord.SDK.ready() is not idempotent, and will hang
  // indefinitely on subsequent calls, so we make sure to only call it once by
  // returning the already initialized DiscordSDK instance if it exists.
  const { DiscordSDK } = await import('@discord/embedded-app-sdk');
  discordSdk = new DiscordSDK(DiscordClientId, {
    // We disable the console log override to the Discord SDK intercepting all
    // console logging calls and sending them to the parent window. This
    // behavior exists to make it easier to view debug logs from an activity on
    // mobile (where it's not possible to open the developer tools).
    //
    // However, we use our own logging, and these intercepts also can lead to
    // unhandledpromiserejections if their message is longer than 1000
    // characters, which is the limit for messages over the "bridge", which can
    // cause a lot of errors in production with long log messages.
    // So! If you want to re-enable these logs, I suggest doing so only with a
    // very specific purpose, and ideally not in production.
    disableConsoleLogOverride: true,
  });
  await discordSdk.ready();
  set(discordSdkAtom, discordSdk);
  return discordSdk;
}

function getDiscordSdkInstance() {
  const { get } = getDefaultStore();
  const discordSdkInstance = get(discordSdkAtom);
  if (!discordSdkInstance) {
    throw new Error('Discord SDK not initialized');
  }
  return discordSdkInstance;
}

async function subscribeToParticipantsUpdate() {
  const discordSdk = getDiscordSdkInstance();
  const { set } = getDefaultStore();
  await discordSdk.subscribe(
    'ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE',
    (info) => {
      const participantIds = info.participants.map(
        (participant) => participant.id
      );
      set(discordActivityInstanceParticipantUserIdsAtom, participantIds);
    }
  );
}

async function subscribeToSpeakingEvents() {
  const discordSdk = getDiscordSdkInstance();
  const { get, set } = getDefaultStore();
  const speakingStartSubscription = discordSdk.subscribe(
    'SPEAKING_START',
    (info) => {
      const currentSpeakingUsers = get(discordSpeakingUsersAtom);
      set(discordSpeakingUsersAtom, [...currentSpeakingUsers, info.user_id]);
      const playerId = get(playerIdAtom);
      if (info.user_id === playerId) {
        RoomConnection.getInstance().sendMessage({
          scopePath: ['Room'],
          type: 'ReportSpeakingStart',
        });
      }
    },
    { channel_id: discordSdk.channelId }
  );
  const speakingStopSubscription = discordSdk.subscribe(
    'SPEAKING_STOP',
    (info) => {
      const currentSpeakingUsers = get(discordSpeakingUsersAtom);
      set(
        discordSpeakingUsersAtom,
        currentSpeakingUsers.filter((userId) => userId !== info.user_id)
      );
    },
    { channel_id: discordSdk.channelId }
  );
  await Promise.all([speakingStartSubscription, speakingStopSubscription]);
}

type DiscordAuthorizationError = {
  code: number;
  message: string;
};

/**
 * Type guard for Discord OAuth2 access denied error.
 *
 * @param value - The value to check.
 * @returns True if the value matches the Discord OAuth2 access denied error structure, false otherwise.
 */
function isDiscordAuthorizationError(
  value: unknown
): value is DiscordAuthorizationError {
  return (
    typeof value === 'object' &&
    value !== null &&
    'code' in value &&
    'message' in value
  );
}

function isDiscordAuthorizationErrorUserChoseNotToAuthorize(
  value: unknown
): value is DiscordAuthorizationError {
  // Apparently, if the user denies authorization, we get a 5000 error code.
  const DiscordErrorCodeUserDeniedAuthorization = 5000;
  return (
    isDiscordAuthorizationError(value) &&
    value.code === DiscordErrorCodeUserDeniedAuthorization
  );
}

/**
 * Checks if the error indicates that the Discord token does not match the current user.
 *
 * This error will occur if the user uses the "Switch Accounts" feature to log in
 * to Discord, and then tries to authenticate with a different account. It might
 * occur for other reasons I am not aware of. Doesn't really seem to be much
 * documented.
 *
 * @param value - The error object to check
 * @returns true if the error indicates a token mismatch, false otherwise
 */
function isDiscordErrorTokenDoesNotMatchCurrentUser(
  value: unknown
): value is DiscordAuthorizationError {
  const DiscordErrorCodeTokenDoesNotMatchCurrentUser = 4009;
  return (
    isDiscordAuthorizationError(value) &&
    value.code === DiscordErrorCodeTokenDoesNotMatchCurrentUser
  );
}

export async function requestDiscordAuthorizationCode(): Promise<{
  code: string;
  discordSdk: DiscordSDK;
}> {
  // Note: this must be called before making any calls to our game server,
  // because those require the roomId to construct the URL, which is obtained
  // via the discordSdk's instanceId.
  const discordSdk = await initializeDiscordSdkInstance();
  // Tag future Sentry events with the Discord activity instance ID
  Sentry.setTag('discordActivityInstanceId', discordSdk.instanceId);
  await encourageHardwareAccelerationAndSetHardwareAccelerationJotaiAtom();

  console.log('Discord SDK is ready. Instance ID:', discordSdk.instanceId);

  try {
    const authorizationResponse = await discordSdk.commands.authorize({
      client_id: DiscordClientId,
      response_type: 'code',
      state: '',
      prompt: 'none',
      // We spread because `scope` is a mutable array, and our scopes are a
      // readonly array.
      scope: [...scopes],
    });
    return {
      code: authorizationResponse.code,
      discordSdk,
    };
  } catch (error) {
    const errorMessageJson = JSON.stringify(error);
    if (isDiscordAuthorizationErrorUserChoseNotToAuthorize(error)) {
      console.info(
        'User chose not to authorize the app. Closing activity normally.',
        errorMessageJson
      );
      closeDiscordActivity('User chose not to authorize the app');

      // Wait indefinitely for the Discord activity to close, since we do not
      // want the code calling this function to proceed execution, but we also
      // do not want to throw an error, because this is not an error state.
      return await new Promise<never>(() => {});
    }
    throw error;
  }
}

type Auth = Awaited<
  ReturnType<typeof DiscordSDK.prototype.commands.authenticate>
>;

type AuthenticateWithDiscordResponse =
  | { kind: 'ok'; auth: Auth }
  | { kind: 'token_mismatch'; error: DiscordAuthorizationError };

export async function authenticateWithDiscord(
  discordSdk: DiscordSDK,
  accessToken: string
): Promise<AuthenticateWithDiscordResponse> {
  let auth: Auth;

  try {
    auth = await discordSdk.commands.authenticate({
      access_token: accessToken,
    });
  } catch (error) {
    if (isDiscordErrorTokenDoesNotMatchCurrentUser(error)) {
      return { kind: 'token_mismatch', error };
    }
    throw error;
  }

  void discordSdk.commands
    .userSettingsGetLocale()
    .then(({ locale }) => {
      posthog.setPersonProperties({
        locale,
      });
      // Discord sometimes returns a locale with a country code, e.g.
      // "en-US". We only want the language code, so we slice the first two
      // characters.
      const slicedLocale = locale.slice(0, 2);

      if (isSupportedLocale(locale)) {
        setLocaleFromOutsideReact(locale);
      } else if (isSupportedLocale(slicedLocale)) {
        setLocaleFromOutsideReact(slicedLocale);
      } else {
        console.warn('Unsupported locale from Discord', locale);
      }
    })
    .catch((error) => {
      console.error('DiscordAuth: Error getting user locale', error);
    });
  // Don't await the subscriptions, because we want to return as soon as possible
  void subscribeToParticipantsUpdate().catch(console.error);
  void subscribeToSpeakingEvents().catch(console.error);
  return { kind: 'ok', auth: auth };
}
