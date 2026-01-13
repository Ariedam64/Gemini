/**
 * Comparison Overlay - Injects diff indicators when comparing 2 teams
 *
 * Shows visual diff indicators (↑ green, ↓ red, = gray) for key stats
 * when two teams are selected for comparison.
 */

import type { ComparisonData } from '../trackers/types';
import { MGSprite } from '../../../../modules';
import { MGPetTeam } from '../../../../features/petTeam';
import { getRelevantTracker } from '../trackers/registry';
import { getCachedTeamPurpose } from '../utils/cache';
import { element } from '../../../styles/helpers';
import { TrackersStateController } from '../state';

export interface ComparisonOverlayOptions {
    primaryTeamId: string;
    compareTeamId: string;
    containerElement: HTMLElement;
    state: TrackersStateController;
}

interface DiffIndicator {
    direction: 'up' | 'down' | 'equal';
    percentDiff: number;
    absoluteDiff: number;
    label: string;
}

export class ComparisonOverlay {
    public root: HTMLElement;
    private readonly options: ComparisonOverlayOptions;
    private overlayElement: HTMLElement | null = null;
    private refreshInterval: any = null;

    constructor(options: ComparisonOverlayOptions) {
        this.options = options;
        this.root = document.createElement('div');
        this.root.className = 'comparison-overlay';

        // PERFORMANCE: Increased interval from 2s to 60s (97% reduction in overhead)
        // XP/Growth changes happen slowly, 60s refresh is sufficient
        // TODO: Replace with event-driven updates (subscribe to tracker data changes)
        this.refreshInterval = setInterval(() => this.refresh(), 60000); // 60 seconds
    }

