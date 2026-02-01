// src/features/index.ts
// Entry point for all optional features

export { MGAutoFavorite, AutoFavorite } from "./autoFavorite";
export { MGJournalChecker, JournalChecker } from "./journalChecker";
export { MGBulkFavorite, BulkFavorite } from "./bulkFavorite";
export { MGAchievements } from "./achievements";
export { MGAntiAfk } from "./antiAfk";
export { MGPetTeam } from "./petTeam";
export type { PetTeam } from "./petTeam";
export { MGXPTracker } from "./xpTracker";
export type { PetXpProgress, XpBoostStats, CombinedXpBoostStats, XpTrackerConfig } from "./xpTracker";
export { MGGrowthTimers } from "./growthTimers";
export type { GrowthTimer, BoostInfo, GrowthTimersConfig } from "./growthTimers";
export { MGCropValueIndicator } from "./cropValueIndicator";
export { MGCropSizeIndicator } from "./cropSizeIndicator";
export { MGShopNotifier } from "./shopNotifier";
export type { TrackedItem, ShopNotifierConfig } from "./shopNotifier";
export { MGWeatherNotifier } from "./weatherNotifier";
export type { WeatherNotifierConfig } from "./weatherNotifier/types";
export { MGPetHungerNotifier } from "./petHungerNotifier";
export type { PetHungerNotifier } from "./petHungerNotifier";
export { MGAriesAPI } from "./ariesAPI";
export type {
    AriesAPIConfig,
    Room,
    RoomUserSlot,
    RoomSearchResult,
    PlayerView,
    PlayerViewState,
    PlayerRoomResult,
    PlayerViewSection,
    FriendAction,
    FriendRequestIncoming,
    FriendRequestOutgoing,
    FriendRequestsResult,
} from "./ariesAPI";
export { MGHarvestLocker } from "./harvestLocker";
export type {
    HarvestLockerConfig,
    HarvestRule,
    RuleMode,
    MutationMatchMode,
    SizeCondition,
    MutationCondition,
} from "./harvestLocker";

// Legacy namespaced exports
import { StatsTracker, getStatsTracker, destroyStatsTracker } from "./tracker/stats";
import * as PetStrength from "./pets/strength";
import { AbilityLogger, getAbilityLogger, destroyAbilityLogger } from "./pets/abilityLogger";

export const MGTracker = {
  StatsTracker,
  getStatsTracker,
  destroyStatsTracker,
};

export const MGPets = {
  AbilityLogger,
  getAbilityLogger,
  destroyAbilityLogger,
  ...PetStrength,
};
