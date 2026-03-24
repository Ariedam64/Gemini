// src/modules/data/logic/sprites.ts
// Sprite ID resolution from API sprite URLs
//
// The API provides sprite URLs like:
//   https://mg-api.ariedam.fr/assets/sprites/plants/Carrot.png?v=164
//
// We extract a spriteId path that matches the MGSprite catalog key:
//   "sprite/plants/Carrot"

import type { DataBag } from "../types";
import { state } from "../state";

const SPRITE_URL_PATTERN = /\/assets\/sprites\/(.+?)\.png/;

/**
 * Special plural → singular overrides for compound categories.
 */
const CATEGORY_SINGULAR: Record<string, string> = {
  "mutation-overlays": "mutation-overlay",
};

/**
 * Singularize a category name to match sprite catalog keys.
 * e.g. "seeds" -> "seed", "mutation-overlays" -> "mutation-overlay"
 */
function singularizeCategory(cat: string): string {
  const override = CATEGORY_SINGULAR[cat];
  if (override) return override;
  // Strip trailing "s" if present
  if (cat.endsWith("s") && cat.length > 1) return cat.slice(0, -1);
  return cat;
}

/**
 * Extract a sprite path from an API sprite URL, converting to catalog key format
 * e.g. "https://mg-api.ariedam.fr/assets/sprites/seeds/Carrot.png?v=164" -> "sprite/seed/Carrot"
 */
function extractSpritePath(url: string | undefined): string | null {
  if (!url || typeof url !== "string") return null;
  const match = url.match(SPRITE_URL_PATTERN);
  if (!match) return null;
  const rawPath = match[1];
  // Convert plural category to singular for catalog key
  const slashIdx = rawPath.indexOf("/");
  if (slashIdx > 0) {
    const cat = rawPath.slice(0, slashIdx);
    const rest = rawPath.slice(slashIdx);
    return `sprite/${singularizeCategory(cat)}${rest}`;
  }
  return `sprite/${rawPath}`;
}

/**
 * Resolve all sprites for the data bag
 * Simply extracts sprite paths from API URLs — no MGSprite lookup needed
 */
function resolveAllSprites(bag: DataBag): void {
  // Items
  for (const [, entry] of Object.entries(bag.items || {})) {
    const item = entry as Record<string, unknown>;
    const spriteId = extractSpritePath(item.sprite as string);
    if (spriteId) item.spriteId = spriteId;
  }

  // Decor
  for (const [, entry] of Object.entries(bag.decor || {})) {
    const decor = entry as Record<string, unknown>;
    const spriteId = extractSpritePath(decor.sprite as string);
    if (spriteId) decor.spriteId = spriteId;
  }

  // Mutations (may not have sprites)
  for (const [, entry] of Object.entries(bag.mutations || {})) {
    const mutation = entry as Record<string, unknown>;
    const spriteId = extractSpritePath(mutation.sprite as string);
    if (spriteId) mutation.spriteId = spriteId;
  }

  // Eggs
  for (const [, entry] of Object.entries(bag.eggs || {})) {
    const egg = entry as Record<string, unknown>;
    const spriteId = extractSpritePath(egg.sprite as string);
    if (spriteId) egg.spriteId = spriteId;
  }

  // Pets
  for (const [, entry] of Object.entries(bag.pets || {})) {
    const pet = entry as Record<string, unknown>;
    const spriteId = extractSpritePath(pet.sprite as string);
    if (spriteId) pet.spriteId = spriteId;
  }

  // Weather
  for (const [, entry] of Object.entries(bag.weather || {})) {
    const weather = entry as Record<string, unknown>;
    const spriteId = extractSpritePath(weather.sprite as string);
    if (spriteId) weather.spriteId = spriteId;
  }

  // Plants (nested seed/plant/crop)
  for (const [, entry] of Object.entries(bag.plants || {})) {
    const plant = entry as Record<string, Record<string, unknown>>;

    if (plant.seed) {
      const spriteId = extractSpritePath(plant.seed.sprite as string);
      if (spriteId) plant.seed.spriteId = spriteId;
    }
    if (plant.plant) {
      const spriteId = extractSpritePath(plant.plant.sprite as string);
      if (spriteId) plant.plant.spriteId = spriteId;
    }
    if (plant.crop) {
      const spriteId = extractSpritePath(plant.crop.sprite as string);
      if (spriteId) plant.crop.spriteId = spriteId;
    }
  }
}

/**
 * Resolve sprite IDs for all data
 */
export function resolveSprites(): void {
  try {
    console.log("[MGData] Resolving sprites...");
    resolveAllSprites(state.data);
    console.log("[MGData] Sprite resolution complete");
  } catch (err) {
    try { console.warn("[MGData] Sprite resolution failed", err); } catch { /* ignore */ }
  }
}
