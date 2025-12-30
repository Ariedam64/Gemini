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

export const MGCustomModal = {
  async init(): Promise<void> {
    return initModule();
  },

  isReady(): boolean {
    return isInitialized();
  },

  async show<M extends CustomizableModal>(
    modal: M,
    data: ModalDataMap[M]
  ): Promise<void> {
    return showModal(modal, data);
  },

  update<M extends CustomizableModal>(
    modal: M,
    data: Partial<ModalDataMap[M]>
  ): void {
    return updateModal(modal, data);
  },

  async close(): Promise<void> {
    return closeModal();
  },

  isOpen(): boolean {
    return getActiveModal() !== null;
  },

  isCustomOpen(): boolean {
    return isCustomModalActive();
  },

  getActiveModal(): CustomizableModal | null {
    return getActiveModal();
  },

  waitForClose(): Promise<void> {
    return waitForModalClose();
  },

  onOpen(callback: (event: ModalOpenEvent) => void): Unsubscribe {
    return addOpenListener(callback);
  },

  onClose(callback: (event: ModalCloseEvent) => void): Unsubscribe {
    return addCloseListener(callback);
  },

  destroy(): void {
    return destroyModule();
  },
};

export type { CustomizableModal, ModalDataMap, ModalOpenEvent, ModalCloseEvent };
