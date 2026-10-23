// src/modules/bugReport/index.ts
// MGBugReport - In-mod bug reports, sent to the aries-mod-backend
//
// The protocol lives in ./core, copied as it is from Arie's Mod
// (src/lib/bugReport): do not edit it here, change it there and copy it again.
// This module adds what is Gemini's own: the transport, the console capture
// started at boot, the context read from the game, the game frame, and the
// storage of drafts and sent reports.

import { isReady } from "./state";
import { installDiagnostics, recordBreadcrumb, startGameTrail, stopDiagnostics } from "./logic/diagnostics";
import { collectAutoFields, latestVersion } from "./logic/context";
import { grabGameFrame } from "./logic/frameGrab";
import { listSentReports, replyToReport, sendReport } from "./logic/reports";
import { onSentReportsChange, readSentReports } from "./logic/sentStore";
import { clearDraft, draftHasText, readDraft, rememberContact, saveDraft } from "./logic/draft";

export { BUG_REPORT_PROJECT, DRAFT_FIELDS } from "./types";
export type { AttachedData, AutoFields, BugReportDraft, DraftField, ModVersionStatus } from "./types";

// The core's pure helpers and types the report window needs.
export {
  BUG_REPORT_LIMITS,
  ImageNormalizeError,
  acceptsComments,
  canCaptureScreen,
  captureScreenFrame,
  describeBugReportError,
  descriptionProblem,
  isVersionBelow,
  normalizeImage,
  normalizedImageBlob,
  prepareBugReport,
  prepareContext,
  statusLabel,
  titleProblem,
} from "./core";
export type {
  AttachmentKind,
  BugReportAttachment,
  BugReportCategory,
  BugReportError,
  BugReportFrequency,
  BugReportPayload,
  BugReportWithoutMod,
  FollowedReport,
  ImageSource,
  MyBugReport,
  NormalizedImage,
  SentReport,
  SubmitProgress,
  SubmitResult,
} from "./core";

export const MGBugReport = {
  /** Starts keeping console errors and breadcrumbs in memory. Call first thing at boot. */
  init: installDiagnostics,
  isReady,
  /** Stops the capture and every watcher. */
  destroy: stopDiagnostics,

  /** Notes each game window opened or closed. Needs the atoms bridge, so it starts after it. */
  watchGame: startGameTrail,
  /** Notes something worth knowing in the next report, e.g. "opened tab-pets". */
  breadcrumb: recordBreadcrumb,

  /** Versions, player, room, environment, and the logs and settings the player agreed to attach. */
  collect: collectAutoFields,
  /** The installed build against the latest release. */
  latestVersion,
  /** The game's current frame on a canvas, or null. Never throws. */
  grabGameFrame,

  send: sendReport,
  listSent: listSentReports,
  reply: replyToReport,
  sentReports: readSentReports,
  onSentReportsChange,

  draft: {
    read: readDraft,
    save: saveDraft,
    clear: clearDraft,
    hasText: draftHasText,
    rememberContact,
  },
};
