import type {
  CustomizableModal,
  ShadowEntry,
  ModalDataMap,
  Unsubscribe,
  ModalOpenEvent,
  ModalCloseEvent,
} from "./types";

interface CustomModalState {
  initialized: boolean;
  activeModal: CustomizableModal | null;
  isCustom: boolean;
  shadow: ShadowEntry | null;
  patchedAtoms: Set<string>;
  originalReads: Map<string, Function>;
  unsubscribes: Unsubscribe[];
  listeners: {
    onOpen: Set<(event: ModalOpenEvent) => void>;
    onClose: Set<(event: ModalCloseEvent) => void>;
  };
}

const state: CustomModalState = {
  initialized: false,
  activeModal: null,
  isCustom: false,
  shadow: null,
  patchedAtoms: new Set(),
  originalReads: new Map(),
  unsubscribes: [],
  listeners: {
    onOpen: new Set(),
    onClose: new Set(),
  },
};

export function getState(): Readonly<CustomModalState> {
  return state;
}

export function isInitialized(): boolean {
  return state.initialized;
}

export function isCustomModalActive(): boolean {
  return state.isCustom && state.activeModal !== null;
}

export function getActiveModal(): CustomizableModal | null {
  return state.activeModal;
}

export function getShadowData<M extends CustomizableModal>(
  modal: M
): ModalDataMap[M] | null {
  if (!state.shadow || state.shadow.modal !== modal) {
    return null;
  }
  return state.shadow.data as ModalDataMap[M];
}

export function setInitialized(value: boolean): void {
  state.initialized = value;
}

export function setActiveModal(modal: CustomizableModal | null): void {
  state.activeModal = modal;
}

export function setIsCustom(value: boolean): void {
  state.isCustom = value;
}

export function setShadow<M extends CustomizableModal>(
  modal: M,
  data: ModalDataMap[M]
): void {
  state.shadow = {
    modal,
    data,
    timestamp: Date.now(),
  };
}

export function clearShadow(): void {
  state.shadow = null;
}

export function markAtomPatched(label: string, originalRead: Function): void {
  state.patchedAtoms.add(label);
  state.originalReads.set(label, originalRead);
}

export function getOriginalRead(label: string): Function | undefined {
  return state.originalReads.get(label);
}

export function isPatchedAtom(label: string): boolean {
  return state.patchedAtoms.has(label);
}

export function clearPatchedAtom(label: string): void {
  state.patchedAtoms.delete(label);
  state.originalReads.delete(label);
}

export function getPatchedAtomLabels(): string[] {
  return Array.from(state.patchedAtoms);
}

export function addUnsubscribe(unsub: Unsubscribe): void {
  state.unsubscribes.push(unsub);
}

export function clearUnsubscribes(): void {
  for (const unsub of state.unsubscribes) {
    try {
      unsub();
    } catch {
      // Ignore cleanup errors
    }
  }
  state.unsubscribes.length = 0;
}

export function addOpenListener(
  cb: (event: ModalOpenEvent) => void
): Unsubscribe {
  state.listeners.onOpen.add(cb);
  return () => state.listeners.onOpen.delete(cb);
}

export function addCloseListener(
  cb: (event: ModalCloseEvent) => void
): Unsubscribe {
  state.listeners.onClose.add(cb);
  return () => state.listeners.onClose.delete(cb);
}

export function emitOpen(event: ModalOpenEvent): void {
  for (const cb of state.listeners.onOpen) {
    try {
      cb(event);
    } catch {
      // Ignore listener errors
    }
  }
}

export function emitClose(event: ModalCloseEvent): void {
  for (const cb of state.listeners.onClose) {
    try {
      cb(event);
    } catch {
      // Ignore listener errors
    }
  }
}

export function resetState(): void {
  clearUnsubscribes();
  state.initialized = false;
  state.activeModal = null;
  state.isCustom = false;
  state.shadow = null;
  state.patchedAtoms.clear();
  state.originalReads.clear();
  state.listeners.onOpen.clear();
  state.listeners.onClose.clear();
}
