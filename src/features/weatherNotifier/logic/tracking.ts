/**
 * Weather Notifier - Tracking Logic
 *
 * Detects when tracked weathers appear and triggers notifications
 */

import { getWeather } from "../../../globals/variables/weather";
import { MGAudio } from "../../../modules";
import { getTrackedWeathers } from "../state";
import type { Unsubscribe } from "../../../globals/core/types";

let unsubscribe: Unsubscribe | null = null;
let lastWeatherId: string = "Sunny";

/**
 * Handle manual tracking check (when user adds a weather to track)
 */
function handleManualTrackCheck(event: CustomEvent): void {
  const { weatherId } = event.detail || {};
  if (!weatherId) return;

  const weather = getWeather();
  const currentWeather = weather.get();
  const currentWeatherId = currentWeather.id;

  // Check if the manually tracked weather is currently active
  if (currentWeatherId === weatherId) {
    console.log("[WeatherNotifier] Manually tracked weather is currently active:", weatherId);

    // Play notification sound immediately
    playNotificationSound();

    // Emit custom event for UI updates
    const notificationEvent = new CustomEvent("gemini:weather-appeared", {
      detail: { weatherId },
    });
    window.dispatchEvent(notificationEvent);
  }
}

/**
 * Initialize weather tracking
 */
export function initTracking(): void {
  if (unsubscribe) {
    console.log("[WeatherNotifier] Already tracking");
    return;
  }

  const weather = getWeather();
  const currentWeather = weather.get();

  // Store initial weather ID to avoid false notification on init
  lastWeatherId = currentWeather.id;

  console.log("[WeatherNotifier] Starting tracking, initial weather:", lastWeatherId);

  // Listen to manual tracking checks
  window.addEventListener("gemini:weather-tracked-check", handleManualTrackCheck as EventListener);

  // Subscribe to weather changes (subscribeStable only triggers on significant changes)
  unsubscribe = weather.subscribeStable((event) => {
    const newWeatherId = event.current.id;
    const prevWeatherId = event.previous.id;

    console.log("[WeatherNotifier] Weather changed:", {
      previous: prevWeatherId,
      current: newWeatherId,
    });

    // Check if the new weather is tracked
    if (newWeatherId !== prevWeatherId) {
      const trackedWeathers = getTrackedWeathers();

      if (trackedWeathers.includes(newWeatherId)) {
        console.log("[WeatherNotifier] Tracked weather detected:", newWeatherId);

        // Play notification sound
        playNotificationSound();

        // Emit custom event for UI updates
        const notificationEvent = new CustomEvent("gemini:weather-appeared", {
          detail: { weatherId: newWeatherId },
        });
        window.dispatchEvent(notificationEvent);
      }
    }

    lastWeatherId = newWeatherId;
  });

  console.log("[WeatherNotifier] Tracking initialized");
}

/**
 * Stop weather tracking
 */
export function stopTracking(): void {
  // Remove manual tracking check listener
  window.removeEventListener("gemini:weather-tracked-check", handleManualTrackCheck as EventListener);

  if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
    lastWeatherId = "Sunny";
    console.log("[WeatherNotifier] Tracking stopped");
  }
}

/**
 * Play notification sound
 */
function playNotificationSound(): void {
  try {
    MGAudio.CustomSounds.play("default-notification");
  } catch (error) {
    console.warn("[WeatherNotifier] Failed to play notification sound:", error);
  }
}
