/**
 * Bug Report Modal - small DOM pieces shared by the parts
 *
 * Player text (their own report, the developer's replies) is only ever put
 * in the page as text nodes, never as markup.
 */

import { element } from "../../../styles/helpers";
import { Button, type ButtonHandle } from "../../Button/Button";
import { blockGameKeysWhileFocused } from "../../Input/Input";
import { isAfkAppBuild, openReleasesPage } from "../../../../utils/version";

export interface TextAreaOptions {
  placeholder: string;
  maxLength: number;
  rows: number;
  short?: boolean;
}

export interface TextAreaHandle {
  root: HTMLTextAreaElement;
  destroy(): void;
}

/** A textarea the game does not hear typing into. */
export function createTextArea(options: TextAreaOptions): TextAreaHandle {
  const root = element("textarea", {
    className: options.short ? "bug-report__textarea bug-report__textarea--short" : "bug-report__textarea",
  });
  root.placeholder = options.placeholder;
  root.maxLength = options.maxLength;
  root.rows = options.rows;
  const unregister = blockGameKeysWhileFocused(root);
  return { root, destroy: unregister };
}

export interface NoticeHandle {
  root: HTMLDivElement;
  show(text: string, ...actions: HTMLElement[]): void;
  hide(): void;
}

/** A banner with a sentence and optional buttons, hidden until `show`. */
export function createNotice(tone: "warn" | "info"): NoticeHandle {
  const root = element("div", {
    className: tone === "info" ? "bug-report__notice bug-report__notice--info" : "bug-report__notice",
    role: "status",
  });
  root.hidden = true;
  return {
    root,
    show(text, ...actions) {
      root.replaceChildren(element("span", null, text), ...actions);
      root.hidden = false;
    },
    hide() {
      root.hidden = true;
    },
  };
}

export interface ErrorBoxHandle {
  root: HTMLDivElement;
  show(text: string): void;
  clear(): void;
}

export function createErrorBox(): ErrorBoxHandle {
  const root = element("div", { className: "bug-report__error", role: "alert" });
  root.hidden = true;
  return {
    root,
    show(text) {
      root.textContent = text;
      root.hidden = false;
    },
    clear() {
      root.textContent = "";
      root.hidden = true;
    },
  };
}

/** A local date and time, or "" for a missing or broken date. */
export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (!iso || Number.isNaN(date.getTime())) return "";
  try {
    return date.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
  } catch {
    return date.toLocaleString();
  }
}

/** Kilobytes, at least 1. */
export function formatKb(bytes: number): string {
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

/**
 * The way to the latest release: a button to the releases page, or null in
 * the MG AFK app, which fetches it itself when the game is opened again.
 */
export function createUpdateButton(): ButtonHandle | null {
  if (isAfkAppBuild()) return null;
  return Button({ label: "Update", size: "sm", onClick: openReleasesPage });
}

/** How to get a newer build, as a sentence that ends a notice. */
export function howToUpdate(): string {
  return isAfkAppBuild() ? "Close the game and open it again from the MG AFK app to get it." : "Update to get it.";
}
