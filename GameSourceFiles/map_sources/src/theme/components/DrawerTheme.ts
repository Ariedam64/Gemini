import { drawerAnatomy as parts } from '@chakra-ui/anatomy';
import { createSafeMultiStyleConfigHelpers } from '../types';

const {
  defineSafePartsStyle: definePartsStyle,
  defineSafeMultiStyleConfig: defineMultiStyleConfig,
} = createSafeMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({});

export default defineMultiStyleConfig({
  baseStyle,
  variants: {
    SystemDrawer: {
      dialogContainer: {
        zIndex: 'SystemDrawer',
        backgroundColor: 'Scrim',
      },
      closeButton: {
        top: '18px',
        left: '18px',
      },
      dialog: {
        height: '100%',
        backgroundColor: 'DarkPurple',
      },
    },
  },
  defaultProps: {},
});
