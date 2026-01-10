import { Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import type Player from '@/common/types/player';
import type { Avatar as AvatarType } from '@/common/types/player';
import Avatar from '@/components/Avatars/Avatar';
import McFlex from '@/components/McFlex/McFlex';
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen';
import { usePlayer } from '@/store/store';

interface AvatarPreviewProps {
  avatar: AvatarType;
}

const AvatarPreview: React.FC<AvatarPreviewProps> = ({ avatar }) => {
  const player = usePlayer();
  const isSmallScreen = useIsSmallScreen();

  const previewAvatarPlayerData: Player = useMemo(() => {
    return {
      ...player,
      cosmetic: {
        ...player.cosmetic,
        avatar,
      },
      // Override the player id to be a static string for rive file cache
      id: 'avatar-preview',
    };
  }, [...avatar]);

  return (
    <McFlex position="relative" overflow="hidden" pb="34px" orient="bottom">
      <Box
        position="absolute"
        zIndex={1}
        pointerEvents="none"
        transform={`scale(${isSmallScreen ? 1 : 0.7})`}
        transformOrigin="bottom"
      >
        <Avatar
          size={isSmallScreen ? 'lg' : 'xl'}
          playerOrId={previewAvatarPlayerData}
          forceNonStaticAvatar
        />
      </Box>
    </McFlex>
  );
};

export default AvatarPreview;
