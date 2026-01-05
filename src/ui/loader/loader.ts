import { element } from "../styles/helpers";

const ICON_URL = "https://i.imgur.com/k5WuC32.png";

type LoaderTone = "info" | "success" | "error";

export interface LoaderController {
  log: (message: string, tone?: LoaderTone) => void;
  logStep: (key: string, message: string, tone?: LoaderTone) => void;
  setSubtitle: (text: string) => void;
  succeed: (message?: string, delayMs?: number) => void;
  fail: (message: string, error?: unknown) => void;
}

interface LoaderOptions {
  title?: string;
  subtitle?: string;
  blurPx?: number;
}

const STYLE_ID = "gemini-loader-style";
const ROOT_ID = "gemini-loader";
const MAX_LOGS = 80;

type StepEntry = { el: HTMLElement; tone: LoaderTone };

function injectStyles(): void {
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    /* ===== Loader Variables ===== */
    #${ROOT_ID} {
      --loader-bg: rgba(10, 12, 18, 0.6);
      --loader-card-bg: rgba(10, 12, 18, 0.82);
      --loader-fg: #e5e7eb;
      --loader-muted: rgba(229, 231, 235, 0.08);
      --loader-soft: rgba(229, 231, 235, 0.05);
      --loader-accent: #60a5fa;
      --loader-border: rgba(148, 163, 184, 0.2);
      --loader-shadow: rgba(0, 0, 0, 0.45);
      --loader-blur: 14px;
      --loader-radius: 18px;
      --loader-pill-from: #6366f1;
      --loader-pill-to: #06b6d4;

      --loader-info: #60a5fa;
      --loader-success: #4ade80;
      --loader-error: #f87171;
    }

    /* ===== Overlay ===== */
    #${ROOT_ID} {
      position: fixed;
      inset: 0;
      z-index: 2147483000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 28px 18px;
      background: var(--loader-bg);
      backdrop-filter: blur(var(--loader-blur));
      -webkit-backdrop-filter: blur(var(--loader-blur));
      color: var(--loader-fg);
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, Inter, sans-serif;
      -webkit-font-smoothing: antialiased;
    }

    /* ===== Card ===== */
    .gemini-loader__card {
      position: relative;
      z-index: 1;
      width: min(480px, 94vw);
      background: var(--loader-card-bg);
      border: 1px solid var(--loader-border);
      border-radius: var(--loader-radius);
      padding: 20px;
      box-shadow: 0 20px 60px var(--loader-shadow);
      backdrop-filter: blur(var(--loader-blur));
      -webkit-backdrop-filter: blur(var(--loader-blur));
    }

    /* ===== Header ===== */
    .gemini-loader__header {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 16px;
    }

    /* ===== Spinner ===== */
    .gemini-loader__spinner {
      position: relative;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: 2px solid var(--loader-muted);
      border-top-color: var(--loader-pill-from);
      border-right-color: var(--loader-pill-to);
      animation: gemini-loader-spin 1s linear infinite;
      box-shadow: 0 0 20px color-mix(in oklab, var(--loader-pill-from) 40%, transparent);
      flex-shrink: 0;
    }

    .gemini-loader__spinner-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 70px;
      height: 70px;
      border-radius: 50%;
      object-fit: cover;
      animation: gemini-loader-spin-reverse 1s linear infinite;
    }

    /* ===== Titles ===== */
    .gemini-loader__titles {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .gemini-loader__title {
      font-size: 17px;
      font-weight: 600;
      color: var(--loader-fg);
    }

    .gemini-loader__subtitle {
      font-size: 13px;
      color: color-mix(in oklab, var(--loader-fg) 70%, transparent);
      line-height: 1.4;
    }

    /* ===== Logs container ===== */
    .gemini-loader__logs {
      background: var(--loader-soft);
      border: 1px solid var(--loader-border);
      border-radius: 12px;
      padding: 10px 12px;
      max-height: 240px;
      overflow: auto;
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-family: ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
      font-size: 12px;
      color: var(--loader-fg);
    }

    .gemini-loader__logs::-webkit-scrollbar {
      width: 8px;
    }
    .gemini-loader__logs::-webkit-scrollbar-thumb {
      background: var(--loader-muted);
      border-radius: 8px;
    }

    /* ===== Log entry ===== */
    .gemini-loader__log {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      line-height: 1.4;
      word-break: break-word;
    }

    .gemini-loader__dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-top: 4px;
      flex-shrink: 0;
      box-shadow: 0 0 8px currentColor;
    }

    .gemini-loader__log.info { color: color-mix(in oklab, var(--loader-info) 85%, var(--loader-fg)); }
    .gemini-loader__log.info .gemini-loader__dot { background: var(--loader-info); color: var(--loader-info); }

    .gemini-loader__log.success { color: color-mix(in oklab, var(--loader-success) 85%, var(--loader-fg)); }
    .gemini-loader__log.success .gemini-loader__dot { background: var(--loader-success); color: var(--loader-success); }

    .gemini-loader__log.error { color: color-mix(in oklab, var(--loader-error) 85%, var(--loader-fg)); }
    .gemini-loader__log.error .gemini-loader__dot { background: var(--loader-error); color: var(--loader-error); }

    /* ===== Actions (error state) ===== */
    .gemini-loader__actions {
      display: none;
      margin-top: 14px;
      justify-content: flex-end;
    }

    #${ROOT_ID}.gemini-loader--error .gemini-loader__actions {
      display: flex;
    }

    .gemini-loader__button {
      appearance: none;
      border: 1px solid color-mix(in oklab, var(--loader-error) 50%, var(--loader-border));
      background: linear-gradient(
        180deg,
        color-mix(in oklab, var(--loader-error) 25%, transparent) 0%,
        color-mix(in oklab, var(--loader-error) 35%, transparent) 100%
      );
      color: var(--loader-fg);
      padding: 8px 14px;
      border-radius: 10px;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
      box-shadow: 0 8px 20px color-mix(in oklab, var(--loader-error) 25%, transparent);
      transition: transform 0.08s ease, box-shadow 0.15s ease, border-color 0.15s ease;
    }

    .gemini-loader__button:hover {
      border-color: var(--loader-error);
      box-shadow: 0 10px 24px color-mix(in oklab, var(--loader-error) 35%, transparent);
    }

    .gemini-loader__button:active {
      transform: scale(0.98);
    }

    /* ===== States ===== */
    #${ROOT_ID}.gemini-loader--closing {
      animation: gemini-loader-fade-out 0.4s ease forwards;
      pointer-events: none;
    }

    #${ROOT_ID}.gemini-loader--error .gemini-loader__spinner {
      animation: none;
      border-color: color-mix(in oklab, var(--loader-error) 30%, var(--loader-muted));
      border-top-color: var(--loader-error);
      border-right-color: var(--loader-error);
      box-shadow: 0 0 20px color-mix(in oklab, var(--loader-error) 40%, transparent);
    }

    /* ===== Animations ===== */
    @keyframes gemini-loader-spin {
      to { transform: rotate(360deg); }
    }

    @keyframes gemini-loader-spin-reverse {
      from { transform: translate(-50%, -50%) rotate(0deg); }
      to { transform: translate(-50%, -50%) rotate(-360deg); }
    }

    @keyframes gemini-loader-fade-out {
      to { opacity: 0; visibility: hidden; }
    }

    /* ===== Responsive ===== */
    @media (max-width: 520px) {
      #${ROOT_ID} { padding: 16px 10px; }
      .gemini-loader__card { padding: 16px; }
      .gemini-loader__header { gap: 12px; }
      .gemini-loader__spinner { width: 42px; height: 42px; }
      .gemini-loader__spinner-icon { width: 56px; height: 56px; }
      .gemini-loader__title { font-size: 16px; }
    }
  `;

  const target = document.head || document.documentElement || document.body;
  if (target) {
    target.appendChild(style);
    return;
  }

  const onReady = () => {
    const readyTarget = document.head || document.documentElement || document.body;
    readyTarget?.appendChild(style);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onReady, { once: true });
  } else {
    setTimeout(onReady, 0);
  }
}

function appendLog(container: HTMLElement, message: string, tone: LoaderTone): void {
  const line = element(
    "div",
    { className: `gemini-loader__log ${tone}` },
    element("div", { className: "gemini-loader__dot" }),
    element("div", { textContent: message })
  );

  container.appendChild(line);
  while (container.childElementCount > MAX_LOGS) {
    container.firstElementChild?.remove();
  }

  container.scrollTop = container.scrollHeight;
}

function fetchIconAsDataUrl(): Promise<string> {
  return new Promise((resolve) => {
    if (typeof GM_xmlhttpRequest === "undefined") {
      resolve(ICON_URL);
      return;
    }

    GM_xmlhttpRequest({
      method: "GET",
      url: ICON_URL,
      responseType: "blob",
      onload: (response) => {
        const blob = response.response as Blob;
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = () => resolve(ICON_URL);
        reader.readAsDataURL(blob);
      },
      onerror: () => resolve(ICON_URL),
    });
  });
}

export function createLoader(options: LoaderOptions = {}): LoaderController {
  const blurPx = Number.isFinite(options.blurPx) ? Math.max(4, Number(options.blurPx)) : 14;
  injectStyles();

  const subtitleEl = element("div", {
    className: "gemini-loader__subtitle",
    textContent: options.subtitle ?? "Initializing the mod...",
  });

  const logsEl = element("div", { className: "gemini-loader__logs" });

  const spinnerIcon = element("img", {
    className: "gemini-loader__spinner-icon",
    alt: "Gemini",
  }) as HTMLImageElement;

  const spinnerEl = element(
    "div",
    { className: "gemini-loader__spinner" },
    spinnerIcon
  );

  // Fetch icon asynchronously
  fetchIconAsDataUrl().then((src) => {
    spinnerIcon.src = src;
  });

  const card = element(
    "div",
    { className: "gemini-loader__card" },
    element(
      "div",
      { className: "gemini-loader__header" },
      spinnerEl,
      element(
        "div",
        { className: "gemini-loader__titles" },
        element("div", { className: "gemini-loader__title", textContent: options.title ?? "Gemini is loading" }),
        subtitleEl
      )
    ),
    logsEl
  );

  const root = element("div", { id: ROOT_ID }, card);
  (document.body || document.documentElement).appendChild(root);

  const actions = element(
    "div",
    { className: "gemini-loader__actions" },
    element("button", {
      className: "gemini-loader__button",
      textContent: "Close loader",
      onclick: () => root.remove(),
    })
  );
  card.appendChild(actions);

  root.style.setProperty("--loader-blur", `${blurPx}px`);

  const setSubtitle = (text: string) => { subtitleEl.textContent = text; };

  const steps = new Map<string, StepEntry>();

  const setTone = (el: HTMLElement, tone: LoaderTone) => {
    el.className = `gemini-loader__log ${tone}`;
  };

  const logStep = (key: string, message: string, tone: LoaderTone = "info") => {
    const k = String(key || "").trim();
    if (!k) {
      appendLog(logsEl, message, tone);
      return;
    }

    const existing = steps.get(k);
    if (existing) {
      existing.el.lastElementChild && (existing.el.lastElementChild.textContent = message);
      if (existing.tone !== tone) {
        setTone(existing.el, tone);
        existing.tone = tone;
      }
      return;
    }

    const line = element(
      "div",
      { className: `gemini-loader__log ${tone}` },
      element("div", { className: "gemini-loader__dot" }),
      element("div", { textContent: message })
    );
    steps.set(k, { el: line, tone });
    logsEl.appendChild(line);
    while (logsEl.childElementCount > MAX_LOGS) {
      const first = logsEl.firstElementChild;
      if (!first) break;
      const foundKey = Array.from(steps.entries()).find(([, entry]) => entry.el === first)?.[0];
      if (foundKey) steps.delete(foundKey);
      first.remove();
    }
    logsEl.scrollTop = logsEl.scrollHeight;
  };

  const succeed = (message?: string, delayMs = 600) => {
    if (message) appendLog(logsEl, message, "success");
    root.classList.add("gemini-loader--closing");
    setTimeout(() => root.remove(), delayMs);
  };

  const fail = (message: string, error?: unknown) => {
    appendLog(logsEl, message, "error");
    setSubtitle("Something went wrong. Check the console for details.");
    root.classList.add("gemini-loader--error");
    console.error("[Gemini loader]", message, error);
  };

  const log = (message: string, tone: LoaderTone = "info") => appendLog(logsEl, message, tone);

  return { log, logStep, setSubtitle, succeed, fail };
}
