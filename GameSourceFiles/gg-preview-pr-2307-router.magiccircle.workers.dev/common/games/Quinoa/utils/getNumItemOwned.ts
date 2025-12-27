import { ItemType } from '../systems/inventory';
import { QuinoaUserJson } from '../user-json-schema/current';
import { itemToAddInfo } from './inventory';

export const getNumItemOwned = (
  myData: QuinoaUserJson,
  itemToAdd: itemToAddInfo
) => {
  const inventoryItems = myData.inventory.items;
  const allGardenTileObjects = [
    ...Object.values(myData.garden.tileObjects),
    ...Object.values(myData.garden.boardwalkTileObjects),
  ];
  const petSlots = myData.petSlots;
  let count = 0;

  switch (itemToAdd.itemType) {
    case ItemType.Tool: {
      // For tools, only check inventory items
      count = inventoryItems
        .filter((item) => item.itemType === ItemType.Tool)
        .filter((item) => item.toolId === itemToAdd.id)
        .reduce((sum, item) => sum + item.quantity, 0);
      break;
    }
    case ItemType.Egg: {
      // For eggs, check inventory and tile objects
      const inventoryCount = inventoryItems
        .filter((item) => item.itemType === ItemType.Egg)
        .filter((item) => item.eggId === itemToAdd.id)
        .reduce((sum, item) => sum + item.quantity, 0);

      const tileCount = [...allGardenTileObjects]
        .filter((tileObject) => tileObject.objectType === 'egg')
        .filter((tileObject) => tileObject.eggId === itemToAdd.id).length;

      count = inventoryCount + tileCount;
      break;
    }
    case ItemType.Seed: {
      // For seeds, check inventory and tile objects
      const inventoryCount = inventoryItems
        .filter((item) => item.itemType === ItemType.Seed)
        .filter((item) => item.species === itemToAdd.id)
        .reduce((sum, item) => sum + item.quantity, 0);

      const tileCount = [...allGardenTileObjects]
        .filter((tileObject) => tileObject.objectType === 'plant')
        .filter((tileObject) => tileObject.species === itemToAdd.id).length;

      count = inventoryCount + tileCount;
      break;
    }
    case ItemType.Decor: {
      // For decor, check inventory and tile objects
      const inventoryCount = inventoryItems
        .filter((item) => item.itemType === ItemType.Decor)
        .filter((item) => item.decorId === itemToAdd.id)
        .reduce((sum, item) => sum + item.quantity, 0);

      const tileCount = [...allGardenTileObjects]
        .filter((tileObject) => tileObject.objectType === 'decor')
        .filter((tileObject) => tileObject.decorId === itemToAdd.id).length;

      count = inventoryCount + tileCount;
      break;
    }
    case ItemType.Pet: {
      // For pets, check inventory and tile objects
      const inventoryCount = inventoryItems
        .filter((item) => item.itemType === ItemType.Pet)
        .filter((item) => item.petSpecies === itemToAdd.id).length;

      const petSlotsCount = petSlots.filter(
        (slot) => slot.petSpecies === itemToAdd.id
      ).length;

      count = inventoryCount + petSlotsCount;
      break;
    }
    case ItemType.Produce: {
      // For produce, check inventory and tile objects
      const inventoryCount = inventoryItems
        .filter((item) => item.itemType === ItemType.Produce)
        .filter((item) => item.species === itemToAdd.id).length;

      count = inventoryCount;
      break;
    }
    case ItemType.Plant: {
      // For plants, check inventory and tile objects
      const inventoryCount = inventoryItems
        .filter((item) => item.itemType === ItemType.Plant)
        .filter((item) => item.species === itemToAdd.id).length;

      const tileCount = [...allGardenTileObjects]
        .filter((tileObject) => tileObject.objectType === 'plant')
        .filter((tileObject) => tileObject.species === itemToAdd.id).length;

      count = inventoryCount + tileCount;
      break;
    }
  }
  return count;
};
