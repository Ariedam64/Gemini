/**
 * PetTeam Feature - Import Logic
 *
 * Imports pet teams from Aries mod localStorage
 */

import { loadConfig, saveConfig } from '../state';
import type { PetTeam, AriesTeam, ImportResult } from '../types';
import { EMPTY_SLOT } from '../types';

// ─── Detection ────────────────────────────────────────────────────────────

/**
 * Check if Aries mod localStorage data exists
 */
function detectAries(): boolean {
    try {
        const ariesData = localStorage.getItem('aries_mod');
        return ariesData !== null;
    } catch (err) {
        console.warn('[PetTeam] Failed to access localStorage:', err);
        return false;
    }
}

// ─── Reading ──────────────────────────────────────────────────────────────

/**
 * Read teams from Aries mod localStorage
 * Path: aries_mod → pets → teams
 */
function readAriesTeams(): AriesTeam[] {
    try {
        const ariesData = localStorage.getItem('aries_mod');
        if (!ariesData) return [];

        const parsed = JSON.parse(ariesData);
        const teams = parsed?.pets?.teams;

        if (!Array.isArray(teams)) return [];

        return teams.filter(t => t && typeof t === 'object');
    } catch (err) {
        console.warn('[PetTeam] Failed to read Aries teams:', err);
        return [];
    }
}

// ─── Transformation ───────────────────────────────────────────────────────

/**
 * Transform Aries team format to Gemini format
 * - Converts slots array to fixed petIds tuple
 * - Converts null to empty string
 * - Adds timestamps
 */
function transformAriesTeam(ariesTeam: AriesTeam): Omit<PetTeam, 'id'> {
    const now = Date.now();

    // Convert slots to fixed tuple with empty strings
    const slots = ariesTeam.slots || [];
    const petIds: [string, string, string] = [
        typeof slots[0] === 'string' ? slots[0] : EMPTY_SLOT,
        typeof slots[1] === 'string' ? slots[1] : EMPTY_SLOT,
        typeof slots[2] === 'string' ? slots[2] : EMPTY_SLOT,
    ];

    return {
        name: ariesTeam.name?.trim() || 'Imported Team',
        petIds,
        createdAt: now,
        updatedAt: now,
    };
}

// ─── Main Import ──────────────────────────────────────────────────────────

/**
 * Import teams from Aries mod
 * - Clears all existing Gemini teams
 * - Imports all teams from Aries localStorage
 * - Auto-renames duplicate team names
 */
export function importFromAries(): ImportResult {
    const result: ImportResult = {
        success: false,
        source: 'none',
        imported: 0,
        errors: [],
    };

    // Check if Aries mod exists
    if (!detectAries()) {
        result.errors.push('Aries mod not detected. Install Aries mod first.');
        return result;
    }

    // Read Aries teams
    const ariesTeams = readAriesTeams();
    if (ariesTeams.length === 0) {
        result.errors.push('No teams found in Aries mod. Create teams in Aries first.');
        return result;
    }

    // Load current config and clear teams
    const config = loadConfig();
    config.teams = [];
    config.activeTeamId = null;

    const usedNames = new Set<string>();

    // Transform and import each team
    for (const ariesTeam of ariesTeams) {
        try {
            const transformed = transformAriesTeam(ariesTeam);

            // Handle duplicate names
            let finalName = transformed.name;
            if (usedNames.has(finalName)) {
                let counter = 1;
                while (usedNames.has(`${finalName} (${counter})`)) {
                    counter++;
                }
                finalName = `${finalName} (${counter})`;
            }
            usedNames.add(finalName);

            // Create new team
            const newTeam: PetTeam = {
                id: crypto.randomUUID(),
                name: finalName,
                petIds: transformed.petIds,
                createdAt: transformed.createdAt,
                updatedAt: transformed.updatedAt,
            };

            config.teams.push(newTeam);
            result.imported++;

        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : String(err);
            result.errors.push(`Failed to import "${ariesTeam.name}": ${errorMsg}`);
        }
    }

    // Save config if any teams imported
    if (result.imported > 0) {
        saveConfig(config);
        result.success = true;
        result.source = 'aries';
    }

    return result;
}
