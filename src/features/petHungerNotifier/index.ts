/**
 * Pet Hunger Notifier Feature
 *
 * Tracks active pet hunger levels and provides audio notifications
 * when they fall below the configured threshold.
 */

import { isEnabled, setEnabled, getThreshold, setThreshold } from './state';
import { initTracking, stopTracking } from './logic/tracking';

let initialized = false;

/**
 * Handle config changes and reinit if needed
 */
function handleConfigChange(event: CustomEvent): void {
  const { shouldReinit } = event.detail || {};

  if (shouldReinit) {
    console.log('[PetHungerNotifier] Config changed, reinitializing...');
    destroy();
    init();
  }
}

/**
 * Initialize the pet hunger notifier feature
 */
function init(): void {
  if (initialized) {
    console.log('[PetHungerNotifier] Already initialized');
    return;
  }

  initialized = true;

  // Always listen to config changes (even if disabled)
  window.addEventListener('gemini:pet-hunger-config-changed', handleConfigChange as EventListener);

  if (!isEnabled()) {
    console.log('[PetHungerNotifier] Disabled');
    return;
  }

  console.log('[PetHungerNotifier] Initializing');

  // Start tracking pet hunger
  initTracking();

  console.log('[PetHungerNotifier] Initialized');
}

/**
 * Destroy the pet hunger notifier feature
 */
function destroy(): void {
  if (!initialized) return;

  console.log('[PetHungerNotifier] Destroying');

  // Stop listening to config changes
  window.removeEventListener('gemini:pet-hunger-config-changed', handleConfigChange as EventListener);

  stopTracking();
  initialized = false;

  console.log('[PetHungerNotifier] Destroyed');
}

/**
 * Check if the feature is ready
 */
function isReady(): boolean {
  return initialized;
}

/**
 * Public API
 */
export const MGPetHungerNotifier = {
  // Lifecycle
  init,
  destroy,
  isReady,

  // Configuration
  isEnabled,
  setEnabled,
  getThreshold,
  setThreshold,
};

export type PetHungerNotifier = typeof MGPetHungerNotifier;
