import { Button } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import StrokedText from '@/components/StrokedText/StrokedText';

export const NotifyMeButton = ({
  isSubscribed,
  onClick,
  isLoading,
}: {
  isSubscribed: boolean;
  onClick: () => void;
  isLoading: boolean;
}) => (
  <Button
    w="auto"
    h="40px"
    bg={isSubscribed ? 'Yellow.Magic' : 'Neutral.DarkGrey'}
    borderWidth="2px"
    borderColor={isSubscribed ? 'Yellow.Dark' : 'Neutral.DarkGrey'}
    borderRadius="5px"
    onClick={onClick}
    isLoading={isLoading}
    display="flex"
    alignItems="center"
    justifyContent="center"
    flexDirection="column"
  >
    <StrokedText
      color="white"
      strokeColor="black"
      shadowHeight={0}
      fontSize="14px"
      fontWeight="bold"
    >
      <Trans>NOTIFY</Trans>
    </StrokedText>
    <StrokedText
      mt={-1.5}
      color="white"
      strokeColor="black"
      shadowHeight={0}
      fontSize="10px"
      fontWeight="extrabold"
    >
      {isSubscribed ? <Trans>ON</Trans> : <Trans>OFF</Trans>}
    </StrokedText>
  </Button>
);
