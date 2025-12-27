import { type Container, type Filter, type Renderer, Sprite } from 'pixi.js';
import {
  type MutationId,
  mutationSortFn,
} from '@/common/games/Quinoa/systems/mutation';
import { getTextureFromTileRef } from '../legacy/tile-mappings';
import { ColorOverlayFilter } from '../pixi/filters/ColorOverlayFilter';
import { UnpremultiplyAlphaFilter } from '../pixi/filters/UnpremultiplyAlphaFilter';
import { QUINOA_RENDER_SCALE } from '../sprite-utils';
import { MutationVisualEffectsDex } from '../systems/tile-objects/flora/mutations/mutation-filters';

export function getCanvasTextureSizePx() {
  return 64 * QUINOA_RENDER_SCALE;
}

/** Cached filter for unpremultiplying alpha. */
export const unpremultiplyFilter = new UnpremultiplyAlphaFilter();

/** Cached filter for disabled state (red tint at 40% alpha). */
export const DISABLED_FILTER = new ColorOverlayFilter({
  color: 0xff6464,
  alpha: 0.4,
});

/** Cached filter for unknown state (dark gray at 90% alpha). */
export const UNKNOWN_FILTER = new ColorOverlayFilter({
  color: 0x2a2a2a,
  alpha: 0.9,
});

/**
 * Creates a baked alpha mask from a sprite's shape.
 *
 * Goal: Create a mask sprite that represents the silhouette of a source sprite.
 * This mask clips other sprites to only render where the source sprite had pixels.
 *
 * Why baking is needed:
 * - WebGL masks work by sampling the mask's alpha channel on the GPU.
 * - In off-screen render passes (like generateTexture), coordinate spaces can be
 *   mismatched between the mask and the target sprite.
 * - Baking the texture into a standalone white silhouette resolves all transforms
 *   and creates a concrete texture in a known coordinate space.
 * - This ensures reliable masking regardless of rendering context.
 *
 * Implementation steps:
 * 1. Create a temporary sprite with the source's texture and transforms.
 * 2. Apply ColorOverlayFilter to make it a solid white silhouette.
 * 3. Render it to a texture (the "baked" mask).
 * 4. Return a sprite with the baked texture.
 *
 * @param sourceSprite - The sprite whose shape defines the mask
 * @returns The baked mask sprite (ready to use as sprite.mask)
 */
export function createBakedMask(
  renderer: Renderer,
  sourceSprite: Sprite
): Sprite {
  // Create a white silhouette sprite
  const silhouetteSprite = new Sprite({
    texture: sourceSprite.texture,
    anchor: sourceSprite.anchor,
    position: sourceSprite.position,
    scale: sourceSprite.scale,
    filters: [new ColorOverlayFilter({ color: 0xffffff })],
  });

  // Bake it to a texture
  const bakedTexture = renderer.textureGenerator.generateTexture({
    target: silhouetteSprite,
    resolution: QUINOA_RENDER_SCALE,
  });

  // Return the final mask sprite
  return new Sprite({
    texture: bakedTexture,
    anchor: sourceSprite.anchor,
    position: sourceSprite.position,
    scale: sourceSprite.scale,
  });
}

/**
 * Applies visual mutation effects to a sprite using ColorMatrixFilter overlays.
 * Replicates Canvas2D source-atop blend mode behavior.
 *
 * Mutation priority (matches getOrCacheSprite.ts logic):
 * - If Gold is present: ONLY render Gold (exclusive)
 * - Else if Rainbow is present: ONLY render Rainbow (exclusive)
 * - Else: Render all other mutations
 *
 * Rendering order:
 * 1. Original sprite (base)
 * 2. Color tints (Gold/Rainbow/etc.) - ColorMatrixFilter overlays
 * 3. Sprite overlays (Wet, Frozen, etc.) - Always on top
 *
 * How it works:
 * - Original sprite renders at 100% opacity with original colors
 * - Each mutation adds a duplicate sprite with ColorMatrixFilter (solid color replacement)
 * - Overlay sprite renders on top at mutation's configured alpha (e.g., Gold at 70%)
 * - Result: original sprite blended with colored overlay, then sprite overlays on top
 *
 * Key insights:
 * - sprite.tint() multiplies colors (dark pixels stay dark) - NOT sufficient
 * - ColorMatrixFilter with custom matrix REPLACES RGB entirely while preserving alpha
 * - Must use textureGenerator.generateTexture() to capture filters (extract() doesn't)
 * - Sprite overlays MUST render after all color tints for proper visual layering
 * - Mutations with `stackBlendMode` (e.g., Rainbow) are applied last and blended
 *
 * @param sprite - The base sprite to apply mutations to
 * @param mutations - Array of mutation IDs to apply (e.g., ['Rainbow', 'Frozen'])
 */
