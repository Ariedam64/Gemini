import { Container, Rectangle, type Renderer, Sprite } from 'pixi.js';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import {
  type MutationId,
  mutationSortFn,
} from '@/common/games/Quinoa/systems/mutation';
import type { InventoryItem } from '@/common/games/Quinoa/user-json-schema/current';
import type { TileRef } from '@/common/games/Quinoa/world/tiles/ref';
import { calculateServerNow } from '@/Quinoa/utils/serverNow';
import { getIsTallPlant, getTileFrameName } from './legacy/tile-mappings';
import { QUINOA_RENDER_SCALE } from './sprite-utils';
import { LRUCache } from './utils/LRUCache';
import {
  applyMutations,
  applyStateEffects,
  getCanvasTextureSizePx,
  unpremultiplyFilter,
} from './utils/SpriteRenderingUtils';

const MAX_CANVAS_CACHE_SIZE = 128; // For UI rendering (inventory, menus, etc.)

// ============================================================================
// Cache Key Generation
// ============================================================================

interface CacheKeyOptions {
  isDisabled?: boolean;
  isUnknown?: boolean;
  unpremultiply?: boolean;
}

/** Generates state suffix for cache keys (d=disabled, u=unknown, p=unpremultiply). */
function getStateSuffix(options: CacheKeyOptions): string {
  const {
    isDisabled = false,
    isUnknown = false,
    unpremultiply = false,
  } = options;
  return `${isDisabled ? ':d' : ''}${isUnknown ? ':u' : ''}${unpremultiply ? ':p' : ''}`;
}

/** Generates a cache key for a frame name with optional mutations and state. */
export function generateFrameCacheKey(
  frameName: string,
  mutations: MutationId[] = [],
  options: CacheKeyOptions = {}
): string {
  const sortedMutations = mutations.toSorted(mutationSortFn);
  return `frame:${frameName}:${sortedMutations.join(',')}${getStateSuffix(options)}`;
}

/**
 * Generates a cache key for any inventory item based on its visual identity.
 * Items with the same visual appearance will have the same key.
 */
export function generateInventoryItemCacheKey(
  item: InventoryItem,
  options: CacheKeyOptions = {}
): string {
  const suffix = getStateSuffix(options);

  switch (item.itemType) {
    case ItemType.Plant: {
      const secondsUntilFullyGrown = Math.max(
        0,
        Math.max(
          ...item.slots.map((s) => Math.round(s.endTime - calculateServerNow()))
        )
      );
      const slotKey = item.slots
        .map((s) => `${s.targetScale.toFixed(1)}:${s.mutations.join('|')}`)
        .join(',');
      return `plant:${item.species}:${secondsUntilFullyGrown}:${slotKey}${suffix}`;
    }
    case ItemType.Produce:
      return `crop:${item.species}:${item.mutations.join(',')}${suffix}`;
    case ItemType.Pet: {
      const isDisabled = item.hunger <= 0;
      const petSuffix = getStateSuffix({
        isDisabled,
        isUnknown: options.isUnknown,
      });
      return `pet:${item.petSpecies}:${item.mutations.join(',')}${petSuffix}`;
    }
    case ItemType.Seed:
      return `seed:${item.species}${suffix}`;
    case ItemType.Tool:
      return `tool:${item.toolId}${suffix}`;
    case ItemType.Decor:
      return `decor:${item.decorId}${suffix}`;
    case ItemType.Egg:
      return `egg:${item.eggId}${suffix}`;
    default: {
      const _exhaustiveCheck: never = item;
      return _exhaustiveCheck;
    }
  }
}

/** Enable to log cache hit/miss stats and top requested textures every 5 seconds. */
const CACHE_DEBUG = false;

/**
 * CanvasSpriteCache provides sprites rendered as HTMLCanvasElements for UI.
 * Used by React components (Sprite.tsx, inventory, menus, etc.).
 *
 * Responsibilities:
 * - Caches HTMLCanvasElements for low-volume UI rendering
 * - Handles mutation effects (Gold, Rainbow, Wet, etc.)
 * - Manages memory with small LRU cache (128 entries)
 * - Returns cloned canvases to allow multiple DOM insertions
 */
