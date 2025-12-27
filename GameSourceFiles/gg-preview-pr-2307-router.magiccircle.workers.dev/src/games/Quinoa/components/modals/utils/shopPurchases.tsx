import { Trans } from '@lingui/react/macro';
import { getDefaultStore } from 'jotai';
import { playSfx } from '@/audio/useQuinoaAudio';
import { decorDex } from '@/common/games/Quinoa/systems/decor';
import { EggsDex } from '@/common/games/Quinoa/systems/fauna';
import { floraSpeciesDex } from '@/common/games/Quinoa/systems/flora';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import type {
  DecorShopItem,
  EggShopItem,
  SeedShopItem,
  ToolShopItem,
} from '@/common/games/Quinoa/systems/shop';
import { toolsDex } from '@/common/games/Quinoa/systems/tools';
import {
  myDecorInventoryAtom,
  myEggInventoryAtom,
  mySeedInventoryAtom,
  myToolInventoryAtom,
} from '@/Quinoa/atoms/inventoryAtoms';
import { openActivityLogModal } from '@/Quinoa/atoms/modalAtom';
import { sendQuinoaToast } from '@/Quinoa/atoms/toastAtoms';
import { getMyInventoryCapacityStatus } from '@/Quinoa/utils/getMyInventoryCapacityStatus';
import { sendQuinoaMessage } from '@/Quinoa/utils/sendQuinoaMessage';

const { get } = getDefaultStore();

export const handleDecorPurchase = (shopItem: DecorShopItem) => {
  const decorInventory = get(myDecorInventoryAtom);
  const { tileRef, name } = decorDex[shopItem.decorId];
  const { isInventoryFull, isItemAtMaxQuantity } = getMyInventoryCapacityStatus(
    {
      itemType: ItemType.Decor,
      id: shopItem.decorId,
    }
  );
  if (isInventoryFull) {
    sendQuinoaToast({
      title: <Trans>Inventory full</Trans>,
      description: <Trans>Free up space to buy this decor.</Trans>,
      variant: 'error',
    });
    return;
  }
  if (isItemAtMaxQuantity) {
    sendQuinoaToast({
      title: <Trans>Max stack size reached</Trans>,
      description: <Trans>Your {name} stack is full.</Trans>,
      variant: 'error',
    });
    return;
  }
  sendQuinoaMessage({
    type: 'PurchaseDecor',
    decorId: shopItem.decorId,
  });
  const ownedCount =
    decorInventory.find((i) => i.decorId === shopItem.decorId)?.quantity ?? 0;
  playSfx('CoinBuy');
  sendQuinoaToast({
    variant: 'success',
    icon: tileRef,
    title: <Trans>Purchase successful</Trans>,
    description: (
      <Trans>
        You now have <strong>{ownedCount + 1}</strong> {name}
        {ownedCount === 0 ? '.' : '(s).'}
      </Trans>
    ),
    onClick: openActivityLogModal,
  });
};

export const handleToolPurchase = (shopItem: ToolShopItem) => {
  const toolInventory = get(myToolInventoryAtom);
  const { tileRef, name } = toolsDex[shopItem.toolId];
  const { isInventoryFull, isItemAtMaxQuantity } = getMyInventoryCapacityStatus(
    {
      itemType: ItemType.Tool,
      id: shopItem.toolId,
    }
  );
  if (isInventoryFull) {
    sendQuinoaToast({
      title: <Trans>Inventory full</Trans>,
      description: <Trans>Free up space to buy this tool.</Trans>,
      variant: 'error',
    });
    return;
  }
  if (isItemAtMaxQuantity) {
    sendQuinoaToast({
      title: <Trans>Max stack size reached</Trans>,
      description: <Trans>Your {name} stack is full.</Trans>,
      variant: 'error',
    });
    return;
  }
  sendQuinoaMessage({
    type: 'PurchaseTool',
    toolId: shopItem.toolId,
  });
  const ownedCount =
    toolInventory.find((i) => i.toolId === shopItem.toolId)?.quantity ?? 0;
  playSfx('CoinBuy');
  sendQuinoaToast({
    variant: 'success',
    icon: tileRef,
    title: <Trans>Purchase successful</Trans>,
    description: (
      <Trans>
        You now have <strong>{(ownedCount + 1).toLocaleString()}</strong> {name}
        {ownedCount === 0 ? '.' : '(s).'}
      </Trans>
    ),
    onClick: openActivityLogModal,
  });
};

export const handleSeedPurchase = (shopItem: SeedShopItem) => {
  const seedInventory = get(mySeedInventoryAtom);
  const { name, tileRef } = floraSpeciesDex[shopItem.species].seed;
  const { isInventoryFull, isItemAtMaxQuantity } = getMyInventoryCapacityStatus(
    {
      itemType: ItemType.Seed,
      id: shopItem.species,
    }
  );
  if (isInventoryFull) {
    sendQuinoaToast({
      title: <Trans>Inventory full</Trans>,
      description: <Trans>Free up space to buy this seed.</Trans>,
      variant: 'error',
    });
    return;
  }
  if (isItemAtMaxQuantity) {
    sendQuinoaToast({
      title: <Trans>Max stack size reached</Trans>,
      description: <Trans>Your {name} stack is full.</Trans>,
      variant: 'error',
    });
    return;
  }
  sendQuinoaMessage({
    type: 'PurchaseSeed',
    species: shopItem.species,
  });
  const ownedCount =
    seedInventory.find((i) => i.species === shopItem.species)?.quantity ?? 0;
  playSfx('CoinBuy');
  sendQuinoaToast({
    variant: 'success',
    icon: tileRef,
    title: <Trans>Purchase successful</Trans>,
    description: (
      <Trans>
        You now have <strong>{(ownedCount + 1).toLocaleString()}</strong> {name}
        {ownedCount === 0 ? '.' : '(s).'}
      </Trans>
    ),
    onClick: openActivityLogModal,
  });
};

export const handleEggPurchase = (shopItem: EggShopItem) => {
  const eggInventory = get(myEggInventoryAtom);
  const { tileRef, name } = EggsDex[shopItem.eggId];
  const { isInventoryFull, isItemAtMaxQuantity } = getMyInventoryCapacityStatus(
    {
      itemType: ItemType.Egg,
      id: shopItem.eggId,
    }
  );
  if (isInventoryFull) {
    sendQuinoaToast({
      title: <Trans>Inventory full</Trans>,
      description: <Trans>Free up space to buy this egg.</Trans>,
      variant: 'error',
    });
    return;
  }
  if (isItemAtMaxQuantity) {
    sendQuinoaToast({
      title: <Trans>Max stack size reached</Trans>,
      description: <Trans>Your {name} stack is full.</Trans>,
      variant: 'error',
    });
    return;
  }
  sendQuinoaMessage({
    type: 'PurchaseEgg',
    eggId: shopItem.eggId,
  });
  const ownedCount =
    eggInventory.find((i) => i.eggId === shopItem.eggId)?.quantity ?? 0;
  playSfx('CoinBuy');
  sendQuinoaToast({
    variant: 'success',
    icon: tileRef,
    title: <Trans>Purchase successful</Trans>,
    description: (
      <Trans>
        You now have <strong>{(ownedCount + 1).toLocaleString()}</strong> {name}
        {ownedCount === 0 ? '.' : '(s).'}
      </Trans>
    ),
    onClick: openActivityLogModal,
  });
};
