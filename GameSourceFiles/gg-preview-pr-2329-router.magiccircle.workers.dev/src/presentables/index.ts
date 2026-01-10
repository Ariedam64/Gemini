import { useCallback } from 'react';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { Presentable } from './Presentable';

export type QueuedPresentable = {
  presentable: Presentable;
  isDismissed: boolean;
  id: string;
  priority: number;
};

const presentableQueueAtom = atom<QueuedPresentable[]>([]);

type PresentableWithId<T extends Presentable> = {
  id: string;
  presentable: T;
};

export function usePresentableProducer<T extends Presentable>(
  priority: number = 0
) {
  const setPresentableQueue = useSetAtom(presentableQueueAtom);
  /**
   * Adds the presentable to the queue, or updates the presentable if one
   * already exists with the same ID.
   */
  const addPresentable = useCallback(
    ({ id, presentable }: PresentableWithId<T>) => {
      const newPresentable: QueuedPresentable = {
        presentable,
        isDismissed: false,
        id,
        priority,
      };
      setPresentableQueue((prevQueue) => {
        const filteredQueue = prevQueue.filter((p) => p.id !== id);
        return [newPresentable, ...filteredQueue];
      });
    },
    [setPresentableQueue, priority]
  );

  const setPresentables = useCallback(
    (presentables: PresentableWithId<T>[]) => {
      setPresentableQueue((prevQueue) => {
        const filteredQueue = prevQueue.filter((p) => p.priority !== priority);
        const newPresentables = presentables.map(({ id, presentable }) => ({
          presentable,
          isDismissed: false,
          id,
          priority,
        }));
        return [...filteredQueue, ...newPresentables];
      });
    },
    [setPresentableQueue, priority]
  );

  /**
   * Removes the presentable with the given ID from the queue.
   * If the presentable is not in the queue, this is a no-op.
   */
  const removePresentable = useCallback(
    ({ id }: { id: string }) => {
      setPresentableQueue((prevQueue) => prevQueue.filter((p) => p.id !== id));
    },
    [setPresentableQueue]
  );

  return { addPresentable, removePresentable, setPresentables };
}

function useCurrentQueuedPresentable(): QueuedPresentable | undefined {
  const presentableQueue = useAtomValue(presentableQueueAtom);
  const priorityQueue = [...presentableQueue].sort(
    (a, b) => a.priority - b.priority
  );
  return priorityQueue.find((p) => !p.isDismissed);
}

export function useCurrentPresentable(): Presentable | undefined {
  const currentQueuedPresentable = useCurrentQueuedPresentable();
  return currentQueuedPresentable?.presentable;
}

/** Sets whether the given presentable is dismissed or not. */
function useSetDismissed() {
  const setPresentableQueue = useSetAtom(presentableQueueAtom);

  const setDismissed = useCallback(
    (queuedPresentable: QueuedPresentable, isDismissed: boolean) => {
      setPresentableQueue((prevQueue) =>
        prevQueue.map((p) =>
          p.id === queuedPresentable.id ? { ...p, isDismissed } : p
        )
      );
    },
    [setPresentableQueue]
  );

  return setDismissed;
}

/** Dismisses the currently-visible presentable. */
export function useDismissCurrentPresentable() {
  const currentQueuedPresentable = useCurrentQueuedPresentable();
  const setDismissed = useSetDismissed();

  const dismissCurrentPresentable = useCallback(() => {
    if (!currentQueuedPresentable) {
      return () => void 0;
    }
    setDismissed(currentQueuedPresentable, true);

    return () => setDismissed(currentQueuedPresentable, false);
  }, [currentQueuedPresentable, setDismissed]);

  return dismissCurrentPresentable;
}
