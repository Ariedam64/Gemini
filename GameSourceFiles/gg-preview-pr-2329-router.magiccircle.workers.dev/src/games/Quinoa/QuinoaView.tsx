import { Trans } from '@lingui/react/macro';
import { useAtomValue } from 'jotai';
import { Suspense } from 'react';
import GameWindow from '@/components/GameWindow/GameWindow';
import { isGameWindowedAtom } from '@/components/GameWindow/store';
import LoadingScreen from '@/components/LoadingScreen';
import McChakraProvider from '@/components/McChakraProvider';
import McFlex from '@/components/McFlex/McFlex';
import Scope from '@/components/Scope';
import StrokedText from '@/components/StrokedText/StrokedText';
import { surface } from '@/environment';
import { useCurrentGameName, useIsUserAuthenticated } from '@/store/store';
import Thumbnail from '../Lobby/components/PartyThumbnail/Thumbnail';
import QuinoaMain from './QuinoaMain';

const QuinoaView: React.FC = () => {
  const gameName = 'Quinoa';
  const currentGameName = useCurrentGameName();
  const isUserAuthenticated = useIsUserAuthenticated();
  const isGameWindowed = useAtomValue(isGameWindowedAtom);

  return currentGameName === gameName && !isGameWindowed ? (
    <Scope scope={gameName}>
      <McChakraProvider>
        <Suspense fallback={<LoadingScreen />}>
          <QuinoaMain />
        </Suspense>
      </McChakraProvider>
    </Scope>
  ) : (
    <GameWindow
      gameName={gameName}
      additionalHeaderElement={
        surface === 'webview' &&
        isUserAuthenticated && (
          <McFlex autoW>
            <StrokedText
              fontSize="sm"
              fontWeight="black"
              whiteSpace="nowrap"
              mr={3}
              color="Yellow.Light"
              strokeColor="Green.Darker"
              strokeWidth={3}
              shadowHeight={2}
            >
              <Trans>Early Access</Trans>
            </StrokedText>
          </McFlex>
        )
      }
    >
      {currentGameName === gameName ? (
        <QuinoaMain />
      ) : (
        <Thumbnail gameName={gameName} />
      )}
    </GameWindow>
  );
};

export default QuinoaView;
