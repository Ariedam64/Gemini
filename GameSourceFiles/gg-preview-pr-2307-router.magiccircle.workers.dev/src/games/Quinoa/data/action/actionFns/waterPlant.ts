import { t } from '@lingui/core/macro';
import { getDefaultStore } from 'jotai';
import { waterPlantSecondsReduction } from '@/common/games/Quinoa/constants';
import { floraSpeciesDex } from '@/common/games/Quinoa/systems/flora';
import { getArePlantAndCropsFullyGrown } from '@/common/games/Quinoa/utils/plants';
import { AvatarTriggerAnimationName } from '@/components/Avatars/avatarRiveConstants';
import { currentTimeAtom } from '@/games/Quinoa/atoms/baseAtoms';
import {
  myOwnCurrentDirtTileIndexAtom,
  myOwnCurrentGardenObjectAtom,
} from '@/games/Quinoa/atoms/myAtoms';
import { sendQuinoaMessage } from '@/games/Quinoa/utils/sendQuinoaMessage';
import { avatarTriggerAnimationAtom } from '@/Quinoa/atoms/avatarAtoms';
import { openActivityLogModal } from '@/Quinoa/atoms/modalAtom';
import { sendQuinoaToast } from '@/Quinoa/atoms/toastAtoms';
import { createInstaGrowToastIcon } from '@/Quinoa/utils/createInstaGrowToastIcon';
import { playerIdAtom } from '@/store/store';

const { get, set } = getDefaultStore();

export function waterPlant() {
  const currentDirtTileIndex = get(myOwnCurrentDirtTileIndexAtom);
  const currentGardenObject = get(myOwnCurrentGardenObjectAtom);
  const now = get(currentTimeAtom);
  if (
    currentDirtTileIndex === null ||
    !currentGardenObject ||
    currentGardenObject.objectType !== 'plant'
  ) {
    console.warn('This player is not standing on a plant tile object');
    return;
  }
  const { name } = floraSpeciesDex[currentGardenObject.species].plant;
  const isFullyGrown = getArePlantAndCropsFullyGrown(currentGardenObject, now);
  if (isFullyGrown) {
    sendQuinoaToast({
      variant: 'error',
      title: t`Cannot water ${name}`,
      description: t`Your ${name} is already fully grown.`,
    });
    return;
  }
  set(avatarTriggerAnimationAtom, {
    playerId: get(playerIdAtom),
    animation: AvatarTriggerAnimationName.WaterGold,
  });
  const minutesReduction = (waterPlantSecondsReduction / 60).toLocaleString();
  const icon = createInstaGrowToastIcon(currentGardenObject);
  sendQuinoaToast({
    variant: 'success',
    title: t`Watered ${name}`,
    description: t`The growth of your ${name} sped up by ${minutesReduction} minutes.`,
    icon,
    onClick: openActivityLogModal,
  });
  sendQuinoaMessage({
    type: 'WaterPlant',
    slot: currentDirtTileIndex,
  });
}
