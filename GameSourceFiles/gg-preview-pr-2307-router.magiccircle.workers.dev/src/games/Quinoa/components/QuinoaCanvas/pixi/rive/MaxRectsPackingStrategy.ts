import { MaxRectsPacker, Rectangle } from 'maxrects-packer';
import { Rectangle as PixiRectangle } from 'pixi.js';
import type { BinPackingStrategy, PackingStats } from './BinPackingStrategy';

export interface MaxRectsPackingOptions {
  /** Maximum bin width in pixels. @default 4096 */
  maxWidth?: number;
  /** Maximum bin height in pixels. @default 4096 */
  maxHeight?: number;
  /** Padding between rectangles in pixels. @default 1 */
  padding?: number;
  /** Enable smart packing with smallest possible size. @default true */
  smart?: boolean;
  /** Round up bin size to smallest power of 2. @default false */
  pot?: boolean;
  /** Force square bins. @default false */
  square?: boolean;
  /** Allow 90-degree rotation while packing. @default false */
  allowRotation?: boolean;
}

/**
 * MaxRects bin packing algorithm implementation.
 *
 * Solves the problem: given N rectangles of arbitrary sizes and a maximum
 * canvas dimension, find the smallest canvas that fits all rectangles within
 * those constraints.
 *
 * Uses the maxrects-packer library which implements the MaxRects algorithm
 * for efficient 2D rectangle packing. The algorithm considers multiple free
 * rectangles and chooses the best position for each item based on various
 * heuristics (Best Short Side Fit, Best Long Side Fit, Best Area Fit, etc).
 *
 * With `smart: true` (default), the algorithm automatically shrinks the bin
 * to the minimum dimensions needed, so you get the optimal canvas size.
 *
 * **Important**: This strategy requires calling `prepareForBatch()` with all
 * regions before calling `allocate()`. The allocate() method returns pre-computed
 * positions in the order they were provided to prepareForBatch().
 *
 * Efficiency: ~85-95% for mixed sizes, better than shelf packing for most cases.
 * Time complexity: O(n²) for batch preparation, O(1) for individual allocations.
 *
 * @example
 * ```typescript
 * const packer = new MaxRectsPackingStrategy({ maxWidth: 4096, maxHeight: 4096 });
 *
 * // Must call prepareForBatch with all regions first
 * packer.prepareForBatch([
 *   { width: 100, height: 100 },
 *   { width: 200, height: 150 },
 *   { width: 50, height: 80 }
 * ]);
 *
 * // Now allocate in the same order
 * const region1 = packer.allocate(100, 100);
 * const region2 = packer.allocate(200, 150);
 * const region3 = packer.allocate(50, 80);
 *
 * // Get the smallest canvas size that fits everything
 * const dims = packer.getCanvasDimensions();
 * console.log(`Optimal canvas: ${dims.width}x${dims.height}`);
 * ```
 */
export class MaxRectsPackingStrategy implements BinPackingStrategy {
  private readonly maxWidth: number;
  private readonly maxHeight: number;
  private readonly padding: number;
  private readonly options: {
    smart: boolean;
    pot: boolean;
    square: boolean;
    allowRotation: boolean;
  };

  private packer: MaxRectsPacker | null = null;
  private precomputedRegions: PixiRectangle[] = [];
  private allocationIndex = 0;
  private allocations: Array<{ width: number; height: number }> = [];
  private indexMap: Map<Rectangle, number> = new Map();

  constructor(options: MaxRectsPackingOptions = {}) {
    this.maxWidth = options.maxWidth ?? 4096;
    this.maxHeight = options.maxHeight ?? 4096;
    this.padding = options.padding ?? 1;
    this.options = {
      smart: options.smart ?? true,
      pot: options.pot ?? false,
      square: options.square ?? false,
      allowRotation: options.allowRotation ?? false,
    };
  }

