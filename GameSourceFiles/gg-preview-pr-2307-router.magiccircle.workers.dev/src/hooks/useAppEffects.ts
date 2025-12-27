import { useInterval, useToast } from '@chakra-ui/react';
import { useLingui } from '@lingui/react/macro';
import { differenceInSeconds } from 'date-fns';
import { MotionGlobalConfig } from 'framer-motion';
import { getDefaultStore, useAtom, useSetAtom } from 'jotai';
import { posthog } from 'posthog-js';
import { useEffect, useRef } from 'react';
import {
  playMusic,
  setAllMusicVolume,
  stopPlayingAllMusic,
} from '@/audio/legacy/music/music';
import { musicUrls } from '@/audio/legacy/music/musicUrls';
import { setAllSoundEffectsVolume } from '@/audio/legacy/soundEffects/soundEffect';
import { populateSwrCache, signIn } from '@/auth/signIn';
import { getIsRewardDay } from '@/common/streaks';
import { getNextUTCDate, getStartOfTodayUTC } from '@/common/utils';
import { setIsGameWindowFullScreen } from '@/components/GameWindow/store';
import { useTextSlapper } from '@/components/SlapperText/hooks';
import {
  shouldTriggerStreakAnimationAtom,
  targetStreakTimeAtom,
} from '@/components/Streak/store';
import { useStreak } from '@/components/Streak/useStreak';
import { useConfig } from '@/config';
import {
  useIsConnected,
  useRoomConnection,
  useSendRoomMessage,
} from '@/connection/hooks';
import { environment, surface } from '@/environment';
import gameMetaDatas from '@/games/gameMetaDatas';
import { useIsGameStarting, useSelectedGame } from '@/room/hooks';
import {
  authenticationFailureAtom,
  isMusicMuteAtom,
  isSoundEffectsMuteAtom,
  isUserAuthenticatedAtom,
  useActiveGame,
  useCurrentGameName,
  useSetActiveGame,
  useSetIsConnectionIssuesModalOpen,
} from '@/store/store';
import { useAppleDeepLinkListener } from './useAppleDeepLinkListener';
import { useIOSAuthFailureHandler } from './useIOSAuthFailureHandler';
import { useIsHost } from './useIsHost';
import useStripQueryParams from './useStripQueryParams';

function useMcDesktopClientEffects() {
  const activeGame = useActiveGame();
  try {
    (
      window as unknown as { mc_desktop_current_game_name: string | undefined }
    ).mc_desktop_current_game_name = (
      gameMetaDatas[activeGame].name as {
        props: { message: string };
      }
    ).props.message;
  } catch (error) {
    console.error(
      '[useAppEffects] Error setting mc_desktop_current_game_name',
      error
    );
  }
}

