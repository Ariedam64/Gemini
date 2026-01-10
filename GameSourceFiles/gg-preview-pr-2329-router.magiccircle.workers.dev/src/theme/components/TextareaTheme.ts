import { defineSafeStyleConfig } from '../types';

const TextareaTheme = defineSafeStyleConfig({
  baseStyle: {
    fontWeight: 700,
    py: '10px',
    px: '20px',
    backgroundColor: 'Neutral.EarlGrey',
    textAlign: 'left',
    borderRadius: '6px',
    fontSize: '24px',
    height: '120px',
    resize: 'none',
    _placeholder: {
      color: 'Neutral.Grey',
    },
    _focus: {
      boxShadow: 'inset 0 0 0 2px white',
    },
  },
  variants: {
    // Why use McDefault instead of default?
    // Becuase Chakra is weird about borders, outlines, and focus states
    // with the default variant... so we have to make a new variant
    // to avoid doing even hackier stuff like `!important`.
    McDefault: {},
  },
  defaultProps: {
    variant: 'McDefault',
  },
});

export default TextareaTheme;
