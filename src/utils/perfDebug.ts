import { pageWindow, shareGlobal } from "./windowContext";

/**
 * Performance debug tool
 *
 * Measures real browser FPS and frame times to diagnose performance issues.
 * Exposes a small overlay + console tools accessible at runtime.
 *
 * Usage (browser console):
 *   __geminiPerf.start()       — show FPS overlay + start recording
 *   __geminiPerf.stop()        — remove overlay + stop recording
 *   __geminiPerf.report()      — print stats to console
 *   __geminiPerf.profile(ms)   — record for Nms then auto-report (default 5000ms)
 *   __geminiPerf.intervals()   — show setInterval/setTimeout drift stats
 *
 * No side effects on import. Call installPerfDebug() once to wire it up.
 */

// ─── State ────────────────────────────────────────────────────────────────────

const WINDOW_SIZE = 120; // rolling frame window

const perfState = {
  running: false,
  rafId: null as number | null,
  lastTime: 0,
  frameTimes: [] as number[],
  overlay: null as HTMLElement | null,
};

// ─── Interval drift tracking ──────────────────────────────────────────────────

type IntervalEntry = {
  id: number;
  expectedMs: number;
  fireTimes: number[];
  durations: number[];     // execution time of each callback
  label: string;
  stack: string;           // creation stack trace (truncated)
  paused: boolean;
  originalFn: TimerHandler;
};

const trackedIntervals = new Map<number, IntervalEntry>();
const origSetInterval = pageWindow.setInterval.bind(pageWindow);
const origClearInterval = pageWindow.clearInterval.bind(pageWindow);
let intervalPatchInstalled = false;

function installIntervalPatch(): void {
  if (intervalPatchInstalled) return;
  intervalPatchInstalled = true;

  pageWindow.setInterval = function patchedSetInterval(
    fn: TimerHandler,
    ms = 0,
    ...args: unknown[]
  ): number {
    const label = typeof fn === 'function' ? (fn.name || 'anonymous') : 'string-eval';
    // Capture creation stack (first 3 meaningful lines)
    const rawStack = new Error().stack || '';
    const stack = rawStack.split('\n').slice(2, 5).map(l => l.trim()).join(' → ');

    const id = origSetInterval(() => {
      const entry = trackedIntervals.get(id);
      if (entry?.paused) return; // skip if paused

      const t0 = performance.now();
      if (typeof fn === 'function') fn(...args);
      const t1 = performance.now();

      if (entry) {
        entry.fireTimes.push(t0);
        if (entry.fireTimes.length > 30) entry.fireTimes.shift();
        entry.durations.push(t1 - t0);
        if (entry.durations.length > 30) entry.durations.shift();
      }
    }, ms);

    trackedIntervals.set(id, {
      id, expectedMs: ms, fireTimes: [], durations: [], label, stack, paused: false, originalFn: fn,
    });
    return id;
  };

  pageWindow.clearInterval = function patchedClearInterval(id: number | undefined): void {
    if (id !== undefined) trackedIntervals.delete(id);
    origClearInterval(id);
  };

  console.log('[PerfDebug] setInterval patch installed — tracking all future intervals');
}

function uninstallIntervalPatch(): void {
  if (!intervalPatchInstalled) return;
  pageWindow.setInterval = origSetInterval;
  pageWindow.clearInterval = origClearInterval;
  trackedIntervals.clear();
  intervalPatchInstalled = false;
}

// ─── MutationObserver tracking ─────────────────────────────────────────────────

type TrackedObserver = {
  observer: MutationObserver;
  target: Node;
  options: MutationObserverInit;
  stack: string;
  callCount: number;
  totalDuration: number;
  disconnected: boolean;
};

const trackedObservers: TrackedObserver[] = [];
let observerPatchInstalled = false;
const origObserve = MutationObserver.prototype.observe;
const origDisconnect = MutationObserver.prototype.disconnect;

