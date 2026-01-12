/**
 * Settings Section State
 * Manages persistent state for Settings section (expanded cards, etc.)
 */

import { createSectionStore, mergeExpanded } from "../core/State";

/* -------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */
export type SettingsCardKey = "style" | "hudSections" | "enhancements" | "system";

export type SettingUI = {
  expandedCards: Record<SettingsCardKey, boolean>;
};

export type SettingState = {
  ui: SettingUI;
};

/* -------------------------------------------------------------------------
 * Defaults
 * ------------------------------------------------------------------------- */
export const DEFAULT_SETTINGS_STATE: SettingState = {
  ui: {
    expandedCards: {
      style: false,
      hudSections: false,
      enhancements: false,
      system: false,
    },
  },
};

/* -------------------------------------------------------------------------
 * State Controller
 * ------------------------------------------------------------------------- */
export type SettingsStateController = {
  get(): SettingState;
  set(next: SettingState): void;
  save(): void;
  setUI(patch: Partial<SettingUI>): void;
  setCardExpanded(card: SettingsCardKey, v: boolean): void;
  toggleCard(card: SettingsCardKey): void;
};

/**
 * Initialize Settings state with persistence
 */
export async function initSettingsState(): Promise<SettingsStateController> {
  const base = await createSectionStore<SettingState>("tab-settings", {
    version: 1,
    defaults: DEFAULT_SETTINGS_STATE,
    sanitize: (s) => ({
      ui: {
        expandedCards: mergeExpanded(
          DEFAULT_SETTINGS_STATE.ui.expandedCards,
          s.ui?.expandedCards
        ),
      },
    }),
  });

  function setUI(patch: Partial<SettingUI>) {
    const cur = base.get();
    base.update({
      ui: {
        ...cur.ui,
        ...patch,
        expandedCards: mergeExpanded(cur.ui.expandedCards, patch.expandedCards),
      },
    } as any);
  }

  function setCardExpanded(card: SettingsCardKey, v: boolean) {
    const cur = base.get();
    base.update({
      ui: {
        ...cur.ui,
        expandedCards: { ...cur.ui.expandedCards, [card]: !!v },
      },
    } as any);
  }

  function toggleCard(card: SettingsCardKey) {
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
