// src/modules/customModal/index.ts
// MGCustomModal - Custom modal system for game UI integration

import type {
  CustomizableModal,
  ModalDataMap,
  Unsubscribe,
  ModalOpenEvent,
  ModalCloseEvent,
} from "./types";
import {
  init as initModule,
  show as showModal,
  update as updateModal,
  close as closeModal,
  waitForClose as waitForModalClose,
  destroy as destroyModule,
} from "./lifecycle";
import {
  isInitialized,
  isCustomModalActive,
  getActiveModal,
  addOpenListener,
  addCloseListener,
} from "./state";

/**
 * MGCustomModal module - Custom modal system
 *
 * Provides a system to display custom modals integrated with the game's UI.
 * Supports showing, updating, closing modals and listening to modal events.
 *
 * @example
 * ```typescript
 * // Initialize modal system
 * await MGCustomModal.init();
 *
 * // Show a custom modal
 * await MGCustomModal.show('myModal', { title: 'Hello', content: 'World' });
 *
 * // Update modal data
 * MGCustomModal.update('myModal', { content: 'Updated' });
 *
 * // Close modal
 * await MGCustomModal.close();
 *
 * // Listen to events
 * const unsub = MGCustomModal.onOpen((event) => {
 *   console.log('Modal opened:', event.modal);
 * });
 *
 * // Check if ready
 * if (MGCustomModal.isReady()) {
 *   await MGCustomModal.show('myModal', data);
 * }
 * ```
 */
export const MGCustomModal = {
  /**
   * Initialize modal system
   * Safe to call multiple times (idempotent)
   */
  async init(): Promise<void> {
    return initModule();
  },

  /**
   * Check if module is ready
   */
  isReady(): boolean {
    return isInitialized();
  },

  /**
   * Show a custom modal
   *
   * @param modal - Modal identifier
   * @param data - Modal data
   */
  async show<M extends CustomizableModal>(
    modal: M,
    data: ModalDataMap[M]
  ): Promise<void> {
    return showModal(modal, data);
  },

  /**
   * Update active modal data
   *
   * @param modal - Modal identifier
   * @param data - Partial modal data to update
   */
  update<M extends CustomizableModal>(
    modal: M,
    data: Partial<ModalDataMap[M]>
  ): void {
    return updateModal(modal, data);
  },

  /**
   * Close active modal
   */
  async close(): Promise<void> {
    return closeModal();
  },

  /**
   * Check if any modal is open
   */
  isOpen(): boolean {
    return getActiveModal() !== null;
  },

  /**
   * Check if a custom modal is active
   */
  isCustomOpen(): boolean {
    return isCustomModalActive();
  },

  /**
   * Get active modal identifier
   */
  getActiveModal(): CustomizableModal | null {
    return getActiveModal();
  },

  /**
   * Wait for modal to close
   */
  waitForClose(): Promise<void> {
    return waitForModalClose();
  },

  /**
   * Listen to modal open events
   *
   * @param callback - Event callback
   * @returns Unsubscribe function
   */
  onOpen(callback: (event: ModalOpenEvent) => void): Unsubscribe {
    return addOpenListener(callback);
  },

  /**
   * Listen to modal close events
   *
   * @param callback - Event callback
   * @returns Unsubscribe function
   */
  onClose(callback: (event: ModalCloseEvent) => void): Unsubscribe {
    return addCloseListener(callback);
  },

  /**
   * Destroy modal system and cleanup resources
   */
  async destroy(): Promise<void> {
    return destroyModule();
  },
};

export type { CustomizableModal, ModalDataMap, ModalOpenEvent, ModalCloseEvent };
