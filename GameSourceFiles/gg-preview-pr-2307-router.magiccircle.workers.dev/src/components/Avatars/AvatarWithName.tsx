import McFlex from '@/components/McFlex/McFlex';
import StrokedText from '@/components/StrokedText/StrokedText';
import { getDecoration } from '@/constants/decorations';
import { useBotOrPlayerByPlayerOrId } from '@/store/store';
import { truncatePlayerName } from '@/utils/truncatePlayerName';
import Avatar, { type AvatarProps } from './Avatar';

export type AvatarWithNameProps = AvatarProps & {
  isNameBackgroundFilled?: boolean;
  nameOverride?: string;
};

const AvatarWithName: React.FC<AvatarWithNameProps> = ({
  playerOrId,
  size,
  avatarOverride,
  isNameBackgroundFilled = false,
  nameOverride,
  ...restAvatarProps
}) => {
  const botOrPlayer = useBotOrPlayerByPlayerOrId(playerOrId);

  if (!botOrPlayer) {
    return null;
  }

  const { backgroundColor, textColor } = getDecoration(
    botOrPlayer.cosmetic.color
  );

  return (
    <McFlex col w="auto" h="auto" position="relative">
      <Avatar
        playerOrId={botOrPlayer}
        size={size}
        avatarOverride={avatarOverride}
        {...restAvatarProps}
      />
      <McFlex
        w="auto"
        h="29.5px"
        bg={isNameBackgroundFilled ? backgroundColor : 'transparent'}
        borderRadius="15px"
        px={4}
      >
        <StrokedText
          strokeWidth={4}
          strokeColor={backgroundColor}
          textAlign="center"
          color={textColor}
          fontSize={size}
          fontWeight="bold"
          transform="translateY(5%)"
          // zIndex={1}
        >
          {nameOverride || truncatePlayerName(botOrPlayer.name)}
        </StrokedText>
      </McFlex>
    </McFlex>
  );
};

export default AvatarWithName;
