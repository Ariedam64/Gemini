/**
 * Shop Restock Feature - API (Read-Only)
 */

import { httpGet } from "../../ariesAPI/logic/http";
import { loadConfig } from "../state";
import type { ItemHistorySummary } from "../types";
import { debugLog } from "./log";

export type SupabaseHistoryResponse = {
  items: Record<string, ItemHistorySummary>;
  meta?: { lastUpdated: number | null; count?: number };
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

export async function fetchHistory(): Promise<HistoryFetchResult> {
  const config = loadConfig();
  const headers = getSupabaseHeaders();

  if (config.communitySource === "supabase") {
    if (!headers || !config.supabaseUrl) {
      debugLog("Supabase config missing");
      return { items: null, meta: null, source: "none" };
    }
    try {
      const res = await httpGet<SupabaseHistoryResponse>(
        `${config.supabaseUrl}/functions/v1/restock-history`,
        undefined,
        headers
      );

      if (res.status === 404) {
        debugLog("Supabase function not found (404)");
        return { items: null, meta: null, source: "supabase" };
      }
      if (res.status === 500) {
        debugLog("Supabase function error (500)");
        return { items: null, meta: null, source: "supabase" };
      }
      if (res.status !== 200 && res.status !== 0) {
        debugLog("Fetch history error", { status: res.status });
        return { items: null, meta: null, source: "supabase" };
      }

      const itemCount = res.data?.items ? Object.keys(res.data.items).length : 0;
      debugLog("Fetch history", { items: itemCount });
      return {
        items: res.data?.items ?? null,
        meta: res.data?.meta ?? null,
        source: "supabase",
      };
    } catch (error) {
      debugLog("Fetch history exception", { error: String(error) });
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
