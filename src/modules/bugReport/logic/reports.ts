// src/modules/bugReport/logic/reports.ts
// Sending a report, reading back the ones sent from here, answering on one.
// The follow token is made and saved before the first try, and goes with
// every retry of the same report: it is also the backend's idempotency key,
// so a retry after a lost answer gets back the report the first try created.
// Once a try goes through it joins the sent reports, since without it My
// reports cannot show the report.

import {
  addReportComment,
  listMyReports,
  sentReportFrom,
  submitBugReport,
  type BugReportAttachment,
  type BugReportError,
  type BugReportPayload,
  type FollowedReport,
  type MyBugReport,
  type SubmitProgress,
  type SubmitResult,
} from "../core";
import { bugReportClient } from "./transport";
import { forgetPendingReport, pendingReport } from "./draft";
import { readSentReports, rememberSentReport } from "./sentStore";

/**
 * Sends the report, then its screenshots one by one, and keeps its follow
 * token. A try that fails leaves the pending token for the next one: a report
 * an earlier try did create comes back (`resumed`), and only the screenshots
 * the server does not hold yet are sent.
 */
export async function sendReport(
  payload: BugReportPayload,
  attachments: readonly BugReportAttachment[],
  onProgress?: (progress: SubmitProgress) => void,
): Promise<SubmitResult> {
  const pending = pendingReport();
  const result = await submitBugReport(bugReportClient, payload, attachments, onProgress, pending);
  if (result.ok) {
    rememberSentReport(sentReportFrom(result.report, payload.title.trim()));
    forgetPendingReport(pending.followToken);
  }
  return result;
}

/** The status of every report sent from this browser. A report the backend no longer knows is missing. */
export function listSentReports(): Promise<
  { ok: true; reports: MyBugReport[] } | { ok: false; error: BugReportError }
> {
  return listMyReports(bugReportClient, readSentReports());
}

export function replyToReport(
  report: FollowedReport,
  message: string,
): Promise<{ ok: true } | { ok: false; error: BugReportError }> {
  return addReportComment(bugReportClient, report, message);
}