export class CanvasSpriteCache {
  public renderer: Renderer;
  private canvasCache: LRUCache<string, HTMLCanvasElement>;

  // Cache hit/miss tracking
  private canvasCacheHits = 0;
  private canvasCacheMisses = 0;
  private lastLogTime = 0;
  private readonly LOG_INTERVAL_MS = 5000;

  /**
   * Creates a new CanvasSpriteCache.
   * @param renderer - The PixiJS renderer from the main application
   */
  constructor(renderer: Renderer) {
    this.renderer = renderer;
    this.canvasCache = new LRUCache(MAX_CANVAS_CACHE_SIZE);

    if (CACHE_DEBUG) {
      console.log(
        `[CanvasSpriteCache] Initialized with canvas cache (${MAX_CANVAS_CACHE_SIZE})`
      );
    }
  }

  public clear(): void {
    this.canvasCache.clear();
  }

  /**
   * Logs cache statistics periodically.
   */
  private maybeLogCacheStats(): void {
    if (!CACHE_DEBUG) return;

    const now = performance.now();
    if (now - this.lastLogTime < this.LOG_INTERVAL_MS) return;
    this.lastLogTime = now;

    const canvasTotal = this.canvasCacheHits + this.canvasCacheMisses;
    const canvasHitRate =
      canvasTotal > 0
        ? ((this.canvasCacheHits / canvasTotal) * 100).toFixed(1)
        : '0.0';

    console.log(
      `[CanvasSpriteCache] Hits: ${this.canvasCacheHits}/${canvasTotal} (${canvasHitRate}%), Size: ${this.canvasCache.size}`
    );
  }

  /**
   * Updates the renderer used by this cache.
   * Useful when transitioning from headless renderer to canvas-bound renderer.
   * Does NOT clear cached sprites - they remain valid.
   *
   * @param renderer - The new PixiJS renderer to use
   */
  public updateRenderer(renderer: Renderer): void {
    console.log(
      '[CanvasSpriteCache] Updating renderer (keeping cached sprites)'
    );
    this.renderer = renderer;
  }

  /**
   * Clones a canvas element by drawing it onto a new canvas.
   * Required because HTMLCanvasElement can only exist in one DOM location at a time.
   *
   * @param original - The original canvas to clone
   * @returns A new canvas with identical pixel data
   */
  private cloneCanvas(original: HTMLCanvasElement): HTMLCanvasElement {
    const clone = document.createElement('canvas');
    clone.width = original.width;
    clone.height = original.height;
    const ctx = clone.getContext('2d');
    if (ctx) {
      ctx.drawImage(original, 0, 0);
    }
    return clone;
  }

  /**
   * Core cache access method. Gets a cached canvas or renders and caches a new one.
   * All other public methods delegate to this for consistent cache behavior.
   *
   * IMPORTANT: Returns a CLONED canvas to allow multiple DOM insertions.
   *
   * @param cacheKey - Unique key identifying the visual
   * @param renderFn - Function that renders and returns the canvas if not cached
   * @returns Cloned HTMLCanvasElement (safe for DOM insertion)
   */
  public getOrRenderCanvas(
    cacheKey: string,
    renderFn: () => HTMLCanvasElement
  ): HTMLCanvasElement {
    const cached = this.canvasCache.get(cacheKey);

    if (CACHE_DEBUG) {
      if (cached) {
        this.canvasCacheHits++;
      } else {
        this.canvasCacheMisses++;
      }
      this.maybeLogCacheStats();
    }
    if (cached) {
      return this.cloneCanvas(cached);
    }
    const canvas = renderFn();
    this.canvasCache.set(cacheKey, canvas);
    return this.cloneCanvas(canvas);
  }

