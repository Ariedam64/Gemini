import type { DiscordSDK } from '@discord/embedded-app-sdk';
import {
  atom,
  getDefaultStore,
  useAtom,
  useAtomValue,
  useSetAtom,
} from 'jotai';
import { atomFamily } from 'jotai/utils';
import { isEqual } from 'lodash';
import { useCallback, useMemo, useRef } from 'react';
import defaultPlayer from 'src/constants/default-player';
import { emptyQuinoaData } from '@/common/games/Quinoa/emptyQuinoaData';
import type { QuinoaData } from '@/common/games/Quinoa/types';
import type { RoomData } from '@/common/games/Room/types';
import { Identifiers } from '@/common/identifiers';
import { generateRandomDefaultUserStyle } from '@/common/resources/avatars/generateRandomDefaultUserStyle';
import type { GameName, GameNameIncludingLobby } from '@/common/types/games';
import type Player from '@/common/types/player';
import type { PlayerId, PlayerOrId } from '@/common/types/player';
import type { IState } from '@/common/types/state';
import type { UnboundUserStyle } from '@/common/types/user';
import type { Immutable } from '@/common/utils';
import { AvatarRiveFileCache } from '@/components/Avatars/AvatarRiveFileCache';
import type { DrawerType } from '@/components/SystemDrawer/Content';
import { getDecoration } from '@/constants/decorations';
import { environment, surface } from '@/environment';
import { useRoomData } from '@/hooks';
import { useUser } from '@/user';
import { post } from '@/utils';
import { RiveFileCache } from '@/utils/RiveFileCache';
import { persistedAtom, selectAtomDeepEquals } from './utils';

const searchParams = new URL(window.location.href).searchParams;
const queryParams = Object.fromEntries(searchParams.entries());
export const queryParametersAtom = atom<Record<string, string>>(queryParams);
export const useQueryParameters = () => useAtomValue(queryParametersAtom);
export const isLoadingAnimationVisibleAtom = atom(true);

/*
 * gameState
 */
export const stateAtom = atom<Immutable<IState<RoomData>>>({
  scope: 'Room',
  data: {
    dateRoomCreated: Date.now(),
    dateGameBegan: Date.now(),
    players: [],
    bots: [],
    timer: {
      name: null,
      totalSeconds: 0,
      secondsRemaining: 0,
      progress: 0,
      rate: 1,
      isRunning: false,
      isPaused: false,
    },
    isGameStarting: false,
    animationInProgress: false,
    hostPlayerId: null,
    roomSessionId: '',
    chat: {
      messages: [],
      playerCosmeticInfos: {},
    },
    isRegionSupportedByOpenAI: undefined,
    selectedGame: 'Quinoa',
    gameVotes: {},
  },
  child: {
    scope: 'Quinoa',
    data: { ...emptyQuinoaData },
    child: null,
  } satisfies IState<QuinoaData>,
} satisfies IState<RoomData>);

export const useGameState = () => useAtomValue(stateAtom);

/*
 * playerId
 */
export const playerIdAtom = persistedAtom<PlayerId>(
  'playerId',
  // When running in Discord, we use a temporary player ID until the user is
  // authenticated and we know their actual Discord user ID, which we then use
  // as the player ID.
  // We set this meaningless temp value to make it clear that the player ID is
  // not known until the user is authenticated.
  // For web and webview (iOS), generate a player ID that persists in localStorage.
  surface === 'web' || surface === 'webview'
    ? Identifiers.generatePlayerId()
    : defaultPlayer.id,
  {
    // validateValueFromStorage:
    //   surface === 'web' || surface === 'webview'
    //     ? Identifiers.isValidWebPlayerId
    //     : undefined,
  }
);
export const usePlayerId = () => useAtomValue(playerIdAtom);

export const anonymousUserStyleAtom = persistedAtom<UnboundUserStyle>(
  'anonymousUserStyle',
  generateRandomDefaultUserStyle()
);

/*
 * roomSessionId
 */
export const roomSessionIdAtom = selectAtomDeepEquals(
  stateAtom,
  ({ data }) => data.roomSessionId
);

const hostPlayerIdAtom = selectAtomDeepEquals(
  stateAtom,
  ({ data }) => data.hostPlayerId
);

