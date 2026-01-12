// src/modules/data/logic/weather.ts
// Weather data extraction from main bundle

import { captureState } from "../state";
import { WEATHER_IDS, MAX_WEATHER_POLL_ATTEMPTS, WEATHER_POLL_INTERVAL_MS } from "./constants";
import { fetchMainBundle, extractBalancedObjectLiteral } from "./bundleParser";

/**
 * Build weather catalog from extracted data
 */
function buildWeather(data: any): Record<string, any> | null {
  const out: Record<string, any> = {};
  let found = false;

  for (const id of WEATHER_IDS) {
    const blueprint = data?.[id];
    if (!blueprint || typeof blueprint !== "object") continue;
    const spriteId = (blueprint as any).iconSpriteKey || null;
    const { iconSpriteKey, ...rest } = blueprint as any;
    out[id] = { weatherId: id, spriteId, ...rest };
    found = true;
  }

  // Add Sunny fallback manually
  if (!out.Sunny) {
    out.Sunny = {
      weatherId: "Sunny",
      name: "Sunny",
      spriteId: "sprite/ui/SunnyIcon",
      type: "primary",
    };
  }

  if (!found) return null;
  if (out.Rain && out.Rain.mutator?.mutation !== "Wet") return null;

  return out;
}

/**
 * Load weather data from main bundle
 */
async function loadWeatherFromBundle(): Promise<boolean> {
  if (captureState.data.weather) return true;

  const bundleText = await fetchMainBundle();
  if (!bundleText) return false;

  let anchor = bundleText.indexOf("fixedTimeSlots:[0,48,96,144,192,240]");
  if (anchor < 0) anchor = bundleText.indexOf('name:"Amber Moon"');
  if (anchor < 0) return false;

  const literal = extractBalancedObjectLiteral(bundleText, anchor);
  if (!literal) return false;

  const fixedLiteral = literal.replace(
    /\b[A-Za-z_$][\w$]*\.(Rain|Frost|Dawn|AmberMoon)\b/g,
    '"$1"'
  );

  let weatherDex: any;
  try {
    weatherDex = Function('"use strict";return(' + fixedLiteral + ")")();
  } catch {
    return false;
  }

  const weatherCatalog = buildWeather(weatherDex);
  if (!weatherCatalog) return false;

  captureState.data.weather = weatherCatalog;
  return true;
}

/**
 * Start polling for weather data
 */
export function startWeatherPolling(): void {
  if (captureState.weatherPollingTimer) return;
  captureState.weatherPollAttempts = 0;

  const timer = setInterval(async () => {
    const success = await loadWeatherFromBundle();
    if (success || ++captureState.weatherPollAttempts > MAX_WEATHER_POLL_ATTEMPTS) {
      clearInterval(timer);
      captureState.weatherPollingTimer = null;
    }
  }, WEATHER_POLL_INTERVAL_MS);

  captureState.weatherPollingTimer = timer;
}

/**
 * Stop weather polling
 */
export function stopWeatherPolling(): void {
  if (captureState.weatherPollingTimer) {
    clearInterval(captureState.weatherPollingTimer);
    captureState.weatherPollingTimer = null;
  }
}
