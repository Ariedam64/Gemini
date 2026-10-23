// src/modules/bugReport/logic/draft.ts
// The text of a report not sent yet, saved as the player types so closing the
// window or reloading the page does not lose it, and cleared once the report
// is sent. The contact is kept apart and offered again on the next report.
//
// Next to it, the follow token of the report being sent: made on the first
// try and kept until one goes through, so a retry after a timeout, even after
// reopening the window or reloading the page, gets back the report the first
// try created instead of a duplicate refusal that loses its follow-up.

import { pendingBugReport, type PendingBugReport } from "../core";
import { DRAFT_FIELDS, type BugReportDraft } from "../types";
import { MODULE_KEYS, storageGet, storageHas, storageRemove, storageSet } from "../../../utils/storage";

/** The saved draft, keeping only known fields that hold text. */
export function readDraft(): BugReportDraft {
  const raw = storageGet<unknown>(MODULE_KEYS.BUG_REPORT_DRAFT, null);
  const draft: BugReportDraft = {};
  if (raw && typeof raw === "object") {
    const record = raw as Record<string, unknown>;
    for (const field of DRAFT_FIELDS) {
      const value = record[field];
      if (typeof value === "string" && value) draft[field] = value;
    }
  }
  if (!draft.contact) {
    const contact = storageGet<unknown>(MODULE_KEYS.BUG_REPORT_CONTACT, null);
    if (typeof contact === "string" && contact) draft.contact = contact;
  }
  return draft;
}

/** True when the draft holds something the player wrote, not just choices left at their default. */
export function draftHasText(draft: BugReportDraft): boolean {
  return !!(
    draft.title?.trim() ||
    draft.description?.trim() ||
    draft.steps?.trim() ||
    draft.expected?.trim() ||
    draft.actual?.trim()
  );
}

export function saveDraft(draft: BugReportDraft): void {
  if (draftHasText(draft)) {
    storageSet(MODULE_KEYS.BUG_REPORT_DRAFT, draft);
    return;
  }
  storageRemove(MODULE_KEYS.BUG_REPORT_DRAFT);
  // A form emptied by hand is a new report to come: it must not inherit the token.
  forgetPendingReport();
}

/** Forgets the draft and its pending token: once the report is sent, or when the player discards it. */
export function clearDraft(): void {
  storageRemove(MODULE_KEYS.BUG_REPORT_DRAFT);
  forgetPendingReport();
}

/**
 * The report about to be sent: the pending one from an earlier try, or a new
 * one whose token is saved before anything goes out, so a try that never
 * answers still leaves it behind for the retry.
 */
export function pendingReport(): PendingBugReport {
  const saved = storageGet<unknown>(MODULE_KEYS.BUG_REPORT_PENDING_TOKEN, null);
  const pending = pendingBugReport(saved);
  if (pending.followToken !== saved) {
    if (pending.followToken) storageSet(MODULE_KEYS.BUG_REPORT_PENDING_TOKEN, pending.followToken);
    else storageRemove(MODULE_KEYS.BUG_REPORT_PENDING_TOKEN);
  }
  return pending;
}

/**
 * Forgets the pending token. With `followToken`, only when it is still that
 * one: a try that ends late must not take the token of a newer report.
 */
export function forgetPendingReport(followToken?: string | null): void {
  if (!storageHas(MODULE_KEYS.BUG_REPORT_PENDING_TOKEN)) return;
  if (followToken !== undefined && storageGet<unknown>(MODULE_KEYS.BUG_REPORT_PENDING_TOKEN, null) !== followToken) return;
  storageRemove(MODULE_KEYS.BUG_REPORT_PENDING_TOKEN);
}

export function rememberContact(contact: string | null): void {
  const value = contact?.trim();
  if (value) storageSet(MODULE_KEYS.BUG_REPORT_CONTACT, value);
  else storageRemove(MODULE_KEYS.BUG_REPORT_CONTACT);
}
