import type { Renderer } from '@rive-app/webgl2-advanced';
import { CanvasSource, Rectangle, Texture } from 'pixi.js';
import type { LowLevelRive } from '@/utils/rive-utils';
import type { BinPackingStrategy } from './BinPackingStrategy';
import type { IRiveBatchRenderer } from './IRiveBatchRenderer';
import type { IRiveSprite } from './IRiveSprite';
import { MaxRectsPackingStrategy } from './MaxRectsPackingStrategy';

// this is the "bifrost"!!!

const DEBUG_RENDERING = false;

export interface RiveSpriteBatchRendererOptions {
  /** Optional packing strategy (defaults to SimpleShelfPackingStrategy) */
  packingStrategy?: BinPackingStrategy;
}

/**
 * Batch renderer for Rive animations using PixiJS sprites.
 *
 * Manages a shared OffscreenCanvas where all Rive artboards are rendered,
 * using a bin packing strategy to efficiently allocate texture space.
 * Automatically repacks when canvas needs to grow for optimal layout.
 *
 * Key features:
 * - ONE canvas, ONE Rive renderer (shared across all sprites)
 * - ONE flush() + ONE texture upload per frame (batch rendering)
 * - Automatic repack-on-grow (sorts by size for optimal packing)
 * - Transparent texture frame management (sprites don't see regions)
 * - Per-sprite alignment support for flexible rendering
 * - Configurable packing strategies for different use cases
 *
 * Use via the RiveSpriteBatchRendererPlugin for automatic lifecycle management,
 * or instantiate directly for tests and special cases.
 *
 * @example
 * ```typescript
 * // Via plugin (recommended) - register once before app.init()
 * import { extensions } from 'pixi.js';
 * extensions.add(RiveSpriteBatchRendererPlugin);
 *
 * // Access via app instance:
 * const batchRenderer = app.riveSpriteBatchRenderer;
 * const sprite = await RiveSprite.create({
 *   batchRenderer,
 *   riveFileSrc: 'avatar.riv',
 *   riveOptions: { size: 200 }
 * });
 *
 * // Every frame:
 * sprite.draw(performance.now());
 * // After all sprites have called draw():
 * app.riveSpriteBatchRenderer.flushAll();  // Single batch render + upload
 * ```
 */
export class RiveSpriteBatchRenderer
  implements IRiveBatchRenderer<IRiveSprite>
{
  private rive: LowLevelRive;
  private packingStrategy: BinPackingStrategy;

  private renderer: Renderer;
  private canvas: OffscreenCanvas | HTMLCanvasElement;
  private canvasSource: CanvasSource;
  private resolutionDisplay?: HTMLDivElement;

  // Registry: maps sprites to their allocated canvas regions
  private spriteRegistry: Map<IRiveSprite, Rectangle> = new Map();

  // Deferred rendering: stores sprites pending render
  private pendingRenders: Set<IRiveSprite> = new Set();

  // Deferred repacking: marks when canvas needs repacking
  private shouldRepack = false;

  /**
   * Creates a new RiveSpriteBatchRenderer.
   *
   * @param rive - Low-level Rive instance
   * @param options - Optional configuration
   */
  constructor(rive: LowLevelRive, options?: RiveSpriteBatchRendererOptions) {
    this.rive = rive;
    const initialWidth = 16;
    const initialHeight = initialWidth;

    // Use custom strategy if provided, otherwise use default MaxRects
    // with 4096x4096 max dimensions (will find smallest size that fits)
    this.packingStrategy =
      options?.packingStrategy || new MaxRectsPackingStrategy();

    let canvas: OffscreenCanvas | HTMLCanvasElement;
    if (DEBUG_RENDERING) {
      canvas = document.createElement('canvas');
      canvas.width = initialWidth;
      canvas.height = initialHeight;
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.zIndex = '10000';
      window.document.body.appendChild(canvas);
      canvas.style.border = '1px solid red';
      canvas.style.maxHeight = '50vh';
      canvas.style.maxWidth = '50vw';
      canvas.style.pointerEvents = 'none';
      canvas.style.backgroundColor = 'white';

      // Create resolution display overlay
      this.resolutionDisplay = document.createElement('div');
      this.resolutionDisplay.style.position = 'absolute';
      this.resolutionDisplay.style.top = '0';
      this.resolutionDisplay.style.left = '0';
      this.resolutionDisplay.style.zIndex = '10001';
      this.resolutionDisplay.style.padding = '4px 8px';
      this.resolutionDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
      this.resolutionDisplay.style.color = 'white';
      this.resolutionDisplay.style.fontFamily = 'monospace';
      this.resolutionDisplay.style.fontSize = '12px';
      this.resolutionDisplay.style.pointerEvents = 'none';
      this.resolutionDisplay.textContent = `${initialWidth}x${initialHeight}`;
      window.document.body.appendChild(this.resolutionDisplay);
    } else {
      canvas = new OffscreenCanvas(initialWidth, initialHeight);
    }
    this.renderer = rive.makeRenderer(canvas);
    this.canvasSource = new CanvasSource({
      resource: canvas,
    });
    this.canvas = canvas;
  }

  /**
   * Registers a sprite for batch rendering.
   *
   * Allocates a region in the shared canvas and sets up the sprite's texture.
   * This method is idempotent - calling it multiple times with the same sprite is a no-op.
   *
   * The texture's frame is managed internally and updated transparently
   * when the canvas is repacked (deferred until next flushAll).
   *
   * @param sprite - The sprite to register
   */
  registerSprite(sprite: IRiveSprite): void {
    // No-op if already registered (idempotent)
    if (this.spriteRegistry.has(sprite)) {
      return;
    }

    const renderSize = sprite.riveRenderSize;
    this.spriteRegistry.set(
      sprite,
      new Rectangle(0, 0, renderSize.width, renderSize.height)
    );

    // Mark for repack instead of immediate repack
    this.shouldRepack = true;
  }

  /**
   * Marks a sprite for rendering in the next flush.
   *
   * @param sprite - The sprite to render
   */
  markForRender(sprite: IRiveSprite): void {
    if (!this.spriteRegistry.has(sprite)) {
      console.warn('[RiveSpriteBatchRenderer] Sprite not registered');
      return;
    }

    this.pendingRenders.add(sprite);
  }

  /**
   * Unregisters a sprite when it's destroyed or culled.
   * Marks for repack to shrink canvas and reclaim space.
   *
   * @param sprite - The sprite to unregister
   */
  unregisterSprite(sprite: IRiveSprite): void {
    this.spriteRegistry.delete(sprite);

    // Mark for repack instead of immediate repack
    if (this.spriteRegistry.size > 0) {
      this.shouldRepack = true;
    }
  }

  /**
   * Invalidates the packing for a sprite, marking it for repack.
   * Call this when a sprite's size changes.
   *
   * @param sprite - The sprite whose packing is now invalid
   */
  invalidateSpritePacking(sprite: IRiveSprite): void {
    if (!this.spriteRegistry.has(sprite)) {
      return; // Not registered, nothing to do
    }

    // Read current size from sprite
    const size = sprite.riveRenderSize;
    this.spriteRegistry.set(
      sprite,
      new Rectangle(0, 0, size.width, size.height)
    );

    // Mark for repack
    this.shouldRepack = true;
  }

  /**
   * Repacks all sprites for optimal layout.
   *
   * Called on every register/unregister to maintain optimal packing.
   * Sorts sprites by size (largest first) and reallocates with optimal packing.
   * Updates all texture frames transparently. May grow OR shrink canvas.
   *
   * @private
   */
  private repackAndGrow(): void {
    let totalPackingTime = 0;

    // Sort by area (largest first) for optimal packing
    const entries = Array.from(this.spriteRegistry.entries());
    entries.sort((a, b) => b[1].width * b[1].height - a[1].width * a[1].height);

    // Reset and prepare packing strategy for batch allocation

    this.packingStrategy.reset();
    const prepareForBatchStartTime = performance.now();

    this.packingStrategy.prepareForBatch(
      entries.map(([, region]) => ({
        width: region.width,
        height: region.height,
      }))
    );
    totalPackingTime += performance.now() - prepareForBatchStartTime;

    // Reallocate all sprites
    for (const [sprite, region] of entries) {
      const allocateStartTime = performance.now();
      const newRegion = this.packingStrategy.allocate(
        region.width,
        region.height
      );
      const allocateEndTime = performance.now();
      totalPackingTime += allocateEndTime - allocateStartTime;

      // Create texture with correct frame if sprite doesn't have one yet,
      // otherwise just update the existing texture's frame
      if (!sprite.texture || sprite.texture === Texture.EMPTY) {
        sprite.texture = new Texture({
          source: this.canvasSource,
          dynamic: true,
          frame: newRegion,
        });
      } else {
        // Preserve display dimensions before updating frame
        // (changing frame size shouldn't change display size!)
        // XXX: avi isn't 100% sure why this is needed, but resetting the
        // width and height like this does make it so we can adjust the renderSize
        // without affecting the display size.
        const currentWidth = sprite.width;
        const currentHeight = sprite.height;

        sprite.texture.frame.copyFrom(newRegion);
        sprite.texture.updateUvs();

        // Restore display dimensions
        sprite.width = currentWidth;
        sprite.height = currentHeight;
      }

      // Update region tracking
      this.spriteRegistry.set(sprite, newRegion);
    }

    // Resize canvas to fit optimized layout
    const { width, height } = this.packingStrategy.getCanvasDimensions();
    this.canvasSource.resize(width, height);

    if (DEBUG_RENDERING) {
      console.log(
        `[RiveSpriteBatchRenderer] Repack completed in ${totalPackingTime.toFixed(2)}ms (${entries.length} sprites, canvas: ${width}x${height})`
      );

      // Update resolution display
      if (this.resolutionDisplay) {
        this.resolutionDisplay.textContent = `${width}x${height}`;
      }
    }
  }

  /**
   * Renders ALL marked sprites in ONE batch.
   *
   * Process:
   * 1. Repack if needed (deferred from register/unregister/resize operations)
   * 2. Clear canvas
   * 3. Render all artboards to their regions
   * 4. Flush ONCE (not N times for N sprites!)
   * 5. Upload texture ONCE
   *
   * This is where the magic happens - single flush & upload for ALL sprites!
   */
  flushAll(): void {
    // Repack if needed before rendering
    if (this.shouldRepack) {
      this.repackAndGrow();
      this.shouldRepack = false;
    }

    if (this.pendingRenders.size === 0) return;

    // Clear canvas before rendering new frame
    this.renderer.clear();

    // Render all artboards in ONE batch
    for (const sprite of this.pendingRenders) {
      const region = this.spriteRegistry.get(sprite);
      const artboard = sprite.getArtboard();
      if (!region) continue;

      this.renderer.save();
      this.renderer.align(
        this.rive.Fit.contain,
        sprite.getRiveAlignment(),
        {
          minX: region.x,
          minY: region.y,
          maxX: region.x + region.width,
          maxY: region.y + region.height,
        },
        artboard.bounds
      );
      artboard.draw(this.renderer);
      this.renderer.restore();
    }

    // Single flush for ALL renders (KEY OPTIMIZATION!)
    this.renderer.flush();
    this.rive.resolveAnimationFrame();

    // Upload texture ONCE
    this.canvasSource.update();

    this.pendingRenders.clear();
  }

  /**
   * Gets the Rive instance used by this batch renderer.
   *
   * @returns The Low-level Rive instance
   */
  getRive(): LowLevelRive {
    return this.rive;
  }

  /**
   * Gets statistics about the renderer state.
   *
   * @returns Object containing canvas size, efficiency, and other metrics
   */
  getStats(): {
    canvasPixels: number;
    pendingRenders: number;
    registeredSprites: number;
    efficiency: number;
    aspectRatio: number;
  } {
    const packingStats = this.packingStrategy.getStats();
    const pixels = this.canvasSource.pixelWidth * this.canvasSource.pixelHeight;

    return {
      canvasPixels: pixels,
      pendingRenders: this.pendingRenders.size,
      registeredSprites: this.spriteRegistry.size,
      efficiency: packingStats.efficiency,
      aspectRatio: packingStats.aspectRatio,
    };
  }

  /**
   * Cleans up all resources held by this batch renderer.
   * Called automatically by RiveSpriteBatchRendererPlugin when app is destroyed.
   */
  destroy(): void {
    // Clear all registered sprites
    this.spriteRegistry.clear();
    this.pendingRenders.clear();

    // Delete Rive renderer
    this.renderer.delete();

    // Destroy canvas source
    this.canvasSource.destroy();

    // Remove debug elements if they exist (only for HTMLCanvasElement in debug mode)
    if (
      typeof HTMLCanvasElement !== 'undefined' &&
      this.canvas instanceof HTMLCanvasElement
    ) {
      this.canvas.remove();
    }
    if (this.resolutionDisplay) {
      this.resolutionDisplay.remove();
    }
  }
}
