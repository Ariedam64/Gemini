/**
 * Minimal RFC 6902 JSON Patch implementation.
 * Mutates in place for performance.
 */

function decodePointer(path: string): string[] {
  return path
    .split("/")
    .slice(1)
    .map((s) => s.replace(/~1/g, "/").replace(/~0/g, "~"));
}

function isNumeric(value: string): boolean {
  return /^\d+$/.test(value);
}

/**
 * Apply a single patch operation to a target object.
 * Returns the (possibly replaced) root target.
 */
export function applyPatch(
  target: unknown,
  path: string,
  value: unknown,
  op: "add" | "replace" | "remove",
): unknown {
  const segments = decodePointer(path);
  if (segments.length === 0) return value !== undefined ? value : target;

  // Skip leading "data" segment (matches game's patch format)
  const startIdx = segments[0] === "data" ? 1 : 0;
  const segs = segments.slice(startIdx);
  if (segs.length === 0) return value !== undefined ? value : target;

  let current = target as Record<string, unknown>;

  // Navigate to the parent of the target key
  for (let i = 0; i < segs.length - 1; i++) {
    const key = segs[i];
    const nextKey = segs[i + 1];

    if (Array.isArray(current) && isNumeric(key)) {
      const idx = parseInt(key, 10);
      if (current[idx] === undefined || current[idx] === null) {
        (current as unknown as unknown[])[idx] = isNumeric(nextKey) ? [] : {};
      }
      current = current[idx] as Record<string, unknown>;
    } else if (typeof current === "object" && current !== null) {
      if (current[key] === undefined || current[key] === null) {
        current[key] = isNumeric(nextKey) ? [] : {};
      }
      current = current[key] as Record<string, unknown>;
    } else {
      return target;
    }
  }

  const lastKey = segs[segs.length - 1];

  if (op === "remove") {
    if (Array.isArray(current) && isNumeric(lastKey)) {
      current.splice(parseInt(lastKey, 10), 1);
    } else if (typeof current === "object" && current !== null) {
      delete current[lastKey];
    }
  } else {
    // add / replace
    if (Array.isArray(current) && isNumeric(lastKey)) {
      const idx = parseInt(lastKey, 10);
      while (current.length <= idx) current.push(null);
      current[idx] = value;
    } else if (typeof current === "object" && current !== null) {
      current[lastKey] = value;
    }
  }

  return target;
}
