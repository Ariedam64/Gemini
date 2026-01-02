import { loadFromTampermonkey, saveToTampermonkey } from "../../hud/state/storage";

// Storage (sections namespace)
// Note: Key uses old format (gemini.sections) - will be migrated by bootstrap
const K_SECTIONS = "gemini.sections";
type SectionsStorage = Record<string, unknown>;

function readSectionsStorage(): SectionsStorage {
  const raw = loadFromTampermonkey<SectionsStorage>(K_SECTIONS, {});
  return raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {};
}

function writeSectionsStorage(next: SectionsStorage) {
  saveToTampermonkey<SectionsStorage>(K_SECTIONS, next);
}

export async function readSectionRaw<T = any>(path: string): Promise<T | undefined> {
  const vals = readSectionsStorage();
  return vals[path] as T | undefined;
}
export function writeSection(path: string, value: unknown) {
  const vals = readSectionsStorage();
  writeSectionsStorage({ ...vals, [path]: value });
}

// Sanitizers & helpers
export function ensureBoolean(v: unknown, def = false): boolean {
  return typeof v === "boolean" ? v : def;
}
export function ensureNumber(v: unknown, def = 0): number {
  const n = Number(v); return Number.isFinite(n) ? n : def;
}
export function clampNumber(v: unknown, min = 0, max = Number.MAX_SAFE_INTEGER, def = 0) {
  const n = ensureNumber(v, def); return Math.min(max, Math.max(min, Math.floor(n)));
}
export function numberRange(obj: { min?: unknown; max?: unknown }, defMin = 0, defMax = 0) {
  const min = clampNumber(obj?.min, 0, Number.MAX_SAFE_INTEGER, defMin);
  const max = clampNumber(obj?.max, min, Number.MAX_SAFE_INTEGER, defMax);
  return { min, max };
}
export function stringArray(v: unknown): string[] {
  if (Array.isArray(v)) return v.map(String).filter(Boolean);
  if (v == null) return [];
  return [String(v)];
}
export function unique<T>(arr: T[]): T[] { return Array.from(new Set(arr)); }
export function mergeExpanded<T extends string>(
  current: Record<T, boolean>,
  patch?: Partial<Record<T, boolean>>
): Record<T, boolean> {
  return { ...current, ...(patch ?? {}) } as Record<T, boolean>;
}
export function toggleExpanded<T extends string>(
  current: Record<T, boolean>,
  key: T
): Record<T, boolean> {
  return { ...current, [key]: !current[key] } as Record<T, boolean>;
}

// Generic section state factory
export type SectionStateConfig<T extends object> = {
  path: string;
  version: number;
  defaults: T;
  migrate?: (raw: any) => T;
  sanitize?: (v: T) => T;
};
export type SectionStateController<T extends object> = {
  get(): T;
  set(next: T): void;
  update(patch: Partial<T> | ((draft: T) => void)): void;
  save(): void;
};
export async function createSectionState<T extends object>(cfg: SectionStateConfig<T>): Promise<SectionStateController<T>> {
  const raw = await readSectionRaw<any>(cfg.path);

  let state: T;
  if (cfg.migrate) state = cfg.migrate(raw);
  else state = (raw ?? {}) as T;

  const clone = <U extends object>(v: U): U => JSON.parse(JSON.stringify(v));
  state = Object.assign(clone(cfg.defaults), state);
  if (cfg.sanitize) state = cfg.sanitize(state);

  function commit() { writeSection(cfg.path, state); }
  function get() { return state; }
  function set(next: T) { state = cfg.sanitize ? cfg.sanitize(next) : next; commit(); }
  function update(patch: Partial<T> | ((draft: T) => void)) {
    const clone = <U extends object>(v: U): U => JSON.parse(JSON.stringify(v));
    const base: T = Object.assign(clone(state), {}) as T;
    if (typeof patch === "function") (patch as (draft: T) => void)(base);
    else Object.assign(base as any, patch as any);
    state = cfg.sanitize ? cfg.sanitize(base) : base;
    commit();
  }
  function save() { commit(); }
  return { get, set, update, save };
}

/** Convenience: build a section store using section id as default path. */
export async function createSectionStore<T extends object>(
  sectionId: string,
  cfg: Omit<SectionStateConfig<T>, "path"> & { path?: string }
) {
  const { path = sectionId, ...rest } = cfg as any;
  return createSectionState<T>({ path, ...(rest as any) });
}
