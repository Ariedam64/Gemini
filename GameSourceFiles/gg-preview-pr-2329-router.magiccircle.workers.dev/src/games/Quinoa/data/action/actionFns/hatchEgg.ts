import { t } from '@lingui/core/macro';
import { getDefaultStore } from 'jotai';
import { playSfx } from '@/audio/useQuinoaAudio';
import { EggsDex } from '@/common/games/Quinoa/systems/fauna';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import { AvatarTriggerAnimationName } from '@/components/Avatars/avatarRiveConstants';
import { sendQuinoaMessage } from '@/games/Quinoa/utils/sendQuinoaMessage';
import { avatarTriggerAnimationAtom } from '@/Quinoa/atoms/avatarAtoms';
import { sendQuinoaToast } from '@/Quinoa/atoms/toastAtoms';
import { getMyInventoryCapacityStatus } from '@/Quinoa/utils/getMyInventoryCapacityStatus';
import { playerIdAtom } from '@/store/store';
import {
  myOwnCurrentDirtTileIndexAtom,
  myOwnCurrentGardenObjectAtom,
  setSelectedIndexToEnd,
} from '../../../atoms/myAtoms';

const { get, set } = getDefaultStore();

export function hatchEgg() {
  const currentDirtTileIndex = get(myOwnCurrentDirtTileIndexAtom);
  const currentTileObject = get(myOwnCurrentGardenObjectAtom);
  if (
    currentDirtTileIndex === null ||
    currentTileObject?.objectType !== 'egg'
  ) {
    console.warn('This player is not standing on an egg');
    return;
  }
  const { name } = EggsDex[currentTileObject.eggId];
  const { isInventoryFull, isItemAtMaxQuantity } = getMyInventoryCapacityStatus(
    {
      itemType: ItemType.Pet,
      // We don't know the pet species yet so we just use an empty string
      id: '',
    }
  );
  if (isInventoryFull) {
    sendQuinoaToast({
      title: t`Inventory full`,
      description: t`Free up space to hatch your ${name}.`,
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
  sendQuinoaMessage({
    type: 'HatchEgg',
    slot: currentDirtTileIndex,
  });
  set(avatarTriggerAnimationAtom, {
    playerId: get(playerIdAtom),
    animation: AvatarTriggerAnimationName.PickupObject,
  });
  playSfx('Score_Promotion');
  // Optimistically advance the selection to the newly hatched pet
  // This will be handled by the server response
  setSelectedIndexToEnd();
}
