import { useRef } from 'react';
import { Box, BoxProps, Button, ButtonProps } from '@chakra-ui/react';
import { useGlowAnimation } from '@/hooks/useGlowAnimation';
import { useThemeColorAsRGBA } from '@/theme/colors';
import { ChakraColor } from '@/theme/types';

interface ProgressOverlayProps {
  progress: number;
  progressColor?: string;
  bg?: BoxProps['bg'];
}

const ProgressOverlay: React.FC<ProgressOverlayProps> = ({
  progress,
  progressColor,
  bg,
}) => (
  <Box
    position="absolute"
    width="100%"
    height="100%"
    overflow="hidden"
    borderRadius="inherit"
  >
    <Box
      position="absolute"
      bg={progressColor || bg}
      zIndex={-1}
      // filter is just used to provide an intelligent default
      // for the progress bar color when progressColor is not provided
      filter={!progressColor ? 'brightness(1.3)' : undefined}
      // If progress is 0, we don't want to animate the progress bar
      // This prevents the progress from "animating" from 100% to 0%
      transition={progress === 0 ? 'none' : 'all 1s linear'}
      width="100%"
      height="100%"
      clipPath={`inset(0 ${100 - progress * 100}% 0 0)`}
    />
  </Box>
);
// Due to a bug in Chakra, the disabled prop doesn't work
// We need to use the isDisabled prop instead
// https://github.com/chakra-ui/chakra-ui/issues/7269
export interface GlowingButtonProps extends Omit<ButtonProps, 'disabled'> {
  isRound?: boolean;

  // Progress bar
  progress?: number;
  progressColor?: string;

  // Glow
  isGlowing?: boolean;
  glowBackgroundColor?: ChakraColor;
  glowOpacity?: number;
  glowSize?: number;
}

const GlowingButton: React.FC<GlowingButtonProps> = ({
  bg,
  backgroundColor,
  isRound = false,
  isDisabled,
  isGlowing = true,
  progress,
  progressColor,
  glowBackgroundColor,
  glowOpacity = 0.5,
  glowSize = 10,
  sx,
  children,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const glowColor = useThemeColorAsRGBA(
    glowBackgroundColor || backgroundColor || bg || 'Red.Magic',
    glowOpacity
  );

  const shouldGlow = isGlowing && !isDisabled;
  const glowAnimation = useGlowAnimation(shouldGlow, glowSize, buttonRef);

  if (isRound) {
    props.width = props.width || '48px';
    props.height = props.height || '48px';
  }

  return (
    <Button
      ref={buttonRef}
      zIndex={0}
      bg={backgroundColor || bg}
      isDisabled={isDisabled}
      borderRadius={isRound ? 'full' : undefined}
      position="relative"
      {...props}
      sx={{
        ...sx,
        ...(shouldGlow && {
          _before: {
            content: '""',
            position: 'absolute',
            zIndex: -1,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 'inherit',
            bg: glowColor,
            animation: glowAnimation,
            willChange: 'transform',
          },
        }),
      }}
    >
      {progress !== undefined && (
        <ProgressOverlay
          progress={progress}
          progressColor={progressColor}
          bg={backgroundColor || bg}
        />
      )}
      {children}
    </Button>
  );
};

export default GlowingButton;