  /**
   * Prepares for batch allocation by packing all regions using MaxRects algorithm.
   * Finds the smallest canvas size that fits all regions within maxWidth/maxHeight constraints.
   * This must be called before allocate() to pre-compute optimal positions.
   *
   * @param regions - Array of {width, height} objects that will be allocated
   * @throws If regions don't fit within maxWidth/maxHeight constraints
   */
  prepareForBatch(regions: Array<{ width: number; height: number }>): void {
    if (regions.length === 0) {
      this.precomputedRegions = [];
      this.allocationIndex = 0;
      return;
    }

    // Create packer with maximum allowed dimensions
    // The 'smart' option ensures the bin is shrunk to the smallest size that fits
    this.packer = new MaxRectsPacker(
      this.maxWidth,
      this.maxHeight,
      this.padding,
      this.options
    );

    // Create Rectangle instances and map them to their original indices
    const rects = regions.map((region, index) => {
      const rect = new Rectangle(region.width, region.height);
      this.indexMap.set(rect, index);
      return rect;
    });

    this.packer.addArray(rects);

    // Check results
    if (this.packer.bins.length === 0) {
      throw new Error('MaxRects packing failed: no bins created');
    }

    if (this.packer.bins.length > 1) {
      throw new Error(
        `Cannot fit all regions within ${this.maxWidth}x${this.maxHeight} constraints. ` +
          `MaxRects created ${this.packer.bins.length} bins. ` +
          `Either increase maxWidth/maxHeight or reduce the number/size of regions.`
      );
    }

    // Extract packed positions from the single bin
    const bin = this.packer.bins[0];
    const packedRects = bin.rects.map((rect) => ({
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
      index: this.indexMap.get(rect) ?? -1,
    }));

    // Sort by original index to maintain allocation order
    packedRects.sort((a, b) => a.index - b.index);

    this.precomputedRegions = packedRects.map(
      (rect) => new PixiRectangle(rect.x, rect.y, rect.width, rect.height)
    );

    this.allocationIndex = 0;
    this.indexMap.clear();
  }

  /**
   * Allocates a rectangular region from pre-computed positions.
   * Must call prepareForBatch() first with all regions.
   *
   * @param width - Width of the region in pixels (must match prepareForBatch order)
   * @param height - Height of the region in pixels (must match prepareForBatch order)
   * @returns Allocated region with x, y, width, height
   * @throws If dimensions are invalid or prepareForBatch wasn't called
   */
  allocate(width: number, height: number): PixiRectangle {
    if (width < 0 || height < 0) {
      throw new Error(
        `Cannot allocate negative dimensions: ${width}x${height}`
      );
    }

    if (this.allocationIndex >= this.precomputedRegions.length) {
      throw new Error(
        'allocate() called more times than regions provided to prepareForBatch(). ' +
          'Ensure you call prepareForBatch() with all regions before allocating.'
      );
    }

    const region = this.precomputedRegions[this.allocationIndex];
    this.allocationIndex++;

    // Verify dimensions match (allowing for rotation if enabled)
    const dimensionsMatch =
      (region.width === width && region.height === height) ||
      (this.options.allowRotation &&
        region.width === height &&
        region.height === width);

    if (!dimensionsMatch) {
      throw new Error(
        `allocate() dimensions ${width}x${height} don't match precomputed region ` +
          `${region.width}x${region.height} at index ${this.allocationIndex - 1}. ` +
          'Ensure allocate() calls match the order and dimensions of prepareForBatch().'
      );
    }

    this.allocations.push({ width, height });

    return region;
  }

  /**
   * Returns the canvas dimensions needed to fit all packed regions.
   * This is the actual bin size determined by the MaxRects algorithm.
   *
   * @returns Object with width and height in pixels
   */
  getCanvasDimensions(): { width: number; height: number } {
    if (!this.packer || this.packer.bins.length === 0) {
      return { width: 0, height: 0 };
    }

    const bin = this.packer.bins[0];
    return {
      width: bin.width,
      height: bin.height,
    };
  }

  /**
   * Returns packing statistics including efficiency and aspect ratio.
   *
   * @returns Packing statistics
   */
  getStats(): PackingStats {
    const dims = this.getCanvasDimensions();
    const totalPixels = dims.width * dims.height;
    const usedPixels = this.allocations.reduce(
      (sum, alloc) => sum + alloc.width * alloc.height,
      0
    );

    return {
      totalAllocated: this.allocations.length,
      canvasWidth: dims.width,
      canvasHeight: dims.height,
      totalPixels,
      usedPixels,
      efficiency: totalPixels > 0 ? usedPixels / totalPixels : 0,
      aspectRatio: dims.height > 0 ? dims.width / dims.height : 0,
    };
  }

  /**
   * Resets to initial state, clearing all allocations and precomputed regions.
   * Call this before starting a new packing session.
   */
  reset(): void {
    this.packer = null;
    this.precomputedRegions = [];
    this.allocationIndex = 0;
    this.allocations = [];
    this.indexMap.clear();
  }
}
