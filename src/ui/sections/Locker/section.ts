/**
 * Locker section
 * Configuration UI for the HarvestLocker feature
 */

import { BaseSection } from '../core/Section';
import { HarvestLockerCardPart, harvestLockerCardCss } from './parts';
import { plantSelectorCss } from '../../components/PlantSelector';
import { injectStyleOnce } from '../../styles/inject';
import { initLockerState, getLockerState } from './state';

export class LockerSection extends BaseSection {
    private harvestLockerCardPart: HarvestLockerCardPart | null = null;

    constructor() {
        super({
            id: 'tab-locker',
            label: 'Locker',
        });
    }

    /**
     * Preload section state during mod initialization
     */
    override async preload(): Promise<void> {
        await initLockerState();
    }

    /**
     * Build the section UI
     */
    protected build(container: HTMLElement): void {
        // Inject styles into shadow root
        const shadow = container.getRootNode() as ShadowRoot;
        injectStyleOnce(shadow, harvestLockerCardCss, 'harvest-locker-card-styles');
        injectStyleOnce(shadow, plantSelectorCss, 'plant-selector-styles');

        const section = this.createGrid("12px");
        section.id = "locker";
        container.appendChild(section);

        this.initializeHarvestLockerCardPart(section);
    }

    /**
     * Render with preloaded card to avoid rebuild on tab click
     */
    override render(container: HTMLElement): void {
        // Save the preloaded card part
        const preloadedCardPart = this.harvestLockerCardPart;

        // Clear reference so destroy() doesn't clean it up during parent.render()
        this.harvestLockerCardPart = null;

        // Call parent render (moves preloaded content or builds on-demand)
        super.render(container);

        // Restore the card part reference
        this.harvestLockerCardPart = preloadedCardPart;
    }

    /**
     * Cleanup when section is unmounted
     */
    protected destroy(): void {
        if (this.harvestLockerCardPart) {
            this.harvestLockerCardPart.destroy();
            this.harvestLockerCardPart = null;
        }
    }

    /**
     * Initialize HarvestLocker card part
     */
    private initializeHarvestLockerCardPart(section: HTMLElement): void {
        if (!this.harvestLockerCardPart) {
            const state = getLockerState();
            this.harvestLockerCardPart = new HarvestLockerCardPart({
                defaultExpanded: true,
                defaultMode: state.get().ui.harvestLockerMode,
                defaultSelectedSpecies: state.get().ui.selectedSpecies,
                defaultSearchQuery: state.get().ui.searchQuery,
            });
        }

        const harvestLockerCard = this.harvestLockerCardPart.build();
        section.appendChild(harvestLockerCard);
        this.harvestLockerCardPart.render();
    }
}
