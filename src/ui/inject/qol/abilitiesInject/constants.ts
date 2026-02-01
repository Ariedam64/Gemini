/**
 * AbilitiesInject - Constants
 *
 * Visual constants matching game's journal aesthetic
 */

// ─────────────────────────────────────────────────────────────────────────────
// Color Palette (Extracted from Game's Journal)
// ─────────────────────────────────────────────────────────────────────────────

export const JOURNAL_COLORS = {
  // Text colors
  headerText: '#4F6981',              // Species name, section headers
  bodyText: '#8B7355',                // Stats, counts (Brown.Light approximation)

  // Dividers and borders
  divider: '#D4B5A0',                 // Separator lines (Brown.Pastel approximation)
  stampBorder: 'rgba(85, 48, 20, 0.15)',

  // Scrollbar
  scrollbar: 'rgba(85, 48, 20, 0.2)',
  scrollbarHover: 'rgba(110, 60, 24, 0.3)',

  // Stamp backgrounds
  stampBackground: '#f5f5f5',         // Uncollected stamp bg
  stampBackgroundLogged: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)', // Logged ability

  // Logged ability colors
  loggedBorder: '#4caf50',
  loggedCheckmark: '#2e7d32',

  // Missing ability colors
  missingQuestion: 'rgba(85, 48, 20, 0.3)',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Typography
// ─────────────────────────────────────────────────────────────────────────────

export const TYPOGRAPHY = {
  headerFont: "'shrikhand', cursive",
  bodyFont: "inherit", // Use game's default font
  headerSize: "clamp(14px, 4vw, 20px)",
  countSize: "clamp(10px, 2vw, 11px)",
  abilityNameSize: "clamp(9px, 2vw, 12px)",
  iconSize: "24px",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Layout & Spacing
// ─────────────────────────────────────────────────────────────────────────────

export const LAYOUT = {
  // Section spacing
  sectionPadding: "16px 0",
  sectionMarginTop: "12px",

  // Divider
  dividerHeight: "4px",
  dividerMargin: "8px 0",
  dividerRadius: "9999px",
  dividerOpacity: "0.5",

  // Grid
  gridGap: "16px",
  gridMinColumnWidth: "80px",
  gridMinColumnWidthMd: "130px",

  // Stamps
  stampPadding: "12px 8px",
  stampBorderWidth: "2px",
  stampBorderRadius: "8px",
  stampGap: "8px",

  // Transitions
  transitionDuration: "0.2s",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Responsive Breakpoints (Match Game)
// ─────────────────────────────────────────────────────────────────────────────

export const BREAKPOINTS = {
  sm: 480,  // isSmallScreen in game
  md: 768,
  lg: 1024,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// DOM Selectors
// ─────────────────────────────────────────────────────────────────────────────

export const SELECTORS = {
  // Modal container
  modalContainer: '.modal-container, [class*="modal"]',

  // Journal-specific selectors (we'll need to find these via inspection)
  journalHeader: 'h1, h2, h3',
  gardenJournalTitle: 'GARDEN JOURNAL',

  // Grid patterns (to find variant stamps grid)
  gridContainer: '[class*="grid"], [style*="grid"]',

  // Shadow host ID
  shadowHostId: 'gemini-abilities-section',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Labels & Text
// ─────────────────────────────────────────────────────────────────────────────

export const LABELS = {
  sectionHeader: 'ABILITIES',
  learnedCount: (logged: number, total: number) => `Learned ${logged}/${total}`,
  unknownAbility: '???',
  checkmark: '✓',
  question: '?',
} as const;
