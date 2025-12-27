import { useEffect } from 'react';
import { useCompleteGameTask } from '@/user';

interface HACKYStreakUpdaterProps {}

const HACKYStreakUpdater: React.FC<HACKYStreakUpdaterProps> = () => {
  const completeDailyGameTask = useCompleteGameTask();

  useEffect(() => {
    completeDailyGameTask('Quinoa');
  }, []);

  return null;
};

export default HACKYStreakUpdater;
