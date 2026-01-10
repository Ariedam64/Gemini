import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { getDefaultStore } from 'jotai';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import { Currency } from '@/common/games/Quinoa/types';
import { getInventoryItemId } from '@/common/games/Quinoa/utils/inventory';
import { getIsPlayerBroke } from '@/common/games/Quinoa/utils/wishingWell';
import { myDataAtom } from '@/Quinoa/atoms/baseAtoms';
import { myFavoritedItemIdsAtom } from '@/Quinoa/atoms/inventoryAtoms';
import { openActivityLogModal } from '@/Quinoa/atoms/modalAtom';
import {
  mySelectedItemAtom,
  mySelectedItemNameAtom,
} from '@/Quinoa/atoms/myAtoms';
import { sendQuinoaToast } from '@/Quinoa/atoms/toastAtoms';
import CurrencyText from '@/Quinoa/components/currency/CurrencyText';
import { sendQuinoaMessage } from '@/Quinoa/utils/sendQuinoaMessage';

const { get } = getDefaultStore();

export function wish() {
  const selectedItem = get(mySelectedItemAtom);
  const selectedItemName = get(mySelectedItemNameAtom);
  const favoritedItemIds = get(myFavoritedItemIdsAtom);
  const myData = get(myDataAtom);
  if (!myData) {
    return;
  }
  const isPlayerBroke = getIsPlayerBroke(myData);

  if (!selectedItem) {
    if (isPlayerBroke) {
      sendQuinoaToast({
        variant: 'success',
        title: (
          <Trans>
            The wishing well gave you{' '}
            <CurrencyText
              currency={Currency.Coins}
              amount={100}
              spriteSize="18px"
              color="MagicWhite"
              fontWeight="bold"
            />
            !
          </Trans>
        ),
        description: t`Use them wisely to rebuild your garden.`,
        onClick: openActivityLogModal,
      });
      sendQuinoaMessage({
        type: 'Wish',
      });
    } else {
      sendQuinoaToast({
        variant: 'info',
        title: t`Nothing happened`,
        description: t`Select an item to throw in the wishing well.`,
      });
    }
    return;
  }
  const itemId = getInventoryItemId(selectedItem);

  if (favoritedItemIds.includes(itemId)) {
    sendQuinoaToast({
      variant: 'error',
      title: t`Cannot throw away favorited item`,
      description: t`Unfavorite your ${selectedItemName} to throw it away.`,
    });
    return;
  }
  if (selectedItem.itemType === ItemType.Tool) {
    sendQuinoaToast({
      variant: 'error',
      title: t`Cannot throw away tool`,
      description: t`Did you really try to throw a ${selectedItemName} in a well?`,
    });
    return;
  }
  sendQuinoaToast({
    variant: 'success',
    title: t`Goodbye!`,
    description: t`${selectedItemName} was thrown in the wishing well.`,
    onClick: openActivityLogModal,
  });
  sendQuinoaMessage({
    type: 'Wish',
    itemId,
  });
}
