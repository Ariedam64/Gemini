// src/modules/version/state.ts
// State management for game version cache

let gameVersion: string | null = null;

/**
 * Get cached game version
 */
export function getCachedVersion(): string | null {
  return gameVersion;
}

/**
 * Set cached game version
 */
export function setCachedVersion(version: string): void {
  gameVersion = version;
}

/**
 * Check if version is cached
 */
export function hasVersion(): boolean {
  return gameVersion !== null;
}
