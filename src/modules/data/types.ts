// src/modules/data/types.ts
// Type definitions for MGData module

/**
 * Keys for captured data from game runtime
 */
export type CapturedDataKey = "items" | "decor" | "mutations" | "eggs" | "pets" | "abilities" | "plants";

/**
 * All data keys including weather (loaded separately)
 */
export type DataKey = CapturedDataKey | "weather";

/**
 * Complete data bag holding all captured game data
 */
export type DataBag = Record<DataKey, Record<string, unknown> | null>;

/**
 * Internal capture state
 */
export interface CaptureState {
  isReady: boolean;
  isHookInstalled: boolean;
  data: DataBag;
  spritesResolved: boolean;
  spritesResolving: Promise<void> | null;
  weatherPollingTimer: ReturnType<typeof setInterval> | null;
  weatherPollAttempts: number;
  scanInterval: ReturnType<typeof setInterval> | null;
  scanAttempts: number;
}
