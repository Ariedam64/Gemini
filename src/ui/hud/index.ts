/**
 * HUD module exports
 * Centralized exports for all HUD functionality
 */

// Main HUD factory
export { createHUD } from "./hud";

// Types
export type {
  Hud,
  HudState,
  HudOptions,
  HudLayoutElements,
  SectionsBuilderDeps,
  ResizeHandlerOptions,
  ResizeHandler,
  KeyboardShortcutsOptions,
  KeyboardShortcuts,
} from "./types";

// State management
export {
  HUD_STATE_KEYS,
  DEFAULT_HUD_STATE,
  loadHudState,
  saveHudStateValue,
  getHudStateValue,
  saveCompleteHudState,
} from "./state/state";

// Storage utilities
export {
  saveToTampermonkey,
  loadFromTampermonkey,
  clearTampermonkeyStorage,
  hasStorageKey,
} from "./state/storage";

// Layout creation
export { createHudLayout } from "./layout";

// Resize handler
export { createResizeHandler } from "./resize";

// Keyboard shortcuts
export { setupKeyboardShortcuts } from "./keyboard";
