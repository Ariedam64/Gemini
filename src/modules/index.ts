// src/modules/index.ts
// Main entry point for all MG modules

import { shareGlobal } from "../utils/pageContext";

// Core modules
export { MGVersion } from "./core/version";
export { MGAssets } from "./core/assets";
export { MGManifest } from "./core/manifest";

// Pixi modules
export { MGPixiHooks } from "./pixi/hooks";
export { MGSprite } from "./pixi/sprite";
export { MGTile } from "./pixi/tile";
export { MGPixi } from "./pixi/pixi";

// Media modules
export { MGAudio } from "./media/audio";
export { MGCosmetic } from "./media/cosmetic";

// Re-import for window exposure
import { MGVersion } from "./core/version";
import { MGAssets } from "./core/assets";
import { MGManifest } from "./core/manifest";
import { MGSprite } from "./pixi/sprite";
import { MGTile } from "./pixi/tile";
import { MGPixi } from "./pixi/pixi";
import { MGAudio } from "./media/audio";
import { MGCosmetic } from "./media/cosmetic";

export type ModuleInitProgress = {
  name: string;
  status: "start" | "success" | "error";
  error?: unknown;
};

/**
 * Expose all modules on the window object for console access
 */
export function exposeModules(): void {
  shareGlobal("MGVersion", MGVersion);
  shareGlobal("MGAssets", MGAssets);
  shareGlobal("MGManifest", MGManifest);
  shareGlobal("MGSprite", MGSprite);
  shareGlobal("MGTile", MGTile);
  shareGlobal("MGPixi", MGPixi);
  shareGlobal("MGAudio", MGAudio);
  shareGlobal("MGCosmetic", MGCosmetic);
}

/**
 * Initialize all modules (call after page load)
 */
export async function initAllModules(
  onProgress?: (progress: ModuleInitProgress) => void
): Promise<void> {
  // Expose first so they're available in console even if init fails
  exposeModules();

  const tasks = [
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

  console.log("[MG] Ready: MGSprite / MGAudio / MGCosmetic / MGTile / MGPixi / MGSkins");
  console.log("MGPixi.inspectTile(tx, ty)");
  console.log("MGTile.help()");
}

// Auto-expose on import
exposeModules();
