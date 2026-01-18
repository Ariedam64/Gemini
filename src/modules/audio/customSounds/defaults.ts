/**
 * Custom Sounds - Default sounds
 *
 * Built-in sounds available to all users.
 */

import type { CustomSound } from './types';

/**
 * Default notification sound URL (external, reliable source)
 */
const DEFAULT_SOUND_URL = 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_1c0f653ff4.mp3';

/**
 * Default built-in sounds
 */
export const DEFAULT_SOUNDS: CustomSound[] = [
  {
    id: 'default-notification',
    name: 'Default',
    source: DEFAULT_SOUND_URL,
    type: 'url',
    createdAt: 0, // Fixed timestamp for built-in sounds
  },
];

/**
 * Initialize default sounds (call once on first init)
 */
export function ensureDefaultSounds(existingSounds: CustomSound[]): CustomSound[] {
  const existingIds = new Set(existingSounds.map((s) => s.id));
  const toAdd = DEFAULT_SOUNDS.filter((s) => !existingIds.has(s.id));

  if (toAdd.length === 0) {
    return existingSounds;
  }

  return [...existingSounds, ...toAdd];
}

/**
 * Check if a sound is a built-in default (cannot be removed)
 */
export function isDefaultSound(id: string): boolean {
  return DEFAULT_SOUNDS.some((s) => s.id === id);
}
