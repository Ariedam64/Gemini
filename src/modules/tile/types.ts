// src/modules/tile/types.ts
// Type definitions for the tile system

// ─────────────────────────────────────────────────────────────────────────────
// Game Types (runtime, any-typed for flexibility)
// ─────────────────────────────────────────────────────────────────────────────

export type GameEngine = any;
export type TileObjectSystem = any;
export type TileView = any;
export type TileObject = any;

// ─────────────────────────────────────────────────────────────────────────────
// Tile Information
// ─────────────────────────────────────────────────────────────────────────────

export interface TileInfo {
  tx: number;
  ty: number;
  gidx: number | null;
  tileView: TileView | null;
  tileObject?: TileObject;
}

export interface ApplyResult {
  ok: boolean;
  tx: number;
  ty: number;
  gidx: number;
  before: TileObject;
  after: TileObject;
}

// ─────────────────────────────────────────────────────────────────────────────
// Coordinate Transform
// ─────────────────────────────────────────────────────────────────────────────

export interface PointToTileResult {
  tx: number;
  ty: number;
  fx: number;
  fy: number;
  x: number;
  y: number;
  gidx: number | null;
}

export interface TileTransform {
  ok: boolean;
  cols: number;
  rows: number | null;
  vx: { x: number; y: number };
  vy: { x: number; y: number };
  inv: { a: number; b: number; c: number; d: number };
  anchorMode: "center" | "topleft";
  originCenter: { x: number; y: number };
}

// ─────────────────────────────────────────────────────────────────────────────
// Patch Types
// ─────────────────────────────────────────────────────────────────────────────

export interface PlantSlotPatch {
  startTime?: number;
  endTime?: number;
  targetScale?: number;
  mutations?: string[];
}

export interface PlantPatch {
  plantedAt?: number;
  maturedAt?: number;
  species?: string;
  slotIdx?: number;
  slotPatch?: PlantSlotPatch;
  slots?: PlantSlotPatch[] | Record<number, PlantSlotPatch>;
}

export interface DecorPatch {
  rotation?: number;
}

export interface EggPatch {
  plantedAt?: number;
  maturedAt?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Options
// ─────────────────────────────────────────────────────────────────────────────

export interface TileOperationOptions {
  ensureView?: boolean;
  forceUpdate?: boolean;
  clone?: boolean;
}

export interface PointToTileOptions {
  maxAgeMs?: number;
  forceRebuild?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// State
// ─────────────────────────────────────────────────────────────────────────────

export interface TileState {
  ready: boolean;
  xform: TileTransform | null;
  xformAt: number;
}
