import { Container, type Sprite } from 'pixi.js';
import { playSpatialSfx } from '@/audio/useQuinoaAudio';
import {
  type FloraSpeciesId,
  HarvestType,
  type PlantBlueprint,
} from '@/common/games/Quinoa/systems/flora';
import type { GrowSlot } from '@/common/games/Quinoa/user-json-schema/current';
import type { GridPosition } from '@/common/games/Quinoa/world/map';
import { getNormalizedScale } from '@/Quinoa/utils/getNormalizedScale';
import {
  getCropWobbleAngle,
  getElasticProgress,
  getProgress,
  TILE_SIZE_WORLD,
} from '../../../../sprite-utils';
import { CropVisual } from './CropVisual';
import { PLANT_MIN_SCALE } from './constants';

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
  /** Whether to disable wobble rotation (for inventory/UI rendering). */
  disableWobbleRotation?: boolean;
  /** Whether to normalize scale values using getNormalizedScale. */
  normalizeScale?: boolean;
  /** World position for spatial audio (e.g., crop maturation sound). */
  worldPosition?: GridPosition;
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
  /** Whether to disable wobble rotation. */
  private readonly disableWobbleRotation: boolean;
  /** Whether to normalize scale values. */
  private readonly normalizeScale: boolean;
  /** The normalized target scale (if normalization is enabled). */
  private readonly normalizedTargetScale: number;
  /** The current base scale (slotProgress * targetScale), updated each frame. */
  private currentBaseScale: number = 0;
  /** World position for spatial audio. */
  private readonly worldPosition: GridPosition | undefined;

  private hasPlayedSound: boolean;

  constructor(options: GrowingCropVisualOptions) {
    const {
      species,
      plantBlueprint,
      slotIndex,
      slotOffset,
      slotState,
      disableWobbleRotation = false,
      normalizeScale = false,
      worldPosition,
    } = options;

    this.plantBlueprint = plantBlueprint;
    this.slotOffset = slotOffset;
    this.slotState = slotState;
    this.disableWobbleRotation = disableWobbleRotation;
    this.normalizeScale = normalizeScale;
    this.worldPosition = worldPosition;

    // Normalize targetScale if needed (before creating CropVisual)
    this.normalizedTargetScale = normalizeScale
      ? getNormalizedScale(slotState.targetScale)
      : slotState.targetScale;

    this.hasPlayedSound = this.normalizedTargetScale >= 1;

    // Create the core crop visual
    this.cropVisual = new CropVisual({
      scale: this.normalizedTargetScale,
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
    // Calculate progress to play popping sound when the crop is fully grown
    const progress = getProgress(
      this.slotState.startTime,
      this.slotState.endTime,
      serverTime
    );

    if (progress < 1) {
      // Reset the sound when the crop is less than 100% grown
      this.hasPlayedSound = false;
    } else if (!this.hasPlayedSound) {
      // Play the sound when the crop is fully grown and the sound hasn't been played yet
      this.hasPlayedSound = true;
      if (this.worldPosition) {
        playSpatialSfx('Plant_Matures', this.worldPosition);
      }
    }
    // Calculate growth progress with elastic easing
    const elaticProgress = getElasticProgress(
      this.slotState.startTime,
      this.slotState.endTime,
      serverTime
    );

    // Apply minimum scale for single-harvest plants (the crop is the plant body)
    const scaleProgress =
      this.plantBlueprint.harvestType === HarvestType.Single
        ? PLANT_MIN_SCALE + (1 - PLANT_MIN_SCALE) * elaticProgress
        : elaticProgress;

    // Update crop scale based on growth progress
    // Use normalized targetScale (calculated in constructor) to maintain consistency
    const scale = scaleProgress * this.normalizedTargetScale;
    this.currentBaseScale = scale;
    this.cropVisual.setScale(this.currentBaseScale);

    // Calculate rotation with wobble (skip wobble for isolated rendering)
    let angle = this.slotOffset.rotation;
    if (
      this.plantBlueprint.harvestType === HarvestType.Multiple &&
      this.plantBlueprint.rotateSlotOffsetsRandomly
    ) {
      angle -= this.slotOffset.rotation + (this.slotState.startTime % 70);
    }
    if (!this.disableWobbleRotation) {
      angle += getCropWobbleAngle(this.slotState.endTime, serverTime);
    }
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
