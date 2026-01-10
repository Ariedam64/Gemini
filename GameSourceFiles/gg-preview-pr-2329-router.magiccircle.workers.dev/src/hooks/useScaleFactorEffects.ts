import { useEffect } from 'react';
import { useSetDesktopWindowScaleFactor } from '@/store/store';
import useIsSmallWidth from './useIsSmallWidth';

const desktopWindowWidth = 1200;
const desktopWindowHeight = 680;

// We only use the scale factor for legacy games and some drawers on large screens
const useScaleFactorEffects = () => {
  const isSmallWidth = useIsSmallWidth();

  const setScaleFactor = useSetDesktopWindowScaleFactor();
  const calculateScaleFactors = () => {
    const appWrapper = document.getElementById('AppWrapper');
    if (!appWrapper) {
      return;
    }
    const appWrapperWidth = appWrapper.offsetWidth;
    const appWrapperHeight = appWrapper.offsetHeight;
    // Calculate the scaling factor based on the minimum ratio
    const widthRatio = appWrapperWidth / desktopWindowWidth;
    const heightRatio = appWrapperHeight / desktopWindowHeight;
    const minRatio = Math.min(widthRatio, heightRatio);
    setScaleFactor(minRatio);
  };

  useEffect(() => {
    if (isSmallWidth) {
      setScaleFactor(1);
      return;
    }
    calculateScaleFactors();
    window.addEventListener('resize', calculateScaleFactors);
    return () => {
      window.removeEventListener('resize', calculateScaleFactors);
    };
  }, [isSmallWidth]);
};

export default useScaleFactorEffects;
