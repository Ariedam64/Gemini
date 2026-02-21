import { snapshotStorage } from './storage.js';
import { captureWindowBaseline, diffWindowKeys } from './windowDiff.js';
import { installNetworkCapture } from './network.js';
import { getRoomWebSocketUrl } from './ws.js';

export function initDiagnostics(state) {
  if (!state.diagnostics) return () => {};
  if (!state.diagnostics.baselineWindowKeys) {
    state.diagnostics.baselineWindowKeys = captureWindowBaseline();
    state.diagnostics.readyAt = Date.now();
  }

  let cleanupNetwork = () => {};
  try {
    cleanupNetwork = installNetworkCapture(state);
  } catch {
    cleanupNetwork = () => {};
  }

  return () => {
    try { cleanupNetwork(); } catch { /* ignore */ }
  };
}

export function buildDiagnosticsSnapshot(state) {
  const storage = snapshotStorage({
    revealValues: !!state?.diagnostics?.storage?.revealValues,
    maxValueChars: state?.diagnostics?.storage?.maxValueChars,
  });
  const windowDiff = diffWindowKeys(state?.diagnostics?.baselineWindowKeys || []);
  const wsUrl = getRoomWebSocketUrl(state);
  const network = {
    enabled: !!state?.diagnostics?.network?.enabled,
    maxEntries: state?.diagnostics?.network?.maxEntries,
    entries: Array.isArray(state?.diagnostics?.network?.entries) ? state.diagnostics.network.entries.slice() : [],
  };
  return {
    capturedAt: Date.now(),
    storage,
    window: windowDiff,
    wsUrl,
    network,
  };
}

