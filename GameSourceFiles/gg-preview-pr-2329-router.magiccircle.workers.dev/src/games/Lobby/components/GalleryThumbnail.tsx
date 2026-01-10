import { Box, Text } from '@chakra-ui/layout';
import { Button, useToken } from '@chakra-ui/react';
import type { GameName } from '@/common/types/games';
import McFlex from '@/components/McFlex/McFlex';
import NotificationBadge from '@/components/NotificationBadge/NotificationBadge';
import gameMetaDatas from '@/games/gameMetaDatas';
import { useCurrentGameName, useIsUserAuthenticated } from '@/store/store';

interface GalleryThumbnailProps {
  onClick: () => void;
  gameName: GameName;
  isActive: boolean;
  numIncompleteTasks?: number;
}

const GalleryThumbnail: React.FC<GalleryThumbnailProps> = ({
  onClick,
  gameName,
  numIncompleteTasks,
  isActive,
}) => {
  const metaData = gameMetaDatas[gameName];

  const { name, thumbnailImage, secondaryAccentColor, primaryAccentColor } =
    metaData;

  const [primary, secondary] = useToken('colors', [
    primaryAccentColor,
    secondaryAccentColor,
  ]);
  const isAuthenticated = useIsUserAuthenticated();
  const currentGameName = useCurrentGameName();

  const showNotificationBadge =
    isAuthenticated &&
    numIncompleteTasks !== undefined &&
    numIncompleteTasks > 0;

  return (
    <Button
      variant="blank"
      data-testid={`game-thumbnail-${gameName}`}
      onClick={onClick}
      position="relative"
      my={1}
      aspectRatio="1/1"
      minW={{ base: '60px', sm: '70px', md: '80px' }}
      w={{ base: '60px', sm: '70px', md: '80px' }}
      filter={
        currentGameName === gameName || currentGameName === 'Lobby'
          ? 'brightness(1)'
          : 'brightness(0.4)'
      }
    >
      {showNotificationBadge && (
        <NotificationBadge numIncompleteTasks={numIncompleteTasks} />
      )}
      <Box
        h="100%"
        w="100%"
        style={{
          backgroundImage: isActive
            ? `linear-gradient(#3c3e4b, #1F2029), linear-gradient(to bottom, ${primary}, ${secondary})`
            : undefined,
          backgroundOrigin: 'border-box',
          backgroundClip: 'content-box, border-box',
        }}
        borderColor="transparent"
        borderWidth={{ base: '2px', sm: '3px', md: '4px' }}
        borderRadius="20px"
        bg="linear-gradient(180deg, rgba(31, 32, 41, 0.45) 0%, rgba(31, 32, 41, 0.55) 100%)"
        overflow="hidden"
        position="relative"
      >
        <McFlex
          orient="bottom"
          background={`url("${thumbnailImage}")`}
          backgroundColor={metaData.primaryAccentColor}
          backgroundSize="cover"
          objectFit="cover"
        >
          <McFlex h="35%" position="relative">
            <McFlex
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bg="MagicBlack"
              opacity={0.7}
            />
            <Text
              fontWeight="bold"
              fontSize={{ base: '38%', sm: '45%', md: '50%' }}
              color="MagicWhite"
              position="relative"
              zIndex={1}
              px={1}
              py={1}
              lineHeight="1"
            >
              {name}
            </Text>
          </McFlex>
        </McFlex>
      </Box>
    </Button>
  );
};

export default GalleryThumbnail;
