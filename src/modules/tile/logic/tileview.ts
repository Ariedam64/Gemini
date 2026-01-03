// src/modules/tile/logic/tileview.ts
// TileView management and access

import type { TileView, PlantSlotPatch } from "../types";
import { tos, gidx } from "./helpers";

// ─────────────────────────────────────────────────────────────────────────────
// TileView Access
// ─────────────────────────────────────────────────────────────────────────────

export function getTileViewAt(
  tx: number,
  ty: number,
  ensure = true
): { gidx: number | null; tv: TileView | null } {
  const TOS = tos();
  const gi = gidx(tx, ty);
  if (!TOS || gi == null) return { gidx: null, tv: null };

  let tv = TOS.tileViews?.get?.(gi) || null;
  if (!tv && ensure && typeof TOS.getOrCreateTileView === "function") {
    try {
      tv = TOS.getOrCreateTileView(gi);
    } catch {}
  }
  return { gidx: gi, tv: tv || null };
}

// ─────────────────────────────────────────────────────────────────────────────
// Plant Slot Patching
// ─────────────────────────────────────────────────────────────────────────────

export function patchPlantSlot(slot: any, patch: PlantSlotPatch): void {
  if ("startTime" in patch) slot.startTime = Number(patch.startTime);
  if ("endTime" in patch) slot.endTime = Number(patch.endTime);
  if ("targetScale" in patch) slot.targetScale = Number(patch.targetScale);

  if ("mutations" in patch) {
    if (!Array.isArray(patch.mutations)) {
      throw new Error("MGTile: mutations must be an array of strings");
    }
    slot.mutations = patch.mutations.slice();
  }
}
