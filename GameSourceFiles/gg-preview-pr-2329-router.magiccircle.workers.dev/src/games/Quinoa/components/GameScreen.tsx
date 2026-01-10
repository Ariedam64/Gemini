import McFlex from '@/components/McFlex/McFlex';
import { surface } from '@/environment';
import { useZoom } from '@/hooks/useZoom';
import { clearActionWaitingTimeout } from '@/Quinoa/data/action/executeAction/executeAction';
import { useQuinoaHotkeys } from '@/Quinoa/hooks/useQuinoaHotkeys';
import HACKYHookToAtomCreditsManager from './QuinoaUI/hacky-components/HACKYHookToAtomCreditsManager';
import HACKYPetManager from './QuinoaUI/hacky-components/HACKYPetManager';
import HACKYPresentables from './QuinoaUI/hacky-components/HACKYPresentables';
import HACKYShopAnnouncers from './QuinoaUI/hacky-components/HACKYShopAnnouncers';
import HACKYStreakUpdater from './QuinoaUI/hacky-components/HACKYStreakUpdater';
import HACKYTutorialAnnouncers from './QuinoaUI/hacky-components/HACKYTutorialAnnouncers';
import QuinoaUI from './QuinoaUI/QuinoaUI';
import WebviewOnly_PromptToEnableNotificationsIfNeeded from './WebviewOnly_PromptToEnableNotificationsIfNeeded';

type GameScreenProps = {};

const GameScreen: React.FC<GameScreenProps> = () => {
  useQuinoaHotkeys();
  useZoom();

  return (
    <McFlex
      className="GameScreen"
      position="relative"
      pointerEvents="none"
      // If the user clicks the action button for a wait action like instaGrow,
      // then drags off the button and release the mouse, this will clear the timeout
      onPointerUp={clearActionWaitingTimeout}
    >
      <QuinoaUI />
      <HACKYPetManager />
      <HACKYHookToAtomCreditsManager />
      <HACKYTutorialAnnouncers />
      <HACKYPresentables />
      <HACKYShopAnnouncers />
      <HACKYStreakUpdater />
      {surface === 'webview' && (
        <WebviewOnly_PromptToEnableNotificationsIfNeeded />
      )}
    </McFlex>
  );
};

export default GameScreen;
