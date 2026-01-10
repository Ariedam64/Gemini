import { atom } from 'jotai';
import type { QuinoaPlayerActionEvent } from '@/common/games/Quinoa/types';
import type { InventoryItem } from '@/common/games/Quinoa/user-json-schema/current';
import type { GridPosition } from '@/common/games/Quinoa/world/map';
import type { PlayerId } from '@/common/types/player';
import { playerIdAtom } from '@/store/store';
import { nonPrimitiveAtom } from '@/utils/nonPrimitiveAtom';
import { userSlotsAtom } from './baseAtoms';

export const otherUserSlotsAtom = atom((get) => {
  const userSlots = get(userSlotsAtom);
  const myId = get(playerIdAtom);
  return userSlots
    .filter((slot) => slot !== null)
    .filter((slot) => slot.playerId !== myId);
});

export const otherPlayerPositionsAtom = nonPrimitiveAtom((get) => {
  const myId = get(playerIdAtom);
  const userSlots = get(userSlotsAtom);
  const result: Record<PlayerId, GridPosition | null> = {};
  for (const slot of userSlots) {
    if (slot !== null && slot.playerId !== myId) {
      result[slot.playerId] = slot.position;
    }
  }
  return result;
});

export const otherPlayerSelectedItemsAtom = nonPrimitiveAtom((get) => {
  const otherUserSlots = get(otherUserSlotsAtom);
  const result: Record<PlayerId, InventoryItem | null> = {};
  for (const slot of otherUserSlots) {
    const inventoryItems = slot.data.inventory.items;
    const selectedIndex = slot.notAuthoritative_selectedItemIndex;
    result[slot.playerId] =
      selectedIndex !== null ? inventoryItems[selectedIndex] : null;
  }
  return result;
});

export const otherPlayerLastActionsAtom = nonPrimitiveAtom((get) => {
  const myId = get(playerIdAtom);
  const userSlots = get(userSlotsAtom);
  const result: Record<PlayerId, QuinoaPlayerActionEvent | null> = {};
  for (const slot of userSlots) {
    if (slot !== null && slot.playerId !== myId) {
      result[slot.playerId] = slot.lastActionEvent;
    }
  }
  return result;
});
