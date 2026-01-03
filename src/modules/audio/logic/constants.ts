// src/modules/audio/logic/constants.ts
// Audio system constants

import type { AudioCategory } from "../types";

// ─────────────────────────────────────────────────────────────────────────────
// Volume Settings
// ─────────────────────────────────────────────────────────────────────────────

// Volume keys in localStorage - These are GAME volume settings, not Gemini storage
// They are read from the game's localStorage (not our GM_* storage) intentionally
// per core.md exception: reading game state is allowed
export const VOLUME_KEYS: Record<AudioCategory, string> = {
  sfx: "soundEffectsVolume",
  music: "musicVolume",
  ambience: "ambienceVolume",
};

// Legacy keys kept for backward compatibility
export const LEGACY_VOLUME_KEYS: Record<AudioCategory, string> = {
  sfx: "soundEffectsVolumeAtom",
  music: "musicVolumeAtom",
  ambience: "ambienceVolumeAtom",
};

export const VMIN = 0.001;
export const VMAX = 0.2;
