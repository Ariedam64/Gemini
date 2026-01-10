import { type Config, GameStatus } from '@/common/config/config';
import type { GameName } from '@/common/types/games';
import { surface } from '@/environment';

export function getGamesToShowInOrder(
  gameStatuses: Config['root_gameStatuses'],
  gamesNamesSorted: GameName[]
) {
  const gamesShown = gamesNamesSorted.filter((gameName) => {
    const status = gameStatuses[gameName];
    if (status === GameStatus.Hidden) {
      return false;
    }
    if (surface === 'webview') {
      const embeddedGames: GameName[] = ['Trio', 'Durian', 'Avocado'];
      return embeddedGames.includes(gameName);
    }
    return status === GameStatus.Visible;
  });

  return gamesShown;
}
