// src/modules/version/types.ts
// Type definitions for MGVersion module

/**
 * Options for version detection initialization
 */
export interface VersionInitOptions {
  /** Custom document to scan (defaults to page context document) */
  doc?: Document;
}

/**
 * Options for waiting for version
 */
export interface VersionWaitOptions {
  /** Timeout in milliseconds (default: 15000) */
  timeoutMs?: number;
}
