import { Trans } from '@lingui/react/macro';
import { getDefaultStore } from 'jotai';
import { playSfx } from '@/audio/useQuinoaAudio';
import { EggsDex } from '@/common/games/Quinoa/systems/fauna';
import { floraSpeciesDex } from '@/common/games/Quinoa/systems/flora';
import { isCreditsModalOpenAtom } from '@/components/Credits/useCreditsModal';
import { openActivityLogModal } from '@/Quinoa/atoms/modalAtom';
import { sendQuinoaToast } from '@/Quinoa/atoms/toastAtoms';
import { createInstaGrowToastIcon } from '@/Quinoa/utils/createInstaGrowToastIcon';
import { quinoaRpc } from '@/Quinoa/utils/quinoaRpc';
import {
  creditsBalanceAtom,
  lastTimeCreditsBalanceWasSetAtom,
} from '@/store/store';
import {
  instaGrowCostAtom,
  myOwnCurrentDirtTileIndexAtom,
  myOwnCurrentGardenObjectAtom,
} from '../../../atoms/myAtoms';
import { isActionButtonLoadingAtom } from '../isActionButtonLoadingAtom';

const { get, set } = getDefaultStore();

export async function instaGrow() {
  const creditsBalance = get(creditsBalanceAtom);
  const instaGrowCost = get(instaGrowCostAtom);

  // If the player doesn't have enough credits, open the credits modal.
  if (creditsBalance < instaGrowCost) {
    set(isCreditsModalOpenAtom, true);
    return;
  }

  const currentDirtTileIndex = get(myOwnCurrentDirtTileIndexAtom);
  const currentGardenObject = get(myOwnCurrentGardenObjectAtom);

  if (!currentGardenObject || currentDirtTileIndex === null) {
    console.warn('No tile object found');
    return;
  }
  if (currentGardenObject.objectType === 'decor') {
    console.warn('Cannot insta-grow a decor');
    return;
  }

  try {
    set(isActionButtonLoadingAtom, true);

    // Attempt to perform the "Insta-Grow" action by calling the server.
    await quinoaRpc({
      method: 'InstaGrowWithCredits',
      dirtTileIndex: currentDirtTileIndex,
    });

    // HACK: A useEffect in QuinoaMain.tsx is syncing the credits balance.
    set(lastTimeCreditsBalanceWasSetAtom, Date.now());
    playSfx('Score_Promotion');

    // Let the user know the purchase was successful.
    const objectInfo =
      currentGardenObject.objectType === 'plant'
        ? floraSpeciesDex[currentGardenObject.species].plant
        : EggsDex[currentGardenObject.eggId];
    const icon = createInstaGrowToastIcon(currentGardenObject);

    sendQuinoaToast({
      title: <Trans>Purchase successful</Trans>,
      description: <Trans>Your {objectInfo.name} is fully grown!</Trans>,
      variant: 'success',
      icon,
      onClick: openActivityLogModal,
    });
  } catch (error) {
    console.error('Error insta-growing', error);

    // If the purchase fails, inform the user with an error message.
    sendQuinoaToast({
      title: <Trans>Purchase failed</Trans>,
      description:
        error instanceof Error ? (
          error.message
        ) : (
          <Trans>Something went wrong. Please try again.</Trans>
        ),
      variant: 'error',
    });
  } finally {
    set(isActionButtonLoadingAtom, false);
  }
}
