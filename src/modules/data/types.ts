// src/modules/data/types.ts
// Type definitions for MGData module

export type CapturedDataKey = "items" | "decor" | "mutations" | "eggs" | "pets" | "abilities" | "plants";
export type DataKey = CapturedDataKey | "weather";
export type DataBag = Record<DataKey, Record<string, unknown> | null>;

export interface CaptureState {
  data: DataBag;
  isHookInstalled: boolean;
  scanInterval: ReturnType<typeof setTimeout> | null;
  scanAttempts: number;
  weatherPollingTimer: ReturnType<typeof setTimeout> | null;
  weatherPollAttempts: number;
}
