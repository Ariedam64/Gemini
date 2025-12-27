import { switchAnatomy as parts } from '@chakra-ui/anatomy';
import { createSafeMultiStyleConfigHelpers } from '../types';

const {
  defineSafePartsStyle: definePartsStyle,
  defineSafeMultiStyleConfig: defineMultiStyleConfig,
} = createSafeMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  container: {},
  thumb: {
    bg: 'White',
  },
  track: {
    bg: 'Neutral.EarlGrey',
    _checked: {
      bg: 'Purple.Magic',
    },
  },
});

export default defineMultiStyleConfig({
  baseStyle,
  sizes: {},
  defaultProps: {},
});
