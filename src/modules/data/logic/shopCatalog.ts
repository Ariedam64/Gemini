// src/modules/data/logic/shopCatalog.ts
// Build a catalog of every purchaseable item from MGData.
//
// Source: each plant/egg/item/decor entry exposes an `eligibleShops` array.
// An empty/missing array means the item cannot be bought at all and is excluded.
//
// Important: the same item can be eligible for multiple shops (e.g. DawnCelestial
// is in both "Seed" and "Dawn"). Callers must handle one entry mapping to several
// rows when building per-shop UI lists.

import { state } from "../state";

/** Lowercase shop identifier matching the live shop snapshot's keys. */
/**
 * A shop key an item can be sold in.
 *
 * Open-ended on purpose: the game keeps adding shops, and `/data` already
 * reports `snow`, `thunder` and `apology` alongside the original five.
 */
export type ShopCatalogShop = "seed" | "tool" | "egg" | "decor" | "dawn" | (string & {});

/** Item type as reported by the game inventory payloads. */
export type ShopCatalogItemType = "Seed" | "Tool" | "Egg" | "Decor";

export interface ShopCatalogEntry {
  id: string;
  itemType: ShopCatalogItemType;
  /** Shops this item can appear in. Always at least one. */
  shops: ShopCatalogShop[];
  name: string;
  rarity: string | null;
  spriteId: string | null;
}

/**
 * Normalize one `eligibleShops` entry to a shop key.
 *
 * The API spells these both ways — `Snow` and `snow` both occur — and the shop
 * keys in the game state are lowercase. Lowercasing covers both, and covers
 * shops added later; the fixed map this replaced knew five of the eight the API
 * already served, so items for the rest never reached the catalog at all.
 */
function toShopKey(value: unknown): ShopCatalogShop | null {
  const key = String(value ?? "").toLowerCase();
  return key.length > 0 ? key : null;
}

function resolveShops(eligible: unknown): ShopCatalogShop[] {
  if (!Array.isArray(eligible) || eligible.length === 0) return [];
  const out: ShopCatalogShop[] = [];
  for (const value of eligible) {
    const mapped = toShopKey(value);
    if (mapped && !out.includes(mapped)) out.push(mapped);
  }
  return out;
}

function buildEntry(
  source: Record<string, unknown>,
  itemType: ShopCatalogItemType,
  id: string
): ShopCatalogEntry | null {
  const shops = resolveShops(source.eligibleShops);
  if (shops.length === 0) return null;

  const rarityRaw = source.rarity;
  const rarity = typeof rarityRaw === "string" ? rarityRaw.toLowerCase() : null;
  const name = typeof source.name === "string" ? source.name : id;
  const spriteId = typeof source.spriteId === "string" ? source.spriteId : null;

  return { id, itemType, shops, name, rarity, spriteId };
}

/**
 * Return every purchaseable item across all shops.
 * Items without `eligibleShops` (or with an empty array) are excluded.
 */
export function getShopCatalog(): ShopCatalogEntry[] {
  const entries: ShopCatalogEntry[] = [];

  const plants = state.data.plants;
  if (plants) {
    for (const [id, value] of Object.entries(plants)) {
      const seed = (value as Record<string, unknown>)?.seed;
      if (!seed || typeof seed !== "object") continue;
      const entry = buildEntry(seed as Record<string, unknown>, "Seed", id);
      if (entry) entries.push(entry);
    }
  }

  const eggs = state.data.eggs;
  if (eggs) {
    for (const [id, value] of Object.entries(eggs)) {
      if (!value || typeof value !== "object") continue;
      const entry = buildEntry(value as Record<string, unknown>, "Egg", id);
      if (entry) entries.push(entry);
    }
  }

  const items = state.data.items;
  if (items) {
    for (const [id, value] of Object.entries(items)) {
      if (!value || typeof value !== "object") continue;
      const entry = buildEntry(value as Record<string, unknown>, "Tool", id);
      if (entry) entries.push(entry);
    }
  }

  const decor = state.data.decor;
  if (decor) {
    for (const [id, value] of Object.entries(decor)) {
      if (!value || typeof value !== "object") continue;
      const entry = buildEntry(value as Record<string, unknown>, "Decor", id);
      if (entry) entries.push(entry);
    }
  }

  return entries;
}
