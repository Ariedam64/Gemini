import { Sprite } from 'pixi.js';
import {
  type DecorBlueprint,
  type DecorId,
  decorDex,
} from '@/common/games/Quinoa/systems/decor';
import { getDecorTileInfo } from '../../../legacy/QuinoaCanvasUtils';
import { getTextureFromTileRef } from '../../../legacy/tile-mappings';
import { applySpriteScale } from '../../../sprite-utils';

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
 * @example
 * ```typescript
 * const decorVisual = new DecorVisual({ decorId: 'bench', rotation: 90 });
 * container.addChild(decorVisual.sprite);
 *
 * // Clean up when done
 * decorVisual.destroy();
 * ```
 */
export class DecorVisual {
  /** The configured sprite ready for display. */
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
  }

  /**
   * Cleans up resources when the visual is no longer needed.
   */
  destroy(): void {
    this.sprite.destroy();
  }
}
