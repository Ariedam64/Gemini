import { AnimatePresence } from 'framer-motion';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { isGameWindowedAtom } from '@/components/GameWindow/store';
import McFlex from '@/components/McFlex/McFlex';
import { MotionBox } from '@/components/Motion';
import useIsSmallHeight from '@/hooks/useIsSmallHeight';
import { isEstablishingShotCompleteAtom } from '@/Quinoa/atoms/establishingShotAtoms';
import { type QuinoaToastOptions, quinoaToastsAtom } from '../atoms/toastAtoms';
import QuinoaBoardToast from './QuinoaBoardToast';
import QuinoaToast from './QuinoaToast';

const TimedQuinoaToast = ({ toast }: { toast: QuinoaToastOptions }) => {
  const setToasts = useSetAtom(quinoaToastsAtom);
  const { duration = 10_000, id } = toast;

  useEffect(() => {
    if (duration === null) {
      return;
    }
    const timer = setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
    return () => clearTimeout(timer);
  }, [id, duration, setToasts, toast]);

  const onClose = () => {
    setToasts((currentToasts) =>
      currentToasts.filter((t) => t.id !== toast.id)
    );
  };

  return (
    <MotionBox
      layout
      key={id}
      initial={{ y: -10, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: -10, opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {toast.toastType === 'board' ? (
        <QuinoaBoardToast
          {...toast}
          onClose={onClose}
          isClosable={toast.isClosable}
        />
      ) : (
        <QuinoaToast
          {...toast}
          onClose={onClose}
          isClosable={toast.isClosable}
        />
      )}
    </MotionBox>
  );
};

const QuinoaToastContainer = () => {
  const [toasts] = useAtom(quinoaToastsAtom);
  const isWindowed = useAtomValue(isGameWindowedAtom);
  const isSmallHeight = useIsSmallHeight();
  const isEstablishingShotComplete = useAtomValue(
    isEstablishingShotCompleteAtom
  );

  if (toasts.length === 0 || !isEstablishingShotComplete) {
    return null;
  }
  return (
    <McFlex
      col
      position="absolute"
      top={{
        base: isSmallHeight
          ? 'calc(var(--sait) + 10px)'
          : isWindowed
            ? '55px'
            : `calc(var(--system-header-height) + 50px)`,
        lg: isSmallHeight
          ? 'calc(var(--sait) + 10px)'
          : isWindowed
            ? '55px'
            : `calc(var(--system-header-height) + 5px)`,
      }}
      gap={2}
      auto
      zIndex="QuinoaToast"
      pointerEvents="auto"
    >
      <AnimatePresence>
        {[...toasts].reverse().map((toast: QuinoaToastOptions) => (
          <TimedQuinoaToast key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </McFlex>
  );
};

export default QuinoaToastContainer;
