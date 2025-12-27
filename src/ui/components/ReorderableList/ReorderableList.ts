import { el } from "../../dom";

export type ReorderableTone = "neutral" | "accent" | "info" | "success" | "warning" | "danger";

export type ReorderableListItem<T = unknown> = {
  id: string;
  label: string;
  description?: string;
  icon?: Node | string;
  meta?: string | Node;
  trailing?: Node | string;
  tone?: ReorderableTone;
  disabled?: boolean;
  className?: string;
  data?: T;
};

export type ReorderableListOptions<T = unknown> = {
  id?: string;
  className?: string;
  ariaLabel?: string;
  items: ReorderableListItem<T>[];
  density?: "compact" | "comfortable" | "loose";
  variant?: "muted" | "surface" | "ghost";
  grabArea?: "handle" | "item";
  showHandle?: boolean;
  showIndex?: boolean;
  draggable?: boolean;
  emptyLabel?: string | Node;
  onOrderChange?: (items: ReorderableListItem<T>[], detail: { id: string; from: number; to: number; item: ReorderableListItem<T> }) => void;
  onItemClick?: (item: ReorderableListItem<T>, index: number, ev: MouseEvent) => void;
  renderItem?: (item: ReorderableListItem<T>, ctx: { index: number; active: boolean; dragging: boolean }) => Node | string;
};

export type ReorderableListHandle<T = unknown> = {
  root: HTMLDivElement;
  getItems: () => ReorderableListItem<T>[];
  setItems: (items: ReorderableListItem<T>[]) => void;
  moveItem: (id: string, toIndex: number) => void;
  destroy: () => void;
};

type DragState<T = unknown> = {
  id: string;
  itemEl: HTMLDivElement;
  pointerId: number;
  placeholder: HTMLDivElement;
  captureTarget: HTMLElement | null;
  dragSurface: HTMLElement | null;
  touchActionPrev?: string;
  offsetY: number;
  fromIndex: number;
  releaseScrollLock?: () => void;
};

function toNode(n?: string | Node | null): Node | null {
  if (n == null) return null;
  if (typeof n === "string") return document.createTextNode(n);
  return n;
}

function createGripIcon(): SVGElement {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 12 12");
  svg.setAttribute("width", "12");
  svg.setAttribute("height", "12");
  svg.setAttribute("aria-hidden", "true");
  const dots = [
    [2, 3], [6, 3], [10, 3],
    [2, 7], [6, 7], [10, 7]
  ];
  dots.forEach(([cx, cy]) => {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", String(cx));
    circle.setAttribute("cy", String(cy));
    circle.setAttribute("r", "1.3");
    svg.appendChild(circle);
  });
  return svg;
}

function isScrollable(el: HTMLElement): boolean {
  const style = getComputedStyle(el);
  if (!/(auto|scroll|overlay)/.test(style.overflowY + style.overflowX)) return false;
  const sh = el.scrollHeight;
  const ch = el.clientHeight;
  const sw = el.scrollWidth;
  const cw = el.clientWidth;
  return (sh > ch + 1) || (sw > cw + 1);
}

type ScrollLockRelease = () => void;

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

function acquireScrollLock(origin: HTMLElement): ScrollLockRelease {
  const ancestors = collectScrollableAncestors(origin);
  const releases = ancestors.map(lockElementScroll);
  let released = false;
  return () => {
    if (released) return;
    released = true;
    for (let i = releases.length - 1; i >= 0; i--) {
      try { releases[i](); } catch {}
    }
  };
}



