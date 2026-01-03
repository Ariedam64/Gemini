// src/modules/pixi/logic/overlays.ts
// Overlay box drawing system

import { state } from "../state";
import { pageWindow } from "../../../utils/windowContext";
import { MGTile } from "../../tile";

// ─────────────────────────────────────────────────────────────────────────────
// Overlay Box Drawing
// ─────────────────────────────────────────────────────────────────────────────

export function drawOverlayBox(
  tx: number,
  ty: number,
  opts: { key: string; tint?: number; alpha?: number }
): void {
  const PIXI = (pageWindow as any).PIXI;
  if (!PIXI) return;

  let container = state.stage.getChildByName("gemini-overlay");
  if (!container) {
    container = new PIXI.Container();
    container.name = "gemini-overlay";
    state.stage.addChild(container);
  }

  const key = opts.key;
  let g = container.getChildByName(key) as any;
  if (!g) {
    g = new PIXI.Graphics();
    g.name = key;
    container.addChild(g);
  }

  const pos = MGTile.tileToPoint(tx, ty);
  if (!pos) return;

  g.clear();
  g.lineStyle(2, opts.tint ?? 0x00ff00, opts.alpha ?? 1);
  g.beginFill(opts.tint ?? 0x00ff00, (opts.alpha ?? 1) * 0.2);

  const xf = MGTile.getTransform();
  const sizeX = xf ? Math.hypot(xf.vx.x, xf.vx.y) : 32;
  const sizeY = xf ? Math.hypot(xf.vy.x, xf.vy.y) : 32;

  g.drawRect(0, 0, sizeX, sizeY);
  g.endFill();

  g.x = pos.x;
  g.y = pos.y;

  if (xf) g.rotation = Math.atan2(xf.vx.y, xf.vx.x);
}

export function stopOverlay(key: string): boolean {
  const container = state.stage?.getChildByName("gemini-overlay");
  if (!container) return false;
  const g = container.getChildByName(key);
  if (!g) return false;
  container.removeChild(g);
  (g as any).destroy?.();
  return true;
}
