import { EggsDex } from '@/common/games/Quinoa/systems/fauna';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import type {
  GardenTileObject,
  GrowSlot,
  PlantInventoryItem,
} from '@/common/games/Quinoa/user-json-schema/current';
import type { TileRef } from '@/common/games/Quinoa/world/tiles';
import InventorySprite from '../components/InventorySprite';
import { calculateServerNow } from './serverNow';

/**
 * Creates a toast icon for the plant or egg.
 * @param tileObject - The tile object to create a toast icon for.
 * @returns A React node or tile ref.
 */
export function createInstaGrowToastIcon(
  tileObject: GardenTileObject
): React.ReactNode | TileRef {
  if (tileObject.objectType === 'plant') {
    const now = calculateServerNow();
    // Set endTime far enough in the past (>1000ms) so getElasticProgress
    // returns 1 (fully grown) instead of being in the elastic animation.
    const fullyGrownEndTime = now - 2000;
    const plantItem: PlantInventoryItem = {
      id: '',
      species: tileObject.species,
      itemType: ItemType.Plant,
      slots:
        tileObject.slots?.map((slot: GrowSlot) => ({
          species: slot.species,
          startTime: slot.startTime,
          endTime: fullyGrownEndTime,
          targetScale: slot.targetScale,
          mutations: slot.mutations,
        })) ?? [],
      plantedAt: tileObject.plantedAt,
      maturedAt: now,
    };
    return <InventorySprite item={plantItem} size="50px" canvasScale={2} />;
  }
  if (tileObject.objectType === 'egg') {
    return EggsDex[tileObject.eggId].tileRef;
  }
  return undefined;
}
