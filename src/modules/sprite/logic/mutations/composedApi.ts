// src/modules/sprite/logic/mutations/composedApi.ts
// Server-composed mutation sprites, for canvas thumbnails.

import { loadImage } from "../../../../utils/http";
import { composedSpriteUrl } from "../../../../utils/mgApi";
import type { MutationName } from "../../types";

/**
 * Fetch a sprite with its mutation layers already rendered on.
 *
 * The API runs the same pipeline the local composer does — colour filters,
 * base, mutation icons, tall-plant overlays, floating icons — and serves the
 * result as one PNG cached for a day. Going through it keeps HUD thumbnails
 * identical to what the API produces everywhere else.
 *
 * Only `toCanvas()` uses this. `show()` stays on the local composer: the
 * composed canvas grows to fit every layer, which moves the sprite's centre
 * away from its atlas anchor, and in-world Pixi placement depends on that
 * anchor.
 *
 * Returns null on any failure, so the caller can fall back to composing
 * locally rather than showing nothing.
 */
/**
 * Sprites the endpoint has no composition for.
 *
 * It resolves against the atlas metadata, which covers less than the sprite
 * listing does, so a sprite can exist for us and 404 there. Without this, every
 * thumbnail of such a sprite pays a failed request before falling back. Held
 * per session: a reload picks up whatever the API has synced since.
 */
const unavailableKeys = new Set<string>();

export async function loadComposedSprite(
  atlasKey: string,
  mutations: MutationName[],
): Promise<HTMLImageElement | null> {
  if (unavailableKeys.has(atlasKey)) return null;

  try {
    return await loadImage(composedSpriteUrl(atlasKey, mutations));
  } catch (error) {
    unavailableKeys.add(atlasKey);
    console.warn("[MGSprite] Composed sprite unavailable, composing locally:", atlasKey, error);
    return null;
  }
}
