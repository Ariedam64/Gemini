// src/modules/data/state.ts
// Runtime state for MGData module

import type { DataBag } from "./types";
import { pageWindow } from "../../utils/windowContext";

const STATE_GLOBAL_KEY = "__GEMINI_DATA_STATE__";

interface DataState {
  data: DataBag;
  ready: boolean;
}

function createInitialState(): DataState {
  return {
    data: {
      items: null,
      decor: null,
      mutations: null,
      eggs: null,
      pets: null,
      abilities: null,
      plants: null,
      weather: null,
    },
    ready: false,
  };
}

// In development, persist state on pageWindow to survive HMR reloads
export const state: DataState =
  (import.meta.env.DEV && (pageWindow as Record<string, unknown>)[STATE_GLOBAL_KEY] as DataState) || createInitialState();

if (import.meta.env.DEV && !(pageWindow as Record<string, unknown>)[STATE_GLOBAL_KEY]) {
  (pageWindow as Record<string, unknown>)[STATE_GLOBAL_KEY] = state;
}
