import { atom } from 'jotai';
import { faunaSpeciesDex } from '@/common/games/Quinoa/systems/fauna';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import {
  getHasNewVariant,
  getNewLogs,
} from '@/common/games/Quinoa/utils/journal';
import { getPetScale } from '@/common/games/Quinoa/utils/pets';
import {
  calculateFriendBonusMultiplier,
  getCropSellPrice,
} from '@/common/games/Quinoa/utils/sell';
import type { PetInfo } from '../components/QuinoaCanvas/legacy/canvas-types';
import {
  currentTimeAtom,
  filteredUserSlotsAtom,
  userSlotsAtom,
} from './baseAtoms';
import { myFavoritedItemIdsAtom, myInventoryItemsAtom } from './inventoryAtoms';
import { myJournalAtom, mySelectedItemAtom } from './myAtoms';

export const petInfosAtom = atom<PetInfo[]>((get) => {
  const petInfos: PetInfo[] = [];
  const userSlots = get(userSlotsAtom);
  for (const slot of userSlots) {
    if (slot !== null) {
      for (const petSlot of slot.data.petSlots) {
        const position = slot.petSlotInfos[petSlot.id]?.position;
        if (position) {
          petInfos.push({
            slot: petSlot,
            position,
          });
        }
      }
    }
  }
  return petInfos;
});

export const myCropItemsAtom = atom((get) => {
  const myInventoryItems = get(myInventoryItemsAtom);
  return myInventoryItems.filter((item) => item.itemType === ItemType.Produce);
});

export const myCropItemsToSellAtom = atom((get) => {
  const myInventoryItems = get(myInventoryItemsAtom);
  const favoritedIds = get(myFavoritedItemIdsAtom);
  return myInventoryItems
    .filter((item) => item.itemType === ItemType.Produce)
    .filter((item) => !favoritedIds.includes(item.id));
});

export const friendBonusMultiplierAtom = atom((get) => {
  const users = get(filteredUserSlotsAtom);
  const numFriends = users.length - 1;
  return calculateFriendBonusMultiplier(numFriends);
});

export const totalCropSellPriceAtom = atom((get) => {
  const friendBonusMultiplier = get(friendBonusMultiplierAtom);
  const myCropItemsToSell = get(myCropItemsToSellAtom);
  return Math.floor(
    myCropItemsToSell
      .filter((item) => item.itemType === ItemType.Produce)
      .reduce((acc, item) => acc + getCropSellPrice(item), 0) *
      friendBonusMultiplier
  );
});

export const newLogsAtom = atom((get) => {
  const myInventoryItems = get(myInventoryItemsAtom);
  const journal = get(myJournalAtom);
  const now = get(currentTimeAtom);

  if (!journal) {
    return null;
  }
  return getNewLogs(myInventoryItems, journal, now);
});

export const hasNewLogsAtom = atom((get) => {
  const newLogs = get(newLogsAtom);
  if (!newLogs) {
    return false;
  }
  return (
    Object.keys(newLogs.allNewCropVariants).length > 0 ||
    Object.keys(newLogs.newPetVariants).length > 0
  );
});

const newCropLogsFromSellingAtom = atom((get) => {
  const newLogs = get(newLogsAtom);
  if (!newLogs) {
    return null;
  }
  return newLogs.newCropVariantsFromSelling;
});

export const hasNewCropLogsFromSellingAtom = atom((get) => {
  const newCropLogs = get(newCropLogsFromSellingAtom);
  return newCropLogs !== null && Object.keys(newCropLogs).length > 0;
});

export const selectedPetHasNewVariantsAtom = atom((get) => {
  const selectedItem = get(mySelectedItemAtom);
  if (!selectedItem || selectedItem.itemType !== ItemType.Pet) {
    return false;
  }
  const journal = get(myJournalAtom);
  if (!journal) {
    return false;
  }
  const loggedVariants =
    journal.pets[selectedItem.petSpecies]?.variantsLogged.map(
      (entry) => entry.variant
    ) ?? [];
  const currentScale = getPetScale({
    speciesId: selectedItem.petSpecies,
    xp: selectedItem.xp,
    targetScale: selectedItem.targetScale,
  });
  const { maxScale } = faunaSpeciesDex[selectedItem.petSpecies];

  const hasNewVariant = getHasNewVariant({
    mutations: selectedItem.mutations,
    currentScale,
    maxScale,
    loggedVariants,
  });
  return hasNewVariant;
});
