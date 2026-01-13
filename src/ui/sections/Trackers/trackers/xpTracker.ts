/**
 * XP Tracker Definition
 *
 * Integrates XpTracker into the registry system.
 * Provides relevance scoring, rendering, and comparison logic.
 *
 * Per .claude/rules/core.md:
 * - No adapter layer - direct instantiation
 * - Event-driven updates (ability logs), no intervals
 * - Cleanup discipline with returned cleanup function
 *
 * @module xpTracker
 */

import { XpTracker } from '../parts/XpTracker';
import type { TrackerDefinition, ComparisonData } from './types';
import type { PetTeam } from '../../../../features/petTeam/types';
import type { TeamPurposeAnalysis } from '../../../../features/petTeam/logic/purpose';
import { calculateTeamXpData } from '../../../../features/xpTracker/logic/teamXpCalculations';
import { Globals } from '../../../../globals';
import { throttleRAF } from '../utils/throttle';

// ─────────────────────────────────────────────────────────────────────────────
// XP Tracker Definition
// ─────────────────────────────────────────────────────────────────────────────

export const xpTracker: TrackerDefinition = {
    id: 'xp',
    label: 'XP Tracker',
    icon: '📊',
    priority: 10, // Highest priority

    /**
     * Relevance scoring
     *
     * XP Tracker is highly relevant for XP farming teams.
     * Always somewhat relevant as a fallback.
     */
    isRelevant: (purpose: TeamPurposeAnalysis): number => {
        if (purpose.primary === 'xp-farming') {
            return purpose.confidence;
        }
        if (purpose.primary === 'balanced') {
            return 0.8;
        }
        // Always somewhat relevant as fallback
        return 0.5;
    },

    /**
     * Render XP Tracker
     *
     * Creates XpTracker instance, calculates initial data, and subscribes to events.
     * Returns cleanup function for destroying the tracker and unsubscribing.
     */
    render: (team: PetTeam, container: HTMLElement): (() => void) => {
        // Create tracker instance
        const tracker = new XpTracker({ teamId: team.id });
        container.appendChild(tracker.build());

        // PERFORMANCE: Throttle updates to max 60 FPS (one per animation frame)
        // Prevents event flooding when multiple abilities proc in rapid succession
        const refreshData = throttleRAF(() => {
            const data = calculateTeamXpData(team.id);
            if (data) {
                tracker.update(data);
            }
        });

        // Initial render (not throttled)
        const data = calculateTeamXpData(team.id);
        if (data) {
            tracker.update(data);
        }

        // Subscribe to weather changes (affects Snowy XP Boost)
        const unsubWeather = Globals.weather.subscribe(refreshData);

        // Subscribe to myPets changes (hunger, XP updates, ability procs)
        // NOTE: No need for separate subscribeAbility - myPets.subscribe already fires on ability procs
        const unsubMyPets = Globals.myPets.subscribe(refreshData);

        // Return cleanup function
        return () => {
            unsubWeather();
            unsubMyPets();
            tracker.destroy();
        };
    },

    /**
     * Get comparison data for overlay
     *
     * Calculates XP rate differences between two teams.
     */
    getComparisonData: (primaryTeam: PetTeam, compareTeam: PetTeam): ComparisonData[] => {
        const primaryData = calculateTeamXpData(primaryTeam.id);
        const compareData = calculateTeamXpData(compareTeam.id);

        if (!primaryData || !compareData) return [];

        return [
            {
                primaryValue: primaryData.teamSummary.totalXpPerHour,
                comparisonValue: compareData.teamSummary.totalXpPerHour,
                label: 'Total XP/hr',
                format: 'number',
            },
            {
                primaryValue: primaryData.teamSummary.bonusXpPerHour,
                comparisonValue: compareData.teamSummary.bonusXpPerHour,
                label: 'Bonus XP/hr',
                format: 'number',
            },
            {
                primaryValue: primaryData.teamSummary.activeBoosterCount,
                comparisonValue: compareData.teamSummary.activeBoosterCount,
                label: 'Active Boosters',
                format: 'number',
            },
            {
                primaryValue: primaryData.teamSummary.totalProcsPerHour,
                comparisonValue: compareData.teamSummary.totalProcsPerHour,
                label: 'Procs/hr',
                format: 'number',
            },
        ];
    },

    /**
     * Get pet-level comparison data for versus rows
     */
    getPetComparisonData: (primaryTeam: PetTeam, compareTeam: PetTeam) => {
        const primaryData = calculateTeamXpData(primaryTeam.id);
        const compareData = calculateTeamXpData(compareTeam.id);

        if (!primaryData || !compareData) return [];

        const pairs: any[] = [];
        const maxPets = 3;

        for (let i = 0; i < maxPets; i++) {
            const pPet = primaryData.pets[i];
            const cPet = compareData.pets[i];

            if (!pPet && !cPet) continue;

            pairs.push({
                primaryPet: pPet ? {
                    id: pPet.id,
                    name: pPet.name,
                    species: pPet.species,
                    mutations: pPet.mutations,
                    currentStrength: pPet.currentStrength,
                    maxStrength: pPet.maxStrength,
                    isMaxStrength: pPet.isMaxStrength,
                    abilities: pPet.xpBoostStats ? ['XP Boost'] : [],
                    metrics: [
                        { label: 'XP/hr', value: pPet.xpPerHour, format: 'number' },
                        { label: 'To Max', value: pPet.hoursToMaxStrength, format: 'time', total: pPet.hoursToMaxStrength + 10 } // estimate total for bar
                    ]
                } : null,
                comparisonPet: cPet ? {
                    id: cPet.id,
                    name: cPet.name,
                    species: cPet.species,
                    mutations: cPet.mutations,
                    currentStrength: cPet.currentStrength,
                    maxStrength: cPet.maxStrength,
                    isMaxStrength: cPet.isMaxStrength,
                    abilities: cPet.xpBoostStats ? ['XP Boost'] : [],
                    metrics: [
                        { label: 'XP/hr', value: cPet.xpPerHour, format: 'number' },
                        { label: 'To Max', value: cPet.hoursToMaxStrength, format: 'time', total: cPet.hoursToMaxStrength + 10 }
                    ]
                } : null
            });
        }

        return pairs;
    },
};
