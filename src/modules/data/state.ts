// src/modules/data/state.ts
// Runtime state for MGData module

import type { CaptureState } from "./types";
import { pageWindow } from "../../utils/windowContext";

const pageContext = pageWindow as Window & typeof globalThis;

export const NativeObject = pageContext.Object ?? Object;
export const originalObjectKeys = NativeObject.keys;
export const originalObjectValues = NativeObject.values;
export const originalObjectEntries = NativeObject.entries;

export const visitedObjects = new WeakSet<object>();

const STATE_GLOBAL_KEY = "__GEMINI_DATA_STATE__";

function createInitialState(): CaptureState {
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
    isHookInstalled: false,
    scanInterval: null,
    scanAttempts: 0,
    weatherPollingTimer: null,
    weatherPollAttempts: 0,
    colorPollingTimer: null,
    colorPollAttempts: 0,
  };
}

// In development, persist state on pageWindow to survive HMR reloads
export const captureState: CaptureState =
  (import.meta.env.DEV && (pageWindow as any)[STATE_GLOBAL_KEY]) || createInitialState();

if (import.meta.env.DEV && !(pageWindow as any)[STATE_GLOBAL_KEY]) {
  (pageWindow as any)[STATE_GLOBAL_KEY] = captureState;
}
