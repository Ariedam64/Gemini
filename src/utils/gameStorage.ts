// src/utils/gameStorage.ts
// Pure helpers for reading game storage structures (SeedSilo, DecorShed, PetHutch, ...).

import type { ItemStorage } from "../atoms/types";

/**
 * Get the next free index in a game storage.
 *
 * Game storages are contiguous — items fill from index 0 upward, no gaps —
 * so the count of existing items is also the index of the next empty slot.
 *
 * @param storage The storage to inspect.
 * @returns Index of the next free slot (0 if storage is empty).
 */
export function getNextFreeStorageIndex(storage: ItemStorage): number {
  return storage.items.length;
}
