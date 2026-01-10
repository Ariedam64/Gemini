import { atom, getDefaultStore } from 'jotai';
import type { MutationId } from '@/common/games/Quinoa/systems/mutation';
import type { TileRef } from '@/common/games/Quinoa/world/tiles';
import { calculateServerNow } from '../utils/serverNow';

const { set } = getDefaultStore();

type QuinoaToastVariant = 'success' | 'error' | 'info';

/** A sprite path reference like "sprite/ui/MoneyBag" */
type SpriteName = `sprite/${string}`;

interface BaseToastOptions {
  id?: string;
  duration?: number | null;
  isStackable?: boolean;
  isClosable?: boolean;
}

export interface DefaultToastOptions extends BaseToastOptions {
  toastType?: 'default';
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: QuinoaToastVariant;
  icon?: TileRef | SpriteName | React.ReactNode;
  mutations?: MutationId[];
  onClick?: () => void;
  onClose?: () => void;
}

interface BoardToastOptions extends BaseToastOptions {
  toastType: 'board';
  title: React.ReactNode;
  subtitle: React.ReactNode;
  backgroundImage: string;
  strokeColor: string;
  topOffset?: number;
  onClick?: () => void;
  onClose?: () => void;
}

export type QuinoaToastOptions = DefaultToastOptions | BoardToastOptions;

export const quinoaToastsAtom = atom<QuinoaToastOptions[]>([]);

const nonStackableToastId = 'quinoa-game-toast';

export const sendQuinoaToast = (options: QuinoaToastOptions) => {
  const { isStackable = false } = options;

  const newToastWithDefaults = {
    ...options,
    isClosable: options.isClosable ?? true,
  };
  if (isStackable) {
    const newToast = {
      ...newToastWithDefaults,
      id: `quinoa-stackable-${calculateServerNow()}-${Math.random()}`,
    };
    set(quinoaToastsAtom, (prev) => [...prev, newToast]);
  } else {
    const newToast = {
      ...newToastWithDefaults,
      id: nonStackableToastId,
    };
    set(quinoaToastsAtom, (prev) => [
      ...prev.filter((toast) => toast.id !== nonStackableToastId),
      newToast,
    ]);
  }
};

export const closeNonStackableToast = () => {
  set(quinoaToastsAtom, (prev) =>
    prev.filter((toast) => toast.id !== nonStackableToastId)
  );
};