    /**
     * Build the ComparisonOverlay DOM structure
     */
    build(): HTMLElement {
        this.root.innerHTML = '';

        const primaryTeam = MGPetTeam.getTeam(this.options.primaryTeamId);
        const compareTeam = MGPetTeam.getTeam(this.options.compareTeamId);

        if (!primaryTeam || !compareTeam) {
            this.showError('Teams not found');
            return this.root;
        }

        const primaryPurpose = getCachedTeamPurpose(primaryTeam);
        const trackerDef = getRelevantTracker(primaryPurpose);

        if (!trackerDef.getComparisonData) {
            this.showMessage('This tracker does not support comparison mode');
            return this.root;
        }

        const comparisonData = trackerDef.getComparisonData(primaryTeam, compareTeam);
        if (comparisonData.length === 0) {
            this.showMessage('No comparison data available');
            return this.root;
        }

        this.overlayElement = element('div', { className: 'comparison-overlay__content' });

        // Build mathematical winner summary
        const { winner, reason } = this.calculateMathematicalWinner(comparisonData);

        // Header with Team Names and Triads
        const header = element('div', { className: 'comparison-overlay__header' });
        header.style.background = 'var(--tab-bg)';

        const primaryInfo = element('div', { className: 'comparison-header__team' });
        primaryInfo.appendChild(this.renderTeamTriad(primaryTeam.id));
        const primaryName = element('span', { className: 'comparison-overlay__vs' }, primaryTeam.name);
        primaryInfo.appendChild(primaryName);

        const vsText = element('span', { className: 'comparison-overlay__vs' }, ' VS ');

        const compareInfo = element('div', { className: 'comparison-header__team' });
        const compareName = element('span', { className: 'comparison-overlay__vs' }, compareTeam.name);
        compareInfo.appendChild(compareName);
        compareInfo.appendChild(this.renderTeamTriad(compareTeam.id));

        header.appendChild(primaryInfo);
        header.appendChild(vsText);
        header.appendChild(compareInfo);
        this.overlayElement.appendChild(header);

        // Better Overall Indicator
        const winnerCallout = element('div', { className: 'better-overall-callout' });
        const icon = winner === 'primary' ? '⭐' : winner === 'comparison' ? '✨' : '🤝';
        const teamNameText = winner === 'primary' ? primaryTeam.name : compareTeam.name;

        winnerCallout.innerHTML = `
            <div class="better-overall__icon">${icon}</div>
            <div class="better-overall__content">
                <div class="better-overall__text">
                    ${winner === 'equal' ? 'Both teams perform equally well.' : `<strong>${teamNameText}</strong> is better overall.`}
                </div>
                ${winner !== 'equal' ? `<div class="better-overall__metric">Reason: ${reason}</div>` : ''}
            </div>
        `;
        this.overlayElement.appendChild(winnerCallout);

        // Comparison Stats Table
        const table = element('table', { className: 'comparison-table' });
        const thead = element('thead');
        thead.innerHTML = `
            <tr>
                <th>Stat</th>
                <th>${primaryTeam.name}</th>
                <th>${compareTeam.name}</th>
                <th>Difference</th>
            </tr>
        `;
        table.appendChild(thead);

        const tbody = element('tbody');
        const relevantStats = comparisonData.filter(d =>
            !d.label.toLowerCase().includes('eggs growing') &&
            !d.label.toLowerCase().includes('plants growing')
        );

        relevantStats.forEach(data => {
            const indicator = this.calculateDiff(data);
            const row = this.buildStatRow(data, indicator);
            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        this.overlayElement.appendChild(table);
        this.root.appendChild(this.overlayElement);

        return this.root;
    }

    private renderTeamTriad(teamId: string): HTMLElement {
        const team = MGPetTeam.getTeam(teamId);
        const container = element('div', { className: 'team-bunched-sprites' });
        if (!team) return container;

        const pets = MGPetTeam.getPetsForTeam(team);
        pets.slice(0, 3).forEach((pet: any, i: number) => {
            const spriteContainer = element('div', { className: `bunched-sprite bunched-sprite--${i + 1}` });
            try {
                const speciesKey = pet.petSpecies || pet.species;
                const canvas = MGSprite.toCanvas('pet', speciesKey, { mutations: pet.mutations, scale: 1.5 });
                canvas.style.width = '100%';
                canvas.style.height = '100%';
                canvas.style.objectFit = 'contain';
                canvas.style.imageRendering = 'crisp-edges';
                spriteContainer.appendChild(canvas);
            } catch (err) {
                spriteContainer.innerHTML = '🐾';
            }
            container.appendChild(spriteContainer);
        });
        return container;
    }

    private buildStatRow(data: ComparisonData, indicator: DiffIndicator): HTMLElement {
        const row = element('tr');
        const icon = indicator.direction === 'up' ? '↑' : indicator.direction === 'down' ? '↓' : '';

        let diffText = '';
        if (indicator.direction === 'equal') {
            diffText = 'Equal';
        } else {
            const sign = indicator.direction === 'up' ? '+' : '-';
            if (data.format === 'percentage') {
                diffText = `${sign}${indicator.absoluteDiff.toFixed(1)}%`;
            } else if (data.format === 'time') {
                diffText = `${sign}${this.formatTime(indicator.absoluteDiff)}`;
            } else {
                diffText = `${sign}${indicator.absoluteDiff.toLocaleString()}`;
            }
        }

        row.innerHTML = `
            <td class="comparison-table__label">${data.label}</td>
            <td class="comparison-table__val">${data.format === 'number' ? data.primaryValue.toLocaleString() : this.formatTime(data.primaryValue)}</td>
            <td class="comparison-table__val">${data.format === 'number' ? data.comparisonValue.toLocaleString() : this.formatTime(data.comparisonValue)}</td>
            <td class="comparison-table__diff comparison-table__diff--${indicator.direction}">
                <span>${icon}</span>
                <span>${diffText}</span>
                ${indicator.direction !== 'equal' && data.format !== 'percentage'
                ? `<span style="opacity: 0.6; font-weight: 500; font-size: 11px;">(${indicator.percentDiff.toFixed(1)}%)</span>`
                : ''
            }
            </td>
        `;
        return row;
    }

    private calculateMathematicalWinner(comparisonData: ComparisonData[]): { winner: 'primary' | 'comparison' | 'equal', reason: string } {
        const primaryTeam = MGPetTeam.getTeam(this.options.primaryTeamId);
        if (!primaryTeam) return { winner: 'equal', reason: '' };

        const primaryPurpose = getCachedTeamPurpose(primaryTeam).primary;

        if (primaryPurpose === 'hatching' || primaryPurpose === 'time-reduction') {
            const speedStat = comparisonData.find(d => d.label.toLowerCase().includes('speed') || d.label.toLowerCase().includes('mult'));
            if (speedStat) {
                const diff = speedStat.primaryValue - speedStat.comparisonValue;
                if (Math.abs(diff) > 0.05) {
                    const winner = diff > 0 ? 'primary' : 'comparison';
                    const pct = ((Math.abs(diff) / Math.min(speedStat.primaryValue, speedStat.comparisonValue)) * 100).toFixed(1);
                    return { winner, reason: `provides ${pct}% faster ${speedStat.label.toLowerCase()}` };
                }
            }
        }

        const timeStat = comparisonData.find(d => d.label.toLowerCase().includes('time to max') || d.label.toLowerCase().includes('time to next'));
        if (timeStat) {
            const diff = timeStat.primaryValue - timeStat.comparisonValue;
            if (Math.abs(diff) >= 0.01) {
                return {
                    winner: diff < 0 ? 'primary' : 'comparison',
                    reason: `reaches ${timeStat.label} ${this.formatTime(Math.abs(diff))} sooner`
                };
            }
        }

        const xpStat = comparisonData.find(d => d.label.toLowerCase().includes('total xp') || d.label.toLowerCase().includes('xp/hr'));
        if (xpStat) {
            const diff = xpStat.primaryValue - xpStat.comparisonValue;
            if (Math.abs(diff) >= 1) {
                const winner = diff > 0 ? 'primary' : 'comparison';
                const pct = ((Math.abs(diff) / Math.min(xpStat.primaryValue, xpStat.comparisonValue)) * 100).toFixed(1);
                return { winner, reason: `generates ${pct}% more XP per hour` };
            }
        }

        return { winner: 'equal', reason: 'performance is virtually identical' };
    }

    private calculateDiff(data: ComparisonData): DiffIndicator {
        const diff = data.primaryValue - data.comparisonValue;
        const percentDiff = data.comparisonValue !== 0 ? (diff / data.comparisonValue) * 100 : (diff > 0 ? 100 : (diff < 0 ? -100 : 0));
        let direction: 'up' | 'down' | 'equal';
        if (Math.abs(percentDiff) < 0.1) {
            direction = 'equal';
        } else {
            const higherIsBetter = data.format !== 'time';
            direction = diff > 0 ? (higherIsBetter ? 'up' : 'down') : (higherIsBetter ? 'down' : 'up');
        }
        return { direction, percentDiff: Math.abs(percentDiff), absoluteDiff: Math.abs(diff), label: data.label };
    }

    private formatTime(hours: number): string {
        let h = Math.floor(hours);
        let m = Math.round((hours - h) * 60);
        if (m === 60) { h += 1; m = 0; }
        if (h === 0 && m === 0) return '0h';
        if (h === 0) return `${m}m`;
        if (m === 0) return `${h}h`;
        return `${h}h ${m}m`;
    }

    private showError(message: string): void {
        this.root.innerHTML = `<div class="comparison-overlay__error"><span class="comparison-overlay__error-icon">⚠️</span><span>${message}</span></div>`;
    }

    private showMessage(message: string): void {
        this.root.innerHTML = `<div class="comparison-overlay__message"><span class="comparison-overlay__message-icon">ℹ️</span><span>${message}</span></div>`;
    }

    refresh(): void { this.build(); }

    destroy(): void {
        if (this.refreshInterval) clearInterval(this.refreshInterval);
        if (this.root.parentNode) this.root.parentNode.removeChild(this.root);
        this.overlayElement = null;
    }
}
