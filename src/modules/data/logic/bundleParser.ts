// src/modules/data/logic/bundleParser.ts
// Shared utilities for parsing the main game bundle

import { pageWindow } from "../../../utils/windowContext";
import { MAIN_BUNDLE_PATTERN } from "./constants";

const pageContext = pageWindow as Window & typeof globalThis;

/**
 * Find main bundle URL from scripts or performance entries
 */
export function findMainBundleUrl(): string | null {
  try {
    for (const script of pageContext.document?.scripts || []) {
      const src = script?.src ? String(script.src) : "";
      if (MAIN_BUNDLE_PATTERN.test(src)) return src;
    }
  } catch { }

  try {
    for (const entry of pageContext.performance?.getEntriesByType?.("resource") || []) {
      const name = entry?.name ? String(entry.name) : "";
      if (MAIN_BUNDLE_PATTERN.test(name)) return name;
    }
  } catch { }

  return null;
}

/**
 * Find all indices of a substring
 */
export function findAllIndices(haystack: string, needle: string): number[] {
  const out: number[] = [];
  let idx = haystack.indexOf(needle);
  while (idx !== -1) {
    out.push(idx);
    idx = haystack.indexOf(needle, idx + needle.length);
  }
  return out;
}

/**
 * Extract balanced block from text starting at open brace
 * Handles nested braces and string literals
 */
export function extractBalancedBlock(text: string, openBraceIndex: number): string | null {
  let depth = 0;
  let quote = "";
  let escaped = false;

  for (let i = openBraceIndex; i < text.length; i++) {
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

    if (ch === '"' || ch === "'" || ch === "`") {
      quote = ch;
      continue;
    }
    if (ch === "{") depth++;
    else if (ch === "}" && --depth === 0) return text.slice(openBraceIndex, i + 1);
  }

  return null;
}

/**
 * Extract balanced object literal from text starting at anchor index
 * Looks backwards for variable declaration, then extracts the object
 */
export function extractBalancedObjectLiteral(text: string, anchorIndex: number): string | null {
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

  return extractBalancedBlock(text, braceStart);
}

/**
 * Bundle cache (shared across weather/colors to avoid duplicate downloads)
 */
let bundleCache: string | null = null;
let bundleFetchInFlight: Promise<string | null> | null = null;

/**
 * Fetch main bundle text (cached)
 * If multiple callers request simultaneously, only one fetch occurs
 */
export async function fetchMainBundle(): Promise<string | null> {
  // Return cached bundle if available
  if (bundleCache) return bundleCache;

  // Return in-flight promise if fetch is already happening
  if (bundleFetchInFlight) return bundleFetchInFlight;

  // Start new fetch
  bundleFetchInFlight = (async () => {
    const url = findMainBundleUrl();
    if (!url) return null;

    try {
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) return null;
      const text = await res.text();
      bundleCache = text; // Cache the result
      return text;
    } catch {
      return null;
    } finally {
      bundleFetchInFlight = null;
    }
  })();

  return bundleFetchInFlight;
}
