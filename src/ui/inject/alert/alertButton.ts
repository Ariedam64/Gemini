/**
 * Alert Button - Inject alert button into game toolbar
 *
 * Resilient injection strategy (inspired by toolbarButton.ts):
 * - Watch the #App subtree
 * - Detect toolbar by known aria-label buttons
 * - Append alert button next to Gemini button
 */

type AlertButtonOptions = {
  onClick: () => void;
  iconUrl?: string; // Custom bell icon URL
  ariaLabel?: string;
};

const DEFAULT_ICON_SVG = `
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
`;

// Bell ring animation styles (injected once)
const BELL_ANIMATION_CSS = `
@keyframes bellRing {
  0%, 100% { transform: rotate(0deg); }
  10%, 30% { transform: rotate(-10deg); }
  20%, 40% { transform: rotate(10deg); }
  50% { transform: rotate(-5deg); }
  60% { transform: rotate(5deg); }
  70% { transform: rotate(0deg); }
}

.alert-btn-ringing {
  animation: bellRing 0.6s ease-in-out;
}
`;

// Inject animation styles (once)
let stylesInjected = false;
function injectBellStyles(): void {
  if (stylesInjected) return;
  stylesInjected = true;

  const style = document.createElement("style");
  style.textContent = BELL_ANIMATION_CSS;
  document.head.appendChild(style);
}

const KNOWN_ARIA = ["Chat", "Leaderboard", "Stats", "Open Activity Log", "Open MGH"];

export interface AlertButtonHandle {
  root: HTMLButtonElement | null;
  updateBadge(count: number): void;
  ring(): void;
  startRinging(): void;
  stopRinging(): void;
  destroy(): void;
}

/**
 * Safe CSS.escape fallback
 */
