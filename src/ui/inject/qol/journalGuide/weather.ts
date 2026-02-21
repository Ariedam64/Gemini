/**
 * Journal Guide - Weather Tracking & Prediction
 *
 * Tracks weather transitions locally and via Supabase community data.
 * Provides prediction estimates for Dawn and Rain events.
 *
 * Uses a generic weather timestamp map so new weather types are
 * automatically tracked without code changes.
 */

import { createClient, type RealtimeChannel, type SupabaseClient } from '@supabase/supabase-js';
import { getWeather } from '../../../../globals';
import { storageGet, storageHas, storageSet, INJECT_KEYS, EVENTS, FEATURE_KEYS } from '../../../../utils/storage';
import { httpGet, httpPost } from '../../../../utils/http';
import type { CleanupTracker } from '../../core/types';

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const DAWN_INTERVAL_MS = 4 * 60 * 60 * 1000; // 4 hours
const DAWN_SOON_THRESHOLD_MS = 30 * 60 * 1000; // 30 min before
const RAIN_MIN_INTERVAL_MS = 20 * 60 * 1000; // 20 min minimum between rains
const RAIN_AVG_INTERVAL_MS = 27.5 * 60 * 1000; // average 20-35 min window

const TRACKING_DATA_VERSION = 2;

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface WeatherTimestamp {
    lastStart: number | null;
    lastEnd: number | null;
}

export interface WeatherTrackingData {
    _version: number;
    weatherTimestamps: Record<string, WeatherTimestamp>;
    lastUpdated: number;
}

export interface WeatherPrediction {
    currentWeatherId: string | null;
    /** Set of all currently active weather IDs */
    activeWeathers: Set<string>;
    /** Set of weather IDs predicted to arrive soon */
    predictedWeathers: Set<string>;

    // Legacy boolean accessors (kept for backwards compat with badges/scoring)
    isRaining: boolean;
    isSnowing: boolean;
    isDawn: boolean;
    isAmberMoon: boolean;
    rainPredictedSoon: boolean;
    dawnPredictedSoon: boolean;
    nextDawnEstimate: number | null;
    nextRainEstimate: number | null;
}

interface WeatherEventPayload {
    weatherId: string;
    previousWeatherId: string | null;
    timestamp: number;
}

interface WeatherCommunityConfig {
    enabled?: boolean;
    communityDataEnabled?: boolean;
    communityUploadEnabled?: boolean;
    communitySource?: string;
    supabaseUrl?: string;
    supabaseAnonKey?: string;
}

interface LegacyShopRestockConfig {
    communityDataEnabled?: boolean;
    communitySource?: string;
    supabaseUrl?: string;
    supabaseAnonKey?: string;
}

