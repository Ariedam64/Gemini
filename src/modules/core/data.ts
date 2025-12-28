// src/modules/core/data.ts
// MGData - Captures runtime game data (items, plants, pets, etc.) via Object.* hooks
// and exposes simple accessors for the mod to consume.

import { pageWindow } from "../../utils/pageContext";
import { sleep } from "../utils/helpers";
import { MGSprite } from "../sprite";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type CapturedDataKey = "items" | "decor" | "mutations" | "eggs" | "pets" | "abilities" | "plants";
type DataKey = CapturedDataKey | "weather";
type DataBag = Record<DataKey, Record<string, unknown> | null>;

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const pageContext = pageWindow as Window & typeof globalThis;
const NativeObject = pageContext.Object ?? Object;

const originalObjectKeys = NativeObject.keys;
const originalObjectValues = NativeObject.values;
const originalObjectEntries = NativeObject.entries;

const SIGNATURE_KEYS: Record<CapturedDataKey, readonly string[]> = {
  items: ["WateringCan", "PlanterPot", "Shovel"],
  decor: ["SmallRock", "MediumRock", "LargeRock", "WoodBench", "StoneBench", "MarbleBench"],
  mutations: ["Gold", "Rainbow", "Wet", "Chilled", "Frozen"],
  eggs: ["CommonEgg", "UncommonEgg", "RareEgg"],
  pets: ["Worm", "Snail", "Bee", "Chicken", "Bunny"],
  abilities: ["ProduceScaleBoost", "DoubleHarvest", "SeedFinderI", "CoinFinderI"],
  plants: ["Carrot", "Strawberry", "Aloe", "Blueberry", "Apple"],
} as const;

const WEATHER_IDS = ["Rain", "Frost", "Dawn", "AmberMoon"] as const;
const MAIN_BUNDLE_PATTERN = /main-[^/]+\.js(\?|$)/;
const MAX_SCAN_DEPTH = 3;
const MAX_WEATHER_POLL_ATTEMPTS = 200;
const WEATHER_POLL_INTERVAL_MS = 50;

// ─────────────────────────────────────────────────────────────────────────────
// State
// ─────────────────────────────────────────────────────────────────────────────

const visitedObjects = new WeakSet<object>();

interface CaptureState {
  isReady: boolean;
  isHookInstalled: boolean;
  data: DataBag;
  spritesResolved: boolean;
  spritesResolving: Promise<void> | null;
  weatherPollingTimer: ReturnType<typeof setInterval> | null;
  weatherPollAttempts: number;
}

const captureState: CaptureState = {
  isReady: false,
  isHookInstalled: false,
  data: {
    items: null,
    decor: null,
    mutations: null,
    eggs: null,
    pets: null,
    abilities: null,
    plants: null,
    weather: null,
  },
  spritesResolved: false,
  spritesResolving: null,
  weatherPollingTimer: null,
  weatherPollAttempts: 0,
};

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

const containsAllKeys = (objectKeys: string[], requiredKeys: readonly string[]) =>
  requiredKeys.every((key) => objectKeys.includes(key));

function setCapturedData(key: CapturedDataKey, value: Record<string, unknown>): void {
  if (captureState.data[key] != null) return;
  captureState.data[key] = value;

  if (isAllDataCaptured()) {
    restoreObjectHooks();
  }
}

function isAllDataCaptured(): boolean {
  return Object.values(captureState.data).every((v) => v != null);
}

// ─────────────────────────────────────────────────────────────────────────────
// Runtime capture via Object.* hooks
// ─────────────────────────────────────────────────────────────────────────────

function scanObjectForData(obj: unknown, depth: number): void {
  if (!obj || typeof obj !== "object" || visitedObjects.has(obj)) return;
  visitedObjects.add(obj);

  let keys: string[];
  try {
    keys = originalObjectKeys(obj);
  } catch {
    return;
  }
  if (!keys || keys.length === 0) return;

  const record = obj as Record<string, unknown>;
  let sample: unknown;

  if (!captureState.data.items && containsAllKeys(keys, SIGNATURE_KEYS.items)) {
    sample = record.WateringCan;
    if (sample && typeof sample === "object" && "coinPrice" in sample && "creditPrice" in sample) {
      setCapturedData("items", record);
    }
  }

  if (!captureState.data.decor && containsAllKeys(keys, SIGNATURE_KEYS.decor)) {
    sample = record.SmallRock;
    if (sample && typeof sample === "object" && "coinPrice" in sample && "creditPrice" in sample) {
      setCapturedData("decor", record);
    }
  }

  if (!captureState.data.mutations && containsAllKeys(keys, SIGNATURE_KEYS.mutations)) {
    sample = record.Gold;
    if (sample && typeof sample === "object" && "baseChance" in sample && "coinMultiplier" in sample) {
      setCapturedData("mutations", record);
    }
  }

  if (!captureState.data.eggs && containsAllKeys(keys, SIGNATURE_KEYS.eggs)) {
    sample = record.CommonEgg;
    if (sample && typeof sample === "object" && "faunaSpawnWeights" in sample && "secondsToHatch" in sample) {
      setCapturedData("eggs", record);
    }
  }

  if (!captureState.data.pets && containsAllKeys(keys, SIGNATURE_KEYS.pets)) {
    sample = record.Worm;
    if (sample && typeof sample === "object" && "coinsToFullyReplenishHunger" in sample && "diet" in sample && Array.isArray((sample as Record<string, unknown>).diet)) {
      setCapturedData("pets", record);
    }
  }

  if (!captureState.data.abilities && containsAllKeys(keys, SIGNATURE_KEYS.abilities)) {
    sample = record.ProduceScaleBoost;
    if (sample && typeof sample === "object" && "trigger" in sample && "baseParameters" in sample) {
      setCapturedData("abilities", record);
    }
  }

  if (!captureState.data.plants && containsAllKeys(keys, SIGNATURE_KEYS.plants)) {
    sample = record.Carrot;
    if (sample && typeof sample === "object" && "seed" in sample && "plant" in sample && "crop" in sample) {
      setCapturedData("plants", record);
    }
  }

  if (depth >= MAX_SCAN_DEPTH) return;

  for (const key of keys) {
    let child: unknown;
    try {
      child = record[key];
    } catch {
      continue;
    }
    if (child && typeof child === "object") {
      scanObjectForData(child, depth + 1);
    }
  }
}

