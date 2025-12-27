import { Color, ColorMatrixFilter, type ColorSource } from 'pixi.js';

/**
 * A ColorMatrixFilter that replaces all pixels with a solid color while preserving
 * the original alpha channel. Opacity can be controlled via the filter's alpha property.
 *
 * This approach gives a uniform solid color effect, unlike sprite.tint() which
 * multiplies colors (causing dark pixels to stay dark).
 *
 * **How it works:**
 * - ColorMatrixFilter uses a 5x4 matrix where each row defines an output channel
 * - Row format: `[R_mult, G_mult, B_mult, A_mult, constant_offset]`
 * - By zeroing the multipliers and using constant offsets, we replace RGB values
 * - The alpha row preserves the original transparency by multiplying by 1
 * - The filter's `alpha` property then controls overall opacity
 *
 * **Use case:**
 * Perfect for applying solid color tints to sprites (e.g., gold mutation, frozen effect)
 * while maintaining their original transparency and details.
 *
 * @example
 * ```typescript
 * // Gold tint at 70% opacity
 * const goldFilter = new ColorOverlayFilter({ color: 0xFFD700, alpha: 0.7 });
 * sprite.filters = [goldFilter];
 * ```
 *
 * @example
 * ```typescript
 * // Semi-transparent blue overlay
 * const blueFilter = new ColorOverlayFilter({ color: 0x0000FF, alpha: 0.5 });
 * sprite.filters = [blueFilter];
 * ```
 */
export class ColorOverlayFilter extends ColorMatrixFilter {
  constructor({ color, alpha }: { color: ColorSource; alpha?: number }) {
    super();

    const { red, green, blue } = new Color(color);

    // ColorMatrix format: [R_in, G_in, B_in, A_in, offset] for each output channel
    // We zero out input multipliers and use offsets to replace RGB with constant values

    // biome-ignore format: don't mess with my matrix!
    this.matrix = [
      0, 0, 0, 0, red,
      0, 0, 0, 0, green,
      0, 0, 0, 0, blue,
      0, 0, 0, 1, 0, // Preserve original alpha
    ];

    this.alpha = alpha ?? 1;
  }
}
