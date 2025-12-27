import { useAtomValue } from 'jotai';
import { activeModalAtom } from '../../atoms/modalAtom';
import InventoryModal from '../inventory/InventoryModal';
import ActivityLogModal from './ActivityLogModal';
import DecorShopModal from './DecorShopModal';
import EggShopModal from './EggShopModal';
import LeaderboardModal from './LeaderboardModal';
import PetHutchModal from './PetHutchModal';
import SeedShopModal from './SeedShopModal';
import StatsModal from './StatsModal';
import ToolShopModal from './ToolShopModal';
import JournalModal from './journal/JournalModal';

export const Modals = () => {
  const activeModal = useAtomValue(activeModalAtom);
  return (
    <>
      {activeModal === 'seedShop' && <SeedShopModal />}
      {activeModal === 'eggShop' && <EggShopModal />}
      {activeModal === 'toolShop' && <ToolShopModal />}
      {activeModal === 'decorShop' && <DecorShopModal />}
      {activeModal === 'leaderboard' && <LeaderboardModal />}
      {activeModal === 'inventory' && <InventoryModal />}
      {activeModal === 'journal' && <JournalModal />}
      {activeModal === 'stats' && <StatsModal />}
      {activeModal === 'petHutch' && <PetHutchModal />}
      {activeModal === 'activityLog' && <ActivityLogModal />}
    </>
  );
};
