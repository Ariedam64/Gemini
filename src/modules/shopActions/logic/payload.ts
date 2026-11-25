// src/modules/shopActions/logic/payload.ts
// Pure purchase payload resolution, shared by every shop (weather shops included)

import type { PurchaseItemPayload } from "../../../websocket/api";
import type { Shop } from "../../../globals/core/types";

/**
 * Build the PurchaseShopItem payload for an item, from its `itemType`.
 * Weather shops sell a mix of Seed, Tool (potions), Egg and Decor items.
 * Returns null for an item type the protocol does not know.
 */
export function buildPurchasePayload(itemType: string, itemId: string): PurchaseItemPayload | null {
  switch (itemType) {
    case "Seed":
      return { itemType: "Seed", species: itemId };
    case "Tool":
      return { itemType: "Tool", toolId: itemId };
    case "Egg":
      return { itemType: "Egg", eggId: itemId };
    case "Decor":
      return { itemType: "Decor", decorId: itemId };
    default:
      return null;
  }
}

export type BulkPurchasePlan =
  | { payload: PurchaseItemPayload; remaining: number }
  | { error: string };

/**
 * Resolve what to send to buy every remaining copy of `itemId` in `shop`.
 * Never throws: a missing shop, item or unknown item type gives an error.
 */
export function resolveBulkPurchase(shop: Shop | undefined, itemId: string): BulkPurchasePlan {
  if (!shop) return { error: `Shop not found for item: ${itemId}` };

  const item = shop.items.find((entry) => entry.id === itemId);
  if (!item) return { error: `Item not found in ${shop.type} shop: ${itemId}` };

  const payload = buildPurchasePayload(item.itemType, itemId);
  if (!payload) return { error: `Unsupported item type in ${shop.type} shop: ${item.itemType}` };

  return { payload, remaining: item.remaining };
}
