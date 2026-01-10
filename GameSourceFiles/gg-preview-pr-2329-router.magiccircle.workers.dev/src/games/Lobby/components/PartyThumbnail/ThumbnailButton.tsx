import { Button, Heading, Image, Text } from '@chakra-ui/react';
import { t } from '@lingui/core/macro';
import { Fragment } from 'react/jsx-runtime';
import { GameStatus } from '@/common/config/config';
import type { GameName } from '@/common/types/games';
import McFlex from '@/components/McFlex/McFlex';
import { useConfig } from '@/config';
import gameMetaDatas from '@/games/gameMetaDatas';
import useIsSmallHeight from '@/hooks/useIsSmallHeight';
import { useThemeColorAsRGBA } from '@/theme/colors';

interface ThumbnailButtonProps {
  gameName: GameName;
}

const ThumbnailButton: React.FC<ThumbnailButtonProps> = ({ gameName }) => {
  const { thumbnailImage, secondaryAccentColor, elevatorPitch, taglines } =
    gameMetaDatas[gameName];
  const secondaryColorRGBA = useThemeColorAsRGBA(secondaryAccentColor);
  const gameStatuses = useConfig().root_gameStatuses;
  const status = gameStatuses[gameName];
  const isSmallHeight = useIsSmallHeight();

  return (
    <Button
      aria-label={t`${gameName} Thumbnail Button`}
      variant="blank"
      cursor="default"
      position="relative"
      filter={status === GameStatus.ComingSoon ? 'brightness(0.7)' : ''}
      borderRadius="20px"
      borderBottom="6px solid rgba(86, 75, 75, 0.814)"
      boxShadow="0 6px 0 rgba(0, 0, 0, 0.183)"
      w="100%"
      h="100%"
      overflow="hidden"
    >
      <Image
        position="absolute"
        top="0"
        left="0"
        src={thumbnailImage}
        objectFit="cover"
        objectPosition="middle"
        alt={`${gameName} Thumbnail`}
        borderRadius="20px"
        zIndex={-1}
      />
      <McFlex orient="bottom">
        <McFlex autoH col bg="rgba(46, 48, 64, 0.7)">
          <Heading
            pt={4}
            px={2}
            fontFamily="shrikhand"
            fontSize={isSmallHeight ? 'lg' : '2xl'}
          >
            {gameMetaDatas[gameName].name}
          </Heading>
          <McFlex py={{ base: 1.5, md: 2 }} px={{ base: 8, md: 16 }} autoH>
            <Text
              align="center"
              fontSize={isSmallHeight ? '12px' : '16px'}
              fontWeight="light"
            >
              {elevatorPitch}
            </Text>
          </McFlex>
          <McFlex pb={6} autoH>
            <Text color={secondaryColorRGBA} fontWeight="bold" fontSize="xs">
              {taglines?.map((tagline, i) => (
                <Fragment key={i}>
                  {i > 0 && ' • '}
                  {tagline}
                </Fragment>
              ))}
            </Text>
          </McFlex>
        </McFlex>
      </McFlex>
    </Button>
  );
};

export default ThumbnailButton;
