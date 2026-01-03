// src/modules/cosmetic/state.ts
// State management for cosmetic system

import type { CosmeticState } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// State Factory
// ─────────────────────────────────────────────────────────────────────────────

export function createCosmeticState(): CosmeticState {
  return {
    ready: false,
    baseUrl: null,

    byCat: new Map(),
    byBase: new Map(),

    overlay: null,
    live: new Set(),
    defaultParent: null,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Global State
// ─────────────────────────────────────────────────────────────────────────────

export const state = createCosmeticState();

// ─────────────────────────────────────────────────────────────────────────────
// Getters
// ─────────────────────────────────────────────────────────────────────────────

export function getState(): CosmeticState {
  return state;
}

export function isReady(): boolean {
  return state.ready;
}
