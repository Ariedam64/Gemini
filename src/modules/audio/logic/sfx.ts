// src/modules/audio/logic/sfx.ts
// SFX (sound effects) management

import { getBlob } from "../../utils/network";
import type { SfxAtlas, PlaySfxResult, PlayOptions } from "../types";
import { state } from "../state";
import { ensureAudioContext, resumeIfNeeded } from "./context";
import { resolveVolume } from "./volume";

// ─────────────────────────────────────────────────────────────────────────────
// SFX Groups
// ─────────────────────────────────────────────────────────────────────────────

export function buildSfxGroups(atlas: SfxAtlas): void {
  const groups = new Map<string, string[]>();

  const add = (base: string, name: string) => {
    if (!groups.has(base)) groups.set(base, []);
    groups.get(base)!.push(name);
  };

  for (const name of Object.keys(atlas || {})) {
    const match = /^(.*)_([A-Z])$/.exec(name);
    if (match?.[1]) {
      add(match[1], name);
    } else {
      add(name, name);
    }
  }

  for (const [base, arr] of Array.from(groups.entries())) {
    arr.sort((a, b) => a.localeCompare(b));
    groups.set(base, arr);
  }

  state.sfx.groups = groups;
}

export function pickSfxName(request: string): string {
  const atlas = state.sfx.atlas;
  if (!atlas) throw new Error("SFX atlas not loaded");
  if (atlas[request]) return request;

  const variants = state.sfx.groups.get(request);
  if (variants?.length) {
    return variants[(Math.random() * variants.length) | 0];
  }

  throw new Error(`Unknown sfx/group: ${request}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// SFX Buffer Loading
// ─────────────────────────────────────────────────────────────────────────────

export async function loadSfxBuffer(): Promise<AudioBuffer> {
  if (state.sfx.buffer) return state.sfx.buffer;
  if (!state.sfx.mp3Url) throw new Error("SFX mp3 url missing");

  const ctx = await ensureAudioContext();
  await resumeIfNeeded();

  const blob = await getBlob(state.sfx.mp3Url);
  const arrayBuffer = await blob.arrayBuffer();

  const buffer = await new Promise<AudioBuffer>((resolve, reject) => {
    const promise = ctx.decodeAudioData(arrayBuffer, resolve, reject);
    if (promise?.then) promise.then(resolve, reject);
  });

  state.sfx.buffer = buffer;
  return buffer;
}

// ─────────────────────────────────────────────────────────────────────────────
// SFX Playback
// ─────────────────────────────────────────────────────────────────────────────

export async function playSfx(
  nameOrGroup: string,
  opts: PlayOptions = {}
): Promise<PlaySfxResult> {
  if (!state.ready) throw new Error("MGAudio not ready yet");

  const request = String(nameOrGroup || "").trim();
  if (!request) throw new Error("Missing sfx name");

  const picked = pickSfxName(request);
  const segment = state.sfx.atlas![picked];
  if (!segment) throw new Error(`Missing segment for sfx: ${picked}`);

  const ctx = await ensureAudioContext();
  await resumeIfNeeded();
  const buffer = await loadSfxBuffer();

  const start = Math.max(0, +segment.start || 0);
  const end = Math.max(start, +segment.end || start);
  const duration = Math.max(0.01, end - start);

  const volume = resolveVolume("sfx", opts.volume);

  const gain = ctx.createGain();
  gain.gain.value = volume;
  gain.connect(ctx.destination);

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(gain);
  source.start(0, start, duration);

  return {
    name: picked,
    source,
    start,
    end,
    duration,
    volume,
  };
}
