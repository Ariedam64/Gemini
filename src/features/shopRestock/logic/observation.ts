/**
 * Shop Restock Feature - Tracked Items
 */

import type { FavoriteItem, TrackedShopType } from "../types";
import { loadConfig, saveConfig, invalidateConfigCache } from "../state";
import { EVENTS as CORE_EVENTS } from "../../../utils/storage";
import { dispatchCustomEventAll } from "../../../utils/windowContext";

function emitTrackedChanged(): void {
  dispatchCustomEventAll(CORE_EVENTS.SHOP_RESTOCK_TRACKED_CHANGED);
}

function emitTrackedList(items: FavoriteItem[]): void {
  dispatchCustomEventAll(CORE_EVENTS.SHOP_RESTOCK_TRACKED, { items });
}

import { debugLog } from "./log";

function getTrackedItemsSnapshot(): FavoriteItem[] {
  const config = loadConfig();
  return Array.isArray(config.trackedItems) ? [...config.trackedItems] : [];
}

export function toggleTrackedItem(shopType: TrackedShopType, itemId: string): boolean {
  const config = loadConfig();
  debugLog("Toggle tracked start", { shopType, itemId, currentCount: config.trackedItems.length });

  const current = getTrackedItemsSnapshot();
  const existing = current.find((item) => item.shopType === shopType && item.itemId === itemId);
  let next: FavoriteItem[];
  let enabled: boolean;
  if (existing) {
    next = current.filter((item) => !(item.shopType === shopType && item.itemId === itemId));
    enabled = false;
  } else {
    next = [...current, { shopType, itemId }];
    enabled = true;
  }

  saveConfig({ ...config, trackedItems: next });
  debugLog("Toggle tracked result", { enabled, newCount: next.length });

  emitTrackedChanged();
  emitTrackedList(next);
  return enabled;
}

export function setTrackedItem(shopType: TrackedShopType, itemId: string, enabled: boolean): void {
  const config = loadConfig();
  const current = getTrackedItemsSnapshot();
  const exists = current.some((item) => item.shopType === shopType && item.itemId === itemId);
  if (enabled && !exists) {
    const next = [...current, { shopType, itemId }];
    saveConfig({ ...config, trackedItems: next });
    emitTrackedChanged();
    emitTrackedList(next);
    return;
  }
  if (!enabled && exists) {
    const next = current.filter((item) => !(item.shopType === shopType && item.itemId === itemId));
    saveConfig({ ...config, trackedItems: next });
    emitTrackedChanged();
    emitTrackedList(next);
  }
}

export function isTracked(shopType: TrackedShopType, itemId: string): boolean {
  const current = getTrackedItemsSnapshot();
  return current.some((item) => item.shopType === shopType && item.itemId === itemId);
}

export function getTrackedItems(): FavoriteItem[] {
  return getTrackedItemsSnapshot();
}
