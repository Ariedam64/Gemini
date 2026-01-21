/**
 * Shop Notifier - Limited Items Tracking
 *
 * Automatically disables tracking for items that have reached their max quantity
 */

import type { ShopType, Unsubscribe } from "../../../globals/core/types";
import { getMyInventory } from "../../../globals/variables/myInventory";
import { getMyGarden } from "../../../globals/variables/myGarden";
import { removeTrackedItem, getTrackedItems } from "../state";

/**
 * Items with limited quantities
 */
const LIMITED_ITEMS: Record<string, { shopType: ShopType; maxQuantity: number }> = {
  // Tools
  Shovel: { shopType: "tool", maxQuantity: 1 },
  WateringCan: { shopType: "tool", maxQuantity: 99 },

  // Decor (checks both inventory + placed in garden)
  PetHutch: { shopType: "decor", maxQuantity: 1 },
  DecorShed: { shopType: "decor", maxQuantity: 1 },
};

/**
 * Check if a tool has reached max quantity in inventory
 */
function hasReachedMaxTool(toolId: string, maxQuantity: number, items: unknown[]): boolean {
  const toolItem = items.find(
    (item: unknown) =>
      typeof item === "object" &&
      item !== null &&
      "toolId" in item &&
      item.toolId === toolId
  );

  if (!toolItem) return false;

  const quantity = (toolItem as { quantity?: number }).quantity ?? 0;
  return quantity >= maxQuantity;
}

/**
 * Check if a decor has reached max quantity in inventory + garden
 */
function hasReachedMaxDecor(decorId: string, maxQuantity: number, items: unknown[]): boolean {
  // Check inventory quantity
  const decorItem = items.find(
    (item: unknown) =>
      typeof item === "object" &&
      item !== null &&
      "decorId" in item &&
      item.decorId === decorId
  );

  const inventoryQuantity = decorItem ? ((decorItem as { quantity?: number }).quantity ?? 0) : 0;

  // Check garden (placed decors)
  const garden = getMyGarden();
  const gardenData = garden.get();
  const placedCount = gardenData.decors.all.filter(
    (decor: unknown) =>
      typeof decor === "object" &&
      decor !== null &&
      "decorId" in decor &&
      (decor as { decorId: string }).decorId === decorId
  ).length;

  // Total = inventory + placed in garden
  const totalQuantity = inventoryQuantity + placedCount;

  return totalQuantity >= maxQuantity;
}

/**
 * Check if an item has reached its max quantity
 */
function hasReachedMax(itemId: string, shopType: ShopType, maxQuantity: number, items: unknown[]): boolean {
  if (shopType === "tool") {
    return hasReachedMaxTool(itemId, maxQuantity, items);
  } else if (shopType === "decor") {
    return hasReachedMaxDecor(itemId, maxQuantity, items);
  }
  return false;
}

/**
 * Check if an item is limited (has a max quantity)
 */
export function isLimitedItem(itemId: string): boolean {
  return itemId in LIMITED_ITEMS;
}

/**
 * Check if a limited item has reached its max quantity
 * Returns false for non-limited items
 */
export function isItemAtMaxQuantity(itemId: string, shopType: ShopType): boolean {
  const limitedItem = LIMITED_ITEMS[itemId];

  if (!limitedItem) return false;
  if (limitedItem.shopType !== shopType) return false;

  const inventory = getMyInventory();
  const inventoryData = inventory.get();

  return hasReachedMax(itemId, shopType, limitedItem.maxQuantity, inventoryData.items);
}

/**
 * Check inventory and disable tracking for items that have reached max quantity
 */
function checkAndDisableMaxed(): void {
  const inventory = getMyInventory();
  const inventoryData = inventory.get();
  const trackedItems = getTrackedItems();

  // Check each tracked item against limited items
  for (const tracked of trackedItems) {
    const limitedItem = LIMITED_ITEMS[tracked.itemId];

    if (!limitedItem) continue;

    // Verify shop type matches
    if (limitedItem.shopType !== tracked.shopType) continue;

    // Check if item has reached max quantity
    if (hasReachedMax(tracked.itemId, tracked.shopType, limitedItem.maxQuantity, inventoryData.items)) {
      console.log(`[ShopNotifier] Auto-disabling tracking for ${tracked.itemId} (max quantity reached)`);
      removeTrackedItem(tracked.shopType, tracked.itemId);
    }
  }
}

let started = false;
let unsubscribe: Unsubscribe | null = null;

/**
 * Start monitoring inventory for limited items
 */
export function startLimitedItemsMonitoring(): void {
  if (started) return;
  started = true;

  const inventory = getMyInventory();

  // Subscribe to inventory changes
  unsubscribe = inventory.subscribeStable(() => {
    checkAndDisableMaxed();
  });

  // Initial check
  checkAndDisableMaxed();
}

/**
 * Stop monitoring inventory
 */
export function stopLimitedItemsMonitoring(): void {
  if (!started) return;
  started = false;

  if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
  }
}
