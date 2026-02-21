import { redactValue } from './redact.js';

function toUrlString(input) {
  try {
    if (typeof input === 'string') return input;
    if (input && typeof input.url === 'string') return input.url;
    return String(input || '');
  } catch {
    return '';
  }
}

function safeMethod(init) {
  try {
    const m = init && typeof init.method === 'string' ? init.method : null;
    return (m || 'GET').toUpperCase();
  } catch {
    return 'GET';
  }
}

function normalizeUrl(url) {
  try {
    const u = new URL(url, location.href);
    // Drop query/hash by default; avoid leaking tokens.
    return `${u.origin}${u.pathname}`;
  } catch {
    return redactValue(url, 240);
  }
}

export function installNetworkCapture(state) {
  if (!state?.diagnostics?.network) return () => {};
  const net = state.diagnostics.network;
  if (net.enabled) return () => {};
  net.enabled = true;

  const cleanups = [];
  const pushEntry = (entry) => {
    net.entries.push(entry);
    const max = Math.max(10, Number(net.maxEntries) || 200);
    if (net.entries.length > max) net.entries.splice(0, net.entries.length - max);
  };

  // fetch()
  const originalFetch = window.fetch ? window.fetch.bind(window) : null;
  if (originalFetch) {
    window.fetch = (input, init) => {
      try {
        pushEntry({
          at: Date.now(),
          kind: 'fetch',
          method: safeMethod(init),
          url: normalizeUrl(toUrlString(input)),
        });
      } catch {
        // ignore
      }
      return originalFetch(input, init);
    };
    cleanups.push(() => {
      window.fetch = originalFetch;
    });
  }

  // XHR
  if (window.XMLHttpRequest && window.XMLHttpRequest.prototype) {
    const proto = window.XMLHttpRequest.prototype;
    const originalOpen = proto.open;
    proto.open = function open(method, url, ...rest) {
      try {
        pushEntry({
          at: Date.now(),
          kind: 'xhr',
          method: String(method || 'GET').toUpperCase(),
          url: normalizeUrl(toUrlString(url)),
        });
      } catch {
        // ignore
      }
      return originalOpen.call(this, method, url, ...rest);
    };
    cleanups.push(() => {
      proto.open = originalOpen;
    });
  }

  return () => {
    net.enabled = false;
    for (const fn of cleanups) {
      try { fn(); } catch { /* ignore */ }
    }
  };
}

