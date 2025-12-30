/**
 * Journal Checker Feature
 * Displays collection progress for plants, pets, and decor in the Gemini HUD
 */

import { Gemini } from '../../api';
import { MGData } from '../../modules';
import { storageGet, storageSet } from '../shared/storage';

export interface JournalProgress {
    plants: { total: number; logged: number; percentage: number; missing: string[] };
    pets: { total: number; logged: number; percentage: number; missing: string[] };
    decor: { total: number; logged: number; percentage: number; missing: string[] };
}

interface JournalCheckerConfig {
    enabled: boolean;
    autoRefresh: boolean;
    refreshIntervalMs: number;
}

const DEFAULT_CONFIG: JournalCheckerConfig = {
    enabled: false,
    autoRefresh: true,
    refreshIntervalMs: 30000,
};

let refreshInterval: ReturnType<typeof setInterval> | null = null;

export async function aggregateJournalProgress(): Promise<JournalProgress> {
    await MGData.waitForAnyData();

    const plants = MGData.get('plants') || {};
    const pets = MGData.get('pets') || {};
    const decor = MGData.get('decor') || {};

    const players = Gemini.Globals.players.get();
    const journal = (players?.host?.journal as any) || { pets: {}, produce: {} };

    const loggedPets = Object.keys(journal.pets || {});
    const loggedProduce = Object.keys(journal.produce || {});

    const allPlantIds = Object.keys(plants);
    const allPetIds = Object.keys(pets);
    const allDecorIds = Object.keys(decor);

    return {
        plants: {
            total: allPlantIds.length,
            logged: loggedProduce.length,
            percentage: allPlantIds.length > 0 ? (loggedProduce.length / allPlantIds.length) * 100 : 0,
            missing: allPlantIds.filter(id => !loggedProduce.includes(id)),
        },
        pets: {
            total: allPetIds.length,
            logged: loggedPets.length,
            percentage: allPetIds.length > 0 ? (loggedPets.length / allPetIds.length) * 100 : 0,
            missing: allPetIds.filter(id => !loggedPets.includes(id)),
        },
        decor: {
            total: allDecorIds.length,
            logged: 0,
            percentage: 0,
            missing: allDecorIds,
        },
    };
}

export function start(): void {
    const config = storageGet<JournalCheckerConfig>('gemini:features:journalChecker', DEFAULT_CONFIG);

    if (!config.enabled) return;

    if (config.autoRefresh && !refreshInterval) {
        refreshInterval = setInterval(async () => {
            const progress = await aggregateJournalProgress();
            window.dispatchEvent(new CustomEvent('gemini:journal-updated', { detail: progress }));
        }, config.refreshIntervalMs);
    }

    console.log('✅ [JournalChecker] Started');
}

export function stop(): void {
    if (refreshInterval) {
        clearInterval(refreshInterval);
        refreshInterval = null;
    }
}

export function setEnabled(enabled: boolean): void {
    const config = storageGet<JournalCheckerConfig>('gemini:features:journalChecker', DEFAULT_CONFIG);
    config.enabled = enabled;
    storageSet('gemini:features:journalChecker', config);
    enabled ? start() : stop();
}

export async function refresh(): Promise<JournalProgress> {
    const progress = await aggregateJournalProgress();
    window.dispatchEvent(new CustomEvent('gemini:journal-updated', { detail: progress }));
    return progress;
}