function tryCapture(target: unknown): void {
  try {
    scanObjectForData(target, 0);
  } catch {}
}

function installObjectHooks(): void {
  if (captureState.isHookInstalled) return;
  captureState.isHookInstalled = true;

  try {
    NativeObject.keys = function hookedKeys(target: any): any {
      tryCapture(target);
      return originalObjectKeys.apply(this, arguments as any);
    };

    if (originalObjectValues) {
      NativeObject.values = function hookedValues(target: any): any {
        tryCapture(target);
        return (originalObjectValues as any).apply(this, arguments as any);
      };
    }

    if (originalObjectEntries) {
      NativeObject.entries = function hookedEntries(target: any): any {
        tryCapture(target);
        return (originalObjectEntries as any).apply(this, arguments as any);
      };
    }
  } catch {}
}

function restoreObjectHooks(): void {
  if (!captureState.isHookInstalled) return;
  try {
    NativeObject.keys = originalObjectKeys;
    if (originalObjectValues) NativeObject.values = originalObjectValues;
    if (originalObjectEntries) NativeObject.entries = originalObjectEntries;
  } catch {}
  captureState.isHookInstalled = false;
}

// ─────────────────────────────────────────────────────────────────────────────
// Weather extraction (from main bundle)
// ─────────────────────────────────────────────────────────────────────────────

function findMainBundleUrl(): string | null {
  try {
    for (const script of pageContext.document?.scripts || []) {
      const src = script?.src ? String(script.src) : "";
      if (MAIN_BUNDLE_PATTERN.test(src)) return src;
    }
  } catch {}

  try {
    for (const entry of pageContext.performance?.getEntriesByType?.("resource") || []) {
      const name = entry?.name ? String(entry.name) : "";
      if (MAIN_BUNDLE_PATTERN.test(name)) return name;
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
  if (captureState.data.weather) return true;

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

  captureState.data.weather = weatherCatalog;
  return true;
}

function startWeatherPolling(): void {
  if (captureState.weatherPollingTimer) return;
  captureState.weatherPollAttempts = 0;

  const timer = setInterval(async () => {
    const success = await loadWeatherFromBundle();
    if (success || ++captureState.weatherPollAttempts > MAX_WEATHER_POLL_ATTEMPTS) {
      clearInterval(timer);
      captureState.weatherPollingTimer = null;
    }
  }, WEATHER_POLL_INTERVAL_MS);

  captureState.weatherPollingTimer = timer;
}

// ─────────────────────────────────────────────────────────────────────────────
// Sprite resolution
// ─────────────────────────────────────────────────────────────────────────────

function normalizeNameForSprite(input: string): string {
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
  const normName = normalizeNameForSprite(nameHint || "");
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
  if (captureState.spritesResolved) return;
  if (captureState.spritesResolving) return captureState.spritesResolving;

  captureState.spritesResolving = (async () => {
    try {
      await waitForAnyData(20_000, 50);
      await MGSprite.init();
      resolveAllSprites(captureState.data);
      captureState.spritesResolved = true;
    } catch (err) {
      try { console.warn("[MGData] sprite resolution failed", err); } catch {}
    } finally {
      captureState.spritesResolving = null;
    }
  })();

  return captureState.spritesResolving;
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

async function init(): Promise<boolean> {
  if (captureState.isReady) return true;

  installObjectHooks();
  startWeatherPolling();

  void resolveSprites();

  captureState.isReady = true;
  return true;
}

function isReady(): boolean {
  return captureState.isReady;
}

function stop(): boolean {
  restoreObjectHooks();
  if (captureState.weatherPollingTimer) {
    clearInterval(captureState.weatherPollingTimer);
    captureState.weatherPollingTimer = null;
  }
  captureState.isReady = false;
  return true;
}

function getAll(): DataBag {
  if (!captureState.spritesResolved && !captureState.spritesResolving) {
    void resolveSprites();
  }
  return { ...captureState.data };
}

function get(key: DataKey): Record<string, unknown> | null {
  return captureState.data[key] ?? null;
}

function has(key: DataKey): boolean {
  return captureState.data[key] != null;
}

async function waitForAnyData(timeoutMs = 10_000, intervalMs = 50): Promise<DataBag> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (Object.values(captureState.data).some((v) => v != null)) {
      return { ...captureState.data };
    }
    await sleep(intervalMs);
  }
  throw new Error("MGData.waitForAnyData: timeout");
}

async function waitFor(key: DataKey, timeoutMs = 10_000, intervalMs = 50): Promise<Record<string, unknown>> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const value = captureState.data[key];
    if (value != null) return value;
    await sleep(intervalMs);
  }
  throw new Error(`MGData.waitFor: timeout waiting for "${key}"`);
}

export const MGData = {
  init,
  isReady,
  stop,

  getAll,
  get,
  has,

  waitForAnyData,
  waitFor,
};

// Install capture early
installObjectHooks();