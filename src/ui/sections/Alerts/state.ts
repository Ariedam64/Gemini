/**
 * Alerts Section State
 *
 * Manages persistent state for Alerts section (card expansion, etc.)
 */

import { createSectionStore, mergeExpanded } from "../core/State";

/* -------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */
export type AlertsCardKey = "settings" | "shops" | "weather" | "pet";

export type AlertsUI = {
  expandedCards: Record<AlertsCardKey, boolean>;
};

export type AlertsState = {
  ui: AlertsUI;
};

/* -------------------------------------------------------------------------
 * Defaults
 * ------------------------------------------------------------------------- */
export const DEFAULT_ALERTS_STATE: AlertsState = {
  ui: {
    expandedCards: {
      settings: true,
      shops: false,
      weather: false,
      pet: false,
    },
  },
};

/* -------------------------------------------------------------------------
 * State Controller
 * ------------------------------------------------------------------------- */
export type AlertsStateController = {
  get(): AlertsState;
  set(next: AlertsState): void;
  save(): void;
  setUI(patch: Partial<AlertsUI>): void;
  setCardExpanded(card: AlertsCardKey, v: boolean): void;
  toggleCard(card: AlertsCardKey): void;
};

/**
 * Initialize Alerts state with persistence
 */
export async function initSectionState(): Promise<AlertsStateController> {
  const base = await createSectionStore<AlertsState>("tab-alerts", {
    version: 1,
    defaults: DEFAULT_ALERTS_STATE,
    sanitize: (s) => ({
      ui: {
        expandedCards: mergeExpanded(
          DEFAULT_ALERTS_STATE.ui.expandedCards,
          s.ui?.expandedCards
        ),
      },
    }),
  });

  function setUI(patch: Partial<AlertsUI>) {
    const cur = base.get();
    base.update({
      ui: {
        ...cur.ui,
        ...patch,
        expandedCards: mergeExpanded(cur.ui.expandedCards, patch.expandedCards),
      },
    } as any);
  }

  function setCardExpanded(card: AlertsCardKey, v: boolean) {
    const cur = base.get();
    base.update({
      ui: {
        ...cur.ui,
        expandedCards: { ...cur.ui.expandedCards, [card]: !!v },
      },
    } as any);
  }

  function toggleCard(card: AlertsCardKey) {
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
