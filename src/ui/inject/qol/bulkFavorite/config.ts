/**
 * BulkFavorite Configuration Constants
 *
 * Centralized constants for BulkFavorite QOL injection feature.
 * All magic numbers and hardcoded values are defined here for easy maintenance.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Layout & Responsiveness
// ─────────────────────────────────────────────────────────────────────────────

/** Viewport width threshold for mobile vs desktop layout */
export const LAYOUT_BREAKPOINT_MOBILE = 768;

/** Maximum number of buttons per row in mobile layout */
export const MOBILE_MAX_BUTTONS_PER_ROW = 6;

// ─────────────────────────────────────────────────────────────────────────────
// Button Sizing
// ─────────────────────────────────────────────────────────────────────────────

/** Button size (width & height) for desktop layout (px) */
export const BUTTON_SIZE_DESKTOP = 62;

/** Button size (width & height) for mobile layout (px) */
export const BUTTON_SIZE_MOBILE = 50;

/** Sprite scale factor for desktop buttons */
export const SPRITE_SCALE_DESKTOP = 0.5;

/** Sprite scale factor for mobile buttons */
export const SPRITE_SCALE_MOBILE = 0.4;

/** Sprite display size for desktop (px) */
export const SPRITE_SIZE_DESKTOP = 36;

/** Sprite display size for mobile (px) */
export const SPRITE_SIZE_MOBILE = 28;

// ─────────────────────────────────────────────────────────────────────────────
// Spacing & Layout
// ─────────────────────────────────────────────────────────────────────────────

/** Gap between buttons in desktop sidebar (px) */
export const GAP_DESKTOP = 6;

/** Gap between buttons in mobile rows (px) */
export const GAP_MOBILE = 4;

/** Margin between desktop sidebar and inventory modal (px) */
export const SIDEBAR_MARGIN = 8;

/** Desktop sidebar max height offset from window height (px) */
export const SIDEBAR_MAX_HEIGHT_OFFSET = 100;

/** Desktop sidebar minimum height (px) */
export const SIDEBAR_MIN_HEIGHT = 200;

// ─────────────────────────────────────────────────────────────────────────────
// Heart Icon
// ─────────────────────────────────────────────────────────────────────────────

/** Heart icon size (width & height) (px) */
export const HEART_ICON_SIZE = 14;

/** Heart icon offset from button corner (px) */
export const HEART_ICON_OFFSET = 3;

// ─────────────────────────────────────────────────────────────────────────────
// Timing & Delays
// ─────────────────────────────────────────────────────────────────────────────

/** Delay between individual favorite toggle operations (ms) */
export const DELAY_BETWEEN_TOGGLES = 40;

/** Debounce delay for UI re-rendering (ms) */
export const DEBOUNCE_RENDER = 50;

// ─────────────────────────────────────────────────────────────────────────────
// Z-Index
// ─────────────────────────────────────────────────────────────────────────────

/** Z-index for sidebar and mobile rows (below max but above modals) */
export const Z_INDEX = 2147483646;

// ─────────────────────────────────────────────────────────────────────────────
// Element IDs
// ─────────────────────────────────────────────────────────────────────────────

/** ID for desktop sidebar container */
export const SIDEBAR_ID = 'gemini-bulk-favorite-sidebar';

/** ID for mobile top row container */
export const MOBILE_TOP_ROW_ID = 'gemini-bulk-favorite-top-row';

/** ID for mobile bottom row container */
export const MOBILE_BOTTOM_ROW_ID = 'gemini-bulk-favorite-bottom-row';

/** ID for injected styles element */
export const STYLE_ID = 'gemini-qol-bulkFavorite-styles';
