import { EmoteType } from '@/common/types/emote';
import type Player from '@/common/types/player';

const defaultPlayer: Player = {
  id: '',
  name: 'New Player',
  isConnected: true,
  cosmetic: {
    color: 'Red',
    avatar: [],
  },
  emoteData: {
    emoteType: EmoteType.Idle,
  },
  secondsRemainingUntilChatEnabled: 0,
  discordAvatarUrl: null,
  databaseUserId: null,
  guildId: null,
};

export default defaultPlayer;
