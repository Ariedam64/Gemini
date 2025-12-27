import { useState } from 'react';
import { Alignment, Fit, Layout } from '@rive-app/react-canvas';
import useMcRive from '@/hooks/useMcRive';
import giftboxRiveFile from './giftbox.riv?url';

interface Rive_GiftboxProps {}

/**
 * A component that renders an animated giftbox using Rive.
 * @param {Rive_GiftboxProps} props - The component props.
 * @returns {JSX.Element} The rendered Rive_Giftbox component.
 */
const Rive_Giftbox: React.FC<Rive_GiftboxProps> = () => {
  const [resetKey, setResetKey] = useState(false);

  const { rive, RiveComponent } = useMcRive({
    src: giftboxRiveFile,
    stateMachines: 'State Machine 1',
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
    autoplay: false,
  });

  return (
    <RiveComponent
      key={resetKey ? 1 : 0}
      onMouseEnter={() => {
        if (!rive) {
          return;
        }
        rive.play();
      }}
      onMouseLeave={() => {
        setResetKey((prev) => !prev);
      }}
    />
  );
};

export default Rive_Giftbox;
