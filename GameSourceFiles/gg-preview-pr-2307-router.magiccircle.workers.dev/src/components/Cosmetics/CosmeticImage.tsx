import { Box, Image } from '@chakra-ui/react';
import type { CosmeticType } from '@/common/resources/cosmetics/cosmeticTypes';
import DiscordHat from '@/components/Avatars/DiscordHat';
import McFlex from '@/components/McFlex/McFlex';
import { cosmeticRenderingDetails } from '@/cosmetics/cosmeticRenderingDetails';
import { getCosmeticSrc } from '@/cosmetics/getCosmeticSrc';
import { usePlayerId } from '@/store/store';

interface CosmeticImageProps {
  type: CosmeticType;
  filename: string;
  avatar?: readonly string[];
}

const CosmeticImage: React.FC<CosmeticImageProps> = ({
  type,
  filename,
  avatar,
}) => {
  const myId = usePlayerId();
  const { framingTransform } = cosmeticRenderingDetails[type];

  return (
    <Box position="relative">
      {type === 'Expression' && avatar && (
        <McFlex position="absolute" overflow="hidden">
          <Image
            position="absolute"
            src={getCosmeticSrc(avatar[1])}
            alt="face"
            transform={framingTransform}
          />
        </McFlex>
      )}

      {filename !== 'Top_DiscordPopsicle.png' && (
        <Image
          position="relative"
          src={getCosmeticSrc(filename)}
          alt={filename}
          transform={framingTransform}
        />
      )}

      {filename === 'Top_DiscordPopsicle.png' && (
        <DiscordHat playerOrId={myId} transform={framingTransform} />
      )}
    </Box>
  );
};

export default CosmeticImage;
