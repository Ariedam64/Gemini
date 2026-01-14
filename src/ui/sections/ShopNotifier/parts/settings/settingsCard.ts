/**
 * Settings Card - Shop Notifier configuration
 */

export interface SettingsCardPart {
  root: HTMLElement;
}

export function createSettingsCard(): SettingsCardPart {
  const root = document.createElement("div");
  root.className = "settings-card";
  root.innerHTML = `
    <div class="settings-card__header">
      <h3>Settings</h3>
    </div>
    <div class="settings-card__content">
      <!-- Settings controls will be rendered here -->
    </div>
  `;

  return {
    root,
  };
}
