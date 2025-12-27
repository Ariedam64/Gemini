import type { Sprite } from 'pixi.js';
import type { EggTileObject } from '@/common/games/Quinoa/user-json-schema/current';
import type { GridPosition } from '@/common/games/Quinoa/world/map';
import type { QuinoaFrameContext } from '../../interfaces';
import { EggVisual } from './egg/EggVisual';
import type { GardenObjectView } from './GardenObjectView';

/**
 * View for egg entities in the world.
 * Uses EggVisual for rendering, adds world-specific behavior (growth animation).
 * Note: Z-index is managed by TileObjectContainerView.
 */
export class EggView implements GardenObjectView {
  public readonly displayObject: Sprite;
  private eggVisual: EggVisual;

  constructor(eggObject: EggTileObject, _worldPosition: GridPosition) {
    // Create EggVisual with timing data for growth animation
    this.eggVisual = new EggVisual({
      eggId: eggObject.eggId,
      plantedAt: eggObject.plantedAt,
      maturedAt: eggObject.maturedAt,
    });
    this.displayObject = this.eggVisual.sprite;
  }

  update(context: QuinoaFrameContext): void {
    // Update egg scale based on growth progress
    this.eggVisual.update(context.serverTime);
  }

  /**
   * Destroy the egg visual and its sprite.
   */
  destroy(): void {
    this.eggVisual.destroy();
  }
}
