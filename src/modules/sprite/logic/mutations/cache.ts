// src/modules/sprite/mutations/cache.ts
// LRU cache for generated mutation textures

import type { PixiTexture, CacheEntry, MutationCacheState, CacheConfig, VariantSignature } from "../../types";

// ─────────────────────────────────────────────────────────────────────────────
// Cache Key Generation
// ─────────────────────────────────────────────────────────────────────────────

export function variantKey(itemKey: string, V: VariantSignature): string {
  return `${V.sig}::${itemKey}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Cost Calculation
// ─────────────────────────────────────────────────────────────────────────────

export function entryCost(entry: CacheEntry | null): number {
  if (!entry) return 0;
  return entry.isAnim ? (entry.frames?.length || 0) : (entry.tex ? 1 : 0);
}

// ─────────────────────────────────────────────────────────────────────────────
// LRU Operations
// ─────────────────────────────────────────────────────────────────────────────

export function lruTouch(state: MutationCacheState, key: string, entry: CacheEntry): void {
  state.lru.delete(key);
  state.lru.set(key, entry);
}

export function lruEvict(state: MutationCacheState, config: CacheConfig): void {
  if (!config.enabled) return;

  while (state.lru.size > config.maxEntries || state.cost > config.maxCost) {
    const key = state.lru.keys().next().value;
    if (key === undefined) break;

    const entry = state.lru.get(key);
    state.lru.delete(key);
    state.cost = Math.max(0, state.cost - entryCost(entry ?? null));
  }
}

export function lruGet(state: MutationCacheState, key: string): CacheEntry | null {
  const entry = state.lru.get(key);
  if (!entry) return null;
  lruTouch(state, key, entry);
  return entry;
}

export function lruSet(
  state: MutationCacheState,
  key: string,
  entry: CacheEntry,
  config: CacheConfig
): void {
  state.lru.set(key, entry);
  state.cost += entryCost(entry);
  lruEvict(state, config);
}

// ─────────────────────────────────────────────────────────────────────────────
// Clear Cache
// ─────────────────────────────────────────────────────────────────────────────

export function clearCache(state: MutationCacheState): void {
  state.lru.clear();
  state.cost = 0;
  state.srcCanvas.clear();
}

// ─────────────────────────────────────────────────────────────────────────────
// Source Canvas Cache (for texture-to-canvas conversion)
// ─────────────────────────────────────────────────────────────────────────────

export function getSrcCanvas(
  state: MutationCacheState,
  tex: PixiTexture
): HTMLCanvasElement | null {
  return state.srcCanvas.get(tex) ?? null;
}

export function setSrcCanvas(
  state: MutationCacheState,
  tex: PixiTexture,
  canvas: HTMLCanvasElement,
  config: CacheConfig
): void {
  state.srcCanvas.set(tex, canvas);

  if (state.srcCanvas.size > config.srcCanvasMax) {
    const firstKey = state.srcCanvas.keys().next().value;
    if (firstKey !== undefined) {
      state.srcCanvas.delete(firstKey);
    }
  }
}
