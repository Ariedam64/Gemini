/**
 * Bug Report Modal - the New report tab
 *
 * The form, its screenshots and attached data, and what happens on Send. A
 * report that cannot be sent is never lost: the draft stays, and it can be
 * saved to a file, or copied where no file can be saved, to share by hand.
 */

import { element } from "../../../styles/helpers";
import { Button } from "../../Button/Button";
import { Card } from "../../Card/Card";
import {
  BUG_REPORT_PROJECT,
  MGBugReport,
  describeBugReportError,
  descriptionProblem,
  prepareBugReport,
  prepareContext,
  titleProblem,
  type AutoFields,
  type BugReportAttachment,
  type BugReportDraft,
  type BugReportError,
  type BugReportPayload,
  type SubmitProgress,
} from "../../../../modules/bugReport";
import { MGEnvironment } from "../../../../modules/environment";
import { copyText } from "../../../../utils/clipboard";
import { isAfkAppBuild } from "../../../../utils/version";
import { createAttachedData } from "./attachedData";
import { createErrorBox, createNotice, createUpdateButton, howToUpdate } from "./dom";
import { createReportFields, type FormValues } from "./fields";
import { createScreenshots } from "./screenshots";
import { createSentView } from "./sentView";

/** Errors after which the report is worth keeping by hand. */
const SAVE_WORTHY: ReadonlySet<BugReportError["kind"]> = new Set([
  "offline",
  "timeout",
  "server",
  "rate_limited",
  "too_large",
  "bad_response",
]);
const DRAFT_SAVE_DELAY_MS = 600;
const SCREENSHOT_WAIT_MS = 15_000;
const SCREENSHOT_POLL_MS = 100;

export interface ReportFormOptions {
  /** The HUD tabs, offered as the part of Gemini a report is about. */
  areas: readonly string[];
  /** Hides the report window while a tab capture takes its frame. */
  setWindowHidden: (hidden: boolean) => void;
  onShowMyReports: () => void;
  /** The footer buttons changed (the form's or the sent view's). */
  onActionsChange: () => void;
}

export interface ReportFormHandle {
  root: HTMLElement;
  /** The footer buttons of the view shown. */
  actions(): HTMLElement[];
  /** The tab is shown again: a stale game frame is retaken. */
  activate(): void;
  destroy(): void;
}

function toPayload(values: FormValues, auto: AutoFields, attachments: number): BugReportPayload {
  return {
    ...auto,
    contact: values.contact || null,
    category: values.category,
    title: values.title,
    description: values.description,
    steps: values.steps || null,
    expected: values.expected || null,
    actual: values.actual || null,
    frequency: values.frequency,
    withoutMod: values.withoutMod,
    feature: values.feature || null,
    attachmentsExpected: attachments,
  };
}

const toDraft = (values: FormValues): BugReportDraft => ({ ...values });

function progressText(progress: SubmitProgress): string {
  if (progress.stage === "report") return "Sending report...";
  return `Uploading screenshot ${progress.index + 1}/${progress.total}...`;
}

/** Resolves once `ready()` is true, or after `timeoutMs` whatever it says. */
function waitFor(ready: () => boolean, timeoutMs: number): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  return new Promise((resolve) => {
    const check = () => {
      if (ready() || Date.now() >= deadline) resolve();
      else setTimeout(check, SCREENSHOT_POLL_MS);
    };
    check();
  });
}

/** Offers `text` as a file download. */
function downloadText(fileName: string, text: string, host: HTMLElement): void {
  const url = URL.createObjectURL(new Blob([text], { type: "application/json" }));
  const link = element("a", { href: url, download: fileName });
  link.hidden = true;
  host.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1_000);
}