function installObserverPatch(): void {
  if (observerPatchInstalled) return;
  observerPatchInstalled = true;

  MutationObserver.prototype.observe = function (target: Node, options?: MutationObserverInit) {
    const rawStack = new Error().stack || '';
    const stack = rawStack.split('\n').slice(2, 5).map(l => l.trim()).join(' → ');

    const entry: TrackedObserver = {
      observer: this,
      target,
      options: options || {},
      stack,
      callCount: 0,
      totalDuration: 0,
      disconnected: false,
    };
    trackedObservers.push(entry);

    return origObserve.call(this, target, options);
  };

  MutationObserver.prototype.disconnect = function () {
    const entry = trackedObservers.find(e => e.observer === this && !e.disconnected);
    if (entry) entry.disconnected = true;
    return origDisconnect.call(this);
  };

  console.log('[PerfDebug] MutationObserver patch installed');
}

function reportObservers(): void {
  const active = trackedObservers.filter(e => !e.disconnected);
  console.group(`[PerfDebug] MutationObserver Report (${active.length} active, ${trackedObservers.length} total created)`);

  for (const entry of active) {
    const targetName = entry.target === document.body ? 'document.body'
      : entry.target === document.documentElement ? 'document.documentElement'
      : (entry.target as Element).id ? `#${(entry.target as Element).id}`
      : (entry.target as Element).className ? `.${String((entry.target as Element).className).split(' ')[0]}`
      : entry.target.nodeName;
    const opts = [];
    if (entry.options.childList) opts.push('childList');
    if (entry.options.subtree) opts.push('subtree');
    if (entry.options.attributes) opts.push('attributes');
    if (entry.options.characterData) opts.push('characterData');
    if (entry.options.attributeFilter) opts.push(`filter=[${entry.options.attributeFilter.join(',')}]`);

    console.log(`  [${targetName}] ${opts.join('+')} ${entry.options.subtree ? '⚠️ BROAD' : '✅ narrow'}`);
    console.log(`    └─ ${entry.stack}`);
  }
  console.groupEnd();
}

function disconnectAllObservers(): void {
  const active = trackedObservers.filter(e => !e.disconnected);
  let count = 0;
  for (const entry of active) {
    try {
      origDisconnect.call(entry.observer);
      entry.disconnected = true;
      count++;
    } catch { /* ignore */ }
  }
  console.log(`[PerfDebug] Disconnected ${count} MutationObservers. Run __geminiPerf.profile(8000) to test.`);
}

// ─── Overlay ──────────────────────────────────────────────────────────────────

function createOverlay(): HTMLElement {
  const el = document.createElement('div');
  el.id = '__gemini_perf_overlay';
  el.style.cssText = [
    'position: fixed',
    'top: 8px',
    'left: 8px',
    'background: rgba(0,0,0,0.88)',
    'color: #0f0',
    'font: bold 12px/1.5 monospace',
    'padding: 6px 10px',
    'border-radius: 6px',
    'z-index: 2147483647',
    'pointer-events: none',
    'white-space: pre',
    'border: 1px solid rgba(0,255,0,0.2)',
    'letter-spacing: 0.03em',
  ].join('; ');
  return el;
}

function updateOverlay(): void {
  const el = perfState.overlay;
  if (!el) return;

  const frames = perfState.frameTimes;
  if (!frames.length) return;

  const avg = frames.reduce((a, b) => a + b, 0) / frames.length;
  const fps = Math.round(1000 / avg);
  const worst = Math.max(...frames);
  const slow = frames.filter(t => t > 16.67).length;

  const fpsColor = fps >= 55 ? '#0f0' : fps >= 30 ? '#ff0' : '#f44';
  el.style.color = fpsColor;

  el.textContent = [
    `FPS   ${fps.toString().padStart(3)}`,
    `Frame ${(Math.round(avg * 10) / 10).toFixed(1).padStart(5)}ms`,
    `Worst ${(Math.round(worst * 10) / 10).toFixed(1).padStart(5)}ms`,
    `Slow  ${slow.toString().padStart(2)}/${frames.length}`,
  ].join('\n');
}

