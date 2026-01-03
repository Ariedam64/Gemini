// src/modules/data/state.ts
// State management for MGData module

import { pageWindow } from "../../utils/windowContext";
import type { CaptureState } from "./types";

/**
 * WeakSet to track visited objects during scanning
 */
export const visitedObjects = new WeakSet<object>();

/**
 * Global state key for HMR persistence in dev mode
 */
const STATE_GLOBAL_KEY = "__GEMINI_DATA_STATE__";

/**
 * Initialize capture state with defaults
 */
function createInitialState(): CaptureState {
  return {
    isReady: false,
    isHookInstalled: false,
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
    spritesResolved: false,
    spritesResolving: null,
    weatherPollingTimer: null,
    weatherPollAttempts: 0,
    scanInterval: null,
    scanAttempts: 0,
  };
}

/**
 * Get or create capture state (with HMR support in dev)
 */
export const captureState: CaptureState =
  (import.meta.env.DEV && (pageWindow as any)[STATE_GLOBAL_KEY]) || createInitialState();

/**
 * Persist state on pageWindow in dev mode for HMR survival
 */
if (import.meta.env.DEV) {
  (pageWindow as any)[STATE_GLOBAL_KEY] = captureState;
}

/**
 * Get native Object from page context
 */
const pageContext = pageWindow as Window & typeof globalThis;
export const NativeObject = pageContext.Object ?? Object;

/**
 * Store original Object methods before hooking
 */
export const originalObjectKeys = NativeObject.keys;
export const originalObjectValues = NativeObject.values;
export const originalObjectEntries = NativeObject.entries;
