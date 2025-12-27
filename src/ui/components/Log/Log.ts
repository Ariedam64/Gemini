// ui/components/Log/Log.ts
import { el } from "../../dom";

export type LogMode = "plain" | "js";
export type LogLevel = "debug" | "info" | "warn" | "error";

export type LogEntry = {
  text: string;
  level?: LogLevel;
  time?: Date | number | string;
  key?: string; // if provided, updates the last line with same key
  groupKey?: string; // if provided, append inside that group's body
};

export type LogOptions = {
  id?: string;
  className?: string;
  height?: number | string; // e.g. 220 | "220px" | "30vh"
  maxLines?: number;        // clamp the number of DOM lines
  wrap?: boolean;           // wrap long lines (default false)
  mode?: LogMode;           // "plain" | "js"
  showTimestamps?: boolean; // default true
  autoScroll?: boolean;     // keep scrolled to end on add (default true)
};

export type LogHandle = HTMLDivElement & {
  add: (entry: string | LogEntry) => void;
  addMany: (entries: Array<string | LogEntry>) => void;
  clear: () => void;
  setMode: (mode: LogMode) => void;
  setWrap: (wrap: boolean) => void;
  setMaxLines: (n: number) => void;
  scrollToEnd: () => void;
  beginGroup: (title: string, opts?: { key?: string; collapsed?: boolean }) => string;
  endGroup: (key: string) => void;
  toggleGroup: (key: string, collapsed?: boolean) => void;
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Very light JS syntax highlighter (regex-based, log-friendly)
function highlightJS(input: string): string {
  // Escape first
  let s = escapeHtml(input);

  // Block comments /* ... */
  s = s.replace(/\/\*[\s\S]*?\*\//g, (m) => `<span class="tok tok-comm">${m}</span>`);

  // Line comments //...
  s = s.replace(/(^|\s)(\/\/.*)$/gm, (_, p1, p2) => `${p1}<span class="tok tok-comm">${p2}</span>`);

  // Template strings `...`
  s = s.replace(/`[^`\\]*(?:\\.[^`\\]*)*`/g, (m) => `<span class="tok tok-str">${m}</span>`);

  // Single/Double quoted strings
  s = s.replace(/'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/g, (m) => `<span class="tok tok-str">${m}</span>`);

  // Numbers (hex, binary, octal, floats)
  s = s.replace(/\b(?:0[xX][0-9a-fA-F]+|0[bB][01]+|0[oO][0-7]+|\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?(?:[eE][+-]?\d+)?)\b/g,
    (m) => `<span class="tok tok-num">${m}</span>`
  );

  // Keywords
  const kw = [
    'break','case','catch','class','const','continue','debugger','default','delete','do','else','export','extends',
    'finally','for','function','if','import','in','instanceof','let','new','return','super','switch','this','throw',
    'try','typeof','var','void','while','with','yield','await','enum','implements','interface','package','private',
    'protected','public','static','as','from','of'
  ];
  const kwRe = new RegExp(`\\b(?:${kw.join('|')})\\b`, 'g');
  s = s.replace(kwRe, (m) => `<span class="tok tok-kw">${m}</span>`);

  // Booleans/null/undefined
  s = s.replace(/\b(?:true|false|null|undefined|NaN|Infinity)\b/g, (m) => `<span class="tok tok-lit">${m}</span>`);

  return s;
}

function fmtTime(t: Date | number | string | undefined): string {
  if (!t) return new Date().toLocaleTimeString();
  const d = t instanceof Date ? t : new Date(t);
  if (isNaN(d.getTime())) return String(t);
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  const ss = String(d.getSeconds()).padStart(2, '0');
  return `${hh}:${mm}:${ss}`;
}

export function Log(opts: LogOptions = {}): LogHandle {
  const {
    id,
    className,
    height,
    maxLines = 500,
    wrap = false,
    mode = "plain",
    showTimestamps = true,
    autoScroll = true,
  } = opts;

  const root = el("div", { className: "log", id }) as HTMLDivElement;
  if (className) root.classList.add(...className.split(" ").filter(Boolean));
  if (wrap) root.classList.add("log--wrap");

  const viewport = el("div", { className: "log-viewport" }) as HTMLDivElement;
  const lines = el("div", { className: "log-lines" }) as HTMLDivElement;
  viewport.appendChild(lines);
  root.appendChild(viewport);

  if (height != null) {
    (root.style as any).blockSize = typeof height === "number" ? `${height}px` : String(height);
  }

  let currentMode: LogMode = mode;
  let currentMax = maxLines;
  const groups = new Map<string, { root: HTMLDivElement; body: HTMLDivElement; header: HTMLDivElement }>();

  function renderText(text: string) {
    if (currentMode === "js") return highlightJS(text);
    return escapeHtml(text);
  }

  function getContainer(groupKey?: string): HTMLElement {
    if (!groupKey) return lines;
    const g = groups.get(groupKey);
    return g?.body ?? lines;
  }

  function add(entry: string | LogEntry) {
    const e: LogEntry = typeof entry === 'string' ? { text: entry } : entry || { text: '' };
    const container = getContainer(e.groupKey);
    // Update in place if key is provided and an existing line is found in container
    if (e.key) {
      const existing = Array.from(container.querySelectorAll(`.log-line[data-key="${e.key}"]`)).pop() as HTMLDivElement | undefined;
      if (existing) {
        // Replace level class if provided
        if (e.level) {
          existing.classList.remove("log-level--debug","log-level--info","log-level--warn","log-level--error");
          existing.classList.add(`log-level--${e.level}`);
        }
        const timeEl = existing.querySelector('.log-time') as HTMLSpanElement | null;
        if (showTimestamps && timeEl) timeEl.textContent = fmtTime(e.time);
        const bodyEl = existing.querySelector('.log-text') as HTMLSpanElement | null;
        if (bodyEl) bodyEl.innerHTML = renderText(e.text);
        if (autoScroll) scrollToEnd();
        return;
      }
    }

    const line = document.createElement("div");
    line.className = "log-line";
    if (e.level) line.classList.add(`log-level--${e.level}`);
    if (e.key) line.dataset.key = e.key;

    if (showTimestamps) {
      const t = document.createElement("span");
      t.className = "log-time";
      t.textContent = fmtTime(e.time);
      line.appendChild(t);
    }

    const body = document.createElement("span");
    body.className = "log-text";
    body.innerHTML = renderText(e.text);
    line.appendChild(body);

    container.appendChild(line);

    // Clamp
    pruneIfNeeded();

    if (autoScroll) scrollToEnd();
  }

  function addMany(entries: Array<string | LogEntry>) {
    for (const e of entries) add(e);
  }

  function clear() { lines.replaceChildren(); groups.clear(); }
  function setMode(m: LogMode) { currentMode = m; scrollToEnd(); }
  function setWrap(v: boolean) {
    root.classList.toggle("log--wrap", !!v);
    scrollToEnd();
  }
  function setMaxLines(n: number) { currentMax = Math.max(1, Math.floor(n || 1)); }
  function scrollToEnd() {
    // Defer to next frame to ensure layout (wrapping) is applied
    requestAnimationFrame(() => {
      viewport.scrollTop = viewport.scrollHeight;
    });
  }

  function countTopLevelEntries(): number {
    let count = 0;
    for (let i = 0; i < lines.children.length; i += 1) {
      const child = lines.children[i] as HTMLElement;
      if (child.classList.contains("log-line") || child.classList.contains("log-group")) {
        count += 1;
      }
    }
    return count;
  }

  function removeOldestEntry() {
    const first = lines.firstElementChild as HTMLElement | null;
    if (!first) return false;
    if (first.classList.contains("log-group")) {
      const key = first.dataset.groupKey;
      if (key) groups.delete(key);
    }
    first.remove();
    return true;
  }

  function pruneIfNeeded() {
    let total = countTopLevelEntries();
    while (total > currentMax && removeOldestEntry()) total--;
  }

  function beginGroup(title: string, opts?: { key?: string; collapsed?: boolean }): string {
    const key = opts?.key || `g-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,6)}`;
    if (groups.has(key)) return key;
    const wrap = document.createElement('div');
    wrap.className = 'log-group';
    wrap.dataset.groupKey = key;
    const header = document.createElement('div');
    header.className = 'log-group-header';
    header.textContent = title;
    const body = document.createElement('div');
    body.className = 'log-group-body';
    wrap.append(header, body);
    lines.appendChild(wrap);
    groups.set(key, { root: wrap as HTMLDivElement, header: header as HTMLDivElement, body: body as HTMLDivElement });
    const setCollapsed = (v: boolean) => { wrap.classList.toggle('is-collapsed', !!v); };
    if (opts?.collapsed) setCollapsed(true);
    header.addEventListener('click', () => setCollapsed(!wrap.classList.contains('is-collapsed')));
    if (autoScroll) scrollToEnd();
    return key;
  }

  function endGroup(key: string) {
    const g = groups.get(key);
    if (!g) return;
    // no specific teardown required
  }

  function toggleGroup(key: string, collapsed?: boolean) {
    const g = groups.get(key);
    if (!g) return;
    if (collapsed == null) g.root.classList.toggle('is-collapsed');
    else g.root.classList.toggle('is-collapsed', !!collapsed);
  }

  const handle = root as LogHandle;
  handle.add = add;
  handle.addMany = addMany;
  handle.clear = clear;
  handle.setMode = setMode;
  handle.setWrap = setWrap;
  handle.setMaxLines = setMaxLines;
  handle.scrollToEnd = scrollToEnd;
  handle.beginGroup = beginGroup;
  handle.endGroup = endGroup;
  handle.toggleGroup = toggleGroup;

  return handle;
}
