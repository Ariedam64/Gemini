import { t } from '@lingui/core/macro';
import { getDefaultStore } from 'jotai';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import { AvatarTriggerAnimationName } from '@/components/Avatars/avatarRiveConstants';
import { sendQuinoaMessage } from '@/games/Quinoa/utils/sendQuinoaMessage';
import { avatarTriggerAnimationAtom } from '@/Quinoa/atoms/avatarAtoms';
import {
  isFirstPlantSeedActiveAtom,
  isThirdSeedPlantActiveAtom,
} from '@/Quinoa/atoms/taskAtoms';
import { sendQuinoaToast } from '@/Quinoa/atoms/toastAtoms';
import { playerIdAtom } from '@/store/store';
import {
  myOwnCurrentDirtTileIndexAtom,
  mySelectedItemAtom,
} from '../../../atoms/myAtoms';

const { get, set } = getDefaultStore();

export function plantSeed() {
  const currentDirtTileIndex = get(myOwnCurrentDirtTileIndexAtom);
  const selectedItem = get(mySelectedItemAtom);
  const isFirstPlantSeed = get(isFirstPlantSeedActiveAtom);
  const isThirdPlantSeed = get(isThirdSeedPlantActiveAtom);

  if (currentDirtTileIndex === null) {
    console.warn('This player is not standing on a tile object');
    return;
  }
  if (selectedItem?.itemType !== ItemType.Seed) {
    console.warn('Selected item is not a seed');
    return;
  }
  if (isFirstPlantSeed) {
    sendQuinoaToast({
      title: t`You planted your first seed!`,
      description: t`In a few seconds, you can harvest your Carrot.`,
      variant: 'success',
    });
  }
  if (isThirdPlantSeed) {
    sendQuinoaToast({
      title: t`Tutorial complete!`,
      description: t`You've learned the basics. Happy gardening!`,
      variant: 'success',
    });
  }
  set(avatarTriggerAnimationAtom, {
    playerId: get(playerIdAtom),
    animation: AvatarTriggerAnimationName.Water,
  });
  sendQuinoaMessage({
    type: 'PlantSeed',
    slot: currentDirtTileIndex,
    species: selectedItem.species,
  });
}
