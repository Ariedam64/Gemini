// src/modules/pixi/types.ts
// Type definitions for the Pixi utilities system

// ─────────────────────────────────────────────────────────────────────────────
// Pixi Types (runtime, any-typed for flexibility)
// ─────────────────────────────────────────────────────────────────────────────

export type PixiApp = any;
export type PixiRenderer = any;
export type PixiTicker = any;
export type DisplayObject = any;
export type TileView = any;
export type GameEngine = any;
export type TileObjectSystem = any;

// ─────────────────────────────────────────────────────────────────────────────
// Highlight System
// ─────────────────────────────────────────────────────────────────────────────

export interface HighlightEntry {
  root: DisplayObject;
  tick: () => void;
  baseAlpha: number | null;
  tint: { o: DisplayObject; baseTint: number }[];
}

export interface HighlightOptions {
  key?: string;
  tint?: number;
  minAlpha?: number;
  maxAlpha?: number;
  speed?: number;
  tintMix?: number;
  deepTint?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Fade System
// ─────────────────────────────────────────────────────────────────────────────

export interface FadeEntry {
  targets: { o: DisplayObject; baseAlpha: number }[];
}

export interface FadeOptions extends FilterOptions {
  alpha?: number;
  deep?: boolean;
  clear?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Filter & Mutation Options
// ─────────────────────────────────────────────────────────────────────────────

export interface FilterOptions {
  tileSet?: string;
  tiles?: Array<{ x: number; y: number } | [number, number]>;
}

export interface MutationHighlightOptions extends HighlightOptions, FilterOptions {
  clear?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// State
// ─────────────────────────────────────────────────────────────────────────────

export interface PixiState {
  ready: boolean;
  app: PixiApp | null;
  renderer: PixiRenderer | null;
  stage: any;
  ticker: PixiTicker | null;

  tileSets: Map<string, { x: number; y: number }[]>;
  highlights: Map<string, HighlightEntry>;
  watches: Map<string, ReturnType<typeof setInterval>>;

  fades: Map<string, FadeEntry>;
  fadeWatches: Map<string, ReturnType<typeof setInterval>>;
}
