/**
 * AutoStockSeedSilo — core algorithm.
 *
 * Scans my inventory for seeds whose species is already present in the SeedSilo
 * storage, and auto-moves each one via `putItemInStorage`.
 *
 * Port of mgafk-android `runAutoStock` (MainViewModel.kt) — no debounce, no dedup.
 */

import { getMyInventory } from "../../../globals";
import { putItemInStorage } from "../../../websocket/api";
import { STORAGE_ID } from "../types";
import type { InventoryItem, ItemStorage } from "../../../atoms/types";
import type { MyInventoryData } from "../../../globals/core/types";

type Unsub = () => void;
let unsubscribe: Unsub | null = null;

function findSilo(storages: ItemStorage[]): ItemStorage | null {
  return (
    storages.find(
      (s) =>
        (s as { id?: string }).id === STORAGE_ID ||
        (s as { decorId?: string }).decorId === STORAGE_ID
    ) ?? null
  );
}

function runScan(data: MyInventoryData): void {
  const silo = findSilo(data.storages);
  if (!silo) return;

  // Map species → index of the existing stack (server stacks by target index).
  const speciesToIndex = new Map<string, number>();
  silo.items.forEach((siloItem, index) => {
    if ("species" in siloItem && siloItem.itemType === "Seed") {
      if (!speciesToIndex.has(siloItem.species)) {
        speciesToIndex.set(siloItem.species, index);
      }
    }
  });
  if (speciesToIndex.size === 0) return;

  for (const item of data.items) {
    if (!isSeedItem(item)) continue;
    const targetIndex = speciesToIndex.get(item.species);
    if (targetIndex === undefined) continue;
    putItemInStorage(item.species, STORAGE_ID, targetIndex);
  }
}

function isSeedItem(item: InventoryItem): item is InventoryItem & { species: string; itemType: "Seed" } {
  return "species" in item && item.itemType === "Seed";
}

export function startAutoStock(): void {
  if (unsubscribe) return;

  const myInventory = getMyInventory();

  // Immediate scan against current snapshot (covers enable-while-holding-items).
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
