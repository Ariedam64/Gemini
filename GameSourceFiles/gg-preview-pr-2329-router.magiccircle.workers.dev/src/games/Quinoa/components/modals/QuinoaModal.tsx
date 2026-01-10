import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { isGameWindowedAtom } from '@/components/GameWindow/store';
import McFlex, { type McFlexProps } from '@/components/McFlex/McFlex';
import useIsSmallHeight from '@/hooks/useIsSmallHeight';
import { closeActiveModal } from '@/Quinoa/atoms/modalAtom';

interface QuinoaModalProps extends McFlexProps {
  children: React.ReactNode;
}

const QuinoaModal: React.FC<QuinoaModalProps> = ({ children, ...props }) => {
  const isSmallHeight = useIsSmallHeight();
  const isGameWindowed = useAtomValue(isGameWindowedAtom);
  // Prevent click-through when opening modal via tap/click (e.g., PixiJS
  // buildings, buttons with onPointerDown/onClick). The interaction that opens
  // the modal can trigger clicks and :active highlights on content that appears
  // under the pointer. Disabling pointer-events for one frame prevents this.
  const [pointerEventsEnabled, setPointerEventsEnabled] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setPointerEventsEnabled(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <McFlex
      zIndex={isSmallHeight ? 'AboveGameModal' : 'StandardModal'}
      position="absolute"
      top={isSmallHeight ? '0px' : 'calc(-1 * var(--sait))'}
      left="calc(-1 * var(--sail))"
      width="calc(100% + var(--sail) + var(--sair))"
      height="calc(100% + var(--sait) + var(--saib))"
      pt={
        isSmallHeight
          ? 'calc(var(--sait) + 15px)'
          : isGameWindowed
            ? 'calc(var(--sait) + 60px)'
            : 'calc(var(--sait) + 115px)'
      }
      pb={isSmallHeight ? '10px' : 'calc(var(--saib) + 110px)'}
      px="10px"
      bg="rgba(24, 24, 24, 0.6)"
      overflow="hidden"
      onClick={closeActiveModal}
      orient="top"
      pointerEvents={pointerEventsEnabled ? 'auto' : 'none'}
      {...props}
    >
      {children}
    </McFlex>
  );
};

export default QuinoaModal;
