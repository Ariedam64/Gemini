/**
 * Trackers Section
 *
 * Displays team-based tracking stats (XP, Growth, Value, etc.) with expandable
 * tracker panels per team. UI mirrors Pets section design.
 *
 * Per .claude/rules/ui/sections.md:
 * - Extends BaseSection
 * - Uses parts/ for sub-features
 * - Persistent state via createSectionStore
 * - Safe to call build()/destroy() multiple times
 *
 * -----------------------------------------------------------
 * NOTE: This section imports from Pets section for shared components:
 * - TeamCardExpansionHandler (via TrackerCard.ts)
 * - FEATURE_PANELS (xpPanel, growthPanel)
 *
 * When Pets section is simplified to team-management only, these
 * components will move to Trackers section exclusively.
 * -----------------------------------------------------------
 *
 * @module TrackersSection
 */

import { BaseSection } from '../core/Section';
import type { SectionsDeps } from '../core/Types';
import { TrackerCardPart, ActiveTeamCard, activeTeamCardCss } from './parts';
import { initTrackersState } from './state';
import { Globals } from '../../../globals';
import { injectStyleOnce } from '../../styles/inject';
import { trackerCardCss } from './parts/trackerCard.css';
import { tileGridOverlayCss } from './parts/tileGridOverlay.css';

// Local vendored styles
import { teamCardCss } from './parts/teamCard.css';
import { featureCardCss } from './parts/featureCard.css';
import { teamXpPanelCss } from './parts/teamXpPanel.css';
import { growthPanelCss } from './parts/featurePanels/growthPanel.css';
import { basePetCardCss } from '../../components/BasePetCard';
import { badgeCss } from '../../components/Badge/badge.css';
import { arcadeButtonCss } from '../../components/ArcadeButton';
import { geminiIconButtonCss } from '../../components/GeminiIconButton';

export class TrackersSection extends BaseSection {
    private deps?: SectionsDeps;
    private trackerCardPart: TrackerCardPart | null = null;
    private activeTeamCard: ActiveTeamCard | null = null;
    private unsubscribeMyPets?: () => void;

    constructor(deps?: SectionsDeps) {
        super({ id: 'tab-trackers', label: 'Trackers' });
        this.deps = deps;
    }

    // ───────────────────────────────────────────────────────────────────────────
    // Lifecycle
    // ───────────────────────────────────────────────────────────────────────────

    protected async build(container: HTMLElement): Promise<void> {
        this.container = container;

        // Ensure Sprite system is ready (required for pet sprites in panels)
        const { MGSprite } = await import('../../../modules');
        await MGSprite.init();

        // Initialize Trackers state
        await initTrackersState();

        // Inject styles into shadow root
        const shadow = container.getRootNode() as ShadowRoot;
        this.injectStyles(shadow);

        // Create section container
        const section = this.createGrid('12px');
        section.id = 'trackers';
        container.appendChild(section);

        // Initialize ActiveTeamCard (always-expanded, shown first)
        this.initializeActiveTeamCard(section);

        // Initialize TrackerCard part (per-team expandable list)
        this.initializeTrackerCard(section);

        // Subscribe to pet changes to re-render tracker card when teams change
        this.unsubscribeMyPets = Globals.myPets.subscribeStable(() => {
            this.trackerCardPart?.render();
        });
    }

    protected async destroy(): Promise<void> {
        // Cleanup subscription
        if (this.unsubscribeMyPets) {
            this.unsubscribeMyPets();
            this.unsubscribeMyPets = undefined;
        }

        // Cleanup ActiveTeamCard
        if (this.activeTeamCard) {
            this.activeTeamCard.destroy();
            this.activeTeamCard = null;
        }

        // Cleanup TrackerCard part
        if (this.trackerCardPart) {
            this.trackerCardPart.destroy();
            this.trackerCardPart = null;
        }
    }

    public unmount(): void {
        this.destroy().catch(console.error);
        super.unmount();
    }

    // ───────────────────────────────────────────────────────────────────────────
    // Private Methods
    // ───────────────────────────────────────────────────────────────────────────

    private injectStyles(shadow: ShadowRoot): void {
        // Tracker-specific styles
        injectStyleOnce(shadow, trackerCardCss, 'tracker-card-styles');
        injectStyleOnce(shadow, activeTeamCardCss, 'active-team-card-styles');
        injectStyleOnce(shadow, tileGridOverlayCss, 'tile-grid-overlay-styles');

        // Shared styles from Pets section (will move here eventually)
        injectStyleOnce(shadow, teamCardCss, 'team-card-styles');
        injectStyleOnce(shadow, featureCardCss, 'feature-card-styles');
        injectStyleOnce(shadow, teamXpPanelCss, 'team-xp-panel-styles');
        injectStyleOnce(shadow, growthPanelCss, 'growth-panel-styles');

        // Component styles
        injectStyleOnce(shadow, basePetCardCss, 'base-pet-card-styles');
        injectStyleOnce(shadow, badgeCss, 'badge-styles');
        injectStyleOnce(shadow, arcadeButtonCss, 'arcade-button-styles');
        injectStyleOnce(shadow, geminiIconButtonCss, 'gemini-icon-button-styles');
    }

    private initializeActiveTeamCard(section: HTMLElement): void {
        if (!this.activeTeamCard) {
            this.activeTeamCard = new ActiveTeamCard({
                setHUDOpen: this.deps?.setHUDOpen,
            });
        }

        const card = this.activeTeamCard.build();
        section.appendChild(card);
        this.activeTeamCard.render();
        this.activeTeamCard.subscribe();
    }

    private initializeTrackerCard(section: HTMLElement): void {
        if (!this.trackerCardPart) {
            this.trackerCardPart = new TrackerCardPart({
                setHUDOpen: this.deps?.setHUDOpen,
            });
        }

        const card = this.trackerCardPart.build();
        section.appendChild(card);
        this.trackerCardPart.render();
    }
}
