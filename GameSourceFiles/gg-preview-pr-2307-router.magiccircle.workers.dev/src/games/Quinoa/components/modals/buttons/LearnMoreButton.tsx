import { Button } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import StrokedText from '@/components/StrokedText/StrokedText';

export const LearnMoreButton = ({ onClick }: { onClick: () => void }) => (
  <Button
    w="100%"
    h="40px"
    bg="Orange.Light"
    borderBottom="3px solid rgba(0,0,0,0.4)"
    _hover={{
      transform: 'scale(1.01)',
    }}
    _active={{
      borderBottomWidth: '1px',
      borderBottomColor: 'rgba(0,0,0,0.2)',
      boxShadow: 'inset 0 3px 2px rgba(0,0,0,0.2)',
    }}
    transition="transform 0.2s ease"
    borderRadius="8px"
    onClick={onClick}
  >
    <StrokedText
      color="white"
      strokeColor="black"
      shadowHeight={0}
      fontSize="14px"
      fontWeight="bold"
      mt={1}
    >
      <Trans>LEARN MORE</Trans>
    </StrokedText>
  </Button>
);
