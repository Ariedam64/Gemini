import { weatherAtom } from "../../atoms";
import type {
  WeatherGlobal,
  WeatherData,
  WeatherType,
  WeatherChangeEvent,
  SubscribeOptions,
  Unsubscribe,
} from "../core/types";
import type { Weather as RawWeather } from "../../atoms/types";

const VALID_WEATHER_TYPES: WeatherType[] = ["Sunny", "Rain", "Frost", "Dawn", "AmberMoon"];

function isValidWeatherType(type: string): type is WeatherType {
  return VALID_WEATHER_TYPES.includes(type as WeatherType);
}

const initialData: WeatherData = {
  type: "Sunny",
  isActive: false,
  startTime: null,
  endTime: null,
  remainingSeconds: 0,
};

function buildData(raw: RawWeather): WeatherData {
  if (!raw) {
    return initialData;
  }

  const now = Date.now();
  const endTime = raw.endTime ?? 0;
  const remainingMs = Math.max(0, endTime - now);
  const remainingSeconds = Math.floor(remainingMs / 1000);
  const isActive = remainingSeconds > 0;

  const rawType = raw.type ?? "Sunny";
  const type: WeatherType = isValidWeatherType(rawType) ? rawType : "Sunny";

  return {
    type,
    isActive,
    startTime: raw.startTime ?? null,
    endTime: raw.endTime ?? null,
    remainingSeconds,
  };
}

type ListenerSets = {
  all: Set<(value: WeatherData, prev: WeatherData) => void>;
  change: Set<(event: WeatherChangeEvent) => void>;
};

function createWeatherGlobal(): WeatherGlobal {
  let currentData: WeatherData = initialData;
  let previousData: WeatherData = initialData;
  let initialized = false;
  let unsubscribe: Unsubscribe | null = null;

  const listeners: ListenerSets = {
    all: new Set(),
    change: new Set(),
  };

  function notify(raw: RawWeather): void {
    const nextData = buildData(raw);

    if (
      currentData.type === nextData.type &&
      currentData.isActive === nextData.isActive &&
      currentData.startTime === nextData.startTime &&
      currentData.endTime === nextData.endTime
    ) {
      currentData = nextData;
      return;
    }

    previousData = currentData;
    currentData = nextData;

    if (!initialized) return;

    for (const cb of listeners.all) {
      cb(currentData, previousData);
    }

    if (previousData.type !== currentData.type || previousData.isActive !== currentData.isActive) {
      const event: WeatherChangeEvent = {
        current: currentData,
        previous: previousData,
      };
      for (const cb of listeners.change) {
        cb(event);
      }
    }
  }

  async function init(): Promise<void> {
    if (initialized) return;

    unsubscribe = await weatherAtom.onChangeNow((value) => {
      notify(value);
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

    subscribeChange(callback: (event: WeatherChangeEvent) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.change.add(callback);
      if (options?.immediate && initialized) {
        callback({ current: currentData, previous: currentData });
      }
      return () => listeners.change.delete(callback);
    },

    destroy(): void {
      unsubscribe?.();
      unsubscribe = null;
      listeners.all.clear();
      listeners.change.clear();
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
