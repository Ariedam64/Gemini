import { Box, CloseButton } from '@chakra-ui/react';
import { AlertTriangle, CheckCircle, Info } from 'react-feather';
import { isTileRef } from '@/common/games/Quinoa/world/tiles';
import McFlex from '@/components/McFlex/McFlex';
import type {
  DefaultToastOptions,
  QuinoaToastOptions,
} from '../atoms/toastAtoms';
import Sprite from '../components/Sprite';

/** Checks if value is a sprite name string like "sprite/ui/MoneyBag" */
const isSpriteName = (value: unknown): value is string =>
  typeof value === 'string' && value.startsWith('sprite/');

const variantStyles = {
  success: {
    bg: 'Green.Dark',
    borderColor: 'Green.Light',
    icon: <CheckCircle size={20} />,
  },
  error: {
    bg: 'Red.Dark',
    borderColor: 'Red.Light',
    icon: <AlertTriangle size={20} />,
  },
  info: {
    bg: 'Blue.Dark',
    borderColor: 'Blue.Light',
    icon: <Info size={20} />,
  },
};

/**
 * Custom toast component for Quinoa game with full styling control.
 * This bypasses Chakra's Alert theming limitations mentioned in:
 * https://github.com/chakra-ui/chakra-ui/issues/2579
 */
const QuinoaToast: React.FC<QuinoaToastOptions> = (props) => {
  const {
    title,
    description,
    variant = 'info',
    icon,
    onClick,
    onClose,
    isClosable = true,
    mutations,
  } = props as DefaultToastOptions;

  const styles = variantStyles[variant];
  const displayIcon = icon === undefined ? styles.icon : icon;

  return (
    <Box
      bg={styles.bg}
      color="white"
      borderRadius="10px"
      border="2px solid"
      borderColor={styles.borderColor}
      p="10px 16px"
      minW="320px"
      maxW="420px"
      boxShadow="0 10px 25px rgba(0, 0, 0, 0.3)"
      position="relative"
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick();
        if (onClose) onClose();
      }}
      cursor={onClick ? 'pointer' : 'default'}
    >
      <McFlex gap="12px" orient="top">
        {displayIcon && (
          <Box flexShrink={0} opacity={0.9} mt="1px">
            {isTileRef(displayIcon) ? (
              <Sprite
                tileRef={displayIcon}
                width="40px"
                height="40px"
                mutations={mutations}
              />
            ) : isSpriteName(displayIcon) ? (
              <Sprite
                spriteName={displayIcon}
                width="40px"
                height="40px"
                mutations={mutations}
              />
            ) : (
              displayIcon
            )}
          </Box>
        )}
        <McFlex col gap="2px" flex={1} alignItems="flex-start">
          <Box
            fontSize={{ base: '16px', md: '18px' }}
            fontWeight="bold"
            lineHeight="1.25"
          >
            {title}
          </Box>
          {description && (
            <Box
              fontSize={{ base: '14px', md: '16px' }}
              opacity={0.85}
              lineHeight="1.4"
            >
              {description}
            </Box>
          )}
        </McFlex>
        {isClosable && onClose && (
          <CloseButton
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            size="sm"
            width="18px"
            height="18px"
            fontSize="9px"
            color="white"
            opacity={0.8}
            _hover={{ opacity: 1 }}
            position="absolute"
            top="0px"
            right="0px"
          />
        )}
      </McFlex>
    </Box>
  );
};

export default QuinoaToast;
