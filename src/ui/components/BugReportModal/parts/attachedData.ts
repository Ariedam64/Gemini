/**
 * Bug Report Modal - "Attached data"
 *
 * What goes with the report besides the player's words, each part with its
 * own switch and a sentence saying what it is. Technical info always goes,
 * and says so. The preview shows the exact body before anything is sent.
 */

import { element } from "../../../styles/helpers";
import { Button } from "../../Button/Button";
import { Switch, type SwitchHandle } from "../../Switch/Switch";
import type { AttachedData } from "../../../../modules/bugReport";
import { formatKb } from "./dom";
import type { ScreenshotSummary } from "./screenshots";

export interface AttachedDataOptions {
  /** Builds the body that would be sent now and shows it with `showPreview`. */
  onPreview: () => Promise<void>;
}

export interface AttachedDataHandle {
  root: HTMLElement;
  read(): AttachedData;
  reset(): void;
  showPreview(body: unknown, screenshots: ScreenshotSummary[], note: string | null): void;
  hidePreview(): void;
  destroy(): void;
}

function switchRow(label: string, description: string, control: SwitchHandle): HTMLElement {
  const text = element(
    "div",
    { className: "bug-report__switch-text" },
    element("span", { className: "bug-report__label" }, label),
    element("p", { className: "bug-report__hint" }, description),
  );
  return element("div", { className: "bug-report__switch-row" }, text, control.root);
}

function screenshotsLine(screenshots: ScreenshotSummary[]): string {
  if (!screenshots.length) return "No screenshot.";
  const list = screenshots.map((shot) => `${shot.kind} ${shot.width} x ${shot.height}, ${formatKb(shot.bytes)}`).join("; ");
  return `Then ${screenshots.length} screenshot${screenshots.length > 1 ? "s" : ""}, one request each: ${list}.`;
}

export function createAttachedData(options: AttachedDataOptions): AttachedDataHandle {
  // A switch changed: the preview no longer shows what would be sent.
  const onSwitch = () => handle.hidePreview();
  const logs = Switch({ checked: true, onChange: onSwitch });
  const settings = Switch({ checked: true, onChange: onSwitch });
  const accountState = Switch({ checked: true, onChange: onSwitch });
  const technical = Switch({ checked: true, disabled: true });
  technical.button.title = "Always included";

  const preview = element("div", { className: "bug-report__stack" });
  preview.hidden = true;

  let previewOpen = false;
  const previewButton = Button({
    label: "Preview what will be sent",
    size: "sm",
    onClick: async () => {
      if (previewOpen) {
        handle.hidePreview();
        return;
      }
      previewButton.setLoading(true);
      try {
        await options.onPreview();
      } finally {
        previewButton.setLoading(false);
      }
    },
  });

  const root = element(
    "div",
    { className: "bug-report__stack" },
    switchRow(
      "Recent console errors",
      "The last errors and warnings in this tab, and which tabs and game windows you opened just before.",
      logs,
    ),
    switchRow("Gemini settings", "Which features are switched on. Never your rules, sounds or other saved data.", settings),
    switchRow(
      "Account state",
      "Lets the developer see the garden and inventory Arie's Mod or the MG AFK app already sync, as they are when you send this. Nothing if you use neither.",
      accountState,
    ),
    switchRow(
      "Technical info",
      "Gemini and game versions, browser and screen size, room and player count. Always included.",
      technical,
    ),
    element("div", { className: "bug-report__actions" }, previewButton),
    preview,
  );

  const handle: AttachedDataHandle = {
    root,
    read: () => ({ logs: logs.isChecked(), settings: settings.isChecked(), accountState: accountState.isChecked() }),
    reset() {
      for (const control of [logs, settings, accountState]) control.setChecked(true, true);
      handle.hidePreview();
    },
    showPreview(body, screenshots, note) {
      const json = element("pre", { className: "bug-report__json" });
      // textContent, never markup: the player's text shows as typed.
      json.textContent = JSON.stringify(body, null, 2);
      preview.replaceChildren(
        element(
          "p",
          { className: "bug-report__note" },
          "This is the report exactly as it goes to the server, with anything that looks like a password or a key already hidden.",
        ),
        ...(note ? [element("p", { className: "bug-report__hint" }, note)] : []),
        json,
        element("p", { className: "bug-report__hint" }, screenshotsLine(screenshots)),
      );
      preview.hidden = false;
      previewOpen = true;
      previewButton.setLabel("Hide the preview");
    },
    hidePreview() {
      preview.hidden = true;
      preview.replaceChildren();
      previewOpen = false;
      previewButton.setLabel("Preview what will be sent");
    },
    destroy() {
      for (const control of [logs, settings, accountState, technical]) control.destroy();
    },
  };
  return handle;
}
