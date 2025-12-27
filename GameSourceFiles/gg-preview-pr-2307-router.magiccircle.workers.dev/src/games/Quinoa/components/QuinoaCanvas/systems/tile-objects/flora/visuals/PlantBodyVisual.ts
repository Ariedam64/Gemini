import { Container, type ObservablePoint, Sprite } from 'pixi.js';
import {
  type FloraSpeciesBlueprint,
  HarvestType,
} from '@/common/games/Quinoa/systems/flora';
import type { PlantTileObject } from '@/common/games/Quinoa/user-json-schema/current';
import { getTextureFromTileRef } from '../../../../legacy/tile-mappings';
import {
  FLORA_FIXED_RENDER_SCALE,
  getProgress,
} from '../../../../sprite-utils';
import { GrowingCropVisual } from './GrowingCropVisual';

interface PlantBodyVisualOptions {
  plant: PlantTileObject;
  blueprint: FloraSpeciesBlueprint;
  forceMaxScale: boolean;
}

/**
 * Manages the visual representation of the main plant body.
 *
 * For Single Harvest plants (e.g. Carrots, Pumpkins):
 * - Uses a single GrowingCropVisual (in `crops[0]`) to render the plant/crop growing.
 * - No separate "base sprite".
 *
 * For Multiple Harvest plants (e.g. Bushes, Trees):
 * - Uses a base Sprite for the plant itself (which grows 0->1).
 * - Uses multiple GrowingCropVisuals as children for the fruit/produce.
 */
export class PlantBodyVisual {
  public readonly container: Container;

  /** Crops. For single-harvest, this contains the single main plant visual. */
  public readonly crops: GrowingCropVisual[] = [];

  // --- Multi Harvest Components ---
  private readonly plantBaseSprite?: Sprite;

  constructor(private readonly options: PlantBodyVisualOptions) {
    const { blueprint } = options;
    const plantBlueprint = blueprint.plant;

    this.container = new Container({
      label: `${plantBlueprint.name} PlantBody`,
      sortableChildren: true,
      zIndex: 0,
    });

    if (plantBlueprint.harvestType === HarvestType.Single) {
      // --- Single Harvest Setup ---
      this.container.scale.set(1);
    } else {
      // --- Multi Harvest Setup ---
      this.container.scale.set(FLORA_FIXED_RENDER_SCALE);

      // Create Base Sprite (The Bush/Tree)
      this.plantBaseSprite = Sprite.from(
        getTextureFromTileRef(plantBlueprint.tileRef)
      );
      this.plantBaseSprite.zIndex = 0;
      this.container.addChild(this.plantBaseSprite);
    }

    // Create visuals for all slots (whether single or multi harvest)
    this.createCrops();
  }

  /**
   * Updates the plant body's scale and rotation for the current frame.
   * Also updates any crop visuals.
   */
  update(serverTime: number): void {
    const { plant, blueprint, forceMaxScale } = this.options;
    const isMature = plant.maturedAt <= serverTime;

    // 1. Update Base Sprite (Multi-harvest maturity growth)
    // Optimization: Only calculate progress if not yet mature or forced.
    // Once mature, the tree stays at scale 1.0.
    if (this.plantBaseSprite) {
      if (
        blueprint.plant.harvestType === HarvestType.Multiple &&
        blueprint.plant.immatureTileRef &&
        !isMature
      ) {
        this.plantBaseSprite.scale.set(0);
      } else if (isMature || forceMaxScale) {
        this.plantBaseSprite.scale.set(1);
      } else {
        const plantProgress = getProgress(
          plant.plantedAt,
          plant.maturedAt,
          serverTime
        );
        this.plantBaseSprite.scale.set(plantProgress);
      }
    }

    // 2. Update Crop Visuals
    // Handle single harvest forceMaxScale by mocking time if needed
    let serverTimeForCropUpdate = serverTime;
    if (
      forceMaxScale &&
      blueprint.plant.harvestType === HarvestType.Single &&
      plant.slots[0]
    ) {
      serverTimeForCropUpdate = plant.slots[0].endTime + 1000;
    }

    for (const cropVisual of this.crops) {
      cropVisual.update(serverTimeForCropUpdate);
    }
  }

