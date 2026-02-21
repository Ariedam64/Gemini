// src/modules/sprite/index.ts
// Public API for MGSprite

import type {
  PixiSprite,
  PixiContainer,
  ShowOptions,
  ToCanvasOptions,
  MutationName,
} from "./types";
import { getState, getCacheState, getCacheConfig, getCanvasCacheState, getCanvasCacheConfig, isReady } from "./state";
import { initSpriteSystem } from "./logic/init";
import { makeKey, normalizeKey, resolveKey } from "./logic/utils";
import { showSprite, spriteToCanvas, clearSprites, attachParent, attachParentProvider, clearCanvasCache, getCanvasCacheStats, warmupCanvasCache, WarmupProgressCallback } from "./logic/display";
import { clearCache } from "./logic/mutations/cache";
import { MUT_NAMES } from "./logic/mutations/constants";
import type { PixiTexture } from "./types";
import type { PixiRectangle } from "./types";
import { loadAtlasesFromManifest } from "./logic/atlas";

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

function assertReady(): void {
  if (!isReady()) throw new Error("MGSprite not ready yet");
}

/**
 * Display a sprite with optional mutations
 *
 * @example
 * // Simple sprite
 * MGSprite.show("plants", "Carrot");
 *
 * // With mutations
 * MGSprite.show("plants", "Carrot", { mutations: ["Gold", "Wet"] });
 *
 * // With position and scale
 * MGSprite.show("plants", "Carrot", { x: 100, y: 200, scale: 2, mutations: ["Rainbow"] });
 */
function show(category: string, asset: string, options?: ShowOptions): PixiSprite;
function show(asset: string, options?: ShowOptions): PixiSprite;
function show(a: string, b?: string | ShowOptions, c?: ShowOptions): PixiSprite {
  if (typeof b === "string") {
    return showSprite(getState(), getCacheState(), getCacheConfig(), a, b, c || {});
  }
  return showSprite(getState(), getCacheState(), getCacheConfig(), null, a, b || {});
}

/**
 * Convert a sprite to a canvas element
 *
 * @example
 * const canvas = MGSprite.toCanvas("plants", "Carrot", { mutations: ["Gold"] });
 */
function toCanvas(category: string, asset: string, options?: ToCanvasOptions): HTMLCanvasElement;
function toCanvas(asset: string, options?: ToCanvasOptions): HTMLCanvasElement;
function toCanvas(a: string, b?: string | ToCanvasOptions, c?: ToCanvasOptions): HTMLCanvasElement {
  if (typeof b === "string") {
    return spriteToCanvas(
      getState(), getCacheState(), getCacheConfig(), a, b, c || {},
      getCanvasCacheState(), getCanvasCacheConfig()
    );
  }
  return spriteToCanvas(
    getState(), getCacheState(), getCacheConfig(), null, a, b || {},
    getCanvasCacheState(), getCanvasCacheConfig()
  );
}

/**
 * Clear all live sprites created via show()
 */
function clear(): void {
  clearSprites(getState());
}

/**
 * Set a default parent container for new sprites
 */
function attach(container: PixiContainer): boolean {
  return attachParent(getState(), container);
}

/**
 * Set a provider function that returns the parent container
 */
function attachProvider(fn: () => PixiContainer): boolean {
  return attachParentProvider(getState(), fn);
}

/**
 * Check if a sprite exists
 */
function has(category: string, asset: string): boolean;
function has(asset: string): boolean;
function has(a: string, b?: string): boolean {
  const state = getState();
  const key = typeof b === "string"
    ? resolveKey(a, b, state.textures, state.animations)
    : resolveKey(null, a, state.textures, state.animations);
  return state.textures.has(key) || state.animations.has(key);
}

/**
 * Get all category names
 */
function getCategories(): string[] {
  assertReady();
  const index = getState().categoryIndex;
  if (!index) return [];
  return Array.from(index.keys()).sort((a, b) => a.localeCompare(b));
}

/**
 * Get all asset IDs in a category
 */
function getCategoryId(category: string): string[] {
  assertReady();
  const cat = String(category || "").trim();
  if (!cat) return [];
  const index = getState().categoryIndex;
  if (!index) return [];
  return Array.from(index.get(cat)?.values() || []);
}

/**
 * Check if a specific ID exists in a category
 */
