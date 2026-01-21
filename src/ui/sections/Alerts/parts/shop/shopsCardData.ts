/**
 * Shops Card - Data transformation helpers and constants
 */

import { MGData } from "../../../../../modules";
import type { ShopType, ShopItem, ShopsData } from "../../../../../globals/core/types";
import type { DataKey } from "../../../../../modules/data/types";
import { MGShopNotifier } from "../../../../../features/shopNotifier";
import { CustomSounds } from "../../../../../modules/audio/customSounds";

/**
 * Labels for shop types
 */
export const SHOP_TYPE_LABELS: Record<ShopType, string> = {
  seed: "Seeds",
  tool: "Tools",
  egg: "Eggs",
  decor: "Decor",
};

/**
 * Emoji icons for shop types
 */
export const ITEM_EMOJI: Record<ShopType, string> = {
  seed: "🌱",
  tool: "🔧",
  egg: "🥚",
  decor: "🎨",
};

/**
 * MGData category mapping per shop type
 */
const DATA_CATEGORY: Record<ShopType, string> = {
  seed: "plants",
  tool: "items",
  egg: "eggs",
  decor: "decor",
};

/**
 * Sub-key for seed sprite (seeds are stored under plants.seed)
 */
const DATA_SUBKEY: Record<ShopType, string | null> = {
  seed: "seed",
  tool: null,
  egg: null,
  decor: null,
};

/**
 * Rarity order for sorting (from lowest to highest)
 */
export const RARITY_ORDER: Record<string, number> = {
  common: 0,
  uncommon: 1,
  rare: 2,
  legendary: 3,
  mythical: 4,
  divine: 5,
  celestial: 6,
};

/**
 * Extended type for table rows
 */
export interface ShopItemRow extends ShopItem {
  shopType: ShopType;
  rarity: string | null;
  spriteId: string | null;
  itemName: string;
  isTracked: boolean;
  hasCustomSound: boolean;
}

/**
 * Generic helper to get field from MGData item
 * Replaces repetitive getSpriteId, getRarity, getItemName patterns
 */
function getItemDataField<T>(
  itemId: string,
  shopType: ShopType,
  fieldName: string
): T | null {
  try {
    const category = DATA_CATEGORY[shopType] as DataKey;
    const dataCategory = MGData.get(category);

    if (!dataCategory || typeof dataCategory !== "object") {
      return null;
    }

    const itemData = (dataCategory as Record<string, unknown>)[itemId];
    if (!itemData || typeof itemData !== "object") {
      return null;
    }

    const subKey = DATA_SUBKEY[shopType];
    const target = subKey
      ? (itemData as Record<string, unknown>)[subKey]
      : itemData;

    if (!target || typeof target !== "object") {
      return null;
    }

    return ((target as Record<string, unknown>)[fieldName] as T) ?? null;
  } catch (error) {
    console.warn(`[Alerts] Failed to get ${fieldName} for ${itemId}:`, error);
    return null;
  }
}

/**
 * Get spriteId from MGData for a shop item
 */
export function getSpriteId(itemId: string, shopType: ShopType): string | null {
  return getItemDataField<string>(itemId, shopType, "spriteId");
}

/**
 * Get rarity from MGData for a shop item
 */
export function getRarity(itemId: string, shopType: ShopType): string | null {
  const rarity = getItemDataField<string>(itemId, shopType, "rarity");
  return rarity ? String(rarity).toLowerCase() : null;
}

/**
 * Get item name from MGData for a shop item
 */
export function getItemName(itemId: string, shopType: ShopType): string {
  return getItemDataField<string>(itemId, shopType, "name") ?? itemId;
}

/**
 * Get set of tracked item IDs
 */
export function getTrackedIdSet(): Set<string> {
  const tracked = MGShopNotifier.getTrackedItems();
  return new Set(tracked.map((item) => `${item.shopType}:${item.itemId}`));
}

/**
 * Build rows from all shops data
 */
export function buildAllRows(shopsData: ShopsData): ShopItemRow[] {
  const trackedIds = getTrackedIdSet();
  const allRows: ShopItemRow[] = [];

  const shopTypes: ShopType[] = ["seed", "tool", "egg", "decor"];

  for (const shopType of shopTypes) {
    const shop = shopsData.byType[shopType];
    if (!shop) continue;

    for (const item of shop.items) {
      const uniqueId = `${shopType}:${item.id}`;
      allRows.push({
        ...item,
        shopType,
        rarity: getRarity(item.id, shopType),
        spriteId: getSpriteId(item.id, shopType),
        itemName: getItemName(item.id, shopType),
        isTracked: trackedIds.has(uniqueId),
        hasCustomSound: CustomSounds.hasItemCustomSound('shop', item.id, shopType),
      });
    }
  }

  return allRows;
}
