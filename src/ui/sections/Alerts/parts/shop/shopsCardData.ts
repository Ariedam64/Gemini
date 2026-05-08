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
  dawn: "Dawn",
};

/**
 * Emoji icons for shop types (fallback when sprite is unavailable)
 */
export const ITEM_EMOJI: Record<ShopType, string> = {
  seed: "🌱",
  tool: "🔧",
  egg: "🥚",
  decor: "🎨",
  dawn: "🌅",
};

/**
 * MGData category mapping per item type. Drives data lookups for sprite/rarity/name.
 * Resolution is by `itemType` (not shop) so Dawn shop's heterogeneous inventory
 * (seeds + eggs) is handled transparently.
 */
const DATA_CATEGORY_BY_ITEM_TYPE: Record<string, { category: string; subKey: string | null }> = {
  Seed: { category: "plants", subKey: "seed" },
  Tool: { category: "items", subKey: null },
  Egg: { category: "eggs", subKey: null },
  Decor: { category: "decor", subKey: null },
};

function resolveItemEmoji(itemType: string, shopType: ShopType): string {
  switch (itemType) {
    case "Seed": return ITEM_EMOJI.seed;
    case "Tool": return ITEM_EMOJI.tool;
    case "Egg": return ITEM_EMOJI.egg;
    case "Decor": return ITEM_EMOJI.decor;
    default: return ITEM_EMOJI[shopType];
  }
}

export { resolveItemEmoji };

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
 * Generic helper to get a field from MGData for a shop item.
 * Resolution is driven by the inventory item's `itemType` so heterogeneous
 * shops (Dawn) work without a per-shop branch.
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
  } catch (error) {
    console.warn(`[Alerts] Failed to get ${fieldName} for ${itemId}:`, error);
    return null;
  }
}

/**
 * Get spriteId from MGData for a shop item
 */
export function getSpriteId(itemId: string, itemType: string): string | null {
  return getItemDataField<string>(itemId, itemType, "spriteId");
}

/**
 * Get rarity from MGData for a shop item
 */
export function getRarity(itemId: string, itemType: string): string | null {
  const rarity = getItemDataField<string>(itemId, itemType, "rarity");
  return rarity ? String(rarity).toLowerCase() : null;
}

/**
 * Get item name from MGData for a shop item
 */
export function getItemName(itemId: string, itemType: string): string {
  return getItemDataField<string>(itemId, itemType, "name") ?? itemId;
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

  const shopTypes: ShopType[] = ["seed", "tool", "egg", "decor", "dawn"];

  for (const shopType of shopTypes) {
    const shop = shopsData.byType[shopType];
    if (!shop) continue;

    for (const item of shop.items) {
      const uniqueId = `${shopType}:${item.id}`;
      allRows.push({
        ...item,
        shopType,
        rarity: getRarity(item.id, item.itemType),
        spriteId: getSpriteId(item.id, item.itemType),
        itemName: getItemName(item.id, item.itemType),
        isTracked: trackedIds.has(uniqueId),
        hasCustomSound: CustomSounds.hasItemCustomSound('shop', item.id, shopType),
      });
    }
  }

  return allRows;
}