export const useHostPlayerId = () => useAtomValue(hostPlayerIdAtom);

export const useHost = () => {
  const players = usePlayers();
  const hostPlayerId = useHostPlayerId();
  return players.find((p) => p.id === hostPlayerId);
};

export const isHostAtom = atom<boolean | null>((get) => {
  const hostPlayerId = get(hostPlayerIdAtom);
  const playerId = get(playerIdAtom);
  // If there is no host, such as before we've connected to the server, return null
  if (!hostPlayerId) return null;
  return hostPlayerId === playerId;
});

/*
 * player
 */
export const playerAtom = atom<Player>((get) => {
  const playerId = get(playerIdAtom);
  const allPlayers = get(playersAtom);
  const player = allPlayers.find((p) => p.id === playerId);
  return player ?? defaultPlayer;
});
export const usePlayer = () => useAtomValue(playerAtom);

const cosmeticAtom = selectAtomDeepEquals(
  playerAtom,
  (player) => player.cosmetic
);
export const useCosmetic = () => useAtomValue(cosmeticAtom);

export const avatarAtom = selectAtomDeepEquals(
  cosmeticAtom,
  (cosmetic) => cosmetic.avatar
);

export const useAvatar = () => useAtomValue(avatarAtom);

const playerNameAtom = selectAtomDeepEquals(
  playerAtom,
  (player) => player.name
);
export const usePlayerName = () => useAtomValue(playerNameAtom);

export const colorAtom = selectAtomDeepEquals(
  cosmeticAtom,
  (cosmetic) => cosmetic.color
);
export const useColor = () => useAtomValue(colorAtom);
export const useUserColor = () => {
  const color = useColor();
  return getDecoration(color);
};

/*
 * players
 */
export const playersAtom = selectAtomDeepEquals(
  stateAtom,
  ({ data }) => data.players
);

export const numPlayersAtom = atom((get) => get(playersAtom).length);

export const useNumPlayers = () => useAtomValue(numPlayersAtom);

export const usePlayers = () => useAtomValue(playersAtom);

export const usePlayerById = (id: PlayerId | null | undefined) => {
  const players = usePlayers();
  return players.find((p) => p.id === id);
};

export const usePlayerByPlayerOrId = (playerOrId: PlayerOrId) => {
  const players = usePlayers();
  if (typeof playerOrId === 'string') {
    const player = players.find((p) => p.id === playerOrId);
    return player;
  }
  return playerOrId;
};

export const usePlayersMeFirst = () => {
  const me = usePlayer();
  const others = usePlayers().filter((p) => p.id !== me.id);
  return [me, ...others].filter((p) => !!p);
};

/*
 * bots
 */
export const botsAtom = selectAtomDeepEquals(
  stateAtom,
  ({ data }) => data.bots
);

export const useBots = () => useAtomValue(botsAtom);

export const useBotsAndPlayers = () => {
  const bots = useBots();
  const players = usePlayers();
  return [...bots, ...players];
};

export const useBotByPlayerOrId = (playerOrId: PlayerOrId) => {
  const bots = useBots();
  if (typeof playerOrId === 'string') {
    const bot = bots.find((p) => p.id === playerOrId);
    return bot;
  }
};

export const useBotOrPlayerByPlayerOrId = (playerOrId: PlayerOrId) => {
  const player = usePlayerByPlayerOrId(playerOrId);
  const bot = useBotByPlayerOrId(playerOrId);
  return player || bot;
};

export const accountCreationMiniModalAtom = atom(false);

export function useOpenAccountCreationMiniModal() {
  const setIsOpen = useSetAtom(accountCreationMiniModalAtom);
  return useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);
}

/*
 * drawerType
 */
export const drawerTypeAtom = atom<DrawerType | null>(null);
export const useDrawerType = () => useAtomValue(drawerTypeAtom);

export function useOpenDrawer() {
  // Don't use useIsHost here, as it creates a circular dependency
  const setDrawerType = useSetAtom(drawerTypeAtom);
  return useCallback(
    (drawerType: DrawerType) => {
      setDrawerType(drawerType);
    },

    [setDrawerType]
  );
}

export function useCloseDrawer() {
  const setDrawerType = useSetAtom(drawerTypeAtom);
  return () => {
    setDrawerType(null);
  };
}

/**
 * SlapperContent
 */
