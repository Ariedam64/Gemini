// src/modules/audio/logic/tracks.ts
// Track playback (music and ambience)

import type { TrackCategory, PlayOptions } from "../types";
import { state } from "../state";
import { resolveVolume } from "./volume";

// ─────────────────────────────────────────────────────────────────────────────
// Track Management
// ─────────────────────────────────────────────────────────────────────────────

export function stop(category: TrackCategory): boolean {
  if (category !== "music" && category !== "ambience") return false;

  const audio = state.tracks[category];
  if (audio) {
    try {
      audio.pause();
    } catch {}
    try {
      audio.src = "";
    } catch {}
  }
  state.tracks[category] = null;
  return true;
}

export function playTrack(
  category: TrackCategory,
  name: string,
  opts: PlayOptions = {}
): HTMLAudioElement {
  if (!state.ready) throw new Error("MGAudio not ready yet");
  if (category !== "music" && category !== "ambience") {
    throw new Error(`Invalid category: ${category}`);
  }

  const url = state.urls[category].get(name);
  if (!url) throw new Error(`Unknown ${category}: ${name}`);

  stop(category);

  const audio = new Audio(url);
  audio.loop = !!opts.loop;
  audio.volume = resolveVolume(category, opts.volume);
  audio.preload = "auto";
  audio.play().catch(() => {});

  state.tracks[category] = audio;
  return audio;
}
