/**
 * StatRow Component Styles
 * Per .claude/rules/ui/ui.components.md: style file exports componentNameCss
 */

export const statRowCss = `
  /* Stat Row */
  .gemini-stat-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 6px 8px;
    border-radius: 8px;
    transition: background 0.2s ease;
    min-height: fit-content;
  }

  .gemini-stat-row:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  .gemini-stat-row__left {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
    min-width: 0;
  }

  .gemini-stat-row__label {
    color: var(--item-label, #F5F5F5);
    font-weight: 500;
    font-size: 14px;
    line-height: 1.3;
  }

  .gemini-stat-row__desc {
    color: var(--item-desc, rgba(255, 255, 255, 0.6));
    font-size: 14px;
    line-height: 1.3;
    word-break: break-word;
  }

  .gemini-stat-row__value {
    color: var(--item-value, #FFF27D);
    font-weight: 700;
    font-size: 16px;
    text-align: right;
    min-width: 60px;
    flex-shrink: 0;
  }

  /* Section Title */
  .gemini-section-title {
    color: var(--fg);
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 8px;
  }

  /* Group Title */
  .gemini-group-title {
    color: var(--fg);
    font-weight: 700;
    font-size: 16px;
    margin-bottom: 4px;
  }
`;
