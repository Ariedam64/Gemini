import { ErrorBoundary } from '@sentry/react';
import { useAtom } from 'jotai';
import { lazy, Suspense, useEffect, useState } from 'react';
import { isHeadlessBrowser } from '@/environment';
import { isLoadingAnimationVisibleAtom } from '@/store/store';
import { LoadingScreenZIndex } from '@/theme/RoomTheme';
import LoadingAnimation from './LoadingAnimation';

const Main = lazy(() => import('../main'));

function hidePreloadingSpinner() {
  const preloadingSpinner = document.getElementById(
    'preloading-spinner-container'
  );

  if (!preloadingSpinner) {
    console.error('Could not find preloading spinner container');
    return;
  }

  preloadingSpinner.style.display = 'none';
}
const LazyLoadedMainWithLoadingAnimation = () => {
  // We only want to begin loading Main after the Rive animation has loaded
  // Otherwise, both will be loading at the same time, which is faster, but
  // might delay the Rive animation from playing...
  const [isAnimationLoaded, setIsAnimationLoaded] = useState(false);
  const [isLoadingAnimationVisible, setIsLoadingAnimationVisible] = useAtom(
    isLoadingAnimationVisibleAtom
  );

  // Once the app has finished loading, we hide the preloading spinner (in
  // case it's still visible) and tell the LoadingAnimation to trigger the outro
  const [isAppFinishedLoading, setIsAppFinishedLoading] = useState(false);

  useEffect(() => {
    window.onAppContentLoaded = () => {
      hidePreloadingSpinner();
      setIsAppFinishedLoading(true);

      // Disabled 07/19/2025 due to perf concerns even on desktop browsers
      // given our intense canvas usage
      // // Disable session recording on mobile web due to performance concerns
      // // On December 18, observed significant a performance impact when recording
      // // sessions on mobile web via pixel phone running Firefox.
      // const enableSessionRecording =
      //   surface === 'web' && platform === 'mobile' ? false : true;

      // if (enableSessionRecording) {
      //   setTimeout(() => {
      //     console.log('started session recording');
      //     posthog.startSessionRecording();
      //   }, 2000);
      // }
    };
  }, []);

  // Effect to handle skipping the loading animation for testing
  useEffect(() => {
    // We can't do this via the config system because we need to know this before
    // we even connect to the server. So, we use a query parameter instead.
    // This is useful for testing via Playwright, where we want to skip the
    // loading animation to speed up tests.
    const skipLoadingAnimation = isHeadlessBrowser;

    if (skipLoadingAnimation) {
      setIsLoadingAnimationVisible(false);
      setIsAnimationLoaded(true);
    }
  }, []);

  return (
    <>
      {/* We only want to begin lazy-loading and rendering <Main/>
          after the Rive animation has loaded */}
      {isAnimationLoaded && (
        <Suspense>
          <Main />
        </Suspense>
      )}

      {/* We only want to render the LoadingAnimation if it has not yet completed yet.
          Once the animation is complete, we remove it from the DOM */}
      {isLoadingAnimationVisible && (
        <div
          style={{
            width: '100dvw',
            height: '100dvh',
            color: 'white',
            position: 'absolute',
            top: 0,
            left: 0,
            // We don't even have the RoomTheme loaded yet, so we can't use it
            zIndex: LoadingScreenZIndex,
          }}
        >
          <ErrorBoundary
            onError={(error, info) => {
              console.log('Error in LoadingAnimation, skipping', error, info);
              setIsAnimationLoaded(true);
              setIsLoadingAnimationVisible(false);
            }}
          >
            <LoadingAnimation
              isAppFinishedLoading={isAppFinishedLoading}
              onAnimationLoaded={() => {
                setIsAnimationLoaded(true);
              }}
              onAnimationComplete={() => {
                setIsLoadingAnimationVisible(false);
                hidePreloadingSpinner();
              }}
            />
          </ErrorBoundary>
        </div>
      )}
    </>
  );
};

export default LazyLoadedMainWithLoadingAnimation;
