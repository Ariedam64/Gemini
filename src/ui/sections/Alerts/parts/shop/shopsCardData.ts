/**
 * Shops Card - Data transformation helpers and constants
 */

import { MGData } from "../../../../../modules";
import type { ShopType, ShopItem } from "../../../../../globals/core/types";
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
 * Extended type for table rows.
 *
 * `shopType` is the row's "primary" shop (first of `shops`) — used for the
 * custom sound storage key and emoji fallback. `shops` carries every shop the
 * item is eligible for; tracking and filtering operate on this list.
 */
export interface ShopItemRow extends ShopItem {
  shopType: ShopType;
  shops: ShopType[];
  rarity: string | null;
  spriteId: string | null;
  itemName: string;
  isTracked: boolean;
  hasCustomSound: boolean;
}

/**
 * Build a (shopType, itemId) lookup of currently-tracked items.
 */
function getTrackedKeySet(): Set<string> {
  const tracked = MGShopNotifier.getTrackedItems();
  return new Set(tracked.map((item) => `${item.shopType}:${item.itemId}`));
}

/**
 * Build rows from MGData's shop catalog (every purchaseable item, regardless
 * of the live shop snapshot).
 *
 * Items eligible for multiple shops (e.g. DawnCelestial → seed + dawn) yield
 * a single deduplicated row. The row's `shops` array carries every eligible
 * shop so filters and tracking can target all of them at once.
 */
export function buildAllRows(): ShopItemRow[] {
  const trackedKeys = getTrackedKeySet();
  const catalog = MGData.getShopCatalog();
  const allRows: ShopItemRow[] = [];

  for (const entry of catalog) {
    if (entry.shops.length === 0) continue;

    const shops = entry.shops as ShopType[];
    const primary = shops[0];
    const isTracked = shops.some((shop) => trackedKeys.has(`${shop}:${entry.id}`));

    allRows.push({
      // ShopItem fields — runtime quantities are not used by the alert table
      id: entry.id,
      itemType: entry.itemType,
      initialStock: 0,
      purchased: 0,
      remaining: 0,
      isAvailable: false,
      price: 0,
      // Display fields
      shopType: primary,
      shops,
      rarity: entry.rarity,
      spriteId: entry.spriteId,
      itemName: entry.name,
      isTracked,
      hasCustomSound: CustomSounds.hasItemCustomSound("shop", entry.id, primary),
    });
  }

  return allRows;
}
