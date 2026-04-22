/**
 * AutoStockSeedSilo types and configuration
 */

export interface AutoStockSeedSiloConfig {
  enabled: boolean;
}

export const DEFAULT_CONFIG: AutoStockSeedSiloConfig = {
  enabled: false,
};

export const STORAGE_ID = "SeedSilo";
