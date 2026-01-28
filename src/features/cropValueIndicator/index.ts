/**
 * Crop Value Indicator Feature
 * Displays coin value for crops in the game (console logging + DOM injection)
 */

import * as Core from './logic/core';
import { render } from './render';
import { loadConfig, saveConfig } from './state';
import type { CropValueIndicatorConfig } from './types';

let initialized = false;

/**
 * Initialize the crop value indicator
 */
export function init(): void {
  if (initialized) {
    return;
  }

  const config = loadConfig();
  if (!config.enabled) {
    return;
  }

  initialized = true;

  // Start monitoring plant info changes (console logging)
  Core.startMonitoring();
}

/**
 * Cleanup and destroy the feature
 */
export function destroy(): void {
  if (!initialized) return;

  // Stop monitoring
  Core.stopMonitoring();

  initialized = false;
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
}

/**
 * Public API
 */
export const MGCropValueIndicator = {
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

export type { CropValueIndicatorConfig } from './types';