export function ReorderableList<T = unknown>(options: ReorderableListOptions<T>): ReorderableListHandle<T> {
  const {
    id,
    className,
    ariaLabel = "Reorder the list",
    items: initialItems,
    density = "comfortable",
    variant = "muted",
    grabArea = "handle",
    showHandle = true,
    showIndex = false,
    draggable = true,
    emptyLabel = "No items",
    onOrderChange,
    onItemClick,
    renderItem,
  } = options;

  let items = initialItems.slice();
  let focusAfterRender: string | null = null;
  let dragState: DragState<T> | null = null;

  const effectiveGrabArea = showHandle ? grabArea : "item";

  const root = el("div", { className: "reorderable-list", id }) as HTMLDivElement;
  root.dataset.variant = variant;
  root.dataset.grab = effectiveGrabArea;
  root.dataset.density = density;
  if (className) root.classList.add(...className.split(" ").filter(Boolean));

  const track = el("div", { className: "reorderable-track", role: "list", "aria-label": ariaLabel }) as HTMLDivElement;
  root.appendChild(track);

  const handleMap = new Map<string, HTMLButtonElement>();
  const itemMap = new Map<string, HTMLDivElement>();

  function focusHandle(idToFocus: string | null) {
    if (!idToFocus) return;
    focusAfterRender = idToFocus;
  }

  function renderItems(list: ReorderableListItem<T>[]) {
    handleMap.clear();
    itemMap.clear();

    if (!list.length) {
      const empty = el("div", { className: "rl-empty" });
      const emptyNode = toNode(emptyLabel);
      if (emptyNode) empty.appendChild(emptyNode);
      track.replaceChildren(empty);
      root.classList.add("is-empty");
    } else {
      root.classList.remove("is-empty");
      const nodes = list.map((item, index) => createItemElement(item, index));
      track.replaceChildren(...nodes);
    }

    if (focusAfterRender) {
      const handle = handleMap.get(focusAfterRender);
      if (handle) {
        handle.focus({ preventScroll: true });
      } else {
        const itemEl = itemMap.get(focusAfterRender);
        itemEl?.focus({ preventScroll: true });
      }
      focusAfterRender = null;
    }
  }

  function createItemElement(item: ReorderableListItem<T>, index: number) {
    const itemEl = el("div", {
      className: "rl-item",
      role: "listitem",
      "data-id": item.id,
      "data-tone": item.tone || "neutral",
      tabIndex: effectiveGrabArea === "item" && !item.disabled ? 0 : -1,
      "aria-disabled": item.disabled ? "true" : undefined,
    }) as HTMLDivElement;

    if (item.className) itemEl.classList.add(...item.className.split(" ").filter(Boolean));
    if (item.disabled) itemEl.classList.add("is-disabled");

    const handleWrap = showHandle ? el("button", {
      className: "rl-handle",
      type: "button",
      tabIndex: item.disabled ? -1 : 0,
      "aria-label": "Hold to reorder",
      "aria-grabbed": "false",
      disabled: item.disabled || !draggable,
    }, createGripIcon()) as HTMLButtonElement : null;

    if (handleWrap) {
      handleWrap.addEventListener("keydown", (ev) => {
        if (item.disabled || !draggable) return;
        if (ev.key === "ArrowUp" || ev.key === "ArrowDown") {
          ev.preventDefault();
          moveItem(item.id, index + (ev.key === "ArrowUp" ? -1 : 1));
        } else if (ev.key === "Home") {
          ev.preventDefault();
          moveItem(item.id, 0);
        } else if (ev.key === "End") {
          ev.preventDefault();
          moveItem(item.id, items.length - 1);
        }
      });
      handleMap.set(item.id, handleWrap);
    }

    const body = el("div", { className: "rl-body" }) as HTMLDivElement;

    if (renderItem) {
      const active = dragState?.id === item.id;
      const custom = renderItem(item, { index, active: !!active, dragging: !!active });
      const node = toNode(custom);
      if (node) body.appendChild(node);
    } else {
      if (showIndex) {
        const indexBadge = el("span", { className: "rl-index" }, String(index + 1));
        body.appendChild(indexBadge);
      }

      if (item.icon) {
        const leading = el("div", { className: "rl-leading" });
        const ic = toNode(item.icon);
        if (ic) leading.appendChild(ic);
        body.appendChild(leading);
      }

      const textWrap = el("div", { className: "rl-text" });
      const title = el("div", { className: "rl-title" }, item.label);
      textWrap.appendChild(title);
      if (item.description) {
        const subtitle = el("div", { className: "rl-subtitle" }, item.description);
        textWrap.appendChild(subtitle);
      }
      body.appendChild(textWrap);

      if (item.meta) {
        const meta = el("div", { className: "rl-meta" });
        const metaNode = toNode(item.meta);
        if (metaNode) meta.appendChild(metaNode);
        body.appendChild(meta);
      }

      if (item.trailing) {
        const trailing = el("div", { className: "rl-trailing" });
        const tr = toNode(item.trailing);
        if (tr) trailing.appendChild(tr);
        body.appendChild(trailing);
      }
    }

    if (handleWrap && effectiveGrabArea === "handle") itemEl.appendChild(handleWrap);
    itemEl.appendChild(body);
    if (handleWrap && effectiveGrabArea === "item") {
      // Handle used for affordance only
      handleWrap.tabIndex = -1;
      handleWrap.setAttribute("aria-hidden", "true");
      body.appendChild(handleWrap);
    }

    if (onItemClick && !item.disabled) {
      itemEl.addEventListener("click", (ev) => {
        const target = ev.target as HTMLElement;
        if (target.closest(".rl-handle")) return;
        onItemClick(item, index, ev);
      });
    }

    if (draggable && !item.disabled) {
      const dragTarget = effectiveGrabArea === "handle" && handleWrap ? handleWrap : itemEl;
      const onPointerDown = (ev: PointerEvent) => {
        if (ev.button !== 0) return;
        startDrag(ev, itemEl, item.id, dragTarget);
      };
      dragTarget.addEventListener("pointerdown", onPointerDown as EventListener, { passive: false });
    }

    if (effectiveGrabArea === "item" && !item.disabled) {
      itemEl.addEventListener("keydown", (ev) => {
        if (!draggable) return;
        if (ev.key === "ArrowUp" || ev.key === "ArrowDown") {
          ev.preventDefault();
          moveItem(item.id, index + (ev.key === "ArrowUp" ? -1 : 1));
        } else if (ev.key === "Home") {
          ev.preventDefault();
          moveItem(item.id, 0);
        } else if (ev.key === "End") {
          ev.preventDefault();
          moveItem(item.id, items.length - 1);
        }
      });
    }

    itemMap.set(item.id, itemEl);
    return itemEl;
  }

  function moveItem(idToMove: string, toIndex: number) {
    const from = items.findIndex((it) => it.id === idToMove);
    if (from === -1) return;
    const clamped = Math.max(0, Math.min(items.length - 1, toIndex));
    if (from === clamped) return;
    const updated = items.slice();
    const [moved] = updated.splice(from, 1);
    updated.splice(clamped, 0, moved);
    items = updated;
    focusHandle(moved.id);
    renderItems(items);
    onOrderChange?.(items.slice(), { id: moved.id, from, to: clamped, item: moved });
  }

  function updatePlaceholderPosition(clientY: number) {
    if (!dragState) return;
    const { placeholder, itemEl } = dragState;
    const siblings = Array.from(track.children).filter((node): node is HTMLDivElement => node !== itemEl && node instanceof HTMLDivElement && node !== placeholder);
    let inserted = false;
    for (const sibling of siblings) {
      const rect = sibling.getBoundingClientRect();
      const mid = rect.top + rect.height / 2;
      if (clientY < mid) {
        if (placeholder.nextSibling !== sibling) {
          track.insertBefore(placeholder, sibling);
        }
        inserted = true;
        break;
      }
    }
    if (!inserted) {
      track.appendChild(placeholder);
    }
  }

  const onPointerMove = (ev: PointerEvent) => {
    if (!dragState || ev.pointerId !== dragState.pointerId) return;
    ev.preventDefault();
    const trackRect = track.getBoundingClientRect();
    let top = ev.clientY - trackRect.top - dragState.offsetY;
    const limit = trackRect.height - dragState.itemEl.offsetHeight;
    if (Number.isFinite(limit)) {
      top = Math.max(-8, Math.min(limit + 8, top));
    }
    dragState.itemEl.style.top = `${top}px`;
    updatePlaceholderPosition(ev.clientY);
  };

  const onPointerUp = (ev: PointerEvent) => {
    if (!dragState || ev.pointerId !== dragState.pointerId) return;
    ev.preventDefault();
    finishDrag();
  };

  const onPointerCancel = (ev: PointerEvent) => {
    if (!dragState || ev.pointerId !== dragState.pointerId) return;
    finishDrag({ notify: false, revert: true });
  };

  function startDrag(ev: PointerEvent, itemEl: HTMLDivElement, itemId: string, captureEl: HTMLElement) {
    if (!draggable || dragState) return;
    const item = items.find((it) => it.id === itemId);
    if (!item || item.disabled) return;
    ev.preventDefault();
    const rect = itemEl.getBoundingClientRect();
    const trackRect = track.getBoundingClientRect();
    const fromIndex = items.findIndex((it) => it.id === itemId);
    if (fromIndex === -1) return;

    const placeholder = el("div", {
      className: "rl-item rl-placeholder",
      style: `height:${rect.height}px;width:${rect.width}px;`,
    }) as HTMLDivElement;

    const touchActionPrev = captureEl.style.touchAction;
    captureEl.style.touchAction = "none";
    const releaseScrollLock = acquireScrollLock(captureEl);

    dragState = {
      id: itemId,
      itemEl,
      pointerId: ev.pointerId,
      placeholder,
      captureTarget: captureEl,
      dragSurface: captureEl,
      touchActionPrev,
      offsetY: ev.clientY - rect.top,
      fromIndex,
      releaseScrollLock,
    };

    itemEl.classList.add("is-dragging");
    itemEl.setAttribute("aria-grabbed", "true");
    itemEl.style.width = `${rect.width}px`;
    itemEl.style.height = `${rect.height}px`;
    itemEl.style.left = `${rect.left - trackRect.left}px`;
    itemEl.style.top = `${rect.top - trackRect.top}px`;
    itemEl.style.position = "absolute";
    itemEl.style.zIndex = "30";
    itemEl.style.pointerEvents = "none";

    if (!track.style.position) {
      track.style.position = "relative";
    }
    track.insertBefore(placeholder, itemEl.nextSibling);
    root.classList.add("is-reordering");

    if (captureEl.setPointerCapture) {
      try { captureEl.setPointerCapture(ev.pointerId); } catch { /* noop */ }
    }

    window.addEventListener("pointermove", onPointerMove, { passive: false });
    window.addEventListener("pointerup", onPointerUp, { passive: false });
    window.addEventListener("pointercancel", onPointerCancel, { passive: false });
  }

  function finishDrag(opts: { notify?: boolean; revert?: boolean } = {}) {
    if (!dragState) return;
    const { notify = true, revert = false } = opts;
    const { itemEl, placeholder, pointerId, captureTarget, dragSurface, touchActionPrev, fromIndex, id, releaseScrollLock } = dragState;

    root.classList.remove("is-reordering");

    if (captureTarget && captureTarget.hasPointerCapture(pointerId)) {
      try { captureTarget.releasePointerCapture(pointerId); } catch { /* noop */ }
    }

    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
    window.removeEventListener("pointercancel", onPointerCancel);

    if (!revert) {
      const siblings = Array.from(track.children).filter((node) => node !== itemEl);
      const targetIndex = siblings.indexOf(placeholder);
      if (targetIndex !== -1) {
        const beforeNode = siblings[targetIndex];
        if (beforeNode !== placeholder) {
          track.insertBefore(placeholder, beforeNode);
        }
      }
    } else {
      const siblings = Array.from(track.children).filter((node): node is HTMLDivElement => node !== itemEl && node !== placeholder && node instanceof HTMLDivElement);
      const ref = siblings[fromIndex] || null;
      if (ref) track.insertBefore(placeholder, ref);
      else track.appendChild(placeholder);
    }

    placeholder.replaceWith(itemEl);
    placeholder.remove();

    itemEl.classList.remove("is-dragging");
    itemEl.setAttribute("aria-grabbed", "false");
    itemEl.style.width = "";
    itemEl.style.height = "";
    itemEl.style.left = "";
    itemEl.style.top = "";
    itemEl.style.position = "";
    itemEl.style.zIndex = "";
    itemEl.style.pointerEvents = "";

    const siblings = Array.from(track.children).filter((node) => node instanceof HTMLDivElement) as HTMLDivElement[];
    const newIndex = siblings.indexOf(itemEl);

    if (dragSurface) {
      dragSurface.style.touchAction = touchActionPrev ?? "";
    }

    releaseScrollLock?.();

    dragState = null;

    if (!notify || revert) {
      focusHandle(id);
      renderItems(items);
      return;
    }

    const toIndex = newIndex;
    if (toIndex !== -1 && toIndex !== fromIndex) {
      const updated = items.slice();
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      items = updated;
      focusHandle(moved.id);
      renderItems(items);
      onOrderChange?.(items.slice(), { id: moved.id, from: fromIndex, to: toIndex, item: moved });
    } else {
      focusHandle(id);
      renderItems(items);
    }
  }

  renderItems(items);

  return {
    root,
    getItems: () => items.slice(),
    setItems(nextItems) {
      if (dragState) finishDrag({ notify: false, revert: true });
      items = nextItems.slice();
      renderItems(items);
    },
    moveItem,
    destroy() {
      if (dragState) finishDrag({ notify: false, revert: true });
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerCancel);
    }
  };
}
