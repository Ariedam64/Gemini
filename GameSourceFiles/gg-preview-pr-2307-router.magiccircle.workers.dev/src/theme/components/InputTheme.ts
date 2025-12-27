import { inputAnatomy as parts } from '@chakra-ui/anatomy';
import colors from '../colors';
import { createSafeMultiStyleConfigHelpers } from '../types';

const {
  defineSafePartsStyle: definePartsStyle,
  defineSafeMultiStyleConfig: defineMultiStyleConfig,
} = createSafeMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  field: {
    fontWeight: 700,
    textAlign: 'center',
    width: '250px',
    // maxW: '90%',
    py: '10px',
    px: '20px',
  },
});

const InputTheme = defineMultiStyleConfig({
  baseStyle,
  variants: {
    mcbase: {
      field: {
        backgroundColor: colors.Neutral.EarlGrey,
        color: colors.MagicWhite,
        borderRadius: 'input',
        fontSize: '24px',
        height: 'auto',
        _focus: {
          boxShadow: 'inset 0 0 0 2px white',
        },
        _placeholder: {
          opacity: 0.5,
        },
      },
    },
    exandy: {
      field: {
        _focus: {
          transform: 'scale(1.05)',
          transition: 'transform 0.2s ease',
          boxShadow: 'none',
        },
      },
    },
  },
  defaultProps: {
    variant: 'mcbase',
  },
});

export default InputTheme;
