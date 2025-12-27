import type Player from '@/common/types/player';
import Avatar, { type AvatarSize } from '@/components/Avatars/Avatar';
import McFlex from '@/components/McFlex/McFlex';
import { MotionBox } from '@/components/Motion';
import type { AvatarSetAnimation } from './avatarRiveConstants';

interface AvatarPackProps {
  players: { player: Player; animation?: AvatarSetAnimation }[];
  size?: AvatarSize;
}

const AvatarPack: React.FC<AvatarPackProps> = ({ players, size = 'md' }) => {
  const sizeMap: Record<AvatarSize, { x: number; y: number }> = {
    xl: { x: 135, y: -15 },
    lg: { x: 120, y: -10 },
    marge: { x: 120, y: -10 },
    md: { x: 60, y: -10 },
    sm: { x: 45, y: -7 },
    xs: { x: 30, y: -5 },
    chip: { x: 30, y: -5 },
  };

  const styles = [
    { x: sizeMap[size].x, y: sizeMap[size].y, rotate: 14 },
    { x: -sizeMap[size].x, y: sizeMap[size].y, rotate: -14 },
    { x: 0, y: -sizeMap[size].y - 30, rotate: 0 },
  ];

  // Reverse players so that the host shows up on top and animates in last
  const reversedPlayers = players.slice(0, 3).reverse();
  // TODO: make this code more intuitive
  // It allows the correct style to be applied to each avatar whether there are 1, 2, or 3 players
  const slicedStyles = styles.slice(3 - reversedPlayers.length, 3);

  return (
    <McFlex h="auto" position="absolute">
      {reversedPlayers.map((player, index) => (
        <MotionBox
          key={player.player.id}
          position="absolute"
          initial={{ x: 0, y: 70, rotate: 0 }}
          animate={slicedStyles[index]}
          transition={{ delay: 0.05 * index }}
        >
          <Avatar
            playerOrId={player.player}
            size={size}
            animation={player.animation}
            forceNonStaticAvatar={true}
          />
        </MotionBox>
      ))}
    </McFlex>
  );
};

export default AvatarPack;
