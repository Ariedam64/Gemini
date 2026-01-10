import { isWebGLSupported } from 'pixi.js';

/**
 * Checks if WebGL is supported by the browser.
 *
 * @returns {boolean} True if WebGL is supported, false otherwise.
 */
export function checkWebGLSupport(): boolean {
  return isWebGLSupported();
}

let _supportsOffscreenWebGL: boolean | undefined;

/**
 * Checks if OffscreenCanvas is supported AND supports WebGL context. iOS 16.4+
 * implemented OffscreenCanvas but without WebGL support (only 2d).
 *
 * @returns {boolean} True if OffscreenCanvas supports WebGL/WebGL2
 */
export function supportsOffscreenWebGL(): boolean {
  if (typeof _supportsOffscreenWebGL !== 'undefined') {
    return _supportsOffscreenWebGL;
  }

  if (typeof OffscreenCanvas === 'undefined') {
    _supportsOffscreenWebGL = false;
    return false;
  }

  try {
    const canvas = new OffscreenCanvas(1, 1);
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    _supportsOffscreenWebGL = !!gl;
  } catch {
    _supportsOffscreenWebGL = false;
  }

  return _supportsOffscreenWebGL;
}

/**
 * Creates an OffscreenCanvas if supported (and supports WebGL), otherwise
 * creates a standard HTMLCanvasElement. This is useful for environments like
 * iOS 16.4+ where OffscreenCanvas exists but lacks WebGL support.
 *
 * @param width - The width of the canvas
 * @param height - The height of the canvas
 * @returns An OffscreenCanvas or HTMLCanvasElement
 */
export function createOffscreenCanvas(
  width: number,
  height: number
): OffscreenCanvas | HTMLCanvasElement {
  if (supportsOffscreenWebGL()) {
    return new OffscreenCanvas(width, height);
  }
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}
