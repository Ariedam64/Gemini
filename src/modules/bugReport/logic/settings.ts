// src/modules/bugReport/logic/settings.ts
// The settings a bug report may carry: which features are switched on. Only
// the `enabled` flag of each feature config is read, never the rest of it
// (rules, sounds, histories), and nothing outside the feature configs.

import { FEATURE_KEYS, storageGet } from "../../../utils/storage";

/** Per-feature configs end with this; the other feature keys hold data, not settings. */
const CONFIG_SUFFIX = ":config";
/** Not registered in FEATURE_KEYS (see src/features/growthTimers/state.ts). */
const GROWTH_TIMERS_KEY = "feature:growthTimers:config";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === "object" && !Array.isArray(value);

function readEnabled(value: unknown): boolean | null {
  return isRecord(value) && typeof value.enabled === "boolean" ? value.enabled : null;
}

/**
 * Feature key to on/off, for every feature the player has a saved config
 * for. HUD tabs switched off in Settings come as `feature:config.<tab>`.
 */
export function readReportedSettings(): Record<string, boolean> {
  const out: Record<string, boolean> = {};
  const configKeys = Object.values(FEATURE_KEYS).filter(
    (key) => key.endsWith(CONFIG_SUFFIX) && key !== FEATURE_KEYS.CONFIG,
  );

  for (const key of [...configKeys, GROWTH_TIMERS_KEY]) {
    const enabled = readEnabled(storageGet<unknown>(key, null));
    if (enabled !== null) out[key] = enabled;
  }

  const tabs = storageGet<unknown>(FEATURE_KEYS.CONFIG, null);
  if (isRecord(tabs)) {
    for (const [name, value] of Object.entries(tabs)) {
      const enabled = readEnabled(value);
      if (enabled !== null) out[`${FEATURE_KEYS.CONFIG}.${name}`] = enabled;
    }
  }
  return out;
}
