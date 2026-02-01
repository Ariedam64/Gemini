/**
 * Journal Hints - Tooltip Rendering
 * 
 * Creates and positions hint tooltips matching game's native style
 */

// ─────────────────────────────────────────────────────────────────────────────
// Tooltip Creation
// ─────────────────────────────────────────────────────────────────────────────

let activeTooltip: HTMLElement | null = null;

/**
 * Create a hint tooltip element
 * Matches game's McTooltip styling (Chakra UI tooltip)
 */
export function createHintTooltip(hintText: string): HTMLElement {
    const tooltip = document.createElement('div');
    tooltip.className = 'gemini-journal-hint';
    tooltip.textContent = hintText;
    tooltip.style.cssText = `
    position: fixed;
    background: rgba(45, 35, 28, 0.95);
    color: #FFFEF9;
    font-size: 11px;
    padding: 8px 12px;
    border-radius: 6px;
    max-width: 240px;
    z-index: 10000;
    pointer-events: none;
    box-shadow: 0 4px 12px rgba(0,0,0,0.4);
    line-height: 1.4;
    opacity: 0;
    transform: scale(0.95);
    transition: opacity 0.1s ease, transform 0.1s ease;
    font-family: inherit;
    text-align: center;
  `;
    return tooltip;
}

/**
 * Position tooltip below a target element
 */
function positionTooltip(tooltip: HTMLElement, target: HTMLElement): void {
    const rect = target.getBoundingClientRect();
    const tooltipWidth = 240; // max-width
    const offset = 8;

    // Position ABOVE target, centered
    let left = rect.left + (rect.width / 2) - (tooltipWidth / 2);
    let top = rect.top - 40 - offset; // Default to top

    // Keep within viewport
    if (left < 8) left = 8;
    if (left + tooltipWidth > window.innerWidth - 8) {
        left = window.innerWidth - tooltipWidth - 8;
    }

    // If would go above viewport, show below instead
    if (top < 8) {
        top = rect.bottom + offset;
    }

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
}

/**
 * Show hint tooltip for a target element
 */
export function showHintTooltip(target: HTMLElement, hintText: string): void {
    // Remove any existing tooltip
    hideHintTooltip();

    // Create and position new tooltip
    const tooltip = createHintTooltip(hintText);
    document.body.appendChild(tooltip);
    positionTooltip(tooltip, target);

    // Fade in with scale animation
    requestAnimationFrame(() => {
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'scale(1)';
    });

    activeTooltip = tooltip;
}

/**
 * Hide the active hint tooltip
 */
export function hideHintTooltip(): void {
    if (activeTooltip) {
        activeTooltip.remove();
        activeTooltip = null;
    }
}
