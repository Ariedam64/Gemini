// src/modules/shopActions/logic/dawn.ts
// Dawn shop purchase logic (heterogeneous: holds Seed and Egg items)

import { purchaseDawnItem, type PurchaseItemPayload } from "../../../websocket/api";
import { Globals } from "../../../globals";
import type { PurchaseResult, BulkPurchaseResult } from "../types";

function buildDawnPayload(itemType: string, itemId: string): PurchaseItemPayload | null {
  if (itemType === "Seed") return { itemType: "Seed", species: itemId };
  if (itemType === "Egg") return { itemType: "Egg", eggId: itemId };
  return null;
}

/**
 * Buy a single item from the Dawn shop by id.
 * The item type is resolved from the current shop snapshot — the Dawn shop
 * must be active (Dawn weather) for the item to be present.
 */
export function buyDawnItem(itemId: string): PurchaseResult {
  const dawnShop = Globals.shops.getShop("dawn");
  const item = dawnShop.items.find((it) => it.id === itemId);

  if (!item) {
    return {
      ok: false,
      itemId,
      reason: `Item not found in dawn shop: ${itemId}`,
    };
  }

  const payload = buildDawnPayload(item.itemType, itemId);
  if (!payload) {
    return {
      ok: false,
      itemId,
      reason: `Unsupported dawn item type: ${item.itemType}`,
    };
  }

  const result = purchaseDawnItem(payload);
  return {
    ok: result.ok,
    itemId,
    reason: result.ok ? undefined : result.reason,
  };
}

/**
 * Buy all available copies of a Dawn shop item.
 */
export function buyAllDawnItems(itemId: string): BulkPurchaseResult {
  const dawnShop = Globals.shops.getShop("dawn");
  const item = dawnShop.items.find((it) => it.id === itemId);

  if (!item) {
    return {
      ok: false,
      itemId,
      totalPurchased: 0,
      errors: [`Item not found in dawn shop: ${itemId}`],
    };
  }

  const payload = buildDawnPayload(item.itemType, itemId);
  if (!payload) {
    return {
      ok: false,
      itemId,
      totalPurchased: 0,
      errors: [`Unsupported dawn item type: ${item.itemType}`],
    };
  }

  const remaining = item.remaining;
  const errors: string[] = [];
  let purchased = 0;

  for (let i = 0; i < remaining; i++) {
    const result = purchaseDawnItem(payload);
    if (result.ok) {
      purchased++;
    } else {
      errors.push(result.reason || `Failed to purchase dawn item ${i + 1}`);
    }
  }

  return {
    ok: purchased > 0,
    itemId,
    totalPurchased: purchased,
    errors,
  };
}
