/**
 * RiveLoader Discovery Logic
 *
 * Discovers .riv files from loaded game scripts
 */

import { MGEnvironment } from '../../environment';
import type { RiveFileInfo } from '../types';
import { RIVE_FILE_PATTERNS } from '../types';
import { setDiscoveredFiles, addDiscoveredFile } from '../state';

/**
 * Discover .riv files from loaded scripts
 */
export async function discoverRiveFiles(): Promise<RiveFileInfo[]> {
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

    // Search external scripts
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

    setDiscoveredFiles(uniqueFiles);

    console.log(`[MGRiveLoader] Discovered ${uniqueFiles.length} .riv files:`, uniqueFiles);

    return uniqueFiles;
}

/**
 * Find .riv file matches in script content
 */
function findRiveMatches(content: string, origin: string): RiveFileInfo[] {
    const matches: RiveFileInfo[] = [];

    // Search for all .riv patterns
    Object.entries(RIVE_FILE_PATTERNS).forEach(([category, pattern]) => {
        const regex = new RegExp(`["']([^"']*\\.riv)["']`, 'g');
        let match;

        while ((match = regex.exec(content)) !== null) {
            const path = match[1];

            // Check if matches category pattern
            if (!pattern.test(path)) continue;

            const url = path.startsWith('/') ? `${origin}${path}` : path;
            const type = categorizeRiveFile(path);

            matches.push({
                name: extractFileName(path),
                url,
                type,
            });
        }
    });

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
    return filename.replace(/-[a-zA-Z0-9]+\.riv$/, '');
}

/**
 * Find avatar .riv file specifically
 */
export async function findAvatarRiveFile(): Promise<RiveFileInfo | null> {
    const files = await discoverRiveFiles();
    const avatarFile = files.find(f => f.type === 'avatar');

    if (!avatarFile) {
        console.warn('[MGRiveLoader] Could not find avatar .riv file');
        return null;
    }

    return avatarFile;
}
