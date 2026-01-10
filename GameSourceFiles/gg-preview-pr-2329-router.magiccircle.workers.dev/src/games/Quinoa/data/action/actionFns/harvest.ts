import { t } from '@lingui/core/macro';
import { getDefaultStore } from 'jotai';
import { floraSpeciesDex } from '@/common/games/Quinoa/systems/flora';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import { AvatarTriggerAnimationName } from '@/components/Avatars/avatarRiveConstants';
import { sendQuinoaMessage } from '@/games/Quinoa/utils/sendQuinoaMessage';
import { avatarTriggerAnimationAtom } from '@/Quinoa/atoms/avatarAtoms';
import { sendQuinoaToast } from '@/Quinoa/atoms/toastAtoms';
import { getMyInventoryCapacityStatus } from '@/Quinoa/utils/getMyInventoryCapacityStatus';
import { playerIdAtom } from '@/store/store';
import {
  goToNextAvailableGrowSlotIndex,
  myCurrentGrowSlotAtom,
  myCurrentGrowSlotIndexAtom,
  myOwnCurrentDirtTileIndexAtom,
  mySelectedItemAtom,
  setSelectedIndexToEnd,
} from '../../../atoms/myAtoms';

const { get, set } = getDefaultStore();

export function harvest() {
  const currentDirtTileIndex = get(myOwnCurrentDirtTileIndexAtom);
  const currentGrowSlotIndex = get(myCurrentGrowSlotIndexAtom);
  const currentGrowSlot = get(myCurrentGrowSlotAtom);
  if (currentDirtTileIndex === null) {
    console.warn('This player is not standing on a tile object');
    return;
  }
  if (currentGrowSlot === null) {
    console.warn('Not currently selecting a valid grow slot');
    return;
  }
  const { name } = floraSpeciesDex[currentGrowSlot.species].crop;
  const { isInventoryFull, isItemAtMaxQuantity } = getMyInventoryCapacityStatus(
    {
      itemType: ItemType.Produce,
      id: currentGrowSlot.species,
    }
  );
  if (isInventoryFull) {
    sendQuinoaToast({
      title: t`Inventory full`,
      description: t`Free up space to harvest your ${name}.`,
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
  set(avatarTriggerAnimationAtom, {
    playerId: get(playerIdAtom),
    animation: AvatarTriggerAnimationName.Harvest,
  });
  sendQuinoaMessage({
    type: 'HarvestCrop',
    slot: currentDirtTileIndex,
    slotsIndex: currentGrowSlotIndex,
  });
  goToNextAvailableGrowSlotIndex();
  const selectedItem = get(mySelectedItemAtom);
  if (selectedItem === null || selectedItem.itemType === ItemType.Produce) {
    setSelectedIndexToEnd();
  }
}
