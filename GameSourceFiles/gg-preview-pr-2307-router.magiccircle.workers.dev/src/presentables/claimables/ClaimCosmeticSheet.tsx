import {
  Box,
  type BoxProps,
  Button,
  Center,
  Image,
  Text,
} from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import type {
  ClaimableCosmeticInfo,
  GuildClaimableCosmeticInfo,
  StreakClaimableCosmeticInfo,
} from '@/common/resources/avatars/ClaimableCosmeticInfo';
import type { CosmeticType } from '@/common/resources/cosmetics/cosmeticTypes';
import { TranslatedImage } from '@/components/Cosmetics/TranslatedImage';
import McFlex from '@/components/McFlex/McFlex';
import { getCosmeticSrc } from '@/cosmetics/getCosmeticSrc';
import PresentableCloseButton from '../PresentableCloseButton';

// Type guard functions to check cosmetic types
function isGuildCosmetic(
  cosmetic: ClaimableCosmeticInfo
): cosmetic is GuildClaimableCosmeticInfo {
  return cosmetic.type === 'guild';
}

function isStreakCosmetic(
  cosmetic: ClaimableCosmeticInfo
): cosmetic is StreakClaimableCosmeticInfo {
  return cosmetic.type === 'streak';
}

function CosmeticWithGuildIcon({
  cosmetic,
  ...props
}: { cosmetic: ClaimableCosmeticInfo } & BoxProps) {
  const viewportWidth = 'calc(min(70vmin, 400px))';
  const viewportHeight = 'calc(min(70vmin, 400px))';

  const translateY = {
    Top: '65%',
    Mid: '30%',
    Bottom: '-10%',
    Expression: '30%',
    Color: '50%',
  } satisfies Record<CosmeticType, string>;

  const imageSource =
    cosmetic.cosmeticType === 'Mid'
      ? [
          getCosmeticSrc(cosmetic.cosmeticFilename) || '',
          getCosmeticSrc('Expression_Default.png') || '',
        ]
      : getCosmeticSrc(cosmetic.cosmeticFilename) || '';

  return (
    <Box
      position="relative"
      {...props}
      width={viewportWidth}
      height="auto"
      mb="10px"
    >
      <TranslatedImage
        width={viewportWidth}
        height={viewportHeight}
        translateY={translateY[cosmetic.cosmeticType]}
        src={imageSource}
        alt={cosmetic.name}
      />
      {isGuildCosmetic(cosmetic) && cosmetic.guild.icon && (
        <Image
          src={cosmetic.guild.icon}
          alt=""
          position="absolute"
          bottom="20px"
          right="10px"
          width="calc(min(15vmin, 80px))"
          zIndex={1}
          borderRadius="50%"
          objectFit="cover"
        />
      )}
    </Box>
  );
}

interface ClaimableCosmeticProps {
  claimableCosmetic: ClaimableCosmeticInfo;
  onAccept: () => void;
  onWear: () => void;
}

const ClaimCosmeticSheet: React.FC<ClaimableCosmeticProps> = ({
  claimableCosmetic: cosmetic,
  onAccept,
  onWear,
}) => {
  // Generate description text based on cosmetic type
  const getDescriptionText = () => {
    if (isGuildCosmetic(cosmetic)) {
      return (
        <Text fontSize="md" zIndex={1} maxWidth="100vw" px="10px">
          <Trans>
            for being a member of{' '}
            <Text as="span" fontSize="md" fontWeight="bold">
              {cosmetic.guild.name}
            </Text>
          </Trans>
        </Text>
      );
    } else if (isStreakCosmetic(cosmetic)) {
      return (
        <Text fontSize="md" zIndex={1} maxWidth="100vw" px="10px">
          <Trans>
            for maintaining a{' '}
            <Text as="span" fontSize="md" fontWeight="bold">
              {cosmetic.requiredStreakCount}-day
            </Text>{' '}
            streak
          </Trans>
        </Text>
      );
    }
    return null;
  };

  return (
    <McFlex col>
      <Center
        flexDirection="column"
        textAlign="center"
        width="100%"
        overflow="hidden"
        position="relative"
        marginTop="-20vh"
      >
        <PresentableCloseButton top="25%" right="15px" position="absolute" />{' '}
        {/* Adjust close button position */}
        {/* Cosmetic image component takes props */}
        <CosmeticWithGuildIcon cosmetic={cosmetic} />
        <Text fontSize="lg" zIndex={1}>
          <Trans>YOU UNLOCKED</Trans>
        </Text>
        <Text
          variant="textSlapper-default"
          my="10px"
          fontSize="4xl"
          zIndex={1}
          maxWidth="90vw" // Constrain text width slightly
          px="10px"
        >
          {cosmetic.name}
        </Text>
        {getDescriptionText()}
        {/* Buttons section */}
        <McFlex gap="10px" mt="20px" height="auto" width="auto">
          {' '}
          {/* Adjust margin top */}
          <Button onClick={onWear}>
            <Trans>Wear Now</Trans>
          </Button>
          <Button variant="outline" onClick={onAccept}>
            <Trans>Accept</Trans>
          </Button>
        </McFlex>
      </Center>
    </McFlex>
  );
};

export default ClaimCosmeticSheet;
