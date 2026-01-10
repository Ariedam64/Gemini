import { Box } from '@chakra-ui/layout';
import Avatar, { type AvatarProps } from '@/components/Avatars/Avatar';
import McFlex, { type McFlexProps } from '@/components/McFlex/McFlex';
import { getDecoration } from '@/constants/decorations';
import { useBotOrPlayerByPlayerOrId } from '@/store/store';

export interface AvatarTokenProps {
  containerProps?: McFlexProps;
  avatarProps: AvatarProps;
}

const AvatarToken: React.FC<AvatarTokenProps> = ({
  containerProps,
  avatarProps,
}) => {
  const player = useBotOrPlayerByPlayerOrId(avatarProps.playerOrId);
  if (!player) {
    return null;
  }
  const { backgroundColor } = getDecoration(player.cosmetic.color);

  return (
    <McFlex
      position="relative"
      background={backgroundColor}
      borderRadius="full"
      overflow="hidden"
      h="42px"
      w="42px"
      {...containerProps}
    >
      <Box position="absolute" top={1}>
        <Avatar shouldRenderStaticAvatar={true} size="xs" {...avatarProps} />
      </Box>
    </McFlex>
  );
};

export default AvatarToken;
