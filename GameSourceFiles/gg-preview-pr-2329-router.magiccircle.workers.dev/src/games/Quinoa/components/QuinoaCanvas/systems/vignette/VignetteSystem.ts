import { type Application, Container, Sprite, Texture } from 'pixi.js';
import type { QuinoaFrameContext, QuinoaSystem } from '../../interfaces';

/** Height of the 1-pixel wide gradient strip. */
const GRADIENT_HEIGHT = 64;

/** Vignette color (dark blue-ish). */
const VIGNETTE_COLOR = { r: 12, g: 13, b: 28 };

/** Maximum alpha at the edges (0-1). */
const EDGE_ALPHA = 0.4;

/** How much of the screen edge is affected (0-1). */
const EDGE_SIZE = 0.15;

/**
 * Renders a screen-space vignette overlay that darkens the top and bottom edges.
 *
 * Uses a simple 1-pixel wide vertical gradient texture that tiles horizontally.
 * This is extremely efficient: only 64 bytes of texture data, stretched to fill the screen.
 */
export class VignetteSystem implements QuinoaSystem {
  public readonly name = 'vignette';

  private app: Application;
  private container: Container;
  private sprite: Sprite;
  private texture: Texture | null = null;

  private lastWidth = 0;
  private lastHeight = 0;

  constructor(app: Application, parentContainer: Container) {
    this.app = app;

    this.container = new Container();
    this.container.label = 'Vignette';

    // Create the 1-pixel wide gradient texture once
    this.texture = this.createGradientTexture();

    this.sprite = new Sprite(this.texture);
    this.sprite.label = 'VignetteSprite';
    this.container.addChild(this.sprite);

    parentContainer.addChild(this.container);
  }

  /**
   * Creates a 1-pixel wide vertical gradient texture.
   * Dark at top and bottom, transparent in the middle.
   */
  private createGradientTexture(): Texture {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = GRADIENT_HEIGHT;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('[VignetteSystem] Failed to get 2D context');
    }

    const { r, g, b } = VIGNETTE_COLOR;
    const edgePixels = Math.floor(GRADIENT_HEIGHT * EDGE_SIZE);

    // Draw vertical gradient: dark at edges, transparent in middle
    for (let y = 0; y < GRADIENT_HEIGHT; y++) {
      let alpha = 0;

      if (y < edgePixels) {
        // Top edge: fade from dark to transparent
        alpha = EDGE_ALPHA * (1 - y / edgePixels);
      } else if (y >= GRADIENT_HEIGHT - edgePixels) {
        // Bottom edge: fade from transparent to dark
        alpha =
          EDGE_ALPHA * ((y - (GRADIENT_HEIGHT - edgePixels)) / edgePixels);
      }

      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      ctx.fillRect(0, y, 1, 1);
    }

    return Texture.from(canvas);
  }

  draw(_context: QuinoaFrameContext): void {
    const { width, height } = this.app.renderer;

    if (width !== this.lastWidth || height !== this.lastHeight) {
      // Just resize the sprite - texture stays the same
      this.sprite.setSize(width, height);
      this.lastWidth = width;
      this.lastHeight = height;
    }
  }

  destroy(): void {
    this.texture?.destroy(true);
    this.texture = null;
    this.container.destroy({ children: true });
  }
}
