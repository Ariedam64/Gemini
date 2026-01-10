import { atom } from 'jotai';
import type { DeepLinkPayloadData } from '@/common/types/deep-links';

export const pendingDeepLinkNotificationAtom = atom<DeepLinkPayloadData | null>(
  null
);
