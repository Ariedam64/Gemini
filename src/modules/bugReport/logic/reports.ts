// src/modules/bugReport/logic/reports.ts
// Sending a report, reading back the ones sent from here, answering on one.
// The follow token is stored the moment the backend returns it: it is only
// ever sent once, and without it My reports cannot show the report.

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
import { readSentReports, rememberSentReport } from "./sentStore";

/** Sends the report, then its screenshots one by one, and keeps its follow token. */
export async function sendReport(
  payload: BugReportPayload,
  attachments: readonly BugReportAttachment[],
  onProgress?: (progress: SubmitProgress) => void,
): Promise<SubmitResult> {
  const result = await submitBugReport(bugReportClient, payload, attachments, onProgress);
  if (result.ok) rememberSentReport(sentReportFrom(result.report, payload.title.trim()));
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
