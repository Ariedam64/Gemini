/**
 * Scroll Lock Utilities
 * 
 * Cross-cutting scroll lock helpers for drag-and-drop operations.
 * Prevents parent containers from scrolling during reorder operations.
 * 
 * Per .claude/rules/utils.md:
 * - Cross-cutting helpers only
 * - Dependency leaves (no imports from UI features)
 * - One concept per file
 * - Small stable API
 * 
 * @module scrollLock
 */

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

/** Cleanup function to release scroll lock */
export type ScrollLockRelease = () => void;

// ─────────────────────────────────────────────────────────────────────────────
// Utilities
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Check if an element is scrollable
 */
export function isScrollable(el: HTMLElement): boolean {
    const style = getComputedStyle(el);
    if (!/(auto|scroll|overlay)/.test(style.overflowY + style.overflowX)) return false;
    const sh = el.scrollHeight;
    const ch = el.clientHeight;
    const sw = el.scrollWidth;
    const cw = el.clientWidth;
    return (sh > ch + 1) || (sw > cw + 1);
}

/**
 * Lock scroll on a single element
 */
function lockElementScroll(el: HTMLElement): ScrollLockRelease {
    const prev = {
        overflow: el.style.overflow,
        overflowY: el.style.overflowY,
        overflowX: el.style.overflowX,
        touchAction: el.style.touchAction,
        overscrollBehavior: el.style.overscrollBehavior,
    };
    el.style.overflow = "hidden";
    el.style.overflowY = "hidden";
    el.style.overflowX = "hidden";
    el.style.touchAction = "none";
    el.style.overscrollBehavior = "contain";
    let released = false;
    return () => {
        if (released) return;
        released = true;
        el.style.overflow = prev.overflow;
        el.style.overflowY = prev.overflowY;
        el.style.overflowX = prev.overflowX;
        el.style.touchAction = prev.touchAction;
        el.style.overscrollBehavior = prev.overscrollBehavior;
    };
}

/**
 * Collect all scrollable ancestors of an element including Shadow DOM traversal
 */
function collectScrollableAncestors(start: HTMLElement): HTMLElement[] {
    const out: HTMLElement[] = [];
    const seen = new Set<HTMLElement>();
    let node: Node | null = start;

    while (node) {
        if (node instanceof ShadowRoot) {
            node = node.host;
            continue;
        }
        if (node instanceof HTMLElement) {
            if (!seen.has(node) && node !== start && isScrollable(node)) {
                out.push(node);
                seen.add(node);
            }
            node = node.parentElement ?? node.parentNode;
        } else {
            break;
        }
    }

    if (document.body) out.push(document.body);
    if (document.documentElement) out.push(document.documentElement);

    return out.filter((el, idx, arr) => arr.indexOf(el) === idx);
}

/**
 * Acquire scroll lock on all scrollable ancestors
 * 
 * @param origin - The element to start from
 * @returns A release function to restore scroll behavior
 */
export function acquireScrollLock(origin: HTMLElement): ScrollLockRelease {
    const ancestors = collectScrollableAncestors(origin);
    const releases = ancestors.map(lockElementScroll);
    let released = false;
    return () => {
        if (released) return;
        released = true;
        for (let i = releases.length - 1; i >= 0; i--) {
            try { releases[i](); } catch { /* noop */ }
        }
    };
}
