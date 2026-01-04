/**
 * BulkFavorite QOL Styles
 *
 * Per ui/ui.inject.md:
 * - Styles MUST be scoped (no global selectors)
 * - Use gemini-qol-* prefix for all classes
 *
 * Design based on QPM's bulk favorite sidebar
 * Mobile: dual horizontal rows (top + bottom of inventory)
 */

import * as CONFIG from './config';

export const bulkFavoriteInjectCss = `
/* Desktop: vertical scrollable list next to inventory */
#${CONFIG.SIDEBAR_ID} {
  display: flex;
  flex-direction: column;
  gap: ${CONFIG.GAP_DESKTOP}px;
  pointer-events: auto;
  padding: 4px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.6);
  z-index: ${CONFIG.Z_INDEX};
  overflow-y: auto;
}

/* Mobile: horizontal scrollable rows */
.gemini-qol-bulkFavorite-row {
  display: flex;
  flex-direction: row;
  gap: ${CONFIG.GAP_MOBILE}px;
  pointer-events: auto;
  padding: 4px;
  position: fixed;
  z-index: ${CONFIG.Z_INDEX};
  overflow-x: auto;
  overflow-y: hidden;
  max-width: 100vw;
}

.gemini-qol-bulkFavorite-row::-webkit-scrollbar {
  height: 3px;
}

.gemini-qol-bulkFavorite-row::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

.gemini-qol-bulkFavorite-row::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

#${CONFIG.SIDEBAR_ID}::-webkit-scrollbar {
  width: 4px;
}

#${CONFIG.SIDEBAR_ID}::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

#${CONFIG.SIDEBAR_ID}::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

/* Individual species button */
.gemini-qol-bulkFavorite-btn {
  position: relative;
  width: ${CONFIG.BUTTON_SIZE_DESKTOP}px;
  height: ${CONFIG.BUTTON_SIZE_DESKTOP}px;
  min-width: ${CONFIG.BUTTON_SIZE_DESKTOP}px;
  background: rgba(0, 0, 0, 0.85);
  border-radius: 6px;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  padding: 4px;
  gap: 2px;
}

/* Mobile: smaller buttons */
.gemini-qol-bulkFavorite-btn.mobile {
  width: ${CONFIG.BUTTON_SIZE_MOBILE}px;
  height: ${CONFIG.BUTTON_SIZE_MOBILE}px;
  min-width: ${CONFIG.BUTTON_SIZE_MOBILE}px;
}

.gemini-qol-bulkFavorite-btn:hover {
  transform: scale(1.08);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.gemini-qol-bulkFavorite-btn:active {
  transform: scale(0.96);
}

/* Sprite image */
.gemini-qol-bulkFavorite-sprite {
  width: ${CONFIG.SPRITE_SIZE_DESKTOP}px;
  height: ${CONFIG.SPRITE_SIZE_DESKTOP}px;
  object-fit: contain;
  image-rendering: pixelated;
}

.gemini-qol-bulkFavorite-btn.mobile .gemini-qol-bulkFavorite-sprite {
  width: ${CONFIG.SPRITE_SIZE_MOBILE}px;
  height: ${CONFIG.SPRITE_SIZE_MOBILE}px;
}

/* Heart indicator */
.gemini-qol-bulkFavorite-heart {
  position: absolute;
  top: ${CONFIG.HEART_ICON_OFFSET}px;
  right: ${CONFIG.HEART_ICON_OFFSET}px;
  width: ${CONFIG.HEART_ICON_SIZE}px;
  height: ${CONFIG.HEART_ICON_SIZE}px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  line-height: 1;
}

.gemini-qol-bulkFavorite-heart.filled {
  color: #ff4d4d;
}

.gemini-qol-bulkFavorite-heart.outline {
  color: #ffffff;
  opacity: 0.85;
}

/* Species label */
.gemini-qol-bulkFavorite-label {
  color: #ffffff;
  font-size: 9px;
  font-weight: 600;
  text-align: center;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.9);
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.1;
}

.gemini-qol-bulkFavorite-btn.mobile .gemini-qol-bulkFavorite-label {
  font-size: 8px;
}

/* Fallback sprite (letter) */
.gemini-qol-bulkFavorite-fallback {
  width: ${CONFIG.SPRITE_SIZE_DESKTOP}px;
  height: ${CONFIG.SPRITE_SIZE_DESKTOP}px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #fff;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 4px;
}

.gemini-qol-bulkFavorite-btn.mobile .gemini-qol-bulkFavorite-fallback {
  width: ${CONFIG.SPRITE_SIZE_MOBILE}px;
  height: ${CONFIG.SPRITE_SIZE_MOBILE}px;
  font-size: 14px;
}
`;
