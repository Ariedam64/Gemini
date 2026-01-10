import type { GameName } from '@/common/types/games';
import AvocadoMetaData from './Avocado/AvocadoMetaData';
import AvocadoMiniMetaData from './AvocadoMini/AvocadoMiniMetaData';
import DurianMetaData from './Durian/DurianMetaData';
import FarkleberryMetaData from './Farkleberry/FarkleberryMetaData';
import GuavaMetaData from './Guava/GuavaMetaData';
import JalapenoMetaData from './Jalapeno/JalapenoMetaData';
import KiwiMetaData from './Kiwi/KiwiMetaData';
import MangoMetaData from './Mango/MangoMetaData';
import NectarineMetaData from './Nectarine/NectarineMetaData';
import PeachMetaData from './Peach/PeachMetaData';
import QuinoaMetaData from './Quinoa/QuinoaMetaData';
import TrioMetaData from './Trio/TrioMetaData';
import type { GameMetaData } from './types';

type GameMetaDataMap = {
  [gameName in GameName]: GameMetaData;
};

const gameMetaDatas: GameMetaDataMap = {
  Jalapeno: JalapenoMetaData,
  Kiwi: KiwiMetaData,
  Trio: TrioMetaData,
  Farkleberry: FarkleberryMetaData,
  Durian: DurianMetaData,
  Avocado: AvocadoMetaData,
  Guava: GuavaMetaData,
  AvocadoMini: AvocadoMiniMetaData,
  Mango: MangoMetaData,
  Nectarine: NectarineMetaData,
  Peach: PeachMetaData,
  Quinoa: QuinoaMetaData,
};

export default gameMetaDatas;
