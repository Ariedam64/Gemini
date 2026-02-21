// src/modules/sprite/state.ts
// Global state management for sprite system

import type { SpriteState, MutationCacheState, CacheConfig, CanvasCacheState, CanvasCacheConfig } from "./types";

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
    keyToAtlasJson: new Map(),
  };
}

export function createCacheState(): MutationCacheState {
  return {
    lru: new Map(),
    cost: 0,
    srcCanvas: new Map(),
  };
}

export function createCanvasCacheState(): CanvasCacheState {
  return {
    cache: new Map(),
    maxEntries: 200,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Default Configurations
// ─────────────────────────────────────────────────────────────────────────────

export const DEFAULT_CACHE_CONFIG: CacheConfig = {
  enabled: true,
  maxEntries: 200,
  maxCost: 800,
  srcCanvasMax: 100,
};

export const DEFAULT_CANVAS_CACHE_CONFIG: CanvasCacheConfig = {
  enabled: true,
  maxEntries: 200,
};

// ─────────────────────────────────────────────────────────────────────────────
// Global State
// ─────────────────────────────────────────────────────────────────────────────

export const state = createSpriteState();
export const cacheState = createCacheState();
export const cacheConfig: CacheConfig = { ...DEFAULT_CACHE_CONFIG };
export const canvasCacheState = createCanvasCacheState();
export const canvasCacheConfig: CanvasCacheConfig = { ...DEFAULT_CANVAS_CACHE_CONFIG };

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
