import { useAtomValue } from 'jotai';
import { isGameWindowedAtom } from '@/components/GameWindow/store';
import McFlex from '@/components/McFlex/McFlex';
import McGrid from '@/components/McGrid/McGrid';
import ActionUI from '../action/ActionUI';
import ActivityLogButton from '../modals/buttons/ActivityLogButton';
import LeaderboardButton from '../modals/buttons/LeaderboardButton';
import PetSlots from '../pets/PetSlots';
import ChatButton from './ChatButton';
import NavButtons from './NavButtons';
import StatsButton from './StatsButton';
import WeatherStatus from './WeatherStatus';

type CenterAreaProps = {};

const CenterArea: React.FC<CenterAreaProps> = () => {
  const isGameWindowed = useAtomValue(isGameWindowedAtom);

  return (
    <McGrid templateColumns="1fr auto 1fr" position="relative" px={1} gap={1}>
      <McFlex orient="left" zIndex={1}>
        <PetSlots />
      </McFlex>
      <McFlex position="relative" orient="top">
        <McFlex auto mt={{ base: 0, lg: isGameWindowed ? '4px' : '-45px' }}>
          <NavButtons />
        </McFlex>
        <McFlex orient="bottom" position="absolute">
          <ActionUI />
        </McFlex>
      </McFlex>
      <McFlex orient="top right" col gap={1}>
        <WeatherStatus />
        <LeaderboardButton />
        <StatsButton />
        <ActivityLogButton />
        <ChatButton />
      </McFlex>
    </McGrid>
  );
};

export default CenterArea;
