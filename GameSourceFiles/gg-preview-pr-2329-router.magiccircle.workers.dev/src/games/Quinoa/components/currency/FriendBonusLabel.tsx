import { Box } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { useAtomValue } from 'jotai';
import McTooltip from '@/components/McTooltip/McTooltip';
import StrokedText from '@/components/StrokedText/StrokedText';
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen';
import { friendBonusMultiplierAtom } from '@/Quinoa/atoms/miscAtoms';
import strokedTextSizeConfigs from '@/Quinoa/constants/strokedTextSizeConfigs';

/**
 * A component for displaying the friend bonus percentage with consistent styling.
 */
const FriendBonusLabel: React.FC = () => {
  const friendBonusMultiplier = useAtomValue(friendBonusMultiplierAtom);
  const isSmallScreen = useIsSmallScreen();
  const size = isSmallScreen ? 'sm' : 'md';
  const config = strokedTextSizeConfigs[size];
  const bonusPercentage = (friendBonusMultiplier - 1) * 100;

  return (
    <McTooltip
      label={<Trans>+10% sell price per friend in room</Trans>}
      placement="top"
      keepOpenOnDesktopClick
    >
      <Box pointerEvents="auto">
        <StrokedText
          fontStyle="italic"
          strokeWidth={config.strokeWidth}
          fontSize={config.fontSize}
          shadowHeight={0}
          fontWeight="bold"
          color="Orange.Tangerine"
          strokeColor="Orange.Dark"
          whiteSpace="nowrap"
        >
          <Trans>Friend Bonus: +{bonusPercentage.toFixed(0)}%</Trans>
        </StrokedText>
      </Box>
    </McTooltip>
  );
};

export default FriendBonusLabel;
