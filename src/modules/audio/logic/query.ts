// src/modules/audio/logic/query.ts
// Query operations for audio assets

import type { ListOptions } from "../types";
import { state } from "../state";
import { categoryVolume } from "./volume";

// ─────────────────────────────────────────────────────────────────────────────
// List Operations
// ─────────────────────────────────────────────────────────────────────────────

export function list(category: string, options: ListOptions = {}): string[] {
  const cat = String(category || "").trim();

  if (cat === "music" || cat === "ambience") {
    return Array.from(state.urls[cat].keys()).sort();
  }

  if (cat === "sfx") {
    if (!state.sfx.atlas) return [];
    return options.groups
      ? Array.from(state.sfx.groups.keys()).sort()
      : Object.keys(state.sfx.atlas).sort();
  }

  return [];
}

export function getCategories(): string[] {
  return ["sfx", "music", "ambience"];
}

export function getGroups(): string[] {
  return Array.from(state.sfx.groups.keys()).sort((a, b) => a.localeCompare(b));
}

// ─────────────────────────────────────────────────────────────────────────────
// Existence Checks
// ─────────────────────────────────────────────────────────────────────────────

export function hasTrack(category: string, name: string): boolean {
  const cat = String(category || "").trim().toLowerCase();
  const n = String(name || "").trim();
  if (!n) return false;
  if (cat !== "music" && cat !== "ambience") return false;

  const map = state.urls[cat];
  const nLc = n.toLowerCase();
  for (const k of Array.from(map.keys())) {
    if (k.toLowerCase() === nLc) return true;
  }
  return false;
}

export function hasGroup(name: string): boolean {
  const n = String(name || "").trim();
  if (!n) return false;
  const nLc = n.toLowerCase();
  for (const k of Array.from(state.sfx.groups.keys())) {
    if (k.toLowerCase() === nLc) return true;
  }
  return false;
}

export function getTrackUrl(category: string, name: string): string | null {
  const cat = String(category || "").trim().toLowerCase();
  const n = String(name || "").trim();
  if (!n) throw new Error("getTrackUrl(category, name) missing name");
  if (cat !== "music" && cat !== "ambience") throw new Error(`Invalid category: ${category}`);

  const map = state.urls[cat];
  const nLc = n.toLowerCase();
  for (const [k, url] of Array.from(map.entries())) {
    if (k.toLowerCase() === nLc) return url;
  }
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Volume Refresh
// ─────────────────────────────────────────────────────────────────────────────

export function refreshVolumes(): boolean {
  if (state.tracks.music) {
    state.tracks.music.volume = categoryVolume("music").atom;
  }
  if (state.tracks.ambience) {
    state.tracks.ambience.volume = categoryVolume("ambience").atom;
  }
  return true;
}
