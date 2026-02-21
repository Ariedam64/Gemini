function safeGet(obj, path) {
  try {
    return path.reduce((acc, k) => (acc && k in acc ? acc[k] : undefined), obj);
  } catch {
    return undefined;
  }
}

export function getRoomWebSocketUrl(state) {
  // We do not attempt to inspect low-level sockets or peers.
  // Only show the connect URL (endpoint) if discoverable.
  const roomState = state?.roomState;
  const candidate =
    safeGet(roomState, ['child', 'connection', 'url']) ||
    safeGet(roomState, ['child', 'connection', 'wsUrl']) ||
    safeGet(roomState, ['child', 'wsUrl']) ||
    safeGet(window, ['MagicCircle_RoomConnection', 'url']) ||
    null;
  if (typeof candidate !== 'string' || !candidate) return null;
  try {
    const u = new URL(candidate);
    return `${u.protocol}//${u.host}${u.pathname}`;
  } catch {
    return candidate;
  }
}

