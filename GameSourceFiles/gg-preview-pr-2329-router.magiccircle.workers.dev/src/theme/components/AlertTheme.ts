import { alertAnatomy as parts } from '@chakra-ui/anatomy';
import { createSafeMultiStyleConfigHelpers } from '../types';

const {
  defineSafePartsStyle: definePartsStyle,
  defineSafeMultiStyleConfig: defineMultiStyleConfig,
} = createSafeMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({});

export default defineMultiStyleConfig({
  baseStyle,
  variants: {
    DismissableAlert: {
      title: {
        fontSize: 'md',
        width: '100%',
      },
      description: {
        fontWeight: 'medium',
      },
      container: {
        backgroundColor: 'Neutral.White',
        color: 'Neutral.Black',
        borderRadius: 'card',
        display: 'flex',
        gap: 4,
        width: '100%',

        // We do this because we need to position toasts just below the System
        // Header, but Chakra only has support for top/bottom
        // Note, you'll ALSO need to ensure that you set position: 'top', when
        // sending the toast, which we set as a global default in
        // McChakraProvider
        top: 'var(--system-header-height)',
        bottom: 'unset',
        left: 0,
      },
    },
    SystemHeaderToast: {
      container: {
        backgroundColor: 'Neutral.MagicBackground',
        color: 'Neutral.White',
        display: 'flex',
        gap: 4,
        paddingY: 0,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      description: {
        width: '100%',
        fontWeight: 'medium',
      },
    },
  },
  defaultProps: {},
});
