// src/modules/cosmetic/types.ts
// Type definitions for cosmetic system

// ─────────────────────────────────────────────────────────────────────────────
// Options
// ─────────────────────────────────────────────────────────────────────────────

export interface CreateOptions {
  alt?: string;
  className?: string;
  width?: string | number;
  height?: string | number;
  opacity?: string | number;
  style?: Record<string, string | number>;
}

export interface ShowOptions extends CreateOptions {
  parent?: HTMLElement;
  x?: number;
  y?: number;
  center?: boolean;
  absolute?: boolean;
  scale?: number;
  rotation?: number;
  zIndex?: number;
  anchor?: "center" | "topleft";
}

// ─────────────────────────────────────────────────────────────────────────────
// Internal Types
// ─────────────────────────────────────────────────────────────────────────────

export interface NormalizedCosmetic {
  cat: string;
  asset: string;
  base: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// State
// ─────────────────────────────────────────────────────────────────────────────

export interface CosmeticState {
  ready: boolean;
  baseUrl: string | null;

  byCat: Map<string, Map<string, string>>;
  byBase: Map<string, string>;

  overlay: HTMLDivElement | null;
  live: Set<HTMLImageElement>;
  defaultParent: HTMLElement | (() => HTMLElement) | null;
}
