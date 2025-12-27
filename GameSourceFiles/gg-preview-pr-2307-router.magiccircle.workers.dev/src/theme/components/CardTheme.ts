import { cardAnatomy as parts } from '@chakra-ui/anatomy';
import { createSafeMultiStyleConfigHelpers } from '../types';

const {
  defineSafePartsStyle: definePartsStyle,
  defineSafeMultiStyleConfig: defineMultiStyleConfig,
} = createSafeMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  container: {
    borderRadius: 'card',
    shadow: 'cartoon',
  },
});

export default defineMultiStyleConfig({
  baseStyle,
  variants: {
    McDefault: {
      container: {
        backgroundColor: 'MagicWhite',
        color: 'MagicBlack',
      },
    },
  },
  defaultProps: {
    variant: 'McDefault',
  },
});
