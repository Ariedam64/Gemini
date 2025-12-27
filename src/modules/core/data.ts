// src/modules/core/data.ts
// MGData - Capture runtime game data (items, plants, pets, etc.) and expose simple accessors

import { pageWindow } from "../../utils/pageContext";
import { sleep } from "../utils/helpers";
import { MGSprite } from "../pixi/sprite";

type DataKey = "items" | "decor" | "mutations" | "eggs" | "pets" | "abilities" | "plants" | "weather";

type DataBag = Record<DataKey, any | null>;

const root = pageWindow as any;
const NativeObject = root.Object || Object;

const originalKeys = NativeObject.keys;
const originalValues = NativeObject.values;
const originalEntries = NativeObject.entries;

const signatureKeys: Record<
  Exclude<DataKey, "weather">,
  string[]
> = {
  items: ["WateringCan", "PlanterPot", "Shovel", "RainbowPotion"],
  decor: ["SmallRock", "MediumRock", "LargeRock", "WoodBench", "StoneBench", "MarbleBench"],
  mutations: ["Gold", "Rainbow", "Wet", "Chilled", "Frozen"],
  eggs: ["CommonEgg", "UncommonEgg", "RareEgg", "LegendaryEgg"],
  pets: ["Worm", "Snail", "Bee", "Chicken", "Bunny"],
  abilities: ["ProduceScaleBoost", "DoubleHarvest", "SeedFinderI", "CoinFinderI"],
  plants: ["Carrot", "Strawberry", "Aloe", "Blueberry", "Apple"],
};

const WEATHER_IDS = ["Rain", "Frost", "Dawn", "AmberMoon"];
const MAIN_BUNDLE_RE = /main-[^/]+\.js(\?|$)/;

const visited = new WeakSet<object>();

const state = {
  ready: false,
  hookInstalled: false,
  data: {
    items: null,
    decor: null,
    mutations: null,
    eggs: null,
    pets: null,
    abilities: null,
    plants: null,
    weather: null,
  } as DataBag,
  spritesResolved: false,
  spritesResolving: null as Promise<void> | null,
  weatherTimer: null as ReturnType<typeof setInterval> | null,
  weatherAttempts: 0,
};

const hasAllKeys = (keys: string[], required: string[]) => required.every((k) => keys.includes(k));

function setData(key: Exclude<DataKey, "weather">, value: any): void {
  if (state.data[key] != null) return;
  state.data[key] = value;

  if (allCaptured()) {
    restoreObjectHooks();
  }
}

function allCaptured(): boolean {
  return Object.values(state.data).every((v) => v != null);
}

// ---------- Runtime capture via Object.* patch ----------
function scanObject(obj: any, depth: number): void {
  if (!obj || typeof obj !== "object" || visited.has(obj)) return;
  visited.add(obj);

  let keys: string[];
  try {
    keys = originalKeys(obj);
  } catch {
    return;
  }
  if (!keys || keys.length === 0) return;

  let v: any;

  if (!state.data.items && hasAllKeys(keys, signatureKeys.items)) {
    v = (obj as any).WateringCan;
    if (v && typeof v === "object" && "coinPrice" in v && "creditPrice" in v) setData("items", obj);
  }

  if (!state.data.decor && hasAllKeys(keys, signatureKeys.decor)) {
    v = (obj as any).SmallRock;
    if (v && typeof v === "object" && "coinPrice" in v && "creditPrice" in v) setData("decor", obj);
  }

  if (!state.data.mutations && hasAllKeys(keys, signatureKeys.mutations)) {
    v = (obj as any).Gold;
    if (v && typeof v === "object" && "baseChance" in v && "coinMultiplier" in v) setData("mutations", obj);
  }

  if (!state.data.eggs && hasAllKeys(keys, signatureKeys.eggs)) {
    v = (obj as any).CommonEgg;
    if (v && typeof v === "object" && "faunaSpawnWeights" in v && "secondsToHatch" in v) setData("eggs", obj);
  }

  if (!state.data.pets && hasAllKeys(keys, signatureKeys.pets)) {
    v = (obj as any).Worm;
    if (v && typeof v === "object" && "coinsToFullyReplenishHunger" in v && Array.isArray(v.diet)) setData("pets", obj);
  }

  if (!state.data.abilities && hasAllKeys(keys, signatureKeys.abilities)) {
    v = (obj as any).ProduceScaleBoost;
    if (v && typeof v === "object" && "trigger" in v && "baseParameters" in v) setData("abilities", obj);
  }

  if (!state.data.plants && hasAllKeys(keys, signatureKeys.plants)) {
    v = (obj as any).Carrot;
    if (v && typeof v === "object" && (v as any).seed && (v as any).plant && (v as any).crop) setData("plants", obj);
  }

  if (depth >= 3) return;

  for (let i = 0; i < keys.length; i++) {
    let child: any;
    try {
      child = (obj as any)[keys[i]];
    } catch {
      continue;
    }
    if (child && typeof child === "object") scanObject(child, depth + 1);
  }
}

