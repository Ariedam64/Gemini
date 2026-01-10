import { useEffect } from 'react';
import {
  Alignment,
  EventType,
  Fit,
  Layout,
  LayoutParameters,
} from '@rive-app/react-canvas';
import useMcRive from '@/hooks/useMcRive';
import useMcRiveStateMachine from '@/hooks/useMcRiveStateMachine';
import donutPurchaseRiveFile from './donuts_purchased.riv?url';

export interface Rive_DonutToasterProps {
  isShootingDonuts: boolean;
  onComplete?: () => void;
  riveLayoutParameters?: LayoutParameters;
}

const Rive_DonutToaster: React.FC<Rive_DonutToasterProps> = ({
  isShootingDonuts,
  onComplete,
  riveLayoutParameters,
}) => {
  const { rive, RiveComponent } = useMcRive({
    src: donutPurchaseRiveFile,
    stateMachines: 'State Machine 1',
    layout: new Layout(
      riveLayoutParameters ?? {
        fit: Fit.Cover,
        alignment: Alignment.Center,
      }
    ),
    autoplay: true,
  });

  const { fireTrigger } = useMcRiveStateMachine(rive, 'State Machine 1');

  useEffect(() => {
    if (!isShootingDonuts) {
      fireTrigger('Shutdown');
    }
  }, [isShootingDonuts, fireTrigger]);

  useEffect(() => {
    if (rive && onComplete) {
      // the rive file only has one event called Complete which is fired when the component exits
      // if we add more events in the future, call Rob for help.
      rive.on(EventType.RiveEvent, onComplete);
    }
    return () => {
      rive?.removeAllRiveEventListeners(EventType.RiveEvent);
    };
  }, [rive]);

  return <RiveComponent />;
};

export default Rive_DonutToaster;
