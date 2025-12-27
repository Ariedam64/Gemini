// ui/components/Tooltip/Tooltip.ts
import { el } from "../../dom";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";
export type TooltipTrigger = "hover" | "click" | "focus" | "manual";

export type TooltipOptions = {
  id?: string;
  content: string | Node;
  placement?: TooltipPlacement;
  offset?: number;          // distance in pixels between the target and the tooltip
  trigger?: TooltipTrigger; // opening behavior
  accent?: boolean;         // accented border
  openDelayMs?: number;     // hover/focus open delay
  closeDelayMs?: number;    // hover/focus close delay
};

export type TooltipHandle = {
  tip: HTMLDivElement;
  open: () => void;
  close: () => void;
  toggle: () => void;
  setContent: (c: string | Node) => void;
  destroy: () => void;
};

function toNode(c: string | Node) {
  return typeof c === "string" ? document.createTextNode(c) : c;
}

/**
 * Attach a tooltip to a target element. The tooltip is positioned via `position: fixed`
 * with `getBoundingClientRect()` coordinates to stay aligned to the viewport.
 * CSS relies on HUD tokens, so it adapts automatically to the theme.
 */
export function Tooltip(target: HTMLElement, opts: TooltipOptions): TooltipHandle {
  const {
    id,
    content,
    placement = "top",
    offset = 8,
    trigger = "hover",
    accent = false,
    openDelayMs = 120,
    closeDelayMs = 120,
  } = opts || {} as TooltipOptions;

  // Create the tooltip element (inserted next to the target in the same shadow root)
  const tip = el("div", { className: "lg-tip", id }) as HTMLDivElement;
  tip.appendChild(toNode(content));
  if (accent) tip.classList.add("lg-tip--accent");

  // State
  let isOpen = false;
  let currentPlacement: TooltipPlacement = placement;
  let openTimer: number | null = null;
  let closeTimer: number | null = null;

  function clearTimers(){
    if (openTimer) { window.clearTimeout(openTimer); openTimer = null; }
    if (closeTimer){ window.clearTimeout(closeTimer); closeTimer = null; }
  }

  function setCoords(place: TooltipPlacement){
    const r = target.getBoundingClientRect();
    const tipRect = tip.getBoundingClientRect();

    // Reliable measurements (after render). If 0, retry with minimum dimensions.
    const w = tipRect.width || Math.ceil(tip.scrollWidth) || 200;
    const h = tipRect.height || Math.ceil(tip.scrollHeight) || 40;

    let top = 0, left = 0;
    switch (place){
      case "top":
        top = Math.round(r.top - h - offset);
        left = Math.round(r.left + r.width/2 - w/2);
        break;
      case "bottom":
        top = Math.round(r.bottom + offset);
        left = Math.round(r.left + r.width/2 - w/2);
        break;
      case "left":
        top = Math.round(r.top + r.height/2 - h/2);
        left = Math.round(r.left - w - offset);
        break;
      case "right":
        top = Math.round(r.top + r.height/2 - h/2);
        left = Math.round(r.right + offset);
        break;
    }

    // Basic clamp to the screen
    const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    left = Math.max(6, Math.min(vw - w - 6, left));
    top = Math.max(6, Math.min(vh - h - 6, top));

    tip.style.top = `${top}px`;
    tip.style.left = `${left}px`;

    tip.classList.remove("is-top","is-bottom","is-left","is-right");
    tip.classList.add(`is-${place}`);
    currentPlacement = place;
  }

  function ensureInDOM(){
    // Insert into the same root as the target (shadowRoot if present, otherwise document.body)
    const root = (target.getRootNode && (target.getRootNode() as ShadowRoot)) || document;
    const container = (root instanceof ShadowRoot) ? root : document;
    if (!tip.isConnected){
      if (container instanceof ShadowRoot) container.appendChild(tip);
      else (document.body || document.documentElement).appendChild(tip);
    }
  }

  function open(){
    if (isOpen) return;
    ensureInDOM();
    // Make it visible but hidden during measurement to avoid incorrect first placement
    tip.style.visibility = "hidden";
    tip.classList.add("is-open");
    isOpen = true;
    // Measure and position on the next frame (layout stabilized)
    requestAnimationFrame(() => {
      setCoords(currentPlacement);
      tip.style.visibility = "";
    });
    window.addEventListener("scroll", onReposition, true);
    window.addEventListener("resize", onReposition, true);
  }

  function close(){
    if (!isOpen) return;
    tip.classList.remove("is-open");
    isOpen = false;
    window.removeEventListener("scroll", onReposition, true);
    window.removeEventListener("resize", onReposition, true);
  }

  function toggle(){ isOpen ? close() : open(); }

  function onReposition(){
    if (!isOpen) return;
    setCoords(currentPlacement);
  }

  function setContent(c: string | Node){
    tip.replaceChildren();
    tip.appendChild(toNode(c));
  }

  // Gestion des triggers
  const onMouseEnter = () => {
    if (trigger !== "hover") return;
    clearTimers();
    openTimer = window.setTimeout(open, openDelayMs);
  };
  const onMouseLeave = () => {
    if (trigger !== "hover") return;
    clearTimers();
    closeTimer = window.setTimeout(close, closeDelayMs);
  };
  const onFocus = () => {
    if (trigger !== "focus") return;
    clearTimers();
    openTimer = window.setTimeout(open, openDelayMs);
  };
  const onBlur = () => {
    if (trigger !== "focus") return;
    clearTimers();
    closeTimer = window.setTimeout(close, closeDelayMs);
  };
  const onClick = (e: MouseEvent) => {
    if (trigger !== "click") return;
    e.stopPropagation();
    toggle();
  };
  const onDocClick = () => {
    if (trigger === "click" && isOpen) close();
  };

  if (trigger === "hover"){
    target.addEventListener("mouseenter", onMouseEnter);
    target.addEventListener("mouseleave", onMouseLeave);
  } else if (trigger === "focus"){
    target.addEventListener("focus", onFocus, true);
    target.addEventListener("blur", onBlur, true);
  } else if (trigger === "click"){
    target.addEventListener("click", onClick);
    document.addEventListener("click", onDocClick);
  }

  function destroy(){
    clearTimers();
    close();
    if (trigger === "hover"){
      target.removeEventListener("mouseenter", onMouseEnter);
      target.removeEventListener("mouseleave", onMouseLeave);
    } else if (trigger === "focus"){
      target.removeEventListener("focus", onFocus, true);
      target.removeEventListener("blur", onBlur, true);
    } else if (trigger === "click"){
      target.removeEventListener("click", onClick);
      document.removeEventListener("click", onDocClick);
    }
    if (tip.isConnected) tip.remove();
  }

  return { tip, open, close, toggle, setContent, destroy };
}
