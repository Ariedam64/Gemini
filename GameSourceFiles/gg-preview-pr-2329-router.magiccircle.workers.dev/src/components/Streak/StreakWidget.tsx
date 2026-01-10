import streakFlame from '@/assets/FlameIcon.webp';
import MagicWidget from '@/components/ui/MagicWidget';
import { useStreak } from './useStreak';
import useStreakModal from './useStreakModal';

type StreakWidgetProps = {};

const StreakWidget: React.FC<StreakWidgetProps> = () => {
  const showStreakModal = useStreakModal();
  const { streakState } = useStreak();
  const isStreakDead = !streakState || streakState.status === 'inactive';
  const isStreakActivityTodayCompleted = streakState?.status === 'active';

  const onClickStreak = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    void showStreakModal(e);
  };

  return (
    <MagicWidget
      onClick={onClickStreak}
      iconProps={{
        src: streakFlame,
        boxSize: '36px',
        filter: isStreakActivityTodayCompleted ? 'none' : 'grayscale(100%)',
      }}
      buttonProps={{ variant: 'blank' }}
      textProps={{
        strokeColor: isStreakActivityTodayCompleted
          ? 'MagicBlack'
          : 'Neutral.EarlGrey',
      }}
      value={isStreakDead ? 0 : (streakState?.streakCount ?? 0)}
      isAlertActive={!isStreakActivityTodayCompleted}
    />
  );
};

export default StreakWidget;
