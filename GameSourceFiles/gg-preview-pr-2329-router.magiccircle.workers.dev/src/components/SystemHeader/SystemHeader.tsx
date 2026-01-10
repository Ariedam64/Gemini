import { IconButton } from '@chakra-ui/react';
import { useLingui } from '@lingui/react/macro';
import { getDefaultStore } from 'jotai';
import { useEffect, useRef } from 'react';
import { Menu as Hamburger, Music } from 'react-feather';
import AvatarInCircleButton from '@/components/Avatars/AvatarInCircleButton';
import BreadWidget from '@/components/Currency/BreadWidget';
import CreditsWidget from '@/components/Currency/CreditsWidget';
import McGrid from '@/components/McGrid/McGrid';
import { OneTimeRewardsModalButton } from '@/components/OneTimeRewardsModal';
import StreakWidget from '@/components/Streak/StreakWidget';
import { useMagicToast } from '@/components/ui/MagicToast';
import { useChildScopeName } from '@/hooks';
import useIsSmallWidth from '@/hooks/useIsSmallWidth';
import {
  isHostAtom,
  useCurrentGameName,
  useIsUserAuthenticated,
  useOpenDrawer,
  usePlayerId,
} from '@/store/store';
import McFlex, { type McFlexProps } from '../McFlex/McFlex';
import SignInButton from './SignInButton';

const SystemHeader: React.FC<McFlexProps> = (props) => {
  const wasHostBeforeRef = useRef(getDefaultStore().get(isHostAtom));
  const scope = useChildScopeName();
  const isUserAuthenticated = useIsUserAuthenticated();
  const playerId = usePlayerId();
  const isSmallWidth = useIsSmallWidth();
  const currentGameName = useCurrentGameName();
  const openDrawer = useOpenDrawer();
  const { sendToast } = useMagicToast();
  const { t } = useLingui();

  useEffect(() => {
    const store = getDefaultStore();
    const unsub = store.sub(isHostAtom, () => {
      const wasHostBefore = wasHostBeforeRef.current;
      const isHostNow = store.get(isHostAtom);
      // We only want to show this toast once, when the user becomes the host.
      // Since the isHostAtom can have 3 values: true, false, and null, we can't
      // simply show the toast when the value changes to true, since it could
      // have been null before. In other words, we only want to show the toast
      // if the previous value was false, not null.
      if (isHostNow && wasHostBefore === false) {
        sendToast({
          title: t`👑 You are the host! You can change game settings and manage the party.`,
        });
      }
      wasHostBeforeRef.current = isHostNow;
    });
    return unsub;
  }, [sendToast]);

  return (
    <McGrid
      id="SystemHeader"
      zIndex={currentGameName === 'Quinoa' ? 'AboveGameModal' : undefined}
      position="relative"
      h="var(--system-header-height)"
      templateColumns="auto 1fr auto"
      p={1}
      pointerEvents="none"
      {...props}
    >
      <McFlex autoW gap={{ base: 1, md: 2 }} orient="left">
        <IconButton
          pointerEvents="auto"
          onClick={(e) => {
            e.stopPropagation();
            openDrawer('party');
          }}
          variant="blank"
          p={0.5}
          minW="40px"
          aria-label={t`Party Menu`}
          color="MagicWhite"
          borderRadius="10px"
          bg="rgba(5, 5, 5, 0.65)"
          gap={1}
          whiteSpace="nowrap"
          icon={<Hamburger size="32px" strokeWidth="2.5px" color="white" />}
        />
        {!isSmallWidth && (
          <IconButton
            pointerEvents="auto"
            onClick={(e) => {
              e.stopPropagation();
              openDrawer('party-settings');
            }}
            minW="40px"
            aria-label={t`Music and Sound Effects Volume`}
            color={isSmallWidth || scope !== 'Lobby' ? 'MagicWhite' : undefined}
            borderRadius="10px"
            icon={<Music size="30px" strokeWidth="2px" color="white" />}
            p={0.5}
            bg="rgba(0, 0, 0, 0.65)"
          />
        )}
        <OneTimeRewardsModalButton
          pointerEvents="auto"
          aria-label={t`One Time Rewards`}
          p={1}
        />
        {!isUserAuthenticated && <SignInButton />}
      </McFlex>
      <McFlex />
      <McFlex orient="right">
        <CreditsWidget />
        <BreadWidget />
        <StreakWidget />
        <McFlex auto ml={1}>
          <AvatarInCircleButton
            avatarProps={{
              playerOrId: playerId,
            }}
            buttonProps={{
              pointerEvents: 'auto',
              onClick: (e) => {
                e.stopPropagation();
                openDrawer('profile');
              },
            }}
          />
        </McFlex>
      </McFlex>
    </McGrid>
  );
};

export default SystemHeader;
