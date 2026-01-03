// src/modules/cosmetic/logic/utils.ts
// Utility functions for cosmetic paths

import type { NormalizedCosmetic } from "../types";

// ─────────────────────────────────────────────────────────────────────────────
// Path Helpers
// ─────────────────────────────────────────────────────────────────────────────

export function stripCosmeticPath(s: string): string {
  let x = String(s || "").trim();
  if (!x) return "";
  x = x.replace(/^cosmetic\//i, "");
  x = x.replace(/\.png$/i, "");
  return x;
}

export function normalize(a: string, b?: string): NormalizedCosmetic {
  if (b === undefined) {
    const base = stripCosmeticPath(a);
    const i = base.indexOf("_");
    if (i < 0) return { cat: "", asset: base, base };
    return { cat: base.slice(0, i), asset: base.slice(i + 1), base };
  }

  const cat = String(a || "").trim();
  const asset = stripCosmeticPath(b);
  const base = asset.includes("_") ? asset : `${cat}_${asset}`;

  if (asset.includes("_") && !cat) {
    const i = asset.indexOf("_");
    return { cat: asset.slice(0, i), asset: asset.slice(i + 1), base: asset };
  }
  return { cat, asset: asset.replace(/^.+?_/, ""), base };
}
