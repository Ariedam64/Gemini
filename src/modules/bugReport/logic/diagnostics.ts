// src/modules/bugReport/logic/diagnostics.ts
// The last console errors and warnings, uncaught errors and a trail of what
// the player did, kept in memory so a bug report can say what went wrong just
// before it was sent. Nothing leaves the browser unless the player sends a
// report with the logs attached.
//
// Installed first thing at startup so the earliest errors are caught. Under
// `@inject-into page` Gemini shares the game's console, so the game's own
// errors land here too, which is often what a diagnosis needs.

import { createLogCapture, type Breadcrumb, type LogEntry } from "../core";
import { state } from "../state";
import { modalNameOf } from "./gameModal";
import { activeModalAtom } from "../../../atoms";
import { isIsolatedContext, pageWindow, sandboxWindow } from "../../../utils/windowContext";

const MAX_LOGS = 200;
const MAX_BREADCRUMBS = 100;

/** Starts the capture. Safe to call more than once. */
export function installDiagnostics(): void {
  if (state.capture) return;
  const capture = createLogCapture({ maxLogs: MAX_LOGS, maxBreadcrumbs: MAX_BREADCRUMBS });
  state.cleanups.push(capture.install(pageWindow));
  // A manager that sandboxes the script gives it a console and events of its
  // own. The capture skips a console it already wraps, and an error heard on
  // both windows (two objects over one DOM window) is recorded once.
  if (isIsolatedContext) state.cleanups.push(capture.install(sandboxWindow));
  state.capture = capture;
}

let trailStarted = false;

/**
 * Notes each game window the player opens or closes. Needs the game's store,
 * so it starts once the atoms are bridged, not at boot.
 */
export async function startGameTrail(): Promise<void> {
  if (trailStarted || !state.capture) return;
  trailStarted = true;
  try {
    const unsubscribe = await activeModalAtom.onChange(
      (modal) => {
        const name = modalNameOf(modal);
        recordBreadcrumb(name ? `game window ${name}` : "game window closed");
      },
      // The game writes a new object on each open and close: only a new name is news.
      (a, b) => modalNameOf(a) === modalNameOf(b),
    );
    state.cleanups.push(unsubscribe);
  } catch {
    // The atom was renamed by a game update: no trail, nothing else lost.
    trailStarted = false;
  }
}

export function stopDiagnostics(): void {
  for (const cleanup of state.cleanups.splice(0).reverse()) {
    try {
      cleanup();
    } catch {
      // Already undone.
    }
  }
  state.capture = null;
  trailStarted = false;
}

/** Notes something worth knowing in a report, e.g. "opened tab-pets". */
export function recordBreadcrumb(message: string): void {
  state.capture?.breadcrumb(message);
}

export function recentLogs(): LogEntry[] {
  return state.capture?.logs() ?? [];
}

export function recentBreadcrumbs(): Breadcrumb[] {
  return state.capture?.breadcrumbs() ?? [];
}
