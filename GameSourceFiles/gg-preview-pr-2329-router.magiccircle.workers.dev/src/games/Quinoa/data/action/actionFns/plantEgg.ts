import { getDefaultStore } from 'jotai';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import { AvatarTriggerAnimationName } from '@/components/Avatars/avatarRiveConstants';
import { sendQuinoaMessage } from '@/games/Quinoa/utils/sendQuinoaMessage';
import { avatarTriggerAnimationAtom } from '@/Quinoa/atoms/avatarAtoms';
import { playerIdAtom } from '@/store/store';
import {
  myOwnCurrentDirtTileIndexAtom,
  mySelectedItemAtom,
} from '../../../atoms/myAtoms';

const { get, set } = getDefaultStore();

export function plantEgg() {
  const currentDirtTileIndex = get(myOwnCurrentDirtTileIndexAtom);
  const selectedItem = get(mySelectedItemAtom);
  if (currentDirtTileIndex === null) {
    console.warn('This player is not standing on a tile object');
    return;
  }
  if (selectedItem?.itemType !== ItemType.Egg) {
    console.warn('Selected item is not an egg');
    return;
  }
  set(avatarTriggerAnimationAtom, {
    playerId: get(playerIdAtom),
    animation: AvatarTriggerAnimationName.DropObject,
  });
  sendQuinoaMessage({
    type: 'PlantEgg',
    slot: currentDirtTileIndex,
    eggId: selectedItem.eggId,
  });
}
