/**
 * Crop Value Indicator Feature
 * Displays coin value for crops in the game
 */

import { storageGet, storageSet } from '../../utils/storage';
import { DEFAULT_CONFIG, STORAGE_KEY } from './types';
import type { CropValueIndicatorConfig } from './types';
import * as Core from './logic/core';

let initialized = false;

/**
 * Initialize the crop value indicator
 */
export function init(): void {
  if (initialized) {
    console.log('[CropValueIndicator] Already initialized');
    return;
  }

  const config = loadConfig();
  if (!config.enabled) {
    console.log('[CropValueIndicator] Disabled');
    return;
  }

  initialized = true;
  console.log('[CropValueIndicator] Initializing...');

  // Start monitoring plant info changes
  Core.startMonitoring();

  console.log('[CropValueIndicator] Initialized successfully');
}

/**
 * Cleanup and destroy the feature
 */
export function destroy(): void {
  if (!initialized) return;

  console.log('[CropValueIndicator] Destroying...');

  // Stop monitoring
  Core.stopMonitoring();

  initialized = false;
  console.log('[CropValueIndicator] Destroyed');
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
    console.log(`[CropValueIndicator] Already ${enabled ? 'enabled' : 'disabled'}`);
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

  console.log(`[CropValueIndicator] ${enabled ? 'Enabled' : 'Disabled'}`);
}

/**
 * Load configuration from storage
 */
function loadConfig(): CropValueIndicatorConfig {
  return storageGet<CropValueIndicatorConfig>(STORAGE_KEY, DEFAULT_CONFIG);
}

/**
 * Save configuration to storage
 */
function saveConfig(config: CropValueIndicatorConfig): void {
  storageSet(STORAGE_KEY, config);
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
};

export type { CropValueIndicatorConfig } from './types';
