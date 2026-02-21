/**
 * Shop Notifier - Tracking Logic
 */

import type { Shop, ShopRestockEvent, ShopType, Unsubscribe } from "../../../globals/core/types";
import { getShops } from "../../../globals";
import { EVENTS } from "../../../utils/storage";
import { getTrackedItemsByShop } from "../state";

let started = false;
const cleanups: Unsubscribe[] = [];

function getAvailableTrackedItems(shopType: ShopType, shop: Shop): Array<{ itemId: string; remaining: number }> {
  const trackedIds = getTrackedItemsByShop()[shopType];
  if (!trackedIds.length) return [];

  const trackedSet = new Set(trackedIds);

  return shop.items
    .filter((item) => trackedSet.has(item.id) && item.isAvailable)
    .map((item) => ({ itemId: item.id, remaining: item.remaining }));
}

function handleRestock(shopType: ShopType, event: ShopRestockEvent): void {
  const available = getAvailableTrackedItems(shopType, event.shop);
  if (!available.length) return;

  console.log("[ShopNotifier] Tracked items restocked", {
    shopType,
    items: available,
  });

  // Dispatch custom event for notification
  const customEvent = new CustomEvent(EVENTS.SHOP_RESTOCK_TRACKED, {
    detail: {
      shopType,
      items: available,
    },
  });
  window.dispatchEvent(customEvent);
}

/**
 * Start restock subscriptions
 */
export function startTracking(): void {
  if (started) return;
  started = true;

  const shops = getShops();

  cleanups.push(
    shops.subscribeSeedRestock((event) => handleRestock("seed", event)),
    shops.subscribeToolRestock((event) => handleRestock("tool", event)),
    shops.subscribeEggRestock((event) => handleRestock("egg", event)),
    shops.subscribeDecorRestock((event) => handleRestock("decor", event))
  );
}

/**
 * Stop restock subscriptions
 */
export function stopTracking(): void {
  if (!started) return;
  started = false;

  for (const cleanup of cleanups) {
    cleanup();
  }
  cleanups.length = 0;
}
