import { Box, Card, Center, Stack, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { useEffect, useRef, useState } from 'react';
import HuzzahImage from '@/assets/Huzzah.png';
import { PlayerNameMaxStringLength } from '@/common/constants';
import AvatarPack from '@/components/Avatars/AvatarPack';
import McFlex from '@/components/McFlex/McFlex';
import { MotionImage } from '@/components/Motion';
import GlowingButton from '@/components/ui/GlowingButton';
import MagicInput from '@/components/ui/MagicInput';
import { useSendRoomMessage } from '@/hooks';
import { useIsHost } from '@/hooks/useIsHost';
import { useHost, usePlayer, usePlayerName } from '@/store/store';
import { AuthenticationOptions } from '../../components/ui/authentication/AuthenticationOptions';
import { usePresentableProducer } from '..';
import { coverSheetPresentableId } from './constants';
import { useCoverSheetModal } from './useCoverSheetModal';

type CoverSheetProps = {};

const CoverSheet: React.FC<CoverSheetProps> = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const host = useHost();
  const amIHost = useIsHost();
  const player = usePlayer();
  const playerName = usePlayerName();
  const [isPlayingAsGuest, setIsPlayingAsGuest] = useState(false);
  const { close } = useCoverSheetModal();
  const { removePresentable } = usePresentableProducer();
  const sendRoomMessage = useSendRoomMessage();

  const onSubmitGuestName = () => {
    const name = inputRef.current?.value;
    sendRoomMessage({
      type: 'SetPlayerData',
      name: name,
    });
    removePresentable({ id: coverSheetPresentableId });
    close();
  };

  useEffect(() => {
    if (isPlayingAsGuest) {
      inputRef.current?.select();
    }
  }, [isPlayingAsGuest]);

  return (
    <McFlex col>
      <Center position="absolute" overflow="hidden">
        <MotionImage
          src={HuzzahImage}
          alt="Huzzah!"
          animate={{ rotate: 360 }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </Center>
      <Box position="relative" w="360px" maxW="80%">
        <AvatarPack players={[{ player }]} />
        <Card py="10px" position="relative">
          <Stack align="center" gap="5px">
            <Text size="md" maxW="80%" textAlign="center" lineHeight="1.2">
              {amIHost ? (
                <Trans>Welcome to Magic Garden</Trans>
              ) : (
                <Trans>
                  Join{' '}
                  <Text as="span" fontWeight="semibold" size="md">
                    {host?.name}
                  </Text>{' '}
                  in
                  <br />
                  Magic Garden
                </Trans>
              )}
            </Text>
            <Box h="5px" />
            {isPlayingAsGuest ? (
              <>
                <Text>
                  <Trans>Enter your name</Trans>
                </Text>
                <MagicInput
                  autoFocus
                  type="text"
                  placeholder="enter your name"
                  defaultValue={playerName}
                  data-testid="name-input"
                  maxLength={PlayerNameMaxStringLength}
                  onEnterKeyDown={onSubmitGuestName}
                  autoComplete="given-name"
                  ref={inputRef}
                />
              </>
            ) : (
              <AuthenticationOptions
                onClickPlayAsGuest={() => setIsPlayingAsGuest(true)}
                showPlayAsGuestButton
              />
            )}
          </Stack>
          <Stack align="center" position="relative" bottom="0" mt="25px">
            <Stack align="center" position="absolute" top="-15px">
              {isPlayingAsGuest && (
                <GlowingButton
                  data-testid="coversheet-cta"
                  bg="Purple.Magic"
                  glowSize={6}
                  onClick={onSubmitGuestName}
                  boxShadow="0px 2px 2px 0px rgba(0, 0, 0, 0.25)"
                >
                  <Trans>Let's go</Trans>
                </GlowingButton>
              )}
            </Stack>
          </Stack>
        </Card>
      </Box>
    </McFlex>
  );
};

export default CoverSheet;
