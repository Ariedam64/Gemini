import { Box, type BoxProps } from '@chakra-ui/layout';
import type { ResponsiveValue } from '@chakra-ui/react';
import type { Rive } from '@rive-app/canvas';
import { ErrorBoundary } from '@sentry/react';
import { useEffect, useRef, useState } from 'react';
import { EmoteType } from '@/common/types/emote';
import type { PlayerOrId } from '@/common/types/player';
import { useMagicToast } from '@/components/ui/MagicToast';
import { useConfig } from '@/config';
import { isDesktopMode } from '@/environment';
import {
  useAvatarRefCount,
  useBotOrPlayerByPlayerOrId,
  useIsDeveloper,
  useIsDiscordHardwareAccelerationEnabled,
  useIsPlayerMuted,
  useIsUserSpeaking,
} from '@/store/store';
import { useResponsiveValue } from '@/utils';
import { AvatarSetAnimation } from './avatarRiveConstants';
import RiveAvatar from './RiveAvatar';
import StaticAvatar from './StaticAvatar';

const dimensions = {
  xl: '300px',
  lg: '160px',
  marge: '120px',
  md: '80px',
  sm: '60px',
  xs: '40px',
  chip: '40px',
};

export type AvatarSize = keyof typeof dimensions;

export type AvatarProps = Omit<BoxProps, 'size' | 'animation'> & {
  playerOrId: PlayerOrId;
  size?: ResponsiveValue<AvatarSize>;
  /**
   * An optional override for the avatar cosmetics, i.e., the spy outfit in Durian.
   */
  avatarOverride?: string[];
  /**
   * The animation to apply to the avatar, i.e., thinking face. Defaults to AvatarAnimation.Idle.
   */
  animation?: AvatarSetAnimation;
  /**
   * A boolean which determines if the avatar should do the emote animations.
   */
  canEmote?: boolean;
  /**
   * A boolean which determines if the avatar should increase the reference counter of that avatar.
   * This is different from canEmote because there are avatars where we want to enable emoting,
   * but we don't want to increase the reference counter because they are out of the normal
   * game view (e.g., avatars in the party drawer and the peeking avatar).
   */
  doNotIncrementRefCount?: boolean;
  /**
   * A boolean which determines whether the static avatar or the animated Rive avatar should be used.
   * For example, for the vote tokens on desktop lobby, we want to use static avatars and not have them animate at all.
   */
  shouldRenderStaticAvatar?: boolean;
  /**
   * A boolean which forces the avatar to be non-static.
   */
  forceNonStaticAvatar?: boolean;
  /**
   * A boolean which overrides the isSpeaking state of the avatar.
   */
  isSpeakingOverride?: boolean;
  /**
   * Callback to inform the parent component about the avatar's static/animated state.
   * Triggers when the avatar transitions between static and animated versions,
   * such as when encountering an error in the Rive avatar. This is useful for static-coditional
   * rendering, e.g., vote status tokens for static avatars in Guava and Durian voting.
   */
  onStaticAvatarChange?: (isStatic: boolean) => void;
  onRiveReady?: (rive: Rive) => void;
  /**
   * A boolean which determines if the avatar should pop in.
   */
  popIn?: boolean;
  /**
   * A boolean which determines if the avatar should wear a crown.
   */
  isWearingCrown?: boolean;
  /**
   * A boolean which determines if the avatar should be sitting on a throne.
   */
  isSittingThrone?: boolean;
};

