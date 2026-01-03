// src/modules/data/logic/accessors.ts
// Data accessor functions (get, getAll, has, wait)

import type { DataKey, DataBag } from "../types";
import { captureState } from "../state";

const DEFAULT_WAIT_TIMEOUT_MS = 10000;
const WAIT_POLL_INTERVAL_MS = 50;

/**
 * Sleep helper
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Get captured data for a specific key
 */
export function getData<K extends DataKey>(key: K): DataBag[K] {
  return captureState.data[key];
}

/**
 * Get all captured data
 */
export function getAllData(): DataBag {
  return { ...captureState.data };
}

/**
 * Check if data exists for a specific key
 */
export function hasData(key: DataKey): boolean {
  return captureState.data[key] != null;
}

/**
 * Wait for specific data to be captured
 */
export async function waitForData(
  key: DataKey,
  timeoutMs: number = DEFAULT_WAIT_TIMEOUT_MS,
  intervalMs: number = WAIT_POLL_INTERVAL_MS
): Promise<Record<string, unknown>> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const value = captureState.data[key];
    if (value != null) return value;
    await sleep(intervalMs);
  }
  throw new Error(`MGData.waitFor: timeout waiting for "${key}"`);
}

/**
 * Wait for any data to be captured (at least one key)
 */
export async function waitForAnyData(
  timeoutMs: number = DEFAULT_WAIT_TIMEOUT_MS,
  intervalMs: number = WAIT_POLL_INTERVAL_MS
): Promise<DataBag> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (Object.values(captureState.data).some((v) => v != null)) {
      return { ...captureState.data };
    }
    await sleep(intervalMs);
  }
  throw new Error("MGData.waitForAnyData: timeout");
}
