// src/modules/audio/logic/volume.ts
// Volume management and conversion

import { clamp, clamp01 } from "../../utils/helpers";
import type { AudioCategory } from "../types";
import { VOLUME_KEYS, LEGACY_VOLUME_KEYS, VMIN, VMAX } from "./constants";

// ─────────────────────────────────────────────────────────────────────────────
// Volume Reading
// ─────────────────────────────────────────────────────────────────────────────

export function readVolumeKey(key: string, fallback = NaN): number {
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

export function categoryVolume(category: AudioCategory): { atom: number; vol100: number } {
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

// ─────────────────────────────────────────────────────────────────────────────
// Volume Conversion
// ─────────────────────────────────────────────────────────────────────────────

export function volLocalStorage(vol100: number): number | null {
  const v = Number(vol100);
  if (!Number.isFinite(v)) return null;
  if (v <= 0) return 0;

  const vv = clamp(v, 1, 100);
  const t = (vv - 1) / 99;
  return VMIN + t * (VMAX - VMIN);
}

export function volTo100(volume: number): number {
  const v = clamp(Number(volume), 0, 1);
  if (v <= VMIN) return 0;
  const t = (v - VMIN) / (VMAX - VMIN);
  return Math.round(1 + t * 99);
}

export function resolveVolume(category: AudioCategory, optsVolume?: number): number {
  if (optsVolume === undefined || optsVolume === null) return categoryVolume(category).atom;
  const mapped = volLocalStorage(optsVolume);
  if (mapped === null) return categoryVolume(category).atom;
  return clamp01(mapped);
}
