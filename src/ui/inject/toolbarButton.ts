// Inject a resilient button into the game's own top-right toolbar
// Strategy: watch the #App subtree, detect the toolbar by known aria-label buttons,
// and append our button as the last item. Avoid brittle class names.

type Options = {
  onClick: () => void;
  iconUrl?: string; // default Gemini icon
  ariaLabel?: string; // default "Open Gemini"
};

const DEFAULT_ICON = "https://i.imgur.com/k5WuC32.png";

export function startInjectGamePanelButton(opts: Options) {
  let iconUrl = opts.iconUrl || DEFAULT_ICON;
  const aria = opts.ariaLabel || "Open Gemini";

  let mountedBtn: HTMLButtonElement | null = null;
  let mountedWrap: HTMLDivElement | null = null;
  let stopObs: (() => void) | null = null;
  let isMounting = false;
  let lastRoot: HTMLElement | null = null;
  let obsTarget: HTMLElement | null = null;

  function findToolbarRoot(): HTMLElement | null {
    // Use data-testid anchors — language-independent and unique to the game toolbar.
    // Climb up until we reach the container that also holds the icon buttons.
    const anchor = document.querySelector(
      '[data-testid="weather-status-button"], [data-testid="friend-bonus-button"]'
    );
    if (!anchor) return null;

    let p: HTMLElement | null = anchor.parentElement as HTMLElement | null;
    while (p && p !== document.body) {
      if (p.querySelector('button.chakra-button')) return p;
      p = p.parentElement as HTMLElement | null;
    }
    return null;
  }

  function findAnchorForObserver(root: HTMLElement | null): HTMLElement | null {
    // Without relying on #qws-notifier-slot, observe the toolbar root itself
    return root;
  }
  // no manual wrapper/button creation: we always clone from existing nodes

  function getReference(root: HTMLElement): {
    refBtn: HTMLButtonElement | null;
    refWrapper: HTMLElement | null;
  } {
    const all = Array.from(root.querySelectorAll<HTMLButtonElement>("button.chakra-button"));
    if (!all.length) return { refBtn: null, refWrapper: null };

    // Exclude our button if it is already present
    const nonMGH = all.filter(b => b.dataset.mghBtn !== "true" && (b.getAttribute("aria-label") || "") !== (opts.ariaLabel || "Open MGH"));
    const list = nonMGH.length ? nonMGH : all;

    // Use the second-to-last button as reference (last is often our own injected button)
    const idx = list.length >= 2 ? list.length - 2 : list.length - 1;
    const refBtn = list[idx]!;

    const p = refBtn.parentElement as HTMLElement | null;
    // Consider a wrapper if it's a DIV directly under root
    const refWrapper = p && p.parentElement === root && p.tagName === "DIV" ? p : null;
    return { refBtn, refWrapper };
  }

  function cloneButtonFrom(ref: HTMLButtonElement, ariaLabel: string, iconUrl: string): HTMLButtonElement {
    // Shallow clone to keep classes/styles from game; drop children
    const btn = ref.cloneNode(false) as HTMLButtonElement;
    btn.type = "button";
    btn.setAttribute("aria-label", ariaLabel);
    btn.title = ariaLabel;
    btn.dataset.mghBtn = "true";
    // Ensure it's clickable regardless of parent pointer-events
    btn.style.pointerEvents = "auto";
    // Avoid duplicate id collisions
    btn.removeAttribute("id");

    const img = document.createElement("img");
    img.src = iconUrl;
    img.alt = "MGH";
    img.style.pointerEvents = "none";
    img.style.userSelect = "none";
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.transform = "scale(1.3)";
    img.style.objectFit = "contain";
    img.style.display = "block";
    img.style.margin = "auto";
    btn.appendChild(img);

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      try { opts.onClick?.(); } catch { }
    });
    return btn;
  }

  function mountOnce() {
    if (isMounting) return false;
    isMounting = true;
    let changed = false;
    try {
      const root = findToolbarRoot();
      if (!root) { return false; }
      if (lastRoot !== root) lastRoot = root;

      // Choose references from the last existing button
      const { refBtn, refWrapper } = getReference(root);
      if (!refBtn) { return false; }

      // Ensure wrapper exists (clone wrapper if toolbar uses wrappers)
      mountedWrap = root.querySelector("div[data-mgh-wrapper=\"true\"]") as HTMLDivElement | null;
      if (!mountedWrap && refWrapper) {
        mountedWrap = refWrapper.cloneNode(false) as HTMLDivElement;
        mountedWrap.dataset.mghWrapper = "true";
        mountedWrap.removeAttribute("id");
        changed = true;
      }

      // Ensure button exists and lives inside wrapper
      const existingBtn = (mountedWrap?.querySelector("button[data-mgh-btn=\"true\"]") as HTMLButtonElement | null) || null;
      if (!mountedBtn) mountedBtn = existingBtn;
      if (!mountedBtn) {
        mountedBtn = cloneButtonFrom(refBtn, aria, iconUrl);
        if (mountedWrap) {
          mountedWrap.appendChild(mountedBtn);
        } else if (mountedBtn.parentElement !== root) {
          root.appendChild(mountedBtn);
        }
        changed = true;
      }

      // Append wrapper as last child in toolbar (only if needed)
      if (mountedWrap && mountedWrap.parentElement !== root) {
        root.appendChild(mountedWrap);
        changed = true;
      }

      // Ensure we observe only the anchor container for future changes
      const target = findAnchorForObserver(root);
      if (target && target !== obsTarget) {
        try { observer.disconnect(); } catch { }
        obsTarget = target;
        observer.observe(obsTarget, { childList: true, subtree: true });
      }

      // If already mounted and placed correctly, report no changes
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
      console.warn("[ToolbarButton] Button was removed from DOM, will retry");
      mountedSuccessfully = false;
      mountedBtn = null;
      mountedWrap = null;
    }

    // Debounced retry
    if (obsTimer !== null) return;
    obsTimer = window.setTimeout(() => {
      obsTimer = null;

      const success = mountOnce();

      if (success && mountedBtn && document.contains(mountedBtn)) {
        mountedSuccessfully = true;
        console.log("[ToolbarButton] Successfully mounted (via observer)");

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
    console.log("[ToolbarButton] Successfully mounted (initial)");
    // mountOnce() already narrowed the observer to the toolbar root (obsTarget).
    // Do NOT also attach to #App — that would observe the entire app subtree unnecessarily.
    // Make sure we're only watching the narrow target.
    observer.disconnect();
    if (obsTarget) {
      observer.observe(obsTarget, { childList: true, subtree: true });
    }
  } else {
    console.log("[ToolbarButton] Initial mount failed, will retry via observer");
    // Toolbar not in DOM yet — watch broadly until it appears
    observer.observe(host, { childList: true, subtree: true });
  }

  stopObs = () => observer.disconnect();

  return () => {
    try { stopObs?.(); } catch { }
    try { mountedWrap?.remove(); } catch { }
  };
}
