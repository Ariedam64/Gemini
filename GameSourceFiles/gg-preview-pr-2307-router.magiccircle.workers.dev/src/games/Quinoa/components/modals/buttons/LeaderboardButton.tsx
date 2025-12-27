import { Button } from '@chakra-ui/react';
import { t } from '@lingui/core/macro';
import { ItemsTile } from '@/common/games/Quinoa/world/tiles';
import McTooltip from '@/components/McTooltip/McTooltip';
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen';
import { setActiveModal } from '@/Quinoa/atoms/modalAtom';
import Sprite from '@/Quinoa/components/Sprite';

type LeaderboardButtonProps = {};

const LeaderboardButton: React.FC<LeaderboardButtonProps> = () => {
  const isSmallScreen = useIsSmallScreen();
  const size = isSmallScreen ? '35px' : '40px';

  return (
    <McTooltip label={t`Leaderboard`} placement="right" showOnDesktopOnly>
      <Button
        variant="blank"
        h={size}
        w={size}
        borderRadius="full"
        bg="rgba(0, 0, 0, 0.6)"
        onClick={(e) => {
          e.stopPropagation();
          setActiveModal('leaderboard');
        }}
        pointerEvents="auto"
      >
        <Sprite spriteName="sprite/ui/Leaderboard" width={size} height={size} />
      </Button>
    </McTooltip>
  );
};

export default LeaderboardButton;
