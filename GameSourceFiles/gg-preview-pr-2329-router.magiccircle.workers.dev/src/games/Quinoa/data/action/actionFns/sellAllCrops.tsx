import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { getDefaultStore } from 'jotai';
import { playSfx } from '@/audio/useQuinoaAudio';
import { floraSpeciesDex } from '@/common/games/Quinoa/systems/flora';
import { TaskId } from '@/common/games/Quinoa/systems/tasks';
import { Currency } from '@/common/games/Quinoa/types';
import { setConfirmationDialog } from '@/components/ConfirmationDialog/useConfirmationDialog';
import { sendQuinoaMessage } from '@/games/Quinoa/utils/sendQuinoaMessage';
import { teleport } from '@/games/Quinoa/World/teleport';
import { myFavoritedItemIdsAtom } from '@/Quinoa/atoms/inventoryAtoms';
import { openActivityLogModal } from '@/Quinoa/atoms/modalAtom';
import { sendQuinoaToast } from '@/Quinoa/atoms/toastAtoms';
import CurrencyText from '@/Quinoa/components/currency/CurrencyText';
import {
  hasNewCropLogsFromSellingAtom,
  myCropItemsAtom,
  myCropItemsToSellAtom,
  totalCropSellPriceAtom,
} from '../../../atoms/miscAtoms';
import { myActiveTasksAtom } from '../../../atoms/myAtoms';

const { get } = getDefaultStore();

export function sellAllCrops() {
  const myCropItems = get(myCropItemsAtom);
  if (myCropItems.length <= 0) {
    sendQuinoaToast({
      variant: 'error',
      title: t`No crops to sell`,
      description: t`Harvest some crops to sell them.`,
    });
    return;
  }
  const favoriteIds = get(myFavoritedItemIdsAtom);
  if (myCropItems.every((item) => favoriteIds.includes(item.id))) {
    sendQuinoaToast({
      variant: 'error',
      title: t`Cannot sell favorited crops`,
      description: t`Unfavorite your crops to sell them.`,
    });
    return;
  }
  const hasNewCropLogsFromSaleItems = get(hasNewCropLogsFromSellingAtom);
  const activeTasks = get(myActiveTasksAtom);
  if (
    hasNewCropLogsFromSaleItems &&
    !activeTasks.includes(TaskId.firstCropSell)
  ) {
    setConfirmationDialog({
      title: t`Are you sure?`,
      message: t`You have crops that can be logged in your journal.`,
      okText: t`Sell all`,
      cancelText: t`Go to journal`,
      okButtonColor: 'Red.Magic',
      cancelBackground: 'Brown.Magic',
      isCentered: true,
      onConfirm: () => {
        completeSellAllCrops();
      },
      onCancel: () => {
        teleport('collectorsClub');
      },
    });
  } else {
    completeSellAllCrops();
  }
}

function completeSellAllCrops() {
  const totalValue = get(totalCropSellPriceAtom);
  const myCropItemsToSell = get(myCropItemsToSellAtom);
  if (totalValue <= 0) {
    return;
  }
  const cropText =
    myCropItemsToSell.length > 1
      ? t`crops have`
      : t`${floraSpeciesDex[myCropItemsToSell[0].species].crop.name} has`;

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
    description: <Trans>Your {cropText} been sold.</Trans>,
    onClick: openActivityLogModal,
  });
  sendQuinoaMessage({ type: 'SellAllCrops' });
}
