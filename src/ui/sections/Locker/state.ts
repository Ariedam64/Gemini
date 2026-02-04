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
};

/* ─────────────────────────────────────────── Defaults ─────────────────────────────────────────── */

const DEFAULT_LOCKER_STATE: LockerState = {
  ui: {
    harvestLockerMode: "overall",
    selectedSpecies: null,
    searchQuery: "",
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
