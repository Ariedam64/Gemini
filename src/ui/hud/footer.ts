/**
 * HUD Footer - version info + update notification + bug report
 *
 * Normal state:   Gemini · v1.0.1 · Report a bug
 * Update state:   Gemini · v1.0.1 → v1.0.2   [Update ↗] · Report a bug
 */

import { getLocalVersion, openReleasesPage, RELEASES_PAGE_URL, type VersionInfo } from "../../utils/version";

export interface HudFooterOptions {
  /** Opens the bug report window. Without it, the footer has no report button. */
  onReportBug?: () => void;
}

export interface HudFooterHandle {
  root: HTMLDivElement;
  update(info: VersionInfo): void;
  destroy(): void;
}

export function createHudFooter(options: HudFooterOptions = {}): HudFooterHandle {
  const root = document.createElement("div");
  root.className = "gemini-footer";

  const label = document.createElement("span");
  label.className = "gemini-footer__label";
  label.textContent = "Gemini";

  const sep = document.createElement("span");
  sep.className = "gemini-footer__sep";
  sep.textContent = "·";

  const versionSpan = document.createElement("span");
  versionSpan.className = "gemini-footer__version";
  versionSpan.textContent = `v${getLocalVersion()}`;

  const updateBtn = document.createElement("a");
  updateBtn.className = "gemini-footer__update-btn";
  updateBtn.textContent = "Update ↗";
  updateBtn.href = RELEASES_PAGE_URL;
  updateBtn.target = "_blank";
  updateBtn.rel = "noopener noreferrer";
  updateBtn.style.display = "none";
  updateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openReleasesPage();
  });

  root.append(label, sep, versionSpan, updateBtn);

  const { onReportBug } = options;
  let reportBtn: HTMLButtonElement | null = null;
  const handleReportClick = (e: MouseEvent): void => {
    e.preventDefault();
    onReportBug?.();
  };
  if (onReportBug) {
    const reportSep = document.createElement("span");
    reportSep.className = "gemini-footer__sep";
    reportSep.textContent = "·";

    reportBtn = document.createElement("button");
    reportBtn.type = "button";
    reportBtn.className = "gemini-footer__report-btn";
    reportBtn.textContent = "Report a bug";
    reportBtn.title = "Tell the developer about a problem, and follow the answer";
    reportBtn.addEventListener("click", handleReportClick);

    root.append(reportSep, reportBtn);
  }

  function update(info: VersionInfo): void {
    if (info.hasUpdate && info.remote) {
      versionSpan.textContent = `v${info.local} → v${info.remote}`;
      updateBtn.style.display = "inline-flex";
      root.classList.add("gemini-footer--has-update");
    } else {
      versionSpan.textContent = `v${info.local}`;
      updateBtn.style.display = "none";
      root.classList.remove("gemini-footer--has-update");
    }
  }

  return {
    root,
    update,
    destroy() {
      reportBtn?.removeEventListener("click", handleReportClick);
      root.remove();
    },
  };
}
