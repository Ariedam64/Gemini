// src/utils/spriteCategory.ts
// Sprite category naming, shared by everything that builds a catalog key.
//
// The API names categories in the plural in its URLs (`/assets/sprites/plants/`)
// while catalog keys are singular (`sprite/plant/Carrot`). Two modules derive
// keys — MGData from the sprite URLs in `/data`, MGSprite from the sprite
// catalogs — and a key built one way must equal a key built the other, or a
// lookup silently misses. Hence one shared rule rather than two copies.

/** Plural → singular overrides for categories that do not just drop an "s". */
const CATEGORY_SINGULAR: Record<string, string> = {
  "mutation-overlays": "mutation-overlay",
};

/**
 * Singularize a sprite category.
 *
 * e.g. `seeds` -> `seed`, `tallPlants` -> `tallPlant`,
 * `mutation-overlays` -> `mutation-overlay`, `decor` -> `decor`.
 */
export function singularizeSpriteCategory(category: string): string {
  const override = CATEGORY_SINGULAR[category];
  if (override) return override;

  if (category.endsWith("s") && category.length > 1) return category.slice(0, -1);
  return category;
}

/** Full catalog key for a category/name pair, e.g. `sprite/plant/Carrot`. */
export function buildSpriteKey(category: string, name: string): string {
  return `sprite/${singularizeSpriteCategory(category)}/${name}`;
}
