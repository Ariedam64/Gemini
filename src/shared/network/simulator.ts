/**
 * NetSim - Network Simulation Middleware
 * Injects artificial latency to test UI responsiveness
 */

let latencyMs = 0;

export function setSimulatedLatency(ms: number) {
    latencyMs = ms;
    if (ms > 0) {
        console.warn(`[Gemini NetSim] Latency set to ${ms}ms`);
    } else {
        console.info(`[Gemini NetSim] Latency disabled`);
    }
}

/**
 * Wraps a function with simulated latency
 */
export function withLatency<T>(fn: () => T): Promise<T> {
    if (latencyMs <= 0) return Promise.resolve(fn());

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(fn());
        }, latencyMs);
    });
}

/**
 * Hook for Dev-HUD UI to control latency
 */
export function getLatency(): number {
    return latencyMs;
}
