/**
 * RiveLoader Discovery Logic
 *
 * Discovers .riv files by intercepting fetch requests and parsing game scripts.
 * Uses a dual strategy: fetch interception (reliable, catches runtime loads)
 * + script parsing (catches statically referenced URLs).
 */

import { MGEnvironment } from '../../environment';
import type { RiveFileInfo } from '../types';
import { RIVE_FILE_PATTERNS } from '../types';
import { setDiscoveredFiles, addDiscoveredFile, getDiscoveredFiles } from '../state';

/** Pending resolve callbacks waiting for a specific .riv type */
type RiveTypeWaiter = {
    type: RiveFileInfo['type'];
    resolve: (file: RiveFileInfo) => void;
    timer: ReturnType<typeof setTimeout>;
};

const waiters: RiveTypeWaiter[] = [];
let interceptCleanup: (() => void) | null = null;

// ─────────────────────────────────────────────────────────────────────────────
// Fetch Interception
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Install a fetch interceptor that captures .riv URLs as the game loads them.
 * Safe to call multiple times (idempotent).
 */
export function installFetchInterceptor(): () => void {
    if (interceptCleanup) return interceptCleanup;

    const originalFetch = window.fetch;

    window.fetch = function patchedFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
        const url = extractUrl(input);
        if (url && url.endsWith('.riv')) {
            onRivUrlDetected(url);
        }
        return originalFetch.call(this, input, init);
    };

    interceptCleanup = () => {
        // Only restore if still our patched version
        if (window.fetch === patchedFetch) {
            window.fetch = originalFetch;
        }
        interceptCleanup = null;
    };

    function patchedFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
        const url = extractUrl(input);
        if (url && url.endsWith('.riv')) {
            onRivUrlDetected(url);
        }
        return originalFetch.call(window, input, init);
    }

    // Replace again with the named function so identity check works
    window.fetch = patchedFetch;
    interceptCleanup = () => {
        if (window.fetch === patchedFetch) {
            window.fetch = originalFetch;
        }
        interceptCleanup = null;
    };

    return interceptCleanup;
}

/**
 * Remove the fetch interceptor
 */
export function removeFetchInterceptor(): void {
    interceptCleanup?.();
}

/**
 * Called when a .riv URL is detected from fetch interception
 */
