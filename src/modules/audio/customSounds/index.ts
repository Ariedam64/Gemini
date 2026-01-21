/**
 * Custom Sounds - Public API
 *
 * Manages a user-customizable library of notification sounds.
 *
 * Usage:
 *   import { MGAudio } from '@/modules/audio';
 *
 *   // Add a sound
 *   const sound = MGAudio.CustomSounds.add('Alert', 'https://example.com/alert.mp3', 'url');
 *
 *   // Play a sound
 *   await MGAudio.CustomSounds.play(sound.id, { volume: 0.5, loop: false });
 *
 *   // Stop current sound
 *   MGAudio.CustomSounds.stop();
 */

import type { CustomSound, NotificationSettings, NotificationType, NotificationConfig } from './types';
import { SoundNotFoundError, DEFAULT_NOTIFICATION_SETTINGS } from './types';
import { loadSounds, saveSounds, loadNotificationSettings, saveNotificationSettings } from './storage';
import { ensureDefaultSounds, isDefaultSound } from './defaults';
import { validateName, validateSource, checkSoundLimit } from './validation';

// ─────────────────────────────────────────────────────────────────────────────
// State
// ─────────────────────────────────────────────────────────────────────────────

let library: CustomSound[] = [];
let initialized = false;

// ─────────────────────────────────────────────────────────────────────────────
// Internal Helpers
// ─────────────────────────────────────────────────────────────────────────────

function ensureInitialized(): void {
  if (!initialized) {
    init();
  }
}

function generateId(): string {
  // Simple UUID v4 implementation
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Lifecycle
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Initialize the custom sounds library
 * Safe to call multiple times
 */
export function init(): void {
  if (initialized) return;

  // Load existing sounds
  let sounds = loadSounds();

  // Ensure default sounds are present
  sounds = ensureDefaultSounds(sounds);

  // Save if defaults were added
  if (sounds.length !== loadSounds().length) {
    saveSounds(sounds);
  }

  library = sounds;
  initialized = true;

  console.log(`[CustomSounds] Initialized with ${library.length} sounds`);
}

// ─────────────────────────────────────────────────────────────────────────────
// CRUD Operations
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get all custom sounds
 */
export function getAll(): CustomSound[] {
  ensureInitialized();
  return [...library]; // Return copy for immutability
}

/**
 * Get a sound by ID
 */
export function getById(id: string): CustomSound | undefined {
  ensureInitialized();
  return library.find((s) => s.id === id);
}

/**
 * Add a new custom sound
 *
 * @param name - User-facing name
 * @param source - URL or data URL (base64)
 * @param type - Source type ('url' or 'upload')
 * @returns The created sound
 *
 * @throws {SoundLimitError} If max sounds limit reached
 * @throws {SoundSizeError} If data URL exceeds size limit
 * @throws {Error} If name or source is invalid
 */
export function add(name: string, source: string, type: 'url' | 'upload'): CustomSound {
  ensureInitialized();

  // Validate inputs
  validateName(name);
  validateSource(source);
  checkSoundLimit(library.length);

  // Create new sound
  const newSound: CustomSound = {
    id: generateId(),
    name: name.trim(),
    source: source.trim(),
    type,
    createdAt: Date.now(),
  };

  // Add to library and save
  library.push(newSound);
  saveSounds(library);

  console.log(`[CustomSounds] Added sound: ${newSound.name} (${newSound.id})`);

  return newSound;
}

/**
 * Remove a custom sound
 *
 * @param id - Sound ID to remove
 * @returns true if sound was removed, false if not found
 *
 * @throws {Error} If trying to remove a default sound
 */
export function remove(id: string): boolean {
  ensureInitialized();

  // Prevent removing default sounds
  if (isDefaultSound(id)) {
    throw new Error('Cannot remove default sounds');
  }

  const index = library.findIndex((s) => s.id === id);
  if (index === -1) {
    return false;
  }

  const removed = library.splice(index, 1)[0];
  saveSounds(library);

  console.log(`[CustomSounds] Removed sound: ${removed.name} (${removed.id})`);

  return true;
}

/**
 * Update a custom sound
 *
 * @param id - Sound ID to update
 * @param updates - Partial updates to apply
 * @returns true if sound was updated, false if not found
 *
 * @throws {Error} If trying to update a default sound
 * @throws {Error} If updates are invalid
 */
export function update(id: string, updates: Partial<Pick<CustomSound, 'name' | 'source'>>): boolean {
  ensureInitialized();

  // Prevent updating default sounds
  if (isDefaultSound(id)) {
    throw new Error('Cannot update default sounds');
  }

  const sound = library.find((s) => s.id === id);
  if (!sound) {
    return false;
  }

  // Validate updates
  if (updates.name !== undefined) {
    validateName(updates.name);
    sound.name = updates.name.trim();
  }

  if (updates.source !== undefined) {
    validateSource(updates.source);
    sound.source = updates.source.trim();
  }

  saveSounds(library);

  console.log(`[CustomSounds] Updated sound: ${sound.name} (${sound.id})`);

  return true;
}

// ─────────────────────────────────────────────────────────────────────────────
// Playback (Delegates to MGAudio.playCustom)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Play a custom sound by ID
 *
 * This function delegates to MGAudio.playCustom(), which automatically stops
 * any currently playing custom audio (singleton behavior).
 *
 * @param id - Sound ID to play
 * @param options - Playback options (volume, loop)
 *
 * @throws {SoundNotFoundError} If sound ID not found
 */
export async function play(
  id: string,
  options: { volume?: number; loop?: boolean } = {}
): Promise<void> {
  ensureInitialized();

  const sound = getById(id);
  if (!sound) {
    throw new SoundNotFoundError(id);
  }

  // Import MGAudio at runtime to avoid circular dependency
  const { MGAudio } = await import('../index');

  try {
    await MGAudio.playCustom(sound.source, {
      volume: options.volume ?? 0.5,
      loop: options.loop ?? false,
    });

    console.log(`[CustomSounds] Playing: ${sound.name} (${sound.id})`);
  } catch (error) {
    console.error(`[CustomSounds] Failed to play ${sound.name}:`, error);
    throw error;
  }
}

/**
 * Stop the currently playing custom sound
 *
 * This function delegates to MGAudio.stopCustom().
 */
export function stop(): void {
  // Import MGAudio at runtime to avoid circular dependency
  import('../index').then(({ MGAudio }) => {
    MGAudio.stopCustom();
    console.log('[CustomSounds] Stopped current sound');
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Notification Settings
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get all notification settings
 */
export function getNotificationSettings(): NotificationSettings {
  return loadNotificationSettings();
}

/**
 * Get notification config for a specific type
 */
export function getNotificationConfig(type: NotificationType): NotificationConfig {
  const settings = loadNotificationSettings();
  return settings[type];
}

/**
 * Update notification settings for a specific type
 */
export function setNotificationConfig(type: NotificationType, config: NotificationConfig): void {
  const settings = loadNotificationSettings();
  settings[type] = config;
  saveNotificationSettings(settings);

  console.log(`[CustomSounds] Updated notification config for ${type}:`, config);
}

/**
 * Update all notification settings
 */
export function setNotificationSettings(settings: NotificationSettings): void {
  saveNotificationSettings(settings);
  console.log('[CustomSounds] Updated all notification settings');
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

export const CustomSounds = {
  // Lifecycle
  init,

  // CRUD
  getAll,
  getById,
  add,
  remove,
  update,

  // Playback
  play,
  stop,

  // Notification Settings
  getNotificationSettings,
  getNotificationConfig,
  setNotificationConfig,
  setNotificationSettings,
};
