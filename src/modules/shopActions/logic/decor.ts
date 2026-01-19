// src/modules/shopActions/logic/decor.ts
// Decor shop purchase logic

import { purchaseDecor } from "../../../websocket/api";
import { Globals } from "../../../globals";
import type { PurchaseResult, BulkPurchaseResult } from "../types";

/**
 * Buy a single decor by ID
 */
export function buyDecor(decorId: string): PurchaseResult {
  const result = purchaseDecor(decorId);

  return {
    ok: result.ok,
    itemId: decorId,
    reason: result.ok ? undefined : result.reason,
  };
}

/**
 * Buy all available decors of a specific ID
 */
export function buyAllDecors(decorId: string): BulkPurchaseResult {
  const shops = Globals.shops;
  const decorShop = shops.getShop("decor");
  const decorItem = decorShop.items.find((item) => item.id === decorId);

  if (!decorItem) {
    return {
      ok: false,
      itemId: decorId,
      totalPurchased: 0,
      errors: [`Decor not found in shop: ${decorId}`],
    };
  }

  const remaining = decorItem.remaining;
  const errors: string[] = [];
  let purchased = 0;

  for (let i = 0; i < remaining; i++) {
    const result = purchaseDecor(decorId);
    if (result.ok) {
      purchased++;
    } else {
      errors.push(result.reason || `Failed to purchase decor ${i + 1}`);
    }
  }

  return {
    ok: purchased > 0,
    itemId: decorId,
    totalPurchased: purchased,
    errors,
  };
}
