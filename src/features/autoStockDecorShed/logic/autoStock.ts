/**
 * AutoStockDecorShed — core algorithm.
 *
 * Scans my inventory for decors whose decorId is already present in the
 * DecorShed storage, and auto-moves each one via `putItemInStorage`.
 */

import { getMyInventory } from "../../../globals";
import { putItemInStorage } from "../../../websocket/api";
import { getNextFreeStorageIndex } from "../../../utils/gameStorage";
import { STORAGE_ID } from "../types";
import type { InventoryItem, ItemStorage } from "../../../atoms/types";
import type { MyInventoryData } from "../../../globals/core/types";

type Unsub = () => void;
let unsubscribe: Unsub | null = null;

function findShed(storages: ItemStorage[]): ItemStorage | null {
  return (
    storages.find(
      (s) =>
        (s as { id?: string }).id === STORAGE_ID ||
        (s as { decorId?: string }).decorId === STORAGE_ID
    ) ?? null
  );
}

function runScan(data: MyInventoryData): void {
  const shed = findShed(data.storages);
  if (!shed) return;

  const presentDecors = new Set<string>();
  for (const item of shed.items ?? []) {
    if ("decorId" in item && item.itemType === "Decor") {
      presentDecors.add(item.decorId);
    }
  }
  if (presentDecors.size === 0) return;

  const toIndex = getNextFreeStorageIndex(shed);

  for (const item of data.items) {
    if (!isDecorItem(item)) continue;
    if (!presentDecors.has(item.decorId)) continue;
    putItemInStorage(item.decorId, STORAGE_ID, toIndex);
  }
}

function isDecorItem(item: InventoryItem): item is InventoryItem & { decorId: string; itemType: "Decor" } {
  return "decorId" in item && item.itemType === "Decor";
}

export function startAutoStock(): void {
  if (unsubscribe) return;

  const myInventory = getMyInventory();

  runScan(myInventory.get());

  unsubscribe = myInventory.subscribeStable((data) => {
    runScan(data);
  });
}

export function stopAutoStock(): void {
  if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
  }
}
