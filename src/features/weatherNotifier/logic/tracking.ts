/**
 * Weather Notifier - Tracking Logic
 *
 * Detects when tracked weathers appear and triggers notifications
 */

import { getWeather } from "../../../globals/variables/weather";
import { MGAudio } from "../../../modules";
import { CustomSounds } from "../../../modules/audio/customSounds";
import type { NotificationConfig } from "../../../modules/audio/customSounds/types";
import { getTrackedWeathers } from "../state";
import type { Unsubscribe } from "../../../globals/core/types";
import { EVENTS } from "../../../utils/storage";

let unsubscribe: Unsubscribe | null = null;
let lastWeatherId: string = "Sunny";
let isLooping = false;
let loopSoundSource: string | null = null;
let loopConfigKey = "";

function buildLoopConfigKey(config: NotificationConfig): string {
  return `${config.soundId}:${config.volume}:${config.mode}`;
}

function getEffectiveConfig(weatherId: string): NotificationConfig {
  const customSound = CustomSounds.getItemCustomSound("weather", weatherId);
  if (customSound) {
    return {
      soundId: customSound.soundId,
      volume: customSound.volume,
      mode: customSound.mode,
    };
  }

  return MGAudio.CustomSounds.getNotificationConfig("weather");
}

function startLoop(config: NotificationConfig): void {
  if (isLooping) return;

  const sound = MGAudio.CustomSounds.getById(config.soundId);
  if (!sound) return;

  loopSoundSource = sound.source;
  isLooping = true;
  loopConfigKey = buildLoopConfigKey(config);

  try {
    MGAudio.CustomSounds.play(config.soundId, {
      volume: config.volume / 100,
      loop: true,
    });
  } catch {
    isLooping = false;
    loopSoundSource = null;
    loopConfigKey = "";
  }
}

function stopLoop(): void {
  if (!isLooping) return;

  try {
    const handle = MGAudio.getCustomHandle();
    if (!loopSoundSource || (handle && handle.url === loopSoundSource)) {
      MGAudio.CustomSounds.stop();
    }
  } catch {
    // Ignore if audio isn't ready
  }

  isLooping = false;
  loopSoundSource = null;
  loopConfigKey = "";
}

function syncLoop(currentWeatherId: string, config?: NotificationConfig): void {
  const effectiveConfig = config ?? getEffectiveConfig(currentWeatherId);
  if (effectiveConfig.mode !== "loop") {
    if (isLooping) {
      stopLoop();
    }
    return;
  }

  const trackedWeathers = getTrackedWeathers();
  const shouldLoop = trackedWeathers.includes(currentWeatherId);

  if (!shouldLoop) {
    if (isLooping) {
      stopLoop();
    }
    return;
  }

  const nextKey = buildLoopConfigKey(effectiveConfig);
  if (isLooping && nextKey !== loopConfigKey) {
    stopLoop();
  }

  if (!isLooping) {
    startLoop(effectiveConfig);
  }
}

/**
 * Handle manual tracking check (when user adds a weather to track)
 */
function handleManualTrackCheck(event: CustomEvent): void {
  const { weatherId } = event.detail || {};
  if (!weatherId) return;

  const weather = getWeather();
  const currentWeather = weather.get();
  const currentWeatherId = currentWeather.id;
  const config = getEffectiveConfig(weatherId);

  // Check if the manually tracked weather is currently active
  if (currentWeatherId === weatherId) {
    console.log("[WeatherNotifier] Manually tracked weather is currently active:", weatherId);

    // Play notification sound immediately
    if (config.mode === "one-shot") {
      playNotificationSound(config);
    }

    syncLoop(currentWeatherId, config);

    // Emit custom event for UI updates
    const notificationEvent = new CustomEvent("gemini:weather-appeared", {
      detail: { weatherId },
    });
    window.dispatchEvent(notificationEvent);
  }
}

/**
 * Handle tracked weathers list changes (stop/start loop if needed)
 */
function handleTrackedWeathersChange(): void {
  const weather = getWeather();
  const currentWeatherId = weather.get().id;
  syncLoop(currentWeatherId);
}

function handleCustomSoundChange(event: Event): void {
  const customEvent = event as CustomEvent<{
    action: "set" | "remove";
    entityType: string;
    entityId: string;
  }>;

  if (customEvent.detail?.entityType !== "weather") return;
  const weather = getWeather();
  const currentWeatherId = weather.get().id;
  syncLoop(currentWeatherId);
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
  window.addEventListener("gemini:tracked-weathers-changed", handleTrackedWeathersChange as EventListener);
  window.addEventListener(EVENTS.CUSTOM_SOUND_CHANGE, handleCustomSoundChange as EventListener);

  const config = getEffectiveConfig(currentWeather.id);
  syncLoop(currentWeather.id, config);

  // Subscribe to weather changes (subscribeStable only triggers on significant changes)
  unsubscribe = weather.subscribeStable((event) => {
    const newWeatherId = event.current.id;
    const prevWeatherId = event.previous.id;
    const notificationConfig = getEffectiveConfig(newWeatherId);

    console.log("[WeatherNotifier] Weather changed:", {
      previous: prevWeatherId,
      current: newWeatherId,
    });

    syncLoop(newWeatherId, notificationConfig);

    // Check if the new weather is tracked
    if (newWeatherId !== prevWeatherId) {
      const trackedWeathers = getTrackedWeathers();

      if (trackedWeathers.includes(newWeatherId)) {
        console.log("[WeatherNotifier] Tracked weather detected:", newWeatherId);

        // Play notification sound
        if (notificationConfig.mode === "one-shot") {
          playNotificationSound(notificationConfig);
        }

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
  window.removeEventListener("gemini:tracked-weathers-changed", handleTrackedWeathersChange as EventListener);
  window.removeEventListener(EVENTS.CUSTOM_SOUND_CHANGE, handleCustomSoundChange as EventListener);

  if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
    lastWeatherId = "Sunny";
    stopLoop();
    console.log("[WeatherNotifier] Tracking stopped");
  }
}

/**
 * Play notification sound
 */
function playNotificationSound(config: NotificationConfig): void {
  try {
    MGAudio.CustomSounds.play(config.soundId, { volume: config.volume / 100 });
  } catch (error) {
    console.warn("[WeatherNotifier] Failed to play notification sound:", error);
  }
}
