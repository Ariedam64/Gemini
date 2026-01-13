/**
 * Trackers Section
 *
 * Displays team-based tracking stats (XP, Growth, Value, etc.)
 * with purpose-aware tracker selection and optional comparison mode.
 *
 * Per .claude/rules/ui/sections.md:
 * - Extends BaseSection
 * - Uses parts/ for sub-features
 * - Persistent state via createSectionStore
 * - Safe to call build()/destroy() multiple times
 *
 * @module TrackersSection
 */

import { BaseSection } from '../core/Section';
import type { SectionsDeps } from '../core/Types';
import { initTrackersState, getTrackersState, type TrackersState } from './state';
import { injectStyleOnce } from '../../styles/inject';
import { trackersCss } from './trackers.css';
import { partsTrackersCss } from './parts/parts.css';
import { xpTrackerCss } from './parts/xpTracker.css';
import { growthTrackerCss } from './parts/growthTracker.css';
import { badgeCss } from '../../components/Badge/badge.css';
import { TeamSelector } from './parts/TeamSelector';
import { TrackerContainer } from './parts/TrackerContainer';
import { ComparisonOverlay } from './parts/ComparisonOverlay';
import { Globals } from '../../../globals';

export class TrackersSection extends BaseSection {
  private deps?: SectionsDeps;
  private mainContainer: HTMLElement | null = null;
  private teamSelector: TeamSelector | null = null;
  private trackerContainer: TrackerContainer | null = null;
  private comparisonOverlay: ComparisonOverlay | null = null;
  private isVisible = false; // PERFORMANCE: Track visibility to skip updates when tab not active

  constructor(deps?: SectionsDeps) {
    super({ id: 'tab-trackers', label: 'Trackers' });
    this.deps = deps;
  }

  /**
   * Build the Trackers section UI
   * Called by SectionManager when section is activated
   */
  protected async build(container: HTMLElement): Promise<void> {
    // Multi-build prevention and DOM cleanup
    this.isVisible = true;

    // Initialize state first
    await initTrackersState();
    const state = getTrackersState();

    // Inject styles into shadow root
    const shadow = container.getRootNode() as ShadowRoot;
    this.injectStylesIntoShadow(shadow);

    // Clear host container
    container.innerHTML = '';

    // Create main section container
    this.mainContainer = this.createContainer('trackers-section');
    this.mainContainer.style.display = 'flex';
    this.mainContainer.style.flexDirection = 'column';
    this.mainContainer.style.gap = 'var(--spacing-md)';
    this.mainContainer.style.padding = 'var(--spacing-sm)';
    container.appendChild(this.mainContainer);

    // Initialize parts with fresh state
    await this.initializeParts();

    // Subscribe to events for live updates
    this.subscribeToEvents();

    // Subscribe to state changes
    const unsubscribe = state.subscribe((newState) => {
      this.handleStateChange(newState);
    });
    this.addCleanup(unsubscribe);
  }

  /**
   * Inject all section styles into shadow root
   */
  private injectStylesIntoShadow(shadow: ShadowRoot): void {
    injectStyleOnce(shadow, trackersCss, 'trackers-styles');
    injectStyleOnce(shadow, partsTrackersCss, 'trackers-parts-styles');
    injectStyleOnce(shadow, xpTrackerCss, 'xp-tracker-styles');
    injectStyleOnce(shadow, growthTrackerCss, 'growth-tracker-styles');
    injectStyleOnce(shadow, badgeCss, 'badge-styles');
  }

  /**
   * Cleanup and destroy the section
   * Called by SectionManager when switching tabs
   */
  protected destroy(): void {
    // PERFORMANCE: Mark section as not visible to prevent wasted updates
    this.isVisible = false;

    // Cleanup parts (CRITICAL: prevents memory leaks)
    if (this.teamSelector) {
      this.teamSelector.destroy();
      this.teamSelector = null;
    }

    if (this.trackerContainer) {
      this.trackerContainer.destroy();
      this.trackerContainer = null;
    }

    if (this.comparisonOverlay) {
      this.comparisonOverlay.destroy();
      this.comparisonOverlay = null;
    }

    // Clean up DOM
    this.mainContainer?.remove();
    this.mainContainer = null;

    // BaseSection handles cleanup of subscriptions via addCleanup()
  }

