// src/modules/shopActions/logic/dawn.ts
// Dawn shop purchase logic (heterogeneous: delegates to the generic shop purchase)

import type { PurchaseResult, BulkPurchaseResult } from "../types";
import { buyShopItem, buyAllShopItems } from "./generic";

/**
 * Buy a single item from the Dawn shop by id.
 * The item type is resolved from the current shop snapshot — the Dawn shop
 * must be active (Dawn weather) for the item to be present.
 */
export function buyDawnItem(itemId: string): PurchaseResult {
  return buyShopItem("dawn", itemId);
}

/**
 * Buy all available copies of a Dawn shop item.
 */
export function buyAllDawnItems(itemId: string): BulkPurchaseResult {
  return buyAllShopItems("dawn", itemId);
}
