import {
  Box,
  Card,
  type CardProps,
  Circle,
  Grid,
  Text,
} from '@chakra-ui/react';
import type { PlayerOrId } from '@/common/types/player';
import AnimatedNumber, {
  type AnimatedNumberProps,
} from '@/components/AnimatedNumber';
import Avatar from '@/components/Avatars/Avatar';
import avatarDimensions from '@/components/Avatars/avatarDimensions';
import type { AvatarSetAnimation } from '@/components/Avatars/avatarRiveConstants';
import bannerSwimAnimation from '@/components/Avatars/bannerAnimation';
import McFlex from '@/components/McFlex/McFlex';
import { MotionBox } from '@/components/Motion';
import { getPlayerDecoration } from '@/constants/decorations';
import { useBotOrPlayerByPlayerOrId } from '@/store/store';
import { getContrastingColor } from '@/utils/getContrastingColor';

export interface PlayerCardProps extends CardProps {
  playerOrId: PlayerOrId;
  color?: string;
  caption?: string;
  leftNumber?: number;
  rightNumber?: number | AnimatedNumberProps;
  isConnected?: boolean;
  isGrayBackground?: boolean;
  showConnectionStatusIndicator?: boolean;
  avatarAnimation?: AvatarSetAnimation;
  textSize?: 'md' | 'lg';
}

const mdAvatarHitbox = avatarDimensions.md.hitboxSize + 'px';
const mdAvatarContentSize = avatarDimensions.md.contentSize + 'px';

const PlayerCard: React.FC<PlayerCardProps> = ({
  playerOrId,
  color,
  caption,
  leftNumber,
  rightNumber,
  children,
  isConnected = true,
  isGrayBackground = false,
  showConnectionStatusIndicator = false,
  avatarAnimation,
  textSize = 'lg',
  ...rest
}) => {
  const player = useBotOrPlayerByPlayerOrId(playerOrId);

  if (!player) {
    return null;
  }

  let { background, textColor } = getPlayerDecoration(player);

  // HACK: override the background color for the score screen
  if (color) {
    background = color;
    textColor = getContrastingColor(color);
  }

  return (
    <Card
      className="PlayerCard"
      position="relative"
      width="100%"
      height="70px"
      minHeight="70px"
      background={background || 'Neutral.White'}
      animation={bannerSwimAnimation}
      {...rest}
    >
      <MotionBox
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        filter={'grayscale(100%)'}
        background={background || 'Neutral.White'}
        borderRadius="10px"
        initial={{ opacity: isGrayBackground ? 1 : 0 }}
        animate={{ opacity: isGrayBackground ? 1 : 0 }}
      />
      <Grid
        width="100%"
        height="100%"
        templateColumns="auto auto 1fr auto"
        px="15px"
        gap="16px"
      >
        {/* leftNumber */}

        <Box>
          {leftNumber !== undefined && (
            <McFlex w="32px">
              <Text
                color={textColor}
                fontSize="lg"
                fontWeight="bold"
                textAlign="center"
                isTruncated
                maxWidth="100%"
              >
                {leftNumber}
              </Text>
            </McFlex>
          )}
        </Box>

        {/* Avatar */}

        <McFlex width={mdAvatarHitbox} mx="4px">
          <McFlex
            position="absolute"
            bottom="0"
            w={mdAvatarContentSize}
            h={mdAvatarContentSize}
            overflow="hidden"
          >
            <Box
              transform="translateY(26px)"
              filter={!isConnected ? 'grayscale(100%)' : undefined}
            >
              <Avatar
                playerOrId={player}
                size="md"
                animation={avatarAnimation}
                doNotIncrementRefCount={false}
              />
            </Box>
          </McFlex>
        </McFlex>

        {/* name and caption */}

        <McFlex col orient="left" overflow="hidden">
          <McFlex orient="left">
            <Text
              zIndex="1"
              color={textColor}
              fontSize={textSize}
              fontWeight="bold"
              isTruncated
            >
              {player.name}
            </Text>
            {showConnectionStatusIndicator && (
              <Circle
                ml="6px"
                mt={textSize === 'lg' ? '10px' : '4px'}
                size={textSize === 'lg' ? '24px' : '16px'}
                bg={isConnected ? 'Green.Lime' : 'Neutral.DarkGrey'}
              />
            )}
          </McFlex>
          {caption && (
            <McFlex justify="flex-start" mt="-20px">
              <Text color={textColor} variant="subHeader">
                {caption}
              </Text>
            </McFlex>
          )}
        </McFlex>

        {/* rightNumber and children */}

        <McFlex w="auto">
          {typeof rightNumber === 'number' && (
            <Text
              color={textColor}
              fontSize="lg"
              fontWeight="bold"
              textAlign="center"
              minWidth="40px"
              fontFamily="textSlap"
            >
              {rightNumber}
            </Text>
          )}
          {typeof rightNumber === 'object' && (
            <AnimatedNumber
              color={textColor}
              fontSize="lg"
              fontWeight="bold"
              textAlign="center"
              minWidth="40px"
              fontFamily="textSlap"
              {...rightNumber}
            />
          )}
          {children && children}
        </McFlex>
      </Grid>
    </Card>
  );
};

export default PlayerCard;
