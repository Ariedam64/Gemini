import type Player from '@/common/types/player';
import PeekingAvatar from './PeekingAvatar';

interface PeekingAvatarsProps {
  players: Player[];
}

const PeekingAvatars: React.FC<PeekingAvatarsProps> = ({ players }) => {
  return (
    <>
      {players.map((player) => (
        <PeekingAvatar key={player.id} player={player} />
      ))}
    </>
  );
};

export default PeekingAvatars;
