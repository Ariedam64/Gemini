export const TABS = [
  { id: 'players', label: 'Players' },
  { id: 'diagnostics', label: 'Diagnostics' },
];

export function renderTabs(activeTab) {
  return `
    <div class="mgat-tabs">
      ${TABS.map((t) => {
        const active = t.id === activeTab ? 'active' : '';
        return `<button class="mgat-tab ${active}" data-action="set-tab" data-tab="${t.id}">${t.label}</button>`;
      }).join('')}
    </div>
  `;
}

