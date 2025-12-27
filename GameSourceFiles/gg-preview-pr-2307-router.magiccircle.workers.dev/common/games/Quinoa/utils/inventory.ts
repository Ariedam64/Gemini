import { ItemType } from '../systems/inventory';
import { ToolId, toolsDex } from '../systems/tools';
import { InventoryItem } from '../user-json-schema/current';

export const inventoryLimit = 100;
export const petHutchInventoryLimit = 25;

export type itemToAddInfo = { itemType: ItemType; id: string };

function getIsInventoryFull(
  inventoryItems: InventoryItem[],
  itemToAdd: itemToAddInfo
): boolean {
  const isInventoryAtMaxLength = inventoryItems.length >= inventoryLimit;
  // For crops and plants, just check if inventory has space
  if (
    itemToAdd.itemType === ItemType.Produce ||
    itemToAdd.itemType === ItemType.Plant ||
    itemToAdd.itemType === ItemType.Pet
  ) {
    return isInventoryAtMaxLength;
  } else if (itemToAdd.itemType === ItemType.Seed) {
    // Seeds are stackable - can add if inventory has space OR we already have this seed species
    const alreadyHasSeed = inventoryItems
      .filter((i) => i.itemType === ItemType.Seed)
      .some((i) => i.species === itemToAdd.id);
    return isInventoryAtMaxLength && !alreadyHasSeed;
  } else if (itemToAdd.itemType === ItemType.Tool) {
    // Tools are stackable - can add if inventory has space OR we already have this tool
    const alreadyHasTool = inventoryItems
      .filter((i) => i.itemType === ItemType.Tool)
      .some((i) => i.toolId === itemToAdd.id);
    return isInventoryAtMaxLength && !alreadyHasTool;
  } else if (itemToAdd.itemType === ItemType.Egg) {
    // Eggs are stackable - can add if inventory has space OR we already have this egg
    const alreadyHasEgg = inventoryItems
      .filter((i) => i.itemType === ItemType.Egg)
      .some((i) => i.eggId === itemToAdd.id);
    return isInventoryAtMaxLength && !alreadyHasEgg;
  } else if (itemToAdd.itemType === ItemType.Decor) {
    // Decor are stackable - can add if inventory has space OR we already have this decor
    const alreadyHasDecor = inventoryItems
      .filter((i) => i.itemType === ItemType.Decor)
      .some((i) => i.decorId === itemToAdd.id);
    return isInventoryAtMaxLength && !alreadyHasDecor;
  }
  // This should never be reached due to exhaustive type checking
  return true;
}

function getIsItemAtMaxQuantity(
  inventoryItems: InventoryItem[],
  itemToAdd: itemToAddInfo
): boolean {
  if (itemToAdd.itemType === ItemType.Tool) {
    const blueprint = toolsDex[itemToAdd.id as ToolId];
    if ('maxInventoryQuantity' in blueprint) {
      const existingQuantity =
        inventoryItems
          .filter((i) => i.itemType === ItemType.Tool)
          .find((i) => i.toolId === itemToAdd.id)?.quantity ?? 0;
      return existingQuantity >= blueprint.maxInventoryQuantity;
    }
    return false;
  } else if (itemToAdd.itemType === ItemType.Seed) {
    // Seeds currently have no maxInventoryQuantity property
    return false;
  } else if (itemToAdd.itemType === ItemType.Egg) {
    // Eggs currently have no maxInventoryQuantity property
    return false;
  } else if (itemToAdd.itemType === ItemType.Decor) {
    // Decor currently have no maxInventoryQuantity property
    return false;
  }
  // Unique items like crops, plants, pets, etc. have no max quantity
  return false;
}

export function getInventoryCapacityStatus(
  inventoryItems: InventoryItem[],
  itemsToAdd: itemToAddInfo
) {
  const isInventoryFull = getIsInventoryFull(inventoryItems, itemsToAdd);
  const isItemAtMaxQuantity = getIsItemAtMaxQuantity(
    inventoryItems,
    itemsToAdd
  );
  return { isInventoryFull, isItemAtMaxQuantity };
}

export const getInventoryItemId = (item: InventoryItem): string => {
  switch (item.itemType) {
    case ItemType.Produce:
      return item.id;
    case ItemType.Plant:
      return item.id;
    case ItemType.Pet:
      return item.id;
    case ItemType.Seed:
      return item.species;
    case ItemType.Tool:
      return item.toolId;
    case ItemType.Egg:
      return item.eggId;
    case ItemType.Decor:
      return item.decorId;
  }
};
