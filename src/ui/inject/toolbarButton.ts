// Inject a resilient button into the game's own top-right toolbar
// Strategy: watch the #App subtree, detect the toolbar by known aria-label buttons,
// and append our button as the last item. Avoid brittle class names.

type Options = {
  onClick: () => void;
  iconUrl?: string; // default MGH icon
  ariaLabel?: string; // default "Open MGH"
};

const DEFAULT_ICON = "https://i.imgur.com/IMkhMur.png";
const PREFERRED_REF_ARIA = "Stats";

export function startInjectGamePanelButton(opts: Options) {
  let iconUrl = opts.iconUrl || DEFAULT_ICON;
  const aria = opts.ariaLabel || "Open MGH";

  let mountedBtn: HTMLButtonElement | null = null;
  let mountedWrap: HTMLDivElement | null = null;
  let stopObs: (() => void) | null = null;
  let isMounting = false;
  let lastRoot: HTMLElement | null = null;
  let obsTarget: HTMLElement | null = null;

  const KNOWN_ARIA = [
    "Chat",
    "Leaderboard",
    "Stats",
    "Open Activity Log"
  ];

  // Safe CSS.escape fallback
  const esc = (v: string) => {
    try {
      // @ts-ignore
      return (typeof CSS !== "undefined" && CSS && typeof CSS.escape === "function") ? CSS.escape(v) : (v.replace(/"/g, '\\"'));
    } catch { return v; }
  };

  function findToolbarRoot(): HTMLElement | null {
    // Find any known button, then climb up to a parent that contains >=2 known buttons
    const anyBtn = document.querySelector(
      KNOWN_ARIA.map(a => `button[aria-label="${esc(a)}"]`).join(",")
    );
    if (!anyBtn) { return null; }

    let p: HTMLElement | null = anyBtn.parentElement as HTMLElement | null;
    while (p && p !== document.body) {
      const count = KNOWN_ARIA.reduce((acc, a) => acc + (p!.querySelectorAll(`button[aria-label="${esc(a)}"]`).length), 0);
      if (count >= 2) { return p; }
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
    const all = Array.from(root.querySelectorAll<HTMLButtonElement>("button[aria-label]"));
    if (!all.length) return { refBtn: null, refWrapper: null };

    // Exclude our button if it is already present
    const nonMGH = all.filter(b => b.dataset.mghBtn !== "true" && (b.getAttribute("aria-label") || "") !== (opts.ariaLabel || "Open MGH"));
    const list = nonMGH.length ? nonMGH : all;

    // Prefer the second-to-last if possible, otherwise the last one (favor Stats when available)
    const preferred = list.find(b => (b.getAttribute("aria-label") || "").toLowerCase() === PREFERRED_REF_ARIA.toLowerCase()) || null;
    const idx = list.length >= 2 ? list.length - 2 : list.length - 1;
    const refBtn = preferred || list[idx]!;

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
    img.style.width = "76%";
    img.style.height = "76%";
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

  // Observe mutations to re-mount if the game re-renders the toolbar
  const host = document.getElementById("App") || document.body;
  let obsTimer: number | null = null;
  const observer = new MutationObserver((records) => {
    // Filter out mutations that only involve our own nodes
    const onlyOurs = records.every(r => {
      const added = Array.from(r.addedNodes || []);
      const removed = Array.from(r.removedNodes || []);
      const all = added.concat(removed);
      if (all.length === 0) {
        const t = r.target as Node;
        return (mountedWrap && (t === mountedWrap || mountedWrap.contains(t))) || (mountedBtn && (t === mountedBtn || mountedBtn.contains(t)));
      }
      return all.every(n => {
        if (!(n instanceof HTMLElement)) return true;
        if (mountedWrap && (n === mountedWrap || mountedWrap.contains(n))) return true;
        if (mountedBtn && (n === mountedBtn || mountedBtn.contains(n))) return true;
        return false;
      });
    });
    const removedOurNodes = records.some(r => Array.from(r.removedNodes || []).some(n => {
      if (!(n instanceof HTMLElement)) return false;
      if (mountedWrap && (n === mountedWrap || mountedWrap.contains(n))) return true;
      if (mountedBtn && (n === mountedBtn || mountedBtn.contains(n))) return true;
      return false;
    }));
    if (onlyOurs && !removedOurNodes) return;

    if (obsTimer !== null) return; // debounce
    obsTimer = window.setTimeout(() => {
      obsTimer = null;
      const ok = mountOnce();
      if (ok && mountedWrap) {
        // Keep our button as last child if nodes were re-ordered
        const pr = mountedWrap.parentElement;
        if (pr && pr.lastElementChild !== mountedWrap) {
          pr.appendChild(mountedWrap);
        }
      }
    }, 150);
  });

  // Initial mount (in case toolbar already there)
  mountOnce();

  // Attach to #App initially (with subtree) to catch toolbar insertions anywhere in the tree
  observer.observe(host, { childList: true, subtree: true });
  stopObs = () => observer.disconnect();

  return () => {
    try { stopObs?.(); } catch { }
    try { mountedWrap?.remove(); } catch { }
  };
}
