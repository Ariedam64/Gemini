// src/modules/pixi/logic/highlights.ts
// Highlight pulse system for display objects

import { tryDo, clamp } from "../../utils/helpers";
import type { DisplayObject, HighlightOptions } from "../types";
import { state } from "../state";
import { hasAlpha, hasTint, isDisp, collectTint, lerp, lerpColor } from "./utils";

// ─────────────────────────────────────────────────────────────────────────────
// Highlight Management
// ─────────────────────────────────────────────────────────────────────────────

export function stopHighlight(key: string): boolean {
  const entry = state.highlights.get(key);
  if (!entry) return false;

  tryDo(() => state.ticker?.remove(entry.tick));
  if (entry.root && entry.baseAlpha != null && hasAlpha(entry.root)) {
    tryDo(() => {
      entry.root.alpha = entry.baseAlpha!;
    });
  }
  for (const t of entry.tint) {
    if (t.o && hasTint(t.o))
      tryDo(() => {
        t.o.tint = t.baseTint;
      });
  }
  state.highlights.delete(key);
  return true;
}

export function clearHighlights(prefix: string | null = null): boolean {
  for (const key of Array.from(state.highlights.keys())) {
    if (prefix && !String(key).startsWith(prefix)) continue;
    stopHighlight(key);
  }
  return true;
}

export function highlightPulse(rootDisp: DisplayObject, opts: HighlightOptions = {}): string {
  if (!isDisp(rootDisp)) throw new Error("MGPixi.highlightPulse: invalid root");

  const key = String(opts.key || `hl:${Math.random().toString(16).slice(2)}`);
  if (state.highlights.has(key)) return key;

  const baseAlpha = hasAlpha(rootDisp) ? Number(rootDisp.alpha) : null;
  const minA = clamp(Number(opts.minAlpha ?? 0.12), 0, 1);
  const maxA = clamp(Number(opts.maxAlpha ?? 1.0), 0, 1);
  const speed = Number(opts.speed ?? 1.25);
  const tint = (opts.tint ?? 0x7ff6ff) >>> 0;
  const tintMix = clamp(Number(opts.tintMix ?? 0.85), 0, 1);
  const deepTint = opts.deepTint !== false;

  const tintTargets: { o: DisplayObject; baseTint: number }[] = [];
  if (deepTint) {
    for (const o of collectTint(rootDisp)) {
      tintTargets.push({ o, baseTint: o.tint });
    }
  } else if (hasTint(rootDisp)) {
    tintTargets.push({ o: rootDisp, baseTint: rootDisp.tint });
  }

  const start = performance.now();
  const tick = () => {
    const t = (performance.now() - start) / 1000;
    const s = (Math.sin(t * Math.PI * 2 * speed) + 1) / 2;
    const e = s * s * (3 - 2 * s);

    if (baseAlpha != null && hasAlpha(rootDisp)) {
      rootDisp.alpha = clamp(lerp(minA, maxA, e) * baseAlpha, 0, 1);
    }

    const mix = e * tintMix;
    for (const tt of tintTargets) {
      if (tt.o && hasTint(tt.o)) tt.o.tint = lerpColor(tt.baseTint, tint, mix);
    }
  };

  state.ticker?.add(tick);
  state.highlights.set(key, { root: rootDisp, tick, baseAlpha, tint: tintTargets });
  return key;
}
