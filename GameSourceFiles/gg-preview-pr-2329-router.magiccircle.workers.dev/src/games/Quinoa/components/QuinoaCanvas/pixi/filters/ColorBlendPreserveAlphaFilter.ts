import { BlendModeFilter, hslgl, hslgpu } from 'pixi.js';

/**
 * Color Blend filter with alpha preservation.
 *
 * Based on PixiJS's ColorBlend but preserves the base layer's alpha channel instead
 * of using `blendedAlpha`. This prevents transparent pixels from becoming black when
 * blending with a gradient overlay.
 *
 * **How it works:**
 * - Takes hue/saturation from the top layer (e.g., rainbow gradient)
 * - Takes luminosity from the bottom layer (base sprite)
 * - **Preserves alpha from the bottom layer** (key difference from standard ColorBlend)
 *
 * **Use case:**
 * Perfect for applying rainbow/gradient effects to sprites while maintaining their
 * original transparency and shadow details.
 *
 * @example
 * ```typescript
 * const sprite = new Sprite(baseTexture);
 * const gradient = new Graphics();
 * gradient.fill(rainbowGradient);
 * gradient.filters = [new ColorBlendPreserveAlphaFilter()];
 * container.addChild(sprite, gradient);
 * ```
 *
 * @see {@link https://github.com/pixijs/pixijs/blob/dev/src/advanced-blend-modes/ColorBlend.ts Original ColorBlend implementation}
 */
export class ColorBlendPreserveAlphaFilter extends BlendModeFilter {
  constructor() {
    super({
      gl: {
        functions: `
                ${hslgl}

                vec3 blendColor(vec3 base, vec3 blend, float opacity) {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,
        main: `
                // Use back.a (base alpha) instead of blendedAlpha to preserve transparency
                finalColor = vec4(blendColor(back.rgb, front.rgb, front.a), back.a) * uBlend;
                `,
      },
      gpu: {
        functions: `
                ${hslgpu}

                fn blendColorOpacity(base:vec3<f32>, blend:vec3<f32>, opacity:f32) -> vec3<f32> {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,
        main: `
                // Use back.a (base alpha) instead of blendedAlpha to preserve transparency
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), back.a) * blendUniforms.uBlend;
                `,
      },
    });
  }
}
