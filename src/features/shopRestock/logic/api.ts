/**
 * Shop Restock Feature - API (Read-Only)
 */

import { httpGet } from "../../ariesAPI/logic/http";
import { loadConfig } from "../state";
import type { ItemHistorySummary, TrackedShopType } from "../types";
import { debugLog } from "./log";

export type SupabaseHistoryResponse = {
  items: Record<string, ItemHistorySummary>;
  meta?: { lastUpdated: number | null; count?: number };
};

type SupabasePredictionRow = {
  item_id: string;
  shop_type: string;
  total_occurrences: number | null;
  total_quantity: number | null;
  last_seen: number | null;
  average_quantity: number | null;
  median_interval_ms: number | null;
  expected_interval_ms: number | null;
  estimated_next_timestamp: number | null;
  current_probability: number | null;
};

type SupabaseWeatherPredictionRow = {
  weather_id: string;
  total_occurrences: number | null;
  last_seen: number | null;
  average_interval_ms: number | null;
  estimated_next_timestamp: number | null;
  appearance_rate: number | null;
};

export type HistoryFetchResult = {
  items: Record<string, ItemHistorySummary> | null;
  meta: { lastUpdated: number | null; count?: number } | null;
  source: "supabase" | "vps" | "none";
};

function getSupabaseHeaders(): Record<string, string> | null {
  const { supabaseUrl, supabaseAnonKey } = loadConfig();
  if (!supabaseUrl || !supabaseAnonKey) return null;
  return {
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${supabaseAnonKey}`,
  };
}

function isTrackedShopType(value: string): value is TrackedShopType {
  return value === "seed" || value === "egg" || value === "decor" || value === "weather";
}

type MappedItems = {
  items: Record<string, ItemHistorySummary>;
  maxLastSeen: number | null;
};

function mapPredictionRows(rows: SupabasePredictionRow[]): MappedItems {
  const items: Record<string, ItemHistorySummary> = {};
  let maxLastSeen: number | null = null;

  for (const row of rows) {
    const itemId = row.item_id;
    const shopType = row.shop_type;
    if (!itemId || !shopType || shopType === "tool") continue;
    if (!isTrackedShopType(shopType)) continue;

    const lastSeen = row.last_seen ?? null;
    if (typeof lastSeen === "number") {
      if (maxLastSeen === null || lastSeen > maxLastSeen) maxLastSeen = lastSeen;
    }

    const key = `${shopType}:${itemId}`;
    items[key] = {
      itemId,
      shopType,
      totalOccurrences: row.total_occurrences ?? 0,
      totalQuantity: row.total_quantity ?? null,
      firstSeen: null,
      lastSeen,
      averageIntervalMs: row.expected_interval_ms ?? row.median_interval_ms ?? null,
      estimatedNextTimestamp: row.estimated_next_timestamp ?? null,
      averageQuantity: row.average_quantity ?? null,
      lastQuantity: null,
      ratePerDay: null,
      appearanceRate: row.current_probability ?? null,
    };
  }

  return { items, maxLastSeen };
}

function mapWeatherRows(rows: SupabaseWeatherPredictionRow[]): MappedItems {
  const items: Record<string, ItemHistorySummary> = {};
  let maxLastSeen: number | null = null;

  for (const row of rows) {
    const weatherId = row.weather_id;
    if (!weatherId) continue;
    const lastSeen = row.last_seen ?? null;
    if (typeof lastSeen === "number") {
      if (maxLastSeen === null || lastSeen > maxLastSeen) maxLastSeen = lastSeen;
    }
    const key = `weather:${weatherId}`;
    items[key] = {
      itemId: weatherId,
      shopType: "weather",
      totalOccurrences: row.total_occurrences ?? 0,
      totalQuantity: null,
      firstSeen: null,
      lastSeen,
      averageIntervalMs: row.average_interval_ms ?? null,
      estimatedNextTimestamp: row.estimated_next_timestamp ?? null,
      averageQuantity: null,
      lastQuantity: null,
      ratePerDay: row.appearance_rate ?? null,
      appearanceRate: row.appearance_rate ?? null,
    };
  }

  return { items, maxLastSeen };
}

export async function fetchHistory(): Promise<HistoryFetchResult> {
  const config = loadConfig();
  const headers = getSupabaseHeaders();

  if (config.communitySource === "supabase") {
    if (!headers || !config.supabaseUrl) {
      debugLog("Supabase config missing");
      return { items: null, meta: null, source: "none" };
    }
    try {
      const predictionsUrl = `${config.supabaseUrl}/rest/v1/restock_predictions?select=` +
        [
          "item_id",
          "shop_type",
          "total_occurrences",
          "total_quantity",
          "last_seen",
          "average_quantity",
          "median_interval_ms",
          "expected_interval_ms",
          "estimated_next_timestamp",
          "current_probability",
        ].join(",");

      const weatherUrl = `${config.supabaseUrl}/rest/v1/weather_predictions?select=` +
        [
          "weather_id",
          "total_occurrences",
          "last_seen",
          "average_interval_ms",
          "estimated_next_timestamp",
          "appearance_rate",
        ].join(",");

      const [res, weatherRes] = await Promise.all([
        httpGet<SupabasePredictionRow[]>(predictionsUrl, undefined, headers),
        httpGet<SupabaseWeatherPredictionRow[]>(weatherUrl, undefined, headers),
      ]);

      if (res.status === 404) {
        debugLog("Supabase predictions view not found (404)");
        return { items: null, meta: null, source: "supabase" };
      }
      if (res.status === 500) {
        debugLog("Supabase predictions view error (500)");
        return { items: null, meta: null, source: "supabase" };
      }
      if (res.status !== 200 && res.status !== 0) {
        debugLog("Fetch predictions error", { status: res.status });
        return { items: null, meta: null, source: "supabase" };
      }

      if (weatherRes.status !== 200 && weatherRes.status !== 0) {
        debugLog("Fetch weather predictions error", { status: weatherRes.status });
      }

      const rows = Array.isArray(res.data) ? res.data : [];
      const weatherRows = Array.isArray(weatherRes.data) ? weatherRes.data : [];

      const mapped = mapPredictionRows(rows);
      const mappedWeather = mapWeatherRows(weatherRows);

      const combinedItems: Record<string, ItemHistorySummary> = {
        ...mapped.items,
        ...mappedWeather.items,
      };

      const maxLastSeen = [
        mapped.maxLastSeen,
        mappedWeather.maxLastSeen,
      ].filter((v): v is number => typeof v === "number")
        .reduce((max, val) => (max === null || val > max ? val : max), null as number | null);

      debugLog("Fetch predictions", { items: Object.keys(combinedItems).length });
      return {
        items: combinedItems,
        meta: { lastUpdated: maxLastSeen, count: Object.keys(combinedItems).length },
        source: "supabase",
      };
    } catch (error) {
      debugLog("Fetch predictions exception", { error: String(error) });
      return { items: null, meta: null, source: "supabase" };
    }
  }

  if (config.communitySource === "vps") {
    const res = await httpGet<{ items: Record<string, ItemHistorySummary> }>("/restock/history");
    const itemCount = res.data?.items ? Object.keys(res.data.items).length : 0;
    debugLog("Fetch history (VPS)", { items: itemCount });
    return { items: res.data?.items ?? null, meta: null, source: "vps" };
  }

  return { items: null, meta: null, source: "none" };
}
