/**
 * Bug Report Modal - the My reports tab
 *
 * The reports sent from this browser, with their status, the version that
 * fixes them, the developer's reply and the conversation, where the player
 * can answer. Read with the follow tokens kept at sending time, so it works
 * without any account.
 */

import { element } from "../../../styles/helpers";
import { Badge, type BadgeType } from "../../Badge/Badge";
import { Button } from "../../Button/Button";
import {
  BUG_REPORT_LIMITS,
  MGBugReport,
  acceptsComments,
  describeBugReportError,
  isVersionBelow,
  statusLabel,
  type FollowedReport,
  type MyBugReport,
  type SentReport,
} from "../../../../modules/bugReport";
import { getLocalVersion } from "../../../../utils/version";
import { createErrorBox, createTextArea, createUpdateButton, formatDate, howToUpdate, type TextAreaHandle } from "./dom";

/** Not more often than this unless asked, or a new report was sent. */
const MIN_REFRESH_MS = 30_000;
const AUTO_REFRESH_MS = 5 * 60_000;

export interface MyReportsHandle {
  root: HTMLElement;
  actions(): HTMLElement[];
  /** The tab is shown: fetch the statuses if they are old, and keep them fresh while it stays. */
  activate(): void;
  /** The tab is hidden: stop refreshing. */
  deactivate(): void;
  destroy(): void;
}

interface Row {
  id: number;
  local: SentReport;
  remote: MyBugReport | null;
}

function badgeTypeOf(status: string): BadgeType {
  if (status === "fixed") return "success";
  if (status === "needs_info") return "warning";
  return acceptsComments(status) ? "info" : "neutral";
}

function badge(label: string, type: BadgeType = "neutral"): HTMLElement {
  return Badge({ label, type, tone: "soft", size: "sm", pill: true }).root;
}

function commentBubble(author: "admin" | "reporter", message: string, createdAt: string): HTMLElement {
  const when = formatDate(createdAt);
  const who = element(
    "span",
    { className: "bug-report__comment-who" },
    `${author === "admin" ? "Developer" : "You"}${when ? `, ${when}` : ""}`,
  );
  // Text nodes only: neither side's message is ever read as markup.
  return element(
    "div",
    { className: `bug-report__comment bug-report__comment--${author}` },
    who,
    document.createTextNode(message),
  );
}

function emptyState(): HTMLElement {
  return element(
    "div",
    { className: "bug-report__empty" },
    element("div", { className: "bug-report__empty-title" }, "No reports yet"),
    element(
      "div",
      null,
      "Reports you send from the New report tab show up here. Each one is read: you will see its status change as it is looked at, any question or reply from the developer, and the version that fixes it.",
    ),
  );
}

function localVersion(): string | null {
  const version = getLocalVersion();
  return version === "0.0.0" ? null : version;
}

function fixLine(version: string): HTMLElement {
  const local = localVersion();
  if (!isVersionBelow(local, version)) {
    const text = local ? `Fixed in v${version}, which you already have.` : `Fixed in v${version}.`;
    return element("div", { className: "bug-report__fix" }, text);
  }
  const update = createUpdateButton();
  const line = element("div", { className: "bug-report__fix is-update" }, element("span", null, `Fixed in v${version}. ${howToUpdate()}`));
  if (update) line.appendChild(update);
  return line;
}

