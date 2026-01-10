import { instaGrowCreditCostPerSecond } from '../constants';
import { PlantTileObject, EggTileObject } from '../user-json-schema/current';

export function getInstaGrowSecondsSaved(
  tileObject: PlantTileObject | EggTileObject,
  now: number
): number {
  if (tileObject.objectType === 'plant') {
    const latestGrowSlotEndTime = Math.max(
      ...tileObject.slots.map((slot) => slot.endTime)
    );
    return Math.ceil(Math.max(0, (latestGrowSlotEndTime - now) / 1000));
  }
  return Math.ceil(Math.max(0, (tileObject.maturedAt - now) / 1000));
}

export function getInstaGrowCost(
  tileObject: PlantTileObject | EggTileObject,
  now: number
): number {
  const secondsSaved = getInstaGrowSecondsSaved(tileObject, now);
  return Math.ceil(secondsSaved * instaGrowCreditCostPerSecond);
}
