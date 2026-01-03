// src/modules/pixi/logic/init.ts
// Initialization logic for Pixi utilities system

import { state } from "../state";
import { MGPixiHooks } from "./hooks";
import { pageWindow } from "../../../utils/windowContext";

/**
 * Initialize the Pixi utilities system
 * Waits for PIXI app and sets up state
 */
export async function initPixiSystem(timeoutMs = 15000): Promise<boolean> {
  if (state.ready) {
    exposePixi();
    return true;
  }

  await MGPixiHooks.init(timeoutMs);

  state.app = MGPixiHooks.app();
  state.ticker = MGPixiHooks.ticker();
  state.renderer = MGPixiHooks.renderer();
  state.stage = MGPixiHooks.stage();

  if (!state.app || !state.ticker) {
    throw new Error("MGPixi: PIXI app/ticker not found");
  }

  state.ready = true;
  exposePixi();
  return true;
}

/**
 * Expose PIXI internals to window for debugging
 */
export function exposePixi(): any {
  const root = pageWindow as any;
  root.$PIXI = root.PIXI || null;
  root.$app = state.app || null;
  root.$renderer = state.renderer || null;
  root.$stage = state.stage || null;
  root.$ticker = state.ticker || null;

  root.__MG_PIXI__ = {
    PIXI: root.$PIXI,
    app: root.$app,
    renderer: root.$renderer,
    stage: root.$stage,
    ticker: root.$ticker,
    ready: state.ready,
  };

  return root.__MG_PIXI__;
}
