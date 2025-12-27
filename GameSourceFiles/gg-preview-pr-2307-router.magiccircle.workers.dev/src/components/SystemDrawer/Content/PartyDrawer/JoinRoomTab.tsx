import { Button, FormControl, Text } from '@chakra-ui/react';
import { Trans, useLingui } from '@lingui/react/macro';
import { type ChangeEvent, useState } from 'react';
import { QueryParamKeys } from '@/common/analytics';
import McFlex from '@/components/McFlex/McFlex';
import MagicInput from '@/components/ui/MagicInput';

export const JoinRoomTab = () => {
  const { t } = useLingui();
  const [roomIdInputValue, setRoomIdInputValue] = useState('');
  const onChangeRoomIdField = (e: ChangeEvent<HTMLInputElement>) => {
    const cleanedRoomId = e.target.value
      .replace(/\s/g, '') // Remove all whitespace
      .toUpperCase(); // Uppercase
    setRoomIdInputValue(cleanedRoomId);
  };

  const onClickJoinRoom = () => {
    if (roomIdInputValue.length === 0) {
      return;
    }
    const pathname = `/r/${roomIdInputValue}`;
    const queryParams = `?${QueryParamKeys.mc_source}=join_drawer`;
    // just as a fail-safe, we wrap this in a try/catch
    // and proceed blindly to the new room if we can't get info
    const redirectToNewRoom = () => {
      location.href = location.origin + pathname + queryParams;
    };
    redirectToNewRoom();
  };

  return (
    <McFlex col orient="top" px={4} pb={2}>
      <FormControl
        textAlign="left"
        display="flex"
        flexDirection="column"
        gap="20px"
        position="relative"
      >
        <MagicInput
          data-testid="room-code-input"
          placeholder={t`Room code`}
          value={roomIdInputValue}
          onChange={onChangeRoomIdField}
          onEnterKeyDown={() => void onClickJoinRoom()}
          fontSize="lg"
          letterSpacing={roomIdInputValue.length > 0 ? '10px' : undefined}
          width="100%"
        />
        <Button
          bg="Cyan.Light"
          onClick={() => void onClickJoinRoom()}
          size="md"
          aria-label={t`Join room with code`}
        >
          <Trans>JOIN</Trans>
        </Button>
        <Text fontSize="xs" color="Neutral.Grey" lineHeight="1">
          <Trans>You'll leave this room when you join a new one.</Trans>
        </Text>
      </FormControl>
    </McFlex>
  );
};
