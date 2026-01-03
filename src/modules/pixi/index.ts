// src/modules/pixi/index.ts
// MGPixi - Pixi.js utilities (highlights, fades, inspection)

import type { HighlightOptions, MutationHighlightOptions, FadeOptions } from "./types";
import { isReady, state } from "./state";
import { initPixiSystem, exposePixi } from "./logic/init";
import { defineTileSet, deleteTileSet, listTileSets } from "./logic/tilesets";
import { highlightPulse, stopHighlight, clearHighlights } from "./logic/highlights";
import { highlightMutation, watchMutation, stopWatchMutation } from "./logic/mutations";
import { fadeSpecies, clearSpeciesFade, clearFades, watchFadeSpecies, stopWatchFadeSpecies } from "./logic/fades";
import { inspectTile } from "./logic/inspect";
import { drawOverlayBox, stopOverlay } from "./logic/overlays";
import { pageWindow } from "../../utils/windowContext";

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

function ensureReady(): void {
  if (!isReady()) throw new Error("MGPixi: call MGPixi.init() first");
}

export const MGPixi = {
  init: initPixiSystem,
  isReady,
  expose: exposePixi,

  get app() {
    return state.app;
  },
  get renderer() {
    return state.renderer;
  },
  get stage() {
    return state.stage;
  },
  get ticker() {
    return state.ticker;
  },
  get PIXI() {
    return (pageWindow as any).PIXI || null;
  },

  defineTileSet: (name: string, tiles: any[]) => {
    ensureReady();
    return defineTileSet(name, tiles);
  },

  deleteTileSet: (name: string) => {
    ensureReady();
    return deleteTileSet(name);
  },

  listTileSets: () => {
    ensureReady();
    return listTileSets();
  },

  highlightPulse: (rootDisp: any, opts?: HighlightOptions) => {
    ensureReady();
    return highlightPulse(rootDisp, opts);
  },

  stopHighlight: (key: string) => {
    ensureReady();
    return stopHighlight(key);
  },

  clearHighlights: (prefix?: string | null) => {
    ensureReady();
    return clearHighlights(prefix);
  },

  drawOverlayBox: (tx: number, ty: number, opts: { key: string; tint?: number; alpha?: number }) => {
    ensureReady();
    return drawOverlayBox(tx, ty, opts);
  },

  stopOverlay: (key: string) => {
    ensureReady();
    return stopOverlay(key);
  },

  highlightMutation: (mutation: string, opts?: MutationHighlightOptions) => {
    ensureReady();
    return highlightMutation(mutation, opts);
  },

  watchMutation: (mutation: string, opts?: MutationHighlightOptions & { intervalMs?: number }) => {
    ensureReady();
    return watchMutation(mutation, opts);
  },

  stopWatchMutation: (keyOrMutation: string) => {
    ensureReady();
    return stopWatchMutation(keyOrMutation);
  },

  inspectTile: (tx: number, ty: number, opts?: { ensureView?: boolean; log?: boolean }) => {
    ensureReady();
    return inspectTile(tx, ty, opts);
  },

  fadeSpecies: (species: string, opts?: FadeOptions) => {
    ensureReady();
    return fadeSpecies(species, opts);
  },

  clearSpeciesFade: (species: string, opts?: FadeOptions) => {
    ensureReady();
    return clearSpeciesFade(species, opts);
  },

  clearFades: (prefix?: string | null) => {
    ensureReady();
    return clearFades(prefix);
  },

  watchFadeSpecies: (species: string, opts?: FadeOptions & { intervalMs?: number }) => {
    ensureReady();
    return watchFadeSpecies(species, opts);
  },

  stopWatchFadeSpecies: (keyOrSpecies: string) => {
    ensureReady();
    return stopWatchFadeSpecies(keyOrSpecies);
  },
};
