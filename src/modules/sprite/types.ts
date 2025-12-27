// src/modules/sprite/types.ts
// Type definitions for the sprite system

// ─────────────────────────────────────────────────────────────────────────────
// Pixi Types (runtime, any-typed for flexibility)
// ─────────────────────────────────────────────────────────────────────────────

export type PixiApp = any;
export type PixiRenderer = any;
export type PixiTexture = any;
export type PixiSprite = any;
export type PixiContainer = any;
export type PixiRectangle = any;
export type PixiAnimatedSprite = any;

export interface PixiConstructors {
  Container: new () => PixiContainer;
  Sprite: new (texture: PixiTexture) => PixiSprite;
  Texture: any;
  Rectangle: new (x: number, y: number, w: number, h: number) => PixiRectangle;
  AnimatedSprite: (new (frames: PixiTexture[]) => PixiAnimatedSprite) | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Atlas Types
// ─────────────────────────────────────────────────────────────────────────────

export interface AtlasFrame {
  frame: { x: number; y: number; w: number; h: number };
  rotated?: boolean;
  trimmed?: boolean;
  spriteSourceSize?: { x: number; y: number; w: number; h: number };
  sourceSize?: { w: number; h: number };
  anchor?: { x: number; y: number };
}

export interface AtlasJson {
  frames: Record<string, AtlasFrame>;
  meta: {
    image: string;
    related_multi_packs?: string[];
  };
  animations?: Record<string, string[]>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Display Options
// ─────────────────────────────────────────────────────────────────────────────

export type MutationName =
  | "Gold"
  | "Rainbow"
  | "Wet"
  | "Chilled"
  | "Frozen"
  | "Dawnlit"
  | "Ambershine"
  | "Dawncharged"
  | "Ambercharged";

export interface ShowOptions {
  parent?: PixiContainer;
  x?: number;
  y?: number;
  center?: boolean;
  scale?: number;
  alpha?: number;
  rotation?: number;
  zIndex?: number;
  anchorX?: number;
  anchorY?: number;
  fps?: number;
  speed?: number;
  loop?: boolean;
  mutations?: MutationName[];
}

export interface ToCanvasOptions {
  frameIndex?: number;
  scale?: number;
  pad?: number;
  anchorX?: number;
  anchorY?: number;
  mutations?: MutationName[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Sprite State
// ─────────────────────────────────────────────────────────────────────────────

export interface SpriteState {
  ready: boolean;
  app: PixiApp | null;
  renderer: PixiRenderer | null;
  ctors: PixiConstructors | null;
  baseUrl: string | null;

  textures: Map<string, PixiTexture>;
  animations: Map<string, PixiTexture[]>;
  live: Set<PixiSprite>;

  defaultParent: PixiContainer | (() => PixiContainer) | null;
  overlay: PixiContainer | null;

  categoryIndex: Map<string, Set<string>> | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Mutation Cache Types
// ─────────────────────────────────────────────────────────────────────────────

export interface CacheEntry {
  isAnim: boolean;
  tex?: PixiTexture;
  frames?: PixiTexture[];
}

export interface MutationCacheState {
  lru: Map<string, CacheEntry>;
  cost: number;
  srcCanvas: Map<PixiTexture, HTMLCanvasElement>;
}

export interface CacheConfig {
  enabled: boolean;
  maxEntries: number;
  maxCost: number;
  srcCanvasMax: number;
}
