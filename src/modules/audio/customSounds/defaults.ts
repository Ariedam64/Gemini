/**
 * Custom Sounds - Default sounds
 *
 * Built-in sounds available to all users.
 */

import type { CustomSound } from './types';

/**
 * Default notification sound URL (external, reliable source)
 */
const DEFAULT_SOUND_URL = 'https://cdn.pixabay.com/audio/2025/05/31/audio_b2dfcd42bb.mp3';

/**
 * Default built-in sounds
 */
export const DEFAULT_SOUNDS: CustomSound[] = [
  {
    id: 'default-notification',
    name: 'Default',
    source: DEFAULT_SOUND_URL,
    type: 'upload',
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
