import useIsSmallHeight, { getIsSmallHeight } from './useIsSmallHeight';
import useIsSmallWidth, { getIsSmallWidth } from './useIsSmallWidth';

export const useIsSmallScreen = () => {
  const isSmallHeight = useIsSmallHeight();
  const isSmallWidth = useIsSmallWidth();
  return isSmallHeight || isSmallWidth;
};

// Non-hook version
export function getIsSmallScreen() {
  const isSmallHeight = getIsSmallHeight();
  const isSmallWidth = getIsSmallWidth();
  return isSmallHeight || isSmallWidth;
}
