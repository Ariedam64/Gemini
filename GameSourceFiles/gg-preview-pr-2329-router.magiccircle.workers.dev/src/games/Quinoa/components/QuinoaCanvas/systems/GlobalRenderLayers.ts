import { RenderLayer } from 'pixi.js';

/**
 * A simple registry for global render layers that need to be accessed
 * by deeply nested components without prop-drilling or circular dependencies.
 */
export class GlobalRenderLayers {
  private static _aboveGround: RenderLayer | null = null;

  static set aboveGround(layer: RenderLayer | null) {
    this._aboveGround = layer;
  }

  static get aboveGround(): RenderLayer | null {
    return this._aboveGround;
  }
}
