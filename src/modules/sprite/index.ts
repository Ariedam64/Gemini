// src/modules/sprite/index.ts
// Public API for MGSprite

import type {
  PixiSprite,
  PixiContainer,
  ShowOptions,
  ToCanvasOptions,
  MutationName,
} from "./types";
import { init, getState, getCacheState, getCacheConfig, isReady } from "./core";
import { makeKey, normalizeKey, resolveKey } from "./utils";
import { showSprite, spriteToCanvas, clearSprites, attachParent, attachParentProvider } from "./display";
import { clearCache } from "./mutations/cache";
import { MUT_NAMES } from "./mutations/types";

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
    return spriteToCanvas(getState(), getCacheState(), getCacheConfig(), a, b, c || {});
  }
  return spriteToCanvas(getState(), getCacheState(), getCacheConfig(), null, a, b || {});
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
  return Array.from(index.get(cat)?.values() || []).sort((a, b) => a.localeCompare(b));
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
 * Get available mutation names
 */
function getMutationNames(): MutationName[] {
  return [...MUT_NAMES];
}

// ─────────────────────────────────────────────────────────────────────────────
// Export
// ─────────────────────────────────────────────────────────────────────────────

export const MGSprite = {
  init,
  ready: isReady,

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
  getMutationNames,
};

// Re-export types
export type { MutationName, ShowOptions, ToCanvasOptions } from "./types";
