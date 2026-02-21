import { redactValue } from './redact.js';

function safeKeys(storage) {
  try {
    const keys = [];
    for (let i = 0; i < storage.length; i += 1) {
      const k = storage.key(i);
      if (k != null) keys.push(k);
    }
    return keys;
  } catch {
    return [];
  }
}

export function snapshotStorage({ revealValues, maxValueChars } = {}) {
  const local = snapshotOneStorage('localStorage', window.localStorage, revealValues, maxValueChars);
  const session = snapshotOneStorage('sessionStorage', window.sessionStorage, revealValues, maxValueChars);
  return { local, session, capturedAt: Date.now() };
}

function snapshotOneStorage(name, storage, revealValues, maxValueChars) {
  if (!storage) return { name, ok: false, error: 'unavailable', entries: [] };
  const keys = safeKeys(storage);
  const entries = keys.map((key) => {
    let value = null;
    let ok = true;
    try {
      value = storage.getItem(key);
    } catch (e) {
      ok = false;
      value = String(e?.message || e);
    }
    const displayValue = revealValues ? redactValue(value, maxValueChars) : '[hidden]';
    return {
      key,
      value: displayValue,
      length: typeof value === 'string' ? value.length : null,
      ok,
    };
  });

  entries.sort((a, b) => a.key.localeCompare(b.key));
  return { name, ok: true, error: null, entries };
}

