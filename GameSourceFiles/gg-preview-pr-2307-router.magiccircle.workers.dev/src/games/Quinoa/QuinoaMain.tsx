import { Spinner, Text } from '@chakra-ui/react';
import { useLingui } from '@lingui/react/macro';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { useQuinoaAudio } from '@/audio/useQuinoaAudio';
import McFlex from '@/components/McFlex/McFlex';
import { lowLevelRiveAtom } from '@/store/rive-atom';
import {
  quinoaEngineAtom,
  quinoaInitializationErrorAtom,
} from './atoms/engineAtom';
import { isSpectatingAtom, myUserSlotIdxAtom } from './atoms/myAtoms';
import QuinoaGameContainer from './components/QuinoaGameContainer';
import SpectatorScreen from './components/SpectatorScreen';

const QuinoaMain: React.FC = () => {
  const { t } = useLingui();
  const isSpectating = useAtomValue(isSpectatingAtom);
  const myUserSlotIdx = useAtomValue(myUserSlotIdxAtom);
  const loadableLowLevelRive = useAtomValue(lowLevelRiveAtom);
  const engine = useAtomValue(quinoaEngineAtom);
  const initializationError = useAtomValue(quinoaInitializationErrorAtom);

  const isLoadingServerState = myUserSlotIdx === null && !isSpectating;
  const isRiveReady = loadableLowLevelRive.state === 'hasData';

  // We can mount the game container as soon as Rive (WASM) is ready and we have server state.
  // The engine will handle its own global asset loading internally.
  const canMountGameContainer = isRiveReady && !isLoadingServerState;

  // We are "loading" if the engine instance hasn't been fully initialized yet.
  // This covers both the time before mounting AND the time during engine initialization (asset loading).
  const isLoading = !canMountGameContainer || engine === null;

  useQuinoaAudio();

  useEffect(() => {
    if (!isLoading && window.onAppContentLoaded) {
      window.onAppContentLoaded();
    }
  }, [isLoading]);

  if (isSpectating) {
    return <SpectatorScreen />;
  }

  if (initializationError) {
    return (
      <McFlex className="QuinoaMain-Error" position="absolute" col gap="2">
        <Text color="red.500" fontWeight="bold">
          Error loading game resources
        </Text>
        <Text color="red.400" fontSize="sm">
          {initializationError.message}
        </Text>
      </McFlex>
    );
  }

  const getLoadingText = () => {
    if (!isRiveReady) return t`Initializing graphics...`;
    if (isLoadingServerState) return t`Looking at the sky...`;
    if (engine === null) return t`Planting seeds...`; // Covers engine global asset loading
    return '';
  };

  return (
    <>
      {isLoading && (
        <McFlex className="QuinoaMain-Loading" position="absolute" col gap="2">
          <Spinner size="xl" />
          <Text>{getLoadingText()}</Text>
        </McFlex>
      )}

      {canMountGameContainer && <QuinoaGameContainer />}
    </>
  );
};

export default QuinoaMain;
