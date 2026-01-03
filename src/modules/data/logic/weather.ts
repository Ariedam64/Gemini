// src/modules/data/logic/weather.ts
// Weather data extraction from main bundle

import { pageWindow } from "../../../utils/windowContext";
import { captureState } from "../state";
import { WEATHER_IDS, MAIN_BUNDLE_PATTERN, MAX_WEATHER_POLL_ATTEMPTS, WEATHER_POLL_INTERVAL_MS } from "./constants";

const pageContext = pageWindow as Window & typeof globalThis;

/**
 * Find main bundle URL from scripts or performance entries
 */
function findMainBundleUrl(): string | null {
  try {
    for (const script of pageContext.document?.scripts || []) {
      const src = script?.src ? String(script.src) : "";
      if (MAIN_BUNDLE_PATTERN.test(src)) return src;
    }
  } catch { }

  try {
    for (const entry of pageContext.performance?.getEntriesByType?.("resource") || []) {
      const name = entry?.name ? String(entry.name) : "";
      if (MAIN_BUNDLE_PATTERN.test(name)) return name;
    }
  } catch { }

  return null;
}

/**
 * Extract balanced object literal from text starting at anchor index
 */
function extractBalancedObjectLiteral(text: string, anchorIndex: number): string | null {
  const declStart = Math.max(
    text.lastIndexOf("const ", anchorIndex),
    text.lastIndexOf("let ", anchorIndex),
    text.lastIndexOf("var ", anchorIndex)
  );
  if (declStart < 0) return null;

  const eq = text.indexOf("=", declStart);
  if (eq < 0 || eq > anchorIndex) return null;

  const braceStart = text.indexOf("{", eq);
  if (braceStart < 0 || braceStart > anchorIndex) return null;

  let depth = 0;
  let quote = "";
  let escaped = false;

  for (let i = braceStart; i < text.length; i++) {
    const ch = text[i];

    if (quote) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (ch === "\\") {
        escaped = true;
        continue;
      }
      if (ch === quote) quote = "";
      continue;
    }

    if (ch === '"' || ch === "'") {
      quote = ch;
      continue;
    }
    if (ch === "{") depth++;
    else if (ch === "}" && --depth === 0) return text.slice(braceStart, i + 1);
  }

  return null;
}

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

  const url = findMainBundleUrl();
  if (!url) return false;

  let bundleText = "";
  try {
    const res = await fetch(url, { credentials: "include" });
    if (!res.ok) return false;
    bundleText = await res.text();
  } catch {
    return false;
  }

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