function hasId(category: string, id: string): boolean {
  assertReady();
  const cat = String(category || "").trim();
  const asset = String(id || "").trim();
  if (!cat || !asset) return false;

  const index = getState().categoryIndex;
  if (!index) return false;

  const catLc = cat.toLowerCase();
  const assetLc = asset.toLowerCase();

  for (const [c, ids] of index.entries()) {
    if (c.toLowerCase() !== catLc) continue;
    for (const v of ids.values()) {
      if (v.toLowerCase() === assetLc) return true;
    }
  }
  return false;
}

/**
 * List all sprite IDs, optionally filtered by prefix
 */
function listIds(prefix?: string): string[] {
  assertReady();
  const index = getState().categoryIndex;
  if (!index) return [];

  const pref = String(prefix || "").trim().toLowerCase();
  const out: string[] = [];

  for (const [cat, ids] of index.entries()) {
    for (const id of ids.values()) {
      const key = makeKey(cat, id);
      if (!pref || key.toLowerCase().startsWith(pref)) out.push(key);
    }
  }

  return out.sort((a, b) => a.localeCompare(b));
}

/**
 * Get info about a sprite ID
 */
function getIdInfo(idOrPath: string): { category: string; id: string; key: string } | null {
  assertReady();
  const s = String(idOrPath || "").trim();
  if (!s) return null;

  const key = normalizeKey(s);
  const m = /^sprite\/([^/]+)\/(.+)$/.exec(key);
  if (!m) return null;

  const catIn = m[1];
  const idIn = m[2];

  const index = getState().categoryIndex;
  const catLc = catIn.toLowerCase();
  const idLc = idIn.toLowerCase();

  let catMatch = catIn;
  let idMatch = idIn;

  if (index) {
    const foundCat = Array.from(index.keys()).find((c) => c.toLowerCase() === catLc);
    if (!foundCat) return null;
    catMatch = foundCat;
    const ids = index.get(foundCat);
    if (!ids) return null;
    const foundId = Array.from(ids.values()).find((v) => v.toLowerCase() === idLc);
    if (!foundId) return null;
    idMatch = foundId;
  }

  return { category: catMatch, id: idMatch, key: makeKey(catMatch, idMatch) };
}

/**
 * Get the full path for a category/id pair
 */
function getIdPath(category: string, id: string): string {
  assertReady();
  const catIn = String(category || "").trim();
  const assetIn = String(id || "").trim();
  if (!catIn || !assetIn) throw new Error("getIdPath(category, id) requires both category and id");

  const index = getState().categoryIndex;
  if (!index) throw new Error("Sprite categories not indexed");

  const catLc = catIn.toLowerCase();
  const assetLc = assetIn.toLowerCase();

  const catKey = Array.from(index.keys()).find((c) => c.toLowerCase() === catLc) || catIn;
  const ids = index.get(catKey);
  if (!ids) throw new Error(`Unknown sprite category: ${catIn}`);

  const idKey = Array.from(ids.values()).find((v) => v.toLowerCase() === assetLc) || assetIn;
  if (!ids.has(idKey)) throw new Error(`Unknown sprite id: ${catIn}/${assetIn}`);

  return makeKey(catKey, idKey);
}

/**
 * Clear the mutation texture cache
 */
function clearMutationCache(): void {
  clearCache(getCacheState());
}

/**
 * Clear the canvas cache (toCanvas results)
 */
function clearToCanvasCache(): void {
  clearCanvasCache(getCanvasCacheState());
}

/**
 * Get canvas cache statistics
 */
function getToCanvasCacheStats(): { size: number; maxEntries: number } {
  return getCanvasCacheStats(getCanvasCacheState());
}

/**
 * Get available mutation names
 */
function getMutationNames(): MutationName[] {
  return [...MUT_NAMES];
}

/**
 * Warmup canvas cache by preloading sprites
 * @param spriteIds - Array of sprite IDs to preload
 * @param onProgress - Callback for progress updates (loaded, total)
 * @param batchSize - Number of sprites to process per batch (default: 10)
 * @param batchDelayMs - Delay between batches in ms (default: 0)
 */