const slapperContentAtom = atom<React.ReactNode>(null);
export const useSlapperContent = () => useAtomValue(slapperContentAtom);
export const useSetSlapperContent = () => useSetAtom(slapperContentAtom);

/*
 * currentGameName
 */
export const currentGameNameAtom = selectAtomDeepEquals(
  stateAtom,
  (state) => (state.child?.scope as GameNameIncludingLobby) ?? 'Quinoa'
);

/**
 * Returns the current game name, defaulting to 'Quinoa' if the gameName is null (e.g., before we've connected to the server).
 */
export const useCurrentGameName = () => useAtomValue(currentGameNameAtom);

export const activeGameAtom = atom<GameName>('Quinoa');
export const useActiveGame = () => useAtomValue(activeGameAtom);
export const useSetActiveGame = () => useSetAtom(activeGameAtom);
export const setActiveGame = (gameName: GameName) => {
  getDefaultStore().set(activeGameAtom, gameName);
};

export const discordSdkAtom = atom<DiscordSDK | undefined>(undefined);

/**
 * Store the Discord access token client-side to authenticate specific Discord API requests;
 * e.g., fetching attachment URLs from Discord CDN when using the share moment functionality.
 * The alternative would be to make the request from the server side, but we chose to do it
 * client-side to avoid a round-trip to the server (especailly since it's just fetching a URL for now).
 *
 * For more information, see Discord's documentation:
 * https://discord.com/developers/docs/activities/development-guides
 */
export const discordAccessTokenAtom = atom<string | undefined>(undefined);
export const useDiscordAccessToken = () => useAtomValue(discordAccessTokenAtom);

export const jwtAtom = persistedAtom<string | undefined>('jwt', undefined, {
  persistInitialValue: false,
});

export const desktopWindowScaleFactorAtom = atom(1);
export const useDesktopWindowScaleFactor = () =>
  useAtomValue(desktopWindowScaleFactorAtom);
export const useSetDesktopWindowScaleFactor = () =>
  useSetAtom(desktopWindowScaleFactorAtom);

/**
 * Audio settings
 */

function validateVolume(valueFromStorage: unknown): boolean {
  return (
    typeof valueFromStorage === 'number' &&
    valueFromStorage >= 0 &&
    valueFromStorage <= 1
  );
}

function validateBooleanValue(valueFromStorage: unknown): boolean {
  return typeof valueFromStorage === 'boolean';
}

export const soundEffectsVolumeAtom = persistedAtom(
  'soundEffectsVolumeAtom',
  0.1,
  { validateValueFromStorage: validateVolume }
);

export const useSoundEffectsVolume = () => useAtomValue(soundEffectsVolumeAtom);
export const useSetSoundEffectsVolume = () =>
  useSetAtom(soundEffectsVolumeAtom);

export const musicVolumeAtom = persistedAtom(
  'musicVolumeAtom',
  0.004, //isDesktopMode ? 0.04 : 0.02, // If mobile, set default volume to 0.02 since it may be annoying for music to be playing from multiple phones in-person
  { validateValueFromStorage: validateVolume }
);
export const useMusicVolume = () => useAtomValue(musicVolumeAtom);
export const useSetMusicVolume = () => useSetAtom(musicVolumeAtom);

export const ambienceVolumeAtom = persistedAtom(
  'ambienceVolumeAtom',
  0.004, //isDesktopMode ? 0.04 : 0.02, // If mobile, set default volume to 0.02 since it may be annoying for music to be playing from multiple phones in-person
  { validateValueFromStorage: validateVolume }
);
export const useAmbienceVolume = () => useAtomValue(ambienceVolumeAtom);
export const useSetAmbienceVolume = () => useSetAtom(ambienceVolumeAtom);

export const isSoundEffectsMuteAtom = persistedAtom(
  'isSoundEffectsMuteAtom',
  false,
  { validateValueFromStorage: validateBooleanValue }
);
export const useIsSoundEffectsMute = () => useAtomValue(isSoundEffectsMuteAtom);
export const useSetIsSoundEffectsMute = () =>
  useSetAtom(isSoundEffectsMuteAtom);

