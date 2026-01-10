import type { ButtonProps } from '@chakra-ui/react';
import BreadIcon from '@/components/Currency/BreadIcon.webp';
import type { StrokedTextProps } from '@/components/StrokedText/StrokedTextProps';
import MagicWidget from '@/components/ui/MagicWidget';
import useBreadModal from '@/components/useBreadModal';
import { useIsUserAuthenticated } from '@/store/store';

interface BreadButtonProps extends ButtonProps {
  amount: number;
  textProps?: StrokedTextProps;
}

const BreadButton: React.FC<BreadButtonProps> = ({
  amount,
  onClick,
  textProps,
  ...rest
}) => {
  const isAuthenticated = useIsUserAuthenticated();
  const showBreadModal = useBreadModal();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isAuthenticated) {
      e.preventDefault();
      e.stopPropagation();
      void showBreadModal();
      return;
    }
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <MagicWidget
      onClick={handleClick}
      iconProps={{ src: BreadIcon, boxSize: '45px' }}
      value={amount}
      buttonProps={{ ...rest }}
      textProps={textProps}
    />
  );
};

export default BreadButton;
