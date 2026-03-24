// src/modules/data/logic/accessors.ts
// Data accessor functions (get, getAll, has, waitFor)

import type { DataKey, DataBag } from "../types";
import { state } from "../state";

const DEFAULT_WAIT_TIMEOUT_MS = 10000;
const WAIT_POLL_INTERVAL_MS = 50;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Get data for a specific key
 */
export function getData<K extends DataKey>(key: K): DataBag[K] {
  return state.data[key];
}

/**
 * Get all data
 */
export function getAllData(): DataBag {
  return { ...state.data };
}

/**
 * Check if data exists for a specific key
 */
export function hasData(key: DataKey): boolean {
  return state.data[key] != null;
}

/**
 * Wait for specific data to be available
 * (resolves immediately if data is already loaded)
 */
export async function waitForData(
  key: DataKey,
  timeoutMs: number = DEFAULT_WAIT_TIMEOUT_MS,
): Promise<Record<string, unknown>> {
  const value = state.data[key];
  if (value != null) return value;

  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    await sleep(WAIT_POLL_INTERVAL_MS);
    const current = state.data[key];
    if (current != null) return current;
  }
  throw new Error(`MGData.waitFor: timeout waiting for "${key}"`);
}

/**
 * Wait for any data to be available (at least one key)
 */
export async function waitForAnyData(
  timeoutMs: number = DEFAULT_WAIT_TIMEOUT_MS,
): Promise<DataBag> {
  if (state.ready) return { ...state.data };

  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (state.ready) return { ...state.data };
    await sleep(WAIT_POLL_INTERVAL_MS);
  }
  throw new Error("MGData.waitForAnyData: timeout");
}