  /**
   * Expose the container's position (relative to parent, i.e., the tile offset).
   */
  get position(): ObservablePoint {
    return this.container.position;
  }

  /**
   * Expose the container's current scale.
   */
  get scale(): ObservablePoint {
    return this.container.scale;
  }

  /**
   * Expose the container's current angle.
   */
  get angle(): number {
    return this.container.angle;
  }

  /**
   * Expose the base sprite's anchor.
   */
  get anchor(): ObservablePoint {
    if (this.plantBaseSprite) {
      return this.plantBaseSprite.anchor;
    }
    return this.container.pivot;
  }

  /**
   * Creates visuals for all valid slots on the plant.
   * Handles both single-harvest (1 slot, centered) and multi-harvest (N slots, offset).
   */
  private createCrops(): void {
    const { plant, blueprint } = this.options;
    const plantBlueprint = blueprint.plant;

    // 1. Determine offsets and rendering rules
    const slotConfigs: Array<{
      index: number;
      offset: { x: number; y: number; rotation: number };
    }> = [];

    if (plantBlueprint.harvestType === HarvestType.Single) {
      // Single Harvest: Slot 0 is the plant body itself, centered
      if (plant.slots[0]) {
        slotConfigs.push({
          index: 0,
          offset: { x: 0, y: 0, rotation: 0 },
        });
      } else {
        console.warn('No slot found for single harvest plant', plant);
      }
    } else {
      // Multi Harvest: Slots are fruit attachments, offset relative to tree center
      // Calculate anchor offset to center children on the sprite
      let anchorOffsetX = 0;
      let anchorOffsetY = 0;

      if (this.plantBaseSprite) {
        const anchor = this.plantBaseSprite.anchor;
        const textureWidth = this.plantBaseSprite.texture.width;
        const textureHeight = this.plantBaseSprite.texture.height;
        anchorOffsetX = (0.5 - anchor.x) * textureWidth;
        anchorOffsetY = (0.5 - anchor.y) * textureHeight;
      }

      for (let i = 0; i < plant.slots.length; i++) {
        // Skip slots that haven't started growing yet (though usually they exist)
        // or slots without blueprint offsets
        const offset = plantBlueprint.slotOffsets[i];
        if (!offset) continue;

        slotConfigs.push({
          index: i,
          offset: {
            x: offset.x, // Will be adjusted by TILE_SIZE_WORLD in GrowingCropVisual
            y: offset.y,
            rotation: offset.rotation,
          },
          // No tileRef override; use species default (Crop)
        });
      }

      // Store anchor offset to apply after creation
      // (We could pass this into GrowingCropVisual, but adjusting container is simpler for now)
      // Actually, let's apply it to the created containers.
      this.multiHarvestAnchorOffset = { x: anchorOffsetX, y: anchorOffsetY };
    }

    // 2. Instantiate Visuals
    for (const slotConfig of slotConfigs) {
      const slotState = plant.slots[slotConfig.index];
      if (!slotState) continue;

      const crop = new GrowingCropVisual({
        species: plant.species,
        plantBlueprint,
        slotIndex: slotConfig.index,
        slotOffset: slotConfig.offset,
        slotState,
      });

      // Apply anchor adjustment for multi-harvest
      if (this.multiHarvestAnchorOffset) {
        crop.container.position.x += this.multiHarvestAnchorOffset.x;
        crop.container.position.y += this.multiHarvestAnchorOffset.y;
      }

      this.container.addChild(crop.container);
      // Z-Index: For single harvest, it's 0. For multi, it's 2+index (above base sprite)
      // Note: PlantInteractionController overrides this zIndex for hover effects (sets it to 100)
      crop.container.zIndex =
        plantBlueprint.harvestType === HarvestType.Single
          ? 0
          : 2 + slotConfig.index;

      this.crops.push(crop);
    }
  }

  private multiHarvestAnchorOffset?: { x: number; y: number };
}
