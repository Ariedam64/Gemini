// src/modules/environment/state.ts
// State management for environment detection

import type { Platform, EnvironmentInfo } from "./types";

let platformOverride: Platform | null = null;
let cachedEnvironment: EnvironmentInfo | null = null;

/**
 * Get platform override
 */
export function getPlatformOverride(): Platform | null {
  return platformOverride;
}

/**
 * Set platform override (desktop or mobile)
 */
export function setPlatformOverride(platform: Platform | null): void {
  platformOverride = platform;
  cachedEnvironment = null;
}

/**
 * Get cached environment info
 */
export function getCachedEnvironment(): EnvironmentInfo | null {
  return cachedEnvironment;
}

/**
 * Set cached environment info
 */
export function setCachedEnvironment(info: EnvironmentInfo): void {
  cachedEnvironment = info;
}

/**
 * Clear cached environment
 */
export function clearCache(): void {
  cachedEnvironment = null;
}
