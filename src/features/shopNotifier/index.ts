/**
 * Shop Notifier Feature - Public API
 */

import type { ShopNotifierConfig, TrackedItem } from "./types";
import * as State from "./state";
import * as Tracking from "./logic/tracking";

let initialized = false;

/**
 * Initialize the shop notifier feature
 */
export function init(): void {
  if (initialized) {
    console.log("[ShopNotifier] Already initialized");
    return;
  }

  if (!State.isEnabled()) {
    console.log("[ShopNotifier] Disabled");
    return;
  }

  initialized = true;
  Tracking.startTracking();
  console.log("[ShopNotifier] Initialized");
}

/**
 * Cleanup and destroy the feature
 */
export function destroy(): void {
  if (!initialized) return;

  Tracking.stopTracking();
  initialized = false;
  console.log("[ShopNotifier] Destroyed");
}

/**
 * Check if feature is initialized
 */
export function isReady(): boolean {
  return initialized;
}

/**
 * Check if feature is enabled in config
 */
export function isEnabled(): boolean {
  return State.isEnabled();
}

/**
 * Enable or disable the feature
 */
export function setEnabled(enabled: boolean): void {
  const current = State.isEnabled();

  if (current === enabled) {
    console.log(`[ShopNotifier] Already ${enabled ? "enabled" : "disabled"}`);
    return;
  }

  State.setEnabled(enabled);

  if (enabled) {
    init();
  } else {
    destroy();
  }

  console.log(`[ShopNotifier] ${enabled ? "Enabled" : "Disabled"}`);
}

/**
 * Public API
 */
export const MGShopNotifier = {
  // Lifecycle
  init,
  destroy,

  // Status
  isReady,
  isEnabled,
  setEnabled,

  // Tracking
  addTrackedItem: State.addTrackedItem,
  removeTrackedItem: State.removeTrackedItem,
  getTrackedItems: State.getTrackedItems,
  resetTrackedItems: State.resetTrackedItems,
};

export type { ShopNotifierConfig, TrackedItem };
