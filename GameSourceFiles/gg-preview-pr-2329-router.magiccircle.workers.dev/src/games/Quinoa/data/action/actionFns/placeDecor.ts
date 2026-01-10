import { getDefaultStore } from 'jotai';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import { AvatarTriggerAnimationName } from '@/components/Avatars/avatarRiveConstants';
import { sendQuinoaMessage } from '@/games/Quinoa/utils/sendQuinoaMessage';
import { avatarTriggerAnimationAtom } from '@/Quinoa/atoms/avatarAtoms';
import { playerIdAtom } from '@/store/store';
import {
  myCurrentGardenTileAtom,
  mySelectedItemAtom,
  mySelectedItemRotationAtom,
} from '../../../atoms/myAtoms';

const { get, set } = getDefaultStore();

export function placeDecor() {
  const currentTile = get(myCurrentGardenTileAtom);
  if (!currentTile) {
    console.warn('This player is not standing on a garden tile');
    return;
  }
  const selectedItem = get(mySelectedItemAtom);
  if (selectedItem?.itemType !== ItemType.Decor) {
    console.warn('Selected item is not a decor');
    return;
  }
  const { tileType, localTileIndex } = currentTile;
  const rotation = get(mySelectedItemRotationAtom);
  set(avatarTriggerAnimationAtom, {
    playerId: get(playerIdAtom),
    animation: AvatarTriggerAnimationName.DropObject,
  });
  sendQuinoaMessage({
    type: 'PlaceDecor',
    tileType,
    localTileIndex,
    decorId: selectedItem.decorId,
    rotation,
  });
}
