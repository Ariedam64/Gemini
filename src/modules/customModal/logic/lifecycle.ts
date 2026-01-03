import { activeModalAtom } from "../../../atoms";
import { Store } from "../../../atoms/store";
import type { QuinoaModal } from "../../../atoms/types";
import type { CustomizableModal, ModalDataMap } from "../types";
import {
  getState,
  setInitialized,
  setActiveModal,
  setIsCustom,
  setShadow,
  clearShadow,
  addUnsubscribe,
  isCustomModalActive,
  getActiveModal,
  emitOpen,
  emitClose,
  resetState,
  addCloseListener,
} from "../state";
import {
  patchAtomsForModal,
  primeAtomsForModal,
  restoreAtomsForModal,
  restoreAllAtoms,
} from "./proxy";

let pollIntervalId: ReturnType<typeof setInterval> | null = null;
let lastKnownModalValue: QuinoaModal = null;

export async function init(): Promise<void> {
  const state = getState();
  if (state.initialized) {
    return;
  }

  lastKnownModalValue = await Store.select<QuinoaModal>("activeModalAtom");

  pollIntervalId = setInterval(async () => {
    try {
      const current = await Store.select<QuinoaModal>("activeModalAtom");
      const prev = lastKnownModalValue;

      if (prev !== current) {
        lastKnownModalValue = current;
        handleModalChange(current, prev);
      }
    } catch {
      // Ignore polling errors
    }
  }, 50);

  const cleanup = () => {
    if (pollIntervalId) {
      clearInterval(pollIntervalId);
      pollIntervalId = null;
    }
  };

  addUnsubscribe(cleanup);
  setInitialized(true);
}

function handleModalChange(current: QuinoaModal, prev: QuinoaModal): void {
  const wasCustom = isCustomModalActive();
  const activeModal = getActiveModal();

  if (current === null && prev !== null) {
    if (wasCustom && activeModal === prev) {
      handleCustomModalClosed("native");
    } else if (!wasCustom) {
      emitClose({
        modal: prev as CustomizableModal,
        wasCustom: false,
        closedBy: "native",
      });
    }
  }

  if (current !== null && !wasCustom) {
    emitOpen({
      modal: current as CustomizableModal,
      isCustom: false,
    });
  }
}

async function handleCustomModalClosed(
  closedBy: "user" | "api" | "native"
): Promise<void> {
  const modal = getActiveModal();
  if (!modal) return;

  clearShadow();
  setIsCustom(false);
  setActiveModal(null);

  await restoreAtomsForModal(modal);

  emitClose({
    modal,
    wasCustom: true,
    closedBy,
  });
}

export async function show<M extends CustomizableModal>(
  modal: M,
  data: ModalDataMap[M]
): Promise<void> {
  const state = getState();
  if (!state.initialized) {
    throw new Error("[MGCustomModal] Not initialized. Call init() first.");
  }

  if (isCustomModalActive()) {
    await close();
  }

  setShadow(modal, data);
  setIsCustom(true);
  setActiveModal(modal);

  patchAtomsForModal(modal);
  await primeAtomsForModal(modal);

  await activeModalAtom.set(modal);
  lastKnownModalValue = modal;

  emitOpen({
    modal,
    isCustom: true,
  });
}

export function update<M extends CustomizableModal>(
  modal: M,
  data: Partial<ModalDataMap[M]>
): void {
  const state = getState();

  if (!state.isCustom || state.activeModal !== modal) {
    return;
  }

  if (!state.shadow) return;

  const currentData = state.shadow.data as ModalDataMap[M];
  const newData = { ...currentData, ...data } as ModalDataMap[M];
  setShadow(modal, newData);
}

export async function close(): Promise<void> {
  const state = getState();

  if (!state.isCustom || !state.activeModal) {
    return;
  }

  const modal = state.activeModal;

  clearShadow();
  setIsCustom(false);
  setActiveModal(null);

  await activeModalAtom.set(null);
  lastKnownModalValue = null;

  await restoreAtomsForModal(modal);

  emitClose({
    modal,
    wasCustom: true,
    closedBy: "api",
  });
}

export function waitForClose(): Promise<void> {
  return new Promise((resolve) => {
    if (!isCustomModalActive()) {
      resolve();
      return;
    }

    const unsub = addCloseListener(() => {
      unsub();
      resolve();
    });
  });
}

export async function destroy(): Promise<void> {
  if (isCustomModalActive()) {
    const modal = getActiveModal();
    if (modal) {
      await restoreAtomsForModal(modal);
    }
  }

  await restoreAllAtoms();
  resetState();
}
