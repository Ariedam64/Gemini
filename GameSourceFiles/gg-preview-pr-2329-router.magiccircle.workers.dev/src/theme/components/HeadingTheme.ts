import { defineSafeStyleConfig } from '../types';

export default defineSafeStyleConfig({
  baseStyle: {
    color: 'MagicWhite',
    fontWeight: 800,
  },
  sizes: {
    xs: {
      fontSize: 'xs',
    },
    sm: {
      fontSize: 'sm',
    },
    md: {
      fontSize: 'md',
    },
    lg: {
      fontSize: 'lg',
    },
    xl: {
      fontSize: 'xl',
    },
    '2xl': {
      fontSize: '2xl',
    },
  },
  defaultProps: {
    size: 'md',
  },
});
