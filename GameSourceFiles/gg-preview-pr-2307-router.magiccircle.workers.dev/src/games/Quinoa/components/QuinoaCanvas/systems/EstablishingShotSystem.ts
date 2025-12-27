import { getDefaultStore } from 'jotai';
import { AvatarTriggerAnimationName } from '@/components/Avatars/avatarRiveConstants';
import { getIsSmallScreen } from '@/hooks/useIsSmallScreen';
import { ZoomConfig } from '@/hooks/useZoom';
import { avatarTriggerAnimationAtom } from '@/Quinoa/atoms/avatarAtoms';
import { isEstablishingShotRunningAtom } from '@/Quinoa/atoms/establishingShotAtoms';
import { tileSizeAtom } from '@/Quinoa/atoms/mapAtoms';
import { myUserSlotIdxAtom } from '@/Quinoa/atoms/myAtoms';
import { isLoadingAnimationVisibleAtom, playerIdAtom } from '@/store/store';
import type {
  QuinoaFrameContext,
  QuinoaSystem,
  ZoomOverrideController,
} from '../interfaces';

const { set, get, sub } = getDefaultStore();

const Config = {
  /** Duration of the zoom animation in milliseconds */
  animationDurationMs: 3000,
  /** Ratio of start size to target size (e.g. 0.5 means start at 50% of target size) */
  initialZoomRatio: 0.4,
  /** Progress threshold (0-1) at which the avatar waves */
  waveProgressThreshold: 0.6,
};

export class EstablishingShotSystem implements QuinoaSystem {
  public readonly name = 'establishingShot';

  private zoomOverrideController: ZoomOverrideController;
  private isAnimating = false;
  private startTime = 0;
  private startSize = 0;
  private targetSize = 0;
  private duration = Config.animationDurationMs;
  private onProgressCallback?: (progress: number) => void;

  // We keep track if we are in "prepared" state (holding initial value)
  private isPrepared = false;
  private preparedSize = 0;

  // Subscription management
  private unsubscribes: (() => void)[] = [];

  // Track if we have a pending establishing shot that needs to be triggered
  private pendingShot = false;

  // Static to persist across engine restarts (e.g. HMR, component remounts)
  // We only want to run the establishing shot once per page load session.
  private static hasPerformedEstablishingShot = false;

  constructor(zoomOverrideController: ZoomOverrideController) {
    this.zoomOverrideController = zoomOverrideController;
    this.initializeSubscriptions();
  }

  private initializeSubscriptions() {
    // 1. Watch for slot assignment (spawn) to prepare the shot
    this.unsubscribes.push(sub(myUserSlotIdxAtom, this.onSlotIndexChanged));

    // 2. Watch for loader animation visibility to trigger the shot
    this.unsubscribes.push(
      sub(isLoadingAnimationVisibleAtom, this.onLoaderVisibilityChanged)
    );

    // Check initial state immediately
    this.onSlotIndexChanged();
    this.onLoaderVisibilityChanged();
  }

  private getTargetSize() {
    const isSmallScreen = getIsSmallScreen();
    return isSmallScreen
      ? ZoomConfig.defaultTileSizeSmallScreen
      : ZoomConfig.defaultTileSizeLargeScreen;
  }

  /**
   * Handles changes to the user's slot index.
   * Prepares the shot when the user first spawns.
   */
  private onSlotIndexChanged = () => {
    const slotIdx = get(myUserSlotIdxAtom);

    // If slot becomes null (e.g. disconnect), we do NOT reset hasPerformedEstablishingShot
    // This ensures the cinematic only plays once per session, even if the user reconnects.
    if (slotIdx === null) {
      this.stop();
      return;
    }

    // If we haven't done the shot yet, prepare it immediately
    if (!EstablishingShotSystem.hasPerformedEstablishingShot) {
      const targetSize = this.getTargetSize();
      // Start zoomed out (smaller tile size), but don't go smaller than the allowed minimum
      const startSize = Math.max(
        ZoomConfig.minTileSize,
        targetSize * Config.initialZoomRatio
      );
      this.prepare(startSize);
      this.pendingShot = true;
      this.checkAndTriggerShot();
    }
  };

