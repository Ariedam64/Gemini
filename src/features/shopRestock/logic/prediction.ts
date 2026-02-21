/**
 * Shop Restock Feature - Prediction (Read-Only)
 * Rate-based model: appearance_rate = occurrences / total_cycles
 */

import type { ItemHistorySummary, ItemPrediction, TrackedShopType } from "../types";
import { SHOP_CYCLE_INTERVALS } from "../types";
import { getHistorySnapshot } from "./history";

const CACHE_TTL_MS = 30000;

let cache = new Map<string, { prediction: ItemPrediction; at: number }>();

function keyOf(shopType: TrackedShopType, itemId: string): string {
  return `${shopType}:${itemId}`;
}

export function clearPredictionCache(): void {
  cache.clear();
}

export function predictItem(shopType: TrackedShopType, itemId: string): ItemPrediction | null {
  const key = keyOf(shopType, itemId);
  const cached = cache.get(key);
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) return cached.prediction;

  const history = getHistorySnapshot();
  const entry = history[key];
  if (!entry) return null;

  const prediction = buildPrediction(entry);
  cache.set(key, { prediction, at: Date.now() });
  return prediction;
}

export function predictAllFavorites(): ItemPrediction[] {
  const history = getHistorySnapshot();
  const combined: ItemPrediction[] = [];
  for (const entry of Object.values(history)) {
    combined.push(buildPrediction(entry));
  }
  return combined;
}

export function predictShop(shopType: TrackedShopType): ItemPrediction[] {
  const history = getHistorySnapshot();
  const combined: ItemPrediction[] = [];
  for (const entry of Object.values(history)) {
    if (entry.shopType !== shopType) continue;
    combined.push(buildPrediction(entry));
  }
  return combined;
}

function buildPrediction(entry: ItemHistorySummary): ItemPrediction {
  const dataPoints = entry.totalOccurrences ?? 0;
  const lastSeen = entry.lastSeen ?? null;
  const rate = entry.appearanceRate ?? null;
  const shopInterval = SHOP_CYCLE_INTERVALS[entry.shopType];

  let expectedIntervalMs: number | null = null;
  let estimatedNext: number | null = null;

  if (rate !== null && rate > 0) {
    expectedIntervalMs = Math.round(shopInterval / rate);

    if (lastSeen !== null) {
      estimatedNext = entry.estimatedNextTimestamp ?? (lastSeen + expectedIntervalMs);

      // If estimated_next is in the past, project forward
      const now = Date.now();
      if (estimatedNext < now && expectedIntervalMs > 0) {
        const elapsed = now - lastSeen;
        const cycles = Math.ceil(elapsed / expectedIntervalMs);
        estimatedNext = lastSeen + cycles * expectedIntervalMs;
      }
    }
  }

  return {
    itemId: entry.itemId,
    shopType: entry.shopType,
    estimatedNextTimestamp: estimatedNext,
    averageIntervalMs: expectedIntervalMs,
    totalDataPoints: dataPoints,
    lastSeen,
    appearanceRate: rate,
    averageQuantity: entry.averageQuantity ?? null,
  };
}
