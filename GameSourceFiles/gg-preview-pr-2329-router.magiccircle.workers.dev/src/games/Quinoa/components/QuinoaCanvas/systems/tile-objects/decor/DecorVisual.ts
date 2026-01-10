import { Container, Sprite } from 'pixi.js';
import {
  type DecorBlueprint,
  type DecorId,
  decorDex,
} from '@/common/games/Quinoa/systems/decor';
import { getDecorTileInfo } from '../../../legacy/QuinoaCanvasUtils';
import { getTextureFromTileRef } from '../../../legacy/tile-mappings';
import { applySpriteScale, TILE_SIZE_WORLD } from '../../../sprite-utils';

/**
 * Options for creating a DecorVisual.
 */
export interface DecorVisualOptions {
  /** The decor ID to render. */
  decorId: DecorId;
  /** Rotation in degrees. Negative values indicate horizontal flip. */
  rotation?: number;
}

/**
 * Visual component for rendering decor items with correct texture and flips.
 *
 * Centralizes decor rendering logic for use in:
 * - World rendering (DecorView)
 * - Held items (HeldItemVisual)
 * - UI rendering (CanvasSpriteCache)
 *
 * Note: Decor textures are exported with tight bounds at their actual world size.
 * No scaling is applied - 1 texture pixel = 1 world pixel. Artists control decor
 * size by exporting at different pixel dimensions. `baseTileScale` and `nudgeY`
 * from DecorBlueprint are deprecated in favor of this approach.
 *
 * The container wraps the sprite to allow features to add children (required for
 * PixiJS v8 compatibility where only Containers can have children).
 *
 * @example
 * ```typescript
 * const decorVisual = new DecorVisual({ decorId: 'bench', rotation: 90 });
 * container.addChild(decorVisual.container);
 *
 * // Clean up when done
 * decorVisual.destroy();
 * ```
 */
export class DecorVisual {
  /** Container wrapping the sprite, ready for display. Use this for adding to parent containers. */
  public readonly container: Container;
  /** The configured sprite. Use container for most operations. */
  public readonly sprite: Sprite;
  /** The decor blueprint for this visual. */
  public readonly blueprint: DecorBlueprint;

  constructor(options: DecorVisualOptions) {
    const { decorId, rotation = 0 } = options;

    this.blueprint = decorDex[decorId];
    const tileInfo = getDecorTileInfo(decorId, rotation);

    this.sprite = new Sprite({
      texture: getTextureFromTileRef(tileInfo.tileRef),
    });

    // Apply flips only - no scaling (texture size = world size)
    applySpriteScale(this.sprite, 1, {
      flipH: tileInfo.flipH,
      flipV: tileInfo.flipV,
    });

    // Special positioning for String Lights based on rotation
    if (['ColoredStringLights', 'StringLights'].includes(decorId)) {
      const absRotation = Math.abs(rotation);
      // Calculate offset as 50% of tile size
      let offsetX = 0;
      let offsetY = 0;

      if (rotation === 0 || absRotation === 360) {
        // 0 and -360: shift up by 50% of tile height
        offsetY = -0.5 * TILE_SIZE_WORLD;
      } else if (absRotation === 180) {
        // 180 and -180: shift down by 50% of tile height
        offsetY = 0.5 * TILE_SIZE_WORLD;
      } else if (absRotation === 90) {
        // 90 and -90: shift right by 50% of tile width
        offsetX = 0.5 * TILE_SIZE_WORLD;
      } else if (absRotation === 270) {
        // 270 and -270: shift left by 50% of tile width
        offsetX = -0.5 * TILE_SIZE_WORLD;
      }
      this.sprite.position.set(offsetX, offsetY);
    }

    // Wrap sprite in container to allow features to add children (PixiJS v8 requirement)
    this.container = new Container({
      label: `${decorId} Container`,
    });
    this.container.addChild(this.sprite);
  }

  /**
   * Cleans up resources when the visual is no longer needed.
   */
  destroy(): void {
    this.container.destroy();
  }
}
