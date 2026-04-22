// src/utils/gameStorage.ts
// Pure helpers for reading game storage structures (SeedSilo, DecorShed, PetHutch, ...).

import type { ItemStorage } from "../atoms/types";
import { getMyInventory } from "../globals";

/**
 * Find a storage by its id or decorId (whichever matches) among my current storages.
 *
 * @param id The storage id/decorId to look up (e.g. "SeedSilo", "DecorShed", "PetHutch").
 * @returns The matching storage, or null if none found.
 */
export function findStorageById(id: string): ItemStorage | null {
  const storages = getMyInventory().get().storages;
  return (
    storages.find(
      (s) =>
        (s as { id?: string }).id === id ||
        (s as { decorId?: string }).decorId === id
    ) ?? null
  );
}

/**
 * Get the next free index in a game storage.
 *
 * Game storages are contiguous — items fill from index 0 upward, no gaps —
 * so the count of existing items is also the index of the next empty slot.
 *
 * Accepts either a storage object or a storage id (string). When given a string,
 * the storage is resolved against the current `myInventory` state.
 *
 * @param storageOrId The storage object, or the storage id/decorId string.
 * @returns Index of the next free slot (0 if the storage is empty or not found).
 */
export function getNextFreeStorageIndex(storageOrId: ItemStorage | string): number {
  const storage =
    typeof storageOrId === "string" ? findStorageById(storageOrId) : storageOrId;
  if (!storage || !Array.isArray(storage.items)) return 0;
  return storage.items.length;
}
