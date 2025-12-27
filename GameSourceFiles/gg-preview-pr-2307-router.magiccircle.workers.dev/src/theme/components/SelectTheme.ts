import { selectAnatomy as parts } from '@chakra-ui/anatomy';
import { createSafeMultiStyleConfigHelpers } from '../types';

const {
  defineSafePartsStyle: definePartsStyle,
  defineSafeMultiStyleConfig: defineMultiStyleConfig,
} = createSafeMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  field: {
    borderBottomColor: 'Neutral.Grey !important',
  },
});

export default defineMultiStyleConfig({
  baseStyle,
  sizes: {},
  defaultProps: {},
});
