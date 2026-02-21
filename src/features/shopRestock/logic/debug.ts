/**
 * Shop Restock Feature - Debug
 */

import { loadConfig } from "../state";
import { EVENTS } from "../types";
import { debugLog } from "./log";

let started = false;
const onSimulate = (event: Event) => {
  const config = loadConfig();
  if (!config.debug.enabled) return;
  debugLog("Debug simulate received (no-op in read-only mode)", (event as CustomEvent).detail);
};

export function startDebug(): void {
  if (started) return;
  started = true;
  debugLog("Debug simulate listener attached");
  window.addEventListener(EVENTS.DEBUG_SIMULATE, onSimulate as EventListener);
}

export function stopDebug(): void {
  if (!started) return;
  started = false;
  debugLog("Debug simulate listener removed");
  window.removeEventListener(EVENTS.DEBUG_SIMULATE, onSimulate as EventListener);
}
