// src/modules/sprite/logic/init.ts
// Initialization logic for sprite system (metadata-only, lazy image loading)

import { state } from "../state";
import { log } from "./utils";
import { loadCatalogFromApi } from "./catalog";

let _initPromise: Promise<boolean> | null = null;

/**
 * Initialize the sprite system
 * Loads catalog metadata from MG API (no image downloads — images are lazy-loaded on demand)
 */
export async function initSpriteSystem(): Promise<boolean> {
  if (state.ready) return true;
  if (_initPromise) return _initPromise;

  _initPromise = (async () => {
    const startAt = performance.now();
    log("init start");

    const { catalogKeys, meta, animationFrameIds, categoryIndex, pngUrlResolver } = await loadCatalogFromApi();

    // Store catalog metadata (no images downloaded yet)
    state.catalogKeys = catalogKeys;
    state.spriteMeta = meta;
    state.animationFrameIds = animationFrameIds;
    state.categoryIndex = categoryIndex;
    state.spritePngUrlResolver = pngUrlResolver;

    log(
      "catalog loaded",
      "keys", state.catalogKeys.size,
      "animations", state.animationFrameIds.size,
      "categories", state.categoryIndex?.size ?? 0,
    );

    state.ready = true;
    log("ready in", Math.round(performance.now() - startAt), "ms");
    return true;
  })();

  return _initPromise;
}
