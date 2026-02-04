/**
 * Build mode detection
 * @internal
 */
declare const __BUILD_MODE__: 'dev' | 'prod';

export function isDevBuild(): boolean {
  return __BUILD_MODE__ === 'dev';
}

export function isProdBuild(): boolean {
  return __BUILD_MODE__ === 'prod';
}
