/**
 * AutoStockDecorShed feature — public façade.
 */

import { loadConfig, saveConfig } from "./state";
import { startAutoStock, stopAutoStock } from "./logic/autoStock";

let initialized = false;

function init(): void {
  if (initialized) return;
  const config = loadConfig();
  if (!config.enabled) {
    console.log("[AutoStockDecorShed] Disabled");
    return;
  }
  initialized = true;
  startAutoStock();
  console.log("[AutoStockDecorShed] Initialized");
}

function destroy(): void {
  if (!initialized) return;
  stopAutoStock();
  initialized = false;
  console.log("[AutoStockDecorShed] Destroyed");
}

function isEnabled(): boolean {
  return loadConfig().enabled;
}

function setEnabled(enabled: boolean): void {
  const config = loadConfig();
  config.enabled = enabled;
  saveConfig(config);

  if (enabled && !initialized) {
    init();
  } else if (!enabled && initialized) {
    destroy();
  }
}

export const MGAutoStockDecorShed = {
  init,
  destroy,
  isEnabled,
  setEnabled,
};

export type { AutoStockDecorShedConfig } from "./types";