  /**
   * Handles changes to the loader animation visibility.
   * Triggers the pending shot once the loader is gone.
   */
  private onLoaderVisibilityChanged = () => {
    this.checkAndTriggerShot();
  };

  /**
   * Checks conditions and triggers the shot if ready.
   * Conditions:
   * 1. A shot is pending (prepared).
   * 2. The loader animation is no longer visible.
   */
  private checkAndTriggerShot() {
    const isLoading = get(isLoadingAnimationVisibleAtom);

    if (this.pendingShot && !isLoading) {
      this.triggerShot();
    }
  }

  private triggerShot() {
    const targetSize = this.getTargetSize();

    // If the user has already interrupted the shot (by zooming/panning), don't play it.
    if (!this.isRunning()) {
      this.pendingShot = false;
      EstablishingShotSystem.hasPerformedEstablishingShot = true;
      return;
    }

    let hasTriggeredWave = false;

    this.play(targetSize, Config.animationDurationMs, (progress) => {
      if (!hasTriggeredWave && progress >= Config.waveProgressThreshold) {
        hasTriggeredWave = true;
        this.triggerAvatarWave();
      }
    });

    this.pendingShot = false;
    EstablishingShotSystem.hasPerformedEstablishingShot = true;
  }

  private triggerAvatarWave() {
    set(avatarTriggerAnimationAtom, {
      playerId: get(playerIdAtom),
      animation: AvatarTriggerAnimationName.JoinGameNoPop,
    });
  }

  /**
   * Sets the camera to the start size immediately and holds it there.
   * Call this when the player spawns but the loader might still be visible.
   */
  prepare(startSize: number) {
    this.stop(); // Stop any running animation
    this.isPrepared = true;
    this.preparedSize = startSize;
    this.zoomOverrideController.setZoomOverride(startSize);
    set(isEstablishingShotRunningAtom, true);
  }

  /**
   * Starts the zoom animation from the current size (or prepared size) to the target size.
   */
  play(
    targetSize: number,
    duration: number = Config.animationDurationMs,
    onProgress?: (progress: number) => void
  ) {
    this.isPrepared = false;
    this.isAnimating = true;
    this.startTime = performance.now();

    // Start from whatever the engine is currently using (could be prepared size or current atom value)
    this.startSize =
      this.zoomOverrideController.getZoomOverride() ?? get(tileSizeAtom);
    this.targetSize = targetSize;
    this.duration = duration;
    this.onProgressCallback = onProgress;

    set(isEstablishingShotRunningAtom, true);
  }

  /**
   * Stops the animation and releases control of the zoom.
   * Syncs the final (or current) value to the atom so there's no jump.
   */
  stop() {
    this.isAnimating = false;
    this.isPrepared = false;

    // If we were overriding, sync the last value to the atom
    const currentOverride = this.zoomOverrideController.getZoomOverride();
    if (currentOverride !== null) {
      set(tileSizeAtom, currentOverride);
    }

    // Clear the override in the engine
    this.zoomOverrideController.setZoomOverride(null);
    set(isEstablishingShotRunningAtom, false);
    this.onProgressCallback = undefined;
    this.pendingShot = false;
  }

  isRunning() {
    return this.isAnimating || this.isPrepared;
  }

  draw(context: QuinoaFrameContext) {
    if (this.isPrepared) {
      // Just hold the value
      this.zoomOverrideController.setZoomOverride(this.preparedSize);
      return;
    }

    if (!this.isAnimating) return;

    const now = context.time;
    const elapsed = now - this.startTime;
    const progress = Math.min(elapsed / this.duration, 1);

    const easedProgress = this.easeInOutCubic(progress);
    const currentSize =
      this.startSize + (this.targetSize - this.startSize) * easedProgress;

    this.zoomOverrideController.setZoomOverride(currentSize);

    if (this.onProgressCallback) {
      this.onProgressCallback(progress);
    }

    if (progress >= 1) {
      // Animation complete
      this.stop();
      // Ensure we set the exact target size
      set(tileSizeAtom, this.targetSize);
    }
  }

  patch() {
    // No throttled updates needed
  }

  destroy() {
    this.stop();
    this.unsubscribes.forEach((unsub) => unsub());
    this.unsubscribes = [];
  }

  private easeInOutCubic(x: number): number {
    return x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2;
  }
}
