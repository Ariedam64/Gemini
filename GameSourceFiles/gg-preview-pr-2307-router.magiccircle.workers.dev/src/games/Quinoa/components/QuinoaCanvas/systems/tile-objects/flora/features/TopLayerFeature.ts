import { Container, Sprite } from 'pixi.js';
import { HarvestType } from '@/common/games/Quinoa/systems/flora';
import type { QuinoaFrameContext } from '@/Quinoa/components/QuinoaCanvas/interfaces';
import { getTextureFromTileRef } from '../../../../legacy/tile-mappings';
import type { PlantBodyVisual } from '../visuals/PlantBodyVisual';
import type {
  PlantVisualFeature,
  PlantVisualFeatureContext,
} from './PlantVisualFeature';

/**
 * Renders a topmost layer sprite for plants that need an overlay on top of crops.
 *
 * Some multi-harvest plants (e.g., DawnCelestial) have a platform or decorative
 * element that should render above the crops. This feature syncs its transform
 * with the plant body visual each frame and only shows when the plant is mature.
 */
export class TopLayerFeature implements PlantVisualFeature {
  public readonly container: Container;

  private readonly sprite: Sprite;
  private readonly bodyVisual: PlantBodyVisual;

  /**
   * Determines if this feature should be created for the given plant context.
   */
  static shouldCreate(context: PlantVisualFeatureContext): boolean {
    const { plant } = context.blueprint;
    return (
      plant.harvestType === HarvestType.Multiple && !!plant.topmostLayerTileRef
    );
  }

  constructor(context: PlantVisualFeatureContext) {
    const { blueprint, bodyVisual } = context;
    const plantBlueprint = blueprint.plant;

    if (plantBlueprint.harvestType !== HarvestType.Multiple) {
      throw new Error('TopLayerFeature requires a multiple harvest plant');
    }

    const tileRef = plantBlueprint.topmostLayerTileRef;
    if (!tileRef) {
      throw new Error('TopLayerFeature requires topmostLayerTileRef');
    }

    this.bodyVisual = bodyVisual;

    this.container = new Container({
      label: 'TopLayerFeature',
      zIndex: 100, // Render above crops
    });

    this.sprite = new Sprite({
      texture: getTextureFromTileRef(tileRef),
      visible: false, // Hidden until plant is mature
    });

    this.container.addChild(this.sprite);
  }

  /**
   * Syncs the top layer sprite's transform with the plant body visual.
   * Only visible when the plant is mature.
   */
  update(_context: QuinoaFrameContext, isPlantMature: boolean): void {
    if (!isPlantMature) {
      this.sprite.visible = false;
      return;
    }

    this.sprite.visible = true;

    // Sync transform with body visual
    // The top layer needs to match the visual transform of the base sprite,
    // which is inside the scaled body container.

    // Match anchor
    this.sprite.anchor.copyFrom(this.bodyVisual.anchor);

    // Match position (relative to parent container)
    // Project the base sprite's local position through the body's scale
    this.sprite.position.set(
      this.bodyVisual.position.x * this.bodyVisual.scale.x,
      this.bodyVisual.position.y * this.bodyVisual.scale.y
    );

    // Match scale
    this.sprite.scale.copyFrom(this.bodyVisual.scale);

    // Match rotation
    this.sprite.angle = this.bodyVisual.angle;
  }

  destroy(): void {
    this.container.destroy({ children: true });
  }
}
