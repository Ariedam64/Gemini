import type {
  TrioBotDifficulty,
  TrioBotDifficultySetting,
  TrioPoints,
  TrioTimers,
} from '@/common/games/Trio/types';
import type { GameName } from '@/common/types/games';

type ConfigValueSchema =
  | string
  | number
  | boolean
  | ReadonlyArray<ConfigValueSchema>
  | { [key: string]: ConfigValueSchema };

type ConfigKeySchema = `${string}_${string}`;
type ConfigSchema = Readonly<Record<ConfigKeySchema, ConfigValueSchema>>;

export enum GameStatus {
  Hidden = 0,
  Visible = 1,
  ComingSoon = 2,
  New = 3,
  Beta = 4,
}

export const defaults = {
  /**
   * Game statuses
   */
  root_gameStatuses: {
    Quinoa: GameStatus.Visible,
    Kiwi: GameStatus.Visible,
    Jalapeno: GameStatus.Visible,
    Avocado: GameStatus.Visible,
    Trio: GameStatus.Visible,
    Durian: GameStatus.Visible,
    Guava: GameStatus.Visible,
    Farkleberry: GameStatus.Hidden,
  } as Record<GameName, GameStatus>,

  /**
   * Game rankings
   */
  root_gameNamesSorted_Mobile: [
    'Kiwi',
    'Jalapeno',
    'Avocado',
    'Durian',
    'Trio',
    'Guava',
    'Farkleberry',
  ] satisfies GameName[],

  root_gameNamesSorted_Desktop: [
    'Kiwi',
    'Avocado',
    'Trio',
    'Jalapeno',
    'Durian',
    'Guava',
    'Farkleberry',
  ] satisfies GameName[],

  root_dailyGameNamesSorted: [
    'AvocadoMini',
    'Nectarine',
    'Peach',
  ] satisfies GameName[],

  root_grindGameNamesSorted: ['Quinoa'] as GameName[],

  /**
   * Root
   */
  root_ShowStartTimer: true,
  root_bypassMinPlayersCheck: false,
  root_keepToastsOnScreen: false,
  root_animationCompletionTimeout: 10,
  root_animationCompletionCheckInterval: 0.1,
  root_skipFramerMotionAnimations: false,
  root_forceShowPresentables: false,
  root_shouldShowiOSAppUpsell: false,

  discord_skipGuildMemberFetch: false,

  /**
   * Network
   */
  net_heartbeatIntervalSeconds: 4,
  net_secondsAfterLastSeenToDisconnectWhileInLobby: 5,
  net_secondsAfterLastSeenToDisconnectWhileInGame: 8,
  net_secondsAfterHeartbeatExpirationToRemovePlayer: 60,
  net_secondsAfterNonHeartbeatDisconnectionToRemovePlayer: 30,
  // NOTE: We used to NEVER remove players on web if they were in a game, and added this config
  // to allow players in Discord activities to still be removed if their websocket disconnects.
  // As of 01/31/2025, we've changed this to also remove players on web if they disconnect for a
  // certain amount of time. This is partly due to the fact that web players can now play in public rooms as well
  // and we don't want them to stay in a public room indefinitely (and slow down the game for others).
  net_allowPlayerRemovalDuringGameDueToSocketDisconnection: true,

  /**
   * Performance
   */
  perf_pingLogs: false,
  perf_fpsLogs: false,

  /**
   * Chat
   */
  chat_cooldownMessageLimit: 4,
  chat_cooldownTimeWindow: 11,
  chat_characterLimit: 100,

  /**
   * Emote
   */
  emote_emoteCooldownSeconds: 1.5,

  /**
   * Avocado
   */
  avocado_pointsForCorrectGuess: 50,
  avocado_pointsForJudgesChoice: 100,
  avocado_pointsToWin: 500,

  avocado_judgeChoosePromptTime: 15,
  avocado_submissionTime: 45,
  avocado_judgeReadEachAnswerTimer: 5,
  avocado_submissionTimeOnePlayer: 5,
  avocado_choiceTime: 20,
  avocado_animationSpeedMultiplier: 1,
  avocado_outcomeLingerTime: 10,
  avocado_scoreboardTime: 10,

  avocado_submissionMinCharsToShowLimit: 50,
  avocado_submissionCharacterLimit: 120,
  avocado_allowEarlyPromptSubmission: false,

  jalapeno_pointsToWin: 7,
  jalapeno_numWhiteCardsPerPlayer: 5,
  jalapeno_defaultCardDurationSeconds: 1.5,
  jalapeno_showAwardHostControlsDelaySeconds: 4,
  jalapeno_defaultVoiceId: 'N2lVS1w4EtoT3dr4eOWO', // 'Callum' voice ID

  kiwi_pointsToWin: 3,
  kiwi_numWhiteCardsPerPlayer: 5,
  kiwi_defaultCardDurationSeconds: 1.5,
  kiwi_showAwardHostControlsDelaySeconds: 4,
  kiwi_defaultVoiceId: 'N2lVS1w4EtoT3dr4eOWO', // 'Callum' voice ID
  kiwi_showResponsiveTooltips: false,
  kiwi_showDebugBoundingBoxes: false,
  kiwi_maxPrompts: 6,
  /**
   * Durian
   */
  durian_configureTime: 20,
  durian_chooseCategoryTime: 20,
  durian_hintTime: 60,
  durian_timerDisplayThreshForHinting: 45,
  durian_delayBetweenRevealForHints: 2,
  durian_delayBetweenAvatarAndHintForHints: 0.5,
  durian_voteTime: 45,
  durian_timerDisplayThreshForVoting: 30,
  durian_spyRedemptionTime: 21,
  durian_delayBetweenRevealForRedemption: 0.1,
  durian_delayBetweenAvatarAndHintForRedemption: 0,
  durian_endScreenTime: 20,

  /**
   * Farkleberry
   */
  farkleberry_roundTime: 45,
  farkleberry_totalRounds: 3,

  guava_chooseGameModeTime: 15,
  guava_chooseContentPackTime: 15,
  guava_numStartingLifelines: 3,
  guava_pickingWordTime: 20,
  guava_guessingTime: 20,
  guava_revealTime: 10,
  guava_scoreboardTime: 15,
  guava_guessingTimeOnePlayer: 5,
  guava_isGuessingTimed: true,
  guava_delayBetweenWordPickerScreenAndGameBoard: 3,
  guava_competitionPoints: 50,
  guava_pointsToWin: 500,
  guava_lifeLineRewardThresholds: [
    3, 6, 10, 15, 20, 30, 40, 50, 60, 70, 80, 100,
  ],

  /**
   * Trio
   */
  trio_boardWidth: 3,
  trio_boardHeight: 3,
  trio_handSize: 2,
  trio_totalTurns: 20,
  trio_wildsInDeck: 0,
  trio_missedTurnsUntilInactive: 2,

  trio_bot: {
    difficulty: {
      easy: {
        beatsTile: 0,
        tiesTile: 0,

        threeAvailableSlots: 0,
        sixAvailableSlots: 0,
        nineAvailableSlots: 0,

        chaseThreeOfAKind: 1,
        chaseOneOfEach: 1,
        chaseSingle: 1,

        blockThreeOfAKind: 0,
        blockOneOfEach: 0,
      },
      hard: {
        beatsTile: 2,
        tiesTile: 1,

        threeAvailableSlots: 0,
        sixAvailableSlots: 0,
        nineAvailableSlots: 1,

        chaseThreeOfAKind: 4,
        chaseOneOfEach: 3,
        chaseSingle: 2,

        blockThreeOfAKind: 2,
        blockOneOfEach: 1,
      },
    } satisfies Record<TrioBotDifficulty, TrioBotDifficultySetting>,
  },

  trio_points: {
    goal: 6,
    Straight: 3,
    Flush: 2,
    Basic: 1,
  } satisfies TrioPoints,

  trio_timers: {
    MainMenu: 30,
    PlaceTiles: 12,
    RevealPlacements: 0.1,
    ResolveCombatZone: 0.3,
    Battle: 6,
    BattleReveal: 0.5,
    BattleReward: 0.1,
    Scoring: 0.1,
    GameOverTransition: 2,
    GameOver: 0,
  } satisfies TrioTimers,

  /**
   * Testing
   */
  testing_muteMusic: false,
  testing_muteSoundEffects: false,
  testing_alwaysUseStaticAvatars: false,

  peach_isGridDebugEnabled: false,
  peach_isCreativeModeEnabled: false,
  peach_isMapDebugEnabled: false,

  quinoa_disallowAnonymousPlayers: false,
  quinoa_fastForwardWhenNotProduction: false,

  /**
   * ScoreScreen
   */
  ScoreScreen_showBottomRowDelay: 1.5,
} as const satisfies ConfigSchema;

/**
 * This config type will always reflect DEFAULT config values.
 * Runtime values MAY differ, if they have been overriden due to:
 * 1) A /config POST request, which overrides the config for a specific room
 * 2) A local-overrides.json file, which overrides the config for all rooms (when running locally)
 */
export type Config = typeof defaults;