  /**
   * Convenience method to get or render a canvas from a TileRef.
   * Delegates to getOrRenderCanvas with auto-generated cache key.
   *
   * Note: Scale is NOT part of the cache key because display scaling is handled
   * via CSS transforms on the canvas element, not during rendering. This allows
   * one cached canvas to be displayed at multiple sizes efficiently.
   *
   * @param tileRef - The tile reference containing spritesheet and index
   * @param mutations - Array of mutation IDs to apply (default: none)
   * @param isDisabled - Whether to apply disabled visual effect (red tint)
   * @param isUnknown - Whether to apply unknown visual effect (dark gray overlay)
   * @param unpremultiply - Whether to apply unpremultiply filter for correct alpha
   * @returns Cloned HTMLCanvasElement (safe for DOM insertion)
   */
  public getCanvas(
    tileRef: TileRef,
    mutations: MutationId[] = [],
    isDisabled: boolean = false,
    isUnknown: boolean = false,
    unpremultiply: boolean = false
  ): HTMLCanvasElement {
    const frameName = getTileFrameName(tileRef.spritesheet, tileRef.index - 1);
    if (!frameName) {
      console.warn(
        `[CanvasSpriteCache] No frame name for ${tileRef.spritesheet}:${tileRef.index - 1}`
      );
      return document.createElement('canvas');
    }
    return this.getCanvasByFrameName(
      frameName,
      mutations,
      isDisabled,
      isUnknown,
      unpremultiply
    );
  }

  /**
   * Convenience method to get or render a canvas from a frame name.
   * Delegates to getOrRenderCanvas with auto-generated cache key.
   *
   * Note: Scale is NOT part of the cache key because display scaling is handled
   * via CSS transforms on the canvas element, not during rendering. This allows
   * one cached canvas to be displayed at multiple sizes efficiently.
   *
   * @param frameName - The sprite frame name (e.g., 'sprite/ui/Donut')
   * @param mutations - Array of mutation IDs to apply (default: none)
   * @param isDisabled - Whether to apply disabled visual effect (red tint)
   * @param isUnknown - Whether to apply unknown visual effect (dark gray overlay)
   * @param unpremultiply - Whether to apply unpremultiply filter for correct alpha
   * @returns Cloned HTMLCanvasElement (safe for DOM insertion)
   */
  public getCanvasByFrameName(
    frameName: string,
    mutations: MutationId[] = [],
    isDisabled: boolean = false,
    isUnknown: boolean = false,
    unpremultiply: boolean = false
  ): HTMLCanvasElement {
    const sortedMutations = mutations.toSorted(mutationSortFn);
    const cacheKey = generateFrameCacheKey(frameName, sortedMutations, {
      isDisabled,
      isUnknown,
      unpremultiply,
    });

    return this.getOrRenderCanvas(cacheKey, () =>
      this.renderSimpleSprite(
        frameName,
        sortedMutations,
        isDisabled,
        isUnknown,
        unpremultiply
      )
    );
  }

  /**
   * Renders a simple sprite canvas with optional mutations.
   * Used internally by getCanvasByFrameName.
   */
  private renderSimpleSprite(
    frameName: string,
    mutations: MutationId[],
    isDisabled: boolean,
    isUnknown: boolean,
    unpremultiply: boolean
  ): HTMLCanvasElement {
    const container = new Container();
    const sprite = Sprite.from(frameName);
    const texture = sprite.texture;

    // Scale to fit within getCanvasTextureSizePx() while preserving aspect ratio
    const maxDimension = Math.max(texture.width, texture.height);
    const fitScale = getCanvasTextureSizePx() / maxDimension;
    sprite.scale.set(fitScale);
    sprite.anchor.set(0.5);
    sprite.position.set(getCanvasTextureSizePx() / 2);
    container.addChild(sprite);

    if (mutations.length > 0) {
      applyMutations(
        this.renderer,
        sprite,
        mutations,
        getIsTallPlant(frameName)
      );
    }
    // Apply state effects to container so they affect all children
    // (base sprite + mutation overlays like Gold, Rainbow, etc.)
    applyStateEffects(container, isDisabled, isUnknown);

    // Apply unpremultiply filter for correct alpha blending
    if (unpremultiply) {
      container.filters = [...(container.filters ?? []), unpremultiplyFilter];
    }

    const renderedTexture = this.renderer.textureGenerator.generateTexture({
      target: container,
      resolution: QUINOA_RENDER_SCALE,
      frame: new Rectangle(
        0,
        0,
        getCanvasTextureSizePx(),
        getCanvasTextureSizePx()
      ),
    });

    const canvas = this.renderer.extract.canvas(
      renderedTexture
    ) as HTMLCanvasElement;

    renderedTexture.destroy(true);
    container.destroy({ children: true });

    return canvas;
  }
}
