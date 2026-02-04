// ui/components/SegmentedControl/SegmentedControl.ts
import { element } from "../../styles/helpers";

export type SegmentSize = "sm" | "md" | "lg";

export type SegmentDef = {
  id: string;
  label: string;
  icon?: string | Node;
  disabled?: boolean;
};

export type SegmentedControlOptions = {
  segments: SegmentDef[];
  selected?: string;
  size?: SegmentSize;
  fullWidth?: boolean;
  disabled?: boolean;
  onChange?: (id: string) => void;
};

export type SegmentedControlHandle = HTMLDivElement & {
  select: (id: string) => void;
  getSelected: () => string;
  setDisabled: (v: boolean) => void;
  destroy: () => void;
};

function toNode(content?: string | Node): Node | null {
  if (content == null) return null;
  return typeof content === "string" ? document.createTextNode(content) : content;
}

export function SegmentedControl(opts: SegmentedControlOptions): SegmentedControlHandle {
  const {
    segments,
    selected = segments[0]?.id ?? "",
    size = "md",
    fullWidth = false,
    disabled = false,
    onChange,
  } = opts;

  const root = element("div", { className: "sg-root" }) as HTMLDivElement;
  if (size !== "md") root.classList.add(`sg--${size}`);
  if (fullWidth) root.style.width = "100%";

  const container = element("div", {
    className: "sg-container",
    role: "tablist",
  }) as HTMLDivElement;

  const indicator = element("div", { className: "sg-indicator" });

  // Create segment buttons
  const buttons: (HTMLButtonElement & { id: string })[] = segments.map((seg) => {
    const btn = element("button", {
      className: "sg-btn",
      type: "button",
      role: "tab",
      "aria-selected": "false",
      title: seg.label,
    }) as HTMLButtonElement & { id: string };

    btn.id = seg.id;

    // Content structure: [icon] [label]
    if (seg.icon) {
      const iconSpan = element("span", { className: "sg-icon" });
      const iconNode = toNode(seg.icon);
      if (iconNode) iconSpan.appendChild(iconNode);
      btn.appendChild(iconSpan);
    }

    const labelSpan = element("span", { className: "sg-label" }, seg.label);
    btn.appendChild(labelSpan);

    btn.disabled = !!seg.disabled;

    return btn;
  });

  container.appendChild(indicator);
  buttons.forEach((btn) => container.appendChild(btn));
  root.appendChild(container);

  // State
  let _selected = selected;
  let _disabled = disabled;
  let initObserver: ResizeObserver | null = null;

  function updateIndicator() {
    const activeBtn = buttons.find((b) => b.id === _selected);
    if (!activeBtn) return;

    requestAnimationFrame(() => {
      const ind = indicator as HTMLDivElement;
      const x = activeBtn.offsetLeft;
      const w = activeBtn.offsetWidth;

      // Use transform for smooth animation from current position
      ind.style.width = `${w}px`;
      ind.style.transform = `translateX(${x}px)`;
    });
  }

  function reflect() {
    buttons.forEach((btn) => {
      const isActive = btn.id === _selected;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-selected", String(isActive));
      btn.disabled = _disabled || !!segments.find((s) => s.id === btn.id)?.disabled;
    });
    updateIndicator();
  }

  function onButtonClick(e: MouseEvent) {
    const btn = e.currentTarget as HTMLButtonElement;
    if (btn.disabled) return;
    const btnWithId = btn as HTMLButtonElement & { id: string };
    select(btnWithId.id);
  }

  function onKeyDown(e: KeyboardEvent) {
    if (_disabled) return;

    const currentIndex = buttons.findIndex((b) => b.id === _selected);
    let nextIndex = currentIndex;

    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
    } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % buttons.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = buttons.length - 1;
    }

    if (nextIndex !== currentIndex) {
      const nextBtn = buttons[nextIndex];
      if (nextBtn && !nextBtn.disabled) {
        select(nextBtn.id);
        nextBtn.focus();
      }
    }
  }

  // Event listeners
  buttons.forEach((btn) => {
    btn.addEventListener("click", onButtonClick);
    btn.addEventListener("keydown", onKeyDown);
  });

  function select(id: string) {
    const segmentExists = segments.some((s) => s.id === id);
    if (!segmentExists || _selected === id) return;

    _selected = id;
    reflect();
    onChange?.(_selected);
  }

  function getSelected(): string {
    return _selected;
  }

  function setDisabled(v: boolean) {
    _disabled = !!v;
    reflect();
  }

  function destroy() {
    buttons.forEach((btn) => {
      btn.removeEventListener("click", onButtonClick);
      btn.removeEventListener("keydown", onKeyDown);
    });
    initObserver?.disconnect();
    initObserver = null;
  }

  // Initial render
  reflect();

  // Initial indicator positioning — ResizeObserver ensures the indicator is
  // placed correctly even when the control starts inside a collapsed/hidden container
  // (offsetLeft/offsetWidth are 0 until the element is visible).
  initObserver = new ResizeObserver(() => {
    const activeBtn = buttons.find((b) => b.id === _selected);
    if (activeBtn && activeBtn.offsetWidth > 0) {
      const ind = indicator as HTMLDivElement;
      ind.style.transition = 'none';
      ind.style.width = `${activeBtn.offsetWidth}px`;
      ind.style.transform = `translateX(${activeBtn.offsetLeft}px)`;

      requestAnimationFrame(() => {
        ind.style.removeProperty('transition');
      });
      initObserver?.disconnect();
      initObserver = null;
    }
  });
  initObserver.observe(container);

  // Expose API on root element
  const handle = root as SegmentedControlHandle;
  handle.select = select;
  handle.getSelected = getSelected;
  handle.setDisabled = setDisabled;
  handle.destroy = destroy;

  return handle;
}
