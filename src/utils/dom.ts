/**
 * DOM utilities
 * Shared MutationObserver hub — a single observer on document.body
 * dispatches to all registered onAdded / onRemoved listeners.
 */

interface ObserverHandle {
  disconnect: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared hub — ONE MutationObserver for all onAdded / onRemoved callers
// ─────────────────────────────────────────────────────────────────────────────

type AddedEntry  = { selector: string; callback: (el: Element) => void };
type RemovedEntry = { selector: string; callback: (el: Element) => void };

const addedListeners  = new Set<AddedEntry>();
const removedListeners = new Set<RemovedEntry>();

let sharedObserver: MutationObserver | null = null;

function ensureSharedObserver(): void {
  if (sharedObserver) return;

  sharedObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      // ── Added nodes ──
      for (const node of mutation.addedNodes) {
        if (!(node instanceof Element)) continue;

        for (const entry of addedListeners) {
          if (node.matches(entry.selector)) {
            entry.callback(node);
          }
          const children = node.querySelectorAll(entry.selector);
          for (const child of children) {
            entry.callback(child);
          }
        }
      }

      // ── Removed nodes ──
      for (const node of mutation.removedNodes) {
        if (!(node instanceof Element)) continue;

        for (const entry of removedListeners) {
          if (node.matches(entry.selector)) {
            entry.callback(node);
          }
          const children = node.querySelectorAll(entry.selector);
          for (const child of children) {
            entry.callback(child);
          }
        }
      }
    }
  });

  sharedObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

function maybeStopSharedObserver(): void {
  if (addedListeners.size === 0 && removedListeners.size === 0 && sharedObserver) {
    sharedObserver.disconnect();
    sharedObserver = null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Watch for elements matching selector being added to DOM
 */
export function onAdded(
  selector: string,
  callback: (element: Element) => void
): ObserverHandle {
  ensureSharedObserver();

  const entry: AddedEntry = { selector, callback };
  addedListeners.add(entry);

  // Check for existing elements
  const existing = document.querySelectorAll(selector);
  for (const el of existing) {
    callback(el);
  }

  return {
    disconnect: () => {
      addedListeners.delete(entry);
      maybeStopSharedObserver();
    },
  };
}

/**
 * Watch for elements matching selector being removed from DOM
 */
export function onRemoved(
  selector: string,
  callback: (element: Element) => void
): ObserverHandle {
  ensureSharedObserver();

  const entry: RemovedEntry = { selector, callback };
  removedListeners.add(entry);

  return {
    disconnect: () => {
      removedListeners.delete(entry);
      maybeStopSharedObserver();
    },
  };
}

/**
 * Watch for changes to a specific element
 */
export function watch(element: Element, callback: () => void): ObserverHandle {
  const observer = new MutationObserver(() => {
    callback();
  });

  observer.observe(element, {
    childList: true,
    subtree: true,
    attributes: true,
    characterData: true,
  });

  return {
    disconnect: () => observer.disconnect(),
  };
}
