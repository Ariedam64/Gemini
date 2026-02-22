/**
 * RiveLoader Module State
 *
 * Runtime cache for RiveFile instances and discovered .riv files
 */

import type { RiveFileCacheEntry, RiveFileInfo } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// State
// ─────────────────────────────────────────────────────────────────────────────

/** Cache of loaded RiveFile instances by URL */
const riveFileCache = new Map<string, RiveFileCacheEntry>();

/** Cache of decoded cosmetic images (shared across instances) */
const imageCache = new Map<string, unknown>(); // unknown = Rive Image type

/** Discovered .riv files */
let discoveredFiles: RiveFileInfo[] = [];

/** Module ready flag */
let ready = false;

// ─────────────────────────────────────────────────────────────────────────────
// RiveFile Cache
// ─────────────────────────────────────────────────────────────────────────────

export function getRiveFileCache(url: string): RiveFileCacheEntry | undefined {
    return riveFileCache.get(url);
}

export function setRiveFileCache(url: string, entry: RiveFileCacheEntry): void {
    riveFileCache.set(url, entry);
}

export function hasRiveFileCache(url: string): boolean {
    return riveFileCache.has(url);
}

export function clearRiveFileCache(): void {
    riveFileCache.clear();
}

// ─────────────────────────────────────────────────────────────────────────────
// Image Cache
// ─────────────────────────────────────────────────────────────────────────────

export function getCachedImage(filename: string): unknown | undefined {
    return imageCache.get(filename);
}

export function setCachedImage(filename: string, image: unknown): void {
    imageCache.set(filename, image);
}

export function hasCachedImage(filename: string): boolean {
    return imageCache.has(filename);
}

export function clearImageCache(): void {
    imageCache.clear();
}

// ─────────────────────────────────────────────────────────────────────────────
// Discovered Files
// ─────────────────────────────────────────────────────────────────────────────

export function getDiscoveredFiles(): RiveFileInfo[] {
    return [...discoveredFiles];
}

export function setDiscoveredFiles(files: RiveFileInfo[]): void {
    discoveredFiles = files;
}

export function addDiscoveredFile(file: RiveFileInfo): void {
    // Avoid duplicates
    if (!discoveredFiles.some(f => f.url === file.url)) {
        discoveredFiles.push(file);
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Ready State
// ─────────────────────────────────────────────────────────────────────────────

export function isReady(): boolean {
    return ready;
}

export function setReady(value: boolean): void {
    ready = value;
}

export function reset(): void {
    riveFileCache.clear();
    imageCache.clear();
    discoveredFiles = [];
    ready = false;
}
