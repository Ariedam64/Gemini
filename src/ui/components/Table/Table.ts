import { element } from "../../styles/helpers";

export type Align = "left" | "center" | "right";
export type ColDef<T = any> = {
  key: keyof T | string;
  header: string;
  width?: string;
  align?: Align;
  sortable?: boolean;
  render?: (row: T, rowIndex: number) => Node | string;
  sortFn?: (a: T, b: T) => number;
  title?: string;
};

export type TableOptions<T = any> = {
  id?: string;
  columns: ColDef<T>[];
  data: T[];
  pageSize?: number;
  stickyHeader?: boolean;
  zebra?: boolean;
  compact?: boolean;
  maxHeight?: number | string;
  selectable?: boolean;
  animations?: boolean;
  respectReducedMotion?: boolean;
  getRowId?: (row: T, index: number) => string;
  onSortChange?: (colKey: string | null, dir: "asc" | "desc" | null) => void;
  onRowClick?: (row: T, index: number, ev: MouseEvent) => void;
};

export type TableHandle<T = any> = {
  root: HTMLDivElement;
  setData: (rows: T[]) => void;
  setColumns: (cols: ColDef<T>[]) => void;
  sortBy: (key: string | null, dir?: "asc" | "desc" | null) => void;
  getSelection: () => string[];
  clearSelection: () => void;
  setPage: (p: number) => void;
  getState: () => { page: number; pageCount: number; sortKey: string | null; sortDir: "asc" | "desc" | null };
  destroy: () => void;
};

