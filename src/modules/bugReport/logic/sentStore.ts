// src/modules/bugReport/logic/sentStore.ts
// The reports sent from this browser, newest first, at most 50, each with
// the follow token that reads its status back. The backend only keeps the
// token's hash, so a token lost here cannot be recovered.

import { addSentReport, parseSentReports, type SentReport } from "../core";
import { state } from "../state";
import { MODULE_KEYS, storageGet, storageSet } from "../../../utils/storage";

export function readSentReports(): SentReport[] {
  return parseSentReports(storageGet<unknown>(MODULE_KEYS.BUG_REPORT_SENT, []));
}

export function rememberSentReport(entry: SentReport): void {
  storageSet(MODULE_KEYS.BUG_REPORT_SENT, addSentReport(readSentReports(), entry));
  for (const listener of state.sentListeners) {
    try {
      listener();
    } catch (error) {
      console.error("[BugReport] Sent report listener failed:", error);
    }
  }
}

/** Fires after a report is added, so My reports can fetch its status. Returns the unsubscribe. */
export function onSentReportsChange(listener: () => void): () => void {
  state.sentListeners.add(listener);
  return () => state.sentListeners.delete(listener);
}
