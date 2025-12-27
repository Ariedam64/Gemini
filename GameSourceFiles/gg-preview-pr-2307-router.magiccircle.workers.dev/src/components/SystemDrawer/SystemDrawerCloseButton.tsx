import {
  DrawerCloseButton,
  IconButton,
  IconButtonProps,
} from '@chakra-ui/react';
import { t } from '@lingui/core/macro';
import { X } from 'react-feather';

interface SystemDrawerCloseButtonProps {
  onClick?: () => void;
  asComponent?: Element | null;
  right?: string | number;
}

const SystemDrawerCloseButton: React.FC<
  SystemDrawerCloseButtonProps & Partial<IconButtonProps>
> = ({ onClick, asComponent, right, ...props }) => {
  const Component = asComponent === null ? undefined : DrawerCloseButton; // Use specified component or DrawerCloseButton by default
  return (
    <IconButton
      icon={<X size="32px" />}
      as={Component}
      onClick={() => onClick?.()}
      aria-label={t`Close`}
      data-testid="system-drawer-close-button"
      variant="translucentOutlineButton"
      position="absolute"
      top="10px"
      left={right ? undefined : '10px'}
      right={right}
      zIndex={2}
      {...props}
    />
  );
};

export default SystemDrawerCloseButton;
