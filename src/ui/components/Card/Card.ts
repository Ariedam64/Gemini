// ui/components/Card.ts
import { el } from "../../../core/dom";

let cardCollapseSeq = 0;
const expandedStateById = new Map<string, boolean>();

export type CardVariant = "default" | "soft" | "glass" | "outline";
export type CardPadding = "none" | "sm" | "md" | "lg";

export type CardOptions = {
  id?: string;
  className?: string;
  variant?: CardVariant;
  padding?: CardPadding;
  interactive?: boolean;
  expandable?: boolean;
  defaultExpanded?: boolean;
  onExpandChange?: (expanded: boolean) => void;
  mediaTop?: Node;
  title?: string;
  subtitle?: string;
  badge?: Node | string;
  actions?: Node[];
  footer?: Node;
  /** New: separator lines for header/body/footer */
  divider?: boolean;
  /** New: thin accent bar on the left */
  tone?: "neutral" | "info" | "success" | "warning" | "danger";
  /** Optional stable identifier to persist expansion state. */
  stateKey?: string;
};

export function Card(opts: CardOptions = {}, ...children: (Node | string)[]) {
  const {
    id, className,
    variant = "default",
    padding = "md",
    interactive = false,
    expandable = false,
    defaultExpanded = true,
    onExpandChange,
    mediaTop, title, subtitle, badge, actions, footer,
    divider = false,
    tone = "neutral",
    stateKey,
  } = opts;

  const root = el("div", { className: "card", id, tabIndex: interactive ? 0 : undefined }) as HTMLDivElement;
  root.classList.add(`card--${variant}`, `card--p-${padding}`);
  if (interactive) root.classList.add("card--interactive");
  if (tone !== "neutral") root.classList.add(`card--tone-${tone}`);
  if (className) root.classList.add(...className.split(" ").filter(Boolean));
  if (expandable) root.classList.add("card--expandable");

  const persistenceKey = expandable
    ? (stateKey ?? id ?? (typeof title === "string" ? `title:${title}` : null))
    : null;

  let expanded = !expandable || defaultExpanded;
  if (persistenceKey && expandedStateById.has(persistenceKey)) {
    expanded = !!expandedStateById.get(persistenceKey);
  }

  let header: HTMLDivElement | null = null;
  let toggleBtn: HTMLButtonElement | null = null;
  let collapse: HTMLDivElement | null = null;
  let collapseAnimationFrame: number | null = null;
  let collapseAnimationCleanup: (() => void) | null = null;
  const collapseId = id ? `${id}-collapse` : `card-collapse-${++cardCollapseSeq}`;

  const stopCollapseAnimation = () => {
    if (collapseAnimationFrame !== null) {
      cancelAnimationFrame(collapseAnimationFrame);
      collapseAnimationFrame = null;
    }
    if (collapseAnimationCleanup) {
      const cb = collapseAnimationCleanup;
      collapseAnimationCleanup = null;
      cb();
    }
  };

  const applyCollapseState = (show: boolean, animate: boolean) => {
    if (!collapse) return;

    stopCollapseAnimation();

    const el = collapse;
    el.setAttribute("aria-hidden", String(!show));

    if (!animate) {
      el.classList.remove("card-collapse--animating");
      el.style.display = show ? "" : "none";
      el.style.height = "";
      el.style.opacity = "";
      return;
    }

    el.classList.add("card-collapse--animating");
    el.style.display = "";

    // In some Firefox cases, transitionend may not fire reliably without a layout flush.
    // Also add a small fallback timer later.
    if (show) {
      el.style.height = "auto";
      const targetHeight = el.scrollHeight;
      // If already zero height, skip animation entirely
      if (!targetHeight) {
        el.classList.remove("card-collapse--animating");
        el.style.display = "";
        el.style.height = "";
        el.style.opacity = "";
        return;
      }
      el.style.height = "0px";
      el.style.opacity = "0";
      // Force reflow so the 0px state is committed before transitioning to target
      void el.offsetHeight;
      collapseAnimationFrame = requestAnimationFrame(() => {
        collapseAnimationFrame = null;
        el.style.height = `${targetHeight}px`;
        el.style.opacity = "1";
      });
    } else {
      const startHeight = el.scrollHeight;
      if (!startHeight) {
        el.classList.remove("card-collapse--animating");
        el.style.display = "none";
        el.style.height = "";
        el.style.opacity = "";
        return;
      }
      el.style.height = `${startHeight}px`;
      el.style.opacity = "1";
      // Force reflow so the start height is committed before transitioning to 0
      void el.offsetHeight;
      collapseAnimationFrame = requestAnimationFrame(() => {
        collapseAnimationFrame = null;
        el.style.height = "0px";
        el.style.opacity = "0";
      });
    }

    const finalize = () => {
      el.classList.remove("card-collapse--animating");
      el.style.height = "";
      if (!show) {
        el.style.display = "none";
      }
      el.style.opacity = "";
    };

    let fallbackTimer: number | null = null;
    const onAnyEnd = (event: TransitionEvent) => {
      if (event.target !== el) return;
      if (fallbackTimer !== null) { clearTimeout(fallbackTimer); fallbackTimer = null; }
      el.removeEventListener("transitionend", onAnyEnd);
      el.removeEventListener("transitioncancel", onAnyEnd);
      collapseAnimationCleanup = null;
      finalize();
    };

    collapseAnimationCleanup = () => {
      if (fallbackTimer !== null) { clearTimeout(fallbackTimer); fallbackTimer = null; }
      el.removeEventListener("transitionend", onAnyEnd);
      el.removeEventListener("transitioncancel", onAnyEnd);
      collapseAnimationCleanup = null;
      finalize();
    };

    // Listen for both end and cancel, and set a fallback timeout slightly above CSS duration
    el.addEventListener("transitionend", onAnyEnd);
    el.addEventListener("transitioncancel", onAnyEnd);
    fallbackTimer = window.setTimeout(() => {
      // As a safety net if no events fire (observed in some FF cases)
      collapseAnimationCleanup?.();
    }, 420);
  };

  function chevronSVG(dir: "up"|"down") {
    const svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
    svg.setAttribute("viewBox","0 0 24 24");
    svg.setAttribute("width","16");  
    svg.setAttribute("height","16"); 
    svg.innerHTML = dir === "up"
      ? '<path d="M7 14l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
      : '<path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
    return svg;
  }

  function setExpandedState(next: boolean, emit = true, animate = true) {
    expanded = next;
    root.classList.toggle("card--collapsed", !expanded);
    root.classList.toggle("card--expanded", expanded);
    if (header) {
      header.dataset.expanded = String(expanded);
      header.setAttribute("aria-expanded", String(expanded));
    }
    if (toggleBtn) {
      toggleBtn.setAttribute("aria-expanded", String(expanded));
      toggleBtn.classList.toggle("card-toggle--collapsed", !expanded);
      toggleBtn.setAttribute("aria-label", expanded ? "Replier le contenu" : "Deplier le contenu");
      toggleBtn.replaceChildren(chevronSVG(expanded ? "up" : "down"));
    }
    if (expandable) applyCollapseState(expanded, animate);
    else if (collapse) {
      collapse.style.display = "";
      collapse.style.height = "";
      collapse.style.opacity = "";
      collapse.setAttribute("aria-hidden", "false");
    }
    if (emit && onExpandChange) onExpandChange(expanded);
    if (persistenceKey) expandedStateById.set(persistenceKey, expanded);
  }

  // Media top
  if (mediaTop) {
    const m = el("div", { className: "card-media" }) as HTMLDivElement;
    m.append(mediaTop);
    root.appendChild(m);
  }

  const shouldRenderHeader = Boolean(title || subtitle || badge || (actions && actions.length) || expandable);
  if (shouldRenderHeader) {
    header = el("div", { className: "card-header" }) as HTMLDivElement;

    const left = el("div", { className: "card-headline", style: "min-width:0;display:flex;flex-direction:column;gap:2px;" });
    if (title) {
      const h = el("h3", {
        className: "card-title",
        style: "margin:0;font-size:15px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px;"
      }, title) as HTMLHeadingElement;
      if (badge) h.append(typeof badge === "string" ? el("span", { className: "badge" }, badge) : badge);
      left.appendChild(h);
    }
    if (subtitle) {
      const sub = el("div", { className: "card-subtitle", style: "opacity:.85;font-size:12px;color:color-mix(in oklab, var(--fg) 80%, #9ca3af)" }, subtitle);
      left.appendChild(sub);
    }
    if (left.childNodes.length || expandable) header.appendChild(left);

    const right = el("div", { className: "card-header-right", style: "display:flex;gap:8px;flex:0 0 auto;align-items:center;" }) as HTMLDivElement;
    const actionsWrap = el("div", { className: "card-actions", style: "display:flex;gap:8px;flex:0 0 auto;align-items:center;" }) as HTMLDivElement;
    actions?.forEach(action => actionsWrap.appendChild(action));
    if (actionsWrap.childNodes.length) right.appendChild(actionsWrap);

    if (expandable) {
      toggleBtn = el("button", {
        className: "card-toggle",
        type: "button",
        ariaExpanded: String(expanded),
        ariaControls: collapseId,
        ariaLabel: expanded ? "Replier le contenu" : "Deplier le contenu",
      }) as HTMLButtonElement;
      toggleBtn.textContent = expanded ? "\u25B2" : "\u25BC";
      toggleBtn.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        setExpandedState(!expanded);
      });
      right.appendChild(toggleBtn);
      header.classList.add("card-header--expandable");
      header.addEventListener("click", (event) => {
        const target = event.target as HTMLElement | null;
        if (target?.closest(".card-actions") || target?.closest(".card-toggle")) return;
        setExpandedState(!expanded);
      });
    }

    if (right.childNodes.length) header.appendChild(right);
    root.appendChild(header);

  }

  collapse = el("div", {
    className: "card-collapse",
    id: collapseId,
    ariaHidden: expandable ? String(!expanded) : "false",
  }) as HTMLDivElement;
  root.appendChild(collapse);

  if (divider && shouldRenderHeader) {
    collapse.appendChild(el("div", { className: "card-divider" }) as HTMLDivElement);
  }

  const body = el("div", { className: "card-body" }) as HTMLDivElement;
  body.append(...children);
  collapse.appendChild(body);

  if (footer) {
    if (divider) {
      collapse.appendChild(el("div", { className: "card-divider" }) as HTMLDivElement);
    }
    const footerEl = el("div", { className: "card-footer" }) as HTMLDivElement;
    footerEl.append(footer);
    collapse.appendChild(footerEl);
  }

  if (toggleBtn) toggleBtn.setAttribute("aria-controls", collapseId);

  setExpandedState(expanded, false, false);
  if (persistenceKey) expandedStateById.set(persistenceKey, expanded);

  return root;
}

