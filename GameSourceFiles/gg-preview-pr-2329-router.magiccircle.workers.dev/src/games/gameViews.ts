import { type LazyExoticComponent, lazy } from 'react';
import type { GameName } from '@/common/types/games';

const gameViews = {
  AvocadoMini: lazy(() => import('./AvocadoMini/AvocadoMiniView')),
  Mango: lazy(() => import('./Mango/MangoView')),
  Nectarine: lazy(() => import('./Nectarine/NectarineView')),
  Peach: lazy(() => import('./Peach/PeachView')),
  Kiwi: lazy(() => import('./Kiwi/KiwiView')),
  Trio: lazy(() => import('./Trio/TrioView')),
  Guava: lazy(() => import('./Guava/GuavaView')),
  Farkleberry: lazy(() => import('./Farkleberry/FarkleberryView')),
  Avocado: lazy(() => import('./Avocado/AvocadoView')),
  Durian: lazy(() => import('./Durian/DurianView')),
  Jalapeno: lazy(() => import('./Jalapeno/JalapenoView')),
  Quinoa: lazy(() => import('./Quinoa/QuinoaView')),
} satisfies { [gameName in GameName]: LazyExoticComponent<React.FC> };

export default gameViews;
