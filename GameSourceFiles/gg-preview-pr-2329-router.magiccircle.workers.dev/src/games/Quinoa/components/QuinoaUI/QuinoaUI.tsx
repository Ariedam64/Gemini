import { useAtomValue } from 'jotai';
import { isGameWindowedAtom } from '@/components/GameWindow/store';
import McFlex from '@/components/McFlex/McFlex';
import SystemHeader from '@/components/SystemHeader/SystemHeader';
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice';
import { isDemoTouchpadVisibleAtom } from '@/Quinoa/atoms/taskAtoms';
import { useQuinoaDeepLinkHandler } from '@/Quinoa/hooks/useQuinoaDeepLinkHandler';
import QuinoaToastContainer from '@/Quinoa/toasts/QuinoaToastContainer';
import { Modals } from '../modals/Modals';
import BottomBar from './BottomBar';
import CenterArea from './CenterArea';
import DemoTouchpad from './DemoTouchpad';

const QuinoaUI: React.FC = () => {
  const isGameWindowed = useAtomValue(isGameWindowedAtom);
  const isDemoTouchpadVisible = useAtomValue(isDemoTouchpadVisibleAtom);
  const isTouchDevice = useIsTouchDevice();

  useQuinoaDeepLinkHandler();

  return (
    <>
      {isDemoTouchpadVisible && isTouchDevice && <DemoTouchpad />}
      <McFlex
        className="QuinoaUI-CenterArea"
        col
        position="absolute"
        overflow="hidden"
        pointerEvents="none"
      >
        {!isGameWindowed && <SystemHeader />}
        <McFlex
          className="QuinoaUI-BottomBar"
          col
          pt={isGameWindowed ? 1 : 0}
          orient="bottom"
          zIndex="StandardModal"
          position="relative"
          pointerEvents="none"
        >
          <CenterArea />
          <BottomBar />
        </McFlex>
      </McFlex>
      <QuinoaToastContainer />
      <div
        style={{
          // Since the parent has pointerEvents: 'none', we need to set it to
          // 'all' here to allow the modals to be interactable
          pointerEvents: 'all',
        }}
      >
        <Modals />
      </div>
    </>
  );
};

export default QuinoaUI;
