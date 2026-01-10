import {
  floraSpeciesDex,
  HarvestType,
} from '@/common/games/Quinoa/systems/flora';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import type {
  GardenTileObject,
  GrowSlot,
  InventoryItem,
} from '@/common/games/Quinoa/user-json-schema/current';
import InventorySprite from '../components/InventorySprite';
import { getProgress } from '../components/QuinoaCanvas/sprite-utils';
import { calculateServerNow } from './serverNow';

interface FutureGardenObjectIconProps {
  tileObject: GardenTileObject;
  renderFullyGrown?: boolean;
  millisecondsInTheFuture?: number;
}

/**
 * React component that renders an icon for a plant or egg,
 * optionally showing it in a future state.
 */
export function FutureGardenObjectIcon({
  tileObject,
  renderFullyGrown = false,
  millisecondsInTheFuture = 0,
}: FutureGardenObjectIconProps) {
  let item: InventoryItem | null = null;
  let canvasScale = 1;

  if (tileObject.objectType === 'plant') {
    const harvestType = floraSpeciesDex[tileObject.species].plant.harvestType;
    if (harvestType === HarvestType.Single) {
      const growSlot = tileObject.slots[0];
      const progress = renderFullyGrown
        ? 1
        : getProgress(
            growSlot.startTime - millisecondsInTheFuture,
            growSlot.endTime - millisecondsInTheFuture,
            calculateServerNow()
          );
      item = {
        id: '',
        species: tileObject.species,
        itemType: ItemType.Produce,
        scale: progress * growSlot.targetScale,
        mutations: growSlot.mutations,
      };
      canvasScale = 2.5;
    } else {
      const now = calculateServerNow();
      // Set endTime far enough in the past (>1000ms) so getElasticProgress
      // returns 1 (fully grown) instead of being in the elastic animation.
      const fullyGrownEndTime = now - 2000;
      item = {
        id: '',
        species: tileObject.species,
        itemType: ItemType.Plant,
        slots:
          tileObject.slots?.map((slot: GrowSlot) => ({
            species: slot.species,
            startTime: slot.startTime - millisecondsInTheFuture,
            endTime: renderFullyGrown
              ? fullyGrownEndTime
              : slot.endTime - millisecondsInTheFuture,
            targetScale: slot.targetScale,
            mutations: slot.mutations,
          })) ?? [],
        plantedAt: tileObject.plantedAt - millisecondsInTheFuture,
        maturedAt: renderFullyGrown
          ? now
          : tileObject.maturedAt - millisecondsInTheFuture,
      };
      canvasScale = 2;
    }
  }
  if (tileObject.objectType === 'egg') {
    item = {
      eggId: tileObject.eggId,
      itemType: ItemType.Egg,
      quantity: 1,
    };
  }
  if (!item) {
    return null;
  }
  return <InventorySprite item={item} size="50px" canvasScale={canvasScale} />;
}
