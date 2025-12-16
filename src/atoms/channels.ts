// src/store/channels.ts
import { HubEq, sig } from "./views";
import {
  gardenTileObjects, favoriteIds, myPetInfos, myPetSlotInfos,
  myCurrentGardenObject, myCurrentGrowSlotIndex, mySelectedItemName
} from "./atoms";

/* -------------------------- Simplified signatures ------------------------- */

// Garden slots (record): numeric key, simple signature using relevant fields
export const GardenSlotsSig = sig.record(gardenTileObjects, {
  key: (_item, key) => Number(key as string),
  sig: (item) => {
    const o: any = item || {};
    const type = o.objectType ?? o.type ?? "";
    const species = o.species ?? o.seedSpecies ?? o.plantSpecies ?? o.eggId ?? o.decorId ?? "";
    const t0 = o.plantedAt ?? o.startTime ?? 0;
    const t1 = o.maturedAt ?? o.endTime ?? 0;
    return `${type}|${species}|${t0}|${t1}`;
  },
});

// Pets (array): by id, “noisy” version
export const PetsByIdSig = sig.arrayById(myPetInfos, "slot.id", undefined);

// Pets (array): by id, stable version selecting specific fields
export const PetsByIdStableSig = sig.array(myPetInfos, {
  key: "slot.id",
  fields: ["slot.petSpecies", "slot.name", "slot.targetScale", "slot.mutations", "slot.abilities"],
});

// Favorites (array): key=id, constant signature
export const FavoriteIdsSig = sig.array(favoriteIds, {
  key: (_v, i) => i,
  sig: () => "1",
});

/* ------------------------------ Handy hooks --------------------------- */

export function onFavoriteIds(cb: (ids: string[]) => void) {
  return favoriteIds.onChange((next) => cb(Array.isArray(next) ? next : []), HubEq.idSet);
}
export async function onFavoriteIdsNow(cb: (ids: string[]) => void) {
  cb(Array.isArray(await favoriteIds.get()) ? await favoriteIds.get() : []);
  return onFavoriteIds(cb);
}

export const favoriteIdSet = {
  async get(): Promise<Set<string>> {
    const arr = await favoriteIds.get();
    return new Set(Array.isArray(arr) ? arr : []);
  },
  onChange(cb: (s: Set<string>) => void) {
    return favoriteIds.onChange((ids) => cb(new Set(Array.isArray(ids) ? ids : [])), HubEq.idSet);
  },
  async onChangeNow(cb: (s: Set<string>) => void) {
    cb(await this.get());
    return this.onChange(cb);
  },
};

export function onSelectedItemName(cb: (name: string | null) => void) {
  return mySelectedItemName.onChange(cb);
}
export async function onSelectedItemNameNow(cb: (name: string | null) => void) {
  cb(await mySelectedItemName.get());
  return mySelectedItemName.onChange(cb);
}

export function onCurrentGardenObject(cb: (obj: any) => void) {
  return myCurrentGardenObject.onChange(cb);
}
export async function onCurrentGardenObjectNow(cb: (obj: any) => void) {
  cb(await myCurrentGardenObject.get());
  return myCurrentGardenObject.onChange(cb);
}

export function onCurrentGrowSlotIndex(cb: (idx: number | null) => void) {
  return myCurrentGrowSlotIndex.onChange(cb);
}
export async function onCurrentGrowSlotIndexNow(cb: (idx: number | null) => void) {
  cb(await myCurrentGrowSlotIndex.get());
  return myCurrentGrowSlotIndex.onChange(cb);
}

/* ---------------------- Abilities triggers (compact) ---------------------- */

type XY = { x: number; y: number };
type PetAbilityTrigger =
  | { petId: string; abilityId: string | null; performedAt: number | null; data: any; position?: XY | null }
  | null;

function _abilitySig(a: any): string {
  if (!a) return "null";
  const id = typeof a?.abilityId === "string" ? a.abilityId : "";
  const ts = Number.isFinite(a?.performedAt) ? String(a.performedAt) : "";
  let data = "";
  try { data = JSON.stringify(a?.data ?? null); } catch { data = ""; }
  return `${id}|${ts}|${data}`;
}

export const PetAbilityByIdSig = sig.record(myPetSlotInfos, {
  // direct sub-object (myPetSlotInfos is already a record keyed by petId)
  sig: (entry, k) => _abilitySig(entry?.lastAbilityTrigger ?? null),
});

export function onPetsAbilityTriggers(cb: (map: Record<string, PetAbilityTrigger>) => void) {
  let prev = new Map<string, string>();
  return PetAbilityByIdSig.sub(({ value, changedKeys }) => {
    // Rebuild only changed; rebuilding the full value is simple enough too
    const out: Record<string, any> = {};
    for (const [petId, entry] of Object.entries(value as any)) {
      const lat = (entry as any)?.lastAbilityTrigger ?? null;
      const pos = (entry as any)?.position ?? null;
      out[petId] = {
        petId,
        abilityId: lat?.abilityId ?? null,
        performedAt: Number.isFinite(lat?.performedAt) ? lat.performedAt : null,
        data: lat?.data ?? null,
        position: pos ?? null,
      };
    }
    // Naive emit; compare prev vs current signature if you need extra filtering
    cb(out as Record<string, PetAbilityTrigger>);
  });
}
