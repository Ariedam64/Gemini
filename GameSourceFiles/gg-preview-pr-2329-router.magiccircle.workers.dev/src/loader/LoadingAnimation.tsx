import { useEffect } from 'react';
import riveWASMResource from '@rive-app/canvas/rive.wasm?url';
import {
  EventType,
  Fit,
  Layout,
  RuntimeLoader,
  useStateMachineInput,
} from '@rive-app/react-canvas';
import useMcRive from '@/hooks/useMcRive';
import RiveMcMainloaders from './magic_garden_loader.riv?url';

RuntimeLoader.setWasmUrl(riveWASMResource);

/**
 * This component is responsible for handling the loading animation of the
 * application. It leverages the Rive animation library to create and manage
 * the animation. The animation is rendered on a canvas element and plays
 * automatically upon the component's rendering.
 *
 * When the application content finishes loading, the animation ceases, and the
 * loading spinner is concealed. Should an error arise during the loading phase,
 * the animation halts immediately, and an error log is generated. As of
 * 4/17/24, the `window.onAppContentLoaded` function is invoked within
 * RoomConnection.ts upon receipt of the 'Welcome' message.
 */
export default function LoadingAnimation({
  isAppFinishedLoading,
  onAnimationLoaded,
  onAnimationComplete,
}: {
  isAppFinishedLoading: boolean;
  onAnimationLoaded: () => void;
  onAnimationComplete: () => void;
}) {
  const { rive, RiveComponent } = useMcRive({
    src: RiveMcMainloaders,
    stateMachines: 'State Machine 1',
    layout: new Layout({ fit: Fit.Cover }),
    autoplay: true,
    onLoad: onAnimationLoaded,
  });

  const isLoadCompleteInput = useStateMachineInput(
    rive,
    'State Machine 1',
    'isLoadComplete'
  );

  // Set the isLoadCompleteInput to true when the app has finished loading
  // This triggers the outro animation
  useEffect(() => {
    if (!isLoadCompleteInput || !isAppFinishedLoading) {
      return;
    }
    isLoadCompleteInput.value = true;
  }, [isAppFinishedLoading, isLoadCompleteInput]);

  // Listen for the AnimationComplete event to fire onAnimationComplete
  useEffect(() => {
    if (rive) {
      rive.removeAllRiveEventListeners();

      rive.on(EventType.RiveEvent, (event) => {
        const eventData = event.data;

        // Narrow the eventData type to RiveEventPayload
        if (typeof eventData !== 'object' || !('name' in eventData)) return;

        if (eventData.name === 'AnimationComplete') {
          onAnimationComplete();
        }
      });
    }

    return () => rive?.removeAllRiveEventListeners();
  }, [rive, isLoadCompleteInput, onAnimationComplete]);

  return <RiveComponent />;
}
