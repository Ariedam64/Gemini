/**
 * This atom determines what the current action is for the player
 * based on their position on the map and their selected item.
 *
 * It drives the ActionButton label and the executeAction function.
 */

import { atom } from 'jotai';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import type { QuinoaPlayerAction } from '@/common/games/Quinoa/types';
import { getGlobalTileIndexFromCoordinate } from '@/common/games/Quinoa/world/map';
import { activeModalAtom } from '@/Quinoa/atoms/modalAtom';
import { positionAtom } from '@/Quinoa/atoms/positionAtoms';
import { playerIdAtom } from '@/store/store';
import { userSlotsAtom } from '../../atoms/baseAtoms';
import { mapAtom } from '../../atoms/mapAtoms';
import { hasNewLogsAtom } from '../../atoms/miscAtoms';
import {
  isCurrentGrowSlotMatureAtom,
  isGardenObjectMatureAtom,
  myCurrentGardenTileAtom,
  myOwnCurrentGardenObjectAtom,
  mySelectedItemAtom,
} from '../../atoms/myAtoms';

export type ActionType =
  | QuinoaPlayerAction
  | 'seedShop'
  | 'eggShop'
  | 'toolShop'
  | 'decorShop'
  | 'collectorsClub'
  | 'petHutch'
  | 'anonymousGarden'
  | 'otherPlayersGarden'
  | 'invalid'
  | 'none';

export const actionAtom = atom((get): ActionType => {
  const map = get(mapAtom);
  const myPosition = get(positionAtom);
  const userSlots = get(userSlotsAtom);
  const activeModal = get(activeModalAtom);

  if (!userSlots || !myPosition) {
    return 'invalid';
  }
  const tileIndex = getGlobalTileIndexFromCoordinate(
    map,
    myPosition.x,
    myPosition.y
  );
  /******************
   * seedShop
   ******************/
  if (map.locations.seedShop.activationTilesIdxs.includes(tileIndex)) {
    if (activeModal === 'seedShop') {
      return 'none';
    }
    return 'seedShop';
  }
  /******************
   * eggShop
   ******************/
  if (map.locations.eggShop.activationTilesIdxs.includes(tileIndex)) {
    if (activeModal === 'eggShop') {
      return 'none';
    }
    return 'eggShop';
  }
  /******************
   * toolShop
   ******************/
  if (map.locations.toolShop.activationTilesIdxs.includes(tileIndex)) {
    if (activeModal === 'toolShop') {
      return 'none';
    }
    return 'toolShop';
  }
  /******************
   * decorShop
   ******************/
  if (map.locations.decorShop.activationTilesIdxs.includes(tileIndex)) {
    if (activeModal === 'decorShop') {
      return 'none';
    }
    return 'decorShop';
  }
  /******************
   * journal
   ******************/
  if (map.locations.collectorsClub.activationTilesIdxs.includes(tileIndex)) {
    const hasNewLogs = get(hasNewLogsAtom);
    if (activeModal === 'journal') {
      return 'none';
    }
    if (hasNewLogs) {
      return 'logItems';
    }
    return 'collectorsClub';
  }
  /******************
   * sellCrops
   ******************/
  if (map.locations.sellCropsShop.activationTilesIdxs.includes(tileIndex)) {
    return 'sellAllCrops';
  }
  /******************
   * sellPet
   ******************/
  if (map.locations.sellPetShop.activationTilesIdxs.includes(tileIndex)) {
    return 'sellPet';
  }
  /******************
   * wish
   ******************/
  if (map.locations.wishingWell.activationTilesIdxs.includes(tileIndex)) {
    // Hide wish for now
    // return 'wish';
  }
  const mySelectedItem = get(mySelectedItemAtom);
  const myId = get(playerIdAtom);
  const myCurrentTile = get(myCurrentGardenTileAtom);
  if (!myCurrentTile) {
    return 'invalid';
  }
  const { playerId, tileType } = myCurrentTile;

  if (!playerId) {
    return 'anonymousGarden';
  } else if (playerId !== myId) {
    return 'otherPlayersGarden';
  }
  const currentGardenObject = get(myOwnCurrentGardenObjectAtom);
  // Empty slot in player's own garden
  if (!currentGardenObject) {
    switch (tileType) {
      case 'Dirt':
        switch (mySelectedItem?.itemType) {
          case ItemType.Seed:
            return 'plantSeed';
          case ItemType.Egg:
            return 'plantEgg';
          case ItemType.Pet:
            return 'placePet';
          case ItemType.Plant:
            return 'plantGardenPlant';
          case ItemType.Decor:
            return 'placeDecor';
          case ItemType.Produce:
          case ItemType.Tool:
          case undefined:
          default:
            return 'invalid';
        }
      case 'Boardwalk':
        switch (mySelectedItem?.itemType) {
          case ItemType.Decor:
            return 'placeDecor';
          case ItemType.Pet:
            return 'placePet';
          case ItemType.Seed:
          case ItemType.Egg:
          case ItemType.Plant:
          case ItemType.Produce:
          case ItemType.Tool:
          case undefined:
          default:
            return 'invalid';
        }
      case null:
        return 'invalid';
      default:
        return 'invalid';
    }
  }
  if (currentGardenObject.objectType === 'plant') {
    if (mySelectedItem?.itemType === ItemType.Tool) {
      switch (mySelectedItem.toolId) {
        case 'PlanterPot':
          return 'potPlant';
        case 'Shovel':
          return 'removeGardenObject';
        case 'RainbowPotion':
        case 'GoldPotion':
        case 'FrozenPotion':
        case 'WetPotion':
        case 'ChilledPotion':
        case 'DawnlitPotion':
        case 'AmberlitPotion':
          return 'mutationPotion';
        case 'WateringCan':
          return 'waterPlant';
        default:
          return 'invalid';
      }
    }
    const isCurrentGrowSlotMature = get(isCurrentGrowSlotMatureAtom);
    if (isCurrentGrowSlotMature) {
      return 'harvest';
    } else {
      return 'instaGrow';
    }
  } else if (currentGardenObject.objectType === 'egg') {
    const isGardenObjectMature = get(isGardenObjectMatureAtom);

    if (isGardenObjectMature) {
      return 'hatchEgg';
    } else {
      return 'instaGrow';
    }
  } else if (currentGardenObject.objectType === 'decor') {
    // Special handling for Pet Hutch - opens modal instead of pickup
    if (currentGardenObject.decorId === 'PetHutch') {
      if (activeModal === 'petHutch') {
        return 'none';
      }
      return 'petHutch';
    }
    if (mySelectedItem?.itemType === ItemType.Tool) {
      switch (mySelectedItem.toolId) {
        case 'Shovel':
          return 'removeGardenObject';
        case 'PlanterPot':
        case 'FrozenPotion':
        case 'WetPotion':
        case 'ChilledPotion':
        case 'DawnlitPotion':
        case 'AmberlitPotion':
        case 'GoldPotion':
        case 'RainbowPotion':
        case 'WateringCan':
        default:
          return 'pickupDecor';
      }
    }
    return 'pickupDecor';
  }
  return 'invalid';
});
