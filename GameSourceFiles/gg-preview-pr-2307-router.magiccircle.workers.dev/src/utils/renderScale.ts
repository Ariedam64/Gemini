import { useSyncExternalStore } from 'react';
import { isDesktopMode } from '@/environment';

/**
 * All supported render scale values. Options shown to users are filtered
 * based on device DPI.
 */
const ALL_RENDER_SCALE_OPTIONS = [1, 1.25, 1.5, 1.75, 2] as const;

type RenderScaleValue = (typeof ALL_RENDER_SCALE_OPTIONS)[number];

/**
 * Returns the device's pixel ratio (DPI scaling factor).
 * Falls back to 1 if unavailable.
 */
function getDeviceDPI(): number {
  return window.devicePixelRatio || 1;
}

/**
 * Computes the render scale that 'auto' mode should resolve to.
 *
 * - Mobile devices with DPI >= 2: use 1.5 (battery/performance optimization)
 * - Otherwise: use 2, capped at the device's actual DPI
 */
function resolveAutoRenderScale(isMobile: boolean, dpi: number): number {
  if (isMobile && dpi >= 2) {
    return 1.5;
  }
  return Math.min(2, dpi);
}

/**
 * Returns the list of render scale options available for the given DPI.
 * Only includes options up to and including the device's DPI.
 */
function getAvailableRenderScaleOptions(dpi: number): RenderScaleValue[] {
  return ALL_RENDER_SCALE_OPTIONS.filter((scale) => scale <= dpi);
}

/**
 * Subscribes to DPI changes (e.g., when moving window between monitors).
 * Uses matchMedia to detect devicePixelRatio changes.
 */
function subscribeToDPIChanges(callback: () => void): () => void {
  const mediaQuery = window.matchMedia(
    `(resolution: ${window.devicePixelRatio}dppx)`
  );
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

export interface RenderScaleConfig {
  /** Current device DPI */
  deviceDPI: number;
  /** Available render scale options for this device */
  availableRenderScales: RenderScaleValue[];
  /** What 'auto' mode resolves to on this device */
  autoResolvedScale: number;
}

/**
 * Hook that provides render scale configuration based on device DPI.
 * Automatically updates when DPI changes (e.g., moving between monitors).
 */
export function useRenderScaleConfig(): RenderScaleConfig {
  const deviceDPI = useSyncExternalStore(
    subscribeToDPIChanges,
    getDeviceDPI,
    () => 1 // Server-side fallback
  );

  const isMobile = !isDesktopMode;

  return {
    deviceDPI,
    availableRenderScales: getAvailableRenderScaleOptions(deviceDPI),
    autoResolvedScale: resolveAutoRenderScale(isMobile, deviceDPI),
  };
}

/**
 * Resolves a render scale preference to an actual numeric value.
 * Handles both 'auto' mode and explicit numeric values.
 */
export function resolveRenderScalePreference(
  preference: 'auto' | number
): number {
  if (preference === 'auto') {
    const dpi = getDeviceDPI();
    const isMobile = !isDesktopMode;
    return resolveAutoRenderScale(isMobile, dpi);
  }
  return preference;
}
