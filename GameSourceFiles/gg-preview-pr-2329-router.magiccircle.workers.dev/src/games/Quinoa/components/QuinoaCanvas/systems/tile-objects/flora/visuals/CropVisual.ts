import { Container, Sprite, type Texture } from 'pixi.js';
import {
  type FloraSpeciesId,
  floraSpeciesDex,
  HarvestType,
} from '@/common/games/Quinoa/systems/flora';
import type { MutationId } from '@/common/games/Quinoa/systems/mutation';
import { bakeSpriteTexture } from '../../../../GameTextureCache';
import { getTextureFromTileRef } from '../../../../legacy/tile-mappings';
import { FLORA_SCALABLE_RENDER_SCALE } from '../../../../sprite-utils';
import { addMutationIcons } from '../mutations/addMutationIcons';

/**
 * Options for creating a CropVisual.
 */
export interface CropVisualOptions {
  /** The crop's target scale (from inventory item or grow slot). */
  scale: number;
  /** Mutations applied to this crop. */
  mutations: MutationId[];
  floraSpeciesId: FloraSpeciesId;
  /**
   * Single-harvest plants are themselves crops. While growing, their sprite
   * texture is the plant's sprite texture, not the crop's sprite texture. Once
   * harvested, their texture is the crop's sprite texture. Because CropVisual
   * is used to both render GROWING crops (including single-harvest plants) and
   * HARVESTED crops, we need to know whether to use the plant's sprite texture
   * or the crop's sprite texture.
   */
  mode: 'plant' | 'crop';
  /** Whether to render as unknown/silhouette (for journal entries not yet logged). */
  isUnknown?: boolean;
}

/**
 * Visual component for rendering a crop with correct texture, scale, and mutations.
 *
 * This is the single source of truth for crop rendering. It handles:
 * - Texture selection and mutation baking
 * - Scale compensation (for 2× texture export)
 * - Mutation icon placement
 *
 * Used directly for:
 * - Held items (HeldItemVisual)
 * - UI rendering (inventory, shop)
 *
 * Wrapped by GrowingCropVisual for:
 * - Crops on plants (with growth animations, wobble, etc.)
 *
 * @example
 * ```typescript
 * const cropVisual = new CropVisual({
 *   scale: 1.0,
 *   mutations: ['Gold'],
 *   tileRef: 'Carrot',
 * });
 * container.addChild(cropVisual.container);
 * ```
 */
export class CropVisual {
  /** Root container holding the crop sprite and mutation icons. */
  public readonly container: Container;
  /** The sprite displaying the crop texture. */
  private readonly sprite: Sprite;

  constructor(options: CropVisualOptions) {
    const {
      scale,
      mutations,
      floraSpeciesId,
      mode,
      isUnknown = false,
    } = options;
    const blueprint = floraSpeciesDex[floraSpeciesId];
    const tileRef =
      mode === 'plant' && blueprint.plant.harvestType === HarvestType.Single
        ? blueprint.plant.tileRef
        : blueprint.crop.tileRef;

    // Get base texture for anchor
    const baseTexture = getTextureFromTileRef(tileRef);

    // Create texture with mutation effects baked in
    // When isUnknown, we still bake mutations but the isUnknown flag darkens the sprite
    const texture: Texture =
      mutations.length > 0 || isUnknown
        ? bakeSpriteTexture(tileRef, mutations, false, isUnknown)
        : baseTexture;

    // Create container
    this.container = new Container({
      label: 'CropVisual',
      sortableChildren: true,
    });

    // Create sprite with base texture's default anchor
    this.sprite = new Sprite({
      texture,
      anchor: baseTexture.defaultAnchor,
    });
    this.container.addChild(this.sprite);

    // Apply scale (compensate for 2× texture export)
    this.container.scale.set(scale * FLORA_SCALABLE_RENDER_SCALE);

    // Add mutation icons (darkened when isUnknown)
    if (mutations.length > 0) {
      // addMutationIcons handles positioning, scaling, and unknown darkening
      const icons = addMutationIcons(mutations, floraSpeciesId, isUnknown);
      for (const icon of icons) {
        this.container.addChild(icon);
      }
    }
  }

  /**
   * Updates the crop's scale. Used by GrowingCropVisual to animate growth.
   *
   * @param targetScale - The target scale (compensated for 2× export)
   */
  setScale(targetScale: number): void {
    this.container.scale.set(targetScale * FLORA_SCALABLE_RENDER_SCALE);
  }

  /**
   * Cleans up resources when the visual is no longer needed.
   */
  destroy(): void {
    this.container.destroy({ children: true });
  }

  /**
   * Exposes the crop sprite for interaction hit testing.
   */
  getSprite(): Sprite {
    return this.sprite;
  }
}
