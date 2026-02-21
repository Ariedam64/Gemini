/**
 * Journal Guide - Render Utilities
 *
 * Badge element creation with tooltip system (matching Journal Hints).
 */

import { MGSprite } from '../../../../modules';
import type { BadgeInfo } from './badges';

// ─────────────────────────────────────────────────────────────────────────────
// Tooltip System (matching Journal Hints)
// ─────────────────────────────────────────────────────────────────────────────

let activeTooltip: HTMLElement | null = null;

function createTooltip(text: string): HTMLElement {
    const tooltip = document.createElement('div');
    tooltip.className = 'gemini-journal-hint';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: fixed;
        background: var(--paper, rgba(45, 35, 28, 0.95));
        color: var(--fg);
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 11px;
        max-width: 300px;
        z-index: 10000;
        pointer-events: none;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        white-space: normal;
        word-wrap: break-word;
        opacity: 0;
        transform: scale(0.95);
        transition: opacity 0.15s ease-out, transform 0.15s ease-out;
        font-family: inherit;
        text-align: center;
    `;
    return tooltip;
}

function positionTooltip(tooltip: HTMLElement, target: HTMLElement): void {
    const rect = target.getBoundingClientRect();
    const tooltipWidth = 300;
    const offset = 8;

    let left = rect.left + (rect.width / 2) - (tooltipWidth / 2);
    let top = rect.top - 40 - offset;

    if (left < 8) left = 8;
    if (left + tooltipWidth > window.innerWidth - 8) {
        left = window.innerWidth - tooltipWidth - 8;
    }

    if (top < 8) {
        top = rect.bottom + offset;
    }

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
}

function showTooltip(target: HTMLElement, text: string): void {
    hideTooltip();
    const tooltip = createTooltip(text);
    document.body.appendChild(tooltip);
    positionTooltip(tooltip, target);

    requestAnimationFrame(() => {
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'scale(1)';
    });

    activeTooltip = tooltip;
}

function hideTooltip(): void {
    if (activeTooltip) {
        activeTooltip.remove();
        activeTooltip = null;
    }
}

export function cleanupTooltips(): void {
    hideTooltip();
}

// ─────────────────────────────────────────────────────────────────────────────
// Badge Elements
// ─────────────────────────────────────────────────────────────────────────────

export function createBadgeElement(badge: BadgeInfo): HTMLElement {
    const pill = document.createElement('div');
    pill.className = 'gemini-qol-journalGuide-badge';

    if (badge.isActive) {
        pill.setAttribute('data-active', 'true');
    }
    if (badge.isPredicted) {
        pill.setAttribute('data-predicted', 'true');
    }

    pill.style.background = badge.isActive
        ? badge.bgColor
        : badge.isPredicted
            ? 'rgba(139, 115, 85, 0.6)'
            : badge.bgColor;

    // Weather icon (if applicable)
    if (badge.icon) {
        try {
            const iconCanvas = MGSprite.toCanvas('ui', badge.icon, { scale: 0.6 });
            iconCanvas.className = 'gemini-qol-journalGuide-badge-icon';
            iconCanvas.style.width = '14px';
            iconCanvas.style.height = '14px';
            iconCanvas.style.imageRendering = 'pixelated';
            pill.appendChild(iconCanvas);
        } catch (err) {
            console.warn('[JournalGuide] Failed to render badge icon:', badge.icon, err);
            // Fallback: text indicator
            const iconText = document.createElement('span');
            iconText.textContent = badge.variantId.charAt(0);
            iconText.className = 'gemini-qol-journalGuide-badge-icon-fallback';
            pill.appendChild(iconText);
        }
    }

    // Simple white letter (matching ability badge style)
    const letter = document.createElement('span');
    letter.className = 'gemini-qol-journalGuide-badge-letter';
    letter.textContent = badge.variantId.charAt(0).toUpperCase();
    letter.style.cssText = `
        color: white;
        font-size: 10px;
        font-weight: bold;
    `;
    pill.appendChild(letter);

    // Tooltip on hover (matching Journal Hints)
    pill.addEventListener('mouseenter', () => showTooltip(pill, badge.label));
    pill.addEventListener('mouseleave', hideTooltip);
    pill.addEventListener('click', (e) => {
        e.stopPropagation();
        showTooltip(pill, badge.label);
        setTimeout(hideTooltip, 3000);
    });

    return pill;
}
