import { atom } from 'jotai';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import { inventoryLimit } from '@/common/games/Quinoa/utils/inventory';
import { nonPrimitiveAtom } from '@/utils/nonPrimitiveAtom';
import { myDataAtom } from './baseAtoms';

/**
 * My Inventory
 */
const myInventoryAtom = atom((get) => {
  const myData = get(myDataAtom);
  return myData?.inventory;
});

/**
 * My Inventory Items
 */
export const myInventoryItemsAtom = nonPrimitiveAtom((get) => {
  const myInventory = get(myInventoryAtom);
  return myInventory?.items ?? [];
});

export const isMyInventoryAtMaxLengthAtom = atom((get) => {
  const myInventoryItems = get(myInventoryItemsAtom);
  return myInventoryItems.length >= inventoryLimit;
});

/**
 * My Favorited Item IDs
 */
export const myFavoritedItemIdsAtom = nonPrimitiveAtom((get) => {
  const myInventory = get(myInventoryAtom);
  return myInventory?.favoritedItemIds ?? [];
});

export const myCropInventoryAtom = atom((get) => {
  const inventory = get(myInventoryItemsAtom);
  return inventory.filter((item) => item.itemType === ItemType.Produce);
});

export const mySeedInventoryAtom = atom((get) => {
  const inventory = get(myInventoryItemsAtom);
  return inventory.filter((item) => item.itemType === ItemType.Seed);
});

export const myToolInventoryAtom = atom((get) => {
  const inventory = get(myInventoryItemsAtom);
  return inventory.filter((item) => item.itemType === ItemType.Tool);
});

export const myEggInventoryAtom = atom((get) => {
  const inventory = get(myInventoryItemsAtom);
  return inventory.filter((item) => item.itemType === ItemType.Egg);
});

export const myDecorInventoryAtom = atom((get) => {
  const inventory = get(myInventoryItemsAtom);
  return inventory.filter((item) => item.itemType === ItemType.Decor);
});

export const myPetInventoryAtom = atom((get) => {
  const inventory = get(myInventoryItemsAtom);
  return inventory.filter((item) => item.itemType === ItemType.Pet);
});

export const itemTypeFiltersAtom = atom<Set<ItemType>>(new Set<ItemType>());

const myItemStoragesAtom = nonPrimitiveAtom((get) => {
  const myInventory = get(myInventoryAtom);
  return myInventory?.storages ?? [];
});

const myPetHutchStoragesAtom = atom((get) => {
  const storages = get(myItemStoragesAtom);
  return storages.filter((storage) => storage.decorId === 'PetHutch');
});

const myPetHutchItemsAtom = atom((get) => {
  const storages = get(myPetHutchStoragesAtom);
  return storages.flatMap((storage) => storage.items);
});

export const myPetHutchPetItemsAtom = atom((get) => {
  const myPetHutchItems = get(myPetHutchItemsAtom);
  return myPetHutchItems.filter((item) => item.itemType === ItemType.Pet);
});

export const myNumPetHutchItemsAtom = atom((get) => {
  const myPetHutchItems = get(myPetHutchItemsAtom);
  return myPetHutchItems.length;
});
