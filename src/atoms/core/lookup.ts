// src/atoms/core/lookup.ts
// Atom lookup utilities: find atoms by label from the game's atom cache

import { pageWindow } from "../../utils/windowContext";

/* ================================= Cache ================================= */

// Use local module cache instead of pageWindow global to avoid Firefox context issues
const _labelCache = new Map<string, any>();

function getLabelCache(): Map<string, any> {
  return _labelCache;
}

/* ================================ Aliases ================================ */

/**
 * Labels the game has renamed, newest name first.
 *
 * A rename breaks every lookup silently, so instead of chasing call sites we
 * declare the whole chain once: the old name keeps working as a key, and the
 * cached bundles that still ship the old atom keep working too.
 */
const LABEL_ALIASES: Record<string, string[]> = {
  activeModalAtom: ["activeModalStateAtom", "activeModalAtom"],
  activeModalStateAtom: ["activeModalStateAtom", "activeModalAtom"],
};

/** Every label to try for `label`, in priority order. */
function candidatesFor(label: string): string[] {
  return LABEL_ALIASES[label] ?? [label];
}

/* ============================== Wait for atom ============================= */

// The mod boots before the game registers its Jotai atoms, so a lookup that
// happens too early finds nothing at all. Subscriptions wait instead of failing.
const ATOM_POLL_MS = 250;
const ATOM_WAIT_TIMEOUT_MS = 10 * 60_000;

type PendingWaiter = {
  label: string;
  expiresAt: number;
  resolve: (atom: any | null) => void;
};

// One shared timer for every pending wait: it stops as soon as nobody is left
// to serve, and restarts on demand.
const pendingWaiters = new Set<PendingWaiter>();
let pollTimerId: ReturnType<typeof setInterval> | null = null;

function stopPoller(): void {
  if (pollTimerId === null) return;
  clearInterval(pollTimerId);
  pollTimerId = null;
}

function pollPendingWaiters(): void {
  const now = Date.now();

  for (const waiter of Array.from(pendingWaiters)) {
    const atom = getAtomByLabel(waiter.label);
    if (atom) {
      pendingWaiters.delete(waiter);
      waiter.resolve(atom);
      continue;
    }
    if (now >= waiter.expiresAt) {
      pendingWaiters.delete(waiter);
      waiter.resolve(null);
    }
  }

  if (!pendingWaiters.size) stopPoller();
}

function ensurePoller(): void {
  if (pollTimerId !== null) return;
  pollTimerId = setInterval(pollPendingWaiters, ATOM_POLL_MS);
}

/* ================================= Lookup ================================= */

/**
 * Get the game's Jotai atom cache
 */
export function getAtomCache(): Map<any, any> | undefined {
  return (pageWindow as any).jotaiAtomCache?.cache;
}

/**
 * Find all atoms matching a regex pattern
 */
export function findAtomsByLabel(regex: RegExp): any[] {
  const cache = getAtomCache();
  if (!cache) return [];

  const results: any[] = [];

  for (const atom of cache.values()) {
    const label = atom?.debugLabel || atom?.label || "";
    if (regex.test(String(label))) {
      results.push(atom);
    }
  }

  return results;
}

/**
 * Get a single atom by its exact label (cached).
 *
 * Renamed labels resolve through {@link LABEL_ALIASES}, so a caller may keep
 * using the name it has always used.
 */
export function getAtomByLabel(label: string): any | null {
  const labelCache = getLabelCache();

  // Check cache first
  const cached = labelCache.get(label);
  if (cached) return cached;

  const atomCache = getAtomCache();
  if (!atomCache) return null;

  const wanted = candidatesFor(label);

  // A single pass over the cache, keeping the best-ranked match found so far:
  // the cache is not ordered, so the first hit is not necessarily the newest name.
  let bestAtom: any = null;
  let bestRank = Number.MAX_SAFE_INTEGER;

  for (const atom of atomCache.values()) {
    const atomLabel = String(atom?.debugLabel || atom?.label || "");
    const rank = wanted.indexOf(atomLabel);
    if (rank === -1 || rank >= bestRank) continue;

    bestAtom = atom;
    bestRank = rank;
    if (rank === 0) break;
  }

  if (bestAtom) labelCache.set(label, bestAtom);
  return bestAtom;
}

/** Whether an atom (or one of its aliases) is registered right now. */
export function hasAtomLabel(label: string): boolean {
  return !!getAtomByLabel(label);
}

/**
 * Resolve as soon as the label is registered by the game, or `null` on timeout.
 *
 * Returns synchronously when the atom already exists, so callers pay nothing
 * in the common case.
 */
export function waitForAtomByLabel(
  label: string,
  timeoutMs: number = ATOM_WAIT_TIMEOUT_MS
): Promise<any | null> {
  const existing = getAtomByLabel(label);
  if (existing) return Promise.resolve(existing);

  return new Promise((resolve) => {
    pendingWaiters.add({
      label,
      expiresAt: Date.now() + timeoutMs,
      resolve,
    });
    ensurePoller();
  });
}

/**
 * Clear the label cache (useful for debugging)
 */
export function clearLabelCache(): void {
  getLabelCache().clear();
}
