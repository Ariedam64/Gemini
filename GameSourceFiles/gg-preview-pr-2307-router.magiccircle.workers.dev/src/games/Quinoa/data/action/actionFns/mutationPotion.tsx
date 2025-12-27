import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { getDefaultStore } from 'jotai';
import { floraSpeciesDex } from '@/common/games/Quinoa/systems/flora';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import { toolsDex } from '@/common/games/Quinoa/systems/tools';
import type { CropInventoryItem } from '@/common/games/Quinoa/user-json-schema/current';
import { updateMutationList } from '@/common/games/Quinoa/utils/updateMutationList';
import { AvatarTriggerAnimationName } from '@/components/Avatars/avatarRiveConstants';
import { avatarTriggerAnimationAtom } from '@/Quinoa/atoms/avatarAtoms';
import { openActivityLogModal } from '@/Quinoa/atoms/modalAtom';
import {
  isGardenObjectMatureAtom,
  myCurrentGrowSlotAtom,
  myCurrentGrowSlotIndexAtom,
  myOwnCurrentDirtTileIndexAtom,
  myPossiblyNoLongerValidSelectedItemIndexAtom,
  mySelectedItemAtom,
} from '@/Quinoa/atoms/myAtoms';
import { sendQuinoaToast } from '@/Quinoa/atoms/toastAtoms';
import InventorySprite from '@/Quinoa/components/InventorySprite';
import MutationText from '@/Quinoa/components/MutationText';
import { sendQuinoaMessage } from '@/Quinoa/utils/sendQuinoaMessage';
import { playerIdAtom } from '@/store/store';

const { get, set } = getDefaultStore();

export function mutationPotion() {
  const selectedItem = get(mySelectedItemAtom);
  if (!selectedItem) {
    console.warn('No selected item');
    return;
  }
  if (selectedItem.itemType !== ItemType.Tool) {
    console.warn('Selected item is not a tool');
    return;
  }
  const growSlot = get(myCurrentGrowSlotAtom);
  if (!growSlot) {
    console.warn('No grow slot');
    return;
  }
  const currentDirtTileIndex = get(myOwnCurrentDirtTileIndexAtom);
  if (currentDirtTileIndex === null) {
    console.error('No garden tile index');
    return;
  }
  const growSlotIndex = get(myCurrentGrowSlotIndexAtom);
  if (growSlotIndex === null) {
    console.error('No grow slot index');
    return;
  }
  const blueprint = toolsDex[selectedItem.toolId];
  if (!('grantedMutation' in blueprint)) {
    console.warn('Selected item is not a mutation potion');
    return;
  }
  const isPlantMature = get(isGardenObjectMatureAtom);
  const { name: plantName } = floraSpeciesDex[growSlot.species].plant;
  const { name: cropName } = floraSpeciesDex[growSlot.species].crop;
  const { name: potionName } = blueprint;
  if (!isPlantMature) {
    sendQuinoaToast({
      variant: 'error',
      title: t`Cannot use ${potionName}`,
      description: t`Your ${plantName} is still growing.`,
    });
    return;
  }
  const { grantedMutation } = blueprint;
  const result = updateMutationList(grantedMutation, growSlot.mutations);
  if (!result) {
    const alreadyHasMutation = growSlot.mutations.includes(grantedMutation);
    const description = alreadyHasMutation ? (
      <Trans>
        This {cropName} already has the{' '}
        <MutationText mutationId={grantedMutation} /> mutation.
      </Trans>
    ) : (
      <Trans>
        This {cropName} cannot gain the{' '}
        <MutationText mutationId={grantedMutation} /> mutation.
      </Trans>
    );
    sendQuinoaToast({
      variant: 'error',
      title: t`Cannot use ${potionName}`,
      description,
    });
    return;
  }

  const inventoryItem: CropInventoryItem = {
    id: '',
    species: growSlot.species,
    itemType: ItemType.Produce,
    scale: 1,
    mutations: result,
  };
  const icon = (
    <InventorySprite item={inventoryItem} size="50px" canvasScale={2} />
  );
  set(avatarTriggerAnimationAtom, {
    playerId: get(playerIdAtom),
    animation: AvatarTriggerAnimationName.Water,
  });
  sendQuinoaToast({
    variant: 'success',
    title: t`${potionName} used!`,
    description: t`You used the ${potionName} on your ${cropName}.`,
    icon,
    onClick: openActivityLogModal,
  });
  sendQuinoaMessage({
    type: 'MutationPotion',
    tileObjectIdx: currentDirtTileIndex,
    growSlotIdx: growSlotIndex,
    mutation: grantedMutation,
  });
  if (selectedItem.quantity <= 1) {
    // We received reports of people accidentally shoveling their freshly minted plants.
    // Make sure nothing is selected in the inventory after using the last potion.
    set(myPossiblyNoLongerValidSelectedItemIndexAtom, null);
  }
}
