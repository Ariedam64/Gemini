/**
 * @deprecated Use src/utils/storage.ts instead
 * 
 * This is a LEGACY localStorage wrapper that should NOT be used for new code.
 * Per .claude/rules/core.md, all storage should use the unified GM_* wrapper
 * at src/utils/storage.ts which provides proper Tampermonkey storage.
 * 
 * This file exists only for backward compatibility with existing code.
 */

const STORAGE_PREFIX = 'gemini:';

export function storageGet<T>(key: string, defaultValue: T): T {
    try {
        const fullKey = key.startsWith(STORAGE_PREFIX) ? key : STORAGE_PREFIX + key;
        const item = localStorage.getItem(fullKey);

        if (item === null) {
            return defaultValue;
        }

        return JSON.parse(item) as T;
    } catch (error) {
        console.error(`[Storage] Error reading key "${key}":`, error);
        return defaultValue;
    }
}

export function storageSet<T>(key: string, value: T): void {
    try {
        const fullKey = key.startsWith(STORAGE_PREFIX) ? key : STORAGE_PREFIX + key;
        const cleanKey = key.startsWith(STORAGE_PREFIX) ? key.slice(STORAGE_PREFIX.length) : key;

        localStorage.setItem(fullKey, JSON.stringify(value));

        // Dispatch local event for reactivity within the same window
        window.dispatchEvent(new CustomEvent('gemini:storage:change', {
            detail: { key: cleanKey, value }
        }));
    } catch (error) {
        console.error(`[Storage] Error writing key "${key}":`, error);
    }
}

export function storageRemove(key: string): void {
    try {
        const fullKey = key.startsWith(STORAGE_PREFIX) ? key : STORAGE_PREFIX + key;
        localStorage.removeItem(fullKey);
    } catch (error) {
        console.error(`[Storage] Error removing key "${key}":`, error);
    }
}

export function storageHas(key: string): boolean {
    const fullKey = key.startsWith(STORAGE_PREFIX) ? key : STORAGE_PREFIX + key;
    return localStorage.getItem(fullKey) !== null;
}
