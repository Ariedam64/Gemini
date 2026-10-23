/**
 * Bug Report Modal - "Report a bug", with New report and My reports
 *
 * Opened from the HUD footer. The reports go to the aries-mod-backend through
 * MGBugReport (src/modules/bugReport); this file lays out the window and
 * switches its tabs. One window at a time: opening it again returns the one
 * already open.
 */

import { element } from "../../styles/helpers";
import { Modal } from "../Modal/Modal";
import { SegmentedControl } from "../SegmentedControl/SegmentedControl";
import { EVENTS } from "../../../utils/storage";
import { bugReportModalCss } from "./bugReportModal.css";
import { createMyReports } from "./parts/myReports";
import { createReportForm } from "./parts/reportForm";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type BugReportTab = "new" | "mine";

export interface BugReportModalOptions {
  /** The HUD tabs, offered as the part of Gemini a report is about. */
  areas?: readonly string[];
  /** Tab shown first (default: New report, the reason the window is opened). */
  initialTab?: BugReportTab;
  /** Callback when the modal is closed */
  onClose?: () => void;
}

export interface BugReportModalHandle {
  /** Root modal element */
  root: HTMLElement;
  /** Close the modal (the draft is kept) */
  close(): void;
  /** Destroy and cleanup */
  destroy(): void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Factory
// ─────────────────────────────────────────────────────────────────────────────

/** Matches the Modal's close animation, after which it can be destroyed. */
const CLOSE_ANIMATION_MS = 250;

let current: BugReportModalHandle | null = null;

export function openBugReportModal(options: BugReportModalOptions = {}): BugReportModalHandle {
  if (current) return current;

  let tab: BugReportTab = options.initialTab ?? "new";
  let cleaned = false;

  const footer = element("div", { className: "bug-report__actions" });

  const form = createReportForm({
    areas: options.areas ?? [],
    setWindowHidden: (hidden) => {
      modal.root.style.visibility = hidden ? "hidden" : "";
    },
    onShowMyReports: () => tabs.select("mine"),
    onActionsChange: renderFooter,
  });
  const mine = createMyReports();

  const tabs = SegmentedControl({
    segments: [
      { id: "new", label: "New report" },
      { id: "mine", label: "My reports" },
    ],
    selected: tab,
    fullWidth: true,
    onChange: (id) => show(id === "mine" ? "mine" : "new"),
  });

  const content = element("div", { className: "bug-report" }, tabs, form.root, mine.root);

  function renderFooter(): void {
    footer.replaceChildren(...(tab === "new" ? form.actions() : mine.actions()));
  }

  /** `opening`: the form just took its game frame, no need for a fresher one. */
  function show(next: BugReportTab, opening = false): void {
    tab = next;
    form.root.hidden = next !== "new";
    if (next === "new") {
      mine.deactivate();
      if (!opening) form.activate();
    } else {
      mine.activate();
    }
    renderFooter();
  }

  const modal = Modal({
    title: "Report a bug",
    subtitle: "Tell the developer what went wrong, and follow the answer in My reports.",
    content,
    footer,
    size: "lg",
    // A stray click next to a long form should not close it.
    closeOnBackdrop: false,
    closeOnEscape: true,
    onClose: cleanup,
  });
  modal.root.classList.add("bug-report-modal");
  const style = element("style");
  style.textContent = bugReportModalCss;
  modal.root.appendChild(style);

  // The HUD takes its shadow root (and this window with it) off the page
  // when it closes: close properly first, so nothing is left listening.
  const hudRoot = modal.root.getRootNode();
  const onHudOpenChange = (event: Event): void => {
    const detail = (event as CustomEvent<{ isOpen?: boolean }>).detail;
    if (detail?.isOpen === false) handle.close();
  };
  hudRoot.addEventListener(EVENTS.HUD_OPEN_CHANGE, onHudOpenChange);

  show(tab, true);

  function cleanup(): void {
    if (cleaned) return;
    cleaned = true;
    hudRoot.removeEventListener(EVENTS.HUD_OPEN_CHANGE, onHudOpenChange);
    form.destroy();
    mine.destroy();
    tabs.destroy();
    setTimeout(() => modal.destroy(), CLOSE_ANIMATION_MS);
    if (current === handle) current = null;
    options.onClose?.();
  }

  const handle: BugReportModalHandle = {
    root: modal.root,
    close() {
      modal.close();
      cleanup();
    },
    destroy() {
      modal.destroy();
      cleanup();
    },
  };
  current = handle;
  return handle;
}
