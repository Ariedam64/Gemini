/**
 * Plant Growth Timer Panel
 *
 * Feature panel for displaying plant growth timers.
 * Integrates with feature registry system.
 *
 * Per .claude/rules/ui/ui.sections.md:
 * - Feature panels are focused, reusable sub-features
 * - Must implement FeaturePanelDefinition interface
 * - Clear lifecycle (buildPanel/destroy)
 *
 * @module plantGrowthPanel
 */

import type { FeaturePanelDefinition } from './registry';
import { MGGrowthTimers } from '../../../../../../features/growthTimers';
import { MGSprite } from '../../../../../../modules/sprite';
import type { GrowthTimer } from '../../../../../../features/growthTimers';
import type { PetTeam } from '../../../../../../features/petTeam/types';
import type { UnifiedPet } from '../../../../../../globals/core/types';

// ─────────────────────────────────────────────────────────────────────────────
// Plant Growth Panel Component
// ─────────────────────────────────────────────────────────────────────────────

class PlantGrowthTimerPanel {
    private root: HTMLElement;
    private teamId: string;
    private statsContainer: HTMLElement | null = null;
    private listContainer: HTMLElement | null = null;

    constructor(options: { teamId: string }) {
        this.teamId = options.teamId;
        this.root = document.createElement('div');
        this.root.className = 'growth-timer-panel plant-growth';
    }

    build(): HTMLElement {
        // Stats section (boost info)
        this.statsContainer = document.createElement('div');
        this.statsContainer.className = 'growth-stats';
        this.root.appendChild(this.statsContainer);

        // Timer list
        this.listContainer = document.createElement('div');
        this.listContainer.className = 'growth-timer-list';
        this.root.appendChild(this.listContainer);

        return this.root;
    }

    refresh(): void {
        const timers = MGGrowthTimers.getPlantTimers(this.teamId);
        const stats = MGGrowthTimers.getBoostStats(this.teamId, 'plant');

        this.updateStats(stats);
        this.updateTimers(timers);
    }

    private updateStats(stats: { procsPerHour: number; timeReductionPerHour: number }): void {
        if (!this.statsContainer) return;

        this.statsContainer.innerHTML = `
            <div class="boost-stats">
                Procs/hr: ${stats.procsPerHour.toFixed(1)} | 
                Time saved/hr: ${Math.round(stats.timeReductionPerHour)} min
            </div>
        `;
    }

    private updateTimers(timers: GrowthTimer[]): void {
        if (!this.listContainer) return;

        if (timers.length === 0) {
            this.listContainer.innerHTML = '<div class="empty-state">No Growing Plants...</div>';
            return;
        }

        // Sort by remaining time (soonest first)
        const sorted = [...timers].sort((a, b) => a.remainingMs - b.remainingMs);

        // Show up to 8 timers (fit in card)
        const toShow = sorted.slice(0, 8);

        this.listContainer.innerHTML = toShow.map(timer => this.renderTimer(timer)).join('');
    }

    private renderTimer(timer: GrowthTimer): string {
        const countdown = this.formatDuration(timer.remainingMs);
        const completionTime = this.formatCompletionTime(timer.adjustedMaturedAt);
        const boost = timer.activeBoosts[0];
        const boostIndicator = boost ?
            `⚡ -${boost.minutesPerProc}min/proc` : '';

        // Render sprite via MGSprite
        const spriteHtml = this.getSpriteHtml(timer.species as string);

        return `
            <div class="timer-item">
                <span class="timer-sprite">${spriteHtml}</span>
                <span class="timer-countdown">${countdown}</span>
                <span class="timer-completion">| ${completionTime}</span>
                ${boostIndicator ?
                `<span class="timer-boost">${boostIndicator}</span>` : ''}
            </div>
        `;
    }

    private formatDuration(ms: number): string {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    private formatCompletionTime(timestamp: number): string {
        const date = new Date(timestamp);
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const tomorrow = new Date(today.getTime() + 86400000);

        const timeStr = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });

        if (date >= today && date < tomorrow) {
            return `Today ${timeStr}`;
        } else if (date >= tomorrow && date < new Date(tomorrow.getTime() + 86400000)) {
            return `Tomorrow ${timeStr}`;
        } else {
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
        }
    }

    private getSpriteHtml(species: string): string {
        // Use MGSprite.toCanvas() or emoji fallback
        try {
            if (MGSprite.has('plant', species)) {
                const canvas = MGSprite.toCanvas('plant', species, { scale: 0.5 });
                canvas.style.height = '24px';
                canvas.style.width = 'auto';
                canvas.style.objectFit = 'contain';
                return canvas.outerHTML;
            }
        } catch (error) {
            console.warn(`[PlantGrowthPanel] Failed to render sprite for ${species}:`, error);
        }
        return '🌱'; // Fallback emoji
    }

    destroy(): void {
        this.root.remove();
        this.statsContainer = null;
        this.listContainer = null;
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Feature Panel Definition
// ─────────────────────────────────────────────────────────────────────────────

export const plantGrowthPanel: FeaturePanelDefinition = {
    id: 'plant-growth',
    label: 'Plant Growth',
    icon: '🌱',
    category: 'tracking',

    isAvailable: () => {
        return MGGrowthTimers.isEnabled();
    },

    getSummary: (team, pets) => {
        const timers = MGGrowthTimers.getPlantTimers(team.id);
        if (timers.length === 0) return null;

        // Find soonest timer
        const soonest = timers.reduce((min, t) =>
            t.remainingMs < min.remainingMs ? t : min
        );

        const hours = Math.floor(soonest.remainingMs / 3600000);
        return {
            text: `${hours}h`,
            variant: hours < 2 ? 'high' : hours < 8 ? 'medium' : 'low',
            tooltip: `Next plant in ${hours} hours`,
            priority: 8,
        };
    },

    buildPanel: (team, container) => {
        const panel = new PlantGrowthTimerPanel({ teamId: team.id });
        container.appendChild(panel.build());
        panel.refresh();

        return {
            update: () => panel.refresh(),
            destroy: () => panel.destroy(),
            refresh: () => panel.refresh(),
        };
    },

    renderPetSlot: (pet: UnifiedPet, team: PetTeam, container: HTMLElement) => {
        const ability = pet.abilities.find(a => a.includes('PlantGrowth'));
        if (!ability) {
            container.innerHTML = '<div class="stat-row"><span class="stat__label">BOOST</span><span class="stat__value">None</span></div>';
            return;
        }

        // Parse ability for value (e.g. PlantGrowthI, PlantGrowthII)
        const isTier2 = ability.endsWith('II');
        const minutes = isTier2 ? 30 : 15;

        container.innerHTML = `
            <div class="stat-row stat-row--boost">
                <span class="stat__label">BOOST</span>
                <span class="stat__value stat__value--accent">-${minutes}m / proc</span>
            </div>
            <div class="stat-row">
                <span class="stat__label">ACTIVE</span>
                <span class="stat__value">⚡ Yes</span>
            </div>
        `;
    },

    shouldDisplay: (team, pets) => {
        // Only show if team has plant growth boost abilities
        return pets.some(p =>
            p.abilities.some(a => a.includes('PlantGrowth'))
        );
    },
};
