// src/modules/data/logic/fetch.ts
// Fetch game data from MG API

import type { DataKey, ApiResponseKey } from "../types";
import { API_KEY_MAP } from "../types";
import { state } from "../state";

const API_URL = "https://mg-api.ariedam.fr/data";

/**
 * Fetch all game data from the API and populate state
 */
export async function fetchGameData(): Promise<void> {
  if (state.ready) return;

  console.log("[MGData] Fetching game data from API...");

  const raw = await new Promise<Record<string, unknown>>((resolve, reject) => {
    if (typeof GM_xmlhttpRequest === "undefined") {
      fetch(API_URL)
        .then((res) => {
          if (!res.ok) reject(new Error(`[MGData] API request failed: ${res.status}`));
          else return res.json();
        })
        .then((data) => resolve(data as Record<string, unknown>))
        .catch(reject);
      return;
    }

    GM_xmlhttpRequest({
      method: "GET",
      url: API_URL,
      responseType: "json",
      onload(response) {
        if (response.status < 200 || response.status >= 300) {
          reject(new Error(`[MGData] API request failed: ${response.status}`));
          return;
        }
        resolve(response.response as Record<string, unknown>);
      },
      onerror() {
        reject(new Error(`[MGData] Network error`));
      },
    });
  });

  // Map API keys to internal DataKey names
  for (const [apiKey, internalKey] of Object.entries(API_KEY_MAP) as [ApiResponseKey, DataKey][]) {
    const value = raw[apiKey];
    if (value && typeof value === "object") {
      state.data[internalKey] = value as Record<string, unknown>;
    }
  }

  state.ready = true;

  const loaded = Object.entries(state.data)
    .filter(([, v]) => v !== null)
    .map(([k]) => k);
  console.log(`[MGData] Data loaded: ${loaded.join(", ")}`);
}
