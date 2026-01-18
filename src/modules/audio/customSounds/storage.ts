/**
 * Custom Sounds - Storage layer
 *
 * Handles loading and saving the custom sounds library.
 */

import { storageGet, storageSet, KEYS } from '../../../utils/storage';
import type { CustomSound, CustomSoundsLibrary } from './types';
import { DEFAULT_LIBRARY } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// Storage API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Load the custom sounds library from storage
 */
export function loadLibrary(): CustomSoundsLibrary {
  return storageGet(KEYS.MODULE.AUDIO_CUSTOM_SOUNDS, DEFAULT_LIBRARY);
}

/**
 * Save the custom sounds library to storage
 */
export function saveLibrary(library: CustomSoundsLibrary): void {
  storageSet(KEYS.MODULE.AUDIO_CUSTOM_SOUNDS, library);
}

/**
 * Load all custom sounds
 */
export function loadSounds(): CustomSound[] {
  const library = loadLibrary();
  return library.sounds;
}

/**
 * Save all custom sounds
 */
export function saveSounds(sounds: CustomSound[]): void {
  const library: CustomSoundsLibrary = {
    sounds,
    version: 1,
  };
  saveLibrary(library);
}