const Avatar: React.FC<AvatarProps> = ({
  playerOrId,
  size = 'md',
  avatarOverride,
  animation = AvatarSetAnimation.Idle,
  canEmote = true,
  doNotIncrementRefCount = false,
  shouldRenderStaticAvatar = false,
  forceNonStaticAvatar = false,
  isSpeakingOverride,
  onStaticAvatarChange,
  popIn = true,
  isWearingCrown = false,
  isSittingThrone = false,
  onRiveReady,
  ...rest
}) => {
  const selfRef = useRef<HTMLDivElement>(null);
  const botOrPlayer = useBotOrPlayerByPlayerOrId(playerOrId);
  const isSpeaking = useIsUserSpeaking(playerOrId);
  const isSilenced = useIsPlayerMuted(botOrPlayer?.id || '');
  const isDiscordHardwareAccelerationEnabled =
    useIsDiscordHardwareAccelerationEnabled();
  const alwaysUseStaticAvatars = useConfig().testing_alwaysUseStaticAvatars;
  const isDeveloper = useIsDeveloper();
  const { sendToast } = useMagicToast();

  const [isStaticAvatar, setIsStaticAvatar] = useState(false);

  useEffect(() => {
    setIsStaticAvatar(
      !forceNonStaticAvatar &&
        (!isDiscordHardwareAccelerationEnabled ||
          shouldRenderStaticAvatar ||
          alwaysUseStaticAvatars)
    );
  }, [
    forceNonStaticAvatar,
    isDiscordHardwareAccelerationEnabled,
    shouldRenderStaticAvatar,
    alwaysUseStaticAvatars,
  ]);

  useEffect(() => {
    onStaticAvatarChange?.(isStaticAvatar);
  }, [isStaticAvatar, onStaticAvatarChange]);

  const { retain, release } = useAvatarRefCount(botOrPlayer?.id || '');

  // Use reference counting to track the number of active avatar components per player, which
  // determines if the peeking avatar should be rendered.
  useEffect(
    () => {
      const retentionStateChanged = () => {
        const element = selfRef.current;

        // Check if the element is visible by using the checkVisibility API if available.
        // If the element is not visible, we don't need to retain the avatar.
        // This is useful for ensuring that avatars which are mounted in the DOM
        // tree, but which are not visible, do not retain the avatar reference.
        // This is important for e.g. animations like e.g. MagicMovers
        const isElementVisible =
          typeof element?.checkVisibility === 'function'
            ? element.checkVisibility({
                checkOpacity: true,
                checkVisibilityCSS: true,
              })
            : false;

        const shouldRetain =
          isElementVisible && !isStaticAvatar && !doNotIncrementRefCount;

        if (shouldRetain) {
          retain();
        } else {
          release();
        }
      };

      retentionStateChanged();

      return () => {
        release();
      };
    },

    // Note: we do not have a good way to listen to visibility changes, so we
    // just run this function on every render. That is, we are NOT passing
    // dependencies to useEffect, which means it will run on every render.

    // NOTE 2: Because we are not "observing" visibility changes, we iwll only
    // change the refcount based on the visiblity of the avatar at the time of
    // it being renddered - if its visiblity is changed after mounting, WITHOUT
    // a re-render (e.g. with framer motion or a direct CSS/DOM change that does
    // not cause a re-render), the refcount will not be updated.
    undefined
  );

  // Size can be a responsive value, so we need to resolve it the actual size
  const resolvedSize = useResponsiveValue<AvatarSize>(size, 'md');

  // Now that we have the resolved size, we can get the actual dimension the
  // avatar should have at that size
  const dimension = dimensions[resolvedSize];

  if (!botOrPlayer) {
    return null;
  }

  const avatar = avatarOverride || botOrPlayer.cosmetic.avatar;

  const { emoteData } = botOrPlayer;

  const avatarKey = avatar.join(',');

  return (
    <Box
      className="Avatar"
      ref={selfRef}
      position="relative"
      w={dimension}
      h={dimension}
      onContextMenu={(e) => {
        if (isDeveloper && isDesktopMode) {
          e.preventDefault();
          try {
            void navigator.clipboard.writeText(botOrPlayer.id);
            sendToast({
              title: 'User ID copied',
              description: `Copied ID: ${botOrPlayer.id}.`,
              status: 'success',
            });
          } catch {
            sendToast({
              title: 'Error copying ID',
              description: 'Failed to copy user ID.',
              status: 'error',
            });
          }
        }
      }}
      {...rest}
    >
      <Box
        position="absolute"
        w="200%"
        h="200%"
        transform="translate(-25%, -36%)" // Avatar in Rive used to be centered on artboard, but now it's shifted down 65px, so we move up -36% instead of -25%
      >
        {/* Mobile Discord: Render static avatar for performance */}
        {isStaticAvatar && (
          <Box w="100%" h="100%" transform="translateY(15%)">
            <StaticAvatar
              avatar={avatar}
              discordAvatarUrl={botOrPlayer.discordAvatarUrl}
            />
          </Box>
        )}

        {/* Rive avatar is causing errors, so we wrap it in a Sentry error boundary to prevent the error from propagating and breaking the whole app */}
        {!isStaticAvatar && (
          <ErrorBoundary
            onError={(error, info) => {
              console.warn(
                '[Avatar] Rive error triggered fallback to static avatar',
                error,
                info
              );
              setIsStaticAvatar(true);
            }}
          >
            <RiveAvatar
              key={avatarKey}
              avatar={avatar}
              playerId={botOrPlayer.id}
              discordAvatarUrl={botOrPlayer.discordAvatarUrl}
              animation={animation}
              isSpeaking={isSpeakingOverride || isSpeaking}
              isSilenced={isSilenced}
              playerEmoteData={
                canEmote ? emoteData : { emoteType: EmoteType.Idle }
              }
              isWearingCrown={isWearingCrown}
              isSittingThrone={isSittingThrone}
              popIn={popIn}
              onRiveReady={onRiveReady}
            />
          </ErrorBoundary>
        )}
      </Box>
    </Box>
  );
};

export default Avatar;
