/**
 * AutoStockDecorShed feature — public façade.
 *
 * Toggle state is owned by the InjectionRegistry (single source of truth).
 */

import { startAutoStock, stopAutoStock } from "./logic/autoStock";
import { getRegistry } from "../../ui/inject/core/registry";

const REGISTRY_ID = "autoStockDecorShed";
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

export const MGAutoStockDecorShed = {
  init,
  destroy,
  isEnabled,
  setEnabled,
};
