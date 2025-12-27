// src/modules/media/audio.ts
// MGAudio - Audio management (SFX, music, ambience)

import { clamp, clamp01 } from "../utils/helpers";
import { gmGet, getJSON } from "../utils/network";
import { joinPath } from "../utils/path";
import { MGAssets } from "../core/assets";
import { MGManifest } from "../core/manifest";

// Types
type AudioCategory = "sfx" | "music" | "ambience";

interface SfxSegment {
  start: number;
  end: number;
}

interface SfxAtlas {
  [name: string]: SfxSegment;
}

interface PlaySfxResult {
  name: string;
  source: AudioBufferSourceNode;
  start: number;
  end: number;
  duration: number;
  volume: number;
}

interface PlayOptions {
  volume?: number;
  loop?: boolean;
}

// Volume keys in localStorage
const VOLUME_KEYS: Record<AudioCategory, string> = {
  sfx: "soundEffectsVolume",
  music: "musicVolume",
  ambience: "ambienceVolume",
};

// Legacy keys kept for backward compatibility
const LEGACY_VOLUME_KEYS: Record<AudioCategory, string> = {
  sfx: "soundEffectsVolumeAtom",
  music: "musicVolumeAtom",
  ambience: "ambienceVolumeAtom",
};

const VMIN = 0.001;
const VMAX = 0.2;

// State
let _initPromise: Promise<boolean> | null = null;

const state = {
  ready: false,
  baseUrl: null as string | null,

  urls: {
    ambience: new Map<string, string>(),
    music: new Map<string, string>(),
  },

  sfx: {
    mp3Url: null as string | null,
    atlasUrl: null as string | null,
    atlas: null as SfxAtlas | null,
    groups: new Map<string, string[]>(),
    buffer: null as AudioBuffer | null,
  },

  tracks: {
    ambience: null as HTMLAudioElement | null,
    music: null as HTMLAudioElement | null,
  },

  ctx: null as AudioContext | null,
};

function assertReady(): void {
  if (!state.ready) throw new Error("MGAudio not ready yet");
}

// ----- Volume helpers -----
function readVolumeKey(key: string, fallback = NaN): number {
  try {
    const raw = localStorage.getItem(key);
    if (raw == null) return fallback;

    let value: any;
    try {
      value = JSON.parse(raw);
    } catch {
      value = raw;
    }

    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string") {
      const n = parseFloat(value);
      if (Number.isFinite(n)) return n;
    }
  } catch {}
  return fallback;
}

function categoryVolume(category: AudioCategory): { atom: number; vol100: number } {
  const key = VOLUME_KEYS[category];
  const legacy = LEGACY_VOLUME_KEYS[category];
  if (!key) return { atom: VMAX, vol100: volTo100(VMAX) };

  const val = readVolumeKey(key, NaN);
  if (Number.isFinite(val)) {
    const atom = clamp(val, 0, 1);
    return { atom, vol100: volTo100(atom) };
  }

  if (legacy) {
    const legacyVal = readVolumeKey(legacy, NaN);
    if (Number.isFinite(legacyVal)) {
      const atom = clamp(legacyVal, 0, 1);
      return { atom, vol100: volTo100(atom) };
    }
  }

  const atom = VMAX;
  return { atom, vol100: volTo100(atom) };
}

function volLocalStorage(vol100: number): number | null {
  const v = Number(vol100);
  if (!Number.isFinite(v)) return null;
  if (v <= 0) return 0;

  const vv = clamp(v, 1, 100);
  const t = (vv - 1) / 99;
  return VMIN + t * (VMAX - VMIN);
}

function volTo100(volume: number): number {
  const v = clamp(Number(volume), 0, 1);
  if (v <= VMIN) return 0;
  const t = (v - VMIN) / (VMAX - VMIN);
  return Math.round(1 + t * 99);
}

function resolveVolume(category: AudioCategory, optsVolume?: number): number {
  if (optsVolume === undefined || optsVolume === null) return categoryVolume(category).atom;
  const mapped = volLocalStorage(optsVolume);
  if (mapped === null) return categoryVolume(category).atom;
  return clamp01(mapped);
}

// ----- Audio context -----
async function ensureAudioContext(): Promise<AudioContext> {
  const existing = state.ctx;
  if (existing) return existing;

  const Ctx = (window as any).AudioContext || (window as any).webkitAudioContext;
  if (!Ctx) throw new Error("WebAudio not supported");

  const ctx = new Ctx();
  state.ctx = ctx;
  return ctx;
}

async function resumeIfNeeded(): Promise<void> {
  if (!state.ctx) return;
  if (state.ctx.state === "suspended") {
    try {
      await state.ctx.resume();
    } catch {}
  }
}