/** Subcomponents (API unchanged) */
export function CardHeader(...children: (Node | string)[]) {
  return el("div", { className: "card-header" }, ...children) as HTMLDivElement;
}
export function CardBody(...children: (Node | string)[]) {
  return el("div", { className: "card-body" }, ...children) as HTMLDivElement;
}
export function CardFooter(...children: (Node | string)[]) {
  return el("div", { className: "card-footer" }, ...children) as HTMLDivElement;
}
export function CardTitle(text: string, badge?: Node | string) {
  const h = el("h3", { className: "card-title", style: "margin:0;font-size:15px;font-weight:700;line-height:1.25;display:flex;gap:8px;align-items:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" }, text) as HTMLHeadingElement;
  if (badge) h.append(typeof badge === "string" ? el("span", { className: "badge" }, badge) : badge);
  return h;
}
export function CardSubtitle(text: string) {
  return el("div", { className: "card-subtitle", style: "opacity:.85;font-size:12px;color:color-mix(in oklab, var(--fg) 80%, #9ca3af)" }, text) as HTMLDivElement;
}
export function CardActions(...children: (Node | string)[]) {
  return el("div", { className: "card-actions", style: "display:flex;gap:8px;flex:0 0 auto;align-items:center;" }, ...children) as HTMLDivElement;
}
export function CardMedia(node: Node) {
  const m = el("div", { className: "card-media" }) as HTMLDivElement;
  m.append(node);
  return m;
}
