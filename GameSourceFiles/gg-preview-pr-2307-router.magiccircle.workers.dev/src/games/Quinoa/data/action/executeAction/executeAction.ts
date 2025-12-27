import { atom, getDefaultStore } from 'jotai';
import { activeModalAtom } from '@/Quinoa/atoms/modalAtom';
import { actionAtom } from '../actionAtom';
import { checkWeatherStatus } from '../actionFns/checkWeatherStatus';
import { harvest } from '../actionFns/harvest';
import { hatchEgg } from '../actionFns/hatchEgg';
import { instaGrow } from '../actionFns/instaGrow';
import { logItems } from '../actionFns/logItems';
import { mutationPotion } from '../actionFns/mutationPotion';
import { pickupDecor } from '../actionFns/pickupDecor';
import { placeDecor } from '../actionFns/placeDecor';
import { placePet } from '../actionFns/placePet';
import { plantEgg } from '../actionFns/plantEgg';
import { plantGardenPlant } from '../actionFns/plantGardenPlant';
import { plantSeed } from '../actionFns/plantSeed';
import { potPlant } from '../actionFns/potPlant';
import { removeGardenObject } from '../actionFns/removeGardenObject';
import { sellAllCrops } from '../actionFns/sellAllCrops';
import { sellPet } from '../actionFns/sellPet';
import { waterPlant } from '../actionFns/waterPlant';
import { wish } from '../actionFns/wish';
import { PRESS_AND_HOLD_ACTION_SECONDS } from '../constants/constants';
import { isPressAndHoldActionAtom } from '../isPressAndHoldActionAtom';

const { get, set } = getDefaultStore();

export const actionWaitingTimeoutAtom = atom<ReturnType<
  typeof setTimeout
> | null>(null);
export const isActionWaitingAtom = atom(
  (get) => get(actionWaitingTimeoutAtom) !== null
);

export function executeAction() {
  const isPressAndHold = get(isPressAndHoldActionAtom);

  if (isPressAndHold) {
    startActionWaitingTimeout();
  } else {
    void innerExecuteAction();
  }
}

export function innerExecuteAction() {
  const action = get(actionAtom);

  switch (action) {
    case 'seedShop':
      set(activeModalAtom, 'seedShop');
      break;

    case 'eggShop':
      set(activeModalAtom, 'eggShop');
      break;

    case 'toolShop':
      set(activeModalAtom, 'toolShop');
      break;

    case 'decorShop':
      set(activeModalAtom, 'decorShop');
      break;

    case 'collectorsClub':
      set(activeModalAtom, 'journal');
      break;

    case 'petHutch':
      set(activeModalAtom, 'petHutch');
      break;

    case 'logItems':
      logItems();
      break;

    case 'plantSeed':
      plantSeed();
      break;

    case 'harvest':
      harvest();
      break;

    case 'removeGardenObject':
      removeGardenObject();
      break;

    case 'waterPlant':
      waterPlant();
      break;

    case 'potPlant':
      potPlant();
      break;

    case 'plantGardenPlant':
      plantGardenPlant();
      break;

    case 'plantEgg':
      plantEgg();
      break;

    case 'hatchEgg':
      hatchEgg();
      break;

    case 'placePet':
      placePet();
      break;

    case 'sellAllCrops':
      sellAllCrops();
      break;

    case 'sellPet':
      sellPet();
      break;

    case 'mutationPotion':
      mutationPotion();
      break;

    case 'instaGrow':
      void instaGrow();
      break;

    case 'placeDecor':
      placeDecor();
      break;

    case 'pickupDecor':
      pickupDecor();
      break;

    case 'wish':
      wish();
      break;

    case 'checkWeatherStatus':
      checkWeatherStatus();
      break;
    /**
     * None
     */
    case 'putItemInStorage':
    case 'retrieveItemFromStorage':
    case 'spinSlotMachine':
    case 'feedPet':
    case 'storePet':
    case 'swapPet':
    case 'teleport':
    case 'otherPlayersGarden':
    case 'anonymousGarden':
    case 'none':
    case 'invalid':
    case 'move':
    case 'purchaseSeed':
    case 'purchaseDecor':
    case 'purchaseEgg':
    case 'purchaseTool':
    case 'customRestock':
    case 'pickupObject':
    case 'dropObject':
    default:
      break;
  }
}

/**
 * Starts the action waiting timeout and stores the timeout ID in the atom
 * @param callback - The function to call when the timeout expires
 */
function startActionWaitingTimeout() {
  // Clear any existing timeout first
  clearActionWaitingTimeout();
  // Start new timeout
  const timeoutId = setTimeout(() => {
    void innerExecuteAction();
    set(actionWaitingTimeoutAtom, null);
  }, PRESS_AND_HOLD_ACTION_SECONDS * 1000);
  // Store the timeout ID
  set(actionWaitingTimeoutAtom, timeoutId);
}

/**
 * Clears the action waiting timeout by setting it to 0
 * @param set - The jotai setter function
 */
export function clearActionWaitingTimeout() {
  const timeout = get(actionWaitingTimeoutAtom);
  if (!timeout) {
    return;
  }
  clearTimeout(timeout);
  set(actionWaitingTimeoutAtom, null);
}
