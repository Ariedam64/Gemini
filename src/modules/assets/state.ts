// src/modules/assets/state.ts
// State management for base URL cache

let baseUrl: string | null = null;
let baseUrlPromise: Promise<string> | null = null;

/**
 * Get cached base URL
 */
export function getCachedBaseUrl(): string | null {
  return baseUrl;
}

/**
 * Get pending base URL promise
 */
export function getPendingPromise(): Promise<string> | null {
  return baseUrlPromise;
}

/**
 * Set cached base URL
 */
export function setCachedBaseUrl(url: string): void {
  baseUrl = url;
}

/**
 * Set pending promise
 */
export function setPendingPromise(promise: Promise<string>): void {
  baseUrlPromise = promise;
}

/**
 * Check if base URL is cached
 */
export function hasBaseUrl(): boolean {
  return baseUrl !== null;
}
