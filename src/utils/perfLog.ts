/**
 * Temporary performance logging — REMOVE after diagnosis
 *
 * Collects call counts + total duration per key over 3-second windows,
 * then prints a summary table to console.
 *
 * Usage:
 *   import { perfMark } from '../utils/perfLog';
 *   const end = perfMark('currentTile.flush');
 *   // ... do work ...
 *   end();
 *
 * Or for counting only:
 *   import { perfCount } from '../utils/perfLog';
 *   perfCount('atom:gardenObject');
 */

interface PerfEntry {
  calls: number;
  totalMs: number;
}

const INTERVAL_MS = 3000;

const entries = new Map<string, PerfEntry>();
let started = false;

function ensureStarted(): void {
  if (started) return;
  started = true;

  setInterval(() => {
    if (entries.size === 0) return;

    const rows: { key: string; calls: number; totalMs: string; avgMs: string }[] = [];

    for (const [key, entry] of entries) {
      rows.push({
        key,
        calls: entry.calls,
        totalMs: entry.totalMs.toFixed(2),
        avgMs: entry.calls > 0 ? (entry.totalMs / entry.calls).toFixed(2) : '0',
      });
    }

    // Sort by totalMs desc
    rows.sort((a, b) => parseFloat(b.totalMs) - parseFloat(a.totalMs));

    console.log(`%c[Gemini PerfLog] Last ${INTERVAL_MS / 1000}s:`, 'color: #ff6b6b; font-weight: bold');
    console.table(rows);

    entries.clear();
  }, INTERVAL_MS);
}

function getEntry(key: string): PerfEntry {
  let entry = entries.get(key);
  if (!entry) {
    entry = { calls: 0, totalMs: 0 };
    entries.set(key, entry);
  }
  return entry;
}

/**
 * Start a timed measurement. Call the returned function to end it.
 */
export function perfMark(key: string): () => void {
  ensureStarted();
  const start = performance.now();
  return () => {
    const elapsed = performance.now() - start;
    const entry = getEntry(key);
    entry.calls++;
    entry.totalMs += elapsed;
  };
}

/**
 * Count an occurrence (no timing).
 */
export function perfCount(key: string): void {
  ensureStarted();
  const entry = getEntry(key);
  entry.calls++;
}
