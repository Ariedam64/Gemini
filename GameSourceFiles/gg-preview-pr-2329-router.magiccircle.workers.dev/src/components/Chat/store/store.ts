import { atom } from 'jotai';
import type { ChatData } from '@/common/types/chat-data';

export const isChatWidgetOpenAtom = atom(false);

export interface UnreadMessageData {
  /** Number of unread messages since chat was last opened */
  count: number;
  /** The most recent message received, or null if no unread messages */
  latestMessage: ChatData | null;
}

export const unreadMessageDataAtom = atom<UnreadMessageData>({
  count: 0,
  latestMessage: null,
});

export const isMessagesMinimizedAtom = atom(false);
