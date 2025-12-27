import { useMemo } from 'react';
import type Player from '@/common/types/player';
import McGrid from '@/components/McGrid/McGrid';
import { usePlayers } from '@/store/store';
import PeekingAvatars from './PeekingAvatars';

type PeekingAvatarWindowProps = {};

const PeekingAvatarWindow: React.FC<PeekingAvatarWindowProps> = () => {
  const players = usePlayers();
  const height = 150;

  const peekingPlayers = useMemo(() => {
    const peekingPlayers: Player[] = [];
    players.forEach((player) => {
      peekingPlayers.push(player);
    });
    return peekingPlayers;
  }, [players]);

  return (
    <McGrid
      id="peekingPlayers"
      templateRows={`repeat(${peekingPlayers.length}, minmax(auto, ${height}px))`}
      mt="15%"
      mb="6%"
      h="79%"
      px="15px"
      position="absolute"
    >
      <PeekingAvatars players={peekingPlayers} />
    </McGrid>
  );
};

export default PeekingAvatarWindow;
