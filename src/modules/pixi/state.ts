// src/modules/pixi/state.ts
// State management for Pixi utilities system

import type { PixiState } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// State Factory
// ─────────────────────────────────────────────────────────────────────────────

export function createPixiState(): PixiState {
  return {
    ready: false,
    app: null,
    renderer: null,
    stage: null,
    ticker: null,

    tileSets: new Map(),
    highlights: new Map(),
    watches: new Map(),

    fades: new Map(),
    fadeWatches: new Map(),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Global State
// ─────────────────────────────────────────────────────────────────────────────

export const state = createPixiState();

// ─────────────────────────────────────────────────────────────────────────────
// Getters
// ─────────────────────────────────────────────────────────────────────────────

export function getState(): PixiState {
  return state;
}

export function isReady(): boolean {
  return state.ready;
}
