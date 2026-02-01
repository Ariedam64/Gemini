/**
 * AbilitiesInject - Shadow DOM Styles
 *
 * Styles matching game's journal aesthetic (clipboard, brown tones, shrikhand font)
 * All styles are scoped to Shadow DOM to prevent conflicts
 */

import { JOURNAL_COLORS, TYPOGRAPHY, LAYOUT, BREAKPOINTS } from './constants';

export const abilitiesStyles = `
  /* ─────────────────────────────────────────────────────────────────────── */
  /* Container */
  /* ─────────────────────────────────────────────────────────────────────── */

  .abilities-container {
    padding: ${LAYOUT.sectionPadding};
    margin-top: ${LAYOUT.sectionMarginTop};
    font-family: ${TYPOGRAPHY.bodyFont};
  }

  /* ─────────────────────────────────────────────────────────────────────── */
  /* Header */
  /* ─────────────────────────────────────────────────────────────────────── */

  .abilities-header {
    font-size: ${TYPOGRAPHY.headerSize};
    font-weight: bold;
    font-family: ${TYPOGRAPHY.headerFont};
    color: ${JOURNAL_COLORS.headerText};
    text-align: center;
    line-height: 1;
    text-transform: uppercase;
    margin-bottom: ${LAYOUT.dividerMargin};
  }

  /* ─────────────────────────────────────────────────────────────────────── */
  /* Divider */
  /* ─────────────────────────────────────────────────────────────────────── */

  .abilities-divider {
    min-height: ${LAYOUT.dividerHeight};
    height: ${LAYOUT.dividerHeight};
    background: ${JOURNAL_COLORS.divider};
    border-radius: ${LAYOUT.dividerRadius};
    opacity: ${LAYOUT.dividerOpacity};
    margin: ${LAYOUT.dividerMargin};
  }

  /* ─────────────────────────────────────────────────────────────────────── */
  /* Count */
  /* ─────────────────────────────────────────────────────────────────────── */

  .abilities-count {
    font-weight: bold;
    font-size: ${TYPOGRAPHY.countSize};
    color: ${JOURNAL_COLORS.bodyText};
    text-align: center;
    margin-bottom: 12px;
  }

  /* ─────────────────────────────────────────────────────────────────────── */
  /* Grid */
  /* ─────────────────────────────────────────────────────────────────────── */

  .abilities-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(${LAYOUT.gridMinColumnWidth}, 1fr));
    gap: ${LAYOUT.gridGap};
  }

  @media (min-width: ${BREAKPOINTS.md}px) {
    .abilities-grid {
      grid-template-columns: repeat(auto-fit, minmax(${LAYOUT.gridMinColumnWidthMd}, 1fr));
    }
  }

  /* ─────────────────────────────────────────────────────────────────────── */
  /* Ability Stamps */
  /* ─────────────────────────────────────────────────────────────────────── */

  .ability-stamp {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${LAYOUT.stampGap};
    padding: ${LAYOUT.stampPadding};
    border: ${LAYOUT.stampBorderWidth} solid ${JOURNAL_COLORS.stampBorder};
    border-radius: ${LAYOUT.stampBorderRadius};
    background: ${JOURNAL_COLORS.stampBackground};
    transition: transform ${LAYOUT.transitionDuration}, box-shadow ${LAYOUT.transitionDuration};
    cursor: default;
    min-height: 80px;
  }

  .ability-stamp:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  /* Logged ability stamp */
  .ability-stamp.logged {
    background: ${JOURNAL_COLORS.stampBackgroundLogged};
    border-color: ${JOURNAL_COLORS.loggedBorder};
  }

  /* Missing ability stamp */
  .ability-stamp.missing {
    filter: grayscale(1);
    opacity: 0.6;
  }

  /* ─────────────────────────────────────────────────────────────────────── */
  /* Ability Name */
  /* ─────────────────────────────────────────────────────────────────────── */

  .ability-name {
    font-size: ${TYPOGRAPHY.abilityNameSize};
    font-weight: 600;
    color: ${JOURNAL_COLORS.bodyText};
    text-align: center;
    word-break: break-word;
    line-height: 1.2;
  }

  .ability-stamp.logged .ability-name {
    color: ${JOURNAL_COLORS.loggedCheckmark};
  }

  .ability-stamp.missing .ability-name {
    color: ${JOURNAL_COLORS.missingQuestion};
  }

  /* ─────────────────────────────────────────────────────────────────────── */
  /* Icons (Checkmark & Question) */
  /* ─────────────────────────────────────────────────────────────────────── */

  .ability-icon {
    font-size: ${TYPOGRAPHY.iconSize};
    line-height: 1;
    font-weight: bold;
  }

  .ability-checkmark {
    composes: ability-icon;
    color: ${JOURNAL_COLORS.loggedCheckmark};
  }

  .ability-question {
    composes: ability-icon;
    color: ${JOURNAL_COLORS.missingQuestion};
  }

  /* ─────────────────────────────────────────────────────────────────────── */
  /* Utility Classes */
  /* ─────────────────────────────────────────────────────────────────────── */

  .text-center {
    text-align: center;
  }

  .hidden {
    display: none !important;
  }
`;
