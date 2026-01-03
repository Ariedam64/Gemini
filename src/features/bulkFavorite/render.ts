/**
 * BulkFavorite Feature - UI Rendering
 * 
 * Level 2: Handles Shadow DOM button rendering
 * Aligned with Gemini Design System v4.0
 */

import { onAdded, onRemoved } from '../../utils/dom';
import { element } from '../../ui/styles/helpers';
import { variablesCss } from '../../ui/styles/variables.css';
import { loadConfig } from './state';
import { bulkFavorite } from './logic';
import type { BulkFavoriteConfig, BulkFavoritePosition } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// Shadow DOM State
// ─────────────────────────────────────────────────────────────────────────────

let shadowHost: HTMLDivElement | null = null;
let shadowRoot: ShadowRoot | null = null;
let cleanupFn: (() => void) | null = null;
let resizeObserver: ResizeObserver | null = null;

// ─────────────────────────────────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────────────────────────────────

const COMPONENT_STYLES = `
  ${variablesCss}

  :host {
    position: fixed;
    z-index: 9999;
    pointer-events: none;
  }
  
  .bulk-container {
    pointer-events: auto;
    display: flex;
    gap: 8px;
    padding: 10px;
    background: var(--bg);
    border-radius: var(--radius);
    border: 1px solid var(--border);
    box-shadow: 0 8px 32px var(--shadow);
    backdrop-filter: blur(var(--glass-blur));
    transition: all 0.3s ease;
  }
  
  .bulk-btn {
    padding: 8px 16px;
    border: 1px solid var(--btn-border);
    border-radius: var(--btn-radius);
    font-family: var(--font-ui);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    color: var(--fg);
    background: var(--btn-bg-start);
    box-shadow: 0 2px 4px var(--shadow);
    display: flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
  }
  
  .bulk-btn:hover:not(:disabled) {
    transform: translateY(-1px);
    border-color: var(--accent);
    background: var(--btn-primary-bg-start);
    box-shadow: 0 4px 12px var(--shadow);
  }
  
  .bulk-btn:active:not(:disabled) {
    transform: translateY(1px);
  }
  
  .bulk-btn.unfavorite {
    --accent: #f87171; /* Red accent for destructive action */
  }
  
  .bulk-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    filter: grayscale(1);
  }

  @media (max-width: 480px) {
    .bulk-container {
      flex-direction: column;
      width: calc(100vw - 40px);
      max-width: 280px;
    }
    .bulk-btn {
      width: 100%;
      justify-content: center;
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────────────────────────────────────

export function renderButton(inventoryEl: HTMLElement, config: BulkFavoriteConfig): void {
    removeButton();

    shadowHost = element('div', { id: 'gemini-bulk-favorite' });
    shadowRoot = shadowHost.attachShadow({ mode: 'open' });

    const style = element('style', null, COMPONENT_STYLES);

    const favoriteBtn = element('button', {
        className: 'bulk-btn',
        id: 'favorite-all',
        onclick: () => handleBulkAction(true, favoriteBtn, unfavoriteBtn)
    }, '⭐ Favorite All');

    const unfavoriteBtn = element('button', {
        className: 'bulk-btn unfavorite',
        id: 'unfavorite-all',
        onclick: () => handleBulkAction(false, favoriteBtn, unfavoriteBtn)
    }, '✖ Unfavorite All');

    const container = element('div', { className: 'bulk-container' },
        favoriteBtn,
        unfavoriteBtn
    );

    shadowRoot.appendChild(style);
    shadowRoot.appendChild(container);

    document.body.appendChild(shadowHost);

    // Smart Positioning with ResizeObserver
    resizeObserver = new ResizeObserver(() => {
        if (!shadowHost || !inventoryEl) return;
        positionButton(shadowHost, inventoryEl, config.position);
    });
    resizeObserver.observe(inventoryEl);
    resizeObserver.observe(document.body);

    const unwatchRemove = onRemoved('[data-testid="inventory-panel"], .inventory-container, #inventory', removeButton);

    const originalCleanup = cleanupFn;
    cleanupFn = () => {
        originalCleanup?.();
        resizeObserver?.disconnect();
        resizeObserver = null;
        unwatchRemove.disconnect();
        removeButton();
    };
}

export function removeButton(): void {
    shadowHost?.remove();
    shadowHost = null;
    shadowRoot = null;
}

function positionButton(host: HTMLElement, inventoryEl: HTMLElement, position: BulkFavoritePosition): void {
    const rect = inventoryEl.getBoundingClientRect();
    const isSmall = window.innerWidth <= 480;
    const offset = 12;

    if (isSmall) {
        // Mobile: Centered at bottom of inventory
        host.style.top = `${rect.bottom - 110}px`;
        host.style.left = '50%';
        host.style.transform = 'translateX(-50%)';
        return;
    }

    host.style.transform = 'none';
    switch (position) {
        case 'top-right':
            host.style.top = `${rect.top + offset}px`;
            host.style.left = `${rect.right - 220}px`;
            break;
        case 'top-left':
            host.style.top = `${rect.top + offset}px`;
            host.style.left = `${rect.left + offset}px`;
            break;
        case 'bottom-right':
            host.style.top = `${rect.bottom - 60}px`;
            host.style.left = `${rect.right - 220}px`;
            break;
        case 'bottom-left':
            host.style.top = `${rect.bottom - 60}px`;
            host.style.left = `${rect.left + offset}px`;
            break;
    }
}

async function handleBulkAction(
    favorite: boolean,
    favoriteBtn: HTMLButtonElement,
    unfavoriteBtn: HTMLButtonElement
): Promise<void> {
    favoriteBtn.disabled = true;
    unfavoriteBtn.disabled = true;

    const originalText = favoriteBtn.textContent;
    const originalUnfavoriteText = unfavoriteBtn.textContent;

    try {
        const count = await bulkFavorite(favorite);
        const btn = favorite ? favoriteBtn : unfavoriteBtn;
        btn.textContent = `✓ ${count} items`;
        setTimeout(() => {
            favoriteBtn.textContent = originalText;
            unfavoriteBtn.textContent = originalUnfavoriteText;
        }, 2000);
    } finally {
        favoriteBtn.disabled = false;
        unfavoriteBtn.disabled = false;
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Lifecycle
// ─────────────────────────────────────────────────────────────────────────────

export function startWatching(): void {
    const config = loadConfig();

    if (!config.enabled) {
        return;
    }

    const unwatch = onAdded('[data-testid="inventory-panel"], .inventory-container, #inventory', (el) => {
        renderButton(el as HTMLElement, config);
    });

    const prevCleanup = cleanupFn;
    cleanupFn = () => {
        prevCleanup?.();
        unwatch.disconnect();
        removeButton();
    };

    console.log('✅ [BulkFavorite] Started');
}

export function stopWatching(): void {
    cleanupFn?.();
    cleanupFn = null;
    console.log('🛑 [BulkFavorite] Stopped');
}

export function setEnabled(enabled: boolean): void {
    const config = loadConfig();
    config.enabled = enabled;
    enabled ? startWatching() : stopWatching();
}