export const isAmbienceMuteAtom = persistedAtom('isAmbienceMuteAtom', false, {
  validateValueFromStorage: validateBooleanValue,
});
export const useIsAmbienceMute = () => useAtomValue(isAmbienceMuteAtom);
export const useSetIsAmbienceMute = () => useSetAtom(isAmbienceMuteAtom);

export const isMusicMuteAtom = persistedAtom('isMusicMuteAtom', false, {
  validateValueFromStorage: validateBooleanValue,
});
export const useIsMusicMute = () => useAtomValue(isMusicMuteAtom);
export const useSetIsMusicMute = () => useSetAtom(isMusicMuteAtom);

export const playAudioInBackgroundAtom = persistedAtom(
  'playAudioInBackground',
  true,
  { validateValueFromStorage: validateBooleanValue }
);
export const usePlayAudioInBackground = () =>
  useAtomValue(playAudioInBackgroundAtom);
export const useSetPlayAudioInBackground = () =>
  useSetAtom(playAudioInBackgroundAtom);

export const isDiscordHardwareAccelerationEnabledAtom = atom<boolean | null>(
  null
);
export const useIsDiscordHardwareAccelerationEnabled = () =>
  useAtomValue(isDiscordHardwareAccelerationEnabledAtom);

export const authenticationFailureAtom = atom<unknown>(false);

export const discordSpeakingUsersAtom = atom<string[]>([]);

export const discordActivityInstanceParticipantUserIdsAtom = atom<string[]>([]);

export function usePlayersInDiscordActivityInstance() {
  const players = usePlayers();
  const discordActivityInstanceParticipantUserIds = useAtomValue(
    discordActivityInstanceParticipantUserIdsAtom
  );
  return players.filter((player) => {
    // Note: we assume that the player's ID is their Discord user ID
    // This should always be true for users playing on the discord surface,
    // which is the only place this hook is used.
    const playerDiscordId = player.id;
    return discordActivityInstanceParticipantUserIds.includes(playerDiscordId);
  });
}

/**
 * Hook to determine if a Discord user is currently speaking.
 *
 * This hook checks if the specified user is speaking on Discord. It will return
 * false on non-Discord platforms or if the user doesn't have permission to
 * access the target player's voice activity (e.g., they are muted).
 *
 * @param {PlayerOrId} playerOrId - The player or player ID to check.
 * @returns {boolean} - Returns true if the user is speaking, false otherwise.
 *
 * @example
 * const isSpeaking = useIsUserSpeaking(playerOrId);
 */
export const useIsUserSpeaking = (playerOrId: PlayerOrId): boolean => {
  const player = usePlayerByPlayerOrId(playerOrId);
  const speakingUsers = useAtomValue(discordSpeakingUsersAtom);
  if (!player) return false;
  // Note: we assume that the player's ID is their Discord user ID
  // This should always be true for users playing on the discord surface,
  // which is the only place this hook is used.
  const discordUserId = player.id;
  return speakingUsers.includes(discordUserId);
};

export const isBreadToasterWindowOpenAtom = atom(false);
export const useIsBreadToasterWindowOpen = () =>
  useAtomValue(isBreadToasterWindowOpenAtom);
export const useSetIsBreadToasterWindowOpen = () =>
  useSetAtom(isBreadToasterWindowOpenAtom);

export const avatarRefCountsAtomFamily = atomFamily((_playerId: PlayerId) => {
  return atom(0);
}, isEqual);

/**
 * Hook to manage reference counting for avatar components.
 *
 * This hook provides utilities to track how many instances of an avatar are currently
 * being rendered for a specific player. It ensures accurate counting by using a ref
 * to prevent multiple increments/decrements from the same component instance.
 *
 * @param {PlayerId} playerId - The ID of the player whose avatar references are being tracked
 * @returns An object containing:
 *   - refCount: The current number of active avatar references for this player
 *   - retain: Function to increment the reference count
 *   - release: Function to decrement the reference count
 *
 * @example
 * const { refCount, retain, release } = useAvatarRefCount(playerId);
 *
 * useEffect(() => {
 *   retain(); // Increment ref count when component mounts
 *   return () => release(); // Decrement ref count when component unmounts
 * }, []);
 */
