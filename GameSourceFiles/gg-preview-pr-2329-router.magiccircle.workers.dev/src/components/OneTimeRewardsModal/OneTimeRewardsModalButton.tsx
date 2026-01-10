import { Box } from '@chakra-ui/react';
import { MotionButton, type MotionButtonProps } from '@/components/Motion';
import { RiveErrorBoundary } from '@/components/rive/RiveErrorFallback';
import { useSetIsOneTimeRewardsModalOpen } from '@/store/store';
import Rive_Giftbox from './Giftbox';
import { useClaimedRewards } from './hooks';

interface OneTimeRewardsModalButtonProps extends MotionButtonProps {}

const OneTimeRewardsModalButton: React.FC<OneTimeRewardsModalButtonProps> = (
  props
) => {
  const { hasUnclaimedRewards, isLoading } = useClaimedRewards();
  const setIsOneTimeRewardsModalOpen = useSetIsOneTimeRewardsModalOpen();
  const onClick = () => {
    setIsOneTimeRewardsModalOpen(true);
  };
  if (isLoading || !hasUnclaimedRewards) {
    return null;
  }
  return (
    <MotionButton
      variant="blank"
      minW="40px"
      onClick={onClick}
      transition={{
        duration: 0,
        ease: 'easeOut',
      }}
      whileHover={{
        scale: 1.05,
        filter: 'brightness(1.15)',
      }}
      {...props}
    >
      <Box w="32px" h="32px">
        <RiveErrorBoundary>
          <Rive_Giftbox />
        </RiveErrorBoundary>
      </Box>
    </MotionButton>
  );
};

export default OneTimeRewardsModalButton;
