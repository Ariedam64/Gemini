/**
 * Tracker Container - Orchestrates tracker display based on team purpose
 *
 * Responsibilities:
 * - Receives selected team ID(s) from TrackersSection state
 * - Detects team purpose and selects relevant tracker
 * - Renders tracker with automatic cleanup
 * - Handles tracker switching when team selection changes
 * - Manages comparison mode when 2 teams selected
 *
 * Per .claude/rules/ui/sections.md:
 * - Section parts handle focused sub-features
 * - Must have build() and destroy() methods
 * - Safe to call multiple times
 *
 * @module TrackerContainer
 */

import { MGPetTeam } from '../../../../features/petTeam';
import { getRelevantTracker } from '../trackers/registry';
import type { TrackerDefinition } from '../trackers/types';
import { getCachedTeamPurpose } from '../utils/cache';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface TrackerContainerOptions {
    selectedTeamIds: string[];
}

interface ActiveTracker {
    definition: TrackerDefinition;
    cleanup: () => void;
    teamId: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Tracker Container
// ─────────────────────────────────────────────────────────────────────────────

export class TrackerContainer {
    public root: HTMLElement;

    private readonly options: TrackerContainerOptions;
    private activeTrackers: Map<string, ActiveTracker> = new Map();
    private trackersElement: HTMLElement | null = null;
    private headerElement: HTMLElement | null = null;

    constructor(options: TrackerContainerOptions) {
        this.options = options;
        this.root = document.createElement('div');
        this.root.className = 'tracker-container';
    }

    /**
     * Build the TrackerContainer DOM structure
     */
    build(): HTMLElement {
        // Note: CSS is injected at TrackersSection level

        // Header showing current tracker info
        this.headerElement = document.createElement('div');
        this.headerElement.className = 'tracker-container__header';
        this.root.appendChild(this.headerElement);

        // Trackers display area
        this.trackersElement = document.createElement('div');
        this.trackersElement.className = 'tracker-container__trackers';
        this.root.appendChild(this.trackersElement);

        // Initial render based on selection
        this.refresh();

        return this.root;
    }

    /**
     * Refresh tracker display based on current team selection
     * PERFORMANCE: Uses selective updates instead of innerHTML = ''
     */
    refresh(): void {
        const selectedTeamIds = this.options.selectedTeamIds;

        // Handle empty selection
        if (selectedTeamIds.length === 0) {
            this.showEmptyState();
            return;
        }

        // PERFORMANCE FIX: Remove wrappers for deselected teams WITHOUT clearing innerHTML
        for (const [teamId, tracker] of this.activeTrackers) {
            if (!selectedTeamIds.includes(teamId)) {
                // Find and remove specific wrapper
                const wrapper = this.trackersElement?.querySelector(`[data-team-id="${teamId}"]`);
                if (wrapper) {
                    wrapper.remove();
                }
                tracker.cleanup();
                this.activeTrackers.delete(teamId);
            }
        }

        // PERFORMANCE FIX: Remove empty state if it exists
        const emptyState = this.trackersElement?.querySelector('.tracker-container__empty');
        if (emptyState) {
            emptyState.remove();
        }

        // Render trackers for each selected team
        for (const teamId of selectedTeamIds) {
            // Check if wrapper already exists in DOM
            const existingWrapper = this.trackersElement?.querySelector(`[data-team-id="${teamId}"]`);

            if (existingWrapper && this.activeTrackers.has(teamId)) {
                // Tracker is already mounted and active - update team header if needed
                this.updateTrackerHeader(teamId, existingWrapper as HTMLElement);
                continue;
            }

            if (this.activeTrackers.has(teamId) && !existingWrapper) {
                // Tracker exists but wrapper removed - remount
                const tracker = this.activeTrackers.get(teamId)!;
                this.mountExistingTracker(tracker);
                continue;
            }

            // Create new tracker
            this.createAndMountTracker(teamId);
        }

        // Update header only if needed
        this.updateHeader();
    }

    /**
     * Update team selection and refresh
     */
    updateSelection(selectedTeamIds: string[]): void {
        this.options.selectedTeamIds = selectedTeamIds;
        this.refresh();
    }

    /**
     * Update tracker header for comparison mode changes
     * PERFORMANCE: Only updates header if needed (selective DOM update)
     */
    private updateTrackerHeader(teamId: string, wrapper: HTMLElement): void {
        const tracker = this.activeTrackers.get(teamId);
        if (!tracker) return;

        const team = MGPetTeam.getTeam(teamId);
        if (!team) return;

        const shouldShowHeader = this.options.selectedTeamIds.length > 1;
        const existingHeader = wrapper.querySelector('.tracker-wrapper__team-header');

        if (shouldShowHeader && !existingHeader) {
            // Add header
            const teamHeader = document.createElement('div');
            teamHeader.className = 'tracker-wrapper__team-header';
            teamHeader.innerHTML = `
                <span class="tracker-wrapper__team-name">${team.name}</span>
                <span class="tracker-wrapper__tracker-label">${tracker.definition.icon} ${tracker.definition.label}</span>
            `;
            wrapper.insertBefore(teamHeader, wrapper.firstChild);
        } else if (!shouldShowHeader && existingHeader) {
            // Remove header
            existingHeader.remove();
        }
        // If header exists and should exist, leave it alone (no update needed)
    }