export function createReportForm(options: ReportFormOptions): ReportFormHandle {
  let destroyed = false;
  let saveTimer: ReturnType<typeof setTimeout> | null = null;
  let lastAttempt: { payload: BugReportPayload; attachments: BugReportAttachment[] } | null = null;

  // Focusable, so a click anywhere in the form lets Ctrl+V paste an image here.
  const root = element("div", { className: "bug-report__pane", tabIndex: -1 });
  const form = element("div", { className: "bug-report__stack" });
  const sent = element("div", { className: "bug-report__stack" });
  sent.hidden = true;
  root.append(form, sent);

  const updateNotice = createNotice("warn");
  const draftNotice = createNotice("info");
  const errors = createErrorBox();
  const draft = MGBugReport.draft.read();

  const fields = createReportFields({ areas: options.areas, draft, onChange: onFieldsChange });
  const shots = createScreenshots({ setWindowHidden: options.setWindowHidden });
  const attached = createAttachedData({ onPreview: preview });

  const progress = element("span", { className: "bug-report__progress", role: "status" });
  // The MG AFK app's WebView drops downloads and the Discord activity frame
  // blocks them, so there the report is copied for the player to paste.
  const copyInstead = isAfkAppBuild() || MGEnvironment.isDiscord();
  const saveButton = Button({
    label: copyInstead ? "Copy report" : "Save report to a file",
    onClick: () => void keepReport(),
  });
  saveButton.hidden = true;
  const sendButton = Button({ label: "Send report", variant: "primary", onClick: () => void send() });
  const formActions: HTMLElement[] = [progress, saveButton, sendButton];
  let actions = formActions;

  form.append(
    updateNotice.root,
    draftNotice.root,
    Card({ title: "Your report", subtitle: "In English or your own language, as you prefer." }, fields.root),
    Card({ title: "Screenshots", subtitle: "The game view is added for you. Remove it if it shows something private." }, shots.root),
    Card({ title: "Attached data", subtitle: "Sent with your report, only to the developer." }, attached.root),
    errors.root,
  );

  // Newer release out: a gentle nudge, sending stays possible.
  void MGBugReport.latestVersion().then((status) => {
    if (destroyed || !status.behind || !status.remote) return;
    const update = createUpdateButton();
    updateNotice.show(
      `You have v${status.local ?? "?"} and v${status.remote} is out, the problem may already be fixed. ${howToUpdate()}`,
      ...(update ? [update] : []),
    );
  });

  if (MGBugReport.draft.hasText(draft)) {
    const discard = Button({
      label: "Discard",
      size: "sm",
      onClick: () => {
        cancelDraftSave();
        fields.reset(true);
        MGBugReport.draft.clear();
        draftNotice.hide();
      },
    });
    draftNotice.show("Your unsent report was restored.", discard);
  }

  const onPaste = (event: ClipboardEvent) => shots.handlePaste(event);
  root.addEventListener("paste", onPaste);
  shots.takeAutoGameShot();

  function cancelDraftSave(): void {
    if (saveTimer !== null) clearTimeout(saveTimer);
    saveTimer = null;
  }

  function flushDraft(): void {
    if (saveTimer === null) return;
    cancelDraftSave();
    MGBugReport.draft.save(toDraft(fields.read()));
  }

  function onFieldsChange(): void {
    errors.clear();
    attached.hidePreview();
    cancelDraftSave();
    saveTimer = setTimeout(() => {
      saveTimer = null;
      MGBugReport.draft.save(toDraft(fields.read()));
    }, DRAFT_SAVE_DELAY_MS);
  }

  function setActions(next: HTMLElement[]): void {
    actions = next;
    options.onActionsChange();
  }

  function validate(values: FormValues): boolean {
    fields.markInvalid(null);
    if (titleProblem(values.title)) {
      fields.markInvalid("title", "Give it a short title, 3 to 140 characters.");
      fields.focus("title");
      return false;
    }
    if (descriptionProblem(values.description)) {
      fields.markInvalid("description", "Describe what happened in at least 10 characters.");
      fields.focus("description");
      return false;
    }
    return true;
  }

  async function send(): Promise<void> {
    errors.clear();
    saveButton.hidden = true;
    // What the button keeps is this try's report, never an earlier one.
    lastAttempt = null;
    const values = fields.read();
    if (!validate(values)) return;
    // Saved as sent, not after the typing pause: a page closed before the
    // answer keeps the text that goes with the pending follow token.
    cancelDraftSave();
    MGBugReport.draft.save(toDraft(values));
    sendButton.setLoading(true);
    try {
      if (shots.pending()) {
        progress.textContent = "Preparing screenshots...";
        await waitFor(() => shots.pending() === 0, SCREENSHOT_WAIT_MS);
      }
      progress.textContent = "Sending report...";
      const attachments = shots.attachments();
      const payload = toPayload(values, await MGBugReport.collect(attached.read()), attachments.length);
      lastAttempt = { payload, attachments };
      const result = await MGBugReport.send(payload, attachments, (step) => {
        if (!destroyed) progress.textContent = progressText(step);
      });
      if (result.ok) {
        // Even when the window was closed meanwhile: the report is in, its
        // draft must go, and its follow token with it.
        cancelDraftSave();
        MGBugReport.draft.clear();
        MGBugReport.draft.rememberContact(values.contact);
      }
      if (destroyed) return;
      progress.textContent = "";
      if (!result.ok) {
        errors.show(describeBugReportError(result.error));
        saveButton.hidden = !SAVE_WORTHY.has(result.error.kind);
        return;
      }
      draftNotice.hide();
      const view = createSentView({ result, onMyReports: options.onShowMyReports, onNewReport: startOver });
      sent.replaceChildren(view.root);
      form.hidden = true;
      sent.hidden = false;
      setActions(view.actions);
    } catch (error) {
      if (destroyed) return;
      progress.textContent = "";
      errors.show(`Something went wrong while sending (${error instanceof Error ? error.message : String(error)}).`);
      // Before the report was put together there is nothing to keep.
      saveButton.hidden = !lastAttempt;
    } finally {
      sendButton.setLoading(false);
    }
  }

  function startOver(): void {
    fields.reset(true);
    attached.reset();
    shots.clear();
    errors.clear();
    saveButton.hidden = true;
    lastAttempt = null;
    sent.hidden = true;
    sent.replaceChildren();
    form.hidden = false;
    setActions(formActions);
    shots.takeAutoGameShot();
    root.scrollIntoView({ block: "start" });
  }

  async function preview(): Promise<void> {
    const values = fields.read();
    const attachments = shots.attachments();
    const payload = toPayload(values, await MGBugReport.collect(attached.read()), attachments.length);
    if (destroyed) return;
    const prepared = prepareBugReport(payload);
    // Before the title and description are filled in, the rest is still worth seeing.
    const body = prepared.ok ? prepared.payload : { ...payload, context: prepareContext(payload.context) };
    const note = prepared.ok ? null : `The ${prepared.field} is not filled in yet: it is checked when you send.`;
    attached.showPreview(body, shots.summary(), note);
  }

  /** Saves the last try to a file, or copies it where no file can be saved. */
  async function keepReport(): Promise<void> {
    if (!lastAttempt) return;
    const prepared = prepareBugReport(lastAttempt.payload);
    const report = prepared.ok ? prepared.payload : lastAttempt.payload;
    if (copyInstead) {
      // The text alone: screenshots as base64 would not paste anywhere useful.
      // No prompt to copy by hand either, a whole report does not fit in one.
      const rootNode = root.getRootNode();
      const copied = await copyText(JSON.stringify({ report }, null, 2), {
        injectionRoot: rootNode instanceof ShadowRoot ? rootNode : null,
        disablePromptFallback: true,
      });
      if (destroyed) return;
      progress.textContent = copied.ok
        ? "Copied. You can paste it on Discord, or try sending again later."
        : "The report could not be copied. Your draft is kept, try sending again later.";
      return;
    }
    const stamp = new Date().toISOString().slice(0, 16).replace(/[:T]/g, "-");
    const file = { report, screenshots: lastAttempt.attachments };
    downloadText(`${BUG_REPORT_PROJECT.id}-bug-report-${stamp}.json`, JSON.stringify(file, null, 2), root);
    progress.textContent = "Saved. You can share the file on Discord, or try sending again later.";
  }

  return {
    root,
    actions: () => actions,
    activate() {
      if (!form.hidden) shots.refreshAutoGameShot();
    },
    destroy() {
      destroyed = true;
      flushDraft();
      root.removeEventListener("paste", onPaste);
      fields.destroy();
      shots.destroy();
      attached.destroy();
    },
  };
}
