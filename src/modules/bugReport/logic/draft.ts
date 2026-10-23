// src/modules/bugReport/logic/draft.ts
// The text of a report not sent yet, saved as the player types so closing the
// window or reloading the page does not lose it, and cleared once the report
// is sent. The contact is kept apart and offered again on the next report.

import { DRAFT_FIELDS, type BugReportDraft } from "../types";
import { MODULE_KEYS, storageGet, storageRemove, storageSet } from "../../../utils/storage";

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
  if (draftHasText(draft)) storageSet(MODULE_KEYS.BUG_REPORT_DRAFT, draft);
  else storageRemove(MODULE_KEYS.BUG_REPORT_DRAFT);
}

export function clearDraft(): void {
  storageRemove(MODULE_KEYS.BUG_REPORT_DRAFT);
}

export function rememberContact(contact: string | null): void {
  const value = contact?.trim();
  if (value) storageSet(MODULE_KEYS.BUG_REPORT_CONTACT, value);
  else storageRemove(MODULE_KEYS.BUG_REPORT_CONTACT);
}
