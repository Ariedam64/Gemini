// src/modules/shopActions/types.ts
// Type definitions for shop actions

/** Open-ended: weather shops (rain, snow, amber, thunder...) come from the game data. */
export type ShopType = "seed" | "egg" | "decor" | "tool" | "dawn" | (string & {});

export interface PurchaseResult {
  ok: boolean;
  itemId: string;
  reason?: string;
}

export interface BulkPurchaseResult {
  ok: boolean;
  itemId: string;
  totalPurchased: number;
  errors: string[];
}
