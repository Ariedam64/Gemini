import { useEffect, useRef } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { useFilteredMessages } from '@/store/store';
import {
  isChatWidgetOpenAtom,
  isMessagesMinimizedAtom,
  unreadMessageDataAtom,
} from '../store/store';

/**
 * Tracks unread messages and updates count when new messages arrive while chat is closed.
 */
export const useTrackUnreadMessages = () => {
  const filteredMessages = useFilteredMessages();
  const isChatWidgetOpen = useAtomValue(isChatWidgetOpenAtom);
  const isMessagesMinimized = useAtomValue(isMessagesMinimizedAtom);
  const setUnreadMessageData = useSetAtom(unreadMessageDataAtom);
  const previousCountRef = useRef(filteredMessages.length);

  useEffect(() => {
    const currentCount = filteredMessages.length;
    const previousCount = previousCountRef.current;

    if (
      currentCount > previousCount &&
      (!isChatWidgetOpen || (isChatWidgetOpen && isMessagesMinimized))
    ) {
      const newMessageCount = currentCount - previousCount;
      const latestMessage = filteredMessages[currentCount - 1] ?? null;

      setUnreadMessageData((prev) => ({
        count: Math.min(prev.count + newMessageCount, 999),
        latestMessage,
      }));
    }

    previousCountRef.current = currentCount;
  }, [filteredMessages, isChatWidgetOpen, setUnreadMessageData]);
};
