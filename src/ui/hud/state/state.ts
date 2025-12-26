import { HudState } from "../types";
import { saveToTampermonkey, loadFromTampermonkey } from "./storage";

/**
 * Storage keys for HUD state (namespaced to avoid conflicts)
 */
export const HUD_STATE_KEYS = {
  isOpen: "gemini.hud.isOpen",
  width: "gemini.hud.width",
  theme: "gemini.hud.theme",
  activeTab: "gemini.hud.activeTab",
} as const;

/**
 * Default HUD state values
 */
export const DEFAULT_HUD_STATE: HudState = {
  isOpen: false,
  width: 480,
  theme: "dark",
  activeTab: "tab-settings",
} as const;

/**
 * Load the complete HUD state from Tampermonkey storage
 * Returns default values for any missing keys
 */
export function loadHudState(): HudState {
  return {
    isOpen: loadFromTampermonkey(HUD_STATE_KEYS.isOpen, DEFAULT_HUD_STATE.isOpen),
    width: loadFromTampermonkey(HUD_STATE_KEYS.width, DEFAULT_HUD_STATE.width),
    theme: loadFromTampermonkey(HUD_STATE_KEYS.theme, DEFAULT_HUD_STATE.theme),
    activeTab: loadFromTampermonkey(HUD_STATE_KEYS.activeTab, DEFAULT_HUD_STATE.activeTab),
  };
}

/**
 * Save a single HUD state value to Tampermonkey storage
 * Immediately persists the change (no debouncing)
 */
export function saveHudStateValue<K extends keyof typeof HUD_STATE_KEYS>(
  key: K,
  value: HudState[K]
): void {
  saveToTampermonkey(HUD_STATE_KEYS[key], value);
}

/**
 * Get a single HUD state value from Tampermonkey storage
 */
export function getHudStateValue<K extends keyof typeof HUD_STATE_KEYS>(
  key: K,
  defaultValue: HudState[K]
): HudState[K] {
  return loadFromTampermonkey(HUD_STATE_KEYS[key], defaultValue);
}

/**
 * Save the complete HUD state to Tampermonkey storage
 */
export function saveCompleteHudState(state: HudState): void {
  saveToTampermonkey(HUD_STATE_KEYS.isOpen, state.isOpen);
  saveToTampermonkey(HUD_STATE_KEYS.width, state.width);
  saveToTampermonkey(HUD_STATE_KEYS.theme, state.theme);
  saveToTampermonkey(HUD_STATE_KEYS.activeTab, state.activeTab);
}
