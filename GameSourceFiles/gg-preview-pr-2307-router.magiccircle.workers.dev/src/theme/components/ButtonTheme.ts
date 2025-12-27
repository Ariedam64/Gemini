import { defineSafeStyleConfig } from '../types';

const commonActionStyles = {
  overflow: 'hidden',
  textTransform: 'none',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
  borderBottom: '3px solid rgba(0,0,0,0.4)',
  transition: 'all 0.2s ease',
  _hover: {
    transform: 'scale(1.02) ',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.4)',
    filter: 'brightness(1.05)',
  },
  _active: {
    filter: 'brightness(0.95)',
    borderBottomWidth: '1px',
    borderBottomColor: 'rgba(0,0,0,0.2)',
    boxShadow: 'inset 0 3px 2px rgba(0,0,0,0.2)',
  },
  style: {
    WebkitTapHighlightColor: 'transparent',
  },
};

const ButtonTheme = defineSafeStyleConfig({
  baseStyle: {
    borderRadius: 'button',
    textTransform: 'uppercase',
    _hover: {
      // fix for incredibly stupid chakra default theme
      // https://github.com/chakra-ui/chakra-ui/blob/eb0316ddf96dd259433724062e923c33e6eee729/packages/components/theme/src/components/button.ts#L20
      // does actually do what we want to specify null here, even though the
      // type says it should be a string
      _disabled: null,
    } as Record<string, unknown>,
    _active: {
      // opacity: 0.7,
      // bg: 'rgba(0, 0, 0, 0.3)',
    },
    _disabled: {
      opacity: 0.7,
      // bg: 'rgba(0, 0, 0, 0.8)',
      cursor: 'not-allowed',
    },
    fontWeight: 700,
  },
  // Note: We need to explicitly set height: auto because
  // chakra's built-in theme sets these, which breaks our padding
  sizes: {
    '2xs': {
      fontSize: '2xs',
      px: '6px',
      py: '5px',
    },
    xs: {
      fontSize: 'xs',
      px: '12px',
      py: '8px',
    },
    sm: {
      fontSize: 'sm',
      px: '14px',
      py: '18px',
      borderRadius: '20px',
    },
    md: {
      fontSize: 'md',
      px: '24px',
      py: '12px',
      height: 'auto',
    },
  },
  variants: {
    icon: {
      // we need this for e.g. IconButton
      // because chakra sucks, we need to set BOTH of these to 0
      // https://github.com/chakra-ui/chakra-ui/issues/3293#issuecomment-775081618
      minW: 0,
      minWidth: 0,
    },
    primary: {
      bg: 'Purple.Magic',
      color: 'MagicWhite',
    },
    dark: {
      bg: 'MagicBlack',
      color: 'MagicWhite',
    },
    white: {
      bg: 'Neutral.White',
      color: 'MagicBlack',
      _active: {
        opacity: 1,
        bg: 'Neutral.Grey',
      },
      _disabled: {
        opacity: 1,
        bg: 'Neutral.Grey',
        color: 'Neutral.DarkGrey',
      },
    },
    red: {
      bg: 'Red.Magic',
      color: 'MagicWhite',
    },
    green: {
      bg: 'Green.Dark',
      color: 'MagicWhite',
      outline: '3px solid',
      outlineColor: 'Green.Darker',
    },
    outline: {
      bg: 'transparent',
      border: '3px solid',
      borderColor: 'Neutral.White',
      color: 'Neutral.White',
    },
    outlineInverse: {
      bg: 'transparent',
      border: '3px solid',
      borderColor: 'MagicBlack',
    },
    ghost: {
      bg: 'transparent',
      color: 'MagicWhite',
    },
    translucentOutlineButton: {
      background:
        'linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.1) 100%)',
      minWidth: 0,
      width: '36px',
      height: '36px',
      padding: 0,
    },
    blank: {
      bg: 'transparent',
      textTransform: 'none',
      whiteSpace: 'normal',
      p: '0',
      borderRadius: '0',
      minW: 0,
      minWidth: 0,
    },
    /**
     *  Quinoa action button variants
     */
    plantSeed: {
      ...commonActionStyles,
      color: 'white',
      bg: '#38A169',
    },
    placeDecor: {
      ...commonActionStyles,
      color: 'white',
      bg: '#D5980D',
    },
    pickupDecor: {
      ...commonActionStyles,
      color: 'white',
      bg: '#A87C1D',
    },
    hatchEgg: {
      ...commonActionStyles,
      color: 'white',
      bg: '#8000B2',
    },
    plantEgg: {
      ...commonActionStyles,
      color: 'white',
      bg: '#8000B2',
    },
    placePet: {
      ...commonActionStyles,
      color: 'white',
      bg: '#8000B2',
    },
    plantGardenPlant: {
      ...commonActionStyles,
      color: 'white',
      bg: '#38A169',
    },
    harvest: {
      ...commonActionStyles,
      color: 'white',
      bg: '#8000B2',
    },
    seedShop: {
      ...commonActionStyles,
      color: 'white',
      bg: '#37A169',
    },
    eggShop: {
      ...commonActionStyles,
      color: 'white',
      bg: '#8000B2',
    },
    toolShop: {
      ...commonActionStyles,
      color: 'white',
      bg: '#2B6CB0',
    },
    decorShop: {
      ...commonActionStyles,
      color: 'white',
      bg: '#D5980D',
    },
    collectorsClub: {
      ...commonActionStyles,
      color: 'white',
      bg: '#AA9900',
    },
    petHutch: {
      ...commonActionStyles,
      color: 'white',
      bg: 'Orange.Dark',
    },
    sellAllCrops: {
      ...commonActionStyles,
      color: 'white',
      bg: '#C53030',
    },
    sellPet: {
      ...commonActionStyles,
      color: 'white',
      bg: '#C53030',
    },
    potPlant: {
      ...commonActionStyles,
      color: 'white',
      bg: '#8B4513',
    },
    removeGardenObject: {
      ...commonActionStyles,
      color: 'white',
      bg: '#8B4513',
    },
    waterPlant: {
      ...commonActionStyles,
      color: 'white',
      bg: 'Blue.Light',
    },
    instaGrow: {
      ...commonActionStyles,
      color: 'black',
      bg: '#E9B530',
    },
    logItems: {
      ...commonActionStyles,
      color: 'white',
      bg: '#8B4513',
    },
    wetPotion: {
      ...commonActionStyles,
      color: 'white',
      bg: 'linear-gradient(135deg, rgb(128, 128, 255) 0%, rgb(100, 100, 235) 100%)',
    },
    chilledPotion: {
      ...commonActionStyles,
      color: 'rgba(35, 35, 35, 1)',
      bg: 'linear-gradient(135deg, rgb(183, 183, 236) 0%, rgb(163, 163, 216) 100%)',
    },
    frozenPotion: {
      ...commonActionStyles,
      color: 'white',
      bg: 'linear-gradient(135deg, rgb(128, 128, 255) 0%, rgb(90, 90, 230) 100%)',
    },
    dawnlitPotion: {
      ...commonActionStyles,
      color: 'white',
      bg: 'linear-gradient(135deg, rgb(120, 100, 180) 0%, rgb(100, 80, 160) 100%)',
    },
    amberlitPotion: {
      ...commonActionStyles,
      color: 'white',
      bg: 'linear-gradient(135deg, rgb(255, 140, 26) 0%, rgb(230, 92, 26) 50%, rgb(178, 58, 26) 100%)',
    },
    goldPotion: {
      ...commonActionStyles,
      color: 'rgba(35, 35, 35, 1)',
      bg: 'linear-gradient(135deg, rgb(255, 215, 0) 0%, rgb(235, 195, 0) 100%)',
    },
    rainbowPotion: {
      ...commonActionStyles,
      color: 'rgba(35, 35, 35, 1)',
      bg: 'linear-gradient(135deg, #FF1744 0%, #FF9100 20%, #FFEA00 40%, #00E676 60%, #2979FF 80%, #D500F9 100%)',
    },
    wish: {
      ...commonActionStyles,
      color: 'white',
      bg: '#555555',
    },
    anonymousGarden: {
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
      border: '2px solid',
      borderRadius: '8px',
      color: 'white',
      bg: 'black',
      borderColor: '#666666',
      cursor: 'default',
      pointerEvents: 'none',
      textTransform: 'none',
      _hover: {},
      _active: {},
    },
    otherPlayersGarden: {
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
      border: '2px solid',
      borderRadius: '8px',
      color: 'white',
      bg: 'black',
      borderColor: '#666666',
      cursor: 'default',
      pointerEvents: 'none',
      textTransform: 'none',
      _hover: {},
      _active: {},
    },
    invalid: {
      ...commonActionStyles,
      color: 'white',
      bg: '#4A5568',
      borderColor: '#718096',
      borderRadius: 0,
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'primary',
  },
});

export default ButtonTheme;
