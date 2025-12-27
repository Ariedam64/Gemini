import { defineSafeStyleConfig } from '../types';

const TextTheme = defineSafeStyleConfig({
  baseStyle: {
    fontWeight: 'medium',
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
  variants: {
    'textSlapper-default': {
      fontFamily: 'textSlap',
      fontSize: 'textSlapper-default',
      lineHeight: 1,
      textAlign: 'center',
      textShadow: '-3px 5px 0 rgba(0,0,0,0.25)',
    },
    'textSlapper-mini': {
      fontFamily: 'textSlap',
      fontSize: 'textSlapper-mini',
      lineHeight: 1,
      textAlign: 'center',
      textShadow: '-3px 5px 0 rgba(0,0,0,0.25)',
    },
    subHeader: {
      fontSize: 'sm',
      color: 'Neutral.DarkGrey',
    },
    score: {
      fontFamily: 'textSlap',
      fontSize: 'xl',
      mt: '4px',
      mr: '8px',
    },
  },
  defaultProps: {
    size: 'sm',
    variant: 'Body',
  },
});

export default TextTheme;
