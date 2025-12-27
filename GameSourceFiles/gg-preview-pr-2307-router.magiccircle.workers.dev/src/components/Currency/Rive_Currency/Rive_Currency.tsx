import { Alignment, Fit, Layout } from '@rive-app/react-canvas';
import useMcRive from '@/hooks/useMcRive';
import useMcRiveStateMachine from '@/hooks/useMcRiveStateMachine';
import { useTimeout } from '@/utils';
import currencyRiveFile from './currency.riv?url';

export enum Rive_CurrencyState {
  Idle = 0,
  Amazed = 1,
  Outro = 2,
}

interface Rive_CurrencyProps {
  currencyState?: Rive_CurrencyState;
  /**
   * Whether the currency is a donut or a bread.
   * @default false
   */
  isDonut?: boolean;
}

/**
 * A component that renders an animated currency using Rive.
 * @param {Rive_CurrencyProps} props - The component props.
 * @returns {JSX.Element} The rendered Rive_Currency component.
 */
const Rive_Currency: React.FC<Rive_CurrencyProps> = ({
  currencyState,
  isDonut,
}) => {
  const { rive, RiveComponent } = useMcRive({
    src: currencyRiveFile,
    stateMachines: 'State Machine 1',
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
    autoplay: true,
  });

  useMcRiveStateMachine(rive, 'State Machine 1', {
    breadState: currencyState ?? Rive_CurrencyState.Idle,
    isDonut: isDonut ?? false,
  });

  useTimeout(() => {
    if (!rive) return;
    rive.pause();
  }, 1000);

  return (
    <RiveComponent
      onMouseEnter={() => {
        if (!rive) return;
        rive.play();
      }}
      onMouseLeave={() => {
        if (!rive) return;
        rive.pause();
      }}
    />
  );
};

export default Rive_Currency;
