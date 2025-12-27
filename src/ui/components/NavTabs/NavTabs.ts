// NavTabs with sliding pill indicator
import { el } from "../../dom";

export type TabDef = { id: string; label: string };

export type NavTabs = {
  root: HTMLDivElement;                 // no longer a .lg-tabbar, just .lg-tabs
  activate: (id: string) => void;
  recalc: () => void;
  getActive: () => string;
};

export function createNavTabs(tabs: TabDef[], initial: string, onChange: (id: string) => void): NavTabs {
  const pill = el("div", { className: "lg-pill", id: "pill" });
  const btns = tabs.map(t => {
    const b = el("button", { className: "lg-tab" }, t.label) as HTMLButtonElement;
    b.setAttribute("data-target", t.id);
    return b;
  });

  // RENDERS ONLY THE ROW, NOT THE FULL BAR
  const tabsRow = el("div", { className: "lg-tabs", id: "lg-tabs-row" }, pill, ...btns) as HTMLDivElement;
  const root = tabsRow; // no more nested .lg-tabbar

  // Wheel scrolling for overflow
  tabsRow.addEventListener("wheel", (e: WheelEvent) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      tabsRow.scrollLeft += e.deltaY;
    }
  }, { passive: false });

  function movePillTo(id: string) {
    const wrapRect = tabsRow.getBoundingClientRect();
    const tabEl = btns.find(b => (b as HTMLButtonElement).dataset.target === id) || btns[0];
    if (!tabEl) return;
    const r = tabEl.getBoundingClientRect();
    const x = r.left - wrapRect.left;
    const w = r.width;
    (pill as HTMLDivElement).style.width = `${w}px`;
    (pill as HTMLDivElement).style.transform = `translateX(${x}px)`;

    // Keep visible
    const left = tabsRow.scrollLeft;
    const viewL = left;
    const viewR = left + tabsRow.clientWidth;
    const needL = x - 12;
    const needR = x + w + 12;
    if (needL < viewL) tabsRow.scrollTo({ left: needL, behavior: "smooth" });
    else if (needR > viewR) tabsRow.scrollTo({ left: needR - tabsRow.clientWidth, behavior: "smooth" });
  }

  let active = initial || (tabs[0]?.id ?? "");
  function activate(id: string) {
    active = id;
    btns.forEach(b => b.classList.toggle("active", (b as HTMLButtonElement).dataset.target === id));
    movePillTo(id);
    onChange(id);
  }

  btns.forEach(b => b.addEventListener("click", () => activate((b as HTMLButtonElement).dataset.target!)));

  queueMicrotask(() => movePillTo(active));

  return {
    root,
    activate,
    recalc: () => movePillTo(active),
    getActive: () => active,
  };
}
