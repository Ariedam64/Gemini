import { Container, type Sprite } from 'pixi.js';
import {
  type FloraSpeciesId,
  HarvestType,
  type PlantBlueprint,
} from '@/common/games/Quinoa/systems/flora';
import type { GrowSlot } from '@/common/games/Quinoa/user-json-schema/current';
import {
  getCropWobbleAngle,
  getElasticProgress,
  TILE_SIZE_WORLD,
} from '../../../../sprite-utils';
import { CropVisual } from './CropVisual';

/**
 * Options for creating a GrowingCropVisual.
 */
export interface GrowingCropVisualOptions {
  /** The flora species ID. */
  species: FloraSpeciesId;
  /** The plant blueprint (for rotation and animation behavior). */
  plantBlueprint: PlantBlueprint;
  /** The index of this crop's slot on the plant. */
  slotIndex: number;
  /** Position and rotation offset for this slot. */
  slotOffset: { x: number; y: number; rotation: number };
  /** The grow slot state with timing and scale data. */
  slotState: GrowSlot;
}

/**
 * Options passed to update().
 */
export interface GrowingCropUpdateOptions {
  /** Whether the host plant has matured. */
  isPlantMature: boolean;
}

/**
 * Wrapper around CropVisual that adds plant-specific growth behavior.
 *
 * Handles:
 * - Slot positioning (x, y offsets from plant center)
 * - Growth progress animation (elastic scale)
 * - Wobble rotation animation
 *
 * The actual crop rendering (texture, mutations, icons) is delegated to CropVisual.
 * Plant-specific animations (like Starweaver pulse) are handled by PlantVisualFeature
 * implementations.
 *
 * @example
 * ```typescript
 * const growingCrop = new GrowingCropVisual({
 *   species: 'Carrot',
 *   plantBlueprint: blueprint.plant,
 *   slotIndex: 0,
 *   slotOffset: { x: 0.1, y: -0.2, rotation: 5 },
 *   slotState: plant.slots[0],
 * });
 * container.addChild(growingCrop.container);
 *
 * // Each frame:
 * growingCrop.update(context, { isPlantMature: true });
 * ```
 */
export class GrowingCropVisual {
  /** Root container holding the crop visual. */
  public readonly container: Container;
  /** The underlying crop visual for rendering. */
  private readonly cropVisual: CropVisual;
  /** The grow slot state with timing data. */
  private readonly slotState: GrowSlot;
  /** The plant blueprint for animation behavior. */
  private readonly plantBlueprint: PlantBlueprint;
  /** The slot offset for positioning and rotation. */
  private readonly slotOffset: { x: number; y: number; rotation: number };
  /** The current base scale (slotProgress * targetScale), updated each frame. */
  private currentBaseScale: number = 0;

  constructor(options: GrowingCropVisualOptions) {
    const { species, plantBlueprint, slotIndex, slotOffset, slotState } =
      options;

    this.plantBlueprint = plantBlueprint;
    this.slotOffset = slotOffset;
    this.slotState = slotState;

    // Create the core crop visual
    this.cropVisual = new CropVisual({
      scale: slotState.targetScale,
      mutations: slotState.mutations,
      floraSpeciesId: species,
      mode: 'plant',
    });

    // Create positioning container
    this.container = new Container({
      label: `${species} slot-${slotIndex}`,
      x: slotOffset.x * TILE_SIZE_WORLD,
      y: slotOffset.y * TILE_SIZE_WORLD,
    });

    // Add crop visual to container
    this.container.addChild(this.cropVisual.container);
  }

  /**
   * Updates scale and rotation based on growth progress.
   */
  update(serverTime: number): void {
    // Calculate growth progress with elastic easing
    const slotProgress = getElasticProgress(
      this.slotState.startTime,
      this.slotState.endTime,
      serverTime
    );

    // Update crop scale based on growth progress
    this.currentBaseScale = slotProgress * this.slotState.targetScale;
    this.cropVisual.setScale(this.currentBaseScale);

    // Calculate rotation with wobble
    let angle = this.slotOffset.rotation;
    if (
      this.plantBlueprint.harvestType === HarvestType.Multiple &&
      this.plantBlueprint.rotateSlotOffsetsRandomly
    ) {
      angle -= this.slotOffset.rotation + (this.slotState.startTime % 70);
    }
    angle += getCropWobbleAngle(this.slotState.endTime, serverTime);
    this.container.angle = angle;
  }

  /**
   * Sets the crop's scale. Used by features to apply effects like pulses.
   * @param scale - The scale to apply to the crop visual.
   */
  setScale(scale: number): void {
    this.cropVisual.setScale(scale);
  }

  /**
   * Sets the container's rotation angle. Used by features for rotation effects.
   * @param angle - The angle in degrees.
   */
  setAngle(angle: number): void {
    this.container.angle = angle;
  }

  /**
   * Gets the current base scale (slotProgress * targetScale).
   * Updated each frame in update(). Used by features as a baseline for effects.
   * @returns The current base scale value.
   */
  getCurrentBaseScale(): number {
    return this.currentBaseScale;
  }

  /**
   * Cleans up resources when the visual is no longer needed.
   */
  destroy(): void {
    this.cropVisual.destroy();
    this.container.destroy({ children: false }); // Children already destroyed
  }

  /**
   * Returns the crop sprite used for hit testing.
   */
  getInteractionTarget(): Sprite {
    return this.cropVisual.getSprite();
  }

  getTargetScale(): number {
    return this.slotState.targetScale;
  }
}
