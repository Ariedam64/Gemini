// src/modules/audio/types.ts
// Type definitions for the audio system

// ─────────────────────────────────────────────────────────────────────────────
// Audio Categories
// ─────────────────────────────────────────────────────────────────────────────

export type AudioCategory = "sfx" | "music" | "ambience";
export type TrackCategory = "music" | "ambience";

// ─────────────────────────────────────────────────────────────────────────────
// SFX Types
// ─────────────────────────────────────────────────────────────────────────────

export interface SfxSegment {
  start: number;
  end: number;
}

export interface SfxAtlas {
  [name: string]: SfxSegment;
}

export interface PlaySfxResult {
  name: string;
  source: AudioBufferSourceNode;
  start: number;
  end: number;
  duration: number;
  volume: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Play Options
// ─────────────────────────────────────────────────────────────────────────────

export interface PlayOptions {
  volume?: number;
  loop?: boolean;
}

export interface ListOptions {
  groups?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// State
// ─────────────────────────────────────────────────────────────────────────────

export interface AudioState {
  ready: boolean;
  baseUrl: string | null;

  urls: {
    ambience: Map<string, string>;
    music: Map<string, string>;
  };

  sfx: {
    mp3Url: string | null;
    atlasUrl: string | null;
    atlas: SfxAtlas | null;
    groups: Map<string, string[]>;
    buffer: AudioBuffer | null;
  };

  tracks: {
    ambience: HTMLAudioElement | null;
    music: HTMLAudioElement | null;
  };

  ctx: AudioContext | null;
}
