import { t } from '@lingui/core/macro';
import { getDefaultStore } from 'jotai';
import { decorDex } from '@/common/games/Quinoa/systems/decor';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import { AvatarTriggerAnimationName } from '@/components/Avatars/avatarRiveConstants';
import { sendQuinoaMessage } from '@/games/Quinoa/utils/sendQuinoaMessage';
import { avatarTriggerAnimationAtom } from '@/Quinoa/atoms/avatarAtoms';
import { myInventoryItemsAtom } from '@/Quinoa/atoms/inventoryAtoms';
import { sendQuinoaToast } from '@/Quinoa/atoms/toastAtoms';
import { getMyInventoryCapacityStatus } from '@/Quinoa/utils/getMyInventoryCapacityStatus';
import { playerIdAtom } from '@/store/store';
import {
  myCurrentGardenTileAtom,
  myOwnCurrentGardenObjectAtom,
  myPossiblyNoLongerValidSelectedItemIndexAtom,
  mySelectedItemRotationAtom,
  setSelectedIndexToEnd,
} from '../../../atoms/myAtoms';

const { get, set } = getDefaultStore();

export function pickupDecor() {
  const currentTile = get(myCurrentGardenTileAtom);
  if (!currentTile) {
    console.warn('This player is not standing on a garden tile');
    return;
  }
  const currentGardenObject = get(myOwnCurrentGardenObjectAtom);
  if (currentGardenObject?.objectType !== 'decor') {
    console.warn('This player is not standing on a decor tile');
    return;
  }
  const inventoryItems = get(myInventoryItemsAtom);
  const { isInventoryFull, isItemAtMaxQuantity } = getMyInventoryCapacityStatus(
    {
      itemType: ItemType.Decor,
      id: currentGardenObject.decorId,
    }
  );
  const { name } = decorDex[currentGardenObject.decorId];
  if (isInventoryFull) {
    sendQuinoaToast({
      title: t`Inventory full`,
      description: t`Free up space to pick up your ${name}.`,
      variant: 'error',
    });
    return;
  }
  if (isItemAtMaxQuantity) {
    sendQuinoaToast({
      title: t`Max stack size reached`,
      description: t`Your ${name} stack is full.`,
      variant: 'error',
    });
    return;
  }
  const { tileType, localTileIndex } = currentTile;
  set(avatarTriggerAnimationAtom, {
    playerId: get(playerIdAtom),
    animation: AvatarTriggerAnimationName.PickupObject,
  });
  sendQuinoaMessage({
    type: 'PickupDecor',
    tileType,
    localTileIndex,
  });
  const decorIndex = inventoryItems.findIndex(
    (item) =>
      item.itemType === ItemType.Decor &&
      item.decorId === currentGardenObject.decorId
  );
  // If the decor is already in the inventory, set the selected item index to the decor index
  // Otherwise, optimistically set the selected item index to the end, where the decor will be added to the inventory
  if (decorIndex !== -1) {
    set(myPossiblyNoLongerValidSelectedItemIndexAtom, decorIndex);
  } else {
    setSelectedIndexToEnd();
  }
  // Set the rotation atom to match the rotation of the picked up decor
  set(mySelectedItemRotationAtom, currentGardenObject.rotation);
}
