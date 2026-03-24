// src/modules/data/types.ts
// Type definitions for MGData module

export type DataKey = "items" | "decor" | "mutations" | "eggs" | "pets" | "abilities" | "plants" | "weather";
export type DataBag = Record<DataKey, Record<string, unknown> | null>;

/** Keys as returned by the API (some differ from our internal DataKey names) */
export type ApiResponseKey = "items" | "decor" | "mutations" | "eggs" | "pets" | "abilities" | "plants" | "weathers";

/** Mapping from API keys to internal DataKey names */
export const API_KEY_MAP: Record<ApiResponseKey, DataKey> = {
  items: "items",
  decor: "decor",
  mutations: "mutations",
  eggs: "eggs",
  pets: "pets",
  abilities: "abilities",
  plants: "plants",
  weathers: "weather",
};

/** Ability color as returned by the API (single string: hex like "#B49600" or CSS gradient) */
export type AbilityColor = string;
