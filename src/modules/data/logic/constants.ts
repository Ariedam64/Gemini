// src/modules/data/logic/constants.ts
// Constants for data capture

import type { CapturedDataKey } from "../types";

/**
 * Signature keys used to identify data objects from the game runtime
 * Each data type has specific keys that must all be present
 */
export const SIGNATURE_KEYS: Record<CapturedDataKey, readonly string[]> = {
  items: ["WateringCan", "PlanterPot", "Shovel"],
  decor: ["SmallRock", "MediumRock", "LargeRock", "WoodBench", "StoneBench", "MarbleBench"],
  mutations: ["Gold", "Rainbow", "Wet", "Chilled", "Frozen"],
  eggs: ["CommonEgg", "UncommonEgg", "RareEgg"],
  pets: ["Worm", "Snail", "Bee", "Chicken", "Bunny"],
  abilities: ["ProduceScaleBoost", "DoubleHarvest", "SeedFinderI", "CoinFinderI"],
  plants: ["Carrot", "Strawberry", "Aloe", "Blueberry", "Apple"],
} as const;

/**
 * Weather IDs expected in the game bundle
 */
export const WEATHER_IDS = ["Rain", "Frost", "Dawn", "AmberMoon"] as const;

/**
 * Pattern to match the main game bundle script
 */
export const MAIN_BUNDLE_PATTERN = /main-[^/]+\.js(\?|$)/;

/**
 * Maximum depth for recursive object scanning
 */
export const MAX_SCAN_DEPTH = 6;

/**
 * Maximum attempts for weather data polling
 */
export const MAX_WEATHER_POLL_ATTEMPTS = 200;

/**
 * Interval between weather poll attempts (ms)
 */
export const WEATHER_POLL_INTERVAL_MS = 50;

/**
 * Maximum scan attempts for pulse scanning
 */
export const MAX_SCAN_ATTEMPTS = 300;

/**
 * Interval between pulse scans (ms)
 */
export const PULSE_SCAN_INTERVAL_MS = 2000;