export function applyMutations(
  renderer: Renderer,
  sprite: Sprite,
  mutations: MutationId[],
  isTallPlant: boolean
): void {
  const spriteParent = sprite.parent;
  if (!spriteParent) {
    return;
  }
  const sortedMutations = mutations.toSorted(mutationSortFn);

  // Gold and Rainbow are exclusive - if present, skip all other mutation filters
  const hasGold = sortedMutations.includes('Gold');
  const hasRainbow = sortedMutations.includes('Rainbow');

  // Determine which mutations get their filters applied
  const mutationsToApplyFilters: MutationId[] = hasGold
    ? ['Gold']
    : hasRainbow
      ? ['Rainbow']
      : sortedMutations;

  // Apply color filter overlays in order
  for (const mutation of mutationsToApplyFilters) {
    const blueprint = MutationVisualEffectsDex[mutation];

    const filters =
      isTallPlant && blueprint.tallPlantFilters
        ? blueprint.tallPlantFilters
        : blueprint.filters;

    const overlay = new Sprite({
      texture: sprite.texture,
      anchor: 0.5,
      position: sprite.position,
      scale: sprite.scale,
      filters,
    });
    spriteParent.addChild(overlay);
  }
  // Mutations that have sprite overlays (ice crystals, puddles, etc.)
  const overlayMutations = sortedMutations.filter(
    (m) => MutationVisualEffectsDex[m].overlayTileRef
  );
  // Apply texture overlays for tall plants (ice crystals, puddles, etc.)
  if (isTallPlant) {
    for (const mutation of overlayMutations) {
      const { overlayTileRef } = MutationVisualEffectsDex[mutation];
      if (!overlayTileRef) {
        continue;
      }
      const texture = getTextureFromTileRef(overlayTileRef);
      const sourceHeight = sprite.texture.height * sprite.scale.y;
      const sourceTopY = sprite.position.y - sprite.anchor.y * sourceHeight;
      const maskedOverlay = new Sprite({
        texture,
        anchor: { x: sprite.anchor.x, y: 0 },
        position: { x: sprite.position.x, y: sourceTopY },
        scale: sprite.scale,
      });
      const mask = createBakedMask(renderer, sprite);
      maskedOverlay.mask = mask;
      spriteParent.addChild(maskedOverlay, mask);
    }
  }
  // Icon stickers render via addMutationIcons after baking
}

/**
 * Applies disabled/unknown visual effects to the container holding all sprites.
 * These effects are applied as filters on the container so they affect the
 * combined visual output including any mutation effects (Gold, Rainbow, etc.).
 *
 * Visual effects:
 * - isDisabled: Red overlay (rgb(255, 100, 100)) at 40% alpha
 * - isUnknown: Dark gray overlay (#2a2a2a) at 90% alpha
 */
export function applyStateEffects(
  container: Container,
  isDisabled: boolean,
  isUnknown: boolean
): void {
  // Apply cached filters to the container so they affect all children
  // (base sprite + mutation overlays)
  const filters: Filter[] = [];
  if (isDisabled) filters.push(DISABLED_FILTER);
  if (isUnknown) filters.push(UNKNOWN_FILTER);
  container.filters = filters;
}
