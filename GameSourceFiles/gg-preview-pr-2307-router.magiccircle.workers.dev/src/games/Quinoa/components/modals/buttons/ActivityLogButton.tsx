import { Button } from '@chakra-ui/react';
import { useLingui } from '@lingui/react/macro';
import McTooltip from '@/components/McTooltip/McTooltip';
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen';
import { openActivityLogModal } from '@/Quinoa/atoms/modalAtom';
import Sprite from '../../Sprite';

type ActivityLogButtonProps = {};

const ActivityLogButton: React.FC<ActivityLogButtonProps> = () => {
  const { t } = useLingui();
  const isSmallScreen = useIsSmallScreen();
  const size = isSmallScreen ? '35px' : '40px';

  return (
    <McTooltip label={t`Activity Log`} placement="right" showOnDesktopOnly>
      <Button
        variant="blank"
        h={size}
        w={size}
        borderRadius="full"
        bg="rgba(0, 0, 0, 0.6)"
        color="white"
        onClick={(e) => {
          e.stopPropagation();
          openActivityLogModal();
        }}
        pointerEvents="auto"
      >
        <Sprite spriteName="sprite/ui/ActivityLog" width={size} height={size} />
      </Button>
    </McTooltip>
  );
};

export default ActivityLogButton;
