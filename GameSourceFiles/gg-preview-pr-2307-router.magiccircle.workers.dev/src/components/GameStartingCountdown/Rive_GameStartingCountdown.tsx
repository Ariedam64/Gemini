import { useEffect } from 'react';
import { Fit, Layout } from '@rive-app/react-canvas';
import { stopPlayingAllMusic } from '@/audio/legacy/music/music';
import { playSoundEffect } from '@/audio/legacy/soundEffects/soundEffect';
import useMcRive from '@/hooks/useMcRive';
import RiveFile from './mc_countdown_01.riv?url';

interface Rive_GameStartingCountdownProps {}

const Rive_GameStartingCountdown: React.FC<
  Rive_GameStartingCountdownProps
> = () => {
  useEffect(() => {
    stopPlayingAllMusic();
    playSoundEffect('CountdownTimer_01');
  }, []);

  const { RiveComponent } = useMcRive({
    src: RiveFile,
    layout: new Layout({
      fit: Fit.Cover,
    }),
    autoplay: true,
  });

  return <RiveComponent />;
};

export default Rive_GameStartingCountdown;
