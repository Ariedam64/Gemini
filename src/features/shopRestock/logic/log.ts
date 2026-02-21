/**
 * Shop Restock Feature - Debug Logging
 */

import { loadConfig } from "../state";

export function debugLog(message: string, payload?: unknown): void {
  const config = loadConfig();
  if (!config.debug.enabled) return;
  if (payload !== undefined) {
    console.log(`[ShopRestock] ${message}`, payload);
  } else {
    console.log(`[ShopRestock] ${message}`);
  }
}
