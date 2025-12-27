import { breakpoints } from '@/theme/RoomTheme';
import useWindowSize from './useWindowSize';

const useIsSmallWidth = () => {
  const windowSize = useWindowSize();
  return windowSize.width < breakpoints.md;
};

export function getIsSmallWidth() {
  return window.innerWidth < breakpoints.md;
}

export default useIsSmallWidth;
