/**
 * Locker Section State
 * Persists UI state for the HarvestLocker section
 */

import { createSectionStore, type SectionStateController } from "../core/State";

/* ─────────────────────────────────────────── Types ─────────────────────────────────────────── */

export type LockerState = {
  ui: LockerUI;
};

export type LockerUI = {
  harvestLockerMode: "overall" | "bySpecies";
  selectedSpecies: string | null;
  searchQuery: string;
  harvestLockerExpanded: boolean;
  eggLockerExpanded: boolean;
  decorLockerExpanded: boolean;
};

/* ─────────────────────────────────────────── Defaults ─────────────────────────────────────────── */

const DEFAULT_LOCKER_STATE: LockerState = {
  ui: {
    harvestLockerMode: "overall",
    selectedSpecies: null,
    searchQuery: "",
    harvestLockerExpanded: true,
    eggLockerExpanded: true,
    decorLockerExpanded: true,
  },
};

/* ─────────────────────────────────────────── State Controller ─────────────────────────────────────────── */

let stateController: SectionStateController<LockerState> | null = null;
let initPromise: Promise<SectionStateController<LockerState>> | null = null;

export async function initLockerState(): Promise<SectionStateController<LockerState>> {
  if (stateController) return stateController;

  if (!initPromise) {
    initPromise = createSectionStore<LockerState>("tab-locker", {
      version: 1,
      defaults: DEFAULT_LOCKER_STATE,
      sanitize: (s) => ({
        ui: {
          harvestLockerMode: s.ui?.harvestLockerMode === "bySpecies" ? "bySpecies" : "overall",
          selectedSpecies: typeof s.ui?.selectedSpecies === "string" ? s.ui.selectedSpecies : null,
          searchQuery: typeof s.ui?.searchQuery === "string" ? s.ui.searchQuery : "",
          harvestLockerExpanded: typeof s.ui?.harvestLockerExpanded === "boolean" ? s.ui.harvestLockerExpanded : true,
          eggLockerExpanded: typeof s.ui?.eggLockerExpanded === "boolean" ? s.ui.eggLockerExpanded : true,
          decorLockerExpanded: typeof s.ui?.decorLockerExpanded === "boolean" ? s.ui.decorLockerExpanded : true,
        },
      }),
    });
  }

  stateController = await initPromise;
  return stateController;
}

export function getLockerState(): SectionStateController<LockerState> {
  if (!stateController) {
    throw new Error("[LockerState] State not initialized. Call initLockerState() first.");
  }
  return stateController;
}

/* ─────────────────────────────────────────── Convenience Methods ─────────────────────────────────────────── */

export function setHarvestLockerMode(mode: "overall" | "bySpecies"): void {
  const state = getLockerState();
  state.update({
    ui: {
      ...state.get().ui,
      harvestLockerMode: mode,
    },
  });
}

export function setSelectedSpecies(species: string | null): void {
  const state = getLockerState();
  state.update({
    ui: {
      ...state.get().ui,
      selectedSpecies: species,
    },
  });
}

export function setSearchQuery(query: string): void {
  const state = getLockerState();
  state.update({
    ui: {
      ...state.get().ui,
      searchQuery: query,
    },
  });
}

export function setHarvestLockerExpanded(expanded: boolean): void {
  const state = getLockerState();
  state.update({
    ui: {
      ...state.get().ui,
      harvestLockerExpanded: expanded,
    },
  });
}

export function setEggLockerExpanded(expanded: boolean): void {
  const state = getLockerState();
  state.update({
    ui: {
      ...state.get().ui,
      eggLockerExpanded: expanded,
    },
  });
}

export function setDecorLockerExpanded(expanded: boolean): void {
  const state = getLockerState();
  state.update({
    ui: {
      ...state.get().ui,
      decorLockerExpanded: expanded,
    },
  });
}
