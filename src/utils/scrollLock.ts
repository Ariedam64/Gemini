/**
 * Scroll Lock Utility
 * Prevents scrolling on the page (useful for drag operations, modals, etc.)
 */

export interface ScrollLockRelease {
  (): void;
}

let lockCount = 0;
let originalOverflow = '';
let originalTouchAction = '';

/**
 * Acquires a scroll lock on the document body
 * Returns a release function that must be called to remove the lock
 */
export function acquireScrollLock(): ScrollLockRelease {
  if (lockCount === 0) {
    // Save original styles
    originalOverflow = document.body.style.overflow;
    originalTouchAction = document.body.style.touchAction;

    // Apply lock
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
  }

  lockCount++;

  // Return release function
  return () => {
    lockCount = Math.max(0, lockCount - 1);

    if (lockCount === 0) {
      // Restore original styles
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
    }
  };
}
