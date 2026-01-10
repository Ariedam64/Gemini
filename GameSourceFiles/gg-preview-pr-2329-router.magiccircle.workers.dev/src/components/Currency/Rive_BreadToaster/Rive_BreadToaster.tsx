import { useEffect } from 'react';
import {
  Alignment,
  EventType,
  Fit,
  Layout,
  LayoutParameters,
} from '@rive-app/react-canvas';
import toasterRiveFile from './breadToaster.riv?url';
import useMcRive from '@/hooks/useMcRive';
import useMcRiveStateMachine from '@/hooks/useMcRiveStateMachine';

export interface Rive_BreadToasterProps {
  isShootingBread: boolean;
  onComplete?: () => void;
  riveLayoutParameters?: LayoutParameters;
}

const Rive_BreadToaster: React.FC<Rive_BreadToasterProps> = ({
  isShootingBread,
  onComplete,
  riveLayoutParameters,
}) => {
  const { rive, RiveComponent } = useMcRive({
    src: toasterRiveFile,
    stateMachines: 'State Machine 1',
    layout: new Layout(
      riveLayoutParameters ?? {
        fit: Fit.Cover,
        alignment: Alignment.Center,
      }
    ),
    autoplay: true,
  });

  useMcRiveStateMachine(rive, 'State Machine 1', {
    isShootingBread,
  });

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

export default Rive_BreadToaster;
