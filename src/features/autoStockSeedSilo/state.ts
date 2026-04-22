/**
 * AutoStockSeedSilo state management (load/save config)
 */

import { storageGet, storageSet, KEYS } from "../../utils/storage";
import type { AutoStockSeedSiloConfig } from "./types";
import { DEFAULT_CONFIG } from "./types";

export function loadConfig(): AutoStockSeedSiloConfig {
  const stored = storageGet<AutoStockSeedSiloConfig>(
    KEYS.FEATURE.AUTO_STOCK_SEED_SILO,
    DEFAULT_CONFIG
  );
  return { ...DEFAULT_CONFIG, ...stored };
}

export function saveConfig(config: AutoStockSeedSiloConfig): void {
  storageSet(KEYS.FEATURE.AUTO_STOCK_SEED_SILO, config);
}
