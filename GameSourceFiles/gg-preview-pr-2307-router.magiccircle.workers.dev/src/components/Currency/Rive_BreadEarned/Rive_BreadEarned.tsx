import { useEffect } from 'react';
import { Alignment, Fit } from '@rive-app/canvas';
import { Layout } from '@rive-app/react-canvas';
import { platform } from '@/environment';
import useMcRive from '@/hooks/useMcRive';
import { useDesktopWindowScaleFactor } from '@/store/store';
import breadEarnedRiveFile from './bread_earned.riv?url';

interface Rive_BreadEarnedProps {
  amount: number;
}

const Rive_BreadEarned: React.FC<Rive_BreadEarnedProps> = ({ amount }) => {
  const desktopWindowScaleFactor = useDesktopWindowScaleFactor();
  const { rive, RiveComponent } = useMcRive({
    src: breadEarnedRiveFile,
    stateMachines: 'State Machine 1',
    layout: new Layout({
      fit: Fit.Layout,
      alignment: Alignment.Center,
      layoutScaleFactor:
        platform === 'mobile' ? 0.5 : 0.75 * desktopWindowScaleFactor,
    }),
    autoplay: false,
  });

  useEffect(() => {
    if (rive) {
      const amountString = amount.toString();
      rive.setTextRunValue('text_fill', amountString);
      rive.setTextRunValue('text_stroke', amountString);
      rive.play();
    }
  }, [rive, amount]);
  return <RiveComponent />;
};

export default Rive_BreadEarned;
