/**
 * Alert Injection - Main orchestration
 *
 * Manages:
 * - Alert button injection into game toolbar
 * - Overlay toggle state
 * - Real-time badge updates
 * - Availability subscriptions
 * - Lifecycle cleanup
 */

import { startInjectAlertButton, type AlertButtonHandle } from "./alertButton";
import { createAlertOverlay, type AlertOverlayHandle } from "./AlertOverlay";
import { getAvailableTrackedItems, subscribeToAvailability, type AvailableItem } from "./alertData";
import { getShops } from "../../../globals/variables/shops";
import { MGShopActions, MGAudio } from "../../../modules";
import type { Unsubscribe } from "../../../globals/core/types";

export interface AlertInjectorHandle {
  destroy(): void;
}

/**
 * Start alert injector system
 */
export function startAlertInjector(): AlertInjectorHandle {
  let buttonHandle: AlertButtonHandle | null = null;
  let overlayHandle: AlertOverlayHandle | null = null;
  let availabilityUnsub: Unsubscribe | null = null;
  let isOverlayOpen = false;
  let currentItems: AvailableItem[] = [];

  /**
   * Update badge count based on available items
   */
  const updateBadge = (items: AvailableItem[]) => {
    const hadItems = currentItems.length > 0;
    const hasItems = items.length > 0;

    currentItems = items;
    buttonHandle?.updateBadge(items.length);

    // Manage ringing based on item availability
    if (hasItems) {
      // Start continuous ringing if there are items
      if (!hadItems) {
        buttonHandle?.startRinging();
      }
    } else {
      // Stop ringing if no more items
      if (hadItems) {
        buttonHandle?.stopRinging();
      }
    }
  };

  /**
   * Open overlay
   */
  const openOverlay = () => {
    if (isOverlayOpen) {
      return;
    }

    if (!buttonHandle?.root) {
      return;
    }

    // Get current available items
    const items = getAvailableTrackedItems();

    // Create overlay
    overlayHandle = createAlertOverlay({
      items,
      anchorElement: buttonHandle.root,
      onClose: closeOverlay,
      onBuyAll: (item) => {
        // Call the appropriate buyAll function based on shop type
        switch (item.shopType) {
          case "seed":
            MGShopActions.seed.buyAll(item.itemId);
            break;
          case "egg":
            MGShopActions.egg.buyAll(item.itemId);
            break;
          case "decor":
            MGShopActions.decor.buyAll(item.itemId);
            break;
          case "tool":
            MGShopActions.tool.buyAll(item.itemId);
            break;
        }

        // Overlay will be updated automatically via availability subscription
        // when the server sends back the shop updates
      },
    });

    // Append to body
    document.body.appendChild(overlayHandle.root);

    isOverlayOpen = true;
  };

  /**
   * Close overlay
   */
  const closeOverlay = () => {
    if (!isOverlayOpen || !overlayHandle) return;

    overlayHandle.destroy();
    overlayHandle = null;
    isOverlayOpen = false;
  };

  /**
   * Toggle overlay
   */
  const toggleOverlay = () => {
    if (isOverlayOpen) {
      closeOverlay();
    } else {
      openOverlay();
    }
  };

  /**
   * Handle availability changes
   */
  const handleAvailabilityChange = (items: AvailableItem[]) => {
    updateBadge(items);

    // Update overlay if open
    if (isOverlayOpen && overlayHandle) {
      overlayHandle.updateItems(items);
    }

    // Emit custom event for other features to listen to
    if (items.length > 0) {
      const event = new CustomEvent("gemini:alert-available", {
        detail: { items },
      });
      window.dispatchEvent(event);
    }
  };

  /**
   * Handle tracked items changes (add/remove)
   */
  const handleTrackedItemsChange = () => {
    const items = getAvailableTrackedItems();

    // Check if new items appeared (e.g., user tracked an item that's already available)
    const previousItemIds = new Set(currentItems.map(item => `${item.shopType}:${item.itemId}`));
    const newItemIds = new Set(items.map(item => `${item.shopType}:${item.itemId}`));

    const hasNewItems = items.some(item => !previousItemIds.has(`${item.shopType}:${item.itemId}`));

    updateBadge(items);

    // Update overlay if open
    if (isOverlayOpen && overlayHandle) {
      overlayHandle.updateItems(items);
    }

    // Play notification sound if new items appeared
    if (hasNewItems && items.length > 0) {
      try {
        MGAudio.CustomSounds.play("default-notification");
      } catch (e) {
        // Silently fail if audio not ready
      }
    }
  };

  // Initialize button
  buttonHandle = startInjectAlertButton({
    onClick: toggleOverlay,
    ariaLabel: "Alerts",
  });

  // Subscribe to availability changes
  availabilityUnsub = subscribeToAvailability(handleAvailabilityChange);

  // Listen for tracked items changes
  window.addEventListener("gemini:tracked-items-changed", handleTrackedItemsChange);

  // Listen for shop restock events (when tracked items become available after restock)
  const handleShopRestock = () => {
    try {
      MGAudio.CustomSounds.play("default-notification");
    } catch (e) {
      // Silently fail if audio not ready
    }
  };
  window.addEventListener("gemini:shop-restock-tracked", handleShopRestock);

  // Initial badge update (with retry if shop data not ready yet)
  const tryUpdateInitialBadge = (attempt = 1, maxAttempts = 10) => {
    // Check if shop data is available
    const shops = getShops();
    const shopsData = shops.get();
    const isShopDataReady = shopsData.all.some(s => s.items.length > 0);

    if (isShopDataReady || attempt >= maxAttempts) {
      const initialItems = getAvailableTrackedItems();
      updateBadge(initialItems);

      // Play notification sound if items are available at startup
      if (initialItems.length > 0) {
        try {
          MGAudio.CustomSounds.play("default-notification");
        } catch (e) {
          // Silently fail if audio not ready
        }
      }
    } else {
      // Retry after 500ms if shop data not ready yet
      setTimeout(() => tryUpdateInitialBadge(attempt + 1, maxAttempts), 500);
    }
  };

  tryUpdateInitialBadge();

  // Return cleanup handle
  return {
    destroy() {
      // Close overlay if open
      closeOverlay();

      // Unsubscribe from availability
      availabilityUnsub?.();
      availabilityUnsub = null;

      // Remove tracked items change listener
      window.removeEventListener("gemini:tracked-items-changed", handleTrackedItemsChange);

      // Remove shop restock listener
      window.removeEventListener("gemini:shop-restock-tracked", handleShopRestock);

      // Destroy button
      buttonHandle?.destroy();
      buttonHandle = null;
    },
  };
}
