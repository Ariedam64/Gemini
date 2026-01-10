import { Image } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import { buildRenderUrl } from '@/common/mcraster/utils';
import { playerCosmeticToUserStyle } from '@/common/resources/cosmetics/utils';
import { environment, surface } from '@/environment';
import { usePlayer } from '@/store/store';
import { targetStreakTimeAtom } from './store';
import { useStreak } from './useStreak';

const UpdatingStreakImage = () => {
  const player = usePlayer();
  const { streakState } = useStreak();
  const targetTime = useAtomValue(targetStreakTimeAtom);

  const streakImageURL = buildRenderUrl(
    'streakCounterWithTimeline',
    {
      blobling: {
        userStyle: playerCosmeticToUserStyle(player.cosmetic),
        discordAvatar: player.discordAvatarUrl ?? undefined,
      },
      streakState: streakState ?? {
        streakCount: 0,
        status: 'inactive',
        isRewardDay: false,
      },
    },
    environment,
    // in order to use mcraster via discord activity iframe, we need to proxy through the router
    surface === 'discord' ? `${window.location.origin}/mcraster/` : undefined
  );

  const cacheBustingStreakImageUrl = new URL(streakImageURL);
  cacheBustingStreakImageUrl.searchParams.set(
    't',
    targetTime.getTime().toString()
  );

  return (
    <Image src={cacheBustingStreakImageUrl.toString()} alt="Streak Progress" />
  );
};

export default UpdatingStreakImage;