function tryCapture(target: any): void {
  try {
    scanObject(target, 0);
  } catch {}
}

function installObjectHooks(): void {
  if (state.hookInstalled) return;
  state.hookInstalled = true;

  try {
    NativeObject.keys = function hookedKeys(target: any): any {
      tryCapture(target);
      return originalKeys.apply(this, arguments as any);
    };

    if (originalValues) {
      NativeObject.values = function hookedValues(target: any): any {
        tryCapture(target);
        return (originalValues as any).apply(this, arguments as any);
      };
    }

    if (originalEntries) {
      NativeObject.entries = function hookedEntries(target: any): any {
        tryCapture(target);
        return (originalEntries as any).apply(this, arguments as any);
      };
    }
  } catch {}
}

function restoreObjectHooks(): void {
  if (!state.hookInstalled) return;
  try {
    NativeObject.keys = originalKeys;
    if (originalValues) NativeObject.values = originalValues;
    if (originalEntries) NativeObject.entries = originalEntries;
  } catch {}
  state.hookInstalled = false;
}

// ---------- Weather extraction ----------
function findMainBundleUrl(): string | null {
  try {
    for (const script of root.document?.scripts || []) {
      const src = script?.src ? String(script.src) : "";
      if (MAIN_BUNDLE_RE.test(src)) return src;
    }
  } catch {}

  try {
    for (const entry of root.performance?.getEntriesByType?.("resource") || []) {
      const name = entry?.name ? String(entry.name) : "";
      if (MAIN_BUNDLE_RE.test(name)) return name;
    }
  } catch {}

  return null;
}

function extractBalancedObjectLiteral(text: string, anchorIndex: number): string | null {
  const declStart = Math.max(
    text.lastIndexOf("const ", anchorIndex),
    text.lastIndexOf("let ", anchorIndex),
    text.lastIndexOf("var ", anchorIndex)
  );
  if (declStart < 0) return null;

  const eq = text.indexOf("=", declStart);
  if (eq < 0 || eq > anchorIndex) return null;

  const braceStart = text.indexOf("{", eq);
  if (braceStart < 0 || braceStart > anchorIndex) return null;

  let depth = 0;
  let quote = "";
  let escaped = false;

  for (let i = braceStart; i < text.length; i++) {
    const ch = text[i];

    if (quote) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (ch === "\\") {
        escaped = true;
        continue;
      }
      if (ch === quote) quote = "";
      continue;
    }

    if (ch === '"' || ch === "'") {
      quote = ch;
      continue;
    }
    if (ch === "{") depth++;
    else if (ch === "}" && --depth === 0) return text.slice(braceStart, i + 1);
  }

  return null;
}

function buildWeather(data: any): Record<string, any> | null {
  const out: Record<string, any> = {};
  let found = false;

  for (const id of WEATHER_IDS) {
    const blueprint = data?.[id];
    if (!blueprint || typeof blueprint !== "object") continue;
    const spriteId = (blueprint as any).iconSpriteKey || null;
    const { iconSpriteKey, ...rest } = blueprint as any;
    out[id] = { weatherId: id, spriteId, ...rest };
    found = true;
  }

  // Add Sunny fallback manually (not present in the bundle extraction)
  if (!out.Sunny) {
    out.Sunny = {
      weatherId: "Sunny",
      name: "Sunny",
      spriteId: "sprite/ui/SunnyIcon",
      type: "primary",
    };
  }

  if (!found) return null;

  if (out.Rain && out.Rain.mutator?.mutation !== "Wet") return null;

  return out;
}

async function loadWeatherFromBundle(): Promise<boolean> {
  if (state.data.weather) return true;

  const url = findMainBundleUrl();
  if (!url) return false;

  let bundleText = "";
  try {
    const res = await fetch(url, { credentials: "include" });
    if (!res.ok) return false;
    bundleText = await res.text();
  } catch {
    return false;
  }

  let anchor = bundleText.indexOf("fixedTimeSlots:[0,48,96,144,192,240]");
  if (anchor < 0) anchor = bundleText.indexOf('name:"Amber Moon"');
  if (anchor < 0) return false;

  const literal = extractBalancedObjectLiteral(bundleText, anchor);
  if (!literal) return false;

  const fixedLiteral = literal.replace(
    /\b[A-Za-z_$][\w$]*\.(Rain|Frost|Dawn|AmberMoon)\b/g,
    '"$1"'
  );

  let weatherDex: any;
  try {
    weatherDex = Function('"use strict";return(' + fixedLiteral + ")")();
  } catch {
    return false;
  }

  const weatherCatalog = buildWeather(weatherDex);
  if (!weatherCatalog) return false;

  state.data.weather = weatherCatalog;
  return true;
}

