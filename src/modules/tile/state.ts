// src/modules/tile/state.ts
// State management for tile system

import type { TileState } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// State Factory
// ─────────────────────────────────────────────────────────────────────────────

export function createTileState(): TileState {
  return {
    ready: false,
    xform: null,
    xformAt: 0,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Global State
// ─────────────────────────────────────────────────────────────────────────────

export const state = createTileState();

// ─────────────────────────────────────────────────────────────────────────────
// Getters
// ─────────────────────────────────────────────────────────────────────────────

export function getState(): TileState {
  return state;
}

export function isReady(): boolean {
  return state.ready;
}
