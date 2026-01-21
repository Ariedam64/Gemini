// src/modules/shopActions/logic/seed.ts
// Seed shop purchase logic

import { purchaseSeed } from "../../../websocket/api";
import { Globals } from "../../../globals";
import type { PurchaseResult, BulkPurchaseResult } from "../types";

/**
 * Buy a single seed by species
 */
export function buySeed(species: string): PurchaseResult {
  const result = purchaseSeed(species);

  return {
    ok: result.ok,
    itemId: species,
    reason: result.ok ? undefined : result.reason,
  };
}

/**
 * Buy all available seeds of a species
 */
export function buyAllSeeds(species: string): BulkPurchaseResult {
  const shops = Globals.shops;
  const seedShop = shops.getShop("seed");
  const seedItem = seedShop.items.find((item) => item.id === species);

  if (!seedItem) {
    return {
      ok: false,
      itemId: species,
      totalPurchased: 0,
      errors: [`Seed not found in shop: ${species}`],
    };
  }

  const remaining = seedItem.remaining;
  const errors: string[] = [];
  let purchased = 0;

  for (let i = 0; i < remaining; i++) {
    const result = purchaseSeed(species);
    if (result.ok) {
      purchased++;
    } else {
      errors.push(result.reason || `Failed to purchase seed ${i + 1}`);
    }
  }

  return {
    ok: purchased > 0,
    itemId: species,
    totalPurchased: purchased,
    errors,
  };
}
