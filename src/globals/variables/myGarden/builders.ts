/**
 * myGarden Builders
 *
 * Functions for building typed objects from garden tile data.
 *
 * @module globals/variables/myGarden/builders
 */

import type {
  PlantWithTile,
  CropInfo,
  EggWithTile,
  DecorWithTile,
  TileIndex,
  XY,
} from "../../core/types";
import type {
  PlantTileObject,
  EggTileObject,
  DecorTileObject,
  GrowSlot,
  DecorRotation,
} from "../../../atoms/types";

export function buildPlantWithTile(
  tileIndex: TileIndex,
  plant: PlantTileObject,
  position: XY,
  now: number
): PlantWithTile {
  const matureSlotsCount = plant.slots.filter((slot) => now >= slot.endTime).length;
  return {
    tileIndex,
    position,
    species: plant.species,
    plantedAt: plant.plantedAt,
    maturedAt: plant.maturedAt,
    isMature: now >= plant.maturedAt,
    slots: plant.slots,
    slotsCount: plant.slots.length,
    matureSlotsCount,
  };
}

export function buildCropInfo(
  tileIndex: TileIndex,
  position: XY,
  slotIndex: number,
  slot: GrowSlot,
  now: number
): CropInfo {
  // Each CropInfo represents ONE fruit slot
  // Multi-harvest plants create multiple CropInfo objects (one per fruit)
  // So fruitCount is always 1 - no weighting needed!
  const fruitCount = 1;

  return {
    tileIndex,
    position,
    slotIndex,
    species: slot.species,
    startTime: slot.startTime,
    endTime: slot.endTime,
    targetScale: slot.targetScale,
    mutations: [...slot.mutations],
    isMature: now >= slot.endTime,
    fruitCount,
  };
}

export function buildEggWithTile(
  tileIndex: TileIndex,
  egg: EggTileObject,
  position: XY,
  now: number
): EggWithTile {
  return {
    tileIndex,
    position,
    eggId: egg.eggId,
    plantedAt: egg.plantedAt,
    maturedAt: egg.maturedAt,
    isMature: now >= egg.maturedAt,
  };
}

export function buildDecorWithTile(
  tileIndex: TileIndex,
  decor: DecorTileObject,
  position: XY,
  location: "tileObjects" | "boardwalk"
): DecorWithTile {
  return {
    tileIndex,
    position,
    decorId: decor.decorId,
    rotation: decor.rotation as DecorRotation,
    location,
  };
}
