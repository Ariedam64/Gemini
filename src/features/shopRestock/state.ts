/**
 * Shop Restock Feature - State
 */

import { storageGet, storageSet } from "../../utils/storage";
import { DEFAULT_CONFIG, HISTORY_KEY, STORAGE_KEY } from "./types";
import type { ItemHistorySummary, ShopRestockConfig } from "./types";

let cachedConfig: ShopRestockConfig | null = null;
let cachedHistory: Record<string, ItemHistorySummary> | null = null;

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export function loadConfig(): ShopRestockConfig {
  if (cachedConfig) return cachedConfig;
  const stored = storageGet<ShopRestockConfig>(STORAGE_KEY, DEFAULT_CONFIG);
  cachedConfig = {
    ...DEFAULT_CONFIG,
    ...stored,
    trackedItems: Array.isArray((stored as any)?.trackedItems) ? (stored as any).trackedItems : [],
    debug: { ...DEFAULT_CONFIG.debug, ...(stored?.debug ?? {}) },
  };
  if (!("supabaseUrl" in stored) || !cachedConfig.supabaseUrl) {
    cachedConfig.supabaseUrl = DEFAULT_CONFIG.supabaseUrl;
  }
  if (!("supabaseAnonKey" in stored) || !cachedConfig.supabaseAnonKey) {
    cachedConfig.supabaseAnonKey = DEFAULT_CONFIG.supabaseAnonKey;
  }
  if (cachedConfig.communitySource !== "supabase" && cachedConfig.communitySource !== "vps") {
    cachedConfig.communitySource = DEFAULT_CONFIG.communitySource;
  }
  if (
    !("communitySource" in stored) ||
    stored.communityDataEnabled !== cachedConfig.communityDataEnabled ||
    stored.enabled !== cachedConfig.enabled ||
    stored.supabaseUrl !== cachedConfig.supabaseUrl ||
    stored.supabaseAnonKey !== cachedConfig.supabaseAnonKey
  ) {
    storageSet(STORAGE_KEY, cachedConfig);
  }
  return cachedConfig;
}

export function invalidateConfigCache(): void {
  cachedConfig = null;
}
export function saveConfig(config: ShopRestockConfig): void {
  cachedConfig = clone(config);
  storageSet(STORAGE_KEY, cachedConfig);
}

export function updateConfig(patch: Partial<ShopRestockConfig>): ShopRestockConfig {
  const current = loadConfig();
  const next = { ...current, ...patch };
  if (patch.debug) {
    next.debug = { ...current.debug, ...patch.debug };
  }
  saveConfig(next);
  return next;
}

export function isEnabled(): boolean {
  return loadConfig().enabled;
}

export function setEnabled(enabled: boolean): void {
  const config = loadConfig();
  if (config.enabled === enabled) return;
  saveConfig({ ...config, enabled });
}

export function loadHistory(): Record<string, ItemHistorySummary> {
  if (cachedHistory) return cachedHistory;
  const stored = storageGet<Record<string, ItemHistorySummary>>(HISTORY_KEY, {});
  cachedHistory = stored && typeof stored === "object" ? clone(stored) : {};
  return cachedHistory;
}

export function saveHistory(history: Record<string, ItemHistorySummary>): void {
  cachedHistory = history;
  storageSet(HISTORY_KEY, history);
}

export function clearHistory(): void {
  cachedHistory = {};
  storageSet(HISTORY_KEY, {});
}
