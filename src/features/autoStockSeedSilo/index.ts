/**
 * AutoStockSeedSilo feature — public façade.
 *
 * Toggle state is owned by the InjectionRegistry (single source of truth).
 * `init()` / `destroy()` are called by the registry when the toggle flips.
 */

import { startAutoStock, stopAutoStock } from "./logic/autoStock";
import { getRegistry } from "../../ui/inject/core/registry";

const REGISTRY_ID = "autoStockSeedSilo";
let initialized = false;

function init(): void {
  if (initialized) return;
  initialized = true;
  startAutoStock();
}

function destroy(): void {
  if (!initialized) return;
  stopAutoStock();
  initialized = false;
}

function isEnabled(): boolean {
  return getRegistry().isEnabled(REGISTRY_ID);
}

function setEnabled(enabled: boolean): void {
  getRegistry().setEnabled(REGISTRY_ID, enabled);
}

export const MGAutoStockSeedSilo = {
  init,
  destroy,
  isEnabled,
  setEnabled,
};
