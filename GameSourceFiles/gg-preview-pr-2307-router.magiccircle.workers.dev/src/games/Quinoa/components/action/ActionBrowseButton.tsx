import { Icon, IconButton } from '@chakra-ui/react';
import { useLingui } from '@lingui/react/macro';
import { ChevronLeft, ChevronRight } from 'react-feather';
import McTooltip from '@/components/McTooltip/McTooltip';

interface ActionBrowsButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
}

const ActionBrowseButton: React.FC<ActionBrowsButtonProps> = ({
  direction,
  onClick,
}) => {
  const { t } = useLingui();
  const icon = direction === 'left' ? ChevronLeft : ChevronRight;
  const ariaLabel = direction === 'left' ? t`Previous [x]` : t`Next [c]`;

  return (
    <McTooltip
      label={ariaLabel}
      placement={direction === 'left' ? 'left' : 'right'}
      showOnDesktopOnly
    >
      <IconButton
        icon={<Icon as={icon} boxSize="20px" />}
        onClick={onClick}
        size="sm"
        aria-label={ariaLabel}
        variant="solid"
        borderRadius="full"
        bg="rgba(0, 0, 0, 0.65)"
        _hover={{ bg: 'rgba(0, 0, 0, 0.9)' }}
        pointerEvents="auto"
      />
    </McTooltip>
  );
};

export default ActionBrowseButton;
