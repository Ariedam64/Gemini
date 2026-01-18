/**
 * XP Tracker Feature Panel
 *
 * Wraps existing TeamXpPanel to integrate with feature panel registry.
 * Enables smart display management and future extensibility.
 *
 * Per .claude/rules/ui/ui.sections.md:
 * - Section parts are focused sub-features
 * - Must have clear lifecycle (build/destroy)
 * - Safe to call multiple times
 *
 * @module xpPanel
 */

import type { FeaturePanelDefinition } from './registry';
import {
    MGXPTracker,
    calculateTeamXpData,
    calculateTeamProgressPercent,
    calculatePetXpData,
    formatHoursCompact
} from '../../../../../features/xpTracker';
import { TeamXpPanel } from '../TeamXpPanel';
import { Globals } from '../../../../../globals';
import type { PetTeam } from '../../../../../features/petTeam/types';
import type { UnifiedPet } from '../../../../../globals/core/types';
import type { TeamPurposeAnalysis } from '../../../../../features/petTeam/logic/purpose';
import { DISPLAY_RULES, ABILITY_CATEGORIES } from '../../../../../features/petTeam/constants';

// ─────────────────────────────────────────────────────────────────────────────
// XP Tracker Feature Panel Definition
// ─────────────────────────────────────────────────────────────────────────────