// ─── RAF loop ─────────────────────────────────────────────────────────────────

function tick(now: number): void {
  if (!perfState.running) return;

  if (perfState.lastTime > 0) {
    const dt = now - perfState.lastTime;
    // Clamp to 200ms max (tab was hidden etc.)
    if (dt < 200) {
      perfState.frameTimes.push(dt);
      if (perfState.frameTimes.length > WINDOW_SIZE) {
        perfState.frameTimes.shift();
      }
    }
    // Update overlay every ~15 frames
    if (perfState.frameTimes.length % 15 === 0) {
      updateOverlay();
    }
  }

  perfState.lastTime = now;
  perfState.rafId = pageWindow.requestAnimationFrame(tick);
}

// ─── Public API ───────────────────────────────────────────────────────────────

function start(): void {
  if (perfState.running) {
    console.log('[PerfDebug] Already running');
    return;
  }
  perfState.running = true;
  perfState.lastTime = 0;
  perfState.frameTimes.length = 0;

  perfState.overlay = createOverlay();
  pageWindow.document.body.appendChild(perfState.overlay);

  perfState.rafId = pageWindow.requestAnimationFrame(tick);
  console.log('[PerfDebug] Started. Use __geminiPerf.report() for stats, .stop() to stop.');
}

function stop(): void {
  perfState.running = false;
  if (perfState.rafId !== null) {
    pageWindow.cancelAnimationFrame(perfState.rafId);
    perfState.rafId = null;
  }
  perfState.overlay?.remove();
  perfState.overlay = null;
  perfState.lastTime = 0;
  console.log('[PerfDebug] Stopped.');
}

function report(): void {
  const frames = perfState.frameTimes;
  if (!frames.length) {
    console.warn('[PerfDebug] No data yet — call start() first and wait a few seconds.');
    return;
  }

  const sorted = [...frames].sort((a, b) => a - b);
  const avg = frames.reduce((a, b) => a + b, 0) / frames.length;
  const p50 = sorted[Math.floor(sorted.length * 0.5)];
  const p95 = sorted[Math.floor(sorted.length * 0.95)];
  const p99 = sorted[Math.floor(sorted.length * 0.99)];
  const worst = sorted[sorted.length - 1];
  const slow16 = frames.filter(t => t > 16.67).length;
  const slow33 = frames.filter(t => t > 33.33).length;
  const slow50 = frames.filter(t => t > 50).length;

  console.group('[PerfDebug] Frame Time Report');
  console.log(`Samples : ${frames.length} frames`);
  console.log(`Avg FPS : ${Math.round(1000 / avg)}`);
  console.log(`Avg     : ${avg.toFixed(2)}ms`);
  console.log(`p50     : ${p50.toFixed(2)}ms`);
  console.log(`p95     : ${p95.toFixed(2)}ms`);
  console.log(`p99     : ${p99.toFixed(2)}ms`);
  console.log(`Worst   : ${worst.toFixed(2)}ms`);
  console.log(`> 16ms  : ${slow16} frames (${Math.round(slow16 / frames.length * 100)}%) — below 60fps`);
  console.log(`> 33ms  : ${slow33} frames (${Math.round(slow33 / frames.length * 100)}%) — below 30fps`);
  console.log(`> 50ms  : ${slow50} frames (${Math.round(slow50 / frames.length * 100)}%) — below 20fps`);
  console.groupEnd();
}

function profile(durationMs = 5000): void {
  start();
  console.log(`[PerfDebug] Profiling for ${durationMs}ms...`);
  setTimeout(() => {
    report();
    stop();
  }, durationMs);
}