function useAppEffects() {
  const roomConnection = useRoomConnection();
  const isConnected = useIsConnected();
  const isGameStarting = useIsGameStarting();
  const isHost = useIsHost();
  const selectedGame = useSelectedGame();
  const currentGameName = useCurrentGameName();
  const activeGame = useActiveGame();
  const toast = useToast();
  const config = useConfig();
  const isMounted = useRef(false);
  const [targetStreakTime, setTargetStreakTime] = useAtom(targetStreakTimeAtom);

  useMcDesktopClientEffects();
  useIOSAuthFailureHandler();
  useAppleDeepLinkListener();

  const { streakState, mutate: mutateStreak } = useStreak();
  const { t } = useLingui();
  const { slapText } = useTextSlapper();
  const sendRoomMessage = useSendRoomMessage();
  const setIsConnectionIssuesModalOpen = useSetIsConnectionIssuesModalOpen();
  const setActiveGame = useSetActiveGame();
  const stripQueryParams = useStripQueryParams();
  const setIsUserAuthenticated = useSetAtom(isUserAuthenticatedAtom);
  const setShouldTriggerStreakAnimation = useSetAtom(
    shouldTriggerStreakAnimationAtom
  );
  // Disable framer motion animations in playwright tests and also when the user
  // has reduced animation preference enabled
  useEffect(() => {
    MotionGlobalConfig.skipAnimations = config.root_skipFramerMotionAnimations;
  }, [config.root_skipFramerMotionAnimations]);
  /**
   * App Mounted
   */
  useEffect(() => {
    const mount = async () => {
      // Ensure that the useEffect that runs the first time is only run once.
      if (isMounted.current) {
        return;
      }
      isMounted.current = true;

      const user = await signIn();
      // If the user is not null, we are signed in
      if (user) {
        posthog.identify(user.id);
        if (
          surface === 'webview' &&
          window.webkit?.messageHandlers?.setUserId
        ) {
          window.webkit.messageHandlers.setUserId.postMessage(user.id);
        }
        setIsUserAuthenticated(true);
        void populateSwrCache(user).catch((error) => {
          console.error('[useAppEffects] Error populating SWR cache', error);
        });
      }
      if (window.location.search.includes('error=true')) {
        throw new Error('Some test error');
      }
      stripQueryParams();
      roomConnection.connect();
    };

    void mount().catch((error) => {
      getDefaultStore().set(
        authenticationFailureAtom,
        error instanceof Error ? error.stack : error
      );
      throw error;
    });
  }, []);

  /*
   * Start background music
   */
  useEffect(() => {
    const musicFile =
      currentGameName === 'Lobby'
        ? activeGame === 'Peach'
          ? gameMetaDatas[activeGame].music
          : musicUrls.LobbyMusic
        : gameMetaDatas[currentGameName].music;

    if (musicFile && isConnected) {
      playMusic(musicFile);
    }
    return () => {
      stopPlayingAllMusic();
    };
  }, [currentGameName, activeGame, isConnected]);

  useEffect(() => {
    const { set } = getDefaultStore();
    if (environment === 'Local') {
      // note that this overrides local storage of mute settings
      set(isMusicMuteAtom, config.testing_muteMusic);
      set(isSoundEffectsMuteAtom, config.testing_muteSoundEffects);
    }
    setAllMusicVolume();
    setAllSoundEffectsVolume();
  }, [config.testing_muteMusic, config.testing_muteSoundEffects]);

  /*
   * Game Started
   */
  useEffect(() => {
    if (currentGameName === 'Lobby') {
      setIsGameWindowFullScreen(false);
      setIsConnectionIssuesModalOpen(true);
    } else {
      // When the game starts, close all the toasts because they can cover important
      // game content (not only causing confusion for players, but also possibly
      // breaking playwright integrations tests)
      toast.closeAll({
        positions: ['top'],
      });
      setActiveGame(currentGameName);
      setIsGameWindowFullScreen(true);
    }
  }, [currentGameName]);

  useEffect(() => {
    if (!isGameStarting || !selectedGame) {
      return;
    }
    const caption = isHost ? t`Starting game!` : t`Game is starting!`;
    void slapText(caption).catch(console.error);
    setActiveGame(selectedGame);
  }, [isGameStarting]);

  useEffect(() => {
    const gameName = activeGame;
    sendRoomMessage({ type: 'VoteForGame', gameName });
    if (isHost) {
      sendRoomMessage({
        type: 'SetSelectedGame',
        gameName,
      });
    }
  }, [activeGame]);

  /**
   * @effect Streak Rollover
   * @description Checks every second if the UTC day has rolled over. When it does,
   * optimistically updates the streak to the next day and triggers the animation.
   */
  useInterval(() => {
    const currentTime = new Date();
    const timeRemaining = differenceInSeconds(targetStreakTime, currentTime);
    if (timeRemaining <= 0) {
      setTargetStreakTime(getNextUTCDate(getStartOfTodayUTC()));
      // If user had an active streak, optimistically update to next day
      if (streakState?.status === 'active') {
        const newStreakCount = streakState.streakCount + 1;
        const isRewardDay = getIsRewardDay(newStreakCount);
        void mutateStreak(
          {
            streakState: {
              status: 'active',
              streakCount: newStreakCount,
              isRewardDay,
            },
          },
          { revalidate: false }
        );
        setShouldTriggerStreakAnimation(true);
      }
    }
  }, 1000);
}

export default useAppEffects;
