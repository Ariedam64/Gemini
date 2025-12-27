import { isWebGLSupported } from 'pixi.js';

/**
 * Checks if WebGL is supported by the browser.
 *
 * @returns {boolean} True if WebGL is supported, false otherwise.
 */
export function checkWebGLSupport(): boolean {
  return isWebGLSupported();
}
