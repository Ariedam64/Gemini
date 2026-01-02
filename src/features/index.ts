// src/features/index.ts
// Entry point for all optional features

export { MGAutoFavorite, AutoFavorite } from "./autoFavorite";
export { MGJournalChecker, JournalChecker } from "./journalChecker";
export { MGBulkFavorite, BulkFavorite } from "./bulkFavorite";
export { MGAchievements } from "./achievements";

// Legacy namespaced exports
import { StatsTracker, getStatsTracker, destroyStatsTracker } from "./tracker/stats";

export const MGTracker = {
  StatsTracker,
  getStatsTracker,
  destroyStatsTracker,
};
