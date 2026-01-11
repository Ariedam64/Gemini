// src/modules/data/logic/capture.ts
// Data capture logic via Object.* hooks

import type { CapturedDataKey } from "../types";
import { captureState, visitedObjects, originalObjectKeys } from "../state";
import { SIGNATURE_KEYS, MAX_SCAN_DEPTH } from "./constants";
import { restoreObjectHooks } from "./hooks";

/**
 * Check if an object contains all required signature keys
 */
const containsAllKeys = (objectKeys: string[], requiredKeys: readonly string[]) =>
  requiredKeys.every((key) => objectKeys.includes(key));

/**
 * Set captured data for a specific key
 */
function setCapturedData(key: CapturedDataKey, value: Record<string, unknown>): void {
  if (captureState.data[key] != null) return;
  captureState.data[key] = value;

  if (isAllDataCaptured()) {
    restoreObjectHooks();
  }
}

/**
 * Check if all data has been captured
 */
export function isAllDataCaptured(): boolean {
  return Object.values(captureState.data).every((v) => v != null);
}


/**
 * Scan an object for game data based on signature keys
 */
function scanObjectForData(obj: unknown, depth: number): void {
  if (!obj || typeof obj !== "object" || visitedObjects.has(obj)) return;
  visitedObjects.add(obj);

  let keys: string[];
  try {
    keys = originalObjectKeys(obj);
  } catch {
    return;
  }
  if (!keys || keys.length === 0) return;

  const record = obj as Record<string, unknown>;
  let sample: unknown;

  // Check for items data
  if (!captureState.data.items && containsAllKeys(keys, SIGNATURE_KEYS.items)) {
    sample = record.WateringCan;
    if (sample && typeof sample === "object" && "coinPrice" in sample && "creditPrice" in sample) {
      setCapturedData("items", record);
    }
  }

  // Check for decor data
  if (!captureState.data.decor && containsAllKeys(keys, SIGNATURE_KEYS.decor)) {
    sample = record.SmallRock;
    if (sample && typeof sample === "object" && "coinPrice" in sample && "creditPrice" in sample) {
      setCapturedData("decor", record);
    }
  }

  // Check for mutations data
  if (!captureState.data.mutations && containsAllKeys(keys, SIGNATURE_KEYS.mutations)) {
    sample = record.Gold;
    if (sample && typeof sample === "object" && "baseChance" in sample && "coinMultiplier" in sample) {
      setCapturedData("mutations", record);
    }
  }

  // Check for eggs data
  if (!captureState.data.eggs && containsAllKeys(keys, SIGNATURE_KEYS.eggs)) {
    sample = record.CommonEgg;
    if (sample && typeof sample === "object" && "faunaSpawnWeights" in sample && "secondsToHatch" in sample) {
      setCapturedData("eggs", record);
    }
  }

  // Check for pets data
  if (!captureState.data.pets && containsAllKeys(keys, SIGNATURE_KEYS.pets)) {
    sample = record.Worm;
    if (sample && typeof sample === "object" && "coinsToFullyReplenishHunger" in sample && "diet" in sample && Array.isArray((sample as Record<string, unknown>).diet)) {
      setCapturedData("pets", record);
    }
  }

  // Check for abilities data
  if (!captureState.data.abilities && containsAllKeys(keys, SIGNATURE_KEYS.abilities)) {
    sample = record.ProduceScaleBoost;
    if (sample && typeof sample === "object" && "trigger" in sample && "baseParameters" in sample) {
      setCapturedData("abilities", record);
    }
  }

  // Check for plants data
  if (!captureState.data.plants && containsAllKeys(keys, SIGNATURE_KEYS.plants)) {
    sample = record.Carrot;
    if (sample && typeof sample === "object" && "seed" in sample && "plant" in sample && "crop" in sample) {
      setCapturedData("plants", record);
    }
  }

  // Recursively scan child objects (up to max depth)
  if (depth >= MAX_SCAN_DEPTH) return;

  for (const key of keys) {
    let child: unknown;
    try {
      child = record[key];
    } catch {
      continue;
    }
    if (child && typeof child === "object") {
      scanObjectForData(child, depth + 1);
    }
  }
}

/**
 * Try to capture data from a target object (with error handling)
 */
export function tryCapture(target: unknown): void {
  try {
    scanObjectForData(target, 0);
  } catch {
    // Ignore capture errors
  }
}
