// src/modules/data/logic/shopTypes.ts
// The list of shops the game currently has, and how to label one.

import { state } from "../state";

/**
 * Shops that existed before the game started adding more.
 *
 * Only a fallback, for when game data has not loaded yet. The live list comes
 * from the API — see {@link getShopTypes}.
 */
const FALLBACK_SHOP_TYPES = ["seed", "tool", "egg", "decor", "dawn"] as const;

/** Display names that do not follow from the key. */
const SHOP_LABEL_OVERRIDES: Record<string, string> = {
  seed: "Seeds",
  tool: "Tools",
  egg: "Eggs",
};

/**
 * Every shop key the game has, lowercase, in the API's own order.
 *
 * Sourced from `/data` `enums.eligibleShops`. Hardcoding this list is how
 * `snow`, `thunder` and `apology` stayed invisible after the game added them:
 * the data was there, the mod just never asked.
 */
export function getShopTypes(): string[] {
  const enums = state.data.enums as { eligibleShops?: unknown } | null;
  const shops = enums?.eligibleShops;

  if (Array.isArray(shops) && shops.length > 0) {
    return shops.map((shop) => String(shop).toLowerCase());
  }

  return [...FALLBACK_SHOP_TYPES];
}

/**
 * Human-readable name for a shop key.
 *
 * Capitalising the key covers every shop added so far (`Dawn`, `Snow`,
 * `Thunder`, `Apology`); only the pluralised originals need an override.
 */
export function getShopLabel(shopType: string): string {
  const override = SHOP_LABEL_OVERRIDES[shopType];
  if (override) return override;

  if (!shopType) return "";
  return shopType.charAt(0).toUpperCase() + shopType.slice(1);
}
