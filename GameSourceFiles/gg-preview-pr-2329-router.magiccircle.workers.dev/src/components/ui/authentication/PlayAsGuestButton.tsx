import { Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';

interface PlayAsGuestButtonProps {
  onClick: () => void;
}

const PlayAsGuestButton: React.FC<PlayAsGuestButtonProps> = ({ onClick }) => {
  return (
    <Button
      h="50px"
      w="180px"
      backgroundColor="rgba(120, 120, 120, 1)"
      data-testid="coversheet-play-as-guest"
      onClick={onClick}
      textTransform="none"
      flexDirection="column"
      fontWeight="semibold"
      borderRadius="14px"
      fontSize="18px"
    >
      <Trans>Play as guest</Trans>
      <Text fontSize="11px">
        <Trans>progress not saved</Trans>
      </Text>
    </Button>
  );
};

export default PlayAsGuestButton;
