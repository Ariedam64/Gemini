// src/modules/sprite/logic/init.ts
// Initialization logic for sprite system

import { state } from "../state";
import { waitWithTimeout } from "../../utils/helpers";
import { MGPixiHooks } from "../../pixi/logic/hooks";
import { MGAssets } from "../../assets";
import { waitForCtors, log } from "./utils";
import { loadAtlasesFromManifest } from "./atlas";

let _initPromise: Promise<boolean> | null = null;

/**
 * Initialize the sprite system
 * Loads PIXI app, renderer, constructors, and atlases
 */
export async function initSpriteSystem(): Promise<boolean> {
  if (state.ready) return true;
  if (_initPromise) return _initPromise;

  _initPromise = (async () => {
    const startAt = performance.now();
    log("init start");

    const app = await waitWithTimeout(MGPixiHooks.appReady, 15000, "PIXI app");
    log("app ready");

    const renderer = await waitWithTimeout(MGPixiHooks.rendererReady, 15000, "PIXI renderer");
    log("renderer ready");

    state.app = app;
    state.renderer = renderer || app?.renderer || null;
    state.ctors = await waitForCtors(app);
    log("constructors resolved");

    state.baseUrl = await MGAssets.base();
    log("base url", state.baseUrl);

    const { textures, animations, categoryIndex, keyToAtlasJson } = await loadAtlasesFromManifest(
      state.baseUrl!,
      state.ctors!
    );

    state.textures = textures;
    state.animations = animations;
    state.categoryIndex = categoryIndex;
    (state as any).keyToAtlasJson = keyToAtlasJson;

    log(
      "atlases loaded",
      "textures",
      state.textures.size,
      "animations",
      state.animations.size,
      "categories",
      state.categoryIndex?.size ?? 0
    );

    state.ready = true;
    log("ready in", Math.round(performance.now() - startAt), "ms");
    return true;
  })();

  return _initPromise;
}
