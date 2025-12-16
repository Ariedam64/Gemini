// src/store/settings/settingsState.ts
import { createSectionStore, mergeExpanded } from "..";

/* -------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */
export type SettingsCardKey = "style" | "license" | "system";

export type SettingUI = {
  expandedCards: Record<SettingsCardKey, boolean>;
};

export type SettingState = { ui: SettingUI };

/* -------------------------------------------------------------------------
 * Defaults
 * ------------------------------------------------------------------------- */
export const defaultSettingState: SettingState = {
  ui: { expandedCards: { style: false, license: false, system: false } },
};

/* -------------------------------------------------------------------------
 * Storage
 * ------------------------------------------------------------------------- */
const SECTION_ID = "tab-settings";

/* -------------------------------------------------------------------------
 * API
 * ------------------------------------------------------------------------- */
export type SettingsStateController = {
  get(): SettingState;
  set(next: SettingState): void;
  save(): void;

  // UI helpers
  setUI(patch: Partial<SettingUI>): void;
  setCardExpanded(card: SettingsCardKey, v: boolean): void;
  toggleCard(card: SettingsCardKey): void;
};

export async function initSettingsState(): Promise<SettingsStateController> {
  const base = await createSectionStore<SettingState>(SECTION_ID, {
    version: 1,
    defaults: defaultSettingState,
    sanitize: (s) => ({
      ui: {
        expandedCards: mergeExpanded(defaultSettingState.ui.expandedCards, s.ui?.expandedCards),
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
