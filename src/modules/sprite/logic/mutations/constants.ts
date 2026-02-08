// src/modules/sprite/logic/mutations/constants.ts
// Mutation system constants and utilities

import type { MutationName, MutationMeta, VariantSignature, PipelineStep } from "../../types";

// ─────────────────────────────────────────────────────────────────────────────
// Mutation Metadata
// ─────────────────────────────────────────────────────────────────────────────

export const MUT_META: Record<MutationName, MutationMeta> = {
  Gold: { overlayTall: null, tallIconOverride: null },
  Rainbow: { overlayTall: null, tallIconOverride: null, angle: 130, angleTall: 0 },
  Wet: { overlayTall: "sprite/mutation-overlay/WetTallPlant", tallIconOverride: "sprite/mutation/Puddle" },
  Chilled: { overlayTall: "sprite/mutation-overlay/ChilledTallPlant", tallIconOverride: null },
  Frozen: { overlayTall: "sprite/mutation-overlay/FrozenTallPlant", tallIconOverride: null },
  Thunderstruck: { overlayTall: 'sprite/mutation-overlay/ThunderstruckTallPlant', tallIconOverride: 'sprite/mutation/ThunderstruckGround' },
  Dawnlit: { overlayTall: null, tallIconOverride: null },
  Ambershine: { overlayTall: null, tallIconOverride: null },
  Dawncharged: { overlayTall: null, tallIconOverride: null },
  Ambercharged: { overlayTall: null, tallIconOverride: null },
};

export const MUT_NAMES = Object.keys(MUT_META) as MutationName[];

// ─────────────────────────────────────────────────────────────────────────────
// Mutation Ordering
// ─────────────────────────────────────────────────────────────────────────────

export const MUTATION_ORDER: MutationName[] = [
  "Gold",
  "Rainbow",
  "Wet",
  "Chilled",
  "Frozen",
  "Thunderstruck",
  "Ambershine",
  "Dawnlit",
  "Dawncharged",
  "Ambercharged",
];

const MUTATION_INDEX = new Map(MUTATION_ORDER.map((m, idx) => [m, idx]));

export function sortMutations(list: MutationName[]): MutationName[] {
  const uniq = [...new Set(list.filter(Boolean))];
  return uniq.sort((a, b) => {
    return (MUTATION_INDEX.get(a) ?? Infinity) - (MUTATION_INDEX.get(b) ?? Infinity);
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Mutation Groups (for normalization)
// ─────────────────────────────────────────────────────────────────────────────

export const MUT_G1: MutationName[] = ["Gold", "Rainbow"];
export const MUT_G2: MutationName[] = ["Wet", "Chilled", "Frozen", "Thunderstruck"];
export const MUT_G3: MutationName[] = ["Dawnlit", "Ambershine", "Dawncharged", "Ambercharged"];

// ─────────────────────────────────────────────────────────────────────────────
// Floating Icons (rendered above plant)
// ─────────────────────────────────────────────────────────────────────────────

export const FLOATING_MUTATION_ICONS = new Set<MutationName>([
  "Dawnlit",
  "Ambershine",
  "Dawncharged",
  "Ambercharged",
]);

// ─────────────────────────────────────────────────────────────────────────────
// Icon Position Exceptions
// ─────────────────────────────────────────────────────────────────────────────

export const MUT_ICON_Y_EXCEPT: Record<string, number> = {
  Banana: 0.68,
  Beet: 0.65,
  Carrot: 0.6,
  Sunflower: 0.5,
  Starweaver: 0.5,
  FavaBean: 0.25,
  BurrosTail: 0.2,
};

export const MUT_ICON_X_EXCEPT: Record<string, number> = {
  Pepper: 0.6,
  Banana: 0.6,
};

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

export const TILE_SIZE_WORLD = 256;
export const BASE_ICON_SCALE = 0.5;
export const TALL_PLANT_MUTATION_ICON_SCALE_BOOST = 2;

// ─────────────────────────────────────────────────────────────────────────────
// Variant Signature
// ─────────────────────────────────────────────────────────────────────────────

export function computeVariantSignature(mutations: MutationName[]): VariantSignature {
  if (!mutations.length) {
    return { muts: [], overlayMuts: [], selectedMuts: [], sig: "" };
  }

  const selected = sortMutations(mutations);
  const muts = normalizeMutListColor(mutations);
  const overlayMuts = normalizeMutListOverlay(mutations);

  return {
    muts,
    overlayMuts,
    selectedMuts: selected,
    sig: `${selected.join(",")}|${muts.join(",")}|${overlayMuts.join(",")}`,
  };
}

export function normalizeMutListColor(list: MutationName[]): MutationName[] {
  const names = list.filter((m, idx, arr) => MUT_META[m] && arr.indexOf(m) === idx);
  if (!names.length) return [];

  if (names.includes("Gold")) return ["Gold"];
  if (names.includes("Rainbow")) return ["Rainbow"];

  const warm: MutationName[] = ["Ambershine", "Dawnlit", "Dawncharged", "Ambercharged"];
  const hasWarm = names.some((n) => warm.includes(n));
  if (hasWarm) {
    return sortMutations(names.filter((n) => !MUT_G2.includes(n)));
  }

  return sortMutations(names);
}

export function normalizeMutListOverlay(list: MutationName[]): MutationName[] {
  const names = list.filter((m, idx, arr) => MUT_META[m]?.overlayTall && arr.indexOf(m) === idx);
  return sortMutations(names);
}

// ─────────────────────────────────────────────────────────────────────────────
// Pipeline Step
// ─────────────────────────────────────────────────────────────────────────────

export function buildMutationPipeline(mutNames: MutationName[], isTall: boolean): PipelineStep[] {
  return mutNames.map((m) => ({
    name: m,
    meta: MUT_META[m],
    overlayTall: MUT_META[m]?.overlayTall ?? null,
    isTall,
  }));
}
