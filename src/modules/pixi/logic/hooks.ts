// src/modules/pixi/logic/hooks.ts
// MGPixiHooks - Central capture point for PIXI app, renderer, and game engine

import { sleep } from "../../utils/helpers";
import { pageWindow } from "../../../utils/windowContext";

// Types
type GameEngine = any;
type TileObjectSystem = any;
type PixiApp = any;
type PixiRenderer = any;
type PixiTicker = any;

// State
const origBind = Function.prototype.bind;

const state = {
  _bindPatched: false,
  engine: null as GameEngine | null,
  tos: null as TileObjectSystem | null,
  app: null as PixiApp | null,
  renderer: null as PixiRenderer | null,
  ticker: null as PixiTicker | null,
  stage: null as any,
};

// Resolvers for promises
let engineResolve: (engine: GameEngine) => void;
let appResolve: (app: PixiApp) => void;
let rendererResolve: (renderer: PixiRenderer) => void;

const engineReady = new Promise<GameEngine>((resolve) => {
  engineResolve = resolve;
});

const appReady = new Promise<PixiApp>((resolve) => {
  appResolve = resolve;
});

const rendererReady = new Promise<PixiRenderer>((resolve) => {
  rendererResolve = resolve;
});

// ----- Engine detection -----
function looksLikeEngine(obj: any): boolean {
  return !!(
    obj &&
    typeof obj === "object" &&
    typeof obj.start === "function" &&
    typeof obj.destroy === "function" &&
    obj.app &&
    obj.app.stage &&
    obj.app.renderer &&
    obj.systems &&
    typeof obj.systems.values === "function"
  );
}

function findTileObjectSystem(engine: GameEngine): TileObjectSystem | null {
  try {
    for (const entry of engine.systems.values()) {
      const system = entry?.system;
      if (system?.name === "tileObject") return system;
    }
  } catch {}
  return null;
}

function onEngineCapture(engine: GameEngine): void {
  state.engine = engine;
  state.tos = findTileObjectSystem(engine) || null;
  state.app = engine.app || null;
  state.renderer = engine.app?.renderer || null;
  state.ticker = engine.app?.ticker || null;
  state.stage = engine.app?.stage || null;

  // Resolve all promises
  try { engineResolve(engine); } catch {}
  try { if (state.app) appResolve(state.app); } catch {}
  try { if (state.renderer) rendererResolve(state.renderer); } catch {}
}

/**
 * Attempt to capture the engine by patching Function.prototype.bind
 */
function captureOnce(): boolean {
  if (state.engine) return true;
  if (state._bindPatched) return false;

  state._bindPatched = true;

  Function.prototype.bind = function (thisArg: any, ...args: any[]) {
    const bound = origBind.call(this, thisArg, ...args);
    try {
      if (!state.engine && looksLikeEngine(thisArg)) {
        // Restore original bind immediately
        Function.prototype.bind = origBind;
        state._bindPatched = false;

        onEngineCapture(thisArg);
      }
    } catch {}
    return bound;
  };

  return false;
}

// Auto-install hook on module load
captureOnce();

/**
 * Wait for engine capture with timeout
 */
async function waitForCapture(timeoutMs = 15000): Promise<boolean> {
  const t0 = performance.now();
  while (performance.now() - t0 < timeoutMs) {
    if (state.engine) return true;
    captureOnce();
    await sleep(50);
  }
  throw new Error("MGPixiHooks: engine capture timeout");
}

/**
 * Initialize and wait for engine
 */
async function init(timeoutMs = 15000): Promise<boolean> {
  if (state.engine) return true;
  await waitForCapture(timeoutMs);
  return true;
}

/**
 * Manual hook check (for debugging)
 */
function hook(): {
  ok: boolean;
  engine: GameEngine | null;
  tos: TileObjectSystem | null;
  app: PixiApp | null;
  note?: string;
} {
  const ok = !!(state.engine && state.app);
  if (ok) {
    return { ok: true, engine: state.engine, tos: state.tos, app: state.app };
  }
  captureOnce();
  return {
    ok: false,
    engine: state.engine,
    tos: state.tos,
    app: state.app,
    note: "Not captured. Wait for room, or reload.",
  };
}

export const MGPixiHooks = {
  // Promises
  engineReady,
  appReady,
  rendererReady,

  // Sync getters
  engine: () => state.engine,
  tos: () => state.tos,
  app: () => state.app,
  renderer: () => state.renderer,
  ticker: () => state.ticker,
  stage: () => state.stage,
  PIXI: () => (pageWindow as any).PIXI || null,

  // Methods
  init,
  hook,
  ready: () => !!state.engine,
};
