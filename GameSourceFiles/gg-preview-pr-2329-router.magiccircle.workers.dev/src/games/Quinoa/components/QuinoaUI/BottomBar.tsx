import useIsSmallWidth from '@/hooks/useIsSmallWidth';
import BottomBarNarrow from './BottomBarNarrow';
import BottomBarWide from './BottomBarWide';

interface BottomBarProps {}

const BottomBar: React.FC<BottomBarProps> = () => {
  const isSmallWidth = useIsSmallWidth();

  return isSmallWidth ? <BottomBarNarrow /> : <BottomBarWide />;
};

export default BottomBar;
