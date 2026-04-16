/**
 * HUD Footer - version info + update notification
 *
 * Normal state:   v1.0.1
 * Update state:   v1.0.1 → v1.0.2   [Update ↗]
 */

import { getLocalVersion, type VersionInfo } from "../../utils/version";

const UPDATE_URL = "https://github.com/Ariedam64/Gemini/releases/latest";

export interface HudFooterHandle {
  root: HTMLDivElement;
  update(info: VersionInfo): void;
  destroy(): void;
}

export function createHudFooter(): HudFooterHandle {
  const root = document.createElement("div");
  root.className = "gemini-footer";

  const versionSpan = document.createElement("span");
  versionSpan.className = "gemini-footer__version";
  versionSpan.textContent = `v${getLocalVersion()}`;

  const updateBtn = document.createElement("a");
  updateBtn.className = "gemini-footer__update-btn";
  updateBtn.textContent = "Update ↗";
  updateBtn.href = UPDATE_URL;
  updateBtn.target = "_blank";
  updateBtn.rel = "noopener noreferrer";
  updateBtn.style.display = "none";
  updateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    try {
      GM_openInTab(UPDATE_URL, { active: true });
    } catch {
      window.open(UPDATE_URL, "_blank");
    }
  });

  root.append(versionSpan, updateBtn);

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
      root.remove();
    },
  };
}
