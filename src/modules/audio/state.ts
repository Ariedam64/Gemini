// src/modules/audio/state.ts
// State management for audio system

import type { AudioState } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// State Factory
// ─────────────────────────────────────────────────────────────────────────────

export function createAudioState(): AudioState {
  return {
    ready: false,
    baseUrl: null,

    urls: {
      ambience: new Map(),
      music: new Map(),
    },

    sfx: {
      mp3Url: null,
      atlasUrl: null,
      atlas: null,
      groups: new Map(),
      buffer: null,
    },

    tracks: {
      ambience: null,
      music: null,
    },

    ctx: null,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Global State
// ─────────────────────────────────────────────────────────────────────────────

export const state = createAudioState();

// ─────────────────────────────────────────────────────────────────────────────
// Getters
// ─────────────────────────────────────────────────────────────────────────────

export function getState(): AudioState {
  return state;
}

export function isReady(): boolean {
  return state.ready;
}
