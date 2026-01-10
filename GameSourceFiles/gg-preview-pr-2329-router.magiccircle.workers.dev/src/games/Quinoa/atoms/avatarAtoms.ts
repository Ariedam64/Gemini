import { atom } from 'jotai';
import type { PlayerId } from '@/common/types/player';
import type { AvatarTriggerAnimationName } from '@/components/Avatars/avatarRiveConstants';

export const avatarTriggerAnimationAtom = atom<{
  playerId: PlayerId;
  animation: AvatarTriggerAnimationName;
} | null>(null);
