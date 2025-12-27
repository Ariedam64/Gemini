import { Box, BoxProps } from '@chakra-ui/react';

interface VerticalDividerProps extends BoxProps {}

const VerticalDivider: React.FC<VerticalDividerProps> = (props) => {
  return (
    <Box
      my={{ base: '6px', sm: '7px', md: '8px' }}
      minW="4px"
      h={{ base: '56px', sm: '64px', md: '72px' }}
      bg="Neutral.LightGrey"
      borderRadius="10px"
      opacity={0.2}
      {...props}
    />
  );
};

export default VerticalDivider;
