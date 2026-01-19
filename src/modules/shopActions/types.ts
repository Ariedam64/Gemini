// src/modules/shopActions/types.ts
// Type definitions for shop actions

export type ShopType = "seed" | "egg" | "decor" | "tool";

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
