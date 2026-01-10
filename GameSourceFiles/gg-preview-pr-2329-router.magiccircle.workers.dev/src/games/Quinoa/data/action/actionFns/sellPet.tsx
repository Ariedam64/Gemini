import { playSfx } from '@/audio/useQuinoaAudio';
import { faunaSpeciesDex } from '@/common/games/Quinoa/systems/fauna';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import { Currency } from '@/common/games/Quinoa/types';
import type { PetInventoryItem } from '@/common/games/Quinoa/user-json-schema/current';
import { getPetSellPrice } from '@/common/games/Quinoa/utils/sell';
import { setConfirmationDialog } from '@/components/ConfirmationDialog/useConfirmationDialog';
import { sendQuinoaMessage } from '@/games/Quinoa/utils/sendQuinoaMessage';
import { teleport } from '@/games/Quinoa/World/teleport';
import { myFavoritedItemIdsAtom } from '@/Quinoa/atoms/inventoryAtoms';
import { openActivityLogModal } from '@/Quinoa/atoms/modalAtom';
import { sendQuinoaToast } from '@/Quinoa/atoms/toastAtoms';
import CurrencyText from '@/Quinoa/components/currency/CurrencyText';
import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { getDefaultStore } from 'jotai';
import {
  friendBonusMultiplierAtom,
  selectedPetHasNewVariantsAtom,
} from '../../../atoms/miscAtoms';
import { mySelectedItemAtom } from '../../../atoms/myAtoms';

const { get } = getDefaultStore();

export function sellPet() {
  const selectedItem = get(mySelectedItemAtom);
  if (selectedItem?.itemType !== ItemType.Pet) {
    sendQuinoaToast({
      variant: 'error',
      title: t`No pet to sell`,
      description: t`Select a pet to sell it.`,
    });
    return;
  }
  const favoriteIds = get(myFavoritedItemIdsAtom);
  if (favoriteIds.includes(selectedItem.id)) {
    sendQuinoaToast({
      variant: 'error',
      title: t`Cannot sell favorited pet`,
      description: t`Unfavorite your pet to sell it.`,
    });
    return;
  }
  const selectedPetHasNewVariants = get(selectedPetHasNewVariantsAtom);
  if (selectedPetHasNewVariants) {
    setConfirmationDialog({
      title: t`Are you sure?`,
      message: t`This pet can be logged in your journal.`,
      okText: t`Sell`,
      cancelText: t`Go to journal`,
      okButtonColor: 'Red.Magic',
      cancelBackground: 'Brown.Magic',
      isCentered: true,
      onConfirm: () => {
        completeSellPet(selectedItem);
      },
      onCancel: () => {
        teleport('collectorsClub');
      },
    });
  } else {
    completeSellPet(selectedItem);
  }
}

function completeSellPet(petInventoryItem: PetInventoryItem) {
  const selectedItem = get(mySelectedItemAtom);
  const favoritedIds = get(myFavoritedItemIdsAtom);
  if (
    selectedItem?.itemType !== ItemType.Pet ||
    favoritedIds.includes(selectedItem.id)
  ) {
    return;
  }
  const petSellPrice = getPetSellPrice(selectedItem);
  const friendBonusMultiplier = get(friendBonusMultiplierAtom);
  const totalValue = Math.round(petSellPrice * friendBonusMultiplier);
  const { name: faunaName } = faunaSpeciesDex[selectedItem.petSpecies];
  const petText = selectedItem.name ? selectedItem.name : t`Your ${faunaName}`;

  playSfx('Sell');
  sendQuinoaToast({
    variant: 'success',
    icon: 'sprite/ui/MoneyBag',
    title: (
      <Trans>
        Sold for{' '}
        <CurrencyText
          currency={Currency.Coins}
          amount={totalValue}
          spriteSize="18px"
          color="MagicWhite"
          fontWeight="bold"
        />
      </Trans>
    ),
    description: <Trans>{petText} has been sold.</Trans>,
    onClick: openActivityLogModal,
  });
  sendQuinoaMessage({ type: 'SellPet', itemId: petInventoryItem.id });
}
