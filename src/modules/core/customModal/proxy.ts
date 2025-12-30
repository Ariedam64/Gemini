import { ensureStore, type JotaiStore } from "../../../atoms/core/bridge";
import { getAtomByLabel } from "../../../atoms/core/lookup";
import type { CustomizableModal, AtomProxyConfig, ModalDataMap } from "./types";
import { getAtomLabelsForModal, getRegistryForModal, MODAL_REGISTRY } from "./registry";
import {
  getShadowData,
  isCustomModalActive,
  markAtomPatched,
  getOriginalRead,
  isPatchedAtom,
  clearPatchedAtom,
  getActiveModal,
} from "./state";

type AtomRead = (get: (atom: unknown) => unknown) => unknown;

const MODALS_NEED_USER_SLOTS = new Set<CustomizableModal>([
  "inventory",
  "journal",
  "stats",
  "activityLog",
  "petHutch",
]);
const MODALS_NEED_SHOPS = new Set<CustomizableModal>([
  "seedShop",
  "eggShop",
  "toolShop",
  "decorShop",
]);
const MODALS_NEED_PLAYERS = new Set<CustomizableModal>(["leaderboard"]);

function createPatchedRead(
  atomLabel: string,
  originalRead: AtomRead,
  config: AtomProxyConfig,
  modal: CustomizableModal
): AtomRead {
  return function patchedRead(get: (atom: unknown) => unknown): unknown {
    const isActive = isCustomModalActive();
    const currentModal = getActiveModal();
    if (isActive && currentModal === modal) {
      const shadowData = getShadowData(modal);
      if (shadowData !== null) {
        let rawValue: unknown;
        if (config.dataKey === "_full") {
          rawValue = shadowData;
        } else {
          rawValue = (shadowData as Record<string, unknown>)[config.dataKey];
        }
        if (rawValue !== undefined) {
          // Keep dependency tracking intact while returning shadow data.
          originalRead(get);
          return config.transform ? config.transform(rawValue) : rawValue;
        }
      }
    }
    return originalRead(get);
  };
}

function createDerivedPatchedRead(
  atomLabel: string,
  originalRead: AtomRead,
  sourceKey: string,
  deriveFn: (data: unknown) => unknown,
  modal: CustomizableModal
): AtomRead {
  return function patchedRead(get: (atom: unknown) => unknown): unknown {
    if (isCustomModalActive() && getActiveModal() === modal) {
      const shadowData = getShadowData(modal);
      if (shadowData !== null) {
        const sourceValue = (shadowData as Record<string, unknown>)[sourceKey];
        if (sourceValue !== undefined) {
          // Preserve dependencies so real data updates propagate after restore.
          originalRead(get);
          return deriveFn(sourceValue);
        }
      }
    }
    return originalRead(get);
  };
}

export function patchAtomsForModal(modal: CustomizableModal): void {
  const registry = getRegistryForModal(modal);

  for (const config of registry.atoms) {
    const atom = getAtomByLabel(config.atomLabel);
    if (!atom) {
      continue;
    }

    if (isPatchedAtom(config.atomLabel)) {
      continue;
    }

    const originalRead = atom.read;
    if (typeof originalRead !== "function") {
      continue;
    }

    const patchedRead = createPatchedRead(
      config.atomLabel,
      originalRead,
      config,
      modal
    );
    atom.read = patchedRead;
    markAtomPatched(config.atomLabel, originalRead);
  }

  if (registry.derivedAtoms) {
    for (const derived of registry.derivedAtoms) {
      const atom = getAtomByLabel(derived.atomLabel);
      if (!atom) {
        continue;
      }

      if (isPatchedAtom(derived.atomLabel)) {
        continue;
      }

      const originalRead = atom.read;
      if (typeof originalRead !== "function") {
        continue;
      }

      const patchedRead = createDerivedPatchedRead(
        derived.atomLabel,
        originalRead,
        derived.sourceKey,
        derived.deriveFn,
        modal
      );
      atom.read = patchedRead;
      markAtomPatched(derived.atomLabel, originalRead);
    }
  }
}

