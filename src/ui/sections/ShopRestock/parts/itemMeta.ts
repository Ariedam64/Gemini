/**
 * Shop Restock - Shared Item Metadata Helpers
 */

import { MGData } from "../../../../modules";
import type { TrackedShopType } from "../../../../features/shopRestock/types";

const DATA_CATEGORY: Record<TrackedShopType, string> = {
  seed: "plants",
  egg: "eggs",
  decor: "decor",
  weather: "weather",
};

const DATA_SUBKEY: Record<TrackedShopType, string | null> = {
  seed: "seed",
  egg: null,
  decor: null,
  weather: null,
};

function resolveWeatherId(itemId: string): string {
  const weathers = MGData.get("weather") as Record<string, any> | null;
  if (!weathers || typeof weathers !== "object") return itemId;
  if (weathers[itemId]) return itemId;
  if (itemId === "Snow" && weathers.Frost) return "Frost";
  if (itemId === "Frost" && weathers.Snow) return "Snow";
  return itemId;
}

function getItemDataField<T>(itemId: string, shopType: TrackedShopType, field: string): T | null {
  const category = DATA_CATEGORY[shopType];
  const dataCategory = MGData.get(category as any);
  if (!dataCategory || typeof dataCategory !== "object") return null;
  const resolvedId = shopType === "weather" ? resolveWeatherId(itemId) : itemId;
  const itemData = (dataCategory as any)[resolvedId];
  if (!itemData || typeof itemData !== "object") return null;
  const subKey = DATA_SUBKEY[shopType];
  const target = subKey ? itemData[subKey] : itemData;
  if (!target || typeof target !== "object") return null;
  return (target as any)[field] ?? null;
}

export function getItemName(itemId: string, shopType: TrackedShopType): string {
  return getItemDataField<string>(itemId, shopType, "name") ?? itemId;
}

export function getSpriteId(itemId: string, shopType: TrackedShopType): string | null {
  if (shopType === "weather") {
    return getItemDataField<string>(itemId, shopType, "spriteId") ?? null;
  }
  const primary =
    getItemDataField<string>(itemId, shopType, "spriteId") ??
    getItemDataField<string>(itemId, shopType, "sprite");
  if (primary) return primary;

  if (shopType === "seed") {
    const plants = MGData.get("plants") as Record<string, any> | null;
    const plant = plants?.[itemId];
    return (
      plant?.seed?.spriteId ??
      plant?.seed?.sprite ??
      plant?.plant?.spriteId ??
      plant?.plant?.sprite ??
      plant?.crop?.spriteId ??
      plant?.crop?.sprite ??
      null
    );
  }

  return null;
}

export function getRarity(itemId: string, shopType: TrackedShopType): string | null {
  if (shopType === "weather") return null;
  const rarity = getItemDataField<string>(itemId, shopType, "rarity");
  return rarity ? String(rarity).toLowerCase() : null;
}

export function getCoinPrice(itemId: string, shopType: TrackedShopType): number {
  if (shopType === "weather") return 0;
  if (shopType === "seed" || shopType === "egg") {
    return getItemDataField<number>(itemId, shopType, "coinPrice") ?? 0;
  }
  const decor = MGData.get("decor") as Record<string, { coinPrice?: number }> | null;
  return decor?.[itemId]?.coinPrice ?? 0;
}

export function getExpiryDateMs(itemId: string, shopType: TrackedShopType): number | null {
  if (shopType === "weather") return null;
  const raw = getItemDataField<unknown>(itemId, shopType, "expiryDate");
  if (!raw) return null;
  if (typeof raw === "number" && Number.isFinite(raw)) return raw;
  if (raw instanceof Date) return raw.getTime();
  if (typeof raw === "string") {
    const parsed = Date.parse(raw);
    return Number.isFinite(parsed) ? parsed : null;
  }
  if (typeof raw === "object" && "valueOf" in raw) {
    const value = (raw as { valueOf: () => number }).valueOf();
    return Number.isFinite(value) ? value : null;
  }
  return null;
}
