import { Sprite } from 'pixi.js';
import {
  type EggBlueprint,
  type EggId,
  EggsDex,
} from '@/common/games/Quinoa/systems/fauna';
import { getTextureFromTileRef } from '../../../legacy/tile-mappings';
import { getElasticProgress } from '../../../sprite-utils';

/** Minimum scale for eggs (when freshly placed or held in inventory). */
export const EGG_MIN_SCALE = 0.3;

export interface EggVisualOptions {
  eggId: EggId;
  /**
   * Optional timing data for growth animation.
   * If omitted, the egg displays at EGG_MIN_SCALE (e.g., held items).
   */
  plantedAt?: number;
  maturedAt?: number;
}

/**
 * Visual component for rendering egg items with correct texture and scale.
 *
 * Centralizes egg rendering logic for use in:
 * - World rendering (EggView)
 * - Held items (HeldItemVisual)
 *
 * If timing data (plantedAt/maturedAt) is provided, the egg animates from
 * EGG_MIN_SCALE to 1.0 using elastic easing. Otherwise, it stays at EGG_MIN_SCALE.
 */
export class EggVisual {
  /** The configured sprite ready for display. */
  public readonly sprite: Sprite;
  /** The egg blueprint for this visual. */
  public readonly blueprint: EggBlueprint;

  private readonly plantedAt?: number;
  private readonly maturedAt?: number;

  constructor(options: EggVisualOptions) {
    const { eggId, plantedAt, maturedAt } = options;

    this.blueprint = EggsDex[eggId];
    this.plantedAt = plantedAt;
    this.maturedAt = maturedAt;

    this.sprite = new Sprite({
      texture: getTextureFromTileRef(this.blueprint.tileRef),
    });

    // Start at minimum scale
    this.sprite.scale.set(EGG_MIN_SCALE);
  }

  /**
   * Updates the egg's scale based on server time.
   * Only animates if timing data was provided; otherwise no-op.
   *
   * @param serverTime - Current server time in milliseconds
   */
  update(serverTime: number): void {
    if (this.plantedAt === undefined || this.maturedAt === undefined) {
      return;
    }

    const progress = getElasticProgress(
      this.plantedAt,
      this.maturedAt,
      serverTime
    );
    const scale = EGG_MIN_SCALE + (1 - EGG_MIN_SCALE) * progress;
    this.sprite.scale.set(scale);
  }

  /**
   * Cleans up resources when the visual is no longer needed.
   */
  destroy(): void {
    this.sprite.destroy();
  }
}
