/**
 * Tracks a rate (events per second) using a sliding window of timestamps.
 * Used for smoothed FPS/UPS display in debug and perf overlays.
 *
 * This implementation provides a smoother, more accurate representation of
 * instantaneous rate compared to a resetting counter, avoiding "dips" caused
 * by quantization/bucket alignment.
 */
export class RateTracker {
  private timestamps: number[] = [];
  private windowMs: number;

  /**
   * @param windowMs - Time window for rate calculation (default 1000ms)
   */
  constructor(windowMs = 1000) {
    this.windowMs = windowMs;
  }

  /**
   * Record an event (frame rendered, patch executed, etc).
   * @param time - Current time in ms (e.g., performance.now())
   */
  tick(time: number): void {
    this.timestamps.push(time);

    // Remove timestamps older than the window
    const limit = time - this.windowMs;
    // We can just check index 0 as it's sorted by time
    while (this.timestamps.length > 0 && this.timestamps[0] < limit) {
      this.timestamps.shift();
    }
  }

  /**
   * Get the current smoothed rate (events per second).
   * Calculated based on the actual duration between the oldest and newest
   * events in the window.
   */
  get rate(): number {
    // Need at least 2 samples to measure an interval
    if (this.timestamps.length < 2) {
      return 0;
    }

    const oldest = this.timestamps[0];
    const newest = this.timestamps[this.timestamps.length - 1];
    const duration = newest - oldest;

    if (duration <= 0) {
      return 0;
    }

    // Rate = (Number of Intervals) / (Duration in Seconds)
    // N frames define N-1 intervals
    return ((this.timestamps.length - 1) * 1000) / duration;
  }
}
