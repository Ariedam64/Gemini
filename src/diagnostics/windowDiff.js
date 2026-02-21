export function captureWindowBaseline() {
  try {
    return Array.from(Object.getOwnPropertyNames(window)).sort();
  } catch {
    return [];
  }
}

export function diffWindowKeys(baselineKeys) {
  const baseline = new Set(Array.isArray(baselineKeys) ? baselineKeys : []);
  let current = [];
  try {
    current = Object.getOwnPropertyNames(window);
  } catch {
    current = [];
  }

  const added = [];
  for (const k of current) {
    if (!baseline.has(k)) added.push(k);
  }
  added.sort();
  return { added, capturedAt: Date.now() };
}