function onRivUrlDetected(rawUrl: string): void {
    const env = MGEnvironment.detect();
    const url = rawUrl.startsWith('/') ? `${env.origin}${rawUrl}` : rawUrl;
    const type = categorizeRiveFile(rawUrl);
    const name = extractFileName(rawUrl);

    const file: RiveFileInfo = { name, url, type };
    addDiscoveredFile(file);

    console.log(`[MGRiveLoader] Intercepted .riv fetch: ${name} (${type})`, url);

    // Resolve any waiters for this type
    for (let idx = waiters.length - 1; idx >= 0; idx--) {
        const waiter = waiters[idx];
        if (waiter.type === type) {
            clearTimeout(waiter.timer);
            waiter.resolve(file);
            waiters.splice(idx, 1);
        }
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Script Parsing (fallback)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Discover .riv files by parsing game scripts.
 * Searches both inline and external same-origin scripts.
 */
export async function discoverFromScripts(): Promise<RiveFileInfo[]> {
    const env = MGEnvironment.detect();
    const origin = env.origin;
    const scripts = Array.from(document.scripts);
    const foundFiles: RiveFileInfo[] = [];

    // Search inline scripts
    for (const script of scripts) {
        const content = script.textContent || '';
        const matches = findRiveMatches(content, origin);
        foundFiles.push(...matches);
    }

    // Search external scripts (same-origin only)
    for (const script of scripts) {
        if (!script.src) continue;

        try {
            const scriptUrl = new URL(script.src);
            if (scriptUrl.origin !== origin) continue;

            const response = await fetch(script.src);
            if (!response.ok) continue;

            const content = await response.text();
            const matches = findRiveMatches(content, origin);
            foundFiles.push(...matches);
        } catch (err) {
            console.debug('[MGRiveLoader] Failed to fetch script:', script.src, err);
        }
    }

    // Deduplicate by URL
    const uniqueFiles = Array.from(
        new Map(foundFiles.map(f => [f.url, f])).values()
    );

    // Merge with any already-intercepted files
    for (const file of uniqueFiles) {
        addDiscoveredFile(file);
    }

    return getDiscoveredFiles();
}

/**
 * Main discovery: install interceptor + parse scripts.
 * Returns all discovered .riv files.
 */
export async function discoverRiveFiles(): Promise<RiveFileInfo[]> {
    // Install interceptor first (catches future fetches)
    installFetchInterceptor();

    // Then parse existing scripts (catches already-referenced URLs)
    const files = await discoverFromScripts();

    setDiscoveredFiles(files);
    console.log(`[MGRiveLoader] Discovered ${files.length} .riv files:`, files);

    return files;
}

// ─────────────────────────────────────────────────────────────────────────────
// Waiting for specific types
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Wait for a .riv file of a given type to be discovered.
 * Returns immediately if already found, otherwise waits for interception.
 *
 * @param type - The type to wait for (e.g. 'avatar')
 * @param timeoutMs - Max time to wait (default 30s)
 */
export function waitForRiveFile(
    type: RiveFileInfo['type'],
    timeoutMs = 30_000,
): Promise<RiveFileInfo | null> {
    // Check if already discovered
    const existing = getDiscoveredFiles().find(f => f.type === type);
    if (existing) return Promise.resolve(existing);

    return new Promise<RiveFileInfo | null>((resolve) => {
        const timer = setTimeout(() => {
            // Remove from waiters on timeout
            const idx = waiters.findIndex(w => w.resolve === resolve);
            if (idx !== -1) waiters.splice(idx, 1);
            console.warn(`[MGRiveLoader] Timed out waiting for ${type} .riv file`);
            resolve(null);
        }, timeoutMs);

        waiters.push({ type, resolve: resolve as (file: RiveFileInfo) => void, timer });
    });
}

/**
 * Find avatar .riv file.
 * First checks already-discovered files, then waits for interception.
 */
export async function findAvatarRiveFile(): Promise<RiveFileInfo | null> {
    // Check already discovered
    const existing = getDiscoveredFiles().find(f => f.type === 'avatar');
    if (existing) return existing;

    // Wait for it to be intercepted (game loads it on demand)
    console.log('[MGRiveLoader] Avatar .riv not found yet, waiting for game to load it...');
    const file = await waitForRiveFile('avatar', 30_000);

    if (!file) {
        console.warn('[MGRiveLoader] Could not find avatar .riv file');
    }

    return file;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Extract URL string from various fetch input types
 */
function extractUrl(input: RequestInfo | URL): string | null {
    if (typeof input === 'string') return input;
    if (input instanceof URL) return input.href;
    if (input instanceof Request) return input.url;
    return null;
}

/**
 * Find .riv file matches in script content.
 * Handles double quotes, single quotes, AND backticks (Vite template literals).
 */
function findRiveMatches(content: string, origin: string): RiveFileInfo[] {
    const matches: RiveFileInfo[] = [];
    const seen = new Set<string>();

    // Match .riv paths inside any quote type: " ' `
    const regex = /["'`]([^"'`]*\.riv)["'`]/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
        const path = match[1];

        // Must match at least one known pattern
        const type = categorizeRiveFile(path);
        if (type === 'other' && !path.endsWith('.riv')) continue;

        // Deduplicate within this content
        if (seen.has(path)) continue;
        seen.add(path);

        const url = path.startsWith('/') ? `${origin}${path}` : path;

        matches.push({
            name: extractFileName(path),
            url,
            type,
        });
    }

    return matches;
}

/**
 * Categorize .riv file by path
 */
function categorizeRiveFile(path: string): RiveFileInfo['type'] {
    if (RIVE_FILE_PATTERNS.AVATAR.test(path)) return 'avatar';
    if (RIVE_FILE_PATTERNS.EMOTES.test(path)) return 'emote';
    if (RIVE_FILE_PATTERNS.UI.test(path)) return 'ui';
    return 'other';
}

/**
 * Extract filename from path
 */
function extractFileName(path: string): string {
    const parts = path.split('/');
    const filename = parts[parts.length - 1];
    // Remove hash: avatarelements-BBW1CN3D.riv → avatarelements
    return filename.replace(/-[a-zA-Z0-9_]+\.riv$/, '');
}