const esc = (v: string) => {
  try {
    // @ts-ignore
    return typeof CSS !== "undefined" && CSS && typeof CSS.escape === "function"
      ? CSS.escape(v)
      : v.replace(/"/g, '\\"');
  } catch {
    return v;
  }
};

/**
 * Find toolbar root element
 */
function findToolbarRoot(): HTMLElement | null {
  const anyBtn = document.querySelector(
    KNOWN_ARIA.map((a) => `button[aria-label="${esc(a)}"]`).join(",")
  );
  if (!anyBtn) return null;

  let p: HTMLElement | null = anyBtn.parentElement as HTMLElement | null;
  while (p && p !== document.body) {
    const count = KNOWN_ARIA.reduce(
      (acc, a) => acc + (p!.querySelectorAll(`button[aria-label="${esc(a)}"]`).length),
      0
    );
    if (count >= 2) return p;
    p = p.parentElement as HTMLElement | null;
  }
  return null;
}

/**
 * Find anchor element for observer
 */
function findAnchorForObserver(root: HTMLElement | null): HTMLElement | null {
  return root;
}

/**
 * Get reference button for cloning styles
 */
function getReference(root: HTMLElement): {
  refBtn: HTMLButtonElement | null;
  refWrapper: HTMLElement | null;
} {
  const all = Array.from(root.querySelectorAll<HTMLButtonElement>("button[aria-label]"));
  if (!all.length) return { refBtn: null, refWrapper: null };

  // Exclude our alert button if already present
  const nonAlert = all.filter(
    (b) => b.dataset.alertBtn !== "true" && (b.getAttribute("aria-label") || "") !== "Alerts"
  );
  const list = nonAlert.length ? nonAlert : all;

  // Prefer the last button (likely the Gemini button)
  const refBtn = list[list.length - 1] || null;
  const p = refBtn?.parentElement as HTMLElement | null;

  // Consider a wrapper if it's a DIV directly under root
  const refWrapper = p && p.parentElement === root && p.tagName === "DIV" ? p : null;
  return { refBtn, refWrapper };
}

/**
 * Clone button from reference
 */
function cloneButtonFrom(
  ref: HTMLButtonElement,
  ariaLabel: string,
  iconSvg: string
): HTMLButtonElement {
  const btn = ref.cloneNode(false) as HTMLButtonElement;
  btn.type = "button";
  btn.setAttribute("aria-label", ariaLabel);
  btn.title = ariaLabel;
  btn.dataset.alertBtn = "true";
  btn.style.pointerEvents = "auto";
  btn.style.position = "relative"; // For badge positioning
  btn.removeAttribute("id");

  // Icon container
  const iconContainer = document.createElement("div");
  iconContainer.innerHTML = iconSvg;
  iconContainer.dataset.alertIcon = "true"; // Marker for targeting animation
  iconContainer.style.pointerEvents = "none";
  iconContainer.style.userSelect = "none";
  iconContainer.style.width = "76%";
  iconContainer.style.height = "76%";
  iconContainer.style.display = "flex";
  iconContainer.style.alignItems = "center";
  iconContainer.style.justifyContent = "center";
  iconContainer.style.margin = "auto";

  btn.appendChild(iconContainer);

  return btn;
}

/**
 * Create notification badge element
 */
function createBadge(): HTMLSpanElement {
  const badge = document.createElement("span");
  badge.className = "alert-badge";
  badge.style.position = "absolute";
  badge.style.top = "-4px";
  badge.style.right = "-4px";
  badge.style.minWidth = "18px";
  badge.style.height = "18px";
  badge.style.borderRadius = "9px";
  badge.style.backgroundColor = "#EF4444";
  badge.style.color = "white";
  badge.style.fontSize = "10px";
  badge.style.fontWeight = "700";
  badge.style.display = "none";
  badge.style.alignItems = "center";
  badge.style.justifyContent = "center";
  badge.style.padding = "0 4px";
  badge.style.pointerEvents = "none";
  badge.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
  badge.style.zIndex = "1";
  badge.textContent = "0";

  return badge;
}

/**
 * Start injecting alert button into game toolbar
 */
export function startInjectAlertButton(opts: AlertButtonOptions): AlertButtonHandle {
  // Inject animation styles
  injectBellStyles();

  const iconSvg = opts.iconUrl
    ? `<img src="${opts.iconUrl}" alt="Alert" style="width:100%;height:100%;object-fit:contain;"/>`
    : DEFAULT_ICON_SVG;
  const aria = opts.ariaLabel || "Alerts";

  let mountedBtn: HTMLButtonElement | null = null;
  let mountedWrap: HTMLDivElement | null = null;
  let mountedBadge: HTMLSpanElement | null = null;
  let stopObs: (() => void) | null = null;
  let isMounting = false;
  let lastRoot: HTMLElement | null = null;
  let obsTarget: HTMLElement | null = null;
  let ringingInterval: number | null = null;

  function mountOnce(): boolean {
    if (isMounting) return false;
    isMounting = true;
    let changed = false;

    try {
      const root = findToolbarRoot();
      if (!root) {
        return false;
      }
      if (lastRoot !== root) lastRoot = root;

      // Get reference button for cloning
      const { refBtn, refWrapper } = getReference(root);
      if (!refBtn) return false;

      // Ensure wrapper exists (clone wrapper if toolbar uses wrappers)
      mountedWrap = root.querySelector("div[data-alert-wrapper=\"true\"]") as HTMLDivElement | null;
      if (!mountedWrap && refWrapper) {
        mountedWrap = refWrapper.cloneNode(false) as HTMLDivElement;
        mountedWrap.dataset.alertWrapper = "true";
        mountedWrap.removeAttribute("id");
        changed = true;
      }

      // Ensure button exists
      const existingBtn = (mountedWrap?.querySelector("button[data-alert-btn=\"true\"]") as HTMLButtonElement | null) || null;
      if (!mountedBtn) mountedBtn = existingBtn;
      if (!mountedBtn) {
        mountedBtn = cloneButtonFrom(refBtn, aria, iconSvg);
        mountedBtn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          try {
            opts.onClick?.();
          } catch {}
        });

        // Create and attach badge
        mountedBadge = createBadge();
        mountedBtn.appendChild(mountedBadge);

        if (mountedWrap) {
          mountedWrap.appendChild(mountedBtn);
        } else if (mountedBtn.parentElement !== root) {
          root.appendChild(mountedBtn);
        }
        changed = true;
      }

      // Append wrapper as last child in toolbar
      if (mountedWrap && mountedWrap.parentElement !== root) {
        root.appendChild(mountedWrap);
        changed = true;
      }

      // Observe anchor container for future changes
      const target = findAnchorForObserver(root);
      if (target && target !== obsTarget) {
        try {
          observer.disconnect();
        } catch {}
        obsTarget = target;
        observer.observe(obsTarget, { childList: true, subtree: true });
      }

      return changed;
    } finally {
      isMounting = false;
    }
  }

  // Mutation observer to re-mount if game re-renders toolbar
  // AGGRESSIVE MODE: Retry injection on every DOM change until success
  const host = document.getElementById("App") || document.body;
  let obsTimer: number | null = null;
  let mountedSuccessfully = false;

  const observer = new MutationObserver(() => {
    // Skip if already mounted successfully
    if (mountedSuccessfully && mountedBtn && document.contains(mountedBtn)) {
      return;
    }

    // If button was removed from DOM, reset mounted flag
    if (mountedBtn && !document.contains(mountedBtn)) {
      mountedSuccessfully = false;
      mountedBtn = null;
      mountedBadge = null;
      mountedWrap = null;
    }

    // Debounced retry
    if (obsTimer !== null) return;
    obsTimer = window.setTimeout(() => {
      obsTimer = null;

      const success = mountOnce();

      if (success && mountedBtn && document.contains(mountedBtn)) {
        mountedSuccessfully = true;

        // Ensure button is last in toolbar
        if (mountedWrap) {
          const parent = mountedWrap.parentElement;
          if (parent && parent.lastElementChild !== mountedWrap) {
            parent.appendChild(mountedWrap);
          }
        }
      }
    }, 100); // Reduced debounce from 150ms to 100ms for faster response
  });

  // Initial mount (with retry)
  const initialSuccess = mountOnce();
  if (initialSuccess && mountedBtn && document.contains(mountedBtn)) {
    mountedSuccessfully = true;
  }

  // Attach to #App with subtree to catch toolbar insertions
  // This will aggressively retry until button is mounted
  observer.observe(host, { childList: true, subtree: true });
  stopObs = () => observer.disconnect();

  return {
    get root() {
      // Return the button element itself, not the wrapper
      // (mountedWrap may be null if toolbar doesn't use wrappers)
      return mountedBtn;
    },

    updateBadge(count: number) {
      if (!mountedBadge) {
        return;
      }

      if (count > 0) {
        mountedBadge.textContent = String(count);
        mountedBadge.style.display = "flex";
      } else {
        mountedBadge.style.display = "none";
      }
    },

    ring() {
      if (!mountedBtn) {
        return;
      }

      // Target only the icon container, not the entire button
      const iconContainer = mountedBtn.querySelector('[data-alert-icon="true"]') as HTMLElement | null;
      if (!iconContainer) {
        return;
      }

      // Add ring animation class to icon only
      iconContainer.classList.add("alert-btn-ringing");

      // Remove class after animation completes
      setTimeout(() => {
        iconContainer?.classList.remove("alert-btn-ringing");
      }, 600); // Match animation duration
    },

    startRinging() {
      if (!mountedBtn) {
        return;
      }

      // Stop any existing ringing interval
      if (ringingInterval !== null) {
        clearInterval(ringingInterval);
      }

      // Ring immediately
      this.ring();

      // Then ring every 3 seconds
      ringingInterval = window.setInterval(() => {
        this.ring();
      }, 3000);
    },

    stopRinging() {
      if (ringingInterval !== null) {
        clearInterval(ringingInterval);
        ringingInterval = null;
      }

      // Remove animation class from icon if currently animating
      if (mountedBtn) {
        const iconContainer = mountedBtn.querySelector('[data-alert-icon="true"]') as HTMLElement | null;
        if (iconContainer) {
          iconContainer.classList.remove("alert-btn-ringing");
        }
      }
    },

    destroy() {
      // Stop ringing if active
      this.stopRinging();

      try {
        stopObs?.();
      } catch {}
      try {
        mountedWrap?.remove();
      } catch {}
    },
  };
}
