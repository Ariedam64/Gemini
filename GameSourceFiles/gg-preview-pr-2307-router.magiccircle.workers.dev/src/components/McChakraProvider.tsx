import { ChakraProvider, ChakraProviderProps } from '@chakra-ui/react';
import RoomTheme from '@/theme/RoomTheme';

const McChakraProvider: React.FC<ChakraProviderProps> = (props) => {
  return <ChakraProvider theme={RoomTheme} {...props} />;
};

export default McChakraProvider;
