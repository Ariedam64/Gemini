import type { Application } from 'pixi.js';
import { ExtensionType } from 'pixi.js';
import { getRiveRuntime } from '@/utils/rive-utils';
import { RiveSpriteBatchRenderer } from './RiveSpriteBatchRenderer';

/**
 * PixiJS Application plugin that manages the RiveSpriteBatchRenderer lifecycle.
 *
 * This plugin automatically initializes the batch renderer when the Application
 * is created and cleans it up when destroyed. This is preferable to a singleton
 * pattern as it plays nicely with Vite HMR - each new Application gets a fresh
 * renderer instance.
 *
 * @example
 * ```typescript
 * // Register the plugin (once, before creating any Application)
 * import { extensions } from 'pixi.js';
 * extensions.add(RiveSpriteBatchRendererPlugin);
 *
 * // Then in your app:
 * const app = new Application();
 * await app.init({ ... });
 *
 * // Access the renderer via the app instance:
 * app.riveSpriteBatchRenderer.flushAll();
 * ```
 */
export const RiveSpriteBatchRendererPlugin = {
  extension: ExtensionType.Application,

  /**
   * Initializes the RiveSpriteBatchRenderer and attaches it to the Application.
   * Called automatically when `app.init()` is invoked.
   */
  init(this: Application): void {
    const rive = getRiveRuntime();
    const renderer = new RiveSpriteBatchRenderer(rive);
    Object.defineProperty(this, 'riveSpriteBatchRenderer', {
      value: renderer,
      writable: false,
      configurable: true,
    });
  },

  /**
   * Cleans up the RiveSpriteBatchRenderer when the Application is destroyed.
   * Called automatically when `app.destroy()` is invoked.
   */
  destroy(this: Application): void {
    this.riveSpriteBatchRenderer?.destroy();
  },
};

// Type augmentation for Application to include riveSpriteBatchRenderer
declare module 'pixi.js' {
  interface Application {
    riveSpriteBatchRenderer: RiveSpriteBatchRenderer;
  }
}
