import McFlex from '@/components/McFlex/McFlex';
import { useCurrentGameName } from '@/store/store';
import PeekingAvatarWindow from './PeekingAvatarWindow';

type EmoteLayerProps = {};

const EmoteWindow: React.FC<EmoteLayerProps> = () => {
  const currentGameName = useCurrentGameName();

  return (
    <McFlex
      id="EmoteWindow"
      position="absolute"
      pointerEvents="none"
      zIndex="EmoteWindow"
      left="35px"
    >
      {currentGameName !== 'Kiwi' && <PeekingAvatarWindow />}
    </McFlex>
  );
};

export default EmoteWindow;