export const useAvatarRefCount = (playerId: PlayerId) => {
  // Use a ref to ensure we don't increment the ref counter multiple times for
  // the same component.
  const isRetainedByThisComponent = useRef(false);
  const [refCount, setRefCount] = useAtom(avatarRefCountsAtomFamily(playerId));

  const { retain, release } = useMemo(
    () => ({
      retain: () => {
        if (!playerId) return;
        setRefCount((prevCount) => {
          // Prevent multiple increments from the same component.
          if (isRetainedByThisComponent.current) return prevCount;
          isRetainedByThisComponent.current = true;
          return prevCount + 1;
        });
      },
      release: () => {
        if (!playerId) return;
        setRefCount((prevCount) => {
          // Prevent multiple decrements from the same component.
          if (!isRetainedByThisComponent.current) return prevCount;
          isRetainedByThisComponent.current = false;
          return Math.max(0, prevCount - 1);
        });
      },
    }),
    [setRefCount]
  );

  return {
    refCount,
    retain,
    release,
  };
};

export const isUserAuthenticatedAtom = atom(false);

// Credits balance atom that uses the existing SWR hook
export const creditsBalanceAtom = atom<number>(0);
export const lastTimeCreditsBalanceWasSetAtom = atom<number>(0);

export const useIsUserAuthenticated = () =>
  useAtomValue(isUserAuthenticatedAtom);

export const useCreditsBalanceFromStore = () =>
  useAtomValue(creditsBalanceAtom);

export const useIsDeveloper = () => {
  const { user } = useUser();
  return user?.isDeveloper || environment === 'Local';
};

export const useIsModeratorOrDeveloper = () => {
  const { user } = useUser();
  const isDeveloper = useIsDeveloper();
  return user?.isModerator || isDeveloper;
};

const isOneTimeRewardsModalOpenAtom = atom(false);

export const useIsOneTimeRewardsModalOpen = () =>
  useAtomValue(isOneTimeRewardsModalOpenAtom);

export const useSetIsOneTimeRewardsModalOpen = () =>
  useSetAtom(isOneTimeRewardsModalOpenAtom);

export const mutedPlayersAtom = atom<PlayerId[]>([]);

export const useMutedPlayers = () => useAtomValue(mutedPlayersAtom);

export const useToggleMutedPlayer = () => {
  const setMutedPlayers = useSetAtom(mutedPlayersAtom);
  return (playerId: PlayerId) => {
    setMutedPlayers((prev) =>
      prev.includes(playerId)
        ? prev.filter((id) => id !== playerId)
        : [...prev, playerId]
    );
  };
};

export const useIsPlayerMuted = (playerId: PlayerId) => {
  const mutedPlayers = useMutedPlayers();
  return mutedPlayers.includes(playerId);
};

const isReportPlayerModalOpenAtom = atom(false);

export const useIsReportPlayerModalOpen = () =>
  useAtomValue(isReportPlayerModalOpenAtom);

export const useSetIsReportPlayerModalOpen = () =>
  useSetAtom(isReportPlayerModalOpenAtom);

export const useOpenReportPlayerModal = () => {
  const setIsReportPlayerModalOpen = useSetIsReportPlayerModalOpen();
  return () => {
    setIsReportPlayerModalOpen(true);
  };
};

export const useCloseReportPlayerModal = () => {
  const setIsReportPlayerModalOpen = useSetIsReportPlayerModalOpen();
  return () => {
    setIsReportPlayerModalOpen(false);
  };
};

export const inappropriateContentAtom = atom<
  | {
      content: string;
      reason: string;
    }
  | undefined
>(undefined);

const numUnreadMessagesAtom = atom(0);

export const useNumUnreadMessages = () => useAtomValue(numUnreadMessagesAtom);
export const useSetNumUnreadMessages = () => useSetAtom(numUnreadMessagesAtom);

/**
 * Atom that exposes the latest chat message list from the canonical room state.
 *
 * @remarks
 * We memoize via {@link selectAtomDeepEquals} so downstream consumers (React and
 * Pixi systems) only see updates when the chat payload actually changes,
 * avoiding redundant re-filters across renders.
 */
export const chatMessagesAtom = selectAtomDeepEquals(
  stateAtom,
  ({ data }) => data.chat.messages
);

/**
 * Atom containing cosmetic metadata for the users currently in chat.
 *
 * @remarks
 * This mirrors the structure received from the room state and is primarily
 * consumed by UI that needs to decorate chat entries with avatar previews.
 */
