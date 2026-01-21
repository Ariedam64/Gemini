/**
 * Custom Sounds - Storage layer
 *
 * Handles loading and saving the custom sounds library.
 */

import { storageGet, storageSet, KEYS } from '../../../utils/storage';
import type { CustomSound, CustomSoundsLibrary, NotificationSettings } from './types';
import { DEFAULT_LIBRARY, DEFAULT_NOTIFICATION_SETTINGS } from './types';

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

// ─────────────────────────────────────────────────────────────────────────────
// Notification Settings Storage
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Migrate old notification settings to include mode field
 */
function migrateNotificationSettings(settings: any): NotificationSettings {
  // Ensure all notification types have the mode field
  const migrated: NotificationSettings = {
    shop: {
      soundId: settings.shop?.soundId ?? DEFAULT_NOTIFICATION_SETTINGS.shop.soundId,
      volume: settings.shop?.volume ?? DEFAULT_NOTIFICATION_SETTINGS.shop.volume,
      mode: settings.shop?.mode ?? DEFAULT_NOTIFICATION_SETTINGS.shop.mode,
    },
    pet: {
      soundId: settings.pet?.soundId ?? DEFAULT_NOTIFICATION_SETTINGS.pet.soundId,
      volume: settings.pet?.volume ?? DEFAULT_NOTIFICATION_SETTINGS.pet.volume,
      mode: settings.pet?.mode ?? DEFAULT_NOTIFICATION_SETTINGS.pet.mode,
    },
    weather: {
      soundId: settings.weather?.soundId ?? DEFAULT_NOTIFICATION_SETTINGS.weather.soundId,
      volume: settings.weather?.volume ?? DEFAULT_NOTIFICATION_SETTINGS.weather.volume,
      mode: settings.weather?.mode ?? DEFAULT_NOTIFICATION_SETTINGS.weather.mode,
    },
  };

  // If migration was needed, save the updated settings
  if (migrated !== settings) {
    saveNotificationSettings(migrated);
  }

  return migrated;
}

/**
 * Load notification settings from storage
 */
export function loadNotificationSettings(): NotificationSettings {
  const settings = storageGet<any>(KEYS.MODULE.AUDIO_NOTIFICATION_SETTINGS, DEFAULT_NOTIFICATION_SETTINGS);
  return migrateNotificationSettings(settings);
}

/**
 * Save notification settings to storage
 */
export function saveNotificationSettings(settings: NotificationSettings): void {
  storageSet(KEYS.MODULE.AUDIO_NOTIFICATION_SETTINGS, settings);
}