function reportIntervals(): void {
  if (!intervalPatchInstalled) {
    console.warn('[PerfDebug] Interval patch not installed — call __geminiPerf.trackIntervals() first');
    return;
  }

  if (!trackedIntervals.size) {
    console.warn('[PerfDebug] No intervals tracked yet (only future setInterval calls are captured)');
    return;
  }

  // Sort by avg duration descending (heaviest first)
  const entries = [...trackedIntervals.values()]
    .filter(e => e.durations.length > 0)
    .sort((a, b) => {
      const avgA = a.durations.reduce((x, y) => x + y, 0) / a.durations.length;
      const avgB = b.durations.reduce((x, y) => x + y, 0) / b.durations.length;
      return avgB - avgA;
    });

  console.group(`[PerfDebug] setInterval Report (${trackedIntervals.size} active)`);

  let totalCostPerSec = 0;

  for (const entry of entries) {
    const durs = entry.durations;
    const avgDur = durs.reduce((a, b) => a + b, 0) / durs.length;
    const maxDur = Math.max(...durs);
    const firesPerSec = 1000 / entry.expectedMs;
    const costPerSec = avgDur * firesPerSec;
    totalCostPerSec += costPerSec;

    console.log(
      `  #${entry.id} [${entry.label}] every ${entry.expectedMs}ms | ` +
      `avg=${avgDur.toFixed(2)}ms | max=${maxDur.toFixed(1)}ms | ` +
      `cost=${costPerSec.toFixed(1)}ms/s` +
      (entry.paused ? ' ⏸️ PAUSED' : '')
    );
    console.log(`    └─ ${entry.stack}`);
  }

  // Also show intervals with no fires yet
  for (const entry of trackedIntervals.values()) {
    if (entry.durations.length === 0) {
      console.log(`  #${entry.id} [${entry.label}] every ${entry.expectedMs}ms — no fires yet`);
    }
  }

  console.log(`  ── Total interval cost: ${totalCostPerSec.toFixed(1)}ms/s (${(totalCostPerSec / 10).toFixed(1)}% of 1 core)`);
  console.groupEnd();
}

function pauseAllIntervals(): void {
  if (!intervalPatchInstalled) {
    console.warn('[PerfDebug] Interval patch not installed');
    return;
  }
  let count = 0;
  for (const entry of trackedIntervals.values()) {
    if (!entry.paused) { entry.paused = true; count++; }
  }
  console.log(`[PerfDebug] Paused ${count} intervals. Run __geminiPerf.profile(8000) to measure FPS without intervals, then __geminiPerf.resumeIntervals() to restore.`);
}

function resumeAllIntervals(): void {
  let count = 0;
  for (const entry of trackedIntervals.values()) {
    if (entry.paused) { entry.paused = false; count++; }
  }
  console.log(`[PerfDebug] Resumed ${count} intervals.`);
}

function trackIntervals(): void {
  installIntervalPatch();
  console.log('[PerfDebug] Now tracking setIntervals. Wait a few seconds then call __geminiPerf.intervals()');
}

function stopTrackIntervals(): void {
  uninstallIntervalPatch();
}

// ─── Diagnose ─────────────────────────────────────────────────────────────────

