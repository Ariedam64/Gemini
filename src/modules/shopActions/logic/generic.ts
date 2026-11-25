// src/modules/shopActions/logic/generic.ts
// Purchase from any shop by key (seed, tool, egg, decor, dawn, rain, snow, amber, thunder...)

import { purchaseShopItem } from "../../../websocket/api";
import { Globals } from "../../../globals";
import type { Shop } from "../../../globals/core/types";
import type { PurchaseResult, BulkPurchaseResult, ShopType } from "../types";
import { resolveBulkPurchase } from "./payload";

function findShop(shopType: ShopType): Shop | undefined {
  // Not `getShop`: a shop absent from the current state must stay undefined.
  return Globals.shops.get().byType[shopType] as Shop | undefined;
}

/**
 * Buy a single item from a shop. The item type is resolved from the current
 * shop snapshot.
 */
export function buyShopItem(shopType: ShopType, itemId: string): PurchaseResult {
  const plan = resolveBulkPurchase(findShop(shopType), itemId);
  if ("error" in plan) {
    return { ok: false, itemId, reason: plan.error };
  }

  const result = purchaseShopItem(shopType, plan.payload);
  return {
    ok: result.ok,
    itemId,
    reason: result.ok ? undefined : result.reason,
  };
}

/**
 * Buy all available copies of an item from a shop.
 */
export function buyAllShopItems(shopType: ShopType, itemId: string): BulkPurchaseResult {
  const plan = resolveBulkPurchase(findShop(shopType), itemId);
  if ("error" in plan) {
    return { ok: false, itemId, totalPurchased: 0, errors: [plan.error] };
  }

  const errors: string[] = [];
  let purchased = 0;

  for (let i = 0; i < plan.remaining; i++) {
    const result = purchaseShopItem(shopType, plan.payload);
    if (result.ok) {
      purchased++;
    } else {
      errors.push(result.reason || `Failed to purchase ${shopType} item ${i + 1}`);
    }
  }

  return {
    ok: purchased > 0,
    itemId,
    totalPurchased: purchased,
    errors,
  };
}
