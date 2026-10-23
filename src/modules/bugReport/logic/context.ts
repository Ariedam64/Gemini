// src/modules/bugReport/logic/context.ts
// Everything a report carries that the player does not type: which build of
// Gemini and of the game, where it runs, who sends it, what the session
// looked like. Each read is bounded in time, so a game that is not fully
// loaded (the very case worth reporting) still lets the report go out with
// what is known.

import { isVersionBelow, type BugReportContext } from "../core";
import { state } from "../state";
import { BUG_REPORT_PROJECT, type AttachedData, type AutoFields, type ModVersionStatus } from "../types";
import { recentBreadcrumbs, recentLogs } from "./diagnostics";
import { modalNameOf } from "./gameModal";
import { readReportedSettings } from "./settings";
import { activeModalAtom } from "../../../atoms";
import { getPlayers } from "../../../globals";
import { WSState, getAccountId } from "../../../state";
import { MGEnvironment } from "../../environment";
import { MGPixi } from "../../pixi";
import { MGVersion } from "../../version";
import { fetchRemoteVersion, getLocalVersion } from "../../../utils/version";

const READ_TIMEOUT_MS = 2_500;
/** What getLocalVersion answers without GM_info: not a real build. */
const UNKNOWN_VERSION = "0.0.0";

/** `promise`, or `fallback` once `ms` have passed or when it fails. */
function within<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve(fallback), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      () => {
        clearTimeout(timer);
        resolve(fallback);
      },
    );
  });
}

function localVersion(): string | null {
  const version = getLocalVersion();
  return version && version !== UNKNOWN_VERSION ? version : null;
}

/**
 * The installed build against the latest release. A successful answer is
 * kept for the session; a failed one is asked again next time.
 */
export function latestVersion(): Promise<ModVersionStatus> {
  if (!state.latest) {
    const local = localVersion();
    const pending: Promise<ModVersionStatus> = within(fetchRemoteVersion(), READ_TIMEOUT_MS, null).then((remote) => {
      if (!remote && state.latest === pending) state.latest = null;
      return { local, remote, behind: isVersionBelow(local, remote) };
    });
    state.latest = pending;
  }
  return state.latest;
}

function scriptHandler(): string | null {
  try {
    if (typeof GM_info === "undefined") return null;
    return [GM_info.scriptHandler, GM_info.version].filter(Boolean).join(" ") || null;
  } catch {
    return null;
  }
}

function environment(): BugReportContext["environment"] {
  const base = {
    userAgent: navigator.userAgent,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    dpr: window.devicePixelRatio || 1,
    scriptHandler: scriptHandler(),
    language: navigator.language,
    uptimeSec: Math.round(performance.now() / 1000),
  };
  try {
    const env = MGEnvironment.detect();
    return {
      surface: env.surface,
      host: env.host,
      platform: env.platform,
      os: env.os,
      browser: env.browser,
      inIframe: env.isInIframe,
      screen: `${env.screenWidth}x${env.screenHeight}`,
      ...base,
    };
  } catch {
    return { host: location.host, ...base };
  }
}

/** The player's account id and name, from the players global or straight from the room. */
function myIdentity(): { id: string | null; name: string | null } {
  try {
    const me = getPlayers().get().myPlayer;
    if (me?.discordId) return { id: me.discordId, name: me.name || null };
  } catch {
    // Globals not up yet: the room state below still knows.
  }
  try {
    const myId = WSState.getMyPlayerId();
    const raw = WSState.getRoomState()?.players?.find((player) => player?.id === myId) ?? null;
    return { id: raw ? getAccountId(raw) : null, name: raw?.name || null };
  } catch {
    return { id: null, name: null };
  }
}

function roomInfo(): { roomId: string | null; playersInRoom: number | null } {
  try {
    const room = WSState.getRoomState();
    const players = room?.players;
    return {
      roomId: room?.roomId || null,
      playersInRoom: Array.isArray(players) ? players.filter(Boolean).length : null,
    };
  } catch {
    return { roomId: null, playersInRoom: null };
  }
}

function gameVersion(): string | null {
  try {
    return MGVersion.get();
  } catch {
    return null;
  }
}

export async function collectAutoFields(attached: AttachedData): Promise<AutoFields> {
  const [version, activeModal] = await Promise.all([
    latestVersion(),
    within<unknown>(activeModalAtom.get(), READ_TIMEOUT_MS, null),
  ]);
  const me = myIdentity();

  const context: BugReportContext = {
    environment: environment(),
    mod: { latestVersion: version.remote, behind: version.behind },
    game: {
      ...roomInfo(),
      activeModal: modalNameOf(activeModal),
      // Health signals: a game connection Gemini never followed or a renderer
      // it never found explains a whole class of "nothing works" reports.
      roomStateReady: WSState.isReady(),
      rendererReady: MGPixi.isReady(),
    },
  };
  if (attached.settings) context.settings = readReportedSettings();
  if (attached.logs) {
    context.logs = recentLogs();
    context.breadcrumbs = recentBreadcrumbs();
  }

  return {
    project: BUG_REPORT_PROJECT.id,
    modName: BUG_REPORT_PROJECT.name,
    modVersion: version.local,
    gameVersion: gameVersion(),
    playerId: me.id,
    playerName: me.name,
    includeAccountState: attached.accountState,
    context,
  };
}
