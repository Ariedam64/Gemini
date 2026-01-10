import { Container } from 'pixi.js';
import {
  type FloraSpeciesBlueprint,
  floraSpeciesDex,
} from '@/common/games/Quinoa/systems/flora';
import type { PlantTileObject } from '@/common/games/Quinoa/user-json-schema/current';
import type { GridPosition } from '@/common/games/Quinoa/world/map';
import type { QuinoaFrameContext } from '@/Quinoa/components/QuinoaCanvas/interfaces';
import {
  doesTileObjectObscureAvatar,
  TileObjectObscuringEffectConfig,
} from '../doesTileObjectObscureAvatar';
import type { GardenObjectView } from '../GardenObjectView';
import { PlantInteractionController } from './PlantInteractionController';
import { PlantVisual } from './visuals/PlantVisual';
/**
 * View wrapper that positions PlantVisual and handles opacity rules.
 */
export class PlantView implements GardenObjectView {
  public readonly displayObject: Container;
  private blueprint: FloraSpeciesBlueprint;
  private worldPosition: GridPosition;
  private plantObject: PlantTileObject;
  private plantVisual: PlantVisual;
  private interactionController = new PlantInteractionController();

  constructor(
    plantData: PlantTileObject,
    worldPosition: GridPosition,
    _context: QuinoaFrameContext
  ) {
    this.blueprint = floraSpeciesDex[plantData.species];
    // Create the container
    const container = new Container({
      sortableChildren: true,
      label: `${this.blueprint.plant.name} View`,
    });
    // Set eventMode to 'passive' to ensure hit testing passes through unless
    // specifically intercepted by children. However, PlantInteractionController
    // might set it to 'static' later.
    // Important: We want adjacent plants to NOT block interaction if they are not the active tile.
    // By default eventMode is 'passive' (auto in v8?), meaning it doesn't block.
    // But if children are interactive (which they are, via PlantInteractionController), they block.
    // We need to ensure that non-active plants (player not on tile) have interactivity disabled.
    // PlantInteractionController handles this in syncCropInteractivity -> teardown.
    // teardown sets eventMode='auto' on crop containers.
    // Is 'auto' interactive?
    // In v8, 'auto' means "don't emit events, but CAN be hit test target if parent is interactive".
    // If we want it to be completely invisible to hits when not active, we should use 'none'.

    this.displayObject = container;

    this.plantObject = plantData;
    this.worldPosition = worldPosition;

    this.plantVisual = new PlantVisual({
      plant: this.plantObject,
      blueprint: this.blueprint,
      worldPosition,
    });
    container.addChild(this.plantVisual.container);
  }

  /**
   * Synchronizes plant visuals and tile-level effects with server time.
   */
  update(context: QuinoaFrameContext): void {
    this.plantVisual.update(context);
    this.interactionController.updateEasing();
    this.syncCropInteractivity(context);
    this.updateObscuringOpacity(context);
  }

  private updateObscuringOpacity(context: QuinoaFrameContext): void {
    const isLocalPlayerOnSameTile =
      this.worldPosition.x === context.playerPosition.x &&
      this.worldPosition.y === context.playerPosition.y;

    this.displayObject.alpha =
      isLocalPlayerOnSameTile &&
      doesTileObjectObscureAvatar({
        tileObject: this.plantObject,
        serverNow: context.serverTime,
      })
        ? TileObjectObscuringEffectConfig.alphaWhenObscuring
        : 1.0;
  }

  /**
   * Enables crop interactivity only when the player stands on this plant's tile.
   */
  private syncCropInteractivity(_context: QuinoaFrameContext): void {
    this.interactionController.syncInteractivity({
      blueprint: this.blueprint,
      plant: this.plantObject,
      worldPosition: this.worldPosition,
      cropVisuals: this.plantVisual.getCropVisuals(),
    });
  }

  /**
   * Destroy the plant container hierarchy.
   */
  destroy(): void {
    this.interactionController.teardown();
    this.plantVisual.destroy();
    this.displayObject.destroy({ children: true });
  }
}
