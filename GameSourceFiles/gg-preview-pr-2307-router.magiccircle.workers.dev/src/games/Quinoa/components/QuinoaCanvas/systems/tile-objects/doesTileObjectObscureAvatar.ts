/**
 * Tile Object Obscuring System
 *
 * Determines when tile objects should become semi-transparent to reveal
 * the avatar standing behind them.
 *
 * Obscuring Rules:
 * 1. If avatar is ON TOP of the object (background objects) → no obscuring
 * 2. If avatar is BEHIND the object → obscure if object is large enough
 *
 * The z-layer logic (avatar on top vs behind) is delegated to avatarZLayer.ts.
 */

import type { Texture } from 'pixi.js';
import {
  type FloraSpeciesId,
  floraSpeciesDex,
  HarvestType,
} from '@/common/games/Quinoa/systems/flora';
import type {
  DecorObject,
  GardenTileObject,
  PlantTileObject,
} from '@/common/games/Quinoa/user-json-schema/current';
import { getDecorTileInfo } from '../../legacy/QuinoaCanvasUtils';
import { getTextureFromTileRef } from '../../legacy/tile-mappings';
import {
  FLORA_FIXED_RENDER_SCALE,
  FLORA_SCALABLE_RENDER_SCALE,
  getElasticProgress,
  getProgress,
  ZLayer,
} from '../../sprite-utils';
import { getAvatarZLayerForTileObject } from './avatarZLayer';

export const TileObjectObscuringEffectConfig = {
  /** Minimum pixel size (width or height) for an object to trigger semi-transparency */
  minPixelSizeToObscure: 300,
  /** Alpha applied when the object is obscuring */
  alphaWhenObscuring: 0.7,
  /** Flora species that never obscure the avatar */
  speciesExemptFromObscuring: ['DragonFruit'] as FloraSpeciesId[],
};

export interface TileObjectObscuringInput {
  /** Tile object occupying the player's current tile */
  tileObject: GardenTileObject;
  /** Current authoritative server timestamp */
  serverNow: number;
}

/**
 * Determines whether a garden tile object should fade when the local player
 * stands on the same tile. Call this only when the player is on that tile.
 *
 * Note: Only the local player triggers this effect, not remote players.
 */
export function doesTileObjectObscureAvatar({
  tileObject,
  serverNow,
}: TileObjectObscuringInput): boolean {
  // Check species exemptions for plants
  if (
    tileObject.objectType === 'plant' &&
    TileObjectObscuringEffectConfig.speciesExemptFromObscuring.includes(
      tileObject.species
    )
  ) {
    return false;
  }
  // If avatar is on top of the object, no obscuring needed
  const zLayer = getAvatarZLayerForTileObject(tileObject);
  if (zLayer === ZLayer.AboveForeground) {
    return false;
  }
  // Avatar is behind the object - obscure if object is large enough
  const maxSize = getObjectMaxPixelSize(tileObject, serverNow);
  return maxSize >= TileObjectObscuringEffectConfig.minPixelSizeToObscure;
}

/**
 * Gets the max pixel size (max of width and height) of a tile object.
 *
 * @param tileObject - The tile object to measure
 * @param serverNow - Current server time (used for plant growth calculations)
 * @returns The max dimension in pixels
 */
function getObjectMaxPixelSize(
  tileObject: GardenTileObject,
  serverNow: number
): number {
  switch (tileObject.objectType) {
    case 'decor':
      return getDecorMaxPixelSize(tileObject);
    case 'plant':
      return getPlantMaxPixelSize(tileObject, serverNow);
    case 'egg':
      return 0;
  }
}

/**
 * Gets the dimensions (width and height) of a tile object.
 *
 * @param tileObject - The tile object to measure
 * @param serverNow - Current server time (used for plant growth calculations)
 * @returns Object containing width and height
 */
export function getObjectDimensions(
  tileObject: GardenTileObject,
  serverNow: number
) {
  switch (tileObject.objectType) {
    case 'decor':
      return getDecorDimensions(tileObject);
    case 'plant':
      return getPlantDimensions(tileObject, serverNow);
    case 'egg':
      return { width: 0, height: 0 };
  }
}

/**
 * Gets the dimensions of a decor object from its texture.
 */
function getDecorDimensions(decor: DecorObject) {
  const decorTileInfo = getDecorTileInfo(decor.decorId, decor.rotation);
  const texture = getTextureFromTileRef(decorTileInfo.tileRef);
  return { width: texture.width, height: texture.height };
}

/**
 * Gets the max pixel size of a decor object.
 */
function getDecorMaxPixelSize(decor: DecorObject): number {
  const { width, height } = getDecorDimensions(decor);
  return Math.max(width, height);
}

/**
 * Gets the render-scaled dimensions of a plant considering body and all crop slots.
 * Uses growth progress and render scales to determine current visual size.
 */
function getPlantDimensions(plantObject: PlantTileObject, serverNow: number) {
  const blueprint = floraSpeciesDex[plantObject.species];
  if (!blueprint) {
    return { width: 0, height: 0 };
  }
  const plantBlueprint = blueprint.plant;
  const bodyTexture = getTextureFromTileRef(plantBlueprint.tileRef);
  // Calculate body dimensions (only for multi-harvest plants)
  let bodyWidth = 0;
  let bodyHeight = 0;
  if (plantBlueprint.harvestType !== HarvestType.Single) {
    const isMature = plantObject.maturedAt <= serverNow;
    const plantProgress = isMature
      ? 1
      : getProgress(plantObject.plantedAt, plantObject.maturedAt, serverNow);
    bodyWidth = bodyTexture.width * plantProgress * FLORA_FIXED_RENDER_SCALE;
    bodyHeight = bodyTexture.height * plantProgress * FLORA_FIXED_RENDER_SCALE;
  }
  // Pre-fetch multi-harvest texture
  let multiHarvestCropTexture: Texture | undefined;
  if (plantBlueprint.harvestType === HarvestType.Multiple) {
    multiHarvestCropTexture = getTextureFromTileRef(blueprint.crop.tileRef);
  }
  // Calculate max dimensions from slots
  let maxSlotWidth = 0;
  let maxSlotHeight = 0;
  for (const slot of plantObject.slots) {
    if (!slot) {
      continue;
    }
    const slotProgress = getElasticProgress(
      slot.startTime,
      slot.endTime,
      serverNow
    );
    const texture =
      plantBlueprint.harvestType === HarvestType.Single
        ? bodyTexture
        : multiHarvestCropTexture;

    if (!texture) {
      continue;
    }
    const slotScale =
      slotProgress * slot.targetScale * FLORA_SCALABLE_RENDER_SCALE;
    maxSlotWidth = Math.max(maxSlotWidth, texture.width * slotScale);
    maxSlotHeight = Math.max(maxSlotHeight, texture.height * slotScale);
  }
  return {
    width: Math.max(bodyWidth, maxSlotWidth),
    height: Math.max(bodyHeight, maxSlotHeight),
  };
}

/**
 * Gets the max pixel size of a plant.
 */
function getPlantMaxPixelSize(
  plantObject: PlantTileObject,
  serverNow: number
): number {
  const { width, height } = getPlantDimensions(plantObject, serverNow);
  return Math.max(width, height);
}
