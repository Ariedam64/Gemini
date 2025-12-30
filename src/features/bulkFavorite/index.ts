/**
 * Bulk Favorite Feature
 * Renders a button next to the inventory to favorite/unfavorite all visible items at once
 * 
 * Architecture:
 * - Uses Shadow DOM for isolated styling
 * - Detects inventory container via DOM helpers
 * - Positioned dynamically next to inventory
 * - Integrates with Gemini WebSocket API
 */

import { Gemini } from '../../api';
import { onAdded, onRemoved } from '../shared/dom';
import { storageGet, storageSet } from '../shared/storage';
import type { InventoryItem } from '../shared/types';

interface BulkFavoriteConfig {
    enabled: boolean;
    position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

const DEFAULT_CONFIG: BulkFavoriteConfig = {
    enabled: false,
    position: 'top-right',
};

let cleanupFn: (() => void) | null = null;
let shadowHost: HTMLDivElement | null = null;
let shadowRoot: ShadowRoot | null = null;

/**
 * Start bulk favorite feature
 */
export function start(): void {
    const config = storageGet<BulkFavoriteConfig>('gemini:features:bulkFavorite', DEFAULT_CONFIG);

    if (!config.enabled) {
        console.log('[BulkFavorite] Disabled');
        return;
    }

    // Watch for inventory container to appear
    const unwatch = onAdded('[data-testid="inventory-panel"], .inventory-container, #inventory', (inventoryEl) => {
        renderButton(inventoryEl as HTMLElement, config);
    });

    cleanupFn = () => {
        unwatch.disconnect();
        removeButton();
    };

    console.log('✅ [BulkFavorite] Started');
}

/**
 * Stop bulk favorite feature
 */
export function stop(): void {
    if (cleanupFn) {
        cleanupFn();
        cleanupFn = null;
    }
    console.log('🛑 [BulkFavorite] Stopped');
}

/**
 * Render the bulk favorite button using Shadow DOM
 */
function renderButton(inventoryEl: HTMLElement, config: BulkFavoriteConfig): void {
    // Remove any existing button
    removeButton();

    // Create shadow host
    shadowHost = document.createElement('div');
    shadowHost.id = 'gemini-bulk-favorite-host';
    shadowHost.style.cssText = `
    position: absolute;
    z-index: 9999;
    pointer-events: none;
  `;

    // Attach shadow DOM
    shadowRoot = shadowHost.attachShadow({ mode: 'open' });

    // Position relative to inventory
    positionButton(shadowHost, inventoryEl, config.position);

    // Create button UI in shadow DOM
    shadowRoot.innerHTML = `
    <style>
      :host {
        all: initial;
      }
      
      .bulk-favorite-container {
        pointer-events: auto;
        display: flex;
        gap: 8px;
        padding: 8px;
        background: var(--gemini-bg, rgba(0, 0, 0, 0.8));
        border-radius: 8px;
        border: 1px solid var(--gemini-border, rgba(255, 255, 255, 0.1));
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(10px);
      }
      
      .bulk-btn {
        padding: 8px 16px;
        border: none;
        border-radius: 6px;
        font-family: 'Inter', sans-serif;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        color: #F5F5F5;
        background: linear-gradient(135deg, #10725A 0%, #5EB292 100%);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      }
      
      .bulk-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        background: linear-gradient(135deg, #0d5a47 0%, #4a9075 100%);
      }
      
      .bulk-btn:active {
        transform: translateY(0);
      }
      
      .bulk-btn.unfavorite {
        background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%);
      }
      
      .bulk-btn.unfavorite:hover {
        background: linear-gradient(135deg, #6B3410 0%, #B8561A 100%);
      }
      
      .bulk-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
      }
    </style>
    
    <div class="bulk-favorite-container">
      <button class="bulk-btn" id="favorite-all">
        ⭐ Favorite All
      </button>
      <button class="bulk-btn unfavorite" id="unfavorite-all">
        ✖ Unfavorite All
      </button>
    </div>
  `;

    // Attach event listeners
    const favoriteBtn = shadowRoot.getElementById('favorite-all');
    const unfavoriteBtn = shadowRoot.getElementById('unfavorite-all');

    favoriteBtn?.addEventListener('click', () => handleBulkAction(true));
    unfavoriteBtn?.addEventListener('click', () => handleBulkAction(false));

    // Append to body
    document.body.appendChild(shadowHost);

    // Update position on window resize
    const resizeHandler = () => positionButton(shadowHost!, inventoryEl, config.position);
    window.addEventListener('resize', resizeHandler);

    // Watch for inventory removal
    const unwatchRemove = onRemoved('[data-testid="inventory-panel"], .inventory-container, #inventory', (el) => {
        if (el === inventoryEl) removeButton();
    });

    // Update cleanup
    const originalCleanup = cleanupFn;
    cleanupFn = () => {
        originalCleanup?.();
        window.removeEventListener('resize', resizeHandler);
        unwatchRemove.disconnect();
        removeButton();
    };
}

/**
 * Position the button relative to inventory
 */
function positionButton(
    host: HTMLElement,
    inventoryEl: HTMLElement,
    position: BulkFavoriteConfig['position']
): void {
    const rect = inventoryEl.getBoundingClientRect();

    const offset = 12; // Gap from inventory edge

    switch (position) {
        case 'top-right':
            host.style.top = `${rect.top + offset}px`;
            host.style.left = `${rect.right - 200}px`; // Assume button width ~200px
            break;
        case 'top-left':
            host.style.top = `${rect.top + offset}px`;
            host.style.left = `${rect.left + offset}px`;
            break;
        case 'bottom-right':
            host.style.top = `${rect.bottom - 60}px`; // Assume button height ~60px
            host.style.left = `${rect.right - 200}px`;
            break;
        case 'bottom-left':
            host.style.top = `${rect.bottom - 60}px`;
            host.style.left = `${rect.left + offset}px`;
            break;
    }
}

/**
 * Remove the button from DOM
 */
function removeButton(): void {
    if (shadowHost) {
        shadowHost.remove();
        shadowHost = null;
        shadowRoot = null;
    }
}

/**
 * Handle bulk favorite/unfavorite action
 */
async function handleBulkAction(favorite: boolean): Promise<void> {
    const inventory = Gemini.Globals.myInventory.get();

    if (!inventory || !inventory.items) {
        console.warn('[BulkFavorite] No inventory data available');
        return;
    }

    // Disable buttons during action
    const favoriteBtn = shadowRoot?.getElementById('favorite-all') as HTMLButtonElement;
    const unfavoriteBtn = shadowRoot?.getElementById('unfavorite-all') as HTMLButtonElement;

    if (favoriteBtn) favoriteBtn.disabled = true;
    if (unfavoriteBtn) unfavoriteBtn.disabled = true;

    try {
        let count = 0;

        const favoritedIds = new Set(inventory.favoritedItemIds);

        for (const item of inventory.items) {
            const itemId = (item as any).id;
            if (!itemId) continue;

            const isFavorited = favoritedIds.has(itemId);

            // Skip if already in desired state
            if (favorite && isFavorited) continue;
            if (!favorite && !isFavorited) continue;

            // Toggle favorite status
            await Gemini.WebSocket.toggleFavoriteItem(itemId, favorite);
            count++;

            // Small delay to avoid overwhelming the server
            await new Promise(resolve => setTimeout(resolve, 50));
        }

        console.log(`[BulkFavorite] ${favorite ? 'Favorited' : 'Unfavorited'} ${count} items`);

        // Update button text temporarily
        const btn = favorite ? favoriteBtn : unfavoriteBtn;
        if (btn) {
            const originalText = btn.textContent;
            btn.textContent = `✓ ${count} items`;
            setTimeout(() => {
                if (btn) btn.textContent = originalText;
            }, 2000);
        }
    } catch (error) {
        console.error('[BulkFavorite] Error during bulk action:', error);
    } finally {
        // Re-enable buttons
        if (favoriteBtn) favoriteBtn.disabled = false;
        if (unfavoriteBtn) unfavoriteBtn.disabled = false;
    }
}

/**
 * Set enabled state
 */
export function setEnabled(enabled: boolean): void {
    const config = storageGet<BulkFavoriteConfig>('gemini:features:bulkFavorite', DEFAULT_CONFIG);
    config.enabled = enabled;
    storageSet('gemini:features:bulkFavorite', config);

    if (enabled) {
        start();
    } else {
        stop();
    }
}

/**
 * Set button position
 */
export function setPosition(position: BulkFavoriteConfig['position']): void {
    const config = storageGet<BulkFavoriteConfig>('gemini:features:bulkFavorite', DEFAULT_CONFIG);
    config.position = position;
    storageSet('gemini:features:bulkFavorite', config);

    // Restart to apply new position
    if (config.enabled) {
        stop();
        start();
    }
}