    /**
     * Create and mount a new tracker for a team
     */
    private createAndMountTracker(teamId: string): void {
        if (!this.trackersElement) return;

        // Get team data
        const team = MGPetTeam.getTeam(teamId);
        if (!team) {
            console.warn(`[TrackerContainer] Team not found: ${teamId}`);
            return;
        }

        // Detect team purpose (cached for performance)
        const purpose = getCachedTeamPurpose(team);

        // Get relevant tracker
        const trackerDef = getRelevantTracker(purpose);

        // Create tracker wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'tracker-wrapper';
        wrapper.dataset.teamId = teamId;
        wrapper.dataset.trackerId = trackerDef.id;

        // Add team header within wrapper (for comparison mode)
        if (this.options.selectedTeamIds.length > 1) {
            const teamHeader = document.createElement('div');
            teamHeader.className = 'tracker-wrapper__team-header';
            teamHeader.innerHTML = `
                <span class="tracker-wrapper__team-name">${team.name}</span>
                <span class="tracker-wrapper__tracker-label">${trackerDef.icon} ${trackerDef.label}</span>
            `;
            wrapper.appendChild(teamHeader);
        }

        // Render tracker (returns cleanup function)
        const cleanup = trackerDef.render(team, wrapper);

        // Store active tracker
        this.activeTrackers.set(teamId, {
            definition: trackerDef,
            cleanup,
            teamId,
        });

        // Mount to DOM
        this.trackersElement.appendChild(wrapper);
    }

    /**
     * Mount an existing tracker that's already been created
     */
    private mountExistingTracker(tracker: ActiveTracker): void {
        if (!this.trackersElement) return;

        // Find existing wrapper in DOM
        const existingWrapper = this.trackersElement.querySelector(
            `[data-team-id="${tracker.teamId}"]`
        ) as HTMLElement;

        if (existingWrapper) {
            // Already mounted, just ensure it's visible
            return;
        }

        // If wrapper was removed from DOM but tracker still active, remount
        const team = MGPetTeam.getTeam(tracker.teamId);
        if (!team) return;

        const wrapper = document.createElement('div');
        wrapper.className = 'tracker-wrapper';
        wrapper.dataset.teamId = tracker.teamId;
        wrapper.dataset.trackerId = tracker.definition.id;

        // Add team header for comparison mode
        if (this.options.selectedTeamIds.length > 1) {
            const teamHeader = document.createElement('div');
            teamHeader.className = 'tracker-wrapper__team-header';
            teamHeader.innerHTML = `
                <span class="tracker-wrapper__team-name">${team.name}</span>
                <span class="tracker-wrapper__tracker-label">${tracker.definition.icon} ${tracker.definition.label}</span>
            `;
            wrapper.appendChild(teamHeader);
        }

        // Re-render tracker (cleanup old first)
        tracker.cleanup();
        const newCleanup = tracker.definition.render(team, wrapper);
        tracker.cleanup = newCleanup;

        this.trackersElement.appendChild(wrapper);
    }

    /**
     * Update header with current tracker info
     */
    private updateHeader(): void {
        if (!this.headerElement) return;

        const selectedCount = this.options.selectedTeamIds.length;

        // PERFORMANCE: Hide header for single team (cleaner "Only Display Cards" look as requested)
        if (selectedCount <= 1) {
            this.headerElement.innerHTML = '';
            this.headerElement.classList.add('tracker-container__header--hidden');
            return;
        }

        this.headerElement.classList.remove('tracker-container__header--hidden');

        // Comparison mode header
        this.headerElement.innerHTML = `
            <div class="tracker-header__title">
                <span class="tracker-header__icon">⚖️</span>
                <span class="tracker-header__label">Comparison Mode</span>
            </div>
            <div class="tracker-header__subtitle">
                Comparing ${selectedCount} teams
            </div>
        `;
    }

    /**
     * Show empty state when no teams selected
     */
    private showEmptyState(): void {
        // Clean up all active trackers
        for (const tracker of this.activeTrackers.values()) {
            tracker.cleanup();
        }
        this.activeTrackers.clear();

        if (this.trackersElement) {
            this.trackersElement.innerHTML = `
                <div class="tracker-container__empty">
                    <div class="tracker-empty__icon">📊</div>
                    <div class="tracker-empty__title">No Team Selected</div>
                    <div class="tracker-empty__message">
                        Select a team above to view tracker statistics
                    </div>
                </div>
            `;
        }

        if (this.headerElement) {
            this.headerElement.innerHTML = '';
            this.headerElement.classList.add('tracker-container__header--hidden');
        }
    }

    /**
     * Cleanup all trackers and resources
     */
    destroy(): void {
        // Clean up all active trackers
        for (const tracker of this.activeTrackers.values()) {
            tracker.cleanup();
        }
        this.activeTrackers.clear();

        if (this.root.parentNode) {
            this.root.parentNode.removeChild(this.root);
        }

        this.trackersElement = null;
        this.headerElement = null;
    }
}
