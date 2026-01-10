import { defineStyleConfig } from '@chakra-ui/react';

const sizes = {
  xs: '24px',
  sm: '36px',
  md: '55px',
  lg: '96px',
} as const;

export type TokenSize = keyof typeof sizes;

const TokenTheme = defineStyleConfig({
  baseStyle: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  sizes: {
    xs: {
      boxSize: sizes.xs,
      w: sizes.xs,
      h: sizes.xs,
      minWidth: sizes.xs,
      minHeight: sizes.xs,
      fontSize: '12px',
    },
    sm: {
      boxSize: sizes.sm,
      w: sizes.sm,
      h: sizes.sm,
      minWidth: sizes.sm,
      minHeight: sizes.sm,
      fontSize: '24px',
    },
    md: {
      boxSize: sizes.md,
      w: sizes.md,
      h: sizes.md,
      minWidth: sizes.md,
      minHeight: sizes.md,
      fontSize: '36px',
    },
    lg: {
      boxSize: sizes.lg,
      w: sizes.lg,
      h: sizes.lg,
      minWidth: sizes.lg,
      minHeight: sizes.lg,
      fontSize: '70px',
    },
  },
  defaultProps: {
    size: 'sm',
  },
});

export default TokenTheme;
