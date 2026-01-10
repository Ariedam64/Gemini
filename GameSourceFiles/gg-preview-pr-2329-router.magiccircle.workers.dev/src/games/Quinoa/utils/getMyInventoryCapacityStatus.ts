import { getDefaultStore } from 'jotai';
import {
  getInventoryCapacityStatus,
  type itemToAddInfo,
} from '@/common/games/Quinoa/utils/inventory';
import { myInventoryItemsAtom } from '@/Quinoa/atoms/inventoryAtoms';

const { get } = getDefaultStore();

export function getMyInventoryCapacityStatus(itemToAdd: itemToAddInfo) {
  const inventoryItems = get(myInventoryItemsAtom);
  return getInventoryCapacityStatus(inventoryItems, itemToAdd);
}
