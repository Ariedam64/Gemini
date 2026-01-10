import {
  Container,
  GlobalResourceRegistry,
  type Renderer,
  Sprite,
  Texture,
} from 'pixi.js';
import {
  type MutationId,
  mutationSortFn,
} from '@/common/games/Quinoa/systems/mutation';
import type { TileRef } from '@/common/games/Quinoa/world/tiles/ref';
import { getIsTallPlant, getTileFrameName } from './legacy/tile-mappings';
import { LRUCache } from './utils/LRUCache';
import {
  applyMutations,
  applyStateEffects,
} from './utils/SpriteRenderingUtils';

const MAX_TEXTURE_CACHE_SIZE = 1024; // For world rendering (1024 entities on screen)

/** Enable to log cache hit/miss stats and top requested textures every 5 seconds. */
const CACHE_DEBUG = false;

/**
 * GameTextureCache provides GPU-accelerated sprite rendering for world entities.
 * Renders sprites using PixiJS and caches them as Textures.
 *
 * Responsibilities:
 * - Caches Pixi Textures for high-volume world rendering (crops, pets, etc.)
 * - Handles mutation effects (Gold, Rainbow, Wet, etc.)
 * - Manages memory with LRU cache (1024 entries)
 *
 * Future Optimization - Web Worker Migration:
 * The separate renderer architecture enables moving this cache to a Web Worker.
 */
export class GameTextureCache {
  private static instance: GameTextureCache | null = null;

  public renderer: Renderer;
  private textureCache: LRUCache<string, Texture>;

  // Cache hit/miss tracking
  private textureCacheHits = 0;
  private textureCacheMisses = 0;
  private lastLogTime = 0;
  private readonly LOG_INTERVAL_MS = 5000;
  private textureRequestCounts: Map<string, number> | null = CACHE_DEBUG
    ? new Map()
    : null;

  /**
   * Creates a new GameTextureCache.
   * @param renderer - The PixiJS renderer from the main application
   */
  constructor(renderer: Renderer) {
    GameTextureCache.instance = this;
    this.renderer = renderer;
    this.textureCache = new LRUCache(MAX_TEXTURE_CACHE_SIZE);
    GlobalResourceRegistry.register(this);

    if (CACHE_DEBUG) {
      console.log(
        `[GameTextureCache] Initialized with texture cache (${MAX_TEXTURE_CACHE_SIZE})`
      );
    }
  }

  public clear(): void {
    this.textureCache.clear();
    if (GameTextureCache.instance === this) {
      GameTextureCache.instance = null;
    }
  }

  /**
   * Logs cache statistics periodically.
   */
  private maybeLogCacheStats(): void {
    if (!CACHE_DEBUG) return;

    const now = performance.now();
    if (now - this.lastLogTime < this.LOG_INTERVAL_MS) return;
    this.lastLogTime = now;

    const textureTotal = this.textureCacheHits + this.textureCacheMisses;
    const textureHitRate =
      textureTotal > 0
        ? ((this.textureCacheHits / textureTotal) * 100).toFixed(1)
        : '0.0';

    // Get top 5 most requested textures
    const topRequested = this.textureRequestCounts
      ? [...this.textureRequestCounts.entries()]
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([key, count]) => `${key.substring(0, 40)}...(${count})`)
          .join(', ')
      : '';

    console.log(
      `[GameTextureCache] Hits: ${this.textureCacheHits}/${textureTotal} (${textureHitRate}%), Size: ${this.textureCache.size}`
    );
    console.log(`[GameTextureCache] Top requested: ${topRequested}`);
  }

  /**
   * Get the GameTextureCache instance.
   */
  public static getInstance(): GameTextureCache | null {
    return GameTextureCache.instance;
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
      '[GameTextureCache] Updating renderer (keeping cached sprites)'
    );
    this.renderer = renderer;
  }

  /**
   * Get or render a texture for world rendering.
   *
   * @param frameName - The sprite frame name
   * @param mutations - Array of mutation IDs to apply (default: none)
   * @param isDisabled - Whether to apply disabled visual effect (red tint)
   * @param isUnknown - Whether to apply unknown visual effect (dark gray overlay)
   * @returns Cached or newly created Texture
   */
  public getTexture(
    frameName: string,
    mutations: MutationId[] = [],
    isDisabled: boolean = false,
    isUnknown: boolean = false
  ): Texture {
    // Sort mutations for consistent cache keys (same visual = same key)
    const sortedMutations = mutations.toSorted(mutationSortFn);
    const cacheKey = `${frameName}-${sortedMutations.join(',')}-${isDisabled ? 'disabled' : ''}-${isUnknown ? 'unknown' : ''}`;
    const cached = this.textureCache.get(cacheKey);

    if (CACHE_DEBUG) {
      this.textureRequestCounts?.set(
        cacheKey,
        (this.textureRequestCounts?.get(cacheKey) ?? 0) + 1
      );

      if (cached) {
        this.textureCacheHits++;
      } else {
        this.textureCacheMisses++;
      }
      this.maybeLogCacheStats();
    }

    if (cached) {
      return cached;
    }

    return this.renderTexture(
      frameName,
      mutations,
      cacheKey,
      isDisabled,
      isUnknown
    );
  }

  /**
   * Renders a texture for world rendering with optional mutations.
   * Extracts texture from sprite and caches it.
   */
  private renderTexture(
    frameName: string,
    mutations: MutationId[],
    cacheKey: string,
    isDisabled: boolean = false,
    isUnknown: boolean = false
  ): Texture {
    // Create container to hold sprite + mutation effects
    const container = new Container();

    // Create base sprite from atlas
    const sprite = new Sprite({
      texture: Texture.from(frameName),
      anchor: 0.5,
    });
    container.addChild(sprite);

    // Apply mutations
    applyMutations(this.renderer, sprite, mutations, getIsTallPlant(frameName));

    // Apply disabled/unknown effects to container so they affect all children
    // (base sprite + mutation overlays like Gold, Rainbow, etc.)
    applyStateEffects(container, isDisabled, isUnknown);

    const texture = this.renderer.textureGenerator.generateTexture({
      target: container,
      // For whatever reason, this HAS to be 1 even if the renderer resolution is 2!!
      resolution: 1,
    });

    this.textureCache.set(cacheKey, texture);

    // Clean up temporary objects
    container.destroy({ children: true });

    return texture;
  }
}

/**
 * Helper to get a baked texture from the cache given a TileRef.
 */
export function bakeSpriteTexture(
  tileRef: TileRef,
  mutations: MutationId[] = [],
  isDisabled: boolean = false,
  isUnknown: boolean = false
): Texture {
  const cache = GameTextureCache.getInstance();

  const frameName = getTileFrameName(tileRef.spritesheet, tileRef.index - 1);
  if (!frameName) {
    console.warn(
      `[GameTextureCache] No frame name for ${tileRef.spritesheet}:${tileRef.index - 1}`
    );
    return Texture.WHITE;
  }
  if (!cache) {
    throw new Error(
      '[GameTextureCache] Cache not initialized - create GameTextureCache first'
    );
  }
  return cache.getTexture(frameName, mutations, isDisabled, isUnknown);
}
