import { Box } from '@chakra-ui/layout';
import type { Rive } from '@rive-app/canvas';
import type { Variants } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { EmoteType } from '@/common/types/emote';
import type Player from '@/common/types/player';
import AvatarWithName from '@/components/Avatars/AvatarWithName';
import { MotionFlex } from '@/components/Motion';
import { getDecoration } from '@/constants/decorations';
import {
  useAvatarRefCount,
  useCurrentGameName,
  useIsUserSpeaking,
} from '@/store/store';

interface PeekingAvatarProps {
  player: Player;
}

const PeekingAvatar: React.FC<PeekingAvatarProps> = ({ player }) => {
  const { backgroundColor } = getDecoration(player.cosmetic.color);
  const { refCount } = useAvatarRefCount(player?.id || '');
  const isUserSpeaking = useIsUserSpeaking(player?.id);
  const [animation, setAnimation] = useState<'visible' | 'hidden'>();
  const isAvatarAlreadyOnScreen = refCount > 0;
  const isAvatarEmoting = player.emoteData.emoteType !== EmoteType.Idle;
  const currentGameName = useCurrentGameName();
  const riveRef = useRef<Rive | null>(null);

  const isAvatarPeeking = isUserSpeaking || isAvatarEmoting;
  const isAvatarVisible = isAvatarPeeking && !isAvatarAlreadyOnScreen;

  const variants: Variants = {
    hidden: {
      x: -250,
      opacity: 0,
      transition: { delay: 1 },
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        duration: 0.7,
        bounce: 0.3,
        ease: [0.68, -0.55, 0.27, 1.55],
      },
    },
  };

  useEffect(() => {
    setAnimation(isAvatarVisible ? 'visible' : 'hidden');
  }, [isAvatarVisible]);

  return (
    <MotionFlex
      key={player.id}
      variants={variants}
      initial="hidden"
      animate={animation}
      position="relative"
      overflow="visible"
      minH="100%"
      flexDir="column"
      align="flex-start"
      justify="flex-end"
      onAnimationStart={() => {
        if (riveRef.current) {
          riveRef.current.play();
        }
      }}
      // On animation complete, pause the rive if the avatar is not visible
      onAnimationComplete={() => {
        if (riveRef.current && !isAvatarVisible) {
          riveRef.current.pause();
        }
      }}
    >
      <Box ml="-30px">
        <AvatarWithName
          playerOrId={player}
          size="md"
          doNotIncrementRefCount={true}
          isNameBackgroundFilled={true}
          forceNonStaticAvatar={true}
          onRiveReady={(rive) => {
            riveRef.current = rive;
          }}
        />
      </Box>
      {/* Extend the player's name box to connect them to the side of the screen */}
      <Box
        bg={backgroundColor}
        position="relative"
        bottom="29.5px"
        minHeight="29.5px"
        left={currentGameName === 'Kiwi' ? '-48px' : '-60px'}
        width={
          currentGameName === 'Kiwi'
            ? { base: '55px', sm: '55px', md: '55px', lg: '55px' }
            : { base: '70px', sm: '70px', md: '70px', lg: '70px' }
        }
        zIndex="-1"
      />
    </MotionFlex>
  );
};

export default PeekingAvatar;
