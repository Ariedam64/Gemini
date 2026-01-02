// src/utils/clipboard.ts
import { pageWindow } from "./windowContext";
import { MGEnvironment } from "../modules/environment";

export type CopyMethod =
  | "clipboard-write"
  | "execCommand"
  | "selection"
  | "prompt"
  | "noop";

export interface CopyResult {
  ok: boolean;
  method: CopyMethod;
  hint?: string; // helpful message to show the user
}

export interface CopyOptions {
  /**
   * Node in which we can visually select the text if everything else fails.
   * Ideally the .ro div or equivalent, to display a “Ctrl+C” hint.
   */
  valueNode?: HTMLElement | null;
  /**
   * Root where the temporary textarea should be injected (ShadowRoot, document...).
   * Default: same root as the button/value when possible, otherwise document.
   */
  injectionRoot?: Document | ShadowRoot | null;
  /**
   * Disable the use of window.prompt as a last resort.
   */
  disablePromptFallback?: boolean;
}

/* ───────────────────────── helpers ───────────────────────── */

function inSecureContext(win: Window & typeof globalThis): boolean {
  try { return !!(win.isSecureContext); } catch { return false; }
}

function getSelectionRoot(node?: HTMLElement | null): Document | ShadowRoot {
  const root = node?.getRootNode?.();
  if (root && (root instanceof Document || (root as any).host)) {
    return root as Document | ShadowRoot;
  }
  return document;
}

function isMac(): boolean {
  const plat = (navigator as any).platform || "";
  const ua = navigator.userAgent || "";
  return /Mac|iPhone|iPad|iPod/i.test(plat) || /Mac OS|iOS/i.test(ua);
}

async function hasClipboardPermission(): Promise<boolean> {
  try {
    // @ts-ignore
    const perm = await navigator.permissions?.query?.({ name: "clipboard-write" as any });
    if (!perm) return true; // API not available: still attempt
    return perm.state === "granted" || perm.state === "prompt";
  } catch {
    // Some user agents crash or lie → still attempt
    return true;
  }
}

function mountTempTextarea(text: string, root: Document | ShadowRoot): HTMLTextAreaElement {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "true");
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  ta.style.pointerEvents = "none";
  ta.style.top = "0";
  // ShadowRoot vs Document
  if ((root as any).appendChild) (root as any).appendChild(ta);
  else document.body.appendChild(ta);
  return ta;
}

function selectNodeContents(node: HTMLElement): boolean {
  try {
    const sel = window.getSelection?.();
    if (!sel) return false;
    const range = document.createRange();
    range.selectNodeContents(node);
    sel.removeAllRanges();
    sel.addRange(range);
    return true;
  } catch {
    return false;
  }
}

/* ───────────────────── implementations ───────────────────── */

async function tryClipboardWrite(text: string): Promise<CopyResult> {
  // En Discord iframe la Permissions-Policy bloque souvent clipboard-write.
  // On tente proprement, sinon on degradera.
  if (!("clipboard" in navigator)) return { ok: false, method: "clipboard-write" };
  if (!inSecureContext(pageWindow)) return { ok: false, method: "clipboard-write" };

  if (!(await hasClipboardPermission())) {
    return { ok: false, method: "clipboard-write" };
  }
  try {
    await navigator.clipboard.writeText(text);
    return { ok: true, method: "clipboard-write" };
  } catch {
    return { ok: false, method: "clipboard-write" };
  }
}

function tryExecCommand(text: string, injectionRoot?: Document | ShadowRoot): CopyResult {
  try {
    const root = injectionRoot || getSelectionRoot();
    const ta = mountTempTextarea(text, root);
    ta.focus();
    ta.select();
    ta.setSelectionRange(0, ta.value.length);
    let ok = false;
    try { ok = document.execCommand("copy"); } catch { ok = false; }
    ta.remove();
    return { ok, method: "execCommand" };
  } catch {
    return { ok: false, method: "execCommand" };
  }
}

