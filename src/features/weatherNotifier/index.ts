/**
 * Weather Notifier Feature
 *
 * Tracks specific weather conditions and provides audio notifications
 * when they appear in the game.
 */

import { isEnabled, setEnabled, getTrackedWeathers, addTrackedWeather, removeTrackedWeather, isWeatherTracked } from "./state";
import { initTracking, stopTracking } from "./logic/tracking";

let initialized = false;

/**
 * Handle tracked weathers changes and reinit if needed
 */
function handleTrackedWeathersChange(event: CustomEvent): void {
  const { shouldReinit } = event.detail || {};

  if (shouldReinit) {
    console.log("[WeatherNotifier] Config changed, reinitializing...");
    destroy();
    init();
  }
}

/**
 * Initialize the weather notifier feature
 */
function init(): void {
  if (initialized) {
    console.log("[WeatherNotifier] Already initialized");
    return;
  }

  initialized = true;

  // Always listen to config changes (even if disabled)
  window.addEventListener("gemini:tracked-weathers-changed", handleTrackedWeathersChange as EventListener);

  if (!isEnabled()) {
    console.log("[WeatherNotifier] Disabled (waiting for tracked weathers)");
    return;
  }

  console.log("[WeatherNotifier] Initializing");

  // Start tracking weather changes
  initTracking();

  console.log("[WeatherNotifier] Initialized");
}

/**
 * Destroy the weather notifier feature
 */
function destroy(): void {
  if (!initialized) return;

  console.log("[WeatherNotifier] Destroying");

  // Stop listening to config changes
  window.removeEventListener("gemini:tracked-weathers-changed", handleTrackedWeathersChange as EventListener);

  stopTracking();
  initialized = false;

  console.log("[WeatherNotifier] Destroyed");
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
export const MGWeatherNotifier = {
  // Lifecycle
  init,
  destroy,
  isReady,

  // Configuration
  isEnabled,
  setEnabled,

  // Tracking
  getTrackedWeathers,
  addTrackedWeather,
  removeTrackedWeather,
  isWeatherTracked,
};

export type WeatherNotifier = typeof MGWeatherNotifier;
