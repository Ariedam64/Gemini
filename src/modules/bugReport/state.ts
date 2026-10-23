// src/modules/bugReport/state.ts
// Runtime state of the bug report module

import type { LogCapture } from "./core";
import type { ModVersionStatus } from "./types";

interface BugReportState {
  /** Console errors, uncaught errors and breadcrumbs, kept from `init` on. */
  capture: LogCapture | null;
  /** Undoes the console wrap, the error listeners and the breadcrumb watchers. */
  cleanups: (() => void)[];
  /** The latest release, asked once per session. */
  latest: Promise<ModVersionStatus> | null;
  /** Called after a report was sent, so My reports fetches its status. */
  sentListeners: Set<() => void>;
}

export const state: BugReportState = {
  capture: null,
  cleanups: [],
  latest: null,
  sentListeners: new Set(),
};

export function isReady(): boolean {
  return state.capture !== null;
}
