/**
 * AutoStockDecorShed state management (load/save config)
 */

import { storageGet, storageSet, KEYS } from "../../utils/storage";
import type { AutoStockDecorShedConfig } from "./types";
import { DEFAULT_CONFIG } from "./types";

export function loadConfig(): AutoStockDecorShedConfig {
  const stored = storageGet<AutoStockDecorShedConfig>(
    KEYS.FEATURE.AUTO_STOCK_DECOR_SHED,
    DEFAULT_CONFIG
  );
  return { ...DEFAULT_CONFIG, ...stored };
}

export function saveConfig(config: AutoStockDecorShedConfig): void {
  storageSet(KEYS.FEATURE.AUTO_STOCK_DECOR_SHED, config);
}
