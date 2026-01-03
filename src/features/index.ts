// src/features/index.ts
// Entry point for all optional features

export { MGAutoFavorite, AutoFavorite } from "./autoFavorite";
export { MGJournalChecker, JournalChecker } from "./journalChecker";
export { MGBulkFavorite, BulkFavorite } from "./bulkFavorite";
export { MGAchievements } from "./achievements";
export { MGCalculators } from "./calculators";
export { MGAntiAfk } from "./antiAfk";

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
