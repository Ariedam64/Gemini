/**
 * Core types for DOM injections system
 * Per ui/inject.md: shared interfaces for all injections
 */

/**
 * Base interface all QOL injections must implement
 * Per ui/inject.md: each injection must export init(), destroy(), isEnabled()
 */
export interface InjectionAPI {
  // Lifecycle management
  init(): void;
  destroy(): void;
  isEnabled(): boolean;
}

/**
 * Configuration for a registered injection
 */
export interface InjectionConfig {
  id: string;                    // Unique identifier (e.g., 'cropValueIndicator')
  name: string;                  // Display name (e.g., 'Crop Price')
  description: string;           // User-facing description
  injection: InjectionAPI;       // The injection implementation
  storageKey: string;            // Where config is persisted
  defaultEnabled?: boolean;      // Default state
}

/**
 * Cleanup tracking for all subscriptions/listeners/intervals
 * Per ui/inject.md pattern
 */
export interface CleanupTracker {
  add(fn: () => void): void;
  run(): void;
  clear(): void;
}
