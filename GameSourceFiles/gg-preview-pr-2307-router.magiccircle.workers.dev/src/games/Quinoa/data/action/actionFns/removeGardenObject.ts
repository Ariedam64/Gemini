import { getDefaultStore } from 'jotai';
import { AvatarTriggerAnimationName } from '@/components/Avatars/avatarRiveConstants';
import { sendQuinoaMessage } from '@/games/Quinoa/utils/sendQuinoaMessage';
import { avatarTriggerAnimationAtom } from '@/Quinoa/atoms/avatarAtoms';
import { playerIdAtom } from '@/store/store';
import { myCurrentGardenTileAtom } from '../../../atoms/myAtoms';

const { get, set } = getDefaultStore();

export function removeGardenObject() {
  const currentTile = get(myCurrentGardenTileAtom);
  if (currentTile === null) {
    console.warn('This player is not standing on a garden tile');
    return;
  }

  const { localTileIndex, tileType, playerId } = currentTile;
  const myId = get(playerIdAtom);

  // Only allow removing objects from tiles owned by the current player
  if (playerId !== myId) {
    console.warn(
      'This player cannot remove objects from tiles they do not own'
    );
    return;
  }

  set(avatarTriggerAnimationAtom, {
    playerId: myId,
    animation: AvatarTriggerAnimationName.Dig,
  });
  sendQuinoaMessage({
    type: 'RemoveGardenObject',
    slot: localTileIndex,
    slotType: tileType,
  });
}
