import { Box, Button } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'react-feather';
import StaticAvatarTokenWithName from '@/components/Avatars/AvatarTokenWithName';
import McFlex from '@/components/McFlex/McFlex';
import { getDecoration } from '@/constants/decorations';
import { useFilteredMessages, usePlayerId } from '@/store/store';
import { usePlayerChatDisplay } from '../hooks/usePlayerChatDisplay';
import ChatMessageBubble from './ChatMessageBubble';

type ChatMessagesProps = {};

const ChatMessages: React.FC<ChatMessagesProps> = () => {
  const chatRef = useRef<HTMLDivElement>(null);
  const filteredMessages = useFilteredMessages();
  const myPlayerId = usePlayerId();
  const [hasScrolledUp, setHasScrolledUp] = useState(false);
  const [hasNewUnreadMessages, setHasNewUnreadMessages] = useState(false);
  const [previousMessageCount, setPreviousMessageCount] = useState(0);
  const {
    getPastelPlayerColor,
    getPlayerName,
    getPlayerCosmetic,
    getPlayerDiscordAvatarUrl,
  } = usePlayerChatDisplay();

  useEffect(() => {
    if (!chatRef.current) {
      return;
    }
    const currentMessageCount = filteredMessages.length;
    const hasNewMessages = currentMessageCount > previousMessageCount;

    if (hasScrolledUp && hasNewMessages) {
      // Only show unread indicator if user is scrolled up AND new messages arrived
      setHasNewUnreadMessages(true);
    } else if (!hasScrolledUp) {
      // User is at bottom, clear unread indicator and scroll to bottom
      setHasNewUnreadMessages(false);
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
    setPreviousMessageCount(currentMessageCount);
  }, [filteredMessages, hasScrolledUp, previousMessageCount]);

  return (
    <Box
      position="relative"
      h="100%"
      w="100%"
      overflow="hidden"
      borderRight="4px solid"
      borderColor="Neutral.EarlGrey"
      borderRadius="10px"
      bg="Neutral.EarlGrey"
      p={0.5}
    >
      {hasNewUnreadMessages && (
        <McFlex position="absolute" bottom={3} orient="bottom" zIndex={1} autoH>
          <Button
            onClick={() => {
              if (chatRef.current) {
                chatRef.current.scrollTop = chatRef.current.scrollHeight;
              }
            }}
            size="sm"
            boxShadow="0 4px 12px rgba(0, 0, 0, 0.6)"
          >
            <Trans>New messages</Trans> <ArrowDown />
          </Button>
        </McFlex>
      )}
      <McFlex
        ref={chatRef}
        col
        orient="top"
        pt="10px"
        pb="5px"
        pl="2px"
        pr="4px"
        overflowX="hidden"
        overflowY="auto"
        gap="3px"
        sx={{
          '&::-webkit-scrollbar': {
            width: '3px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
            my: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'grey',
            borderRadius: '3px',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.5)',
            },
          },
        }}
        onPointerMove={(e) => {
          e.stopPropagation();
        }}
        onScroll={(e) => {
          const { scrollHeight, clientHeight, scrollTop } = e.currentTarget;
          const isNearBottom = scrollHeight - clientHeight - scrollTop <= 100;
          // Track if user has scrolled up from the bottom
          setHasScrolledUp(!isNearBottom);
        }}
      >
        {filteredMessages.map((message) => (
          <McFlex
            key={`${message.timestamp}-${message.playerId}`}
            auto
            sx={{
              alignSelf:
                myPlayerId === message.playerId ? 'flex-end' : 'flex-start',
              ml: myPlayerId === message.playerId ? '0px' : '10px',
            }}
          >
            <McFlex order={2} orient="top" px="0px" maxW="180px">
              <ChatMessageBubble
                message={message.message}
                isMyMessage={myPlayerId === message.playerId}
                color={getPastelPlayerColor(message.playerId)}
              />
            </McFlex>
            <McFlex
              orient="top"
              autoW
              sx={{ order: myPlayerId === message.playerId ? 3 : 1 }}
            >
              <StaticAvatarTokenWithName
                name={getPlayerName(message.playerId)}
                backgroundColor={
                  getDecoration(getPlayerCosmetic(message.playerId).color)
                    .backgroundColor
                }
                staticAvatarProps={{
                  avatar: getPlayerCosmetic(message.playerId).avatar,
                  discordAvatarUrl: getPlayerDiscordAvatarUrl(message.playerId),
                }}
              />
            </McFlex>
          </McFlex>
        ))}
      </McFlex>
    </Box>
  );
};

export default ChatMessages;
