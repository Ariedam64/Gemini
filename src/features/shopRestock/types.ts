/**
 * Shop Restock Feature - Types
 */

import { FEATURE_KEYS } from "../../utils/storage";
import type { ShopType } from "../../globals/core/types";

export type RestockShopType = Exclude<ShopType, "tool">;
export type TrackedShopType = RestockShopType | "weather";

export type ItemHistorySummary = {
  itemId: string;
  shopType: TrackedShopType;
  totalOccurrences: number;
  totalQuantity: number | null;
  firstSeen: number | null;
  lastSeen: number | null;
  averageIntervalMs: number | null;
  estimatedNextTimestamp: number | null;
  averageQuantity: number | null;
  lastQuantity: number | null;
  ratePerDay: number | null;
  appearanceRate: number | null;
};

export type ItemPrediction = {
  itemId: string;
  shopType: TrackedShopType;
  estimatedNextTimestamp: number | null;
  averageIntervalMs: number | null;
  totalDataPoints: number;
  lastSeen: number | null;
  appearanceRate: number | null;
  averageQuantity: number | null;
};

/** Cycle interval in ms per shop type */
export const SHOP_CYCLE_INTERVALS: Record<RestockShopType, number> = {
  seed: 300_000,
  egg: 900_000,
  decor: 3_600_000,
};

export type FavoriteItem = {
  itemId: string;
  shopType: TrackedShopType;
};

export type ShopRestockDebugConfig = {
  enabled: boolean;
  mockLatencyMs: number;
};

export type ShopRestockConfig = {
  enabled: boolean;
  trackedItems: FavoriteItem[];
  communityDataEnabled: boolean;
  communitySource: "vps" | "supabase";
  supabaseUrl: string;
  supabaseAnonKey: string;
  debug: ShopRestockDebugConfig;
};

export const STORAGE_KEY = FEATURE_KEYS.SHOP_RESTOCK;
export const HISTORY_KEY = FEATURE_KEYS.SHOP_RESTOCK_HISTORY;

export const DEFAULT_CONFIG: ShopRestockConfig = {
  enabled: true,
  trackedItems: [],
  communityDataEnabled: true,
  communitySource: "supabase",
  supabaseUrl: "https://xjuvryjgrjchbhjixwzh.supabase.co",
  supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqdXZyeWpncmpjaGJoaml4d3poIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxMDYyODMsImV4cCI6MjA4NTY4MjI4M30.MqQCBG-UMR4HYJU44Tz2orHUj9gMgJTMJtxpb_MHeps",
  debug: {
    enabled: false,
    mockLatencyMs: 0,
  },
};

export const TRACKED_SHOPS: TrackedShopType[] = ["seed", "egg", "decor", "weather"];

export const EVENTS = {
  DEBUG_SIMULATE: "gemini:shop-restock-simulate",
} as const;
