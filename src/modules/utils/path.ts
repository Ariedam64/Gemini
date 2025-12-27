// src/modules/utils/path.ts
// Path manipulation utilities for asset URLs

/**
 * Join a base URL with a relative path
 */
export const joinPath = (base: string, path: string): string =>
  base.replace(/\/?$/, "/") + String(path || "").replace(/^\//, "");

/**
 * Get the directory part of a path
 */
export const dirOf = (path: string): string =>
  path.lastIndexOf("/") >= 0 ? path.slice(0, path.lastIndexOf("/") + 1) : "";

/**
 * Resolve a relative path from a base file path
 */
export const relPath = (baseFile: string, path: string): string =>
  String(path || "").startsWith("/")
    ? String(path).slice(1)
    : dirOf(baseFile) + String(path || "");
