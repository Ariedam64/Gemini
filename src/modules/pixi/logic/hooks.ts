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
    // Fast-path: only run the expensive looksLikeEngine check for objects that
    // have the distinctive top-level shape of the game engine. This avoids
    // thousands of unnecessary property-lookups per second on Firefox (SpiderMonkey
    // cannot JIT-optimize intercepted native prototype methods like Chrome/V8 can).
    if (!state.engine
        && thisArg !== null
        && typeof thisArg === "object"
        && thisArg.app !== undefined
        && thisArg.systems !== undefined) {
      try {
        if (looksLikeEngine(thisArg)) {
          // Restore original bind immediately
          Function.prototype.bind = origBind;
          state._bindPatched = false;

          onEngineCapture(thisArg);
        }
      } catch {}
    }
    return bound;
  };

  return false;
}

// Auto-install hook on module load
captureOnce();

/**
 * Try to find an already-running engine by scanning the page's global scope.
 * Useful when the game started before our bind patch was installed (e.g. Firefox timing).
 */
function findEngineInGlobals(): GameEngine | null {
  const win = pageWindow as any;
  // Walk top-level window properties looking for a live QuinoaEngine instance
  try {
    for (const key of Object.keys(win)) {
      try {
        const val = win[key];
        if (looksLikeEngine(val)) return val as GameEngine;
      } catch { /* skip inaccessible */ }
    }
  } catch { /* permission error */ }
  return null;
}

/**
 * Try to find an engine via React fiber tree (same approach as the Jotai bridge).
 */
function findEngineViaFiber(): GameEngine | null {
  try {
    const hook: any = (pageWindow as any).__REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!hook?.renderers?.size) return null;

    for (const [rid] of hook.renderers) {
      const roots = hook.getFiberRoots?.(rid);
      if (!roots) continue;

      for (const root of roots) {
        const seen = new Set<any>();
        const stack = [root.current];

        while (stack.length) {
          const f = stack.pop();
          if (!f || seen.has(f)) continue;
          seen.add(f);

          try {
            // Check memoizedState chain for an engine instance
            let s = f?.memoizedState;
            let n = 0;
            while (s && n++ < 15) {
              if (looksLikeEngine(s?.memoizedState)) return s.memoizedState as GameEngine;
              if (looksLikeEngine(s?.queue?.dispatch)) return s.queue.dispatch as GameEngine;
              // Direct ref or state value
              const val = s?.memoizedState ?? s?.baseState;
              if (val && typeof val === "object" && looksLikeEngine(val)) return val as GameEngine;
              s = s.next;
            }
          } catch { /* skip */ }

          if (f.child) stack.push(f.child);
          if (f.sibling) stack.push(f.sibling);
        }
      }
    }
  } catch { /* skip */ }
  return null;
}

/**
 * Wait for engine capture with timeout.
 * Always restores Function.prototype.bind on exit (success or timeout).
 */
async function waitForCapture(timeoutMs = 15000): Promise<boolean> {
  const t0 = performance.now();

  try {
    while (performance.now() - t0 < timeoutMs) {
      if (state.engine) return true;

      // Try passive fallbacks that don't rely on bind interception
      const found = findEngineInGlobals() ?? findEngineViaFiber();
      if (found) {
        onEngineCapture(found);
        return true;
      }

      await sleep(200);
    }
  } finally {
    // Always restore bind — whether we succeeded or timed out
    if (state._bindPatched) {
      Function.prototype.bind = origBind;
      state._bindPatched = false;
    }
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
