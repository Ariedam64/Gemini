/**
 * Test Section State
 * Manages persistent state for Test section (time range, log settings, etc.)
 */

import { createSectionStore } from "../core/State";

/* -------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */
export type TestState = {
  timeRange: {
    start: string;
    end: string;
  };
  logSettings: {
    mode: "js" | "plain";
    wrap: boolean;
  };
};

/* -------------------------------------------------------------------------
 * Defaults
 * ------------------------------------------------------------------------- */
export const DEFAULT_TEST_STATE: TestState = {
  timeRange: {
    start: "09:00",
    end: "18:00",
  },
  logSettings: {
    mode: "js",
    wrap: false,
  },
};

/* -------------------------------------------------------------------------
 * State Controller
 * ------------------------------------------------------------------------- */
export type TestStateController = {
  get(): TestState;
  set(next: TestState): void;
  update(patch: Partial<TestState>): void;
  save(): void;
};

/**
 * Initialize Test state with persistence
 */
export async function initTestState(): Promise<TestStateController> {
  return createSectionStore<TestState>("tab-test", {
    version: 1,
    defaults: DEFAULT_TEST_STATE,
    sanitize: (s) => ({
      timeRange: {
        start: s.timeRange?.start || DEFAULT_TEST_STATE.timeRange.start,
        end: s.timeRange?.end || DEFAULT_TEST_STATE.timeRange.end,
      },
      logSettings: {
        mode: s.logSettings?.mode || DEFAULT_TEST_STATE.logSettings.mode,
        wrap: s.logSettings?.wrap ?? DEFAULT_TEST_STATE.logSettings.wrap,
      },
    }),
  });
}