export const playerCosmeticInfosAtom = selectAtomDeepEquals(
  stateAtom,
  ({ data }) => data.chat.playerCosmeticInfos
);

/**
 * Derived atom that filters muted players out of the chat message stream.
 *
+ * @remarks
 * Centralizing this computation means the filtering happens once whenever
 * `chatMessagesAtom` or `mutedPlayersAtom` changes, rather than every component
 * render. `AvatarViewManager` also subscribes here directly via the base store
 * to drive in-world chat bubbles without touching React hooks.
 *
 * @returns Chat messages that the local user is allowed to see.
 */
export const filteredMessagesAtom = atom((get) => {
  const messages = get(chatMessagesAtom);
  const mutedPlayers = get(mutedPlayersAtom);
  return messages.filter((message) => !mutedPlayers.includes(message.playerId));
});

/**
 * React hook wrapper around {@link filteredMessagesAtom}.
 *
 * @remarks
 * Use this hook inside components instead of re-implementing the filter logic.
 * Non-React subsystems (e.g., Pixi managers) should read the atom directly from
 * `getDefaultStore()` to share the same memoized data.
 */
export const useFilteredMessages = () => useAtomValue(filteredMessagesAtom);

const isConnectionIssuesModalOpenAtom = atom(true);

export const useIsConnectionIssuesModalOpen = () =>
  useAtomValue(isConnectionIssuesModalOpenAtom);

export const useSetIsConnectionIssuesModalOpen = () =>
  useSetAtom(isConnectionIssuesModalOpenAtom);

/**
 * Atom containing the global instance of RiveFileCache.
 */
const riveFileCacheAtom = atom(new RiveFileCache());

export function useRiveFileCache() {
  return useAtomValue(riveFileCacheAtom);
}

const avatarRiveFileCacheAtom = atom(new AvatarRiveFileCache());

export function useAvatarRiveFileCache() {
  return useAtomValue(avatarRiveFileCacheAtom);
}

function validateRenderScale(value: unknown): boolean {
  return value === 'auto' || (typeof value === 'number' && value > 0);
}

export const renderScalePreferenceAtom = persistedAtom<number | 'auto'>(
  'renderScale',
  'auto',
  { validateValueFromStorage: validateRenderScale }
);

export const useRenderScalePreference = () =>
  useAtomValue(renderScalePreferenceAtom);
export const useSetRenderScalePreference = () =>
  useSetAtom(renderScalePreferenceAtom);

export const isNarrationEnabledAtom = atom(false);

export const useIsNarrationEnabled = () => useAtomValue(isNarrationEnabledAtom);

export const useSetIsNarrationEnabled = () =>
  useSetAtom(isNarrationEnabledAtom);

/**
 * Hook to get and set the user's daily streak reminder opt-out preference
 * @returns A tuple containing the current opt-out state and a function to update it
 */
export const useDailyStreakReminderPreference = () => {
  const { user, mutateUser } = useUser();
  const isOptedOut = user?.isOptedOutOfDailyStreakReminder;

  const setIsOptedOut = async (value: boolean) => {
    await post(`/user/${user?.id}/opt-out-daily-streak-reminder`, {
      optedOut: value,
    });
    if (!user) return;
    void mutateUser(
      { ...user, isOptedOutOfDailyStreakReminder: value },
      { revalidate: false, populateCache: true }
    );
  };

  return [isOptedOut, setIsOptedOut] as const;
};

/**
 * Hook to check if the current region is supported by OpenAI
 * @returns {boolean} Whether the region is supported by OpenAI. Returns false if the data hasn't been fetched yet
 */
export const useIsRegionSupportedByOpenAI = () => {
  const isRegionSupportedByOpenAI = useRoomData(
    (data) => data.isRegionSupportedByOpenAI
  );
  return isRegionSupportedByOpenAI ?? false;
};

export const isDocumentHiddenAtom = atom(document.hidden);

export const framesPerSecondLimitAtom = persistedAtom<number>(
  'framesPerSecondLimit',
  30
);

export const useFramesPerSecondLimit = () =>
  useAtomValue(framesPerSecondLimitAtom);
export const useSetFramesPerSecondLimit = () =>
  useSetAtom(framesPerSecondLimitAtom);
