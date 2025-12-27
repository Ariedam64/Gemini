import { Sprite, type Texture } from 'pixi.js';
import type { FaunaSpeciesBlueprint } from '@/common/games/Quinoa/systems/fauna/fauna-blueprints';
import {
  type FaunaSpeciesId,
  faunaSpeciesDex,
} from '@/common/games/Quinoa/systems/fauna/faunaSpeciesDex';
import type { PetSlot } from '@/common/games/Quinoa/user-json-schema/current';
import { getPetScale } from '@/common/games/Quinoa/utils/pets';
import { bakeSpriteTexture } from '../../GameTextureCache';
import { getTextureFromTileRef } from '../../legacy/tile-mappings';
import { FAUNA_SCALABLE_RENDER_SCALE } from '../../sprite-utils';

/**
 * Options for creating a PetVisual.
 */
export interface PetVisualOptions {
  /**
   * Pet slot data containing species, mutations, hunger, xp, etc.
   * Works with both PetSlot (world pets) and PetInventoryItem (inventory pets).
   */
  petSlot: PetSlot;

  /**
   * Whether to automatically update the sprite's scale when data changes.
   * Defaults to true. Set to false if you want to control scaling manually (e.g. for interpolation).
   */
  autoUpdateScale?: boolean;
}

/**
 * Visual component for rendering a pet with correct texture, scale, and mutations.
 *
 * This is the single source of truth for pet rendering. It handles:
 * - Texture selection and mutation baking (Gold, Rainbow, etc.)
 * - Scale compensation (for 2× texture export)
 * - Disabled state (hungry pets)
 *
 * Used for:
 * - World rendering (PetView)
 * - Held items (HeldItemVisual)
 * - UI rendering (inventory, shop)
 *
 * @example
 * ```typescript
 * const petVisual = new PetVisual({
 *   petSlot: { petSpecies: 'Bunny', mutations: ['Gold'], hunger: 100, ... }
 * });
 * container.addChild(petVisual.sprite);
 * ```
 */
export class PetVisual {
  /** The sprite displaying the pet texture. */
  public readonly sprite: Sprite;
  /** The pet blueprint for this visual. */
  public blueprint: FaunaSpeciesBlueprint;
  /** Cached base scale (without breathing animation). */
  private baseScale: number = 1;
  private autoUpdateScale: boolean;

  constructor(options: PetVisualOptions) {
    const { petSlot, autoUpdateScale = true } = options;
    this.autoUpdateScale = autoUpdateScale;

    this.blueprint = faunaSpeciesDex[petSlot.petSpecies];

    // Create initial texture with mutation effects
    const isDisabled = petSlot.hunger <= 0;
    const texture: Texture = bakeSpriteTexture(
      this.blueprint.tileRef,
      petSlot.mutations,
      isDisabled
    );

    // Get base texture to read its defaultAnchor (baked texture doesn't have it)
    const baseTexture = getTextureFromTileRef(this.blueprint.tileRef);

    // Create sprite with texture and anchor from base texture.
    // The anchor handles positioning (like DecorVisual).
    this.sprite = new Sprite({
      texture,
      anchor: baseTexture.defaultAnchor,
      label: `Pet: ${this.blueprint.name}`,
    });

    // Apply initial scale
    this.baseScale = this.computeBaseScale(
      petSlot.petSpecies,
      petSlot.xp,
      petSlot.targetScale
    );
    if (this.autoUpdateScale) {
      this.sprite.scale.set(this.baseScale);
    }
  }

  /**
   * Updates the visual from pet slot data.
   * Handles texture updates (mutations, disabled state) and scale recomputation.
   *
   * @param petSlot - Updated pet slot data
   */
  updateFromPetSlot(petSlot: PetSlot): void {
    // Update texture with mutation effects
    const isDisabled = petSlot.hunger <= 0;
    const texture: Texture = bakeSpriteTexture(
      this.blueprint.tileRef,
      petSlot.mutations,
      isDisabled
    );
    this.sprite.texture = texture;

    // Recompute base scale
    this.baseScale = this.computeBaseScale(
      petSlot.petSpecies,
      petSlot.xp,
      petSlot.targetScale
    );
    if (this.autoUpdateScale) {
      this.sprite.scale.set(this.baseScale);
    }
  }

  /**
   * Computes the base scale for the pet.
   */
  private computeBaseScale(
    speciesId: FaunaSpeciesId,
    xp: number,
    targetScale: number
  ): number {
    const growthScale = getPetScale({ speciesId, xp, targetScale });
    return growthScale * FAUNA_SCALABLE_RENDER_SCALE;
  }

  /**
   * Gets the current base scale (without breathing animation).
   */
  getBaseScale(): number {
    return this.baseScale;
  }

  /**
   * Updates the pet's scale. Used by PetView for breathing animation.
   *
   * @param scale - The target scale (already compensated for render scale)
   */
  setScale(scale: number): void {
    this.sprite.scale.set(scale);
  }

  /**
   * Updates the pet's scale with separate X and Y values.
   * Used by PetView for breathing squash-and-stretch animation.
   *
   * @param scaleX - The target X scale
   * @param scaleY - The target Y scale
   */
  setScaleXY(scaleX: number, scaleY: number): void {
    this.sprite.scale.set(scaleX, scaleY);
  }

  /**
   * Cleans up resources when the visual is no longer needed.
   */
  destroy(): void {
    this.sprite.destroy();
  }
}
