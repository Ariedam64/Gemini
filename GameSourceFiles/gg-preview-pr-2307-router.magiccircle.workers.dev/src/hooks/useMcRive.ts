import { useEffect, useState } from 'react';
import { RiveFile } from '@rive-app/canvas';
import {
  UseRiveOptions,
  UseRiveParameters,
  useRive,
} from '@rive-app/react-canvas';
import { isHeadlessBrowser } from '@/environment';
import {
  useDesktopWindowScaleFactor,
  useDrawerType,
  useRiveFileCache,
} from '@/store/store';
function useMcRive(
  riveParams: UseRiveParameters,
  opts: Partial<UseRiveOptions> = {}
) {
  const riveFileCache = useRiveFileCache();
  const drawerType = useDrawerType();
  const [cachedRiveFile, setCachedRiveFile] = useState<RiveFile | undefined>();
  const shouldUseCache =
    riveParams &&
    riveParams.src &&
    !riveParams.riveFile &&
    // Don't use cache if the caller provided their own assetLoader
    // This is because generally we use assetLoaders for dynamic content
    // per Rive Component, and unfortuntely the way Rive works, we can only set
    // dynamic content on a per-RiveFile basis. This sucks, because it means we
    // can't share a single RiveFile for RiveAvatar, because all of those
    // avatars would need to share the same assetLoader.
    riveParams.assetLoader === undefined;

  // If we're using the cache, we'll set computedRiveParams to undefined
  // which tells the useRive() hook to wait
  let computedRiveParams: UseRiveParameters | null = shouldUseCache
    ? null
    : riveParams;

  useEffect(() => {
    if (!shouldUseCache || !riveParams.src) return;
    riveFileCache
      .getOrFetch(riveParams.src)
      .then(setCachedRiveFile)
      .catch(console.error);
  }, [riveFileCache, shouldUseCache, riveParams?.src]);

  // If the cached file is ready, we patch the riveParams
  // to use the file from the cache and delete the src
  if (cachedRiveFile) {
    computedRiveParams = {
      ...riveParams,
      src: undefined,
      riveFile: cachedRiveFile,
    };
  }

  const useRiveResult = useRive(computedRiveParams, opts);
  const scaleFactor = useDesktopWindowScaleFactor();

  // All Rive components need to be resized when the window scale factor changes.
  useEffect(() => {
    useRiveResult.rive?.resizeDrawingSurfaceToCanvas();
  }, [scaleFactor]);

  useEffect(() => {
    const rive = useRiveResult.rive;
    if (!rive) {
      return;
    }
    const isProfileDrawer =
      drawerType === 'profile' || drawerType === 'profile-avatar';
    const shouldPause = isProfileDrawer;

    if (shouldPause) {
      rive.stopRendering();
    } else {
      rive.startRendering();
    }
  }, [useRiveResult.rive, drawerType]);

  if (isHeadlessBrowser) {
    return {
      rive: null,
      RiveComponent: () => 'Rive is disabled in headless browser',
    };
  }

  return useRiveResult;
}

export default useMcRive;