async function diagnose(): Promise<void> {
  console.group('[PerfDebug] Diagnosis');

  // 1. Bind patch status — our patch sets a custom name via the function expression
  const bindIsPatched = (Function.prototype.bind as any).name !== 'bind';
  console.log(`bind patch active  : ${bindIsPatched ? '⚠️ YES (perf hit on every .bind() call)' : '✅ no'}`);

  // 1b. Atom bridge capture method
  try {
    const gemini = (pageWindow as any).Gemini;
    const captureInfo = gemini?.Store?.getCapturedInfo?.();
    if (captureInfo) {
      const via = captureInfo.via ?? 'unknown';
      const isPolling = via === 'write' || via === 'polyfill';
      console.log(`atom bridge        : captured via "${via}" ${isPolling ? '⚠️ (uses 100ms polling per subscription!)' : '✅ (native Jotai sub)'}`);
      if (captureInfo.polyfill) {
        console.log(`atom polyfill      : ⚠️ YES (degraded mode)`);
      }
    } else {
      console.log('atom bridge        : getCapturedInfo() not available');
    }
  } catch (e) {
    console.log('atom bridge check failed:', e);
  }

  // 2. Pixi ticker
  try {
    const gemini = (pageWindow as any).Gemini;
    if (gemini?.Modules?.Pixi) {
      const ticker = gemini.Modules.Pixi.ticker();
      if (ticker) {
        const listenerCount = ticker._head
          ? (() => { let n = 0; let c = ticker._head.next; while (c && c !== ticker._head) { n++; c = c.next; } return n; })()
          : '?';
        console.log(`Pixi ticker FPS    : ${ticker.FPS?.toFixed(1) ?? '?'}`);
        console.log(`Pixi ticker speed  : ${ticker.speed ?? '?'}`);
        console.log(`Pixi ticker running: ${ticker.started ?? '?'}`);
        console.log(`Pixi ticker listeners: ${listenerCount}`);
      } else {
        console.log('Pixi ticker        : not captured yet');
      }
      console.log(`MGPixi.ready()     : ${gemini.Modules.Pixi.ready()}`);
    } else {
      console.log('window.Gemini.Modules.Pixi : not found');
    }
  } catch (e) {
    console.log('Pixi inspection failed:', e);
  }

  // 3. Shadow DOM presence
  const hudHost = pageWindow.document.getElementById('gemini-hud-host')
    ?? pageWindow.document.querySelector('[data-gemini-hud]');
  console.log(`HUD shadow host    : ${hudHost ? '⚠️ present (Shadow DOM active)' : '✅ not found (HUD closed or not injected)'}`);

  // 4. Active MutationObservers can't be listed, but count known DOM watchers
  const avatarElements = pageWindow.document.querySelectorAll('.Avatar');
  console.log(`Avatar elements    : ${avatarElements.length} (each watched by MutationObserver)`);

  // 5. Live interval count (if patch is active)
  if (intervalPatchInstalled) {
    console.log(`Tracked intervals  : ${trackedIntervals.size}`);
  } else {
    console.log(`Tracked intervals  : patch not active — call __geminiPerf.trackIntervals() then reload`);
  }

  // 6. rAF baseline — measure how long a single empty rAF costs
  const rafCost = await new Promise<number>(resolve => {
    const t0 = performance.now();
    pageWindow.requestAnimationFrame(() => {
      const t1 = performance.now();
      pageWindow.requestAnimationFrame(() => resolve(t1 - t0));
    });
  });
  console.log(`rAF baseline       : ${rafCost.toFixed(2)}ms (expected ~${(1000 / 144).toFixed(1)}ms at 144fps, ~${(1000 / 60).toFixed(1)}ms at 60fps)`);

  console.groupEnd();
  console.log('[PerfDebug] Tip: close the Gemini HUD (Ctrl+Shift+U) then run __geminiPerf.profile(8000) to test without Shadow DOM.');
}

// ─── Install ──────────────────────────────────────────────────────────────────

export function installPerfDebug(): void {
  // shareGlobal writes to both the page window (unsafeWindow / wrappedJSObject)
  // and the sandbox window, so the variable is accessible from the browser console.
  // Auto-install patches BEFORE the mod bootstraps
  // so all setIntervals and MutationObservers are captured
  installIntervalPatch();
  installObserverPatch();

  shareGlobal('__geminiPerf', {
    start,
    stop,
    report,
    profile,
    diagnose,
    intervals: reportIntervals,
    pauseIntervals: pauseAllIntervals,
    resumeIntervals: resumeAllIntervals,
    observers: reportObservers,
    killObservers: disconnectAllObservers,
    trackIntervals,
    stopTrackIntervals,
  });
  console.log('[PerfDebug] Available at window.__geminiPerf (interval tracking auto-started)');
}
