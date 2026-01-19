// src/modules/shopActions/logic/egg.ts
// Egg shop purchase logic

import { purchaseEgg } from "../../../websocket/api";
import { Globals } from "../../../globals";
import type { PurchaseResult, BulkPurchaseResult } from "../types";

/**
 * Buy a single egg by ID
 */
export function buyEgg(eggId: string): PurchaseResult {
  const result = purchaseEgg(eggId);

  return {
    ok: result.ok,
    itemId: eggId,
    reason: result.ok ? undefined : result.reason,
  };
}

/**
 * Buy all available eggs of a specific ID
 */
export function buyAllEggs(eggId: string): BulkPurchaseResult {
  const shops = Globals.shops;
  const eggShop = shops.getShop("egg");
  const eggItem = eggShop.items.find((item) => item.id === eggId);

  if (!eggItem) {
    return {
      ok: false,
      itemId: eggId,
      totalPurchased: 0,
      errors: [`Egg not found in shop: ${eggId}`],
    };
  }

  const remaining = eggItem.remaining;
  const errors: string[] = [];
  let purchased = 0;

  for (let i = 0; i < remaining; i++) {
    const result = purchaseEgg(eggId);
    if (result.ok) {
      purchased++;
    } else {
      errors.push(result.reason || `Failed to purchase egg ${i + 1}`);
    }
  }

  return {
    ok: purchased > 0,
    itemId: eggId,
    totalPurchased: purchased,
    errors,
  };
}
