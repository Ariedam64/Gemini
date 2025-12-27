import { IconButton } from '@chakra-ui/react';
import { t } from '@lingui/core/macro';
import { ArrowLeft, ArrowRight } from 'react-feather';
import { playSoundEffect } from '@/audio/legacy/soundEffects/soundEffect';
import useIsSmallWidth from '@/hooks/useIsSmallWidth';

/**
 * NavigationChevron component for navigating between days in the AvocadoMiniModal.
 *
 * @param {Object} props - The component props
 * @param {string} props.direction - The direction of the chevron ('left' or 'right')
 * @param {() => void} props.onClick - The function to call when the chevron is clicked
 * @param {boolean} props.isDisabled - Whether the chevron should be disabled
 * @param {boolean} props.isVisible - Whether the chevron should be visible
 * @returns {JSX.Element} The NavigationChevron component
 */
export const NavigationArrow: React.FC<{
  direction: 'left' | 'right';
  onClick: () => void;
  isDisabled: boolean;
  isVisible: boolean;
}> = ({ direction, onClick, isDisabled, isVisible }) => {
  const isSmallWidth = useIsSmallWidth();
  const onClickButton = () => {
    playSoundEffect(
      direction === 'left' ? 'Button_Backward_01' : 'Button_Forward_01'
    );
    onClick();
  };

  return (
    <IconButton
      aria-label={t`${direction === 'left' ? t`Previous` : t`Next`} day`}
      icon={
        direction === 'left' ? (
          <ArrowLeft size={isSmallWidth ? 16 : 20} strokeWidth={2} />
        ) : (
          <ArrowRight size={isSmallWidth ? 16 : 20} strokeWidth={2} />
        )
      }
      onClick={onClickButton}
      variant="ghost"
      isDisabled={isDisabled}
      visibility={isVisible ? 'visible' : 'hidden'}
      color="MagicBlack"
      px={0}
      minW={{ base: '20px', sm: '30px' }}
    />
  );
};