// V1 legacy format for migration
interface LegacyWeatherTrackingData {
    lastRainStart: number | null;
    lastRainEnd: number | null;
    lastDawnStart: number | null;
    lastDawnEnd: number | null;
    lastFrostStart: number | null;
    lastAmberMoonStart: number | null;
    lastUpdated: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// State
// ─────────────────────────────────────────────────────────────────────────────

let trackingData: WeatherTrackingData = {
    _version: TRACKING_DATA_VERSION,
    weatherTimestamps: {},
    lastUpdated: 0,
};

let lastKnownWeatherId: string | null = null;
let supabaseClient: SupabaseClient | null = null;
let realtimeChannel: RealtimeChannel | null = null;
let seenEventIds = new Set<string>();
let started = false;

// ─────────────────────────────────────────────────────────────────────────────
// Migration
// ─────────────────────────────────────────────────────────────────────────────

function migrateTrackingData(raw: any): WeatherTrackingData {
    // Already v2
    if (raw?._version === TRACKING_DATA_VERSION && raw?.weatherTimestamps) {
        return raw as WeatherTrackingData;
    }

    // V1 → V2 migration
    const legacy = raw as LegacyWeatherTrackingData | null;
    const timestamps: Record<string, WeatherTimestamp> = {};

    if (legacy) {
        if (legacy.lastRainStart != null || legacy.lastRainEnd != null) {
            timestamps.Rain = { lastStart: legacy.lastRainStart ?? null, lastEnd: legacy.lastRainEnd ?? null };
        }
        if (legacy.lastDawnStart != null || legacy.lastDawnEnd != null) {
            timestamps.Dawn = { lastStart: legacy.lastDawnStart ?? null, lastEnd: legacy.lastDawnEnd ?? null };
        }
        if (legacy.lastFrostStart != null) {
            timestamps.Frost = { lastStart: legacy.lastFrostStart, lastEnd: null };
        }
        if (legacy.lastAmberMoonStart != null) {
            timestamps.AmberMoon = { lastStart: legacy.lastAmberMoonStart, lastEnd: null };
        }
    }

    return {
        _version: TRACKING_DATA_VERSION,
        weatherTimestamps: timestamps,
        lastUpdated: legacy?.lastUpdated ?? 0,
    };
}

// ─────────────────────────────────────────────────────────────────────────────
// Timestamp Helpers
// ─────────────────────────────────────────────────────────────────────────────

function getTimestamp(weatherId: string): WeatherTimestamp {
    return trackingData.weatherTimestamps[weatherId] ?? { lastStart: null, lastEnd: null };
}

function setTimestamp(weatherId: string, updates: Partial<WeatherTimestamp>): void {
    const existing = getTimestamp(weatherId);
    trackingData.weatherTimestamps[weatherId] = { ...existing, ...updates };
}

// ─────────────────────────────────────────────────────────────────────────────
// Supabase Helpers
// ─────────────────────────────────────────────────────────────────────────────

function getSupabaseClient(): SupabaseClient | null {
    if (supabaseClient) return supabaseClient;
    const cfg = getSupabaseConfig();
    if (!cfg) return null;
    try {
        supabaseClient = createClient(cfg.url, cfg.anonKey, {
            auth: { persistSession: false },
            realtime: { params: { eventsPerSecond: 5 } },
        });
        return supabaseClient;
    } catch {
        return null;
    }
}

function getHeaders(): Record<string, string> {
    const cfg = getSupabaseConfig();
    if (!cfg) return {};
    return {
        apikey: cfg.anonKey,
        Authorization: `Bearer ${cfg.anonKey}`,
    };
}

function getSupabaseConfig(): { url: string; anonKey: string } | null {
    const cfg = storageGet<WeatherCommunityConfig>(INJECT_KEYS.WEATHER_TRACKING_CONFIG, {});
    if (cfg?.enabled === false || cfg?.communityDataEnabled === false) return null;
    if (cfg?.communitySource && cfg.communitySource !== 'supabase') return null;
    const url = cfg?.supabaseUrl?.trim();
    const anonKey = cfg?.supabaseAnonKey?.trim();
    if (!url || !anonKey) return null;
    return { url, anonKey };
}

function isUploadEnabled(): boolean {
    const cfg = storageGet<WeatherCommunityConfig>(INJECT_KEYS.WEATHER_TRACKING_CONFIG, {});
    if (cfg?.enabled === false) return false;
    if (cfg?.communityDataEnabled === false) return false;
    if (cfg?.communitySource && cfg.communitySource !== 'supabase') return false;
    return cfg?.communityUploadEnabled === true;
}

function ensureWeatherConfig(): void {
    if (storageHas(INJECT_KEYS.WEATHER_TRACKING_CONFIG)) return;
    const legacy = storageGet<LegacyShopRestockConfig>(FEATURE_KEYS.SHOP_RESTOCK, {});
    const next: WeatherCommunityConfig = {
        enabled: true,
        communityDataEnabled: legacy?.communityDataEnabled ?? true,
        communityUploadEnabled: false,
        communitySource: legacy?.communitySource ?? 'supabase',
        supabaseUrl: legacy?.supabaseUrl ?? '',
        supabaseAnonKey: legacy?.supabaseAnonKey ?? '',
    };
    storageSet(INJECT_KEYS.WEATHER_TRACKING_CONFIG, next);
}

// ─────────────────────────────────────────────────────────────────────────────
// Persistence
// ─────────────────────────────────────────────────────────────────────────────

function loadLocalData(): void {
    const raw = storageGet<any>(INJECT_KEYS.WEATHER_TRACKING, null);
    trackingData = migrateTrackingData(raw);
    // Save migrated data back if it was v1
    if (raw && raw._version !== TRACKING_DATA_VERSION) {
        saveLocalData();
    }
}

function saveLocalData(): void {
    trackingData.lastUpdated = Date.now();
    storageSet(INJECT_KEYS.WEATHER_TRACKING, trackingData);
}

// ─────────────────────────────────────────────────────────────────────────────
// Weather Transition Handler
// ─────────────────────────────────────────────────────────────────────────────

function handleWeatherTransition(currentId: string | null, previousId: string | null): void {
    const now = Date.now();

    // Record start for current weather
    if (currentId && currentId !== 'Sunny') {
        setTimestamp(currentId, { lastStart: now });
    }

    // Record end for previous weather
    if (previousId && previousId !== 'Sunny' && previousId !== currentId) {
        setTimestamp(previousId, { lastEnd: now });
    }

    saveLocalData();

    // Upload to Supabase (optional; default off)
    if (isUploadEnabled()) {
        uploadWeatherEvent({
            weatherId: currentId ?? 'Sunny',
            previousWeatherId: previousId,
            timestamp: now,
        });
    }

    // Dispatch local event for other modules
    window.dispatchEvent(new CustomEvent(EVENTS.WEATHER_TRANSITION, {
        detail: { currentId, previousId, timestamp: now },
    }));
}

// ─────────────────────────────────────────────────────────────────────────────
// Supabase Upload & Fetch
// ─────────────────────────────────────────────────────────────────────────────

async function uploadWeatherEvent(event: WeatherEventPayload): Promise<void> {
    try {
        const cfg = getSupabaseConfig();
        if (!cfg) return;
        await httpPost(`${cfg.url}/functions/v1/weather-events`, event, getHeaders());
    } catch {
        // Silently fail — local data is the fallback
    }
}

async function fetchCommunityData(): Promise<void> {
    try {
        const cfg = getSupabaseConfig();
        if (!cfg) return;
        const since = trackingData.lastUpdated > 0
            ? trackingData.lastUpdated - 60 * 60 * 1000 // 1 hour overlap
            : Date.now() - 24 * 60 * 60 * 1000; // Last 24h

        const res = await httpGet<{
            events: WeatherEventPayload[];
            meta: {
                lastRainEnd: number | null;
                lastDawnStart: number | null;
                lastDawnEnd: number | null;
                lastFrostStart: number | null;
                lastAmberMoonStart: number | null;
                // Future: server may add more fields dynamically
                [key: string]: number | null | undefined;
            };
        }>(`${cfg.url}/functions/v1/weather-events?since=${since}&limit=50&summary=1`, getHeaders());

        if (res.data?.meta) {
            const m = res.data.meta;

            // Merge known fields from community data using generic approach
            const mergeStart = (weatherId: string, value: number | null | undefined) => {
                if (!value) return;
                const ts = getTimestamp(weatherId);
                if (!ts.lastStart || value > ts.lastStart) {
                    setTimestamp(weatherId, { lastStart: value });
                }
            };
            const mergeEnd = (weatherId: string, value: number | null | undefined) => {
                if (!value) return;
                const ts = getTimestamp(weatherId);
                if (!ts.lastEnd || value > ts.lastEnd) {
                    setTimestamp(weatherId, { lastEnd: value });
                }
            };

            mergeEnd('Rain', m.lastRainEnd);
            mergeStart('Dawn', m.lastDawnStart);
            mergeEnd('Dawn', m.lastDawnEnd);
            mergeStart('Frost', m.lastFrostStart);
            mergeStart('AmberMoon', m.lastAmberMoonStart);

            saveLocalData();
        }
    } catch {
        // Silently fail — local data is the fallback
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Realtime Channel
// ─────────────────────────────────────────────────────────────────────────────

function handleRealtimeInsert(payload: Record<string, any>): void {
    const row = payload?.new ?? payload?.record ?? payload?.data ?? null;
    if (!row) return;

    const id = typeof row.id === 'string' ? row.id : null;
    if (id) {
        if (seenEventIds.has(id)) return;
        seenEventIds.add(id);
        if (seenEventIds.size > 200) {
            const next = new Set<string>();
            let i = 0;
            for (const entry of seenEventIds) {
                if (i++ > 100) next.add(entry);
            }
            seenEventIds = next;
        }
    }

    const weatherId = row.weather_id as string;
    const previousWeatherId = (row.previous_weather_id as string) ?? null;
    const timestamp = typeof row.timestamp === 'number' ? row.timestamp : Date.now();

    // Record start for current weather
    if (weatherId && weatherId !== 'Sunny') {
        const ts = getTimestamp(weatherId);
        if (!ts.lastStart || timestamp > ts.lastStart) {
            setTimestamp(weatherId, { lastStart: timestamp });
        }
    }

    // Record end for previous weather
    if (previousWeatherId && previousWeatherId !== 'Sunny' && previousWeatherId !== weatherId) {
        const ts = getTimestamp(previousWeatherId);
        if (!ts.lastEnd || timestamp > ts.lastEnd) {
            setTimestamp(previousWeatherId, { lastEnd: timestamp });
        }
    }

    saveLocalData();
}

function startRealtimeChannel(): void {
    const sb = getSupabaseClient();
    if (!sb) return;

    realtimeChannel = sb
        .channel('weather-events')
        .on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'weather_events' },
            handleRealtimeInsert,
        );

    realtimeChannel.subscribe((status) => {
        if (status === 'SUBSCRIBED') {
            console.log('[JournalGuide:Weather] Realtime subscribed');
        }
    });
}

function stopRealtimeChannel(): void {
    if (realtimeChannel) {
        try {
            realtimeChannel.unsubscribe();
        } catch {
            // ignore
        }
        realtimeChannel = null;
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

export function getWeatherPrediction(): WeatherPrediction {
    const now = Date.now();
    const weatherGlobal = getWeather();
    const current = weatherGlobal.get();
    const currentId = current?.id ?? null;

    // Build active weathers set
    const activeWeathers = new Set<string>();
    if (currentId && currentId !== 'Sunny') {
        activeWeathers.add(currentId);
    }

    // Build predicted weathers set
    const predictedWeathers = new Set<string>();

    // Current conditions (legacy booleans)
    const isRaining = currentId === 'Rain';
    const isSnowing = currentId === 'Snow' || currentId === 'Frost';
    const isDawn = currentId === 'Dawn';
    const isAmberMoon = currentId === 'AmberMoon';

    // Dawn prediction (deterministic ~4h cycle)
    let nextDawnEstimate: number | null = null;
    let dawnPredictedSoon = false;
    const dawnTs = getTimestamp('Dawn');
    if (dawnTs.lastStart) {
        const elapsed = now - dawnTs.lastStart;
        const cyclesSince = Math.floor(elapsed / DAWN_INTERVAL_MS);
        nextDawnEstimate = dawnTs.lastStart + (cyclesSince + 1) * DAWN_INTERVAL_MS;
        dawnPredictedSoon = !isDawn && (nextDawnEstimate - now) <= DAWN_SOON_THRESHOLD_MS;
        if (dawnPredictedSoon) {
            predictedWeathers.add('Dawn');
        }
    }

    // Rain prediction (probabilistic 20-35 min intervals)
    let nextRainEstimate: number | null = null;
    let rainPredictedSoon = false;
    const rainTs = getTimestamp('Rain');
    if (rainTs.lastEnd && !isRaining) {
        const sinceLastRain = now - rainTs.lastEnd;
        rainPredictedSoon = sinceLastRain >= RAIN_MIN_INTERVAL_MS;
        // Estimate: average 27.5 min after end
        nextRainEstimate = rainTs.lastEnd + RAIN_AVG_INTERVAL_MS;
        if (rainPredictedSoon) {
            predictedWeathers.add('Rain');
        }
    }

    return {
        currentWeatherId: currentId,
        activeWeathers,
        predictedWeathers,
        isRaining,
        isSnowing,
        isDawn,
        isAmberMoon,
        rainPredictedSoon,
        dawnPredictedSoon,
        nextDawnEstimate,
        nextRainEstimate,
    };
}

export function getTrackingData(): WeatherTrackingData {
    return { ...trackingData, weatherTimestamps: { ...trackingData.weatherTimestamps } };
}

/** Check if a specific weather is currently active */
export function isWeatherActive(weatherId: string): boolean {
    const weatherGlobal = getWeather();
    const current = weatherGlobal.get();
    const currentId = current?.id ?? null;
    // Frost/Snow equivalence
    if (weatherId === 'Frost' || weatherId === 'Snow') {
        return currentId === 'Frost' || currentId === 'Snow';
    }
    return currentId === weatherId;
}

export function startWeatherTracking(tracker: CleanupTracker): void {
    if (started) return;
    started = true;

    ensureWeatherConfig();

    // Load from local storage (with v1→v2 migration)
    loadLocalData();

    // Fetch community data
    fetchCommunityData();

    // Subscribe to weather changes
    const weatherGlobal = getWeather();
    const current = weatherGlobal.get();
    lastKnownWeatherId = current?.id ?? null;

    const unsub = weatherGlobal.subscribeStable((event: { current: any; previous: any }) => {
        const newId = event.current?.id ?? null;
        const prevId = event.previous?.id ?? lastKnownWeatherId;

        if (newId !== lastKnownWeatherId) {
            handleWeatherTransition(newId, prevId);
            lastKnownWeatherId = newId;
        }
    });
    tracker.add(unsub);

    // Start realtime channel
    startRealtimeChannel();
    tracker.add(() => stopRealtimeChannel());

    // Cleanup state
    tracker.add(() => {
        started = false;
        seenEventIds.clear();
    });
}

export function stopWeatherTracking(): void {
    stopRealtimeChannel();
    started = false;
    seenEventIds.clear();
}
