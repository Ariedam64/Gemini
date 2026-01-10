import { Box, Center, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { setGameWindowedAndNotFullScreen } from '@/components/GameWindow/store';
import McFlex from '@/components/McFlex/McFlex';
import GlowingButton from '@/components/ui/GlowingButton';
import { setAvocadoMiniInitialPage } from '@/games/AvocadoMini/store';
import { useSetActiveGame } from '@/store/store';
import { useDismissCurrentPresentable } from '..';
import PresentableCloseButton from '../PresentableCloseButton';

export interface MiniAvocadoPrizePresentable {
  type: 'MiniAvocadoPrize';
  component: React.ReactNode;
}

interface MiniAvocadoPrizePresentableRendererProps {
  questionDate: Date;
  questionText: string;
  answerText: string;
}

export const MiniAvocadoPrizePresentableRenderer: React.FC<
  MiniAvocadoPrizePresentableRendererProps
> = ({ questionDate, questionText, answerText }) => {
  const dismissCurrentPresentable = useDismissCurrentPresentable();
  const setActiveGame = useSetActiveGame();

  const onClick = () => {
    dismissCurrentPresentable();
    setGameWindowedAndNotFullScreen();
    setActiveGame('AvocadoMini');
    setAvocadoMiniInitialPage(questionDate);
  };

  return (
    <Center
      flexDirection="column"
      textAlign="center"
      maxWidth="100%"
      width="100%"
      height="100%"
      position="relative"
      pointerEvents="auto"
    >
      <PresentableCloseButton
        position="absolute"
        top="25vh"
        pointerEvents="auto"
        zIndex="10000000"
      />
      <Text
        variant="textSlapper-default"
        my="10px"
        fontSize="4xl"
        width="60vw"
        px="10px"
        position="relative"
        color="MagicWhite"
      >
        <Trans>Your Results Are In!</Trans>
      </Text>
      <Box
        p={6}
        borderRadius="card"
        maxW="80%"
        bg="MagicWhite"
        position="relative"
        my="10px"
      >
        <Text
          fontSize="md"
          fontStyle="italic"
          fontWeight="normal"
          textAlign="center"
          color="MagicBlack"
        >
          {questionText}
        </Text>
        <Text
          fontSize="md"
          fontWeight="normal"
          textAlign="center"
          color="MagicBlack"
          mt={4}
        >
          <Trans>Your wrote:</Trans>{' '}
          <b>
            {answerText.slice(0, 200)}
            {answerText.length > 200 ? '...' : ''}
          </b>
        </Text>
      </Box>
      <McFlex gap="10px" height="auto" mb="10px">
        <GlowingButton
          onClick={onClick}
          size="md"
          backgroundColor="Blue.Magic"
          glowBackgroundColor="Blue.Magic"
          padding="15px 30px"
          fontSize="lg"
          overflow="visible"
        >
          <Trans>🎁 Claim your prize</Trans>
        </GlowingButton>
      </McFlex>
    </Center>
  );
};
