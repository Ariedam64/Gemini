import type { PlantTileObject } from '@/common/games/Quinoa/user-json-schema/current';
import { type FloraSpeciesId, floraSpeciesDex } from '../systems/flora';

export function getArePlantAndCropsFullyGrown(
  plantTileObject: PlantTileObject,
  now: number
): boolean {
  const { slots } = plantTileObject;
  const isPlantMature = plantTileObject.maturedAt <= now;
  const isCropFullyGrown = slots.every((slot) => slot.endTime <= now);
  return isPlantMature && isCropFullyGrown;
}

const baseTargetSize = 50;
const maxTargetSize = 100;

export function getTargetSize(
  speciesId: FloraSpeciesId,
  targetScale: number
): number {
  const { maxScale } = floraSpeciesDex[speciesId].crop;

  if (targetScale <= 1) {
    return baseTargetSize;
  }
  if (targetScale >= maxScale) {
    return maxTargetSize;
  }
  // Linearly interpolate between baseTargetSize at scale 1 and maxTargetSize at maxScale
  const scaleProgress = (targetScale - 1) / (maxScale - 1);
  const targetSize =
    baseTargetSize + (maxTargetSize - baseTargetSize) * scaleProgress;

  return Math.floor(targetSize);
}
