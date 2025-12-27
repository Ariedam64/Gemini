import { Text } from '@chakra-ui/layout';
import { useAtomValue } from 'jotai';
import McFlex from '@/components/McFlex/McFlex';
import SystemHeader from '@/components/SystemHeader/SystemHeader';
import { isHeadlessBrowser } from '@/environment';
import { quinoaEngineAtom } from '../atoms/engineAtom';
import GameScreen from './GameScreen';
import QuinoaCanvasWrapper from './QuinoaCanvas/QuinoaCanvasWrapper';

const QuinoaGameContainer: React.FC = () => {
  const engine = useAtomValue(quinoaEngineAtom);

  if (isHeadlessBrowser) {
    // To spare playwright from choking on WebGL, which currently doesn't even
    // test Quinoa
    // Also we need to render a SystemHeader to satisfy playwright's
    // expectations so it can click on the hamburger menu etc.
    // This is kinda hacky, but since Quinoa is now the default-launched game,
    // and launched in *fullscreen* by default, this is a simple workaround.
    return (
      <McFlex col position="absolute" top="0" left="0" autoH>
        <SystemHeader />
        <Text>Headless browser detected - will not render game</Text>
      </McFlex>
    );
  }

  return (
    <McFlex className="QuinoaGameContainer" position="relative">
      {/* Canvas is ALWAYS rendered and persists */}
      <QuinoaCanvasWrapper />

      {/* GameScreen (UI + Hooks) only mounts after rendering system is ready */}
      {engine && <GameScreen />}
    </McFlex>
  );
};

export default QuinoaGameContainer;
