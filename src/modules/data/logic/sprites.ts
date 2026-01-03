// src/modules/data/logic/sprites.ts
// Sprite ID resolution logic using MGSprite

import type { CapturedDataKey, DataBag } from "../types";
import { captureState } from "../state";

/**
 * Normalize a name for sprite lookup
 */
function normalizeNameForSprite(input: string): string {
  return String(input || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z0-9]/g, "")
    .trim();
}

/**
 * Get category candidates for sprite resolution
 */
function catCandidates(cat: string | null, extras: string[] = []): string[] {
  const list = new Set<string>();
  const add = (s: string | null | undefined) => {
    const v = String(s || "").trim();
    if (v) list.add(v);
  };

  add(cat);
  for (const e of extras) add(e);

  for (const c of Array.from(list.values())) {
    if (c.endsWith("s")) add(c.slice(0, -1));
    else add(`${c}s`);
    if (c.endsWith("es")) add(c.slice(0, -2));
  }

  return Array.from(list.values()).filter(Boolean);
}

/**
 * Pick sprite ID from MGSprite catalog
 */
function pickSpriteId(
  cat: string | null,
  idHint: string | null,
  nameHint: string | null,
  extraCats: string[] = [],
  idFallbacks: string[] = []
): string | null {
  const MGSprite = (window.Gemini?.Modules as any)?.Sprite;
  if (!MGSprite) return null;

  const cats = catCandidates(cat, extraCats);
  if (!cats.length) return null;

  const idCandidates = [idHint, ...idFallbacks].filter((v) => typeof v === "string");

  const tryCandidate = (candidate: string | null): string | null => {
    const c = String(candidate || "").trim();
    if (!c) return null;
    for (const category of cats) {
      try {
        if (MGSprite.has(category, c)) return MGSprite.getIdPath(category, c);
      } catch { }
    }
    return null;
  };

  // Try id hints directly
  for (const cand of idCandidates) {
    const hit = tryCandidate(cand);
    if (hit) return hit;
  }

  // Try from name (normalized)
  const normName = normalizeNameForSprite(nameHint || "");
  const fromName = tryCandidate(normName || nameHint || "");
  if (fromName) return fromName;

  // Search in the category list
  try {
    for (const category of cats) {
      const ids = MGSprite.listIds(`sprite/${category}/`);
      const idLcList = idCandidates.map((x) => String(x || "").toLowerCase());
      const nameLc = String(nameHint || normName || "").toLowerCase();

      for (const k of ids) {
        const leaf = k.split("/").pop() || "";
        const leafLc = leaf.toLowerCase();
        if (idLcList.some((c) => c && c === leafLc)) return k;
        if (leafLc === nameLc) return k;
      }

      for (const k of ids) {
        const leaf = k.split("/").pop() || "";
        const leafLc = leaf.toLowerCase();
        if (idLcList.some((c) => c && leafLc.includes(c))) return k;
        if (nameLc && leafLc.includes(nameLc)) return k;
      }
    }
  } catch { }

  return null;
}

/**
 * Apply sprite ID to an object
 */
function applySpriteId(
  target: any,
  catHint: string | null,
  idHint: string | null,
  nameHint: string | null,
  extraCats: string[] = [],
  idFallbacks: string[] = []
): void {
  if (!target || typeof target !== "object") return;
  const tileRef = target.tileRef;
  if (!tileRef || typeof tileRef !== "object") return;

  const category = String((tileRef as any).spritesheet || catHint || "").trim();
  const spriteId = pickSpriteId(category, idHint, nameHint, extraCats, idFallbacks);
  if (spriteId) {
    try {
      target.spriteId = spriteId;
    } catch { }
  }

  // Rotation variants
  const rv = (target as any).rotationVariants;
  if (rv && typeof rv === "object") {
    for (const v of Object.values(rv)) {
      applySpriteId(v, category, idHint, nameHint);
    }
  }

  // Nested tileRefs (plants)
  if ((target as any).immatureTileRef) {
    const wrapper = { tileRef: (target as any).immatureTileRef };
    applySpriteId(wrapper, category, idHint, nameHint);
    if ((wrapper as any).spriteId) (target as any).immatureSpriteId = (wrapper as any).spriteId;
  }

  if ((target as any).topmostLayerTileRef) {
    const wrapper = { tileRef: (target as any).topmostLayerTileRef };
    applySpriteId(wrapper, category, idHint, nameHint);
    if ((wrapper as any).spriteId) (target as any).topmostLayerSpriteId = (wrapper as any).spriteId;
  }

  if ((target as any).activeState && typeof (target as any).activeState === "object") {
    applySpriteId((target as any).activeState, category, idHint, (target as any).activeState?.name || nameHint);
  }
}

/**
 * Resolve sprite ID by hints
 */
function resolveSpriteIdByHints(
  category: string,
  hints: string[],
  nameHint?: string,
  extraCats: string[] = []
): string | null {
  if (!Array.isArray(hints) || hints.length === 0) return null;
  const primary = hints[0];
  const fallbacks = hints.slice(1);
  return pickSpriteId(category, primary, nameHint ?? null, extraCats, fallbacks);
}

/**
 * Resolve all sprites for a data bag
 */
function resolveAllSprites(bag: DataBag): void {
  // Items
  for (const [id, entry] of Object.entries(bag.items || {})) {
    applySpriteId(entry, "items", id, (entry as any)?.name, ["item"]);
  }

  // Decor
  for (const [id, entry] of Object.entries(bag.decor || {})) {
    applySpriteId(entry, "decor", id, (entry as any)?.name);
  }

  // Mutations
  for (const [id, entry] of Object.entries(bag.mutations || {})) {
    applySpriteId(entry, "mutations", id, (entry as any)?.name, ["mutation"]);

    const overlay = resolveSpriteIdByHints(
      "mutation-overlay",
      [`${id}TallPlant`, `${id}TallPlantIcon`, id],
      (entry as any)?.name,
      ["mutation-overlay"]
    );
    if (overlay) {
      try { (entry as any).overlaySpriteId = overlay; } catch { }
    }
  }

  // Eggs
  for (const [id, entry] of Object.entries(bag.eggs || {})) {
    applySpriteId(entry, "pets", id, (entry as any)?.name, ["pet"]);
  }

  // Pets
  for (const [id, entry] of Object.entries(bag.pets || {})) {
    applySpriteId(entry, "pets", id, (entry as any)?.name, ["pet"]);
  }

  // Plants (seed/plant/crop)
  for (const [id, entry] of Object.entries(bag.plants || {})) {
    const plant = entry as any;
    if (plant.seed) {
      applySpriteId(
        plant.seed,
        plant.seed?.tileRef?.spritesheet || "seeds",
        `${id}Seed`,
        plant.seed?.name || `${id} Seed`,
        ["seed", "plant", "plants"],
        [id]
      );
    }
    if (plant.plant) {
      applySpriteId(
        plant.plant,
        plant.plant?.tileRef?.spritesheet || "plants",
        `${id}Plant`,
        plant.plant?.name || `${id} Plant`,
        ["plant", "plants", "tallplants"],
        [id]
      );
    }
    if (plant.crop) {
      applySpriteId(
        plant.crop,
        plant.crop?.tileRef?.spritesheet || "plants",
        id,
        plant.crop?.name || id,
        ["plant", "plants"],
        [`${id}Crop`]
      );
    }
  }
}

/**
 * Resolve sprite IDs for all captured data
 */
export function resolveSprites(): void {
  try {
    resolveAllSprites(captureState.data);
  } catch (err) {
    try { console.warn("[MGData] sprite resolution failed", err); } catch { }
  }
}
