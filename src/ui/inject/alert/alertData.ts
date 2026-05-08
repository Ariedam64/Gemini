/**
 * Alert Data - Helper to retrieve and filter available tracked shop items
 */

import { MGData } from "../../../modules";
import { MGShopNotifier } from "../../../features/shopNotifier";
import { getShops } from "../../../globals/variables/shops";
import type { ShopType, Shop, Unsubscribe } from "../../../globals/core/types";
import type { DataKey } from "../../../modules/data/types";

/**
 * Available item with all display data
 */
export interface AvailableItem {
  shopType: ShopType;
  itemId: string;
  itemName: string;
  spriteId: string | null;
  remaining: number;
  price: number;
}

/**
 * MGData category mapping per item type. Resolution by item type lets the Dawn
 * shop (heterogeneous: seeds + eggs) share the same lookup logic as the
 * homogeneous shops.
 */
const DATA_CATEGORY_BY_ITEM_TYPE: Record<string, { category: string; subKey: string | null }> = {
  Seed: { category: "plants", subKey: "seed" },
  Tool: { category: "items", subKey: null },
  Egg: { category: "eggs", subKey: null },
  Decor: { category: "decor", subKey: null },
};

/**
 * Get item data field from MGData
 */
function getItemDataField<T>(
  itemId: string,
  itemType: string,
  fieldName: string
): T | null {
  try {
    const mapping = DATA_CATEGORY_BY_ITEM_TYPE[itemType];
    if (!mapping) return null;

    const dataCategory = MGData.get(mapping.category as DataKey);
    if (!dataCategory || typeof dataCategory !== "object") {
      return null;
    }

    const itemData = (dataCategory as Record<string, unknown>)[itemId];
    if (!itemData || typeof itemData !== "object") {
      return null;
    }

    const target = mapping.subKey
      ? (itemData as Record<string, unknown>)[mapping.subKey]
      : itemData;

    if (!target || typeof target !== "object") {
      return null;
    }

    return ((target as Record<string, unknown>)[fieldName] as T) ?? null;
  } catch {
    return null;
  }
}

/**
 * Get sprite ID from MGData
 */
function getSpriteId(itemId: string, itemType: string): string | null {
  return getItemDataField<string>(itemId, itemType, "spriteId");
}

/**
 * Get item name from MGData
 */
function getItemName(itemId: string, itemType: string): string {
  return getItemDataField<string>(itemId, itemType, "name") ?? itemId;
}

/**
 * Get available tracked items from a specific shop
 */
function getAvailableFromShop(shopType: ShopType, shop: Shop): AvailableItem[] {
  const trackedItems = MGShopNotifier.getTrackedItems();

  const trackedIds = new Set(
    trackedItems
      .filter((item) => item.shopType === shopType)
      .map((item) => item.itemId)
  );

  if (trackedIds.size === 0) {
    return [];
  }

  const available = shop.items
    .filter((item) => {
      const isTracked = trackedIds.has(item.id);
      const isAvailable = item.isAvailable;
      return isTracked && isAvailable;
    })
    .map((item) => ({
      shopType,
      itemId: item.id,
      itemName: getItemName(item.id, item.itemType),
      spriteId: getSpriteId(item.id, item.itemType),
      remaining: item.remaining,
      price: item.price,
    }));

  return available;
}

/**
 * Get all available tracked items across all shops
 */
export function getAvailableTrackedItems(): AvailableItem[] {
  const shops = getShops();
  const shopsData = shops.get();

  const shopTypes: ShopType[] = ["seed", "tool", "egg", "decor", "dawn"];
  const allAvailable: AvailableItem[] = [];

  for (const shopType of shopTypes) {
    const shop = shopsData.byType[shopType];
    if (shop) {
      const items = getAvailableFromShop(shopType, shop);
      allAvailable.push(...items);
    }
  }

  return allAvailable;
}

/**
 * Subscribe to availability changes (stable shop updates)
 */
export function subscribeToAvailability(
  callback: (items: AvailableItem[]) => void
): Unsubscribe {
  const shops = getShops();

  // Subscribe to stable shop changes (triggers on purchases, restocks, etc.)
  // This will update immediately when the server sends back shop data after purchases
  const unsub = shops.subscribeStable(() => {
    const items = getAvailableTrackedItems();
    callback(items);
  });

  return unsub;
}
