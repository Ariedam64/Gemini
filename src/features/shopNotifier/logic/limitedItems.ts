/**
 * Shop Notifier - Limited Items Tracking
 *
 * Auto-disables tracking for items that have reached their per-item cap.
 * The cap is derived from MGData (no hardcoded data):
 *   - `isOneTimePurchase: true`  -> cap = 1
 *   - `maxInventoryQuantity: N`  -> cap = N
 *
 * Items without a cap (regular seeds/eggs/most decors) are never auto-disabled.
 */

import type { Unsubscribe } from "../../../globals/core/types";
import { getMyInventory } from "../../../globals/variables/myInventory";
import { getMyGarden } from "../../../globals/variables/myGarden";
import { MGData } from "../../../modules";
import type { DataKey } from "../../../modules/data/types";
import { getTrackedItems, removeTrackedItem } from "../state";

type ItemKind = "Tool" | "Decor" | "Seed" | "Egg";

interface ItemLimit {
  itemType: ItemKind;
  maxQuantity: number;
}

interface DataSource {
  key: DataKey;
  itemType: ItemKind;
  subKey?: "seed";
}

/**
 * Order matters only for ambiguity: an item id collides across categories at
 * most by accident; first match wins.
 */
const DATA_SOURCES: DataSource[] = [
  { key: "items", itemType: "Tool" },
  { key: "decor", itemType: "Decor" },
  { key: "plants", itemType: "Seed", subKey: "seed" },
  { key: "eggs", itemType: "Egg" },
];

function readFinitePositive(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : null;
}

/**
 * Read the limit metadata for an item id directly from MGData.
 * Returns null if MGData has no entry for it, or the item has no cap.
 */
function getItemLimit(itemId: string): ItemLimit | null {
  for (const source of DATA_SOURCES) {
    const bag = MGData.get(source.key);
    if (!bag || typeof bag !== "object") continue;

    const raw = (bag as Record<string, unknown>)[itemId];
    if (!raw || typeof raw !== "object") continue;

    const data = source.subKey ? (raw as Record<string, unknown>)[source.subKey] : raw;
    if (!data || typeof data !== "object") continue;

    const record = data as Record<string, unknown>;

    if (record.isOneTimePurchase === true) {
      return { itemType: source.itemType, maxQuantity: 1 };
    }

    const maxStack = readFinitePositive(record.maxInventoryQuantity);
    if (maxStack !== null) {
      return { itemType: source.itemType, maxQuantity: maxStack };
    }

    return null;
  }
  return null;
}

function getInventoryQuantity(
  items: unknown[],
  idKey: "toolId" | "decorId" | "seedId" | "eggId",
  itemId: string
): number {
  let total = 0;
  for (const item of items) {
    if (!item || typeof item !== "object") continue;
    const record = item as Record<string, unknown>;
    if (record[idKey] !== itemId) continue;
    const qty = record.quantity;
    total += typeof qty === "number" ? qty : 1;
  }
  return total;
}

function countPlacedDecor(decorId: string): number {
  const gardenData = getMyGarden().get();
  let count = 0;
  for (const decor of gardenData.decors.all) {
    if (!decor || typeof decor !== "object") continue;
    if ((decor as { decorId?: unknown }).decorId === decorId) count++;
  }
  return count;
}

function getCurrentQuantity(itemId: string, itemType: ItemKind): number {
  const inventoryItems = getMyInventory().get().items;
  switch (itemType) {
    case "Tool":
      return getInventoryQuantity(inventoryItems, "toolId", itemId);
    case "Decor":
      return getInventoryQuantity(inventoryItems, "decorId", itemId) + countPlacedDecor(itemId);
    case "Seed":
      return getInventoryQuantity(inventoryItems, "seedId", itemId);
    case "Egg":
      return getInventoryQuantity(inventoryItems, "eggId", itemId);
  }
}

/**
 * True if the item has reached the per-item cap defined by MGData.
 * Items without a cap always return false.
 *
 * Note: the cap is intrinsic to the item, independent of which shop it is sold
 * in. The previous API took a `shopType` for compatibility with a hardcoded
 * table; callers no longer need to pass one.
 */
export function isItemAtMaxQuantity(itemId: string): boolean {
  const limit = getItemLimit(itemId);
  if (!limit) return false;
  return getCurrentQuantity(itemId, limit.itemType) >= limit.maxQuantity;
}

/**
 * Walk tracked items and auto-disable any that are at their cap.
 */
function checkAndDisableMaxed(): void {
  for (const tracked of getTrackedItems()) {
    if (!isItemAtMaxQuantity(tracked.itemId)) continue;
    console.log(
      `[ShopNotifier] Auto-disabling tracking for ${tracked.itemId} (max quantity reached)`
    );
    removeTrackedItem(tracked.shopType, tracked.itemId);
  }
}

let started = false;
let inventoryUnsub: Unsubscribe | null = null;

/**
 * Start monitoring inventory for capped items.
 *
 * We only listen to inventory changes:
 *   - Tool/seed/egg caps are inventory-only.
 *   - Decor caps count inventory + garden placements, but placing/removing a
 *     decor always mutates inventory in the same tick (-1/+1), so the inventory
 *     event is sufficient to re-evaluate the total.
 */
export function startLimitedItemsMonitoring(): void {
  if (started) return;
  started = true;

  inventoryUnsub = getMyInventory().subscribeStable(() => {
    checkAndDisableMaxed();
  });

  checkAndDisableMaxed();
}

export function stopLimitedItemsMonitoring(): void {
  if (!started) return;
  started = false;

  inventoryUnsub?.();
  inventoryUnsub = null;
}