export function createMyReports(): MyReportsHandle {
  let remote = new Map<number, MyBugReport>();
  let fetched = false;
  /** The last fetch failed: statuses shown are from before, or unknown. */
  let failed = false;
  let stale = true;
  let lastFetch = 0;
  let inFlight: Promise<void> | null = null;
  let timer: ReturnType<typeof setInterval> | null = null;
  let destroyed = false;
  /** Replies being typed, kept across refreshes. */
  const replyDrafts = new Map<number, string>();
  /** Textareas of the list shown, released on each render. */
  let replyAreas: TextAreaHandle[] = [];

  const errors = createErrorBox();
  const list = element("div", { className: "bug-report__list" });
  const root = element(
    "div",
    { className: "bug-report__pane" },
    element("p", { className: "bug-report__note" }, "Reports sent from this browser, with their status and any reply."),
    errors.root,
    list,
  );
  root.hidden = true;

  const refreshButton = Button({ label: "Refresh", onClick: () => void refresh(true) });
  const stopWatchingSent = MGBugReport.onSentReportsChange(() => {
    stale = true;
  });

  function refresh(force: boolean): Promise<void> {
    if (inFlight) return inFlight;
    const local = MGBugReport.sentReports();
    // A reply being typed is not swept away by a refresh it did not ask for.
    const rootNode = root.getRootNode();
    const active = rootNode instanceof ShadowRoot ? rootNode.activeElement : document.activeElement;
    const typing = !!active && list.contains(active) && active.tagName === "TEXTAREA";
    if (!force && (typing || (!stale && Date.now() - lastFetch < MIN_REFRESH_MS))) {
      if (!typing) render(local);
      return Promise.resolve();
    }
    render(local);
    // Gemini has no API key, so a report not kept here cannot be asked about.
    if (!local.length) return Promise.resolve();

    refreshButton.setLoading(true);
    inFlight = (async () => {
      const result = await MGBugReport.listSent();
      if (destroyed) return;
      lastFetch = Date.now();
      stale = false;
      if (result.ok) {
        remote = new Map(result.reports.map((report) => [report.id, report]));
        fetched = true;
        failed = false;
        errors.clear();
      } else {
        failed = true;
        errors.show(`Could not load the latest status. ${describeBugReportError(result.error)}`);
      }
      render(MGBugReport.sentReports());
    })().finally(() => {
      inFlight = null;
      refreshButton.setLoading(false);
    });
    return inFlight;
  }

  function render(local: SentReport[]): void {
    for (const area of replyAreas) area.destroy();
    replyAreas = [];
    if (!local.length) {
      list.replaceChildren(emptyState());
      return;
    }
    const rows: Row[] = local.map((entry) => ({ id: entry.id, local: entry, remote: remote.get(entry.id) ?? null }));
    list.replaceChildren(...rows.map(reportCard));
  }

  function reportCard(row: Row): HTMLElement {
    const { local, remote: report } = row;
    const head = element(
      "div",
      { className: "bug-report__report-head" },
      element("div", { className: "bug-report__report-title" }, report?.title || local.title || "Untitled report"),
      badge(report?.ref ?? local.ref),
    );
    // Missing from an answer that came after it was sent: the server no longer has it.
    const gone = !report && fetched && Date.parse(local.createdAt) <= lastFetch;
    if (report) head.append(badge(statusLabel(report.status, report.statusLabel), badgeTypeOf(report.status)));
    else head.append(badge(gone ? "Not found" : failed ? "Status unavailable" : "Checking..."));
    const card = element("div", { className: "bug-report__report" }, head);

    const sentAt = formatDate(report?.createdAt || local.createdAt);
    const version = report?.modVersion ? ` with v${report.modVersion}` : "";
    if (sentAt || version) card.appendChild(element("div", { className: "bug-report__meta" }, `Sent ${sentAt}${version}`.trim()));

    if (!report) {
      if (gone) {
        card.appendChild(element("p", { className: "bug-report__hint" }, "The server does not know this report any more. It may have been removed."));
      }
      return card;
    }

    if (report.fixedInVersion) card.appendChild(fixLine(report.fixedInVersion));
    if (report.status === "needs_info") {
      card.appendChild(
        element(
          "div",
          { className: "bug-report__notice" },
          element("span", null, "The developer needs a little more information. Please answer below."),
        ),
      );
    }

    const thread = element("div", { className: "bug-report__thread" });
    const reply = report.publicReply?.trim();
    // A published reply is also added to the comments; show it alone only when it is not there.
    if (reply && !report.comments.some((comment) => comment.author === "admin" && comment.message.trim() === reply)) {
      thread.appendChild(commentBubble("admin", reply, report.publicReplyAt ?? ""));
    }
    for (const comment of report.comments) thread.appendChild(commentBubble(comment.author, comment.message, comment.createdAt));
    if (thread.childElementCount) card.appendChild(thread);

    if (report.canComment && acceptsComments(report.status)) {
      card.appendChild(replyBox({ id: local.id, followToken: local.followToken }));
    }
    return card;
  }

  function replyBox(report: FollowedReport): HTMLElement {
    const area = createTextArea({
      placeholder: "Add a detail or answer a question",
      maxLength: BUG_REPORT_LIMITS.commentMessage,
      rows: 2,
      short: true,
    });
    replyAreas.push(area);
    area.root.value = replyDrafts.get(report.id) ?? "";
    area.root.addEventListener("input", () => replyDrafts.set(report.id, area.root.value));
    const status = element("span", { className: "bug-report__progress", role: "status" });
    const sendReply = Button({
      label: "Send reply",
      size: "sm",
      variant: "primary",
      onClick: async () => {
        if (!area.root.value.trim()) {
          status.textContent = "Write something first.";
          return;
        }
        status.textContent = "Sending...";
        sendReply.setLoading(true);
        const result = await MGBugReport.reply(report, area.root.value);
        sendReply.setLoading(false);
        if (destroyed) return;
        if (!result.ok) {
          status.textContent = describeBugReportError(result.error);
          return;
        }
        replyDrafts.delete(report.id);
        area.root.value = "";
        status.textContent = "";
        await refresh(true);
      },
    });
    return element(
      "div",
      { className: "bug-report__reply" },
      area.root,
      element("div", { className: "bug-report__actions" }, status, sendReply),
    );
  }

  function stopTimer(): void {
    if (timer !== null) clearInterval(timer);
    timer = null;
  }

  return {
    root,
    actions: () => [refreshButton],
    activate() {
      root.hidden = false;
      void refresh(false);
      stopTimer();
      timer = setInterval(() => void refresh(false), AUTO_REFRESH_MS);
    },
    deactivate() {
      root.hidden = true;
      stopTimer();
    },
    destroy() {
      destroyed = true;
      stopTimer();
      stopWatchingSent();
      for (const area of replyAreas) area.destroy();
      replyAreas = [];
    },
  };
}
