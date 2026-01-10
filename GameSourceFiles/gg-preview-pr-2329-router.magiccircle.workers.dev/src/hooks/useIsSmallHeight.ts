import useWindowSize from './useWindowSize';

const heightBreakPoint = 500;

const useIsSmallHeight = () => {
  const windowSize = useWindowSize();
  return windowSize.height < heightBreakPoint;
};

export function getIsSmallHeight() {
  return window.innerHeight < heightBreakPoint;
}

export default useIsSmallHeight;
