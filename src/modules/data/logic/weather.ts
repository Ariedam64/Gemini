// src/modules/data/logic/weather.ts
// Weather data extraction from main bundle

import { captureState } from "../state";
import { WEATHER_IDS, MAX_WEATHER_POLL_ATTEMPTS, WEATHER_POLL_INTERVAL_MS } from "./constants";
import { fetchMainBundle, extractBalancedBlock, extractBalancedObjectLiteral } from "./bundleParser";

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
 * Extract weather object from bundle by finding the Rain:{ pattern
 * This ensures we get the complete weather catalog object, not just a nested object
 */
function extractWeatherObject(text: string, anchorPos: number): string | null {
  // Search backward for "Rain:{" which should be the start of the weather catalog
  const searchStart = Math.max(0, anchorPos - 3000);
  const searchArea = text.substring(searchStart, anchorPos);

  const rainPattern = /Rain:\{/;
  const match = searchArea.match(rainPattern);
  if (!match || match.index === undefined) return null;

  const rainStart = searchStart + match.index;

  // Find the opening brace before "Rain" (should be just before Rain:)
  let objStart = -1;
  for (let i = rainStart - 1; i >= Math.max(0, rainStart - 200); i--) {
    if (text[i] === "{") {
      objStart = i;
      break;
    }
  }

  if (objStart < 0) return null;

  // Extract the balanced block starting from the opening brace
  return extractBalancedBlock(text, objStart);
}

function normalizeWeatherLiteral(literal: string): string {
  return literal
    .replace(/\$t\.(Rain|Frost|Dawn|AmberMoon)\b/g, '"$1"')
    .replace(/\b[A-Za-z_$][\w$]*\.(Rain|Frost|Dawn|AmberMoon)\b/g, '"$1"');
}

/**
 * Load weather data from main bundle
 */
async function loadWeatherFromBundle(): Promise<boolean> {
  if (captureState.data.weather) return true;

  const bundleText = await fetchMainBundle();
  if (!bundleText) return false;

  let anchor = bundleText.indexOf("mutator");
  if (anchor < 0) anchor = bundleText.indexOf('name:"Amber Moon"');
  if (anchor < 0) return false;

  const literal =
    extractBalancedObjectLiteral(bundleText, anchor) ??
    extractWeatherObject(bundleText, anchor);
  if (!literal) return false;

  // Normalize weather enum references to string literals
  const fixedLiteral = normalizeWeatherLiteral(literal);

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
