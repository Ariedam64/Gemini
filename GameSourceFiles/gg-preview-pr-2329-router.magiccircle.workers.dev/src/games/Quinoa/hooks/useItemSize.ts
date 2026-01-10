import { useIsSmallScreen } from '@/hooks/useIsSmallScreen';

function useItemSize(): number {
  const isSmallScreen = useIsSmallScreen();
  if (isSmallScreen) {
    return 64;
  }
  return 74;
}

export default useItemSize;
