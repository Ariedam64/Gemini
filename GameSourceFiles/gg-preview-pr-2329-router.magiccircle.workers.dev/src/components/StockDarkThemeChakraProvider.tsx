import {
  ChakraProvider,
  ChakraProviderProps,
  ColorModeProviderProps,
} from '@chakra-ui/react';

const alwaysDarkModeColorManager: ColorModeProviderProps['colorModeManager'] = {
  type: 'cookie',
  get: () => 'dark',
  set: () => void 0,
};

const StockDarkThemeChakraProvider: React.FC<ChakraProviderProps> = ({
  children,
  ...restProps
}) => (
  <ChakraProvider colorModeManager={alwaysDarkModeColorManager} {...restProps}>
    {children}
  </ChakraProvider>
);

export default StockDarkThemeChakraProvider;
