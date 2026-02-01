/**
 * AbilitiesInject - UI Rendering
 *
 * Creates ability stamps matching game's variant stamp structure EXACTLY
 * Based on game source: SpeciesPageEntry.tsx + JournalStamp.tsx
 */

import type { AbilityProgress } from './data';
import { getAbilityName, getAbilityLogDate } from './data';
import { MGSprite } from '../../../../modules';
import { MGData } from '../../../../modules/data';
import { getCachedBaseUrl } from '../../../../modules/assets/state';

// ─────────────────────────────────────────────────────────────────────────────
// Date Formatting
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Format date to match game's format (e.g., "Oct 8, 2025")
 */
function formatLogDate(timestamp: number): string {
  const date = new Date(timestamp);
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Ability Color Lookup (inlined from Badge component to avoid cross-layer import)
// ─────────────────────────────────────────────────────────────────────────────

interface AbilityColorInfo {
  bg: string;
  hover: string;
}

/**
 * Get ability badge color from MGData abilities dex.
 * Falls back to neutral gray if ability has no color defined.
 */
function getAbilityColor(abilityId: string): AbilityColorInfo {
  const abilities = MGData.get('abilities') as Record<string, { name?: string; color?: AbilityColorInfo }> | null;
  const ability = abilities?.[abilityId];
  return {
    bg: ability?.color?.bg || 'rgba(100, 100, 100, 0.9)',
    hover: ability?.color?.hover || 'rgba(150, 150, 150, 1)',
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Stamp Rendering (Matching Game's Variant Stamps EXACTLY)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Create an ability stamp entry matching game's SpeciesPageEntry structure
 *
 * Uses UI sprite "JournalStamp" with pet sprite on top
 * Colored ability badges for logged abilities, "???" for unknown
 */
function createAbilityStampEntry(
  speciesId: string,
  abilityId: string,
  isLogged: boolean,
  isSmallScreen: boolean
): HTMLElement {
  // Get log date for tooltip (matching JournalStamp.tsx)
  const logDate = isLogged ? getAbilityLogDate(speciesId, abilityId) : undefined;

  // Outer container matching McGrid templateRows="1fr auto"
  // IMPORTANT: Use custom class to avoid MutationObserver triggers
  const entry = document.createElement('div');
  entry.className = 'gemini-ability-entry';
  entry.style.cssText = `
    display: grid;
    grid-template-rows: 1fr auto;
    gap: 8px;
    align-items: center;
    justify-items: center;
  `;

  // Stamp container (matching EXACT game implementation - JournalStamp.tsx line 57-65)
  const stampSize = isSmallScreen ? '80px' : '100px';
  const stamp = document.createElement('div');
  stamp.className = 'gemini-ability-stamp';

  // Add custom instant tooltip to stamp (not native title which has delay)
  if (logDate) {
    const tooltipText = `Logged on ${formatLogDate(logDate)}`;
    stamp.style.cursor = 'help';

    // Create custom tooltip element
    let tooltip: HTMLElement | null = null;

    stamp.addEventListener('mouseenter', () => {
      tooltip = document.createElement('div');
      tooltip.textContent = tooltipText;
      tooltip.style.cssText = `
        position: fixed;
        background: rgba(45, 35, 28, 0.95);
        color: #FFFEF9;
        font-size: 11px;
        padding: 8px 12px;
        border-radius: 6px;
        z-index: 10000;
        pointer-events: none;
        box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        white-space: nowrap;
        transform: scale(0.95);
        opacity: 0;
        transition: opacity 0.1s ease, transform 0.1s ease;
      `;
      document.body.appendChild(tooltip);

      // Position ABOVE stamp (not below)
      const rect = stamp.getBoundingClientRect();
      const tooltipHeight = tooltip.offsetHeight;
      const tooltipWidth = tooltip.offsetWidth;

      let left = rect.left + rect.width / 2 - tooltipWidth / 2;
      let top = rect.top - tooltipHeight - 8;

      // Viewport bounds: if would go above viewport, fall back to below
      if (top < 8) {
        top = rect.bottom + 8;
      }
      // Keep within horizontal bounds
      if (left < 8) left = 8;
      if (left + tooltipWidth > window.innerWidth - 8) {
        left = window.innerWidth - tooltipWidth - 8;
      }

      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;

      // Animate in
      requestAnimationFrame(() => {
        if (tooltip) {
          tooltip.style.opacity = '1';
          tooltip.style.transform = 'scale(1)';
        }
      });
    });

    stamp.addEventListener('mouseleave', () => {
      if (tooltip) {
        tooltip.remove();
        tooltip = null;
      }
    });
  }

  // CRITICAL: Use Stamp.webp as background image (NOT the sprite version)
  // This matches the game exactly and avoids the "?" issue
  const baseUrl = getCachedBaseUrl();
  if (!baseUrl) {
    console.error('[AbilitiesInject] Base URL not available - modules may not be initialized');
  }

  stamp.style.cssText = `
    position: relative;
    width: ${stampSize};
    height: ${stampSize};
    display: flex;
    align-items: center;
    justify-content: center;
    ${baseUrl ? `background-image: url(${baseUrl}ui/Stamp.webp);` : ''}
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  `;

  // Add pet sprite using EXACT game implementation (JournalStamp.tsx)
  try {
    // CRITICAL: Game uses canvasScale = 0.7 for pets (see JournalStamp.tsx line 45)
    const canvas = MGSprite.toCanvas('pet', speciesId, {
      scale: 0.7,  // EXACT match to game's canvasScale for ItemType.Pet
      boundsMode: 'padded'  // Prevents squishing
    });

    if (canvas) {
      // Game uses: width/height = `${totalScale * 100}%` of container
      // For scale 0.7: canvas is 70% of stamp size
      const canvasSize = isSmallScreen ? '56px' : '70px';  // 80*0.7=56, 100*0.7=70

      // Center the sprite (game uses flexbox centering)
      canvas.style.position = 'absolute';
      canvas.style.top = '50%';
      canvas.style.left = '50%';
      canvas.style.transform = 'translate(-50%, -50%)';
      canvas.style.width = canvasSize;
      canvas.style.height = canvasSize;
      canvas.style.objectFit = 'contain';
      canvas.style.imageRendering = 'pixelated';
      canvas.style.zIndex = '1';

      // Apply unknown styling if not logged (EXACT match to game)
      // Game uses ColorOverlayFilter(color: 0x2a2a2a, alpha: 0.9)
      // CSS equivalent: brightness(0.16) = 42/255 for rgb(42,42,42)
      if (!isLogged) {
        canvas.style.filter = 'grayscale(1) brightness(0.16)';
      }

      stamp.appendChild(canvas);
    } else {
      const fallback = document.createElement('div');
      fallback.textContent = '🐾';
      fallback.style.fontSize = '32px';
      fallback.style.position = 'absolute';
      fallback.style.top = '50%';
      fallback.style.left = '50%';
      fallback.style.transform = 'translate(-50%, -50%)';
      fallback.style.zIndex = '1';
      stamp.appendChild(fallback);
    }
  } catch (error) {
    console.warn('[AbilitiesInject] Failed to load pet sprite:', speciesId, error);
    const fallback = document.createElement('div');
    fallback.textContent = '🐾';
    fallback.style.fontSize = '32px';
    fallback.style.position = 'absolute';
    fallback.style.top = '50%';
    fallback.style.left = '50%';
    fallback.style.transform = 'translate(-50%, -50%)';
    fallback.style.zIndex = '1';
    stamp.appendChild(fallback);
  }

  // Badge - matching EXACT game implementation (SpeciesPageEntry.tsx line 116-131)
  if (isLogged) {
    // Logged ability - colored badge (inline, matching Badge component's ability variant)
    const abilityName = getAbilityName(abilityId);
    const colors = getAbilityColor(abilityId);

    const badge = document.createElement('div');
    badge.className = 'gemini-ability-badge';
    badge.textContent = abilityName;
    badge.style.cssText = `
      background: ${colors.bg};
      color: white;
      padding: 4px;
      border-radius: 10px;
      min-width: ${isSmallScreen ? '80px' : '90px'};
      width: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${isSmallScreen ? '12px' : '14px'};
      font-weight: bold;
      text-align: center;
    `;

    entry.appendChild(stamp);
    entry.appendChild(badge);
  } else {
    // Unknown ability - Brown.Dark badge with "???" (EXACT game match)
    const badge = document.createElement('div');
    badge.className = 'gemini-ability-badge';
    badge.style.cssText = `
      background: #553014;
      padding: 4px;
      border-radius: 10px;
      min-width: ${isSmallScreen ? '80px' : '90px'};
      width: auto;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    const badgeText = document.createElement('span');
    badgeText.style.cssText = `
      font-size: ${isSmallScreen ? '12px' : '14px'};
      color: #FFFEF9;
      text-align: center;
      font-weight: normal;
      width: 100%;
    `;
    badgeText.textContent = '???';

    badge.appendChild(badgeText);
    entry.appendChild(stamp);
    entry.appendChild(badge);
  }

  return entry;
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Rendering
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Create ability stamp entries to append directly to variant grid
 * Returns array of stamp entries that match game's structure
 */
export function createAbilityStampEntries(
  progress: AbilityProgress,
  speciesId: string,
  isSmallScreen: boolean
): HTMLElement[] {
  // Combine logged and missing abilities in sorted order
  const allAbilityIds = [...progress.logged, ...progress.missing];

  // Create stamp entries for all abilities
  return allAbilityIds.map((abilityId) => {
    const isLogged = progress.logged.includes(abilityId);
    return createAbilityStampEntry(speciesId, abilityId, isLogged, isSmallScreen);
  });
}
