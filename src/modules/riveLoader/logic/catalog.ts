/**
 * Rive catalog, loaded from the MG API.
 *
 * Replaces the previous discovery, which patched `window.fetch` globally and
 * scraped the game's scripts for `.riv` paths. Beyond the URLs, the API also
 * publishes what is inside each file — artboards, animations, and the type of
 * every state machine input. That last part cannot be guessed: half a pet's
 * inputs are triggers and half are booleans, and asking for the wrong one
 * fails silently.
 */

import { fetchJson } from '../../../utils/http';
import { MG_API } from '../../../utils/mgApi';
import type { RiveArtboard, RiveFileInfo } from '../types';
import { setDiscoveredFiles } from '../state';

/** One file as the API serves it. */
interface ApiRiveFile {
    key: string;
    aliases?: string[];
    bundle?: string;
    /** Goes through the API's CORS proxy — magicgarden.gg sends no CORS headers. */
    url: string;
    /** Versioned game URL. Not fetchable from a browser directly. */
    origin?: string;
    bytes?: number;
    loadable?: boolean;
    artboardCount?: number;
    timelineCount?: number;
    artboards?: RiveArtboard[];
}

interface ApiRiveResponse {
    count: number;
    baseUrl: string;
    generatedAt: string;
    files: Record<string, ApiRiveFile>;
}

/**
 * Category of a file, from its catalog key.
 *
 * Kept so callers that ask for `'avatar'` keep working. Anything the mod does
 * not treat specially is `'other'`.
 */
function categorize(key: string): RiveFileInfo['type'] {
    if (key === 'avatar') return 'avatar';
    if (key === 'emotes' || key === 'thought-bubble') return 'emote';
    if (key === 'currency' || key === 'giftbox') return 'ui';
    return 'other';
}

function toFileInfo(entry: ApiRiveFile): RiveFileInfo {
    return {
        name: entry.key,
        url: entry.url,
        type: categorize(entry.key),
        loadable: entry.loadable !== false,
        origin: entry.origin,
        artboards: entry.artboards ?? [],
    };
}

let loadPromise: Promise<RiveFileInfo[]> | null = null;
let loaded: RiveFileInfo[] = [];

/**
 * Load the catalog once. Concurrent callers share the same request.
 *
 * A failure is not cached, so a later call retries.
 */
export function loadRiveCatalog(): Promise<RiveFileInfo[]> {
    if (loaded.length > 0) return Promise.resolve(loaded);
    if (loadPromise) return loadPromise;

    loadPromise = fetchJson<ApiRiveResponse>(MG_API.rive)
        .then((response) => {
            loaded = Object.values(response.files ?? {}).map(toFileInfo);
            setDiscoveredFiles(loaded);
            loadPromise = null;
            console.log(`[MGRiveLoader] Catalog loaded: ${loaded.length} files`);
            return loaded;
        })
        .catch((error) => {
            loadPromise = null;
            console.error('[MGRiveLoader] Failed to load Rive catalog:', error);
            return [];
        });

    return loadPromise;
}

/**
 * Find a file by category, loading the catalog if needed.
 *
 * The old implementation waited up to 30 s for the game to fetch the file so
 * the interceptor could see it. The catalog knows every file up front, so this
 * resolves as soon as the one request completes.
 */
export async function findRiveFile(type: RiveFileInfo['type']): Promise<RiveFileInfo | null> {
    const files = await loadRiveCatalog();
    return files.find((file) => file.type === type) ?? null;
}

/** Find a file by its exact catalog key (`pets`, `decor`, `avatar`, ...). */
export async function findRiveFileByKey(key: string): Promise<RiveFileInfo | null> {
    const files = await loadRiveCatalog();
    return files.find((file) => file.name === key) ?? null;
}

/**
 * Declared type of a state machine input, or null if unknown.
 *
 * Use it before driving an input: a `trigger` is fired, a `boolean` is set,
 * and getting it backwards does nothing at all, without an error.
 */
export function getInputType(
    file: RiveFileInfo,
    artboardName: string,
    inputName: string,
): 'trigger' | 'boolean' | 'number' | null {
    const artboard = file.artboards?.find((candidate) => candidate.name === artboardName);
    if (!artboard) return null;

    for (const stateMachine of artboard.stateMachines ?? []) {
        const input = stateMachine.inputs?.find((candidate) => candidate.name === inputName);
        if (input) return input.type;
    }
    return null;
}
