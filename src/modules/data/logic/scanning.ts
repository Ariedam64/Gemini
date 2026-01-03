// src/modules/data/logic/scanning.ts
// Pulse scanning logic to trigger data capture

import { pageWindow } from "../../../utils/windowContext";
import { captureState, originalObjectKeys } from "../state";
import { MAX_SCAN_ATTEMPTS, PULSE_SCAN_INTERVAL_MS } from "./constants";
import { isAllDataCaptured } from "./capture";
import { tryCapture } from "./capture";

/**
 * Start pulse scanning to capture data even if it loads minutes after mod init
 * Runs once immediately, then every 2s until captured or timeout
 */
export function startPulseScanning(): void {
  if (captureState.scanInterval || isAllDataCaptured()) return;

  const runPulse = () => {
    if (isAllDataCaptured() || captureState.scanAttempts > MAX_SCAN_ATTEMPTS) {
      stopPulseScanning();
      return;
    }

    captureState.scanAttempts++;
    try {
      originalObjectKeys(pageWindow).forEach((key) => {
        try {
          tryCapture((pageWindow as any)[key]);
        } catch {
          // Ignore errors
        }
      });
    } catch {
      // Ignore errors
    }
  };

  // Run immediately
  runPulse();

  // Then run every 2 seconds
  captureState.scanInterval = setInterval(runPulse, PULSE_SCAN_INTERVAL_MS);
}

/**
 * Stop pulse scanning
 */
export function stopPulseScanning(): void {
  if (captureState.scanInterval) {
    clearInterval(captureState.scanInterval);
    captureState.scanInterval = null;
  }
}
