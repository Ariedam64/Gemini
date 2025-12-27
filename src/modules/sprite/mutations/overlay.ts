// src/modules/sprite/mutations/overlay.ts
// Overlay and icon handling for mutations

import type { PixiTexture, SpriteState } from "../types";
import type { MutationName } from "../types";
import {
  MUT_META,
  MUT_ICON_X_EXCEPT,
  MUT_ICON_Y_EXCEPT,
  TILE_SIZE_WORLD,
  BASE_ICON_SCALE,
  TALL_PLANT_MUTATION_ICON_SCALE_BOOST,
} from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

export function isTallKey(key: string): boolean {
  return /tallplant/i.test(key);
}

export function baseNameOf(key: string): string {
  const parts = String(key || "").split("/");
  return parts[parts.length - 1] || "";
}

export function mutationAliases(mut: MutationName): string[] {
  switch (mut) {
    case "Ambershine":
      return ["Ambershine", "Amberlit"];
    case "Dawncharged":
      return ["Dawncharged", "Dawnbound"];
    case "Ambercharged":
      return ["Ambercharged", "Amberbound"];
    default:
      return [mut];
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Overlay Texture Lookup
// ─────────────────────────────────────────────────────────────────────────────

export interface OverlayHit {
  tex: PixiTexture;
  key: string;
}

export function tallOverlayFromSheet(
  mutName: MutationName,
  textures: Map<string, PixiTexture>
): OverlayHit | null {
  const target = String(mutName || "").toLowerCase();

  for (const k of textures.keys()) {
    const m = /sprite\/mutation-overlay\/([A-Za-z0-9]+)TallPlant/i.exec(String(k));
    if (!m || !m[1]) continue;

    const prefix = m[1].toLowerCase();
    if (prefix === target) {
      const t = textures.get(k);
      if (t) return { tex: t, key: k };
    }
  }

  return null;
}

export function findOverlayTexture(
  itKey: string,
  mutName: MutationName,
  textures: Map<string, PixiTexture>,
  preferTall: boolean
): OverlayHit | null {
  if (!mutName) return null;

  const base = baseNameOf(itKey);
  const aliases = mutationAliases(mutName);

  for (const name of aliases) {
    const tries = [
      `sprite/mutation/${name}${base}`,
      `sprite/mutation/${name}-${base}`,
      `sprite/mutation/${name}_${base}`,
      `sprite/mutation/${name}/${base}`,
      `sprite/mutation/${name}`,
    ];

    for (const k of tries) {
      const t = textures.get(k);
      if (t) return { tex: t, key: k };
    }

    if (preferTall) {
      const tallKey = `sprite/mutation-overlay/${name}TallPlant`;
      const tallTex = textures.get(tallKey);
      if (tallTex) return { tex: tallTex, key: tallKey };

      const altKey = `sprite/mutation-overlay/${name}`;
      const altTex = textures.get(altKey);
      if (altTex) return { tex: altTex, key: altKey };

      const fromSheet = tallOverlayFromSheet(mutName, textures);
      if (fromSheet) return fromSheet;
    }
  }

  return null;
}

export function findIconTexture(
  itKey: string,
  mutName: MutationName,
  isTall: boolean,
  textures: Map<string, PixiTexture>
): PixiTexture | null {
  if (!mutName) return null;

  const meta = MUT_META[mutName];
  if (isTall && meta?.tallIconOverride) {
    const t = textures.get(meta.tallIconOverride);
    if (t) return t;
  }

  const base = baseNameOf(itKey);
  const aliases = mutationAliases(mutName);

  for (const name of aliases) {
    const tries = [
      `sprite/mutation/${name}Icon`,
      `sprite/mutation/${name}`,
      `sprite/mutation/${name}${base}`,
      `sprite/mutation/${name}-${base}`,
      `sprite/mutation/${name}_${base}`,
      `sprite/mutation/${name}/${base}`,
    ];

    for (const k of tries) {
      const t = textures.get(k);
      if (t) return t;
    }

    if (isTall) {
      const tallIconKey = `sprite/mutation-overlay/${name}TallPlantIcon`;
      const tallIcon = textures.get(tallIconKey);
      if (tallIcon) return tallIcon;

      const tallKey = `sprite/mutation-overlay/${name}TallPlant`;
      const tallTex = textures.get(tallKey);
      if (tallTex) return tallTex;
    }
  }

  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Icon Layout Computation
// ─────────────────────────────────────────────────────────────────────────────

export interface IconLayout {
  width: number;
  height: number;
  anchorX: number;
  anchorY: number;
  offset: { x: number; y: number };
  iconScale: number;
}

export function computeIconLayout(
  tex: PixiTexture,
  baseName: string,
  isTall: boolean
): IconLayout {
  const width = tex?.orig?.width ?? tex?.frame?.width ?? tex?.width ?? 1;
  const height = tex?.orig?.height ?? tex?.frame?.height ?? tex?.height ?? 1;
  const anchorX = tex?.defaultAnchor?.x ?? 0;
  const anchorY = tex?.defaultAnchor?.y ?? 0;

  let targetX = MUT_ICON_X_EXCEPT[baseName] ?? anchorX;
  const isVerticalShape = height > width * 1.5;
  let targetY = MUT_ICON_Y_EXCEPT[baseName] ?? (isVerticalShape ? anchorY : 0.4);

  const offset = {
    x: (targetX - anchorX) * width,
    y: (targetY - anchorY) * height,
  };

  const minDimension = Math.min(width, height);
  const scaleFactor = Math.min(1.5, minDimension / TILE_SIZE_WORLD);
  let iconScale = BASE_ICON_SCALE * scaleFactor;

  if (isTall) {
    iconScale *= TALL_PLANT_MUTATION_ICON_SCALE_BOOST;
  }

  return {
    width,
    height,
    anchorX,
    anchorY,
    offset,
    iconScale,
  };
}
