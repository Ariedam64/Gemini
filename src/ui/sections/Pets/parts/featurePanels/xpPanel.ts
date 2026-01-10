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
        const longestHoursToMax = Math.max(0, ...petsInTeam.map(p => p.hoursToMaxStrength || 0));

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
            const maxStrength = xpData.maxStrength;
            const startingStrength = maxStrength - 30;
            const progressRatio = (xpData.currentStrength - startingStrength) / 30;
            const overallPercent = Math.min(100, Math.max(0, Math.floor(progressRatio * 100)));

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

    shouldDisplay: (team, pets) => {
        return true;
    },
};
