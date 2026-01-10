import { Sprite } from 'pixi.js';
import { playSpatialSfx } from '@/audio/useQuinoaAudio';
import type { GridPosition } from '@/common/games/Quinoa/world/map';
import {
  type EggBlueprint,
  type EggId,
  EggsDex,
} from '@/common/games/Quinoa/systems/fauna';
import { getTextureFromTileRef } from '../../../legacy/tile-mappings';
import { getElasticProgress, getProgress } from '../../../sprite-utils';

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
  /**
   * World position for spatial sound effects.
   * Required for playing maturation sounds at the correct location.
   */
  worldPosition?: GridPosition;
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
  private readonly worldPosition?: GridPosition;
  private hasPlayedSound = false;

  constructor(options: EggVisualOptions) {
    const { eggId, plantedAt, maturedAt, worldPosition } = options;

    this.blueprint = EggsDex[eggId];
    this.plantedAt = plantedAt;
    this.maturedAt = maturedAt;
    this.worldPosition = worldPosition;

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

    // Calculate linear progress for sound trigger (not elastic)
    const progress = getProgress(this.plantedAt, this.maturedAt, serverTime);

    if (progress < 1) {
      // Reset the sound flag when the egg is not yet mature
      this.hasPlayedSound = false;
    } else if (!this.hasPlayedSound) {
      // Play the sound when the egg is fully mature
      this.hasPlayedSound = true;
      if (this.worldPosition) {
        playSpatialSfx('Plant_Matures', this.worldPosition);
      }
    }

    // Calculate elastic progress for smooth scale animation
    const elasticProgress = getElasticProgress(
      this.plantedAt,
      this.maturedAt,
      serverTime
    );
    const scale = EGG_MIN_SCALE + (1 - EGG_MIN_SCALE) * elasticProgress;
    this.sprite.scale.set(scale);
  }

  /**
   * Cleans up resources when the visual is no longer needed.
   */
  destroy(): void {
    this.sprite.destroy();
  }
}