// ----- SFX groups -----
function buildSfxGroups(atlas: SfxAtlas): void {
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

function pickSfxName(request: string): string {
  const atlas = state.sfx.atlas;
  if (!atlas) throw new Error("SFX atlas not loaded");
  if (atlas[request]) return request;

  const variants = state.sfx.groups.get(request);
  if (variants?.length) {
    return variants[(Math.random() * variants.length) | 0];
  }

  throw new Error(`Unknown sfx/group: ${request}`);
}

// ----- SFX playback -----
async function loadSfxBuffer(): Promise<AudioBuffer> {
  if (state.sfx.buffer) return state.sfx.buffer;
  if (!state.sfx.mp3Url) throw new Error("SFX mp3 url missing");

  const ctx = await ensureAudioContext();
  await resumeIfNeeded();

  const response = await gmGet(state.sfx.mp3Url, "arraybuffer");
  const arrayBuffer = response.response;

  const buffer = await new Promise<AudioBuffer>((resolve, reject) => {
    const promise = ctx.decodeAudioData(arrayBuffer, resolve, reject);
    if (promise?.then) promise.then(resolve, reject);
  });

  state.sfx.buffer = buffer;
  return buffer;
}

async function playSfx(nameOrGroup: string, opts: PlayOptions = {}): Promise<PlaySfxResult> {
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

// ----- Track playback (music/ambience) -----
function stop(category: "music" | "ambience"): boolean {
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

function playTrack(
  category: "music" | "ambience",
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

// ----- Public API -----
async function play(
  category: string,
  asset: string,
  opts: PlayOptions = {}
): Promise<PlaySfxResult | HTMLAudioElement> {
  const cat = String(category || "").trim();
  const name = String(asset || "").trim();

  if (!cat || !name) throw new Error("play(category, asset) missing args");

  if (cat === "sfx") return playSfx(name, opts);
  if (cat === "music" || cat === "ambience") return playTrack(cat, name, opts);

  throw new Error(`Unknown category: ${cat}`);
}

function list(category: string, options: { groups?: boolean } = {}): string[] {
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

function refreshVolumes(): boolean {
  if (state.tracks.music) {
    state.tracks.music.volume = categoryVolume("music").atom;
  }
  if (state.tracks.ambience) {
    state.tracks.ambience.volume = categoryVolume("ambience").atom;
  }
  return true;
}

function getCategories(): string[] {
  assertReady();
  return ["sfx", "music", "ambience"];
}

function getGroups(): string[] {
  assertReady();
  return Array.from(state.sfx.groups.keys()).sort((a, b) => a.localeCompare(b));
}

function hasTrack(category: string, name: string): boolean {
  assertReady();
  const cat = String(category || "").trim().toLowerCase();
  const n = String(name || "").trim();
  if (!n) return false;
  if (cat !== "music" && cat !== "ambience") return false;

  const map = state.urls[cat];
  const nLc = n.toLowerCase();
  for (const k of map.keys()) {
    if (k.toLowerCase() === nLc) return true;
  }
  return false;
}

function hasGroup(name: string): boolean {
  assertReady();
  const n = String(name || "").trim();
  if (!n) return false;
  const nLc = n.toLowerCase();
  for (const k of state.sfx.groups.keys()) {
    if (k.toLowerCase() === nLc) return true;
  }
  return false;
}

function getTrackUrl(category: string, name: string): string | null {
  assertReady();
  const cat = String(category || "").trim().toLowerCase();
  const n = String(name || "").trim();
  if (!n) throw new Error("getTrackUrl(category, name) missing name");
  if (cat !== "music" && cat !== "ambience") throw new Error(`Invalid category: ${category}`);

  const map = state.urls[cat];
  const nLc = n.toLowerCase();
  for (const [k, url] of map.entries()) {
    if (k.toLowerCase() === nLc) return url;
  }
  return null;
}

async function init(): Promise<boolean> {
  if (state.ready) return true;
  if (_initPromise) return _initPromise;

  _initPromise = (async () => {
    state.baseUrl = await MGAssets.base();

    const manifest = await MGManifest.load(state.baseUrl);
    const bundle = MGManifest.getBundle(manifest, "audio");
    if (!bundle) throw new Error("No audio bundle in manifest");

    for (const asset of bundle.assets || []) {
      for (const src of asset.src || []) {
        if (typeof src !== "string") continue;

        const match = /^audio\/(ambience|music)\/(.+)\.mp3$/i.exec(src);
        if (match) {
          const cat = match[1].toLowerCase() as "ambience" | "music";
          const name = match[2];
          state.urls[cat].set(name, joinPath(state.baseUrl!, src));
          continue;
        }

        if (/^audio\/sfx\/sfx\.mp3$/i.test(src)) {
          state.sfx.mp3Url = joinPath(state.baseUrl!, src);
        }
        if (/^audio\/sfx\/sfx\.json$/i.test(src)) {
          state.sfx.atlasUrl = joinPath(state.baseUrl!, src);
        }
      }
    }

    if (!state.sfx.atlasUrl) throw new Error("Missing audio/sfx/sfx.json in manifest");

    state.sfx.atlas = await getJSON<SfxAtlas>(state.sfx.atlasUrl);
    buildSfxGroups(state.sfx.atlas);

    state.ready = true;
    return true;
  })();

  return _initPromise;
}

export const MGAudio = {
  init,
  ready: () => state.ready,

  play,
  stop,
  list,

  refreshVolumes,
  categoryVolume,

  getCategories,
  getGroups,
  hasTrack,
  hasGroup,
  getTrackUrl,
};