function startWeatherPolling(): void {
  if (state.weatherTimer) return;
  state.weatherAttempts = 0;

  const timer = setInterval(async () => {
    const ok = await loadWeatherFromBundle();
    if (ok || ++state.weatherAttempts > 200) {
      clearInterval(timer);
      state.weatherTimer = null;
    }
  }, 50);

  state.weatherTimer = timer;
}

// ---------- Sprite resolution ----------
function normalizeName(input: string): string {
  return String(input || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z0-9]/g, "")
    .trim();
}

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

function pickSpriteId(
  cat: string | null,
  idHint: string | null,
  nameHint: string | null,
  extraCats: string[] = [],
  idFallbacks: string[] = []
): string | null {
  const cats = catCandidates(cat, extraCats);
  if (!cats.length) return null;

  const idCandidates = [idHint, ...idFallbacks].filter((v) => typeof v === "string");

  const tryCandidate = (candidate: string | null): string | null => {
    const c = String(candidate || "").trim();
    if (!c) return null;
    for (const category of cats) {
      try {
        if (MGSprite.has(category, c)) return MGSprite.getIdPath(category, c);
      } catch {}
    }
    return null;
  };

  // 1) Try the id hint directly
  for (const cand of idCandidates) {
    const hit = tryCandidate(cand);
    if (hit) return hit;
  }

  // 2) Try from name (normalized)
  const normName = normalizeName(nameHint || "");
  const fromName = tryCandidate(normName || nameHint || "");
  if (fromName) return fromName;

  // 3) Search in the category list (contains/equals on leaf)
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
  } catch {}

  return null;
}

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
    } catch {}
  }

  // Rotation variants (if present)
  const rv = (target as any).rotationVariants;
  if (rv && typeof rv === "object") {
    for (const v of Object.values(rv)) {
      applySpriteId(v, category, idHint, nameHint);
    }
  }

  // Optional nested tileRefs commonly seen in plants
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

    // Mutation overlays (e.g., mutation-overlay/WetTallPlant)
    const overlay = resolveSpriteIdByHints(
      "mutation-overlay",
      [`${id}TallPlant`, `${id}TallPlantIcon`, id],
      (entry as any)?.name,
      ["mutation-overlay"]
    );
    if (overlay) {
      try { (entry as any).overlaySpriteId = overlay; } catch {}
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

async function resolveSprites(): Promise<void> {
  if (state.spritesResolved) return;
  if (state.spritesResolving) return state.spritesResolving;

  state.spritesResolving = (async () => {
    try {
      await waitAll(20000, 50);
      await MGSprite.init();
      resolveAllSprites(state.data);
      state.spritesResolved = true;
    } catch (err) {
      try { console.warn("[MGData] sprite resolution failed", err); } catch {}
    } finally {
      state.spritesResolving = null;
    }
  })();

  return state.spritesResolving;
}

// ---------- Public API ----------
async function init(): Promise<boolean> {
  if (state.ready) return true;

  installObjectHooks();
  startWeatherPolling();

  // Kick off sprite resolution in the background (once data + sprites are ready)
  void resolveSprites();

  state.ready = true;
  return true;
}

function ready(): boolean {
  return state.ready;
}

function stop(): boolean {
  restoreObjectHooks();
  if (state.weatherTimer) {
    clearInterval(state.weatherTimer);
    state.weatherTimer = null;
  }
  state.ready = false;
  return true;
}

function getAll(): DataBag {
  // Fire-and-forget sprite resolution to keep things updated
  if (!state.spritesResolved && !state.spritesResolving) {
    void resolveSprites();
  }
  return { ...state.data };
}

function get(key: DataKey): any | null {
  return state.data[key] ?? null;
}

function has(key: DataKey): boolean {
  return state.data[key] != null;
}

async function waitAll(timeoutMs = 10_000, intervalMs = 50): Promise<DataBag> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (Object.values(state.data).some((v) => v != null)) return { ...state.data };
    await sleep(intervalMs);
  }
  throw new Error("MGData.waitAll: timeout");
}

async function waitFor(key: DataKey, timeoutMs = 10_000, intervalMs = 50): Promise<any> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const v = state.data[key];
    if (v != null) return v;
    await sleep(intervalMs);
  }
  throw new Error(`MGData.waitFor: timeout waiting for "${key}"`);
}

export const MGData = {
  init, 

  ready,
  stop,

  getAll,
  get,
  
  has,

  waitAll,
  waitFor,
};

// Install capture early
installObjectHooks();