async function warmup(
  spriteIds: string[],
  onProgress?: WarmupProgressCallback,
  batchSize = 10,
  batchDelayMs = 0
): Promise<number> {
  assertReady();
  return warmupCanvasCache(
    spriteIds,
    getState(),
    getCacheState(),
    getCacheConfig(),
    getCanvasCacheState(),
    getCanvasCacheConfig(),
    onProgress,
    batchSize,
    batchDelayMs
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Export
// ─────────────────────────────────────────────────────────────────────────────

export const MGSprite = {
  init: initSpriteSystem,
  isReady,

  show,
  toCanvas,

  clear,
  attach,
  attachProvider,

  has,
  key: (category: string, asset: string) => makeKey(category, asset),

  getCategories,
  getCategoryId,
  hasId,
  listIds,
  getIdInfo,
  getIdPath,

  clearMutationCache,
  clearToCanvasCache,
  getToCanvasCacheStats,
  getMutationNames,
  warmup,

  // Internal helpers (used by features like SkinChanger)
  _internal: {
    getTexture: (spriteId: string): PixiTexture | null => {
      const s = String(spriteId || "").trim();
      if (!s) return null;
      return getState().textures.get(s) || null;
    },
    setTexture: (spriteId: string, tex: PixiTexture): void => {
      const s = String(spriteId || "").trim();
      if (!s) throw new Error("MGSprite._internal.setTexture: empty spriteId");
      getState().textures.set(s, tex);
    },
    hasTexture: (spriteId: string): boolean => {
      const s = String(spriteId || "").trim();
      if (!s) return false;
      return getState().textures.has(s);
    },
    getTextureSize: (spriteId: string): { w: number; h: number } | null => {
      const s = String(spriteId || "").trim();
      if (!s) return null;
      const tex = getState().textures.get(s) as any;
      if (!tex) return null;
      const frame = tex.frame as PixiRectangle | undefined;
      const orig = tex.orig as PixiRectangle | undefined;
      const w = Number(orig?.width ?? frame?.width ?? 0);
      const h = Number(orig?.height ?? frame?.height ?? 0);
      if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0) return null;
      return { w, h };
    },
    listLoadedKeys: (): string[] => {
      const s = getState();
      const keys = new Set<string>();
      for (const k of s.textures.keys()) keys.add(k);
      for (const k of s.animations.keys()) keys.add(k);
      return [...keys.values()].sort((a, b) => a.localeCompare(b));
    },
    ensureLoadedKeys: async (spriteKeys: string[]): Promise<number> => {
      const keys = Array.isArray(spriteKeys) ? spriteKeys.map((k) => String(k || "").trim()).filter(Boolean) : [];
      if (!keys.length) return 0;

      const s = getState() as any;
      const baseUrl = s.baseUrl as string | null;
      const ctors = s.ctors as any;
      const keyToAtlasJson: Map<string, string> | undefined = s.keyToAtlasJson;
      if (!baseUrl || !ctors || !keyToAtlasJson) return 0;

      const missing = keys.filter((k) => !s.textures.has(k) && !s.animations.has(k));
      if (!missing.length) return 0;

      // Determine which atlas json files contain the missing keys.
      // We might not have reverse-index coverage (e.g. if the key was never in frames but is in categoryIndex),
      // so as a robust fallback we can re-load all atlases once to populate the key.
      const needed = new Set<string>();
      for (const k of missing) {
        const p = keyToAtlasJson.get(k);
        if (p) needed.add(p);
      }

      // Load only those atlases (and any multi-pack relations) and merge into existing maps.
      const res = await loadAtlasesFromManifest(
        baseUrl,
        ctors,
        needed.size ? ({ onlyJsonPaths: [...needed] } as any) : undefined
      );
      for (const [k, v] of res.textures) s.textures.set(k, v);
      for (const [k, v] of res.animations) s.animations.set(k, v);
      for (const [cat, ids] of res.categoryIndex) {
        if (!s.categoryIndex) s.categoryIndex = new Map();
        if (!s.categoryIndex.has(cat)) s.categoryIndex.set(cat, new Set());
        const set = s.categoryIndex.get(cat);
        for (const id of ids.values()) set.add(id);
      }
      for (const [k, p] of res.keyToAtlasJson) keyToAtlasJson.set(k, p);

      // return count of atlas jsons loaded as a coarse signal
      return needed.size || 1;
    },
  },
};

// Re-export types
export type { MutationName, ShowOptions, ToCanvasOptions } from "./types";
