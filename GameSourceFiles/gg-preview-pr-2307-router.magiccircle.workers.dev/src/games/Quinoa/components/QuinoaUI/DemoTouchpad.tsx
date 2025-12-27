import { Box } from '@chakra-ui/react';
import McFlex from '@/components/McFlex/McFlex';

const DemoTouchpad: React.FC = () => {
  return (
    <McFlex
      position="absolute"
      left="50%"
      top="70%"
      transform="translateY(-50%)"
      zIndex="2"
      pointerEvents="none"
      auto
      style={{ touchAction: 'none' }}
    >
      <Box
        position="absolute"
        width="100px"
        height="100px"
        bg="rgba(255, 255, 255, 0.2)"
        borderWidth="2px"
        borderColor="rgba(255, 255, 255, 0.5)"
        borderRadius="50%"
      />
      <Box
        position="absolute"
        width="50px"
        height="50px"
        bg="rgba(255, 255, 255, 0.2)"
        borderRadius="50%"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      />
    </McFlex>
  );
};

export default DemoTouchpad;
