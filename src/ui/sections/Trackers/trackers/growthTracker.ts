/**
 * Growth Tracker Definition
 *
 * Integrates GrowthTracker into the registry system.
 * Provides relevance scoring, rendering, and comparison logic.
 *
 * Per .claude/rules/core.md:
 * - No adapter layer - direct instantiation
 * - Event-driven updates (garden changes, ability logs), no intervals
 * - Cleanup discipline with returned cleanup function
 *
 * @module growthTracker
 */

import { GrowthTracker } from '../parts/GrowthTracker';
import type { TrackerDefinition, ComparisonData } from './types';
import type { PetTeam } from '../../../../features/petTeam/types';
import type { TeamPurposeAnalysis } from '../../../../features/petTeam/logic/purpose';
import { calculateTeamGrowthData } from '../../../../features/growthTimers/logic/teamGrowthCalculations';
import { Globals } from '../../../../globals';
import { throttleRAF } from '../utils/throttle';

// ─────────────────────────────────────────────────────────────────────────────
// Growth Tracker Definition
// ─────────────────────────────────────────────────────────────────────────────

export const growthTracker: TrackerDefinition = {
    id: 'growth',
    label: 'Growth Tracker',
    icon: '⏱️',
    priority: 9, // Second highest priority

    /**
     * Relevance scoring
     *
     * Growth Tracker is highly relevant for gardening/egg-focused teams.
     * Less relevant for pure XP farming teams.
     */
    isRelevant: (purpose: TeamPurposeAnalysis): number => {
        // Growth tracker is relevant for farming and time reduction purposes
        if (purpose.primary === 'crop-farming' || purpose.primary === 'time-reduction' || purpose.primary === 'hatching') {
            return purpose.confidence;
        }
        if (purpose.primary === 'balanced') {
            return 0.7;
        }
        if (purpose.primary === 'xp-farming') {
            return 0.3; // Less relevant but still possible
        }
        // Always somewhat relevant as fallback
        return 0.4;
    },

    /**
     * Render Growth Tracker
     *
     * Creates GrowthTracker instance, calculates initial data, and subscribes to events.
     * Returns cleanup function for destroying the tracker and unsubscribing.
     */
    render: (team: PetTeam, container: HTMLElement): (() => void) => {
        // Create tracker instance
        const tracker = new GrowthTracker({ teamId: team.id });
        container.appendChild(tracker.build());

        // PERFORMANCE: Throttle updates to max 60 FPS (one per animation frame)
        // Prevents event flooding when garden changes rapidly or multiple abilities proc
        const refreshData = throttleRAF(() => {
            const data = calculateTeamGrowthData(team.id);
            if (data) {
                tracker.update(data);
            }
        });

        // Initial render (not throttled)
        const data = calculateTeamGrowthData(team.id);
        if (data) {
            tracker.update(data);
        }

        // Subscribe to garden changes (eggs/crops planted, harvested, matured)
        const unsubGarden = Globals.myGarden.subscribe(refreshData);

        // Subscribe to myPets changes (pet abilities/mutations change, ability procs)
        // NOTE: No need for separate subscribeAbility - myPets.subscribe already fires on ability procs
        const unsubMyPets = Globals.myPets.subscribe(refreshData);

        // Return cleanup function
        return () => {
            unsubGarden();
            unsubMyPets();
            tracker.destroy();
        };
    },

    /**
     * Get comparison data for overlay
     *
     * Calculates growth multiplier differences between two teams.
     */
    getComparisonData: (primaryTeam: PetTeam, compareTeam: PetTeam): ComparisonData[] => {
        const primaryData = calculateTeamGrowthData(primaryTeam.id);
        const compareData = calculateTeamGrowthData(compareTeam.id);

        if (!primaryData || !compareData) return [];

        const data: ComparisonData[] = [];

        // Egg multiplier comparison
        if (primaryData.eggStats && compareData.eggStats) {
            data.push({
                primaryValue: primaryData.eggStats.teamMultiplier,
                comparisonValue: compareData.eggStats.teamMultiplier,
                label: 'Egg Speed',
                format: 'number',
            });
            data.push({
                primaryValue: primaryData.eggStats.growingCount,
                comparisonValue: compareData.eggStats.growingCount,
                label: 'Eggs Growing',
                format: 'number',
            });
        }

        // Plant multiplier comparison
        if (primaryData.plantStats && compareData.plantStats) {
            data.push({
                primaryValue: primaryData.plantStats.teamMultiplier,
                comparisonValue: compareData.plantStats.teamMultiplier,
                label: 'Plant Speed',
                format: 'number',
            });
            data.push({
                primaryValue: primaryData.plantStats.growingCount,
                comparisonValue: compareData.plantStats.growingCount,
                label: 'Plants Growing',
                format: 'number',
            });
        }

        return data;
    },

    /**
     * Get pet-level comparison data for versus rows
     */
    getPetComparisonData: (primaryTeam: PetTeam, compareTeam: PetTeam) => {
        const primaryData = calculateTeamGrowthData(primaryTeam.id);
        const compareData = calculateTeamGrowthData(compareTeam.id);

        if (!primaryData || !compareData) return [];

        const pairs: any[] = [];
        const maxPets = 3;

        for (let i = 0; i < maxPets; i++) {
            const pPet = primaryData.eggStats?.boosterPets[i] || primaryData.plantStats?.boosterPets[i];
            const cPet = compareData.eggStats?.boosterPets[i] || compareData.plantStats?.boosterPets[i];

            if (!pPet && !cPet) continue;

            pairs.push({
                primaryPet: pPet ? {
                    id: pPet.id,
                    name: pPet.name,
                    species: pPet.species,
                    mutations: pPet.mutations,
                    currentStrength: pPet.currentStrength,
                    maxStrength: pPet.maxStrength,
                    abilities: [], // Simplified for growth
                    metrics: [
                        { label: 'Multiplier', value: pPet.individualMultiplier, format: 'number' }
                    ]
                } : null,
                comparisonPet: cPet ? {
                    id: cPet.id,
                    name: cPet.name,
                    species: cPet.species,
                    mutations: cPet.mutations,
                    currentStrength: cPet.currentStrength,
                    maxStrength: cPet.maxStrength,
                    abilities: [],
                    metrics: [
                        { label: 'Multiplier', value: cPet.individualMultiplier, format: 'number' }
                    ]
                } : null
            });
        }

        return pairs;
    },
};
