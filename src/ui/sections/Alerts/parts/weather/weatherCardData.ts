/**
 * Weather Card - Data transformation helpers
 */

import { MGData } from "../../../../../modules";
import { MGWeatherNotifier } from "../../../../../features/weatherNotifier";

/**
 * Row type for weather table
 */
export interface WeatherRow {
  weatherId: string;
  weatherName: string;
  spriteId: string | null;
  effects: string;
  isTracked: boolean;
}

/**
 * Get weather name from MGData
 */
function getWeatherName(weatherId: string): string {
  try {
    const weathers = MGData.get("weather") as Record<string, any> | null;
    if (!weathers || typeof weathers !== "object") {
      return weatherId;
    }

    const weatherData = weathers[weatherId];
    if (!weatherData || typeof weatherData !== "object") {
      return weatherId;
    }

    return (weatherData as any).name || weatherId;
  } catch {
    return weatherId;
  }
}

/**
 * Get sprite ID from MGData
 */
function getSpriteId(weatherId: string): string | null {
  try {
    const weathers = MGData.get("weather") as Record<string, any> | null;
    if (!weathers || typeof weathers !== "object") {
      return null;
    }

    const weatherData = weathers[weatherId];
    if (!weatherData || typeof weatherData !== "object") {
      return null;
    }

    return (weatherData as any).spriteId || null;
  } catch {
    return null;
  }
}

/**
 * Get effects description from MGData
 */
function getEffects(weatherId: string): string {
  try {
    const weathers = MGData.get("weather") as Record<string, any> | null;
    if (!weathers || typeof weathers !== "object") {
      return "No effects";
    }

    const weatherData = weathers[weatherId];
    if (!weatherData || typeof weatherData !== "object") {
      return "No effects";
    }

    const mutator = (weatherData as any).mutator;
    if (!mutator || typeof mutator !== "object") {
      return "No effects";
    }

    // Extract mutation ID
    const mutationId = mutator.mutation;
    if (!mutationId) {
      return "No effects";
    }

    // Get mutation name from MGData
    const mutations = MGData.get("mutations") as Record<string, any> | null;
    if (!mutations || typeof mutations !== "object") {
      return mutationId; // Fallback to ID if mutations data not available
    }

    const mutationData = mutations[mutationId];
    if (!mutationData || typeof mutationData !== "object") {
      return mutationId; // Fallback to ID if mutation not found
    }

    return (mutationData as any).name || mutationId;
  } catch {
    return "No effects";
  }
}

/**
 * Build all weather rows from MGData
 */
export function buildAllRows(): WeatherRow[] {
  const weathers = MGData.get("weather") as Record<string, any> | null;
  if (!weathers || typeof weathers !== "object") {
    return [];
  }

  const trackedWeathers = MGWeatherNotifier.getTrackedWeathers();
  const trackedSet = new Set(trackedWeathers);

  const rows: WeatherRow[] = [];

  for (const weatherId of Object.keys(weathers)) {
    // Skip Sunny weather (default weather with no effects)
    if (weatherId === "Sunny") {
      continue;
    }

    const row: WeatherRow = {
      weatherId,
      weatherName: getWeatherName(weatherId),
      spriteId: getSpriteId(weatherId),
      effects: getEffects(weatherId),
      isTracked: trackedSet.has(weatherId),
    };

    rows.push(row);
  }

  // Sort by name
  rows.sort((a, b) => a.weatherName.localeCompare(b.weatherName));

  return rows;
}
