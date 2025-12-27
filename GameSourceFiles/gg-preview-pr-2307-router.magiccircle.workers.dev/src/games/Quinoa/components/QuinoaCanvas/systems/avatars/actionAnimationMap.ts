import type { QuinoaPlayerAction } from '@/common/games/Quinoa/types';
import { AvatarTriggerAnimationName } from '@/components/Avatars/avatarRiveConstants';

/**
 * Maps a player action to the corresponding one-shot trigger animation.
 * Returns null for actions that don't have a corresponding avatar animation.
 *
 * @param action - The player action type
 * @returns The animation to trigger, or null if no animation applies
 */
export function getAnimationForAction(
  action: QuinoaPlayerAction
): AvatarTriggerAnimationName | null {
  switch (action) {
    case 'plantSeed':
    case 'plantGardenPlant':
      return AvatarTriggerAnimationName.Water;
    case 'waterPlant':
      return AvatarTriggerAnimationName.WaterGold;
    case 'harvest':
      return AvatarTriggerAnimationName.Harvest;
    case 'potPlant':
      return AvatarTriggerAnimationName.PotPlant;
    case 'removeGardenObject':
      return AvatarTriggerAnimationName.Dig;
    case 'teleport':
      return AvatarTriggerAnimationName.JoinGame;
    case 'plantEgg':
    case 'placePet':
    case 'dropObject':
    case 'placeDecor':
      return AvatarTriggerAnimationName.DropObject;
    case 'hatchEgg':
    case 'pickupObject':
    case 'pickupDecor':
      return AvatarTriggerAnimationName.PickupObject;
    // Actions that don't have corresponding animations
    case 'storePet':
    case 'feedPet':
    case 'sellAllCrops':
    case 'sellPet':
    case 'swapPet':
    case 'logItems':
    case 'instaGrow':
    case 'wish':
    case 'spinSlotMachine':
    case 'mutationPotion':
    case 'purchaseSeed':
    case 'purchaseEgg':
    case 'purchaseTool':
    case 'purchaseDecor':
    case 'checkWeatherStatus':
    case 'putItemInStorage':
    case 'retrieveItemFromStorage':
    case 'customRestock':
    case 'move':
      return null;
  }
}
