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
// Display Options
// ─────────────────────────────────────────────────────────────────────────────

export type MutationName =
  | "Gold"
  | "Rainbow"
  | "Wet"
  | "Chilled"
  | "Frozen"
  | "Thunderstruck"
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

export type CanvasBoundsMode = "mutations" | "base" | "padded";

export interface BoundsPadding {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface ToCanvasOptions {
  frameIndex?: number;
  scale?: number;
  pad?: number;
  anchorX?: number;
  anchorY?: number;
  mutations?: MutationName[];
  boundsMode?: CanvasBoundsMode;
  boundsPadding?: number | BoundsPadding;
}

// ─────────────────────────────────────────────────────────────────────────────
// Sprite State
// ─────────────────────────────────────────────────────────────────────────────

export interface SpriteState {
  ready: boolean;

  // PIXI references (optional - only available when game PIXI is detected)
  app: PixiApp | null;
  renderer: PixiRenderer | null;
  ctors: PixiConstructors | null;

  // Sprite data (HTMLImageElement stored as PixiTexture via any-typing)
  textures: Map<string, PixiTexture>;
  animations: Map<string, PixiTexture[]>;
  /** Sprite metadata (anchor, sourceSize, trim) from API */
  spriteMeta: Map<string, { anchor: { x: number; y: number }; sourceSize: { w: number; h: number }; trimmed: boolean; trimOffset: { x: number; y: number } }>;
  live: Set<PixiSprite>;

  defaultParent: PixiContainer | (() => PixiContainer) | null;
  overlay: PixiContainer | null;

  categoryIndex: Map<string, Set<string>> | null;

  // Lazy loading state
  /** All known sprite IDs from the catalog (populated at init, before images are loaded) */
  catalogKeys: Set<string>;
  /** Animation frame ID lists (animId → frameIds[]) for lazy resolution */
  animationFrameIds: Map<string, string[]>;
  /** In-flight image load promises for deduplication */
  loadingPromises: Map<string, Promise<HTMLImageElement | null>>;
  /** URL resolver function (set during catalog init) */
  spritePngUrlResolver: ((id: string) => string) | null;
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

// ─────────────────────────────────────────────────────────────────────────────
// Canvas Cache Types
// ─────────────────────────────────────────────────────────────────────────────

export interface CanvasCacheEntry {
  canvas: HTMLCanvasElement;
  lastAccess: number;
}

export interface CanvasCacheState {
  cache: Map<string, CanvasCacheEntry>;
  maxEntries: number;
}

export interface CanvasCacheConfig {
  enabled: boolean;
  maxEntries: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Mutation System Types
// ─────────────────────────────────────────────────────────────────────────────

export interface MutationMeta {
  overlayTall: string | null;
  tallIconOverride: string | null;
  angle?: number;
  angleTall?: number;
}

export interface VariantSignature {
  muts: MutationName[];
  overlayMuts: MutationName[];
  selectedMuts: MutationName[];
  sig: string;
}

export interface PipelineStep {
  name: MutationName;
  meta: MutationMeta;
  overlayTall: string | null;
  isTall: boolean;
}
