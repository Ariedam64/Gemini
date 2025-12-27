import { atom } from 'jotai';
import { nonPrimitiveAtom } from '@/utils/nonPrimitiveAtom';
import { simpleSelectAtom } from '@/utils/simpleSelectAtom';
import { myDataAtom, myUserSlotAtom, quinoaDataAtom } from './baseAtoms';

// Shared
const customRestockInventoriesAtom = atom((get) => {
  const myUserSlot = get(myUserSlotAtom);
  return myUserSlot?.type === 'user'
    ? myUserSlot.customRestockInventories
    : null;
});

export const myShopPurchasesAtom = atom((get) => {
  const myData = get(myDataAtom);
  return myData?.shopPurchases;
});

// Decor Shop
export const decorShopAtom = simpleSelectAtom(
  quinoaDataAtom,
  (quinoaData) => quinoaData.shops.decor
);

export const decorShopCustomRestockInventoryAtom = nonPrimitiveAtom(
  (get) => get(customRestockInventoriesAtom)?.decor
);

export const decorShopInventoryAtom = nonPrimitiveAtom((get) => {
  const { inventory: defaultInventory } = get(decorShopAtom);
  const customDecorShopInventory = get(decorShopCustomRestockInventoryAtom);
  const inventory = customDecorShopInventory?.items ?? defaultInventory;
  return inventory.filter((item) => item.decorId !== 'PetHutch');
});

export const decorShopRestockSecondsAtom = atom((get) => {
  const { secondsUntilRestock } = get(decorShopAtom);
  const customDecorShopInfo = get(decorShopCustomRestockInventoryAtom);
  return Math.floor(
    customDecorShopInfo?.secondsUntilExpiration ?? secondsUntilRestock
  );
});

export const isDecorShopAboutToRestockAtom = atom((get) => {
  const restockSeconds = get(decorShopRestockSecondsAtom);
  // Return true if decor shop is 1 second away from restocking
  return restockSeconds === 1;
});

// Seed Shop
export const seedShopAtom = simpleSelectAtom(
  quinoaDataAtom,
  (quinoaData) => quinoaData.shops.seed
);

export const seedShopCustomRestockInventoryAtom = nonPrimitiveAtom(
  (get) => get(customRestockInventoriesAtom)?.seed
);

export const seedShopInventoryAtom = nonPrimitiveAtom((get) => {
  const { inventory } = get(seedShopAtom);
  const customSeedShopInfo = get(seedShopCustomRestockInventoryAtom);
  return customSeedShopInfo?.items ?? inventory;
});

export const seedShopRestockSecondsAtom = atom((get) => {
  const { secondsUntilRestock } = get(seedShopAtom);
  const customSeedShopInfo = get(seedShopCustomRestockInventoryAtom);
  return Math.floor(
    customSeedShopInfo?.secondsUntilExpiration ?? secondsUntilRestock
  );
});

// Egg Shop
export const eggShopAtom = simpleSelectAtom(
  quinoaDataAtom,
  (quinoaData) => quinoaData.shops.egg
);

export const eggShopCustomRestockInventoryAtom = nonPrimitiveAtom(
  (get) => get(customRestockInventoriesAtom)?.egg
);

export const eggShopInventoryAtom = nonPrimitiveAtom((get) => {
  const { inventory } = get(eggShopAtom);
  const customEggShopInfo = get(eggShopCustomRestockInventoryAtom);
  return customEggShopInfo?.items ?? inventory;
});

export const eggShopRestockSecondsAtom = atom((get) => {
  const { secondsUntilRestock } = get(eggShopAtom);
  const customEggShopInfo = get(eggShopCustomRestockInventoryAtom);
  return Math.floor(
    customEggShopInfo?.secondsUntilExpiration ?? secondsUntilRestock
  );
});

// Tool Shop
export const toolShopAtom = simpleSelectAtom(
  quinoaDataAtom,
  (quinoaData) => quinoaData.shops.tool
);

export const toolShopCustomRestockInventoryAtom = nonPrimitiveAtom(
  (get) => get(customRestockInventoriesAtom)?.tool
);

export const toolShopInventoryAtom = nonPrimitiveAtom((get) => {
  const { inventory } = get(toolShopAtom);
  const customToolShopInfo = get(toolShopCustomRestockInventoryAtom);
  return customToolShopInfo?.items ?? inventory;
});

export const toolShopRestockSecondsAtom = atom((get) => {
  const { secondsUntilRestock } = get(toolShopAtom);
  const customToolShopInfo = get(toolShopCustomRestockInventoryAtom);
  return Math.floor(
    customToolShopInfo?.secondsUntilExpiration ?? secondsUntilRestock
  );
});
