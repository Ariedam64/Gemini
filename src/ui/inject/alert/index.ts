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
import type { NotificationConfig } from "../../../modules/audio/customSounds/types";
import type { Unsubscribe, ShopType } from "../../../globals/core/types";
import { CustomSounds } from "../../../modules/audio/customSounds";
import { EVENTS } from "../../../utils/storage";

export interface AlertInjectorHandle {
  destroy(): void;
}

type ShopItemKey = Pick<AvailableItem, "itemId" | "shopType">;
type ShopSoundEntry = { soundId: string; volume: number };

/**
 * Start alert injector system
 */
export function startAlertInjector(): AlertInjectorHandle {
  let buttonHandle: AlertButtonHandle | null = null;
  let overlayHandle: AlertOverlayHandle | null = null;
  let availabilityUnsub: Unsubscribe | null = null;
  let isOverlayOpen = false;
  let currentItems: AvailableItem[] = [];
  let shopLoopQueue: ShopSoundEntry[] = [];
  let shopLoopQueueKey = "";
  let shopLoopIndex = 0;
  let shopLoopToken = 0;
  let isShopLooping = false;
  let shopLoopSource: string | null = null;
  let shopOneShotQueue: ShopSoundEntry[] = [];
  let shopOneShotToken = 0;
  let isShopOneShotPlaying = false;

  const getShopConfig = (): NotificationConfig | null => {
    try {
      return MGAudio.CustomSounds.getNotificationConfig("shop");
    } catch {
      return null;
    }
  };

  const getCustomItemConfig = (
    itemId: string,
    shopType: ShopType
  ): NotificationConfig | null => {
    try {
      const customSound = CustomSounds.getItemCustomSound("shop", itemId, shopType);
      if (!customSound) return null;

      return {
        soundId: customSound.soundId,
        volume: customSound.volume,
        mode: customSound.mode,
      };
    } catch {
      return null;
    }
  };

  const buildEntryKey = (entry: ShopSoundEntry): string =>
    `${entry.soundId}:${entry.volume}`;

  const pushUniqueEntry = (
    entries: ShopSoundEntry[],
    seen: Set<string>,
    soundId: string,
    volume: number
  ): void => {
    if (seen.has(soundId)) return;
    entries.push({ soundId, volume });
    seen.add(soundId);
  };

  const buildOneShotQueue = (
    items: ShopItemKey[],
    defaultConfig: NotificationConfig | null
  ): ShopSoundEntry[] => {
    const entries: ShopSoundEntry[] = [];
    const seen = new Set<string>();
    let includeDefault = false;
    const customEntries: ShopSoundEntry[] = [];

    for (const item of items) {
      const customConfig = getCustomItemConfig(item.itemId, item.shopType);
      if (customConfig) {
        if (customConfig.mode === "one-shot") {
          customEntries.push({
            soundId: customConfig.soundId,
            volume: customConfig.volume,
          });
        }
      } else if (defaultConfig?.mode === "one-shot") {
        includeDefault = true;
      }
    }

    if (includeDefault && defaultConfig) {
      pushUniqueEntry(entries, seen, defaultConfig.soundId, defaultConfig.volume);
    }

    for (const entry of customEntries) {
      pushUniqueEntry(entries, seen, entry.soundId, entry.volume);
    }

    return entries;
  };

  const buildLoopQueue = (
    items: ShopItemKey[],
    defaultConfig: NotificationConfig | null
  ): ShopSoundEntry[] => {
    const entries: ShopSoundEntry[] = [];
    const seen = new Set<string>();
    let includeDefault = false;
    const customEntries: ShopSoundEntry[] = [];

    for (const item of items) {
      const customConfig = getCustomItemConfig(item.itemId, item.shopType);
      if (customConfig) {
        if (customConfig.mode === "loop") {
          customEntries.push({
            soundId: customConfig.soundId,
            volume: customConfig.volume,
          });
        }
      } else if (defaultConfig?.mode === "loop") {
        includeDefault = true;
      }
    }

    if (includeDefault && defaultConfig) {
      pushUniqueEntry(entries, seen, defaultConfig.soundId, defaultConfig.volume);
    }

    for (const entry of customEntries) {
      pushUniqueEntry(entries, seen, entry.soundId, entry.volume);
    }

    return entries;
  };

  const playSoundEntryOnce = (
    entry: ShopSoundEntry,
    onEnd: () => void,
    isActive: () => boolean,
    trackLoopSource = false
  ): void => {
    if (!isActive()) return;

    const sound = CustomSounds.getById(entry.soundId);
    if (!sound) {
      onEnd();
      return;
    }

    if (trackLoopSource) {
      shopLoopSource = sound.source;
    }

    MGAudio.playCustom(sound.source, { volume: entry.volume / 100 })
      .then((handle) => {
        if (!isActive()) return;
        const audio = handle.audio;
        const handleEnd = () => {
          if (!isActive()) return;
          onEnd();
        };
        audio.addEventListener("ended", handleEnd, { once: true });
      })
      .catch(() => {
        if (!isActive()) return;
        onEnd();
      });
  };

  const playNextShopLoop = (): void => {
    if (!isShopLooping || shopLoopQueue.length === 0) return;

    const entry = shopLoopQueue[shopLoopIndex];
    shopLoopIndex = (shopLoopIndex + 1) % shopLoopQueue.length;

    const token = shopLoopToken;
    const isActive = () => isShopLooping && shopLoopToken === token;

    playSoundEntryOnce(
      entry,
      () => {
        if (!isActive()) return;
        playNextShopLoop();
      },
      isActive,
      true
    );
  };

  const startShopLoopSequence = (): void => {
    if (isShopLooping || shopLoopQueue.length === 0) return;
    isShopLooping = true;
    if (shopLoopIndex >= shopLoopQueue.length) {
      shopLoopIndex = 0;
    }
    playNextShopLoop();
  };

  const pauseShopLoopSequence = (): void => {
    if (!isShopLooping) return;

    shopLoopToken += 1;
    isShopLooping = false;

    try {
      const handle = MGAudio.getCustomHandle();
      if (!shopLoopSource || (handle && handle.url === shopLoopSource)) {
        MGAudio.CustomSounds.stop();
      }
    } catch {
      // Ignore if audio isn't ready
    }

    shopLoopSource = null;
  };

  const stopShopLoopSequence = (): void => {
    pauseShopLoopSequence();
    shopLoopQueue = [];
    shopLoopQueueKey = "";
    shopLoopIndex = 0;
    shopLoopSource = null;
  };

  const playNextShopOneShot = (): void => {
    if (shopOneShotQueue.length === 0) {
      isShopOneShotPlaying = false;
      startShopLoopSequence();
      return;
    }

    isShopOneShotPlaying = true;
    const entry = shopOneShotQueue.shift()!;
    const token = shopOneShotToken;
    const isActive = () => isShopOneShotPlaying && shopOneShotToken === token;

    playSoundEntryOnce(
      entry,
      () => {
        if (!isActive()) return;
        playNextShopOneShot();
      },
      isActive
    );
  };

  const enqueueShopOneShots = (
    items: ShopItemKey[],
    config?: NotificationConfig | null
  ): void => {
    const effectiveConfig = config ?? getShopConfig();
    const entries = buildOneShotQueue(items, effectiveConfig);
    if (entries.length === 0) return;

    const seen = new Set(shopOneShotQueue.map((entry) => entry.soundId));
    for (const entry of entries) {
      if (seen.has(entry.soundId)) continue;
      shopOneShotQueue.push(entry);
      seen.add(entry.soundId);
    }

    if (!isShopOneShotPlaying) {
      shopOneShotToken += 1;
      pauseShopLoopSequence();
      playNextShopOneShot();
    }
  };

  const syncShopLoop = (
    items: ShopItemKey[],
    config?: NotificationConfig | null
  ): void => {
    const effectiveConfig = config ?? getShopConfig();
    const nextQueue = buildLoopQueue(items, effectiveConfig);

    if (nextQueue.length === 0) {
      stopShopLoopSequence();
      return;
    }

    const nextKey = nextQueue.map(buildEntryKey).join("|");
    const queueChanged = nextKey !== shopLoopQueueKey;

    shopLoopQueue = nextQueue;
    shopLoopQueueKey = nextKey;

    if (queueChanged) {
      shopLoopIndex = 0;
      if (isShopLooping) {
        pauseShopLoopSequence();
      }
    }

    if (isShopOneShotPlaying) return;

    if (!isShopLooping) {
      startShopLoopSequence();
    }
  };

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

    syncShopLoop(items);

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
    const newItems = items.filter(item => !previousItemIds.has(`${item.shopType}:${item.itemId}`));
    const hasNewItems = newItems.length > 0;

    updateBadge(items);

    // Update overlay if open
    if (isOverlayOpen && overlayHandle) {
      overlayHandle.updateItems(items);
    }

    const config = getShopConfig();
    syncShopLoop(items, config);

    if (hasNewItems) {
      enqueueShopOneShots(newItems, config);
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
  const handleShopRestock = (event: Event) => {
    const customEvent = event as CustomEvent<{
      shopType: ShopType;
      items: Array<{ itemId: string; remaining: number }>;
    }>;

    const { shopType, items } = customEvent.detail;
    if (!items || items.length === 0) return;

    const restockItems: ShopItemKey[] = items.map((item) => ({
      itemId: item.itemId,
      shopType,
    }));
    enqueueShopOneShots(restockItems, getShopConfig());
  };
  window.addEventListener("gemini:shop-restock-tracked", handleShopRestock);

  const handleCustomSoundChange = (event: Event) => {
    const customEvent = event as CustomEvent<{
      action: "set" | "remove";
      entityType: string;
      entityId: string;
      shopType?: ShopType;
    }>;

    if (customEvent.detail?.entityType !== "shop") return;
    const items = getAvailableTrackedItems();
    syncShopLoop(items, getShopConfig());
  };
  window.addEventListener(EVENTS.CUSTOM_SOUND_CHANGE, handleCustomSoundChange);

  // Initial badge update (with retry if shop data not ready yet)
  const tryUpdateInitialBadge = (attempt = 1, maxAttempts = 10) => {
    // Check if shop data is available
    const shops = getShops();
    const shopsData = shops.get();
    const isShopDataReady = shopsData.all.some(s => s.items.length > 0);

    if (isShopDataReady || attempt >= maxAttempts) {
      const initialItems = getAvailableTrackedItems();
      updateBadge(initialItems);

      const config = getShopConfig();
      syncShopLoop(initialItems, config);
      if (initialItems.length > 0) {
        enqueueShopOneShots(initialItems, config);
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
      window.removeEventListener(EVENTS.CUSTOM_SOUND_CHANGE, handleCustomSoundChange);

      // Destroy button
      buttonHandle?.destroy();
      buttonHandle = null;

      shopOneShotQueue = [];
      shopOneShotToken += 1;
      isShopOneShotPlaying = false;
      stopShopLoopSequence();
    },
  };
}