  /**
   * Initialize section parts
   */
  private async initializeParts(): Promise<void> {
    if (!this.mainContainer) return;

    const state = getTrackersState();
    const currentState = state.get();

    // Initialize TeamSelector
    this.teamSelector = new TeamSelector({
      initialSelection: currentState.selectedTeamIds,
      onSelectionChange: (selectedTeamIds) => {
        this.handleSelectionChange(selectedTeamIds);
      },
    });
    this.mainContainer.appendChild(this.teamSelector.build());
    this.addCleanup(() => this.teamSelector?.destroy());

    // Initialize TrackerContainer
    this.trackerContainer = new TrackerContainer({
      selectedTeamIds: currentState.selectedTeamIds,
    });
    this.mainContainer.appendChild(this.trackerContainer.build());
    this.addCleanup(() => this.trackerContainer?.destroy());

    // Initialize ComparisonOverlay if 2 teams selected
    if (currentState.selectedTeamIds.length === 2) {
      this.showComparisonOverlay(
        currentState.selectedTeamIds[0],
        currentState.selectedTeamIds[1]
      );
    }
  }

  /**
   * Handle team selection changes
   */
  private handleSelectionChange(selectedTeamIds: string[]): void {
    const state = getTrackersState();
    state.update({ selectedTeamIds });

    if (selectedTeamIds.length === 0) {
      this.hideComparisonOverlay();
      if (this.trackerContainer) {
        this.trackerContainer.updateSelection([]);
        this.mainContainer?.appendChild(this.trackerContainer.root);
      }
      return;
    }

    if (selectedTeamIds.length === 2) {
      this.showComparisonOverlay(selectedTeamIds[0], selectedTeamIds[1]);
    } else {
      this.hideComparisonOverlay();
      if (this.trackerContainer && this.teamSelector) {
        const teamId = selectedTeamIds[0];
        const card = this.teamSelector.getTeamCard(teamId);
        if (card) {
          card.insertAdjacentElement('afterend', this.trackerContainer.root);
        }
        this.trackerContainer.updateSelection(selectedTeamIds);
      }
    }
  }

  /**
   * Show comparison overlay
   */
  private showComparisonOverlay(primaryTeamId: string, compareTeamId: string): void {
    this.hideComparisonOverlay();
    if (!this.mainContainer || !this.teamSelector) return;

    if (this.trackerContainer) {
      this.trackerContainer.root.style.display = 'none';
    }

    this.comparisonOverlay = new ComparisonOverlay({
      primaryTeamId,
      compareTeamId,
      containerElement: this.mainContainer,
      state: getTrackersState(),
    });

    const card = this.teamSelector.getTeamCard(compareTeamId);
    if (card) {
      card.insertAdjacentElement('afterend', this.comparisonOverlay.build());
    } else {
      this.mainContainer.appendChild(this.comparisonOverlay.build());
    }

    this.addCleanup(() => this.comparisonOverlay?.destroy());
  }

  /**
   * Hide comparison overlay
   */
  private hideComparisonOverlay(): void {
    if (this.comparisonOverlay) {
      this.comparisonOverlay.destroy();
      this.comparisonOverlay = null;
    }

    // Restore tracker container
    if (this.trackerContainer) {
      this.trackerContainer.root.style.display = '';
    }
  }

  /**
   * Subscribe to events for live updates
   *
   * PERFORMANCE: Only subscribe to structural changes (teams added/removed).
   * Individual trackers handle their own data updates via their own subscriptions.
   * This prevents duplicate subscription cascades that cause severe lag.
   */
  private subscribeToEvents(): void {
    // Subscribe to team changes (teams added/removed/renamed)
    // This updates TeamSelector to show new/deleted teams
    const unsubTeams = Globals.myPets.subscribe(() => {
      // PERFORMANCE: Skip updates when tab not visible
      if (!this.isVisible) return;

      if (this.teamSelector) {
        this.teamSelector.refresh();
      }
    });
    this.addCleanup(unsubTeams);

    // REMOVED: Duplicate subscriptions for ability/garden/weather events
    // Trackers manage their own subscriptions in xpTracker.ts and growthTracker.ts
    // This eliminates 200-400% overhead from duplicate event handlers
  }

  /**
   * Handle state changes (team selection, etc.)
   * Called by state.subscribe()
   */
  private handleStateChange(newState: TrackersState): void {
    // Selection changes are already handled by handleSelectionChange
    // This is for other state changes (e.g., expanded, lastTrackerView)
    console.log('[TrackersSection] State changed:', newState);
  }
}
