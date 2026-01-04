// NavTabs with sliding pill indicator, scroll arrows, and touch swipe support
import { element } from "../../styles/helpers";

export type TabDef = { id: string; label: string };

export type NavTabs = {
  root: HTMLDivElement;
  activate: (id: string) => void;
  recalc: () => void;
  getActive: () => string;
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

  // Left arrow button
  const btnLeft = element(
    "button",
    { className: "lg-tabs-arrow lg-tabs-arrow-left", ariaLabel: "Scroll left" },
    "‹"
  ) as HTMLButtonElement;

  // Right arrow button
  const btnRight = element(
    "button",
    { className: "lg-tabs-arrow lg-tabs-arrow-right", ariaLabel: "Scroll right" },
    "›"
  ) as HTMLButtonElement;

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

  // Touch swipe support for mobile
  tabsRow.addEventListener("touchstart", (e: TouchEvent) => {
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    isVerticalScroll = false;
  }, { passive: true });

  tabsRow.addEventListener("touchmove", (e: TouchEvent) => {
    if (isVerticalScroll) return;

    const touch = e.touches[0];
    const dx = touch.clientX - touchStartX;
    const dy = touch.clientY - touchStartY;

    if (Math.abs(dy) > Math.abs(dx)) {
      isVerticalScroll = true;
      return;
    }

    if (Math.abs(dx) > SWIPE_THRESHOLD) {
      e.preventDefault();
      tabsRow.scrollLeft -= dx * 0.5;
    }
  }, { passive: false });

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

  let active = initial || (tabs[0]?.id ?? "");
  function activate(id: string) {
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
    recalc: () => {
      movePillTo(active);
      updateArrowState();
    },
    getActive: () => active,
  };
}
