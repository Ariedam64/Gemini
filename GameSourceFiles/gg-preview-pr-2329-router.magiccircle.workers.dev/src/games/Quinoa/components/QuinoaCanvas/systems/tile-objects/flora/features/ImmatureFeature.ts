import { Container, Sprite, Texture } from 'pixi.js';
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

/**
 * Renders a dirt patch beneath growing plants.
 * Used for most plants that don't have an immatureTileRef.
 * Only used when rendering in the world (not isolated).
 */
class DirtPatchRenderer implements ImmatureRenderer {
  public readonly container: Container;
  private readonly sprite: Sprite;
  private readonly plant: PlantTileObject;

  constructor(plant: PlantTileObject) {
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

    this.container.addChild(this.sprite);

    // Attach to global layer for proper z-ordering in the world (renders
    // above ground tilemap but below avatars).
    GlobalRenderLayers.aboveGround?.attach(this.sprite);
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
 * Delegates to the appropriate renderer based on plant blueprint and rendering context:
 * - ImmatureSpriteRenderer: For celestials with immatureTileRef
 * - DirtPatchRenderer: For world rendering (shows dirt patch)
 * - No renderer: For isolated rendering (planter pot is handled by PlanterPotFeature)
 */
export class ImmatureFeature implements PlantVisualFeature {
  public readonly container: Container;
  private readonly renderer: ImmatureRenderer;

  /**
   * Determines if this feature should be created for the given plant context.
   */
  static shouldCreate(context: PlantVisualFeatureContext): boolean {
    const { blueprint, isolateRendering } = context;
    const plantBlueprint = blueprint.plant;

    // Always create if we have an immatureTileRef (for celestials)
    const hasImmatureTileRef =
      plantBlueprint.harvestType === HarvestType.Multiple &&
      plantBlueprint.immatureTileRef;
    if (hasImmatureTileRef) return true;

    // For world rendering, always create (to show dirt patch)
    if (!isolateRendering) return true;

    // For isolated rendering without immatureTileRef, don't create
    // (planter pot is handled by PlanterPotFeature)
    return false;
  }

  constructor(context: PlantVisualFeatureContext) {
    const { blueprint, plant } = context;
    const plantBlueprint = blueprint.plant;

    // Choose the appropriate renderer
    const hasImmatureTileRef =
      plantBlueprint.harvestType === HarvestType.Multiple &&
      plantBlueprint.immatureTileRef;

    if (hasImmatureTileRef) {
      this.renderer = new ImmatureSpriteRenderer(plant, context);
    } else {
      // World rendering - show dirt patch
      // (isolated rendering case is handled by shouldCreate returning false)
      this.renderer = new DirtPatchRenderer(plant);
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
