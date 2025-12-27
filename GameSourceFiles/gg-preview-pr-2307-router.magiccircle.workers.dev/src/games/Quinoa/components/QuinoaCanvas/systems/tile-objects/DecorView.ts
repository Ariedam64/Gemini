import type { Sprite } from 'pixi.js';
import type { DecorObject } from '@/common/games/Quinoa/user-json-schema/current';
import type { GridPosition } from '@/common/games/Quinoa/world/map';
import type { QuinoaFrameContext } from '../../interfaces';
import { DecorVisual } from './decor/DecorVisual';
import type {
  DecorVisualFeature,
  DecorVisualFeatureClass,
} from './decor/features/DecorVisualFeature';
import { MiniWizardTowerOrnamentFeature } from './decor/features/MiniWizardTowerOrnamentFeature';
import {
  doesTileObjectObscureAvatar,
  TileObjectObscuringEffectConfig,
} from './doesTileObjectObscureAvatar';
import type { GardenObjectView } from './GardenObjectView';

/**
 * All available decor visual features.
 * Each feature's shouldCreate() determines if it applies to a given decor.
 */
const DECOR_FEATURES: DecorVisualFeatureClass[] = [
  MiniWizardTowerOrnamentFeature,
];

/**
 * View for decor entities.
 * Uses DecorVisual for rendering, adds world-specific behavior (obscuring).
 * Note: Z-index is managed by TileObjectContainerView.
 */
export class DecorView implements GardenObjectView {
  public readonly displayObject: Sprite;
  private decorObject: DecorObject;
  private decorVisual: DecorVisual;
  private worldPosition: GridPosition;
  private features: DecorVisualFeature[] = [];

  constructor(decorObject: DecorObject, worldPosition: GridPosition) {
    this.decorObject = decorObject;
    this.worldPosition = worldPosition;

    // Create DecorVisual with rotation
    this.decorVisual = new DecorVisual({
      decorId: decorObject.decorId,
      rotation: decorObject.rotation,
    });
    this.displayObject = this.decorVisual.sprite;
    this.displayObject.label = this.decorVisual.blueprint.name;

    // Add applicable features
    this.addFeatures();
  }

  update(context: QuinoaFrameContext): void {
    // Apply obscuring opacity if player on same tile
    const isSameTile =
      this.worldPosition.x === context.playerPosition.x &&
      this.worldPosition.y === context.playerPosition.y;

    const shouldObscure =
      isSameTile &&
      doesTileObjectObscureAvatar({
        tileObject: this.decorObject,
        serverNow: context.serverTime,
      });

    this.displayObject.alpha = shouldObscure
      ? TileObjectObscuringEffectConfig.alphaWhenObscuring
      : 1.0;

    // Update features
    for (const feature of this.features) {
      feature.update(context);
    }
  }

  /**
   * Creates and adds all applicable features for this decor.
   * Each feature's shouldCreate() determines if it applies.
   */
  private addFeatures(): void {
    const context = {
      decorId: this.decorObject.decorId,
      baseSprite: this.decorVisual.sprite,
      rotation: this.decorObject.rotation,
    };

    for (const FeatureClass of DECOR_FEATURES) {
      if (FeatureClass.shouldCreate(context)) {
        const feature = new FeatureClass(context);
        // Feature's displayObject is already added as child of baseSprite
        // (or will be added by the feature constructor)
        this.features.push(feature);
      }
    }
  }

  /**
   * Destroy the decor visual and its sprite.
   */
  destroy(): void {
    for (const feature of this.features) {
      feature.destroy();
    }
    this.decorVisual.destroy();
  }
}
