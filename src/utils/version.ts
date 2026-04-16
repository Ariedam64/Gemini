/**
 * Version checking utilities
 *
 * - getLocalVersion(): reads current userscript version from GM_info
 * - fetchRemoteVersion(): fetches latest release from GitHub raw
 * - startVersionChecker(): polls for updates, calls callback on each result
 */

const REMOTE_SCRIPT_URL =
  "https://raw.githubusercontent.com/Ariedam64/Gemini/main/dist/gemini.user.js";

const CHECK_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes

export function getLocalVersion(): string {
  try {
    return GM_info?.script?.version ?? "0.0.0";
  } catch {
    return "0.0.0";
  }
}

/**
 * Fetch the remote @version value from the published userscript header.
 * Returns null on network error or parse failure.
 */
export function fetchRemoteVersion(): Promise<string | null> {
  return new Promise((resolve) => {
    try {
      GM_xmlhttpRequest({
        method: "GET",
        url: REMOTE_SCRIPT_URL,
        timeout: 10000,
        onload(response) {
          try {
            const match = response.responseText.match(/@version\s+([\d.]+)/);
            resolve(match ? match[1] : null);
          } catch {
            resolve(null);
          }
        },
        onerror() {
          resolve(null);
        },
        ontimeout() {
          resolve(null);
        },
      });
    } catch {
      resolve(null);
    }
  });
}

/**
 * Compare two semver-style version strings (e.g. "1.2.3").
 * Returns true if remote is strictly newer than local.
 */
function isNewerVersion(local: string, remote: string): boolean {
  const toNums = (v: string): number[] =>
    v.split(".").map((n) => parseInt(n, 10) || 0);
  const l = toNums(local);
  const r = toNums(remote);
  for (let i = 0; i < Math.max(l.length, r.length); i++) {
    const li = l[i] ?? 0;
    const ri = r[i] ?? 0;
    if (ri > li) return true;
    if (ri < li) return false;
  }
  return false;
}

export interface VersionInfo {
  local: string;
  remote: string | null;
  hasUpdate: boolean;
}

export type VersionCallback = (info: VersionInfo) => void;

/**
 * Start periodic version checking.
 * Fires callback immediately after first remote check, then every CHECK_INTERVAL_MS.
 * Returns a cleanup function that cancels future checks.
 */
export function startVersionChecker(callback: VersionCallback): () => void {
  const local = getLocalVersion();
  let intervalId: ReturnType<typeof setInterval> | null = null;
  let cancelled = false;

  async function check(): Promise<void> {
    if (cancelled) return;
    const remote = await fetchRemoteVersion();
    if (cancelled) return;
    callback({
      local,
      remote,
      hasUpdate: remote !== null && isNewerVersion(local, remote),
    });
  }

  check();
  intervalId = setInterval(check, CHECK_INTERVAL_MS);

  return () => {
    cancelled = true;
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };
}
