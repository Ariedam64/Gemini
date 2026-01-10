import { useSetAtom } from 'jotai';
import { memo, useEffect, useRef } from 'react';
import { useIsDeveloper } from '@/store/store';
import {
  quinoaEngineAtom,
  quinoaInitializationErrorAtom,
} from '../../atoms/engineAtom';
import { EngineAbortedError, QuinoaEngine } from './QuinoaEngine';

/**
 * QuinoaCanvas is the React component that hosts the Quinoa game.
 *
 * It manages:
 * - QuinoaEngine lifecycle (initialize, start, destroy)
 * - Mounting the PixiJS-created canvas element
 *
 * All game logic (movement, rendering, etc.) is delegated to QuinoaEngine
 * and its systems.
 */
const QuinoaCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const setEngine = useSetAtom(quinoaEngineAtom);
  const setInitializationError = useSetAtom(quinoaInitializationErrorAtom);
  const isDeveloper = useIsDeveloper();

  useEffect(() => {
    let engineInstance: QuinoaEngine | null = null;
    let isAborted = false;

    const initializeEngine = async () => {
      // If the container isn't ready, we can't initialize
      if (!containerRef.current) return;

      try {
        engineInstance = new QuinoaEngine({
          enableDebugOverlay: isDeveloper,
        });

        // Initialize engine (creates its own canvas).
        // If destroyed during await (e.g. StrictMode), throws EngineAbortedError.
        const canvas = await engineInstance.initialize(containerRef.current);

        // If the component unmounted during initialization, abort.
        // The cleanup function will have already called destroy().
        if (isAborted) return;

        // Double-check container existence
        if (!containerRef.current) return;

        // Mount the canvas
        containerRef.current.appendChild(canvas);

        // Start the engine and expose via atom
        engineInstance.start();
        setEngine(engineInstance);
      } catch (e) {
        // If aborted, suppression is expected
        if (isAborted || e instanceof EngineAbortedError) return;

        console.error('[QuinoaCanvas] Initialization failed:', e);
        setInitializationError(
          e instanceof Error ? e : new Error('Initialization failed')
        );
      }
    };

    initializeEngine();

    return () => {
      isAborted = true;
      setEngine(null);
      engineInstance?.destroy();
    };
  }, [isDeveloper, setEngine, setInitializationError]);

  return (
    <div
      ref={containerRef}
      className="QuinoaCanvas"
      style={{
        position: 'absolute',
        top: 'calc(-1 * var(--sait))',
        left: 'calc(-1 * var(--sail))',
        width: 'calc(100% + var(--sail) + var(--sair))',
        height: 'calc(100% + var(--sait) + var(--saib))',
        touchAction: 'none',
      }}
    />
  );
};

QuinoaCanvas.displayName = 'QuinoaCanvas';

export default memo(QuinoaCanvas);
