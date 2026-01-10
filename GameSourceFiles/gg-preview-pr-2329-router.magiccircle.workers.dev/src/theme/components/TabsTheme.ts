import { tabsAnatomy as parts } from '@chakra-ui/anatomy';
import colors from '../colors';
import { createSafeMultiStyleConfigHelpers } from '../types';

const {
  defineSafePartsStyle: definePartsStyle,
  defineSafeMultiStyleConfig: defineMultiStyleConfig,
} = createSafeMultiStyleConfigHelpers(parts.keys);

// Tabs not looking right? Make sure you:
// 1. Set the isFitted prop on your <Tabs> component
//    (We can't do this in the theme here due to
//    https://github.com/chakra-ui/chakra-ui/issues/7646))
// 2. If you want your tabs to fill the height of the page, you can NOT have any
//    other elements as siblings with the <Tabs> component. This is because
//    we set the height of the <Tabs> component to 100% of its parent, and if
//    there are other elements on the page, those siblings will "eat into" the
//    100%, resulting in a subtle bug where you can't scroll a <TabPanel> all
//    the way to the bottom. See the code at the bottom of this file for an
//    example of how to use <Tabs> in a way that will fill the height of the
//    page.

const baseStyle = definePartsStyle({
  tab: {
    fontWeight: 'bold',
    userSelect: 'none',
    borderRadius: '8px',
    paddingY: {
      base: 1,
      sm: 2,
    },
    _selected: {
      color: colors.Neutral.Black,
      backgroundColor: colors.Neutral.White,
    },
    _active: {
      color: colors.Neutral.Black,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
  },
  tabpanel: {
    p: 0,
  },
  tablist: {
    gap: '8px',
    border: 'none !important',
    overflowX: 'auto',
    overflowY: 'hidden',
    minHeight: '50px',
    marginBottom: {
      base: 4,
      sm: 6,
    },
  },
});

const TabsTheme = defineMultiStyleConfig({
  baseStyle,
  variants: {
    expandToFillHeight: {
      root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      tabpanels: {
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
      },
    },
    vertical: {
      root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      tab: {
        width: '100%',
        borderRadius: 'button',
        justifyContent: 'flex-start',
        gap: '10px',
        _selected: {
          color: 'Neutral.White',
          backgroundColor: 'Purple.Light',
        },
        _active: {
          color: 'Neutral.White',
          backgroundColor: 'Purple.Light',
        },
      },
      tablist: {
        width: '100%',
        alignItems: 'flex-start',
      },
      tabpanels: {
        // height: '100%',
        // overflowY: 'auto',
        // overflowX: 'hidden',
      },
    },
  },
});

export default TabsTheme;