export const xpPanel: FeaturePanelDefinition = {
    id: 'xp',
    label: 'XP',
    icon: '📊',
    category: 'stats',

    isAvailable: () => {
        return true;
    },

    getSummary: (team: PetTeam, pets: UnifiedPet[]) => {
        const progress = calculateTeamProgressPercent(team.id);
        if (progress >= 99) return null;

        return {
            text: `${Math.round(progress)}%`,
            variant: progress < 33 ? 'low' : progress < 67 ? 'medium' : 'high',
            tooltip: `Average progress to max STR: ${Math.round(progress)}%`,
            priority: 10,
        };
    },

    buildPanel: (team: PetTeam, container: HTMLElement) => {
        const panel = new TeamXpPanel({ teamId: team.id });
        container.appendChild(panel.build());

        const xpData = calculateTeamXpData(team.id);
        if (xpData) panel.update(xpData);

        return {
            update: (updatedTeam: PetTeam, pets: UnifiedPet[]) => {
                const newData = calculateTeamXpData(updatedTeam.id);
                if (newData) panel.update(newData);
            },
            destroy: () => panel.destroy(),
            refresh: () => {
                const newData = calculateTeamXpData(team.id);
                if (newData) panel.update(newData);
            },
        };
    },

    renderPetSlot: (pet: UnifiedPet, team: PetTeam, container: HTMLElement) => {
        const weather = Globals.weather.get();
        const currentWeather = weather.isActive ? weather.type : null;

        // Calculate team-wide bonus for context
        const teamData = calculateTeamXpData(team.id);
        const teamBonus = teamData?.teamSummary.bonusXpPerHour || 0;

        // Find longest time to max for supporting feeds calc
        const petsInTeam = teamData?.pets || [];
        const longestHoursToMax = Math.max(0, ...petsInTeam.map((p: { hoursToMaxStrength?: number }) => p.hoursToMaxStrength || 0));

        const xpData = calculatePetXpData(pet, currentWeather, teamBonus, longestHoursToMax);

        const isMaxStr = xpData.isMaxStrength;
        const hasBoost = !!xpData.xpBoostStats;

        let statsHtml = '';

        if (isMaxStr) {
            if (hasBoost && xpData.xpBoostStats) {
                statsHtml = `
                    <div class="stat-row stat-row--boost">
                        <span class="stat__label">BOOST</span>
                        <span class="stat__value stat__value--accent">+${xpData.xpBoostStats.expectedXpPerHour.toLocaleString()} XP/h</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat__label">SUPPORT</span>
                        <span class="stat__value">${xpData.supportingFeeds} feeds</span>
                    </div>
                `;
            }
        } else {
            let bonusHtml = '';
            if (hasBoost && xpData.xpBoostStats) {
                bonusHtml = `
                    <div class="stat-row stat-row--boost">
                        <span class="stat__label">BOOST</span>
                        <span class="stat__value stat__value--accent">+${xpData.xpBoostStats.expectedXpPerHour.toLocaleString()} XP/h</span>
                    </div>
                `;
            }

            // Calculate progress values
            // Use actual current vs max strength (handles pets hatched with Max STR Boost)
            const maxStrength = xpData.maxStrength;
            const currentStrength = xpData.currentStrength;
            const remainingLevels = maxStrength - currentStrength;
            // Progress = how far through the remaining levels (0% = just started, 100% = at max)
            // For a pet at STR 93/100, they've completed 0/7 levels = 0%
            // For a pet at STR 97/100, they've completed 4/7 levels = 57%
            // Use standard formula: current / max * 100
            const overallPercent = Math.min(100, Math.max(0, Math.floor((currentStrength / maxStrength) * 100)));

            // Next STR progress (within current strength level)
            const nextStrProgress = (pet.xp % 3600) / 3600 * 100;
            const nextPercent = Math.min(99, Math.max(1, Math.floor(nextStrProgress)));

            // Calculate next strength target and max strength target
            const nextStrTarget = xpData.currentStrength + 1;
            const maxStrTarget = xpData.maxStrength;

            statsHtml = bonusHtml + `
                <div class="stat-row">
                    <span class="stat__label">NEXT STR</span>
                    <span class="stat__timer">${formatHoursCompact(xpData.hoursToNextStrength || 0)}</span>
                    <span class="stat__feeds">🍖 x${xpData.feedsToNextStrength}</span>
                    <span class="stat__str-label">STR ${nextStrTarget}</span>
                    <div class="stat__progress-mini">
                        <div class="stat__progress-fill stat__progress-fill--xp" style="width: ${nextPercent}%"></div>
                        <span class="stat__percent">${nextPercent}%</span>
                    </div>
                </div>
                <div class="stat-row">
                    <span class="stat__label">MAX STR</span>
                    <span class="stat__timer">${formatHoursCompact(xpData.hoursToMaxStrength || 0)}</span>
                    <span class="stat__feeds">🍖 x${xpData.feedsToMaxStrength}</span>
                    <span class="stat__str-label">STR ${maxStrTarget}</span>
                    <div class="stat__progress-mini">
                        <div class="stat__progress-fill stat__progress-fill--xp" style="width: ${overallPercent}%"></div>
                        <span class="stat__percent">${overallPercent}%</span>
                    </div>
                </div>
            `;
        }

        container.innerHTML = statsHtml ? `<div class="xp-stats-compact">${statsHtml}</div>` : '';
    },

    /**
     * Render content for grouped max-STR pets
     * Shows team-aggregated XP boost/support stats
     */
    renderGroupedSlot: (pets: UnifiedPet[], team: PetTeam, container: HTMLElement) => {
        const weather = Globals.weather.get();
        const currentWeather = weather.isActive ? weather.type : null;
        const teamData = calculateTeamXpData(team.id);
        const teamBonus = teamData?.teamSummary.bonusXpPerHour || 0;

        // For max-STR grouped display, show combined boost info
        let totalBoostXpPerHour = 0;
        let totalSupportingFeeds = 0;

        for (const pet of pets) {
            const xpData = calculatePetXpData(pet, currentWeather, teamBonus, 0);
            if (xpData.xpBoostStats) {
                totalBoostXpPerHour += xpData.xpBoostStats.expectedXpPerHour;
            }
            if (xpData.supportingFeeds) {
                totalSupportingFeeds += xpData.supportingFeeds;
            }
        }

        let statsHtml = '';

        if (totalBoostXpPerHour > 0) {
            statsHtml = `
                <div class="stat-row stat-row--boost">
                    <span class="stat__label">TEAM BOOST</span>
                    <span class="stat__value stat__value--accent">+${totalBoostXpPerHour.toLocaleString()} XP/h</span>
                </div>
            `;
            if (totalSupportingFeeds > 0) {
                statsHtml += `
                    <div class="stat-row">
                        <span class="stat__label">SUPPORT</span>
                        <span class="stat__value">${totalSupportingFeeds} feeds</span>
                    </div>
                `;
            }
        }

        // Show message if no boost stats to display
        if (totalBoostXpPerHour === 0) {
            const allMax = pets.every(p => p.currentStrength >= p.maxStrength);

            if (allMax) {
                container.innerHTML = `
                    <div class="xp-stats-compact xp-stats-grouped">
                        <div class="stat-row stat-row--info">
                            <span class="stat__message">All pets at max STR</span>
                        </div>
                    </div>
                `;
            } else {
                const progress = calculateTeamProgressPercent(team.id);
                container.innerHTML = `
                    <div class="xp-stats-compact xp-stats-grouped">
                        <div class="stat-row stat-row--info">
                            <span class="stat__message">Leveling: ${Math.round(progress)}%</span>
                        </div>
                    </div>
                `;
            }
            return;
        }

        container.innerHTML = `<div class="xp-stats-compact xp-stats-grouped">${statsHtml}</div>`;
    },

    /**
     * Check if XP panel has content for specific pet(s)
     * Has content if pet is leveling OR has XP boost ability
     */
    hasContent: (pets, team) => {
        const petsArray = Array.isArray(pets) ? pets : [pets];

        // Has content if any pet is still leveling
        const hasLevelingPet = petsArray.some(pet => pet.currentStrength < pet.maxStrength);
        if (hasLevelingPet) return true;

        // Has content if any pet has XP boost (provides value to team)
        const hasXpBoost = petsArray.some(pet =>
            pet.abilities.some(ability => (ABILITY_CATEGORIES.XP_BOOST as readonly string[]).includes(ability))
        );

        return hasXpBoost;
    },

    /**
     * Strict Display Logic (Phase 3)
     * XP panel is allowed for most purposes, but enforce HIDE_IF_MAX_STR_NO_BOOST rule
     */
    shouldDisplay: (team, pets, purpose) => {
        // Step 1: Check if 'xp' is in the allowed panels for this purpose
        const allowedPanels = DISPLAY_RULES.ALLOWED_PANELS[purpose.primary] || [];
        if (!allowedPanels.includes('xp')) {
            return false;
        }

        // Step 2: Check HIDE_IF_MAX_STR_NO_BOOST rule
        if (DISPLAY_RULES.XP.HIDE_IF_MAX_STR_NO_BOOST) {
            // Check if any pet is still leveling (not at max STR)
            const hasLevelingPet = pets.some(pet => pet.currentStrength < pet.maxStrength);
            if (hasLevelingPet) {
                return true; // Show panel - pet needs XP tracking
            }

            // All pets are max STR - check if any provide XP boost
            const hasXpBoost = pets.some(pet =>
                pet.abilities.some(ability => (ABILITY_CATEGORIES.XP_BOOST as readonly string[]).includes(ability))
            );

            if (hasXpBoost) {
                return true; // Show panel - XP boost provides value to other pets
            }

            // All max STR with no XP boost - hide panel
            return false;
        }

        // Rule not enabled, allow panel
        return true;
    },

    /**
     * Count stat rows for combined panel detection
     * Grouped XP: 1 row (TEAM BOOST) + optional 1 row (SUPPORT)
     * Individual: 2-3 rows depending on leveling status
     */
    countRows: (pets, team) => {
        const petsArray = Array.isArray(pets) ? pets : [pets];
        const allMax = petsArray.every(p => p.currentStrength >= p.maxStrength);

        if (allMax) {
            // Check for XP boost ability
            const hasXpBoost = petsArray.some(p =>
                p.abilities.some(a => (ABILITY_CATEGORIES.XP_BOOST as readonly string[]).includes(a))
            );
            if (!hasXpBoost) return 0;

            // TEAM BOOST row only (support row is rare)
            return 1;
        }

        // Leveling pets: PROGRESS row + TIME row
        return 2;
    },
};
