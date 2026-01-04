/**
 * Journal Checker HUD Section
 * Displays collection progress in the Gemini side panel
 * 
 * Uses the comprehensive JournalProgress data from journalChecker feature
 * Per ui/sections.md: uses state.ts for persistent state
 */

import { BaseSection } from "../core/Section";
import { element } from "../../styles/helpers";
import { injectStyleOnce } from "../../styles/inject";
import { journalCheckerCss } from "./styles.css";
import { OverviewPage } from "./parts/OverviewPage";
import { SpeciesPage } from "./parts/SpeciesPage";
import { MGSprite } from "../../../modules";
import type { JournalProgress, SpeciesProgress } from "../../../features/journalChecker/types";
import { JournalTab, journalTabCss } from "../../components/JournalTab";
import { journalProgressBarCss } from "../../components/JournalProgressBar";
import { journalSeeMoreCss } from "../../components/JournalSeeMore";
import { initSectionState, getStore, isStoreReady, type TabId, type CategoryId } from "./state";

// Extensible tab configuration
interface JournalTabConfig {
    id: TabId;
    label: string;
    colorTheme: 'teal' | 'green' | 'purple';
}

const JOURNAL_TABS: JournalTabConfig[] = [
    { id: 'all', label: 'All', colorTheme: 'teal' },
    { id: 'plants', label: 'Crops', colorTheme: 'green' },
    { id: 'pets', label: 'Pets', colorTheme: 'purple' }
];

type JournalView =
    | { type: 'overview' }
    | { type: 'species', species: SpeciesProgress, category: 'plants' | 'pets' };

export class JournalCheckerSection extends BaseSection {
    private progress: JournalProgress | null = null;
    private currentView: JournalView = { type: 'overview' };

    constructor() {
        super({ id: "tab-journal-checker", label: "Journal" });
    }

    protected async build(container: HTMLElement): Promise<void> {
        this.container = container;

        // Initialize persistent state (per ui/sections.md)
        await initSectionState();

        // Ensure Sprite system is ready
        await MGSprite.init();
        console.log('[JournalChecker] Sprite categories:', MGSprite.getCategories());

        // Inject styles
        const shadow = container.getRootNode() as ShadowRoot;
        injectStyleOnce(shadow, journalCheckerCss, 'journal-checker-styles');
        injectStyleOnce(shadow, journalTabCss, 'journal-tab-styles');
        injectStyleOnce(shadow, journalProgressBarCss, 'journal-progress-bar-styles');
        injectStyleOnce(shadow, journalSeeMoreCss, 'journal-see-more-styles');

        this.container.classList.add('journal-checker-host');
        this.container.style.height = '100%';
        this.container.style.overflowY = 'auto';

        // Initial Progress Fetch
        await this.updateProgress();

        // Listen for global updates
        const updateHandler = ((e: CustomEvent) => {
            this.progress = e.detail;
            this.refresh();
        }) as EventListener;

        window.addEventListener('gemini:journal-updated', updateHandler);

        this.addCleanup(() => {
            window.removeEventListener('gemini:journal-updated', updateHandler);
        });
    }

    private async updateProgress(): Promise<void> {
        try {
            const { MGJournalChecker } = await import('../../../features');
            this.progress = await MGJournalChecker.aggregateJournalProgress();
            this.refresh();
        } catch (error) {
            console.error('[JournalChecker] Failed to load progress:', error);
        }
    }

    // ─── State Accessors (persisted via state.ts) ───

    private get activeTab(): TabId {
        if (!isStoreReady()) return 'all';
        return getStore().get().activeTab;
    }

    private set activeTab(value: TabId) {
        if (!isStoreReady()) return;
        getStore().update({ activeTab: value });
    }

    private get expandedCategories(): Set<CategoryId> {
        if (!isStoreReady()) return new Set();
        return new Set(getStore().get().expandedCategories);
    }

    private setExpandedCategories(categories: Set<CategoryId>): void {
        if (!isStoreReady()) return;
        getStore().update({ expandedCategories: Array.from(categories) });
    }

    private refresh(): void {
        if (!this.container) return;

        // Clear existing
        this.container.innerHTML = '';

        if (!this.progress) {
            this.container.appendChild(element("div", {
                style: "padding: 20px; text-align: center; font-family: var(--font-game); color: var(--journal-sub);"
            }, "Loading Journal..."));
            return;
        }

        // Render tab navigation
        this.container.appendChild(this.renderTabNavigation());

        if (this.currentView.type === 'overview') {
            this.container.appendChild(OverviewPage({
                progress: this.progress,
                activeTab: this.activeTab,
                expandedCategories: this.expandedCategories,
                onSpeciesClick: (species, category) => {
                    this.currentView = { type: 'species', species, category };
                    this.refresh();
                },
                onToggleExpand: (category: CategoryId) => {
                    const expanded = this.expandedCategories;
                    if (expanded.has(category)) expanded.delete(category);
                    else expanded.add(category);
                    this.setExpandedCategories(expanded);
                    this.refresh();
                }
            }));
        } else {
            this.container.appendChild(SpeciesPage({
                species: this.currentView.species,
                category: this.currentView.category,
                onBack: () => {
                    this.currentView = { type: 'overview' };
                    this.refresh();
                }
            }));
        }
    }

    private renderTabNavigation(): HTMLElement {
        const tabsContainer = element("div", { className: "journal-tabs-container" });

        JOURNAL_TABS.forEach((tab, index) => {
            const button = JournalTab({
                label: tab.label,
                tabId: tab.id,
                tabIndex: index + 1,
                active: this.activeTab === tab.id,
                onClick: () => {
                    this.activeTab = tab.id;
                    this.refresh();
                }
            });

            tabsContainer.appendChild(button);
        });

        return tabsContainer;
    }
}
