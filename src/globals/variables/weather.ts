import { Store } from "../../atoms/store";
import type {
  WeatherGlobal,
  WeatherData,
  WeatherChangeEvent,
  SubscribeOptions,
  Unsubscribe,
} from "../core/types";
import { MGData } from "../../modules";

// Atom returns just the weather ID (string) or null when it's Sunny
type WeatherId = string | null;

function buildData(weatherId: string | null): WeatherData {
  // If weatherId is null, it's Sunny (default weather)
  const id = weatherId || "Sunny";

  // Fetch weather data from MGData
  type WeatherEntry = { name?: string }
  const weathers = MGData.get("weather") as Record<string, WeatherEntry> | null;
  const weatherData = weathers?.[id];

  const name = weatherData?.name || id;

  return {
    id,
    name,
    isActive: id !== "Sunny",
    type: id,
    startTime: null,
    endTime: null,
    remainingSeconds: 0,
  };
}

function getInitialData(): WeatherData {
  return buildData(null);
}

type ListenerSets = {
  all: Set<(value: WeatherData, prev: WeatherData) => void>;
  stable: Set<(event: WeatherChangeEvent) => void>;
};

function createWeatherGlobal(): WeatherGlobal {
  let currentData: WeatherData = getInitialData();
  let previousData: WeatherData = getInitialData();
  let lastRawWeather: WeatherId = null;
  let initialized = false;
  let unsubscribe: Unsubscribe | null = null;

  const listeners: ListenerSets = {
    all: new Set(),
    stable: new Set(),
  };

  function notify(raw: WeatherId): void {
    // Atom returns the weather ID (string) or null for Sunny
    // Check if the atom changed (compare IDs, null = Sunny)
    const atomChanged = (raw || "Sunny") !== (lastRawWeather || "Sunny");

    lastRawWeather = raw;

    const nextData = buildData(raw);

    // Determine if the ID changed (for subscribeStable)
    const idChanged = currentData.id !== nextData.id;

    // Update the data
    previousData = currentData;
    currentData = nextData;

    if (!initialized) return;

    // subscribe: emits on every atom change
    if (atomChanged) {
      for (const cb of listeners.all) {
        cb(currentData, previousData);
      }
    }

    // subscribeStable: emits only when ID changes
    if (idChanged) {
      const event: WeatherChangeEvent = {
        current: currentData,
        previous: previousData,
      };
      for (const cb of listeners.stable) {
        cb(event);
      }
    }
  }

  async function init(): Promise<void> {
    if (initialized) return;

    unsubscribe = await Store.subscribe("weatherAtom", (value: unknown) => {
      notify(value as WeatherId);
    });

    initialized = true;
  }

  init();

  return {
    get(): WeatherData {
      return currentData;
    },

    subscribe(callback: (value: WeatherData, prev: WeatherData) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.all.add(callback);
      if (options?.immediate !== false && initialized) {
        callback(currentData, currentData);
      }
      return () => listeners.all.delete(callback);
    },

    subscribeStable(callback: (event: WeatherChangeEvent) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.stable.add(callback);
      if (options?.immediate && initialized) {
        callback({ current: currentData, previous: currentData });
      }
      return () => listeners.stable.delete(callback);
    },

    destroy(): void {
      unsubscribe?.();
      unsubscribe = null;
      listeners.all.clear();
      listeners.stable.clear();
      initialized = false;
    },
  };
}

let instance: WeatherGlobal | null = null;

export function getWeather(): WeatherGlobal {
  if (!instance) {
    instance = createWeatherGlobal();
  }
  return instance;
}

