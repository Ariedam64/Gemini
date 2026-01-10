import { Button, type ButtonProps, Icon as ChakraIcon } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { useAtomValue } from 'jotai';
import type { Icon } from 'react-feather';
import McTooltip from '@/components/McTooltip/McTooltip';
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen';
import {
  isMyGardenButtonHighlightedAtom,
  isSellButtonHighlightedAtom,
  isShopButtonHighlightedAtom,
} from '@/Quinoa/atoms/taskAtoms';
import TutorialHighlight from '../inventory/TutorialHighlight';

interface NavButtonProps extends ButtonProps {
  tooltip: string;
  label: string;
  icon: Icon;
  onClick: () => void;
  bg: string;
}

const NavButton: React.FC<NavButtonProps> = ({
  tooltip,
  label,
  icon,
  onClick,
  bg,
  ...props
}) => {
  const isSmallScreen = useIsSmallScreen();
  const isMyGardenButtonHighlighted = useAtomValue(
    isMyGardenButtonHighlightedAtom
  );
  const isSellButtonHighlighted = useAtomValue(isSellButtonHighlightedAtom);
  const isShopButtonHighlighted = useAtomValue(isShopButtonHighlightedAtom);

  const isHighlighted =
    (label === 'Sell' && isSellButtonHighlighted) ||
    (label === 'Shop' && isShopButtonHighlighted) ||
    (label === 'My Garden' && isMyGardenButtonHighlighted);

  return (
    <TutorialHighlight isActive={isHighlighted} direction="up" showScrim>
      <McTooltip label={tooltip} placement="bottom" showOnDesktopOnly>
        <Button
          onClick={onClick}
          px={isSmallScreen ? 1 : 3}
          w="100%"
          h={isSmallScreen ? '35px' : '40px'}
          fontSize={isSmallScreen ? '10px' : '14px'}
          bg={bg}
          borderRadius="10px"
          borderBottom="3px solid rgba(0,0,0,0.4)"
          _active={{
            borderBottomWidth: '1px',
            borderBottomColor: 'rgba(0,0,0,0.2)',
            boxShadow: 'inset 0 3px 2px rgba(0,0,0,0.2)',
          }}
          _hover={{
            transform: 'scale(1.02)',
            transition: 'transform 0.2s ease',
          }}
          style={{
            WebkitTapHighlightColor: 'transparent',
          }}
          gap={isSmallScreen ? 1 : 2}
          {...props}
        >
          <ChakraIcon as={icon} />
          <Trans>{label}</Trans>
        </Button>
      </McTooltip>
    </TutorialHighlight>
  );
};

export default NavButton;
