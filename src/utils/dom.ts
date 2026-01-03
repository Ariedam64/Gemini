/**
 * DOM utilities
 * MutationObserver helpers for detecting element addition/removal
 */

interface ObserverHandle {
  disconnect: () => void;
}

/**
 * Watch for elements matching selector being added to DOM
 */
export function onAdded(
  selector: string,
  callback: (element: Element) => void
): ObserverHandle {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (!(node instanceof Element)) continue;

        if (node.matches(selector)) {
          callback(node);
        }

        // Check children
        const children = node.querySelectorAll(selector);
        for (const child of children) {
          callback(child);
        }
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Check for existing elements
  const existing = document.querySelectorAll(selector);
  for (const el of existing) {
    callback(el);
  }

  return {
    disconnect: () => observer.disconnect(),
  };
}

/**
 * Watch for elements matching selector being removed from DOM
 */
export function onRemoved(
  selector: string,
  callback: (element: Element) => void
): ObserverHandle {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.removedNodes) {
        if (!(node instanceof Element)) continue;

        if (node.matches(selector)) {
          callback(node);
        }

        // Check children
        const children = node.querySelectorAll(selector);
        for (const child of children) {
          callback(child);
        }
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  return {
    disconnect: () => observer.disconnect(),
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
