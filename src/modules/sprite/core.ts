// src/modules/sprite/core.ts
// State management and initialization for sprite system

import type { SpriteState, MutationCacheState, CacheConfig, CanvasCacheState, CanvasCacheConfig } from "./types";
import { waitWithTimeout } from "../utils/helpers";
import { MGPixiHooks } from "../pixi/hooks";
import { MGAssets } from "../core/assets";
import { waitForCtors, log } from "./utils";
import { loadAtlasesFromManifest } from "./atlas";
import { createCacheState, DEFAULT_CACHE_CONFIG } from "./mutations/cache";
import { createCanvasCacheState, DEFAULT_CANVAS_CACHE_CONFIG } from "./display";

// ─────────────────────────────────────────────────────────────────────────────
// State Factories
// ─────────────────────────────────────────────────────────────────────────────

export function createSpriteState(): SpriteState {
  return {
    ready: false,
    app: null,
    renderer: null,
    ctors: null,
    baseUrl: null,
    textures: new Map(),
    animations: new Map(),
    live: new Set(),
    defaultParent: null,
    overlay: null,
    categoryIndex: null,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Global State
// ─────────────────────────────────────────────────────────────────────────────

let _initPromise: Promise<boolean> | null = null;
const state = createSpriteState();
const cacheState = createCacheState();
const cacheConfig: CacheConfig = { ...DEFAULT_CACHE_CONFIG };
const canvasCacheState = createCanvasCacheState();
const canvasCacheConfig: CanvasCacheConfig = { ...DEFAULT_CANVAS_CACHE_CONFIG };

// ─────────────────────────────────────────────────────────────────────────────
// Getters
// ─────────────────────────────────────────────────────────────────────────────

export function getState(): SpriteState {
  return state;
}

export function getCacheState(): MutationCacheState {
  return cacheState;
}

export function getCacheConfig(): CacheConfig {
  return cacheConfig;
}

export function getCanvasCacheState(): CanvasCacheState {
  return canvasCacheState;
}

export function getCanvasCacheConfig(): CanvasCacheConfig {
  return canvasCacheConfig;
}

export function isReady(): boolean {
  return state.ready;
}

// ─────────────────────────────────────────────────────────────────────────────
// Initialization
// ─────────────────────────────────────────────────────────────────────────────

export async function init(): Promise<boolean> {
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

    const { textures, animations, categoryIndex } = await loadAtlasesFromManifest(
      state.baseUrl!,
      state.ctors!
    );

    state.textures = textures;
    state.animations = animations;
    state.categoryIndex = categoryIndex;

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
