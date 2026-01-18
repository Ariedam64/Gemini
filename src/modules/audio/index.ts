// src/modules/audio/index.ts
// MGAudio - Audio management (SFX, music, ambience)

import type { PlayOptions, PlaySfxResult, ListOptions, CustomAudioPlayOptions, CustomAudioHandle } from "./types";
import { isReady } from "./state";
import { initAudioSystem } from "./logic/init";
import { playSfx } from "./logic/sfx";
import { stop, playTrack } from "./logic/tracks";
import { list, getCategories, getGroups, hasTrack, hasGroup, getTrackUrl, refreshVolumes } from "./logic/query";
import { categoryVolume } from "./logic/volume";
import { playCustomAudio, stopCustomAudio, setCustomAudioVolume, isCustomAudioPlaying, getCustomAudioHandle } from "./logic/custom";
import { CustomSounds } from "./customSounds";

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

function ensureReady(): void {
  if (!isReady()) throw new Error("MGAudio not ready yet");
}

async function play(
  category: string,
  asset: string,
  opts: PlayOptions = {}
): Promise<PlaySfxResult | HTMLAudioElement> {
  const cat = String(category || "").trim();
  const name = String(asset || "").trim();

  if (!cat || !name) throw new Error("play(category, asset) missing args");

  if (cat === "sfx") return playSfx(name, opts);
  if (cat === "music" || cat === "ambience") return playTrack(cat as "music" | "ambience", name, opts);

  throw new Error(`Unknown category: ${cat}`);
}

export const MGAudio = {
  init: initAudioSystem,
  isReady,

  play,
  stop: (category: "music" | "ambience") => {
    ensureReady();
    return stop(category);
  },

  list: (category: string, options?: ListOptions) => {
    ensureReady();
    return list(category, options);
  },

  refreshVolumes: () => {
    ensureReady();
    return refreshVolumes();
  },

  categoryVolume: (category: "sfx" | "music" | "ambience") => {
    ensureReady();
    return categoryVolume(category);
  },

  getCategories: () => {
    ensureReady();
    return getCategories();
  },

  getGroups: () => {
    ensureReady();
    return getGroups();
  },

  hasTrack: (category: string, name: string) => {
    ensureReady();
    return hasTrack(category, name);
  },

  hasGroup: (name: string) => {
    ensureReady();
    return hasGroup(name);
  },

  getTrackUrl: (category: string, name: string) => {
    ensureReady();
    return getTrackUrl(category, name);
  },

  // ─── Custom Audio (for notifications, alerts, etc.) ───
  playCustom: async (url: string, opts?: CustomAudioPlayOptions): Promise<CustomAudioHandle> => {
    ensureReady();
    return playCustomAudio(url, opts);
  },

  stopCustom: (): boolean => {
    ensureReady();
    return stopCustomAudio();
  },

  setCustomVolume: (volume: number): boolean => {
    ensureReady();
    return setCustomAudioVolume(volume);
  },

  isCustomPlaying: (): boolean => {
    ensureReady();
    return isCustomAudioPlaying();
  },

  getCustomHandle: (): CustomAudioHandle | null => {
    ensureReady();
    return getCustomAudioHandle();
  },

  // ─── Custom Sounds Library ───
  CustomSounds,
};

// ─────────────────────────────────────────────────────────────────────────────
// Type Exports
// ─────────────────────────────────────────────────────────────────────────────

export type { CustomAudioPlayOptions, CustomAudioHandle };
export type { CustomSound } from "./customSounds/types";
