import { ColorMatrixFilter, Container, Sprite, Texture } from 'pixi.js';
import {
  floraSpeciesDex,
  HarvestType,
} from '@/common/games/Quinoa/systems/flora';
import type { PlantTileObject } from '@/common/games/Quinoa/user-json-schema/current';
import type { QuinoaFrameContext } from '@/Quinoa/components/QuinoaCanvas/interfaces';
import { getTextureFromTileRef } from '../../../../legacy/tile-mappings';
import { GlobalRenderLayers } from '../../../GlobalRenderLayers';
import type {
  PlantVisualFeature,
  PlantVisualFeatureContext,
} from './PlantVisualFeature';

/** Duration of the fade-out effect in milliseconds. */
const FADE_OUT_DURATION_MS = 3 * 1000;

/**
 * Internal renderer interface for immature plant visuals.
 */
interface ImmatureRenderer {
  readonly container: Container;
  update(context: QuinoaFrameContext, isPlantMature: boolean): void;
  destroy(): void;
}

/** Brightness multiplier for isolated dirt patch (1 = normal, 2 = 2x bright). */
const ISOLATED_DIRT_PATCH_BRIGHTNESS = 5;
/** Saturation for isolated dirt patch (0 = grayscale, 1 = normal, <1 = less saturated). */
const ISOLATED_DIRT_PATCH_SATURATION = 0.1;
/** Tint to warm it towards light brown (applied after filters). */
const ISOLATED_DIRT_PATCH_TINT = 0xffeedd;

/**
 * Renders a dirt patch beneath growing plants.
 * Used for most plants that don't have an immatureTileRef.
 */
class DirtPatchRenderer implements ImmatureRenderer {
  public readonly container: Container;
  private readonly sprite: Sprite;
  private readonly plant: PlantTileObject;

  constructor(plant: PlantTileObject, isolateRendering: boolean) {
    this.plant = plant;

    this.container = new Container({
      label: 'DirtPatch',
      zIndex: -10, // Render behind plant body
    });

    this.sprite = new Sprite({
      label: 'dirt-patch',
      texture: Texture.from('sprite/plant/DirtPatch'),
      anchor: { x: 0.5, y: 0.5 },
      position: { x: 0, y: 0 },
      angle: plant.maturedAt % 360,
      alpha: 0, // Start invisible; update() sets correct opacity
    });

    // Increase brightness and adjust color for isolated rendering (UI/inventory)
    if (isolateRendering) {
      const colorMatrix = new ColorMatrixFilter();
      colorMatrix.brightness(ISOLATED_DIRT_PATCH_BRIGHTNESS, true);
      colorMatrix.saturate(ISOLATED_DIRT_PATCH_SATURATION, true);
      this.sprite.filters = [colorMatrix];
      // Tint to shift away from red towards neutral brown
      this.sprite.tint = ISOLATED_DIRT_PATCH_TINT;
    }

    this.container.addChild(this.sprite);

    // Attach to global layer for proper z-ordering in the world (renders
    // above ground tilemap but below avatars). Skip for isolated rendering
    // (e.g., inventory) where sprites must stay in the container hierarchy.
    if (!isolateRendering) {
      GlobalRenderLayers.aboveGround?.attach(this.sprite);
    }
  }

  update(context: QuinoaFrameContext, _isPlantMature: boolean): void {
    // We ignore isPlantMature because for single-harvest plants, the dirt patch
    // lifecycle is tied to crop maturity (slots[].endTime), not plant maturity.
    this.sprite.alpha = this.calculateOpacity(context.serverTime);
  }

  private calculateOpacity(serverTime: number): number {
    const { harvestType } = floraSpeciesDex[this.plant.species].plant;

    const endTime =
      harvestType === HarvestType.Multiple
        ? this.plant.maturedAt
        : this.plant.slots[0].endTime;

    if (endTime <= serverTime) return 0;

    const timeRemaining = endTime - serverTime;
    if (timeRemaining > FADE_OUT_DURATION_MS) return 1;

    return timeRemaining / FADE_OUT_DURATION_MS;
  }

  destroy(): void {
    this.container.destroy({ children: true });
  }
}

/**
 * Renders the immature sprite for celestial plants.
 * Shows the immatureTileRef texture while the plant is growing.
 */
class ImmatureSpriteRenderer implements ImmatureRenderer {
  public readonly container: Container;
  private readonly sprite: Sprite;
  private readonly plant: PlantTileObject;

  constructor(plant: PlantTileObject, context: PlantVisualFeatureContext) {
    this.plant = plant;
    const plantBlueprint = context.blueprint.plant;

    if (
      plantBlueprint.harvestType !== HarvestType.Multiple ||
      !plantBlueprint.immatureTileRef
    ) {
      throw new Error('ImmatureSpriteRenderer requires immatureTileRef');
    }

    this.container = new Container({
      label: 'ImmatureSprite',
      zIndex: -10, // Behind CelestialGrowingAnimationFeature
    });

    // Use the texture's natural anchor from the spritesheet
    const texture = getTextureFromTileRef(plantBlueprint.immatureTileRef);
    this.sprite = new Sprite({
      label: 'immature-sprite',
      texture,
      position: { x: 0, y: 0 },
      alpha: 0, // Start invisible; update() sets correct opacity
    });

    this.container.addChild(this.sprite);
    // No GlobalRenderLayers - participates in normal z-sorting
  }

  update(context: QuinoaFrameContext, _isPlantMature: boolean): void {
    // We ignore isPlantMature because for single-harvest plants, the dirt patch
    // lifecycle is tied to crop maturity (slots[].endTime), not plant maturity.
    this.sprite.alpha = this.calculateOpacity(context.serverTime);
  }

  private calculateOpacity(serverNow: number): number {
    const endTime = this.plant.maturedAt;

    if (endTime <= serverNow) return 0;

    const timeRemaining = endTime - serverNow;
    if (timeRemaining > FADE_OUT_DURATION_MS) return 1;

    return timeRemaining / FADE_OUT_DURATION_MS;
  }

  destroy(): void {
    this.container.destroy({ children: true });
  }
}

/**
 * Renders a visual indicator for immature/growing plants.
 *
 * Delegates to the appropriate renderer based on plant blueprint:
 * - DirtPatchRenderer: For most plants (shows dirt patch)
 * - ImmatureSpriteRenderer: For celestials with immatureTileRef
 */
export class ImmatureFeature implements PlantVisualFeature {
  public readonly container: Container;
  private readonly renderer: ImmatureRenderer;

  /**
   * Determines if this feature should be created for the given plant context.
   */
  static shouldCreate(_context: PlantVisualFeatureContext): boolean {
    // Always create - the renderer handles visibility based on maturity
    return true;
  }

  constructor(context: PlantVisualFeatureContext) {
    const { blueprint, plant, isolateRendering = false } = context;
    const plantBlueprint = blueprint.plant;

    // Choose the appropriate renderer
    const hasImmatureTileRef =
      plantBlueprint.harvestType === HarvestType.Multiple &&
      plantBlueprint.immatureTileRef;

    if (hasImmatureTileRef) {
      this.renderer = new ImmatureSpriteRenderer(plant, context);
    } else {
      this.renderer = new DirtPatchRenderer(plant, isolateRendering);
    }

    this.container = this.renderer.container;
  }

  update(context: QuinoaFrameContext, isPlantMature: boolean): void {
    this.renderer.update(context, isPlantMature);
  }

  destroy(): void {
    this.renderer.destroy();
  }
}
