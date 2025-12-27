/**
 * This atom determines the label for the ActionButton based on the current action.
 */

import { t } from '@lingui/core/macro';
import { atom } from 'jotai';
import { floraSpeciesDex } from '@/common/games/Quinoa/systems/flora';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import { myCropItemsAtom } from '@/Quinoa/atoms/miscAtoms';
import { currentGardenNameAtom } from '../../atoms/allPlayerAtoms';
import {
  myCurrentGardenObjectNameAtom,
  myOwnCurrentGardenObjectAtom,
  mySelectedItemAtom,
  mySelectedItemNameAtom,
} from '../../atoms/myAtoms';
import { actionAtom } from './actionAtom';

export const actionLabelAtom = atom((get): string | React.ReactNode => {
  const action = get(actionAtom);

  switch (action) {
    case 'seedShop':
      return t`Open Seed Shop`;

    case 'eggShop':
      return t`Open Egg Shop`;

    case 'toolShop':
      return t`Open Tool Shop`;

    case 'decorShop':
      return t`Open Decor Shop`;

    case 'collectorsClub':
      return t`Open Journal`;

    case 'petHutch':
      return t`Open Pet Hutch`;

    case 'wish': {
      const selectedItem = get(mySelectedItemAtom);
      const selectedItemName = get(mySelectedItemNameAtom);
      if (!selectedItemName || !selectedItem) {
        return t`Wishing Well`;
      }
      switch (selectedItem.itemType) {
        case ItemType.Egg:
        case ItemType.Seed:
        case ItemType.Tool:
        case ItemType.Decor:
          return t`Throw away 1 ${selectedItemName}`;
        case ItemType.Produce:
        case ItemType.Plant:
        case ItemType.Pet:
          return t`Throw away ${selectedItemName}`;
        default:
          return t`Wishing Well`;
      }
    }
    case 'sellPet': {
      const selectedItem = get(mySelectedItemAtom);
      const selectedItemName = get(mySelectedItemNameAtom);
      if (selectedItem?.itemType === ItemType.Pet) {
        return t`Sell ${selectedItemName}`;
      } else {
        return t`Sell Pet`;
      }
    }
    case 'plantGardenPlant': {
      const selectedItem = get(mySelectedItemAtom);
      const selectedItemName = get(mySelectedItemNameAtom);
      if (selectedItem?.itemType === ItemType.Plant) {
        return t`Plant ${selectedItemName}`;
      }
      break;
    }
    case 'plantSeed': {
      const selectedItem = get(mySelectedItemAtom);
      const selectedItemName = get(mySelectedItemNameAtom);
      if (selectedItem?.itemType === ItemType.Seed) {
        return t`Plant ${selectedItemName}`;
      }
      break;
    }
    case 'harvest': {
      const currentGardenObject = get(myOwnCurrentGardenObjectAtom);
      if (currentGardenObject?.objectType === 'plant') {
        const { name } = floraSpeciesDex[currentGardenObject.species].crop;
        return t`Harvest ${name}`;
      }
      break;
    }
    case 'removeGardenObject': {
      const currentGardenObject = get(myOwnCurrentGardenObjectAtom);
      const currentTileObjectName = get(myCurrentGardenObjectNameAtom);
      if (
        currentGardenObject?.objectType === 'plant' ||
        currentGardenObject?.objectType === 'decor'
      ) {
        return t`Destroy ${currentTileObjectName}`;
      }
      break;
    }
    case 'potPlant': {
      const currentGardenObject = get(myOwnCurrentGardenObjectAtom);
      const currentTileObjectName = get(myCurrentGardenObjectNameAtom);
      if (currentGardenObject?.objectType === 'plant') {
        return t`Pot ${currentTileObjectName}`;
      }
      break;
    }
    case 'waterPlant': {
      const currentGardenObject = get(myOwnCurrentGardenObjectAtom);
      const currentTileObjectName = get(myCurrentGardenObjectNameAtom);
      if (currentGardenObject?.objectType === 'plant') {
        return t`Water ${currentTileObjectName}`;
      }
      break;
    }
    case 'plantEgg': {
      const selectedItem = get(mySelectedItemAtom);
      const selectedItemName = get(mySelectedItemNameAtom);
      if (selectedItem?.itemType === ItemType.Egg) {
        return t`Grow ${selectedItemName}`;
      }
      break;
    }
    case 'hatchEgg': {
      const currentGardenObject = get(myOwnCurrentGardenObjectAtom);
      const currentTileObjectName = get(myCurrentGardenObjectNameAtom);
      if (currentGardenObject?.objectType === 'egg') {
        return t`Hatch ${currentTileObjectName}`;
      }
      break;
    }
    case 'placePet': {
      const selectedItem = get(mySelectedItemAtom);
      const selectedItemName = get(mySelectedItemNameAtom);
      if (selectedItem?.itemType === ItemType.Pet) {
        return t`Place ${selectedItemName}`;
      }
      break;
    }
    case 'sellAllCrops': {
      const selectedItem = get(mySelectedItemAtom);
      const myCropItems = get(myCropItemsAtom);
      const showGenericText =
        myCropItems.length <= 0 ||
        myCropItems.length > 1 ||
        selectedItem?.itemType !== ItemType.Produce;
      const cropText = showGenericText
        ? t`Crops`
        : floraSpeciesDex[myCropItems[0].species].crop.name;

      return t`Sell ${cropText}`;
    }
    case 'logItems':
      return t`Log New Items In Journal`;

    case 'mutationPotion': {
      const selectedItemName = get(mySelectedItemNameAtom);
      return t`Use ${selectedItemName}`;
    }

    case 'instaGrow': {
      const currentGardenObject = get(myOwnCurrentGardenObjectAtom);
      const currentTileObjectName = get(myCurrentGardenObjectNameAtom);
      if (currentGardenObject) {
        return t`Insta-Grow ${currentTileObjectName}`;
      }
      break;
    }
    case 'placeDecor': {
      const selectedItem = get(mySelectedItemAtom);
      const selectedItemName = get(mySelectedItemNameAtom);
      if (selectedItem?.itemType === ItemType.Decor) {
        return t`Place ${selectedItemName}`;
      }
      break;
    }
    case 'pickupDecor': {
      const currentGardenObject = get(myOwnCurrentGardenObjectAtom);
      const currentTileObjectName = get(myCurrentGardenObjectNameAtom);
      if (currentGardenObject?.objectType === 'decor') {
        return t`Pick up ${currentTileObjectName}`;
      }
      break;
    }
    case 'anonymousGarden':
      return t`Not Your Garden`;

    case 'otherPlayersGarden': {
      const gardenName = get(currentGardenNameAtom);
      if (gardenName) {
        return t`${gardenName}'s Garden`;
      }
      return t`Not Your Garden`;
    }
    case 'feedPet':
    case 'storePet':
    case 'swapPet':
    case 'teleport':
    case 'checkWeatherStatus':
    case 'move':
    case 'purchaseSeed':
    case 'purchaseDecor':
    case 'purchaseEgg':
    case 'purchaseTool':
    case 'customRestock':
    case 'pickupObject':
    case 'dropObject':
    case 'spinSlotMachine':
    case 'putItemInStorage':
    case 'retrieveItemFromStorage':
    case 'none':
    case 'invalid':
    default:
  }
  return '';
});