export function Table<T = any>(opts: TableOptions<T>): TableHandle<T> {
  const {
    id,
    columns: initialCols,
    data: initialData,
    pageSize = 0,
    stickyHeader = true,
    zebra = true,
    animations = true,
    respectReducedMotion = true,
    compact = false,
    maxHeight,
    selectable = false,
    getRowId = (_r, i) => String(i),
    onSortChange,
    onRowClick,
  } = opts;

  let columns = initialCols.slice();
  let data = initialData.slice();
  let originalData = initialData.slice();            // <<< remember the base order
  let sortKey: string | null = null;
  let sortDir: "asc" | "desc" | null = null;
  let page = 1;

  const prefersReduce = typeof window !== "undefined" && typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;
  const enableAnim = !!animations && !(respectReducedMotion && prefersReduce);

  const root = element("div", { className: "lg-table-wrap", id }) as HTMLDivElement;
  if (maxHeight != null) {
    const v = typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight;
    root.style.setProperty("--tbl-max-h", v);
  }

  const table = element("div", { className: "lg-table" }) as HTMLDivElement;
  const head = element("div", { className: "lg-thead" }) as HTMLDivElement;
  const body = element("div", { className: "lg-tbody" }) as HTMLDivElement;
  const foot = element("div", { className: "lg-tfoot" }) as HTMLDivElement;

  if (stickyHeader) root.classList.add("sticky");
  if (zebra) root.classList.add("zebra");
  if (compact) root.classList.add("compact");
  if (selectable) root.classList.add("selectable");

  const CHECK_W = "36px";
  root.style.setProperty("--check-w", CHECK_W);
  function updateColsTemplate() {
    const parts = columns.map(c => {
      const w = (c.width || "1fr").trim();
      return /\bfr$/.test(w) ? `minmax(0, ${w})` : w;
    });
    const tpl = (selectable ? [CHECK_W, ...parts] : parts).join(" ");
    root.style.setProperty("--lg-cols", tpl);
  }
  updateColsTemplate();

  function pageCount() { if (!pageSize) return 1; return Math.max(1, Math.ceil(data.length / pageSize)); }
  function pageSlice() { if (!pageSize) return data; const start = (page - 1) * pageSize; return data.slice(start, start + pageSize); }

  function sortData() {
    if (!sortKey || !sortDir) return;
    const col = columns.find(c => String(c.key) === sortKey);
    const dir = sortDir === "asc" ? 1 : -1;
    const cmp = col?.sortFn
      ? (a: T, b: T) => dir * col.sortFn!(a, b)
      : (a: T, b: T) => {
          const av = (a as any)[sortKey as any];
          const bv = (b as any)[sortKey as any];
          if (av == null && bv == null) return 0;
          if (av == null) return -1 * dir;
          if (bv == null) return 1 * dir;
          if (typeof av === "number" && typeof bv === "number") return dir * (av - bv);
          return dir * String(av).localeCompare(String(bv), undefined, { numeric: true, sensitivity: "base" });
        };
    data.sort(cmp);
  }

  const selected = new Set<string>();
  function getSelection() { return Array.from(selected); }
  function clearSelection() {
    selected.clear();
    updateHeaderCheckbox();
    body.querySelectorAll<HTMLInputElement>(".lg-row-check").forEach(i => i.checked = false);
  }

  let headerCheck: HTMLInputElement | null = null;
  function updateHeaderCheckbox() {
    if (!headerCheck) return;
    const rows = pageSlice();
    if (!rows.length) { headerCheck.indeterminate = false; headerCheck.checked = false; return; }
    const ids = rows.map((r, i) => getRowId(r, (page - 1) * (pageSize || 0) + i));
    const count = ids.reduce((acc, id) => acc + (selected.has(id) ? 1 : 0), 0);
    headerCheck.checked = count === ids.length;
    headerCheck.indeterminate = count > 0 && count < ids.length;
  }

  function syncHeaderPaddingNow() {
    const sw = body.offsetWidth - body.clientWidth;
    head.style.paddingRight = sw > 0 ? `${sw}px` : "0px";
  }
  function syncHeaderPadding() { requestAnimationFrame(syncHeaderPaddingNow); }
  const ro = new ResizeObserver(() => syncHeaderPaddingNow());
  const onWinResize = () => syncHeaderPaddingNow();

  function renderHead() {
    head.replaceChildren();
    const row = element("div", { className: "lg-tr lg-tr-head" }) as HTMLDivElement;

    if (selectable) {
      const cell = element("div", { className: "lg-th lg-th-check" }) as HTMLDivElement;
      headerCheck = element("input", { type: "checkbox" }) as HTMLInputElement;
      headerCheck.addEventListener("change", () => {
        const rows = pageSlice();
        const check = headerCheck!.checked;
        rows.forEach((r, i) => {
          const id = getRowId(r, (page - 1) * (pageSize || 0) + i);
          if (check) selected.add(id); else selected.delete(id);
        });
        renderBody();
      });
      cell.appendChild(headerCheck);
      row.appendChild(cell);
    }

    columns.forEach(col => {
      const th = element("button", { className: "lg-th", type: "button", title: col.title || col.header }) as HTMLButtonElement;
      th.textContent = col.header;
      if (col.align) th.style.setProperty("--col-align", col.align);
      if (col.sortable) th.classList.add("sortable");

      if (sortKey === String(col.key) && sortDir) th.setAttribute("data-sort", sortDir);
      else th.removeAttribute("data-sort");

      if (col.sortable) {
        th.addEventListener("click", () => {
          const k = String(col.key);
          if (sortKey !== k) {
            sortKey = k; sortDir = "asc";
          } else {
            sortDir = sortDir === "asc" ? "desc" : (sortDir === "desc" ? null : "asc");
            if (!sortDir) {
              sortKey = null;
              data = originalData.slice();    // <<< back to the base order
            }
          }
          onSortChange?.(sortKey, sortDir);
          if (sortKey && sortDir) sortData();
          render();
        });
      }
      row.appendChild(th);
    });

    head.appendChild(row);

    try { ro.disconnect(); } catch {}
    ro.observe(body);
    syncHeaderPadding();
  }

  function cellsOf(row: HTMLElement): HTMLElement[] {
    return Array.from(row.querySelectorAll<HTMLElement>(":scope > .lg-td, :scope > .lg-td-check"));
  }
  function firstCellOf(row: HTMLElement): HTMLElement | null {
    return row.querySelector<HTMLElement>(".lg-td, .lg-td-check");
  }
  function firstCellRectOf(row: HTMLElement): DOMRect | null {
    const c = firstCellOf(row);
    return c ? c.getBoundingClientRect() : null;
  }

  function renderBody() {
    const rows = pageSlice();

    const firstRect = new Map<string, DOMRect>();
    Array.from(body.children).forEach(node => {
      const rowEl = node as HTMLDivElement;
      const id = rowEl.getAttribute("data-id");
      if (!id) return;
      const r = firstCellRectOf(rowEl);
      if (r) firstRect.set(id, r);
    });

    const pool = new Map<string, HTMLDivElement>();
    Array.from(body.children).forEach(node => {
      const rowEl = node as HTMLDivElement;
      const id = rowEl.getAttribute("data-id");
      if (id) pool.set(id, rowEl);
    });

    const nextIds: string[] = [];
    for (let i = 0; i < rows.length; i++) {
      const rowData = rows[i];
      const absIndex = (pageSize ? (page - 1) * pageSize : 0) + i;
      const rid = getRowId(rowData, absIndex);
      nextIds.push(rid);

      let tr = pool.get(rid);
      if (!tr) {
        tr = buildRow(rowData, absIndex);
        if (enableAnim) {
          const cs = cellsOf(tr);
          cs.forEach(c => { c.style.transform = "translateY(6px)"; c.style.opacity = "0"; });
        }
      }
      body.appendChild(tr);
    }

    const leaving: HTMLDivElement[] = [];
    pool.forEach((el, id) => { if (!nextIds.includes(id)) leaving.push(el); });

    if (!enableAnim) {
      leaving.forEach(el => el.remove());
      updateHeaderCheckbox();
      syncHeaderPadding();
      return;
    }

    nextIds.forEach(id => {
      const rowEl = body.querySelector<HTMLDivElement>(`.lg-tr-body[data-id="${id}"]`);
      if (!rowEl) return;

      const last = firstCellRectOf(rowEl);
      const first = firstRect.get(id);
      const cells = cellsOf(rowEl);

      if (first && last) {
        const dx = first.left - last.left;
        const dy = first.top - last.top;

        cells.forEach(c => {
          c.style.transition = "none";
          c.style.transform = `translate(${dx}px, ${dy}px)`;
          c.style.opacity = "1";
        });
        firstCellOf(rowEl)?.getBoundingClientRect();

        cells.forEach(c => {
          c.style.willChange = "transform, opacity";
          c.style.transition = "transform .18s ease, opacity .18s ease";
        });
        requestAnimationFrame(() => {
          cells.forEach(c => { c.style.transform = "translate(0,0)"; });
        });
      } else {
        cells.forEach(c => { c.style.transition = "transform .18s ease, opacity .18s ease"; });
        requestAnimationFrame(() => {
          cells.forEach(c => { c.style.transform = "translate(0,0)"; c.style.opacity = "1"; });
        });
      }

      const onEnd = (ev: TransitionEvent) => {
        if (ev.propertyName === "transform" || ev.propertyName === "opacity") {
          cells.forEach(c => {
            c.style.willChange = "";
            c.style.transition = "";
            c.style.transform = "";
            c.style.opacity = "";
          });
          (ev.currentTarget as HTMLElement).removeEventListener("transitionend", onEnd);
        }
      };
      const listenTarget = cells[0];
      if (listenTarget) listenTarget.addEventListener("transitionend", onEnd);
    });

    leaving.forEach(rowEl => {
      const cells = cellsOf(rowEl);
      cells.forEach(c => {
        c.style.willChange = "transform, opacity";
        c.style.transition = "transform .18s ease, opacity .18s ease";
        c.style.opacity = "0";
        c.style.transform = "translateY(-6px)";
      });
      const onEnd = (ev: TransitionEvent) => {
        if (ev.propertyName === "opacity") {
          (ev.currentTarget as HTMLElement).removeEventListener("transitionend", onEnd);
          rowEl.remove();
        }
      };
      const listenTarget = cells[0];
      if (listenTarget) listenTarget.addEventListener("transitionend", onEnd);
      else rowEl.remove();
    });

    updateHeaderCheckbox();
    syncHeaderPadding();
  }

  function buildRow(rowData: T, absIndex: number): HTMLDivElement {
    const rid = getRowId(rowData, absIndex);
    const tr = element("div", { className: "lg-tr lg-tr-body", "data-id": rid }) as HTMLDivElement;

    if (selectable) {
      const td = element("div", { className: "lg-td lg-td-check" }) as HTMLDivElement;
      const cb = element("input", { type: "checkbox", className: "lg-row-check" }) as HTMLInputElement;
      cb.checked = selected.has(rid);
      cb.addEventListener("change", () => { if (cb.checked) selected.add(rid); else selected.delete(rid); updateHeaderCheckbox(); });
      td.appendChild(cb);
      tr.appendChild(td);
    }

    columns.forEach(col => {
      const td = element("div", { className: "lg-td" }) as HTMLDivElement;
      if (col.align) td.style.setProperty("--col-align", col.align);
      let node: Node | string = col.render ? col.render(rowData, absIndex) : String((rowData as any)[col.key] ?? "");
      if (typeof node === "string") td.textContent = node; else td.appendChild(node);
      tr.appendChild(td);
    });

    if (onRowClick) {
      tr.classList.add("clickable");
      tr.addEventListener("click", (ev) => {
        if ((ev.target as HTMLElement).closest(".lg-td-check")) return;
        onRowClick(rowData, absIndex, ev);
      });
    }

    return tr;
  }

  function renderFoot() {
    foot.replaceChildren();
    if (!pageSize) return;
    const totalPages = pageCount();
    const wrap = element("div", { className: "lg-pager" }) as HTMLDivElement;
    const btnPrev = element("button", { className: "btn", type: "button" }, "←") as HTMLButtonElement;
    const btnNext = element("button", { className: "btn", type: "button" }, "→") as HTMLButtonElement;
    const info = element("span", { className: "lg-pager-info" }, `${page} / ${totalPages}`) as HTMLSpanElement;
    btnPrev.disabled = page <= 1; btnNext.disabled = page >= totalPages;
    btnPrev.addEventListener("click", () => setPage(page - 1));
    btnNext.addEventListener("click", () => setPage(page + 1));
    wrap.append(btnPrev, info, btnNext);
    foot.appendChild(wrap);
  }

  function setPage(p: number) { const max = pageCount(); page = Math.min(Math.max(1, p), max); renderBody(); renderFoot(); }

  function render() { updateColsTemplate(); renderHead(); renderBody(); renderFoot(); }

  // Public API
  function setData(rows: T[]) {
    originalData = rows.slice();   // <<< capture the new default order
    data = rows.slice();
    if (sortKey && sortDir) sortData();
    setPage(1);
  }

  function setColumns(cols: ColDef<T>[]) { columns = cols.slice(); render(); }

  function sortBy(key: string | null, dir: "asc" | "desc" | null = "asc") {
    sortKey = key;
    sortDir = key ? dir : null;
    if (sortKey && sortDir) {
      sortData();
    } else {
      data = originalData.slice();  // <<< reset ordre
    }
    render();
  }

  function destroy() { try { ro.disconnect(); } catch {} window.removeEventListener("resize", onWinResize); }

  table.append(head, body, foot);
  root.appendChild(table);
  window.addEventListener("resize", onWinResize);
  render();

  return {
    root,
    setData,
    setColumns,
    sortBy,
    getSelection,
    clearSelection,
    setPage,
    getState: () => ({ page, pageCount: pageCount(), sortKey, sortDir }),
    destroy
  };
}
