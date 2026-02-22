/**
 * Modal Component - Reusable modal dialog
 *
 * Factory pattern component for displaying modal dialogs with backdrop.
 */

import { element } from '../../styles/helpers';
import { modalCss } from './modal.css';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface ModalOptions {
  /** Modal title (string or custom Node) */
  title: string | Node;

  /** Optional subtitle below the title */
  subtitle?: string;

  /** Modal content (pre-built HTMLElement) */
  content: HTMLElement;

  /** Optional footer (pre-built HTMLElement) */
  footer?: HTMLElement;

  /** Modal size */
  size?: 'sm' | 'md' | 'lg';

  /** Close modal when clicking on backdrop */
  closeOnBackdrop?: boolean;

  /** Close modal when pressing Escape key */
  closeOnEscape?: boolean;

  /** Callback when modal is closed */
  onClose?: () => void;
}

export interface ModalHandle {
  /** Root modal element */
  root: HTMLElement;

  /** Close the modal */
  close(): void;

  /** Destroy and cleanup */
  destroy(): void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Defaults
// ─────────────────────────────────────────────────────────────────────────────

const DEFAULT_OPTIONS: Required<Omit<ModalOptions, 'title' | 'subtitle' | 'content' | 'footer' | 'onClose'>> = {
  size: 'md',
  closeOnBackdrop: true,
  closeOnEscape: true,
};

// ─────────────────────────────────────────────────────────────────────────────
// Factory
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Create a modal dialog
 */
export function Modal(options: ModalOptions): ModalHandle {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  let isOpen = false;
  let root: HTMLElement | null = null;
  let backdrop: HTMLElement | null = null;
  let dialog: HTMLElement | null = null;
  let focusTrapCleanup: (() => void) | null = null;
  let viewportCleanup: (() => void) | null = null;

  // ───────────────────────────────────────────────────────────────────────────
  // Handlers
  // ───────────────────────────────────────────────────────────────────────────

  function handleClose(): void {
    close();
    opts.onClose?.();
  }

  function handleBackdropClick(event: MouseEvent): void {
    if (!opts.closeOnBackdrop) return;
    if (event.target === backdrop) {
      handleClose();
    }
  }

  function handleEscapeKey(event: KeyboardEvent): void {
    if (!opts.closeOnEscape) return;
    if (event.key === 'Escape') {
      handleClose();
    }
  }

  // ───────────────────────────────────────────────────────────────────────────
  // Focus trap
  // ───────────────────────────────────────────────────────────────────────────

  function setupFocusTrap(): void {
    if (!dialog) return;

    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');

    const focusableElements = Array.from(
      dialog.querySelectorAll<HTMLElement>(focusableSelectors)
    );

    if (focusableElements.length === 0) return;

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    // Focus first element on open
    firstFocusable.focus();

    // Trap focus within modal
    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusable) {
          event.preventDefault();
          lastFocusable.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusable) {
          event.preventDefault();
          firstFocusable.focus();
        }
      }
    };

    dialog.addEventListener('keydown', handleTab);

    focusTrapCleanup = () => {
      dialog?.removeEventListener('keydown', handleTab);
    };
  }

  // ───────────────────────────────────────────────────────────────────────────
  // Build UI
  // ───────────────────────────────────────────────────────────────────────────

  function buildModal(): HTMLElement {
    // Root container
    root = element('div', { className: 'modal-container' });
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.setAttribute('aria-labelledby', 'modal-title');

    // Inject styles
    const style = element('style');
    style.textContent = modalCss;
    root.appendChild(style);

    // Backdrop
    backdrop = element('div', { className: 'modal-backdrop' });
    backdrop.addEventListener('click', handleBackdropClick);
    root.appendChild(backdrop);

    // Dialog
    dialog = element('div', { className: `modal-dialog modal-dialog--${opts.size}` });

    // Header
    const header = element('div', { className: 'modal-header' });

    const title = element('h2', { className: 'modal-title', id: 'modal-title' }, opts.title);

    if (opts.subtitle) {
      // Wrap title + subtitle in a column so close button stays right
      const titleGroup = element('div', { className: 'modal-title-group' });
      titleGroup.appendChild(title);
      titleGroup.appendChild(element('p', { className: 'modal-subtitle' }, opts.subtitle));
      header.appendChild(titleGroup);
    } else {
      header.appendChild(title);
    }

    const closeBtn = element('button', {
      className: 'modal-close',
      type: 'button',
      'aria-label': 'Close modal',
    }, '×') as HTMLButtonElement;
    closeBtn.addEventListener('click', handleClose);
    header.appendChild(closeBtn);

    dialog.appendChild(header);

    // Body
    const body = element('div', { className: 'modal-body' });
    body.appendChild(opts.content);
    dialog.appendChild(body);

    // Footer (optional)
    if (opts.footer) {
      const footer = element('div', { className: 'modal-footer' });
      footer.appendChild(opts.footer);
      dialog.appendChild(footer);
    }

    backdrop.appendChild(dialog);

    return root;
  }

  function syncViewportBounds(): void {
    if (!root) return;
    const rect = root.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const needsOffset =
      Math.abs(rect.left) > 1 ||
      Math.abs(rect.top) > 1 ||
      Math.abs(rect.width - vw) > 1 ||
      Math.abs(rect.height - vh) > 1;

    if (needsOffset) {
      root.style.left = `${-rect.left}px`;
      root.style.top = `${-rect.top}px`;
      root.style.width = `${vw}px`;
      root.style.height = `${vh}px`;
    } else {
      root.style.left = "0px";
      root.style.top = "0px";
      root.style.width = "100%";
      root.style.height = "100%";
    }
  }

  // ───────────────────────────────────────────────────────────────────────────
  // Public API
  // ───────────────────────────────────────────────────────────────────────────

  function close(): void {
    if (!isOpen || !root) return;

    // Remove open class (triggers close animation)
    root.classList.remove('is-open');
    isOpen = false;

    // Cleanup focus trap
    if (focusTrapCleanup) {
      focusTrapCleanup();
      focusTrapCleanup = null;
    }

    // Remove escape key listener
    document.removeEventListener('keydown', handleEscapeKey);
    viewportCleanup?.();
    viewportCleanup = null;

    // Remove from DOM after animation
    setTimeout(() => {
      root?.remove();
    }, 200); // Match animation duration
  }

  function destroy(): void {
    // Close if open
    if (isOpen) {
      close();
    }

    // Cleanup event listeners
    backdrop?.removeEventListener('click', handleBackdropClick);

    if (focusTrapCleanup) {
      focusTrapCleanup();
      focusTrapCleanup = null;
    }

    document.removeEventListener('keydown', handleEscapeKey);
    viewportCleanup?.();
    viewportCleanup = null;

    // Remove from DOM
    root?.remove();

    // Null out references
    root = null;
    backdrop = null;
    dialog = null;
  }

  // Build the modal
  const modalRoot = buildModal();

  // Auto-open: Find the Shadow DOM container (Gemini HUD) and append
  const hudHost =
    document.querySelector('#gemini-hud-root') ||
    document.querySelector('#gemini-root') ||
    document.querySelector('#gemini-hud-container');
  const shadowRoot = hudHost?.shadowRoot;
  const container = shadowRoot || document.body || document.documentElement;

  container.appendChild(modalRoot);
  requestAnimationFrame(syncViewportBounds);
  const handleViewportResize = () => syncViewportBounds();
  window.addEventListener("resize", handleViewportResize);
  viewportCleanup = () => {
    window.removeEventListener("resize", handleViewportResize);
  };

  // Wait for next frame before adding open class (for animation)
  requestAnimationFrame(() => {
    root?.classList.add('is-open');
    isOpen = true;

    // Setup focus trap
    setupFocusTrap();

    // Add escape key listener
    document.addEventListener('keydown', handleEscapeKey);
  });

  return {
    root: modalRoot,
    close,
    destroy,
  };
}
