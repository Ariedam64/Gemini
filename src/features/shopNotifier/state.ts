/**
 * Shop Notifier - State Management
 */

import { storageGet, storageSet } from "../../utils/storage";
import type { ShopType } from "../../globals/core/types";
import { DEFAULT_CONFIG, DEFAULT_TRACKED_ITEMS, STORAGE_KEY } from "./types";
import type { ShopNotifierConfig, TrackedItem, TrackedItemsByShop } from "./types";

const SHOP_TYPES: ShopType[] = ["seed", "tool", "egg", "decor"];

function normalizeTrackedItems(items?: Partial<Record<ShopType, string[]>> | null): TrackedItemsByShop {
  return {
    seed: Array.isArray(items?.seed) ? [...items.seed] : [],
    tool: Array.isArray(items?.tool) ? [...items.tool] : [],
    egg: Array.isArray(items?.egg) ? [...items.egg] : [],
    decor: Array.isArray(items?.decor) ? [...items.decor] : [],
  };
}

function cloneTrackedItems(items: TrackedItemsByShop): TrackedItemsByShop {
  return {
    seed: [...items.seed],
    tool: [...items.tool],
    egg: [...items.egg],
    decor: [...items.decor],
  };
}

/**
 * Load configuration from storage
 */
export function loadConfig(): ShopNotifierConfig {
  const stored = storageGet<ShopNotifierConfig>(STORAGE_KEY, DEFAULT_CONFIG);
  return {
    enabled: stored?.enabled ?? false,
    trackedItems: normalizeTrackedItems(stored?.trackedItems),
  };
}

/**
 * Save configuration to storage
 */
export function saveConfig(config: ShopNotifierConfig): void {
  storageSet(STORAGE_KEY, {
    enabled: config.enabled,
    trackedItems: cloneTrackedItems(config.trackedItems),
  });
}

/**
 * Update configuration with partial changes
 */
export function updateConfig(updates: Partial<ShopNotifierConfig>): ShopNotifierConfig {
  const current = loadConfig();
  const updated: ShopNotifierConfig = {
    ...current,
    ...updates,
  };

  if (updates.trackedItems) {
    updated.trackedItems = normalizeTrackedItems(updates.trackedItems);
  }

  saveConfig(updated);
  return updated;
}

/**
 * Check if feature is enabled
 */
export function isEnabled(): boolean {
  return loadConfig().enabled;
}

/**
 * Set enabled flag in storage
 */
export function setEnabled(enabled: boolean): void {
  updateConfig({ enabled });
}

/**
 * Get tracked items grouped by shop
 */
export function getTrackedItemsByShop(): TrackedItemsByShop {
  return cloneTrackedItems(loadConfig().trackedItems);
}

/**
 * Get tracked items as a flat list
 */
export function getTrackedItems(): TrackedItem[] {
  const tracked = getTrackedItemsByShop();
  const items: TrackedItem[] = [];

  for (const shopType of SHOP_TYPES) {
    for (const itemId of tracked[shopType]) {
      items.push({ shopType, itemId });
    }
  }

  return items;
}

/**
 * Add an item to the tracked list
 */
export function addTrackedItem(shopType: ShopType, itemId: string): void {
  const config = loadConfig();
  const trackedItems = cloneTrackedItems(config.trackedItems);
  const list = trackedItems[shopType];

  if (list.includes(itemId)) return;

  list.push(itemId);
  saveConfig({ ...config, trackedItems });
}

/**
 * Remove an item from the tracked list
 */
export function removeTrackedItem(shopType: ShopType, itemId: string): void {
  const config = loadConfig();
  const trackedItems = cloneTrackedItems(config.trackedItems);
  const list = trackedItems[shopType];
  const next = list.filter((id) => id !== itemId);

  if (next.length === list.length) return;

  trackedItems[shopType] = next;
  saveConfig({ ...config, trackedItems });
}

/**
 * Reset tracked items list
 */
export function resetTrackedItems(): void {
  const config = loadConfig();
  saveConfig({ ...config, trackedItems: cloneTrackedItems(DEFAULT_TRACKED_ITEMS) });
}
