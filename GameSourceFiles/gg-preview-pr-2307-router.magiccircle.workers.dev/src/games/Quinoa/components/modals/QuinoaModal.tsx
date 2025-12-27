import { useAtomValue } from 'jotai';
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
      {...props}
    >
      {children}
    </McFlex>
  );
};

export default QuinoaModal;
