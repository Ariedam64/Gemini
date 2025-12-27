import { progressAnatomy as parts } from '@chakra-ui/anatomy';
import { createSafeMultiStyleConfigHelpers } from '../types';

const {
  defineSafePartsStyle: definePartsStyle,
  defineSafeMultiStyleConfig: defineMultiStyleConfig,
} = createSafeMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({});

export default defineMultiStyleConfig({
  baseStyle,
  variants: {
    CreditReplenishment: definePartsStyle({
      track: {
        bg: 'White',
        h: '4px',
        borderRadius: 'full',
        outline: '1.5px solid',
        outlineColor: '#890b50',
        minW: '26px',
      },
      filledTrack: {
        bg: 'Pink.Magenta',
        borderRadius: 'full',
        transition: 'all 0.3s',
      },
    }),
  },
  sizes: {},
  defaultProps: {
    size: 'md',
  },
});
