/**
 * Shop Restock Feature - Public API (Read-Only)
 */

import * as State from "./state";
import * as History from "./logic/history";
import * as Prediction from "./logic/prediction";
import * as Debug from "./logic/debug";
import { fetchHistory } from "./logic/api";
import type { ItemHistorySummary, ItemPrediction, TrackedShopType } from "./types";
import { debugLog } from "./logic/log";
import { toggleTrackedItem, isTracked, getTrackedItems, setTrackedItem } from "./logic/observation";
import { EVENTS as CORE_EVENTS } from "../../utils/storage";

let initialized = false;
let lastCommunityUpdated: number | null = null;
let syncInProgress = false;
let lastRefreshAt = 0;
const REFRESH_COOLDOWN_MS = 60_000;

export function init(): void {
  if (initialized) return;

  if (!State.isEnabled()) {
    debugLog("Init skipped (disabled)");
    return;
  }

  initialized = true;

  const config = State.loadConfig();
  if (config.debug.enabled) {
    Debug.startDebug();
  }

  if (config.communityDataEnabled) {
    syncCommunityData(true);
  }

  History.pruneInvalidHistory();

  debugLog("Initialized");
}

export function destroy(): void {
  if (!initialized) return;

  Debug.stopDebug();
  initialized = false;

  debugLog("Destroyed");
}

export function isReady(): boolean {
  return initialized;
}

export function isEnabled(): boolean {
  return State.isEnabled();
}

export function setEnabled(enabled: boolean): void {
  const current = State.isEnabled();
  if (current === enabled) return;
  State.setEnabled(enabled);
  if (enabled) init();
  else destroy();
}

export function getHistoryForShop(shopType: TrackedShopType): ItemHistorySummary[] {
  const snapshot = History.getHistorySnapshot();
  return Object.values(snapshot).filter((item) => item.shopType === shopType);
}

export function clearHistory(): void {
  History.clearHistoryCache();
}

export function predictItem(shopType: TrackedShopType, itemId: string): ItemPrediction | null {
  return Prediction.predictItem(shopType, itemId);
}

export function predictAllFavorites(): ItemPrediction[] {
  return Prediction.predictAllFavorites();
}

export async function syncCommunityData(force = false): Promise<void> {
  if (syncInProgress) return;
  if (document.hidden) return;
  if (!force && Date.now() - lastRefreshAt < REFRESH_COOLDOWN_MS) {
    debugLog("Sync skipped (cooldown)");
    return;
  }

  syncInProgress = true;
  try {
    const res = await fetchHistory();
    if (res.meta?.lastUpdated) {
      if (!force && lastCommunityUpdated && res.meta.lastUpdated <= lastCommunityUpdated) {
        return;
      }
      lastCommunityUpdated = res.meta.lastUpdated;
    }

    if (res.items) History.mergeRemoteHistory(res.items);

    const meta = res.meta ?? (lastCommunityUpdated ? { lastUpdated: lastCommunityUpdated } : null);
    if (meta) {
      window.dispatchEvent(new CustomEvent(CORE_EVENTS.SHOP_RESTOCK_META_UPDATED, { detail: meta }));
    }
    lastRefreshAt = Date.now();
  } finally {
    syncInProgress = false;
  }
}

export const MGShopRestock = {
  init,
  destroy,
  isReady,
  isEnabled,
  setEnabled,

  getHistoryForShop,
  clearHistory,

  predictItem,
  predictAllFavorites,

  syncCommunityData,
  toggleTrackedItem,
  setTrackedItem,
  isTracked,
  getTrackedItems,
};

export type { TrackedShopType } from "./types";
