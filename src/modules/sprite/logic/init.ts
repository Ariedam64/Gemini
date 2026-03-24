// src/modules/sprite/logic/init.ts
// Initialization logic for sprite system

import { state } from "../state";
import { log } from "./utils";
import { loadCatalogFromApi } from "./catalog";

let _initPromise: Promise<boolean> | null = null;

/**
 * Initialize the sprite system
 * Loads sprite images from MG API (no PIXI dependency)
 */
export async function initSpriteSystem(): Promise<boolean> {
  if (state.ready) return true;
  if (_initPromise) return _initPromise;

  _initPromise = (async () => {
    const startAt = performance.now();
    log("init start");

    const { images, meta, animationFrameIds, categoryIndex } = await loadCatalogFromApi();

    // Store images in the textures map (PixiTexture = any, so HTMLImageElement fits)
    state.textures = images as Map<string, unknown> as typeof state.textures;
    state.spriteMeta = meta;

    // Build animations map from frame IDs
    state.animations = new Map();
    for (const [animId, frameIds] of animationFrameIds) {
      const frames = frameIds
        .map((fid) => images.get(fid))
        .filter(Boolean) as HTMLImageElement[];
      if (frames.length >= 2) {
        state.animations.set(animId, frames as unknown[] as typeof frames);
      }
    }

    state.categoryIndex = categoryIndex;

    log(
      "catalog loaded",
      "images", state.textures.size,
      "animations", state.animations.size,
      "categories", state.categoryIndex?.size ?? 0,
    );

    state.ready = true;
    log("ready in", Math.round(performance.now() - startAt), "ms");
    return true;
  })();

  return _initPromise;
}