export async function restoreAtomsForModal(modal: CustomizableModal): Promise<void> {
  const registry = getRegistryForModal(modal);

  for (const config of registry.atoms) {
    restoreAtom(config.atomLabel);
  }

  if (registry.derivedAtoms) {
    for (const derived of registry.derivedAtoms) {
      restoreAtom(derived.atomLabel);
    }
  }

  const baseStore = await ensureStore();
  await bumpStateForModal(baseStore, modal);
}

export async function primeAtomsForModal(modal: CustomizableModal): Promise<void> {
  const baseStore = await ensureStore();
  await bumpStateForModal(baseStore, modal);

  const labels = getAtomLabelsForModal(modal);
  for (const atomLabel of labels) {
    const atom = getAtomByLabel(atomLabel);
    if (!atom) continue;
    try {
      baseStore.get(atom);
    } catch {
      // Ignore prewarm errors
    }
  }
}

function restoreAtom(atomLabel: string): void {
  if (!isPatchedAtom(atomLabel)) {
    return;
  }

  const atom = getAtomByLabel(atomLabel);
  const originalRead = getOriginalRead(atomLabel);

  if (atom && originalRead) {
    atom.read = originalRead as typeof atom.read;
  }

  clearPatchedAtom(atomLabel);
}

async function bumpStateForModal(
  store: JotaiStore,
  modal: CustomizableModal
): Promise<void> {
  const needsUserSlots = MODALS_NEED_USER_SLOTS.has(modal);
  const needsShops = MODALS_NEED_SHOPS.has(modal);
  const needsPlayers = MODALS_NEED_PLAYERS.has(modal);

  if (!needsUserSlots && !needsShops && !needsPlayers) {
    return;
  }

  const stateAtom = getAtomByLabel("stateAtom");
  if (!stateAtom) {
    return;
  }

  try {
    const state = store.get(stateAtom) as Record<string, unknown> | null;
    if (!state || typeof state !== "object") {
      return;
    }

    let nextState: Record<string, unknown> | null = null;

    if (needsUserSlots || needsShops) {
      const child = state.child as Record<string, unknown> | null | undefined;
      const data = child?.data as Record<string, unknown> | null | undefined;
      if (child && data && typeof data === "object") {
        let nextData: Record<string, unknown> | null = null;

        if (needsUserSlots && Array.isArray(data.userSlots)) {
          const nextUserSlots = data.userSlots.map((slot) => {
            if (!slot || typeof slot !== "object") return slot;
            const slotObj = slot as Record<string, unknown>;
            const slotData = slotObj.data;
            const nextSlotData =
              slotData && typeof slotData === "object"
                ? { ...(slotData as Record<string, unknown>) }
                : slotData;
            return { ...slotObj, data: nextSlotData };
          });
          nextData = { ...(nextData ?? data), userSlots: nextUserSlots };
        }

        if (needsShops && data.shops && typeof data.shops === "object") {
          nextData = { ...(nextData ?? data), shops: { ...(data.shops as object) } };
        }

        if (nextData) {
          const nextChild = { ...child, data: nextData };
          nextState = { ...state, child: nextChild };
        }
      }
    }

    if (needsPlayers) {
      const data = state.data as Record<string, unknown> | null | undefined;
      if (data && Array.isArray(data.players)) {
        const nextData = { ...data, players: [...data.players] };
        nextState = { ...(nextState ?? state), data: nextData };
      }
    }

    if (!nextState) {
      return;
    }

    await store.set(stateAtom, nextState);
  } catch (e) {
    // Ignore refresh errors
  }
}

export async function restoreAllAtoms(): Promise<void> {
  for (const modal of Object.keys(MODAL_REGISTRY) as CustomizableModal[]) {
    await restoreAtomsForModal(modal);
  }
}
