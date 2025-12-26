/**
 * Wrapper for Tampermonkey GM_getValue/GM_setValue with type safety
 * Handles JSON serialization/deserialization automatically
 */

/**
 * Save a value to Tampermonkey storage
 * Serializes the value to JSON automatically
 */
export function saveToTampermonkey<T>(key: string, value: T): void {
  try {
    const serialized = JSON.stringify(value);
    GM_setValue(key, serialized);
  } catch (error) {
    console.error(`[Gemini] Failed to save key "${key}" to storage:`, error);
  }
}

/**
 * Load a value from Tampermonkey storage
 * Deserializes from JSON automatically
 * Returns defaultValue if key doesn't exist or parsing fails
 */
export function loadFromTampermonkey<T>(key: string, defaultValue: T): T {
  try {
    const serialized = GM_getValue(key);

    if (serialized === undefined || serialized === null) {
      return defaultValue;
    }

    // If it's already a string, try to parse it as JSON
    if (typeof serialized === "string") {
      return JSON.parse(serialized) as T;
    }

    // If it's already an object (shouldn't happen with proper usage), return it
    return serialized as T;
  } catch (error) {
    console.error(`[Gemini] Failed to load key "${key}" from storage, using default:`, error);
    return defaultValue;
  }
}

/**
 * Clear a value from Tampermonkey storage
 */
export function clearTampermonkeyStorage(key: string): void {
  try {
    GM_setValue(key, undefined as any);
  } catch (error) {
    console.error(`[Gemini] Failed to clear key "${key}" from storage:`, error);
  }
}

/**
 * Check if a key exists in Tampermonkey storage
 */
export function hasStorageKey(key: string): boolean {
  try {
    const value = GM_getValue(key);
    return value !== undefined && value !== null;
  } catch (error) {
    console.error(`[Gemini] Failed to check key "${key}" existence:`, error);
    return false;
  }
}
