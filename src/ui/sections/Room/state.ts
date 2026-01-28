/**
 * Room Section State
 * Manages persistent state for Room section (expanded cards)
 */

import { createSectionStore, mergeExpanded } from "../core/State";

/* -------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */
export type RoomCardKey = "public";

export type RoomUI = {
  expandedCards: Record<RoomCardKey, boolean>;
};

export type RoomState = {
  ui: RoomUI;
};

/* -------------------------------------------------------------------------
 * Defaults
 * ------------------------------------------------------------------------- */
export const DEFAULT_ROOM_STATE: RoomState = {
  ui: {
    expandedCards: {
      public: true, // Public card expanded by default
    },
  },
};

/* -------------------------------------------------------------------------
 * State Controller
 * ------------------------------------------------------------------------- */
export type RoomStateController = {
  get(): RoomState;
  set(next: RoomState): void;
  save(): void;
  setUI(patch: Partial<RoomUI>): void;
  setCardExpanded(card: RoomCardKey, v: boolean): void;
  toggleCard(card: RoomCardKey): void;
};

/**
 * Initialize Room state with persistence
 */
export async function initRoomState(): Promise<RoomStateController> {
  const base = await createSectionStore<RoomState>("tab-room", {
    version: 1,
    defaults: DEFAULT_ROOM_STATE,
    sanitize: (s) => ({
      ui: {
        expandedCards: mergeExpanded(
          DEFAULT_ROOM_STATE.ui.expandedCards,
          s.ui?.expandedCards
        ),
      },
    }),
  });

  function setUI(patch: Partial<RoomUI>) {
    const cur = base.get();
    base.update({
      ui: {
        ...cur.ui,
        ...patch,
        expandedCards: mergeExpanded(cur.ui.expandedCards, patch.expandedCards),
      },
    } as any);
  }

  function setCardExpanded(card: RoomCardKey, v: boolean) {
    const cur = base.get();
    base.update({
      ui: {
        ...cur.ui,
        expandedCards: { ...cur.ui.expandedCards, [card]: !!v },
      },
    } as any);
  }

  function toggleCard(card: RoomCardKey) {
    const cur = base.get();
    setCardExpanded(card, !cur.ui.expandedCards[card]);
  }

  return {
    get: base.get,
    set: base.set,
    save: base.save,
    setUI,
    setCardExpanded,
    toggleCard,
  };
}
