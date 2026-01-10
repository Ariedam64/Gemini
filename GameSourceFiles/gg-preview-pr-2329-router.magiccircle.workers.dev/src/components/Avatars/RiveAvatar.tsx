import { Box } from '@chakra-ui/layout';
import { Alignment, Fit, Layout, type Rive } from '@rive-app/react-canvas';
import { useEffect, useState } from 'react';
import { playSfx } from '@/audio/useQuinoaAudio';
import type { PlayerEmoteData } from '@/common/types/emote';
import type { PlayerId } from '@/common/types/player';
import useMcRive from '@/hooks/useMcRive';
import useMcRiveStateMachine from '@/hooks/useMcRiveStateMachine';
import { useAvatarRiveFileCache } from '@/store/store';
import { useInterval } from '@/utils';
import type { AvatarRiveFileCacheValue } from './AvatarRiveFileCache';
import {
  type AvatarSetAnimation,
  expressions,
  getSetAnimationNameIndex,
} from './avatarRiveConstants';
import setAvatarImage from './setAvatarImage';

export interface RiveAvatarProps {
  avatar: readonly string[];
  playerId: PlayerId;
  discordAvatarUrl?: string | null;
  animation: AvatarSetAnimation;
  isSpeaking: boolean;
  isSilenced: boolean;
  playerEmoteData: PlayerEmoteData;
  isWearingCrown?: boolean;
  isSittingThrone?: boolean;
  popIn?: boolean;
  onRiveReady?: (rive: Rive) => void;
}

const RiveAvatar: React.FC<RiveAvatarProps> = ({
  avatar,
  playerId,
  discordAvatarUrl,
  animation,
  isSpeaking,
  isSilenced,
  popIn = true,
  isWearingCrown = false,
  isSittingThrone = false,
  playerEmoteData,
  onRiveReady,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const avatarRiveFileCache = useAvatarRiveFileCache();
  const [cachedRiveFile, setCachedRiveFile] = useState<
    AvatarRiveFileCacheValue | undefined
  >();

  useEffect(() => {
    if (!playerId) {
      console.info('[RiveAvatar] Empty playerId, skipping avatar loading');
      return;
    }
    // We have a separate cache key for the Discord popsicle because their
    // Discord avatar is an additional image overlayed on top of the avatar top.
    // afaik, there is not an easy to way remove the image from the cached rive file,
    // so, instead we just have a version of the avatar with their Discord avatar
    // and a version without it.
    const cacheKey =
      avatar[2] === 'Top_DiscordPopsicle.png'
        ? playerId + '-popsicle'
        : playerId;
    avatarRiveFileCache
      .getOrFetch(cacheKey)
      .then((value) => {
        const [bottom, mid, top] = avatar;
        if (value.imageAssets.Top) {
          setAvatarImage(value.imageAssets.Top, top).catch(console.warn);
        }
        if (value.imageAssets.Mid) {
          setAvatarImage(value.imageAssets.Mid, mid).catch(console.warn);
        }
        if (value.imageAssets.Bottom) {
          setAvatarImage(value.imageAssets.Bottom, bottom).catch(console.warn);
        }
        if (
          value.imageAssets.DiscordAvatarPlaceholder &&
          top === 'Top_DiscordPopsicle.png'
        ) {
          setAvatarImage(
            value.imageAssets.DiscordAvatarPlaceholder,
            discordAvatarUrl ?? undefined,
            false
          ).catch(console.warn);
        }
        return setCachedRiveFile(value);
      })
      .catch(console.error);
  }, [avatarRiveFileCache, playerId]);

  const { rive, RiveComponent } = useMcRive(
    cachedRiveFile
      ? {
          riveFile: cachedRiveFile.riveFile,
          stateMachines: 'State Machine 1',
          artboard: 'AvatarElements',
          layout: new Layout({
            fit: Fit.Cover,
            alignment: Alignment.Center,
          }),
          autoplay: true,
        }
      : null
  );

  useEffect(() => {
    if (rive) {
      onRiveReady?.(rive);
    }
  }, [rive, onRiveReady]);

  useMcRiveStateMachine(rive, 'State Machine 1', {
    animation: getSetAnimationNameIndex(animation),
    expression: expressions.indexOf(avatar[3]),
    talking: isSpeaking,
    isSilenced,
    isWearingShades: avatar[4] === 'FaceProp_Shades.png',
    isWearingCrown,
    isSittingThrone,
    isRickrolling: avatar[2] === 'Top_Custom_ForbiddenMethod.png',
    emoteType: playerEmoteData.emoteType,
    popIn,
  });

  useEffect(() => {
    if (rive) {
      if (popIn) {
        playSfx('Player_Appears');
      }
      setIsVisible(true);
    }
  }, [rive, popIn]);

  // XXX: This is a hack to fix a bug where the avatar, when animated via Framer
  // Motion, might sometimes get stretch its canvas. Unfortunately, a simple
  // resizeobserver didn't work here, so we just check in every 2 seconds...
  useInterval(() => {
    if (rive) {
      rive.resizeDrawingSurfaceToCanvas();
    }
  }, 2000);

  return (
    <Box w="100%" h="100%" visibility={isVisible ? undefined : 'hidden'}>
      <RiveComponent />
    </Box>
  );
};

export default RiveAvatar;
