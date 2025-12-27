//
// ██   ██ ███████  █████  ██████  ███████     ██    ██ ██████
// ██   ██ ██      ██   ██ ██   ██ ██          ██    ██ ██   ██
// ███████ █████   ███████ ██   ██ ███████     ██    ██ ██████
// ██   ██ ██      ██   ██ ██   ██      ██     ██    ██ ██
// ██   ██ ███████ ██   ██ ██████  ███████      ██████  ██
//
// 💥 If you change this file, remember to run `pnpm chakra-typegen`
//
import { ChakraTheme, extendTheme, theme } from '@chakra-ui/react';
import colors from './colors';
import AlertTheme from './components/AlertTheme';
import ButtonTheme from './components/ButtonTheme';
import CardTheme from './components/CardTheme';
import DrawerTheme from './components/DrawerTheme';
import HeadingTheme from './components/HeadingTheme';
import InputTheme from './components/InputTheme';
import ModalTheme from './components/ModalTheme';
import ProgressTheme from './components/ProgressTheme';
import SelectTheme from './components/SelectTheme';
import SwitchTheme from './components/SwitchTheme';
import TabsTheme from './components/TabsTheme';
import TextTheme from './components/TextTheme';
import TextareaTheme from './components/TextareaTheme';
import TokenTheme from './components/TokenTheme';
import TooltipTheme from './components/TooltipTheme';

export const LoadingScreenZIndex = 8000;
export const RuntimeErrorZIndex = 10_000;

// Chakra's extendTheme does an object merge, but we want to fully replace
// the breakpoints, so we set it to undefined here.
// See: https://github.com/chakra-ui/chakra-ui/issues/4813#issuecomment-939194128
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
theme.breakpoints = undefined;

// Same as above
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
theme.colors = undefined;

// Same as above
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
theme.radii = undefined;

// Same as above
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
theme.shadows = undefined;

/**
 * Breakpoint values for responsive design.
 *
 * These must be pixel values to work around Chakra UI bugs where string values
 * can cause severe performance issues with responsive breakpoint hooks
 *
 * @see {@link https://chakra-ui.com/docs/styled-system/responsive-styles#customizing-breakpoints | Chakra UI Breakpoints Documentation}
 */
export const breakpoints = {
  base: 0,
  sm: 380,
  md: 720,
  lg: 1024,
} satisfies Record<string, number>;

export type McBreakpoint = keyof typeof breakpoints;

// This is the default theme for the website.
// Room is the top scope.
// NOTE: if you modify this, you should run `npm run chakra-typegen` to update
// the types, which gives us stuff like autocomplete for theme colors (e.g. "MagicWhite")
const RoomTheme = extendTheme({
  colors,
  styles: {
    global: {
      body: {
        bg: 'MagicBlack',
        // white, not blue highlight
        WebkitTapHighlightColor: 'rgba(255, 255, 255, .4)',
        userSelect: 'none',
      },
    },
  },
  // https://chakra-ui.com/docs/styled-system/theme#z-index-values
  zIndices: {
    BackgroundImage: -1,
    Slapper: 2000,
    EmoteWindow: 5000,
    StandardModalOverlay: 5040,
    StandardModal: 5045,
    AboveGameModal: 5046,
    QuinoaToast: 5047,
    GameTooltip: 5048,
    GameWindowModal: 5050,
    CurrencyTransactionEventAnnouncer: 5090,
    ChatWidget: 5095,
    PresentableOverlay: 5100,
    PresentableModal: 5410,
    // Note: chakra's toast z-index is 5500
    BreadToasterWindow: 6000,
    SlotMachineScrim: 6010,
    ActiveSlotMachine: 6011,
    SystemDrawer: 7000,
    PurchaseModal: 7002,
    ReportPlayerModal: 7003,
    DialogOverlay: 7010,
    DialogModal: 7010,
    GameStartingCountdown: 7700,
    ConnectionIssuesModal: 8000,
    LoadingScreenZIndex,
    CriticalErrorModalOverlay: 8010,
    CriticalErrorModal: 8020,
    RuntimeErrorZIndex,
  },
  fonts: {
    body: 'GreyCliff CF',
    heading: 'GreyCliff CF',
    textSlap: 'Shrikhand',
  },
  breakpoints,
  fontWeights: {
    thin: 100,
    extralight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    demibold: 600,
    bold: 700,
    extrabold: 800,
    heavy: 900,
  },
  fontSizes: {
    '2xs': '12px',
    xs: '14px',
    sm: '16px',
    sm2: '18px',
    md: '20px',
    lg: '24px',
    xl: '32px',
    '2xl': '36px',
    '4xl': '48px',
    'textSlapper-default': '60px',
    'textSlapper-mini': '38px',
  },
  shadows: {
    cartoon: '0px 4px 0px 0px rgba(0, 0, 0, 0.25)',
  },
  radii: {
    button: '50px',
    full: '9999px', // need this one for IconButton.isRound = true
    card: '12px',
    input: '6px',
  },
  components: {
    // Built-in components
    Button: ButtonTheme,
    Tabs: TabsTheme,
    Text: TextTheme,
    Input: InputTheme,
    Textarea: TextareaTheme,
    Heading: HeadingTheme,
    Modal: ModalTheme,
    Alert: AlertTheme,
    Card: CardTheme,
    Drawer: DrawerTheme,
    Progress: ProgressTheme,
    Switch: SwitchTheme,
    Select: SelectTheme,
    Tooltip: TooltipTheme,
    // Custom components
    Token: TokenTheme,
  },
  config: {
    initialColorMode: 'dark',
  },
} satisfies Partial<ChakraTheme>);

export default RoomTheme;
