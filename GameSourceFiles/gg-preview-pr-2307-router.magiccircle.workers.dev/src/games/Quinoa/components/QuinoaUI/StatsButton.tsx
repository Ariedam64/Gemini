import { Button } from '@chakra-ui/react';
import { t } from '@lingui/core/macro';
import McTooltip from '@/components/McTooltip/McTooltip';
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen';
import { setActiveModal } from '@/Quinoa/atoms/modalAtom';
import Sprite from '../Sprite';

type StatsButtonProps = {};

const StatsButton: React.FC<StatsButtonProps> = () => {
  const isSmallScreen = useIsSmallScreen();
  const size = isSmallScreen ? '35px' : '40px';

  return (
    <McTooltip label={t`Stats`} placement="right" showOnDesktopOnly>
      <Button
        variant="blank"
        h={size}
        w={size}
        borderRadius="full"
        bg="rgba(0, 0, 0, 0.6)"
        color="white"
        onClick={(e) => {
          e.stopPropagation();
          setActiveModal('stats');
        }}
        aria-label={t`Stats`}
        pointerEvents="auto"
      >
        <Sprite spriteName="sprite/ui/Stats" width={size} height={size} />
      </Button>
    </McTooltip>
  );
};

export default StatsButton;
