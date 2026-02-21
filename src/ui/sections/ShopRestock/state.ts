/**
 * Shop Restock Section State
 */

import { createSectionStore } from "../core/State";

export type ShopRestockCardKey = "predictions" | "history" | "inventory";

export type ShopRestockUIState = {
  expandedCards: Record<ShopRestockCardKey, boolean>;
  historySortOrder: "newest" | "oldest";
  activeInventoryTab: "seed" | "egg" | "decor";
};

const DEFAULT_STATE: ShopRestockUIState = {
  expandedCards: {
    predictions: true,
    history: false,
    inventory: true,
  },
  historySortOrder: "newest",
  activeInventoryTab: "seed",
};

let store: Awaited<ReturnType<typeof createSectionStore<ShopRestockUIState>>> | null = null;

export async function initSectionState(): Promise<void> {
  if (store) return;
  store = await createSectionStore<ShopRestockUIState>("tab-shop-restock", {
    version: 2,
    defaults: DEFAULT_STATE,
  });
}

export function getStore() {
  if (!store) {
    throw new Error("[ShopRestock] Section state not initialized");
  }
  return store;
}
