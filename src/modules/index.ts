// src/modules/index.ts
// Main entry point for all MG modules

// Core infrastructure modules
export { MGVersion } from "./version";
export { MGAssets } from "./assets";
export { MGManifest } from "./manifest";
export { MGData } from "./data";
export { MGEnvironment } from "./environment";
export { MGCustomModal } from "./customModal";

// Re-export data utilities
export { formatAbilityLog, filterPetAbilityLogs, isPetAbilityAction, PET_ABILITY_ACTIONS } from "./data";
export type { ActivityLogEntry, PetAbilityAction } from "./data";

// Rendering modules
export { MGSprite } from "./sprite";
export { MGTile } from "./tile";
export { MGPixi } from "./pixi";
export { MGPixiHooks } from "./pixi/logic/hooks";

// Media modules
export { MGAudio } from "./audio";
export { MGCosmetic } from "./cosmetic";

// Utility modules
export { MGCalculators } from "./calculators";

// Action modules
export { MGShopActions } from "./shopActions";

// Re-import for initialization
import { MGData } from "./data";
import { MGCustomModal } from "./customModal";
import { MGSprite } from "./sprite";
import { MGTile } from "./tile";
import { MGPixi } from "./pixi";
import { MGAudio } from "./audio";
import { MGCosmetic } from "./cosmetic";
import { MGShopActions } from "./shopActions";

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
    { name: "CustomModal", init: () => MGCustomModal.init() },
    { name: "Sprites", init: () => MGSprite.init() },
    { name: "TileObjectSystem", init: () => MGTile.init() },
    { name: "Pixi", init: () => MGPixi.init() },
    { name: "Audio", init: () => MGAudio.init() },
    { name: "Cosmetics", init: () => MGCosmetic.init() },
    { name: "ShopActions", init: () => MGShopActions.init() },
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