function trySelectionFlow(text: string, valueNode?: HTMLElement | null): CopyResult {
  if (!valueNode) return { ok: false, method: "selection" };
  // Temporarily replace the content if what is displayed differs from the text to copy
  const original = valueNode.textContent ?? "";
  let replaced = false;
  if (original !== text) {
    try { valueNode.textContent = text; replaced = true; } catch {}
  }
  const ok = selectNodeContents(valueNode);
  // No immediate restore to let the user see the selection
  // Restore on the next tick if we replaced the content
  if (replaced) {
    setTimeout(() => { try { valueNode.textContent = original; } catch {} }, 80);
  }
  const hint = isMac() ? "⌘C pour copier" : "Ctrl+C pour copier";
  return { ok, method: "selection", hint };
}

/* ───────────────────── public API ───────────────────── */

export async function copyText(text: string, opts: CopyOptions = {}): Promise<CopyResult> {
  const trimmed = (text ?? "").toString();
  if (!trimmed.length) return { ok: false, method: "noop" };

  // 1) API moderne
  const r1 = await tryClipboardWrite(trimmed);
  if (r1.ok) return r1;

  // 2) execCommand fallback (still works in many iframes)
  const root = opts.injectionRoot || getSelectionRoot(opts.valueNode || undefined);
  const r2 = tryExecCommand(trimmed, root);
  if (r2.ok) return r2;

  // 3) Visible selection + keyboard hint
  const r3 = trySelectionFlow(trimmed, opts.valueNode || null);
  if (r3.ok) return r3;

  // 4) Last resort: prompt (unless disabled)
  if (!opts.disablePromptFallback) {
    try {
      // eslint-disable-next-line no-alert
      window.prompt(MGEnvironment.isDiscord() ? "Copie manuelle (Discord bloque clipboard):" : "Copie manuelle:", trimmed);
      return { ok: true, method: "prompt" };
    } catch { /* ignore */ }
  }

  return { ok: false, method: "noop" };
}

export async function copyFromNode(node: HTMLElement, opts: Omit<CopyOptions, "valueNode"> = {}): Promise<CopyResult> {
  const text = node?.textContent ?? "";
  return copyText(text, { ...opts, valueNode: node });
}

/**
 * Wire a copy button.
 * - getText: function that returns the text to copy
 * - options.valueNode: node displaying the value (for the selection fallback)
 * - showTip: callback to show a tiny toast/tooltip
 */
export function attachCopyHandler(
  btn: HTMLElement,
  getText: () => string,
  options: CopyOptions & {
    showTip?: (msg: string) => void;
    onResult?: (r: CopyResult) => void;
  } = {}
) {
  const show = (msg: string) => {
    if (options.showTip) { options.showTip(msg); return; }
    // fallback tooltip minimal inline
    try {
      btn.setAttribute("aria-label", msg);
      const tip = document.createElement("div");
      tip.textContent = msg;
      tip.style.position = "absolute";
      tip.style.top = "-28px";
      tip.style.right = "0";
      tip.style.padding = "4px 8px";
      tip.style.borderRadius = "8px";
      tip.style.fontSize = "12px";
      tip.style.background = "color-mix(in oklab, var(--bg) 85%, transparent)";
      tip.style.border = "1px solid var(--border)";
      tip.style.color = "var(--fg)";
      tip.style.pointerEvents = "none";
      tip.style.opacity = "0";
      tip.style.transition = "opacity .12s";
      // ShadowRoot-safe
      const root = getSelectionRoot(btn as any);
      (root as any).appendChild ? (root as any).appendChild(tip) : document.body.appendChild(tip);
      const rect = btn.getBoundingClientRect();
      tip.style.left = `${rect.right - 8}px`;
      tip.style.top = `${rect.top - 28}px`;
      requestAnimationFrame(() => tip.style.opacity = "1");
      setTimeout(() => { tip.style.opacity = "0"; setTimeout(() => tip.remove(), 150); }, 1200);
    } catch { /* ignore */ }
  };

  btn.addEventListener("click", async (e) => {
    e.stopPropagation();
    const text = (getText() ?? "").toString();
    const res = await copyText(text, {
      valueNode: options.valueNode ?? null,
      injectionRoot: options.injectionRoot ?? null,
      disablePromptFallback: options.disablePromptFallback ?? false,
    });

    options.onResult?.(res);

    if (res.ok) {
      if (res.method === "clipboard-write" || res.method === "execCommand" || res.method === "prompt") {
        show("Copié");
      } else if (res.method === "selection") {
        show(res.hint || (isMac() ? "⌘C pour copier" : "Ctrl+C pour copier"));
      }
    } else {
      show("Impossible de copier");
    }
  });
}
