// src/modules/index.ts
// Main entry point for all MG modules

// Core modules
export { MGVersion } from "./core/version";
export { MGAssets } from "./core/assets";
export { MGManifest } from "./core/manifest";
export { MGData } from "./core/data";
export { MGEnvironment } from "./core/environment";
export { MGCustomModal } from "./core/customModal";

// Pixi modules
export { MGPixiHooks } from "./pixi/hooks";
export { MGSprite } from "./sprite";
export { MGTile } from "./pixi/tile";
export { MGPixi } from "./pixi/pixi";

// Media modules
export { MGAudio } from "./media/audio";
export { MGCosmetic } from "./media/cosmetic";

// Re-export features for backward compatibility
export { MGAutoFavorite, AutoFavorite } from "../features/autoFavorite";
export { MGJournalChecker, JournalChecker } from "../features/journalChecker";
export { MGBulkFavorite, BulkFavorite } from "../features/bulkFavorite";
export { MGAchievements } from "../features/achievements";
export { MGCalculators } from "../features/calculators";
export { MGAntiAfk } from "../features/antiafk";
export { MGPets, MGTracker } from "../features";

// Shared utilities
export * as Shared from "./shared";

// Re-import for initialization
import { MGData } from "./core/data";
import { MGCustomModal } from "./core/customModal";
import { MGSprite } from "./sprite";
import { MGTile } from "./pixi/tile";
import { MGPixi } from "./pixi/pixi";
import { MGAudio } from "./media/audio";
import { MGCosmetic } from "./media/cosmetic";
import { MGAntiAfk } from "../features/antiafk";
import { MGAutoFavorite } from "../features/autoFavorite";
import { MGJournalChecker } from "../features/journalChecker";
import { MGBulkFavorite } from "../features/bulkFavorite";
import { MGAchievements } from "../features/achievements";

export type ModuleInitProgress = {
  name: string;
  status: "start" | "success" | "error";
  error?: unknown;
};

export async function initAllModules(
  onProgress?: (progress: ModuleInitProgress) => void
): Promise<void> {
  const tasks = [
    { name: "Data", init: () => MGData.init() },
    { name: "AntiAfk", init: () => MGAntiAfk.init() },
    { name: "CustomModal", init: () => MGCustomModal.init() },
    { name: "Sprites", init: () => MGSprite.init() },
    { name: "TileObjectSystem", init: () => MGTile.init() },
    { name: "Pixi", init: () => MGPixi.init() },
    { name: "Audio", init: () => MGAudio.init() },
    { name: "Cosmetics", init: () => MGCosmetic.init() },
    { name: "AutoFavorite", init: () => MGAutoFavorite.init() },
    { name: "JournalChecker", init: () => MGJournalChecker.init() },
    { name: "BulkFavorite", init: () => MGBulkFavorite.init() },
    { name: "Achievements", init: () => MGAchievements.init() },
  ];

  await Promise.all(
    tasks.map(async (entry) => {
      onProgress?.({ status: "start", name: entry.name });
      try {
        await entry.init();
        onProgress?.({ status: "success", name: entry.name });
      } catch (e) {
        console.error(`[${entry.name}] failed`, e);
        onProgress?.({ status: "error", name: entry.name, error: e });
      }
    })
  );

  console.log("[Gemini] Modules ready. Access via Gemini.Modules in console.");
}

