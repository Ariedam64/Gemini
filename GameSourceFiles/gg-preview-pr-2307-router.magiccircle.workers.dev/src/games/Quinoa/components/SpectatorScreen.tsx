import { Text } from '@chakra-ui/layout';
import { Button, Icon } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { Plus } from 'react-feather';
import McFlex from '@/components/McFlex/McFlex';
import { surface } from '@/environment';

type HACKYSpectatingScreenProps = {};

const SpectatorScreen: React.FC<HACKYSpectatingScreenProps> = () => {
  // On iOS, the last-used room is saved to app storage, so you might get "softlocked" into a full room
  // This is a hack to allow you to create a new room to get out of it
  const handleNewRoom = () => {
    location.href = location.origin;
  };

  return (
    <McFlex position="absolute" col>
      <Text color="white" fontWeight="bold" size="xl" textAlign="center">
        <Trans>This room is full.</Trans>
      </Text>
      <Text color="white" fontWeight="bold" size="md" textAlign="center">
        <Trans>
          For performance reasons, we've temporarily removed spectating.
        </Trans>
      </Text>
      {surface === 'webview' && (
        <Button
          mt={4}
          leftIcon={<Icon strokeWidth={4} as={Plus} />}
          onClick={handleNewRoom}
        >
          <Trans>New room</Trans>
        </Button>
      )}
    </McFlex>
  );
};

export default SpectatorScreen;
