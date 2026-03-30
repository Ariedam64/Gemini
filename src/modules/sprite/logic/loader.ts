// src/modules/sprite/logic/loader.ts
// Lazy image loading with deduplication for sprite system

import type { SpriteState } from "../types";
import { loadImageGM } from "./catalog";

/**
 * Ensure a single sprite image is loaded into state.textures.
 * Returns the image on success, null on failure.
 * Deduplicates concurrent requests for the same key.
 */
export function ensureImageLoaded(
  key: string,
  state: SpriteState,
): Promise<HTMLImageElement | null> {
  // Already loaded
  const existing = state.textures.get(key) as HTMLImageElement | undefined;
  if (existing) return Promise.resolve(existing);

  // Already in-flight
  const inflight = state.loadingPromises.get(key);
  if (inflight) return inflight;

  // Not a known sprite
  if (!state.catalogKeys.has(key)) return Promise.resolve(null);

  // No URL resolver available
  if (!state.spritePngUrlResolver) return Promise.resolve(null);

  const url = state.spritePngUrlResolver(key);

  const promise = loadImageGM(url)
    .then((img) => {
      state.textures.set(key, img);
      state.loadingPromises.delete(key);
      return img;
    })
    .catch(() => {
      // Remove from inflight so next request can retry
      state.loadingPromises.delete(key);
      return null;
    });

  state.loadingPromises.set(key, promise);
  return promise;
}

/**
 * Ensure multiple sprite images are loaded in parallel.
 * Returns a map of key → image (null entries for failures).
 */
export async function ensureImagesLoaded(
  keys: string[],
  state: SpriteState,
): Promise<Map<string, HTMLImageElement | null>> {
  const results = new Map<string, HTMLImageElement | null>();
  const promises = keys.map(async (key) => {
    const img = await ensureImageLoaded(key, state);
    results.set(key, img);
  });
  await Promise.all(promises);
  return results;
}
