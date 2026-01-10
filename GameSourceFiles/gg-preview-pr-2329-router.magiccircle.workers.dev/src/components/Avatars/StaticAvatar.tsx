import { Image } from '@chakra-ui/react';
import McFlex from '@/components/McFlex/McFlex';
import { getCosmeticSrc } from '@/cosmetics/getCosmeticSrc';

export interface StaticAvatarProps {
  avatar: readonly string[];
  discordAvatarUrl: string | null;
}

const StaticAvatar: React.FC<StaticAvatarProps> = ({
  avatar,
  discordAvatarUrl,
}) => {
  return (
    <McFlex position="relative">
      {avatar.map((url) => (
        <Image
          key={url}
          src={getCosmeticSrc(url)}
          alt="Avatar Element"
          position="absolute"
          w="100%"
          h="100%"
        />
      ))}
      {avatar[2] === 'Top_DiscordPopsicle.png' && discordAvatarUrl && (
        <Image
          src={discordAvatarUrl}
          alt="Discord Avatar"
          position="absolute"
          w="20%"
          h="20%"
          transform="translate(-2%, -155%) rotate(-8deg)"
        />
      )}
    </McFlex>
  );
};

export default StaticAvatar;
