import { t } from '@lingui/core/macro';
import { getDefaultStore } from 'jotai';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import { petSlotsLimit } from '@/common/games/Quinoa/utils/pets';
import { AvatarTriggerAnimationName } from '@/components/Avatars/avatarRiveConstants';
import { playPetSoundEffect } from '@/games/Quinoa/audio';
import { myPetPositionsAtom } from '@/games/Quinoa/components/QuinoaWorld/useMyPetEffects';
import { sendQuinoaMessage } from '@/games/Quinoa/utils/sendQuinoaMessage';
import { avatarTriggerAnimationAtom } from '@/Quinoa/atoms/avatarAtoms';
import {
  myCurrentGardenTileAtom,
  myNumPetsInGardenAtom,
  myPossiblyNoLongerValidSelectedItemIndexAtom,
  mySelectedItemAtom,
} from '@/Quinoa/atoms/myAtoms';
import { positionAtom } from '@/Quinoa/atoms/positionAtoms';
import { sendQuinoaToast } from '@/Quinoa/atoms/toastAtoms';
import { playerIdAtom } from '@/store/store';

const { get, set } = getDefaultStore();

export function placePet() {
  const position = get(positionAtom);
  if (!position) {
    console.warn('This player does not have a position initialized');
    return;
  }
  const currentTile = get(myCurrentGardenTileAtom);
  if (!currentTile) {
    console.warn('This player is not standing on a garden tile');
    return;
  }
  const selectedItem = get(mySelectedItemAtom);
  if (selectedItem?.itemType !== ItemType.Pet) {
    console.warn('Selected item is not a pet');
    return;
  }
  if (get(myNumPetsInGardenAtom) >= petSlotsLimit) {
    sendQuinoaToast({
      title: t`Pet slots full`,
      description: t`You can have up to ${petSlotsLimit} pets in your garden.`,
      variant: 'error',
    });
    return;
  }
  const { tileType, localTileIndex } = currentTile;
  set(myPetPositionsAtom, (prev) => ({
    ...prev,
    [selectedItem.id]: position,
  }));
  sendQuinoaMessage({
    type: 'PlacePet',
    itemId: selectedItem.id,
    position: position,
    tileType,
    localTileIndex,
  });
  set(avatarTriggerAnimationAtom, {
    playerId: get(playerIdAtom),
    animation: AvatarTriggerAnimationName.DropObject,
  });
  playPetSoundEffect(selectedItem.petSpecies);
  set(myPossiblyNoLongerValidSelectedItemIndexAtom, null);
}
