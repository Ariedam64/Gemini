/**
 * Shop Restock Feature - History (Read-Only)
 */

import { loadHistory, saveHistory } from "../state";
import type { ItemHistorySummary } from "../types";
import { debugLog } from "./log";
import { EVENTS as CORE_EVENTS } from "../../../utils/storage";
import { dispatchCustomEventAll } from "../../../utils/windowContext";
import { MGData } from "../../../modules";

let historyCache: Record<string, ItemHistorySummary> | null = null;
let validItemsCache: { seed: Set<string>; egg: Set<string>; decor: Set<string> } | null = null;

function getValidItems(): { seed: Set<string>; egg: Set<string>; decor: Set<string> } {
  if (validItemsCache) return validItemsCache;
  const seed = new Set<string>();
  const egg = new Set<string>();
  const decor = new Set<string>();
  const plants = MGData.get("plants") as Record<string, any> | null;
  if (plants && typeof plants === "object") {
    for (const [id, value] of Object.entries(plants)) {
      if (value && typeof value === "object" && value.seed) seed.add(id);
    }
  }
  const eggs = MGData.get("eggs") as Record<string, any> | null;
  if (eggs && typeof eggs === "object") {
    for (const id of Object.keys(eggs)) egg.add(id);
  }
  const decorData = MGData.get("decor") as Record<string, any> | null;
  if (decorData && typeof decorData === "object") {
    for (const id of Object.keys(decorData)) decor.add(id);
  }
  validItemsCache = { seed, egg, decor };
  return validItemsCache;
}

export function resetValidItemsCache(): void {
  validItemsCache = null;
}

function isValidItem(shopType: string, itemId: string): boolean {
  const sets = getValidItems();
  if (shopType === "seed") return sets.seed.has(itemId);
  if (shopType === "egg") return sets.egg.has(itemId);
  if (shopType === "decor") return sets.decor.has(itemId);
  return false;
}

function getHistory(): Record<string, ItemHistorySummary> {
  if (!historyCache) historyCache = loadHistory();
  return historyCache;
}

export function mergeRemoteHistory(remote: Record<string, ItemHistorySummary>): void {
  // Server is canonical — replace local cache entirely
  const next: Record<string, ItemHistorySummary> = {};

  for (const [key, item] of Object.entries(remote)) {
    if (!isValidItem(item.shopType, item.itemId)) continue;
    next[key] = { ...item };
  }

  historyCache = next;
  saveHistory(next);
  debugLog("Replaced history from server", { items: Object.keys(next).length });
  dispatchCustomEventAll(CORE_EVENTS.SHOP_RESTOCK_HISTORY_UPDATED);
}

export function getHistorySnapshot(): Record<string, ItemHistorySummary> {
  return getHistory();
}

export function clearHistoryCache(): void {
  historyCache = {};
  saveHistory(historyCache);
}

export function pruneInvalidHistory(): void {
  const history = getHistory();
  let removed = 0;
  for (const [key, item] of Object.entries(history)) {
    if (!isValidItem(item.shopType, item.itemId)) {
      delete history[key];
      removed += 1;
    }
  }
  if (removed > 0) {
    saveHistory(history);
    debugLog("Pruned invalid history items", { removed });
    dispatchCustomEventAll(CORE_EVENTS.SHOP_RESTOCK_HISTORY_UPDATED);
  }
}
