/**
 * Crop Size Indicator Feature
 * Displays crop size percentage in mature crop tooltips
 */

import { render } from './render';
import { loadConfig, saveConfig } from './state';
import type { CropSizeIndicatorConfig } from './types';

let initialized = false;

/**
 * Initialize the crop size indicator
 */
export function init(): void {
  if (initialized) {
    console.log('[CropSizeIndicator] Already initialized');
    return;
  }

  const config = loadConfig();
  if (!config.enabled) {
    console.log('[CropSizeIndicator] Disabled');
    return;
  }

  initialized = true;
  console.log('[CropSizeIndicator] Initializing...');

  // Start DOM injection
  render.init();

  console.log('[CropSizeIndicator] Initialized successfully');
}

/**
 * Cleanup and destroy the feature
 */
export function destroy(): void {
  if (!initialized) return;

  console.log('[CropSizeIndicator] Destroying...');

  // Stop DOM injection
  render.destroy();

  initialized = false;
  console.log('[CropSizeIndicator] Destroyed');
}

/**
 * Check if feature is initialized and ready
 */
export function isReady(): boolean {
  return initialized;
}

/**
 * Check if feature is enabled in config
 */
export function isEnabled(): boolean {
  const config = loadConfig();
  return config.enabled;
}

/**
 * Enable or disable the feature
 * @param enabled - true to enable, false to disable
 */
export function setEnabled(enabled: boolean): void {
  const config = loadConfig();

  if (config.enabled === enabled) {
    console.log(`[CropSizeIndicator] Already ${enabled ? 'enabled' : 'disabled'}`);
    return;
  }

  // Update config
  config.enabled = enabled;
  saveConfig(config);

  // Apply changes
  if (enabled) {
    init();
  } else {
    destroy();
  }

  console.log(`[CropSizeIndicator] ${enabled ? 'Enabled' : 'Disabled'}`);
}

/**
 * Public API
 */
export const MGCropSizeIndicator = {
  // Lifecycle
  init,
  destroy,

  // Status
  isReady,
  isEnabled,
  setEnabled,

  // QOL Rendering (DOM injection)
  render,
};

export type { CropSizeIndicatorConfig } from './types';
