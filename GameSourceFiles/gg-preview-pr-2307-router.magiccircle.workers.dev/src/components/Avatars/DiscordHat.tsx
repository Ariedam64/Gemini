import { Box, type BoxProps, Image } from '@chakra-ui/react';
import type { PlayerOrId } from '@/common/types/player';
import { getCosmeticSrc } from '@/cosmetics/getCosmeticSrc';
import { usePlayerByPlayerOrId } from '@/store/store';

interface DiscordHatProps extends BoxProps {
  playerOrId: PlayerOrId;
}

const DiscordHat: React.FC<DiscordHatProps> = ({ playerOrId, ...rest }) => {
  const player = usePlayerByPlayerOrId(playerOrId);

  return (
    <Box position="relative" {...rest}>
      <Image
        position="relative"
        src={getCosmeticSrc('Top_DiscordPopsicle.png')}
        alt="Discord Hat"
        zIndex={1}
      />
      <Image
        src={player?.discordAvatarUrl ?? undefined}
        position="absolute"
        top="-31%"
        transform="translateX(-1px) rotate(-9deg) scale(.215)"
      />
    </Box>
  );
};

export default DiscordHat;
