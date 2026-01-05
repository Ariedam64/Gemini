// NavTabs with sliding pill indicator, scroll arrows, and touch swipe support
import { element } from "../../styles/helpers";

export type TabDef = { id: string; label: string };

export type NavTabs = {
  root: HTMLDivElement;
  activate: (id: string) => void;
  recalc: () => void;
  getActive: () => string;
  showTab: (id: string) => void;
  hideTab: (id: string) => void;
  isTabVisible: (id: string) => boolean;
  getVisibleTabs: () => string[];
};

const SCROLL_AMOUNT = 150;
const SWIPE_THRESHOLD = 30;

export function createNavTabs(tabs: TabDef[], initial: string, onChange: (id: string) => void): NavTabs {
  const pill = element("div", { className: "lg-pill", id: "pill" });
  const btns = tabs.map(t => {
    const b = element("button", { className: "lg-tab" }, t.label) as HTMLButtonElement;
    b.setAttribute("data-target", t.id);
    return b;
  });

  // Tabs scroll container
  const tabsRow = element("div", { className: "lg-tabs", id: "lg-tabs-row" }, pill, ...btns) as HTMLDivElement;

  // Track tab visibility state
  const visibilityMap = new Map<string, boolean>(tabs.map(t => [t.id, true]));
  const btnMap = new Map<string, HTMLButtonElement>(btns.map((b, i) => [tabs[i].id, b]));

  // Helper to create SVG chevron
  function createChevronSVG(direction: 'left' | 'right') {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polyline.setAttribute('points', direction === 'left' ? '15 18 9 12 15 6' : '9 18 15 12 9 6');
    svg.appendChild(polyline);
    return svg;
  }

  // Left arrow button with SVG chevron
  const btnLeft = element("button", {
    className: "lg-tabs-arrow lg-tabs-arrow-left",
    ariaLabel: "Scroll left",
  }) as HTMLButtonElement;
  btnLeft.appendChild(createChevronSVG('left'));

  // Right arrow button with SVG chevron
  const btnRight = element("button", {
    className: "lg-tabs-arrow lg-tabs-arrow-right",
    ariaLabel: "Scroll right",
  }) as HTMLButtonElement;
  btnRight.appendChild(createChevronSVG('right'));

  // Container with arrows
  const wrapper = element("div", { className: "lg-tabs-wrapper" }, btnLeft, tabsRow, btnRight) as HTMLDivElement;
  const root = wrapper;

  // Touch swipe tracking
  let touchStartX = 0;
  let touchStartY = 0;
  let isVerticalScroll = false;

  function updateArrowState() {
    const canScrollLeft = tabsRow.scrollLeft > 0;
    const canScrollRight = tabsRow.scrollLeft < tabsRow.scrollWidth - tabsRow.clientWidth - 1;

    btnLeft.classList.toggle("disabled", !canScrollLeft);
    btnRight.classList.toggle("disabled", !canScrollRight);
  }

  // Scroll left
  btnLeft.addEventListener("click", () => {
    tabsRow.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
    setTimeout(updateArrowState, 300);
  });

  // Scroll right
  btnRight.addEventListener("click", () => {
    tabsRow.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
    setTimeout(updateArrowState, 300);
  });

  // Wheel scrolling for overflow
  tabsRow.addEventListener("wheel", (e: WheelEvent) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      tabsRow.scrollLeft += e.deltaY;
      updateArrowState();
    }
  }, { passive: false });

  // Track if we're in a touch scroll
  let isTouchScrolling = false;
  let lastScrollLeft = 0;

  // Touch swipe support for mobile with better animation
  tabsRow.addEventListener("touchstart", (e: TouchEvent) => {
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    isVerticalScroll = false;
    isTouchScrolling = false;
    lastScrollLeft = tabsRow.scrollLeft;
  }, { passive: true });

  tabsRow.addEventListener("touchmove", (e: TouchEvent) => {
    if (isVerticalScroll) return;

    const touch = e.touches[0];
    const dx = touch.clientX - touchStartX;
    const dy = touch.clientY - touchStartY;

    // Detect if this is a vertical scroll
    if (Math.abs(dy) > Math.abs(dx)) {
      isVerticalScroll = true;
      return;
    }

    // Only start scroll prevention after threshold
    if (Math.abs(dx) > SWIPE_THRESHOLD) {
      isTouchScrolling = true;
      e.preventDefault();
      // Direct drag with smooth interpolation
      tabsRow.scrollLeft = lastScrollLeft - dx;
    }
  }, { passive: false });

  // Handle touch end with momentum-like effect
  tabsRow.addEventListener("touchend", () => {
    isTouchScrolling = false;
    updateArrowState();
  }, { passive: true });

  // Update arrows on scroll
  tabsRow.addEventListener("scroll", updateArrowState, { passive: true });

  function movePillTo(id: string) {
    const tabEl = btns.find(b => (b as HTMLButtonElement).dataset.target === id) || btns[0];
    if (!tabEl) return;

    // Wait for layout to be recalculated (especially during resize)
    // offsetLeft/offsetWidth are computed values that need the DOM to be laid out
    requestAnimationFrame(() => {
      // Get position relative to tabsRow container (not viewport)
      // This is needed because pill uses transform which is relative to the flex container
      const x = tabEl.offsetLeft;
      const w = tabEl.offsetWidth;

      (pill as HTMLDivElement).style.width = `${w}px`;
      (pill as HTMLDivElement).style.transform = `translateX(${x}px)`;

      // Keep visible in scroll viewport
      const left = tabsRow.scrollLeft;
      const viewL = left;
      const viewR = left + tabsRow.clientWidth;
      const needL = x - 12;
      const needR = x + w + 12;
      if (needL < viewL) tabsRow.scrollTo({ left: needL, behavior: "smooth" });
      else if (needR > viewR) tabsRow.scrollTo({ left: needR - tabsRow.clientWidth, behavior: "smooth" });

      setTimeout(updateArrowState, 300);
    });
  }

  // Get first visible tab for fallback when hiding active tab
  function getFirstVisibleTab(): string | null {
    for (const [id, visible] of visibilityMap) {
      if (visible) return id;
    }
    return null;
  }

  // Hide a tab from the navigation
  function hideTab(id: string): void {
    const btn = btnMap.get(id);
    if (!btn) return;

    visibilityMap.set(id, false);
    btn.style.display = 'none';

    // If hiding the active tab, switch to first visible
    if (active === id) {
      const firstVisible = getFirstVisibleTab();
      if (firstVisible) {
        activate(firstVisible);
      }
    } else {
      recalc();
    }
  }

  // Show a previously hidden tab
  function showTab(id: string): void {
    const btn = btnMap.get(id);
    if (!btn) return;

    visibilityMap.set(id, true);
    btn.style.display = '';
    recalc();
  }

  // Recalc helper (defined early for use in show/hide)
  function recalc(): void {
    movePillTo(active);
    updateArrowState();
  }

  let active = initial || (tabs[0]?.id ?? "");
  function activate(id: string) {
    // Guard: do not activate hidden tabs
    if (!visibilityMap.get(id)) return;

    active = id;
    btns.forEach(b => b.classList.toggle("active", (b as HTMLButtonElement).dataset.target === id));
    movePillTo(id);
    onChange(id);
  }

  btns.forEach(b => b.addEventListener("click", () => activate((b as HTMLButtonElement).dataset.target!)));

  queueMicrotask(() => {
    movePillTo(active);
    updateArrowState();
  });

  return {
    root,
    activate,
    recalc,
    getActive: () => active,
    showTab,
    hideTab,
    isTabVisible: (id: string) => visibilityMap.get(id) ?? false,
    getVisibleTabs: () => [...visibilityMap.entries()].filter(([_, visible]) => visible).map(([id]) => id),
  };
}
