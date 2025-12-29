/**
 * Test Section State
 * Manages persistent state for Test section (expanded cards, table sorting, search queries)
 */

import { createSectionStore } from "../core/State";

/* -------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

export type TableSortState = {
  key: string | null;
  dir: "asc" | "desc" | null;
};

export type CategoryState = {
  expanded: boolean;
  sort: TableSortState;
  search: string;
};

export type TestState = {
  categories: Record<string, CategoryState>;
};

/* -------------------------------------------------------------------------
 * Defaults
 * ------------------------------------------------------------------------- */

export const DEFAULT_CATEGORY_STATE: CategoryState = {
  expanded: false,
  sort: { key: null, dir: null },
  search: "",
};

export const DEFAULT_TEST_STATE: TestState = {
  categories: {},
};

/* -------------------------------------------------------------------------
 * State Controller
 * ------------------------------------------------------------------------- */

export type TestStateController = {
  get(): TestState;
  set(next: TestState): void;
  save(): void;
  getCategoryState(category: string): CategoryState;
  setCategoryExpanded(category: string, expanded: boolean): void;
  setCategorySort(category: string, key: string | null, dir: "asc" | "desc" | null): void;
  setCategorySearch(category: string, search: string): void;
};

/**
 * Initialize Test state with persistence
 */
export async function initTestState(): Promise<TestStateController> {
  const base = await createSectionStore<TestState>("tab-test", {
    version: 2,
    defaults: DEFAULT_TEST_STATE,
    sanitize: (s) => ({
      categories: s.categories && typeof s.categories === "object" ? s.categories : {},
    }),
  });

  function getCategoryState(category: string): CategoryState {
    const state = base.get();
    return state.categories[category] || { ...DEFAULT_CATEGORY_STATE };
  }

  function setCategoryExpanded(category: string, expanded: boolean): void {
    const state = base.get();
    const current = getCategoryState(category);
    base.update({
      categories: {
        ...state.categories,
        [category]: { ...current, expanded },
      },
    });
  }

  function setCategorySort(category: string, key: string | null, dir: "asc" | "desc" | null): void {
    const state = base.get();
    const current = getCategoryState(category);
    base.update({
      categories: {
        ...state.categories,
        [category]: { ...current, sort: { key, dir } },
      },
    });
  }

  function setCategorySearch(category: string, search: string): void {
    const state = base.get();
    const current = getCategoryState(category);
    base.update({
      categories: {
        ...state.categories,
        [category]: { ...current, search },
      },
    });
  }

  return {
    get: base.get,
    set: base.set,
    save: base.save,
    getCategoryState,
    setCategoryExpanded,
    setCategorySort,
    setCategorySearch,
  };
}
