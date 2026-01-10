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
  myOwnCurrentDirtTileIndexAtom,
  myOwnCurrentGardenObjectAtom,
  myPossiblyNoLongerValidSelectedItemIndexAtom,
  mySelectedItemAtom,
} from '../../../atoms/myAtoms';

const { get, set } = getDefaultStore();

export function potPlant() {
  const currentDirtTileIndex = get(myOwnCurrentDirtTileIndexAtom);
  const currentTileObject = get(myOwnCurrentGardenObjectAtom);
  if (
    currentDirtTileIndex === null ||
    currentTileObject?.objectType !== 'plant'
  ) {
    console.warn('This player is not standing on a plant');
    return;
  }
  const planterPot = get(mySelectedItemAtom);
  if (
    planterPot?.itemType !== ItemType.Tool ||
    planterPot.toolId !== 'PlanterPot'
  ) {
    console.warn('Selected item is not a planter pot');
    return;
  }
  const { name } = floraSpeciesDex[currentTileObject.species].plant;
  const { isInventoryFull, isItemAtMaxQuantity } = getMyInventoryCapacityStatus(
    {
      itemType: ItemType.Plant,
      id: currentTileObject.species,
    }
  );
  if (isInventoryFull) {
    sendQuinoaToast({
      title: t`Inventory full`,
      description: t`Free up space to pot your ${name}.`,
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
    animation: AvatarTriggerAnimationName.PotPlant,
  });
  sendQuinoaMessage({
    type: 'PotPlant',
    slot: currentDirtTileIndex,
  });
  // When multiple planter pots exist, optimistically advance the selection by one position
  // so the user will be holding the newly created potted plant. Note: the server places the
  // potted plant immediately after the planter pot(s) in the inventory.
  if (planterPot.quantity > 1) {
    set(
      myPossiblyNoLongerValidSelectedItemIndexAtom,
      (prev) => (prev ?? 0) + 1
    );
  }
}
