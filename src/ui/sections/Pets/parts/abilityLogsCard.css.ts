/**
 * Ability Logs Card Styles
 */

export const abilityLogsCardCss = `
  .ability-logs-container {
    /* Container styles are inline in AbilityLogsCard.ts */
  }

  /* Pet sprite container alignment */
  .ability-logs-container .lg-td {
    vertical-align: middle;
  }

  /* Ensure proper spacing in table cells */
  .ability-logs-container .lg-table {
    border-spacing: 0;
  }

  .ability-logs-container .lg-tr {
    border-bottom: 1px solid var(--border);
  }

  .ability-logs-container .lg-tr:last-child {
    border-bottom: none;
  }

  /* Hover effect for rows */
  .ability-logs-container .lg-tr:hover {
    background: color-mix(in oklab, var(--fg) 3%, transparent);
  }
`;
