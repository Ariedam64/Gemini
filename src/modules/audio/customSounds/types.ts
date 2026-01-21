/**
 * Custom Sounds - Types and constants
 *
 * Manages a user-customizable library of notification sounds.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A custom sound in the user's library
 */
export interface CustomSound {
  /** Unique identifier (UUID) */
  id: string;

  /** User-facing name */
  name: string;

  /** Audio source (URL or data URL with base64) */
  source: string;

  /** Source type (URL or uploaded file) */
  type: 'url' | 'upload';

  /** Creation timestamp */
  createdAt: number;
}

/**
 * Storage structure for the custom sounds library
 */
export interface CustomSoundsLibrary {
  sounds: CustomSound[];
  version: number;
}

/**
 * Notification type identifiers
 */
export type NotificationType = 'shop' | 'pet' | 'weather';

/**
 * Notification play mode
 */
export type NotificationMode = 'one-shot' | 'loop';

/**
 * Configuration for a single notification type
 */
export interface NotificationConfig {
  /** Sound ID to play (references CustomSound.id) */
  soundId: string;

  /** Volume level (0-100) */
  volume: number;

  /** Play mode: one-shot (play once) or loop (play repeatedly) */
  mode: NotificationMode;
}

/**
 * All notification settings
 */
export interface NotificationSettings {
  shop: NotificationConfig;
  pet: NotificationConfig;
  weather: NotificationConfig;
}

// ─────────────────────────────────────────────────────────────────────────────
// Constants & Limits
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Validation limits for custom sounds
 */
export const LIMITS = {
  /** Maximum number of custom sounds (excluding defaults) */
  MAX_SOUNDS: 50,

  /** Maximum size per audio file in bytes (250KB) */
  MAX_SIZE_BYTES: 250 * 1024,

  /** Allowed MIME types */
  ALLOWED_TYPES: ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg'],
} as const;

/**
 * Default empty library
 */
export const DEFAULT_LIBRARY: CustomSoundsLibrary = {
  sounds: [],
  version: 1,
};

/**
 * Default notification settings
 */
export const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
  shop: {
    soundId: 'default-notification', // References the default sound
    volume: 80,
    mode: 'one-shot',
  },
  pet: {
    soundId: 'default-notification',
    volume: 80,
    mode: 'one-shot',
  },
  weather: {
    soundId: 'default-notification',
    volume: 80,
    mode: 'one-shot',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Validation Errors
// ─────────────────────────────────────────────────────────────────────────────

export class CustomSoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CustomSoundError';
  }
}

export class SoundLimitError extends CustomSoundError {
  constructor() {
    super(`Maximum number of sounds reached (${LIMITS.MAX_SOUNDS})`);
    this.name = 'SoundLimitError';
  }
}

export class SoundSizeError extends CustomSoundError {
  constructor(size: number) {
    super(`Sound size (${Math.round(size / 1024)}KB) exceeds limit (${LIMITS.MAX_SIZE_BYTES / 1024}KB)`);
    this.name = 'SoundSizeError';
  }
}

export class SoundNotFoundError extends CustomSoundError {
  constructor(id: string) {
    super(`Sound not found: ${id}`);
    this.name = 'SoundNotFoundError';
  }
}
