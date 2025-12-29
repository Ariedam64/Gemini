// src/modules/index.ts
// Main entry point for all MG modules

// Core modules
export { MGVersion } from "./core/version";
export { MGAssets } from "./core/assets";
export { MGManifest } from "./core/manifest";
export { MGData } from "./core/data";

// Pixi modules
export { MGPixiHooks } from "./pixi/hooks";
export { MGSprite } from "./sprite";
export { MGTile } from "./pixi/tile";
export { MGPixi } from "./pixi/pixi";

// Media modules
export { MGAudio } from "./media/audio";
export { MGCosmetic } from "./media/cosmetic";

// Gameplay/helper modules
import * as MGAchievements from "./achievements";
import * as MGCalculators from "./calculators";
import * as PetStrength from "./pets/strength";
import { AbilityLogger, getAbilityLogger, destroyAbilityLogger } from "./pets/abilityLogger";
import { StatsTracker, getStatsTracker, destroyStatsTracker } from "./tracker/stats";

export { MGAchievements, MGCalculators };

export const MGPets = {
  AbilityLogger,
  getAbilityLogger,
  destroyAbilityLogger,
  ...PetStrength,
};

export const MGTracker = {
  StatsTracker,
  getStatsTracker,
  destroyStatsTracker,
};

// Re-import for initialization
import { MGData } from "./core/data";
import { MGSprite } from "./sprite";
import { MGTile } from "./pixi/tile";
import { MGPixi } from "./pixi/pixi";
import { MGAudio } from "./media/audio";
import { MGCosmetic } from "./media/cosmetic";

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
    { name: "Sprites", init: () => MGSprite.init() },
    { name: "TileObjectSystem", init: () => MGTile.init() },
    { name: "Pixi", init: () => MGPixi.init() },
    { name: "Audio", init: () => MGAudio.init() },
    { name: "Cosmetics", init: () => MGCosmetic.init() },
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
