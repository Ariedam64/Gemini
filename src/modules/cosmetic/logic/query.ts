// src/modules/cosmetic/logic/query.ts
// Query operations for cosmetics

import { state } from "../state";
import { joinPath } from "../../utils/path";
import { normalize } from "./utils";

// ─────────────────────────────────────────────────────────────────────────────
// Query Operations
// ─────────────────────────────────────────────────────────────────────────────

export function categories(): string[] {
  return Array.from(state.byCat.keys()).sort((a, b) => a.localeCompare(b));
}

export function list(category: string): string[] {
  const map = state.byCat.get(String(category || "").trim());
  if (!map) return [];
  return Array.from(map.keys()).sort((a, b) => a.localeCompare(b));
}

export function url(category: string, asset?: string): string;
export function url(asset: string): string;
export function url(a: string, b?: string): string {
  const { cat, asset, base } = normalize(a, b);

  const direct = state.byBase.get(base);
  if (direct) return direct;

  const map = state.byCat.get(cat);
  const u = map?.get(asset);
  if (u) return u;

  if (!state.baseUrl) throw new Error("MGCosmetic not initialized");
  if (!base) throw new Error("Invalid cosmetic name");

  return joinPath(state.baseUrl, `cosmetic/${base}.png`);
}
