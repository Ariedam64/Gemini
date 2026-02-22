/**
 * Locker section
 * Configuration UI for the HarvestLocker feature
 */

import { BaseSection } from '../core/Section';
import { HarvestLockerCardPart, harvestLockerCardCss, EggLockerCardPart, eggLockerCardCss, DecorLockerCardPart } from './parts';
import { plantSelectorCss } from '../../components/PlantSelector';
import { injectStyleOnce } from '../../styles/inject';
import { initLockerState, getLockerState, setHarvestLockerExpanded, setEggLockerExpanded, setDecorLockerExpanded } from './state';

export class LockerSection extends BaseSection {
    private harvestLockerCardPart: HarvestLockerCardPart | null = null;
    private eggLockerCardPart: EggLockerCardPart | null = null;
    private decorLockerCardPart: DecorLockerCardPart | null = null;

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
        injectStyleOnce(shadow, eggLockerCardCss, 'egg-locker-card-styles');

        const section = this.createGrid("12px");
        section.id = "locker";
        container.appendChild(section);

        this.initializeHarvestLockerCardPart(section);
        this.initializeEggLockerCardPart(section);
        this.initializeDecorLockerCardPart(section);
    }

    /**
     * Render with preloaded card to avoid rebuild on tab click
     */
    override render(container: HTMLElement): void {
        // Save preloaded card parts
        const preloadedHarvestPart = this.harvestLockerCardPart;
        const preloadedEggPart = this.eggLockerCardPart;
        const preloadedDecorPart = this.decorLockerCardPart;

        // Clear references so destroy() doesn't clean them up during parent.render()
        this.harvestLockerCardPart = null;
        this.eggLockerCardPart = null;
        this.decorLockerCardPart = null;

        // Call parent render (moves preloaded content or builds on-demand)
        super.render(container);

        // Restore card part references
        this.harvestLockerCardPart = preloadedHarvestPart;
        this.eggLockerCardPart = preloadedEggPart;
        this.decorLockerCardPart = preloadedDecorPart;
    }

    /**
     * Cleanup when section is unmounted
     */
    protected destroy(): void {
        if (this.harvestLockerCardPart) {
            this.harvestLockerCardPart.destroy();
            this.harvestLockerCardPart = null;
        }
        if (this.eggLockerCardPart) {
            this.eggLockerCardPart.destroy();
            this.eggLockerCardPart = null;
        }
        if (this.decorLockerCardPart) {
            this.decorLockerCardPart.destroy();
            this.decorLockerCardPart = null;
        }
    }

    /**
     * Initialize HarvestLocker card part
     */
    private initializeHarvestLockerCardPart(section: HTMLElement): void {
        if (!this.harvestLockerCardPart) {
            const state = getLockerState();
            this.harvestLockerCardPart = new HarvestLockerCardPart({
                defaultExpanded: state.get().ui.harvestLockerExpanded,
                defaultMode: state.get().ui.harvestLockerMode,
                defaultSelectedSpecies: state.get().ui.selectedSpecies,
                defaultSearchQuery: state.get().ui.searchQuery,
                onExpandChange: setHarvestLockerExpanded,
            });
        }

        const harvestLockerCard = this.harvestLockerCardPart.build();
        section.appendChild(harvestLockerCard);
        this.harvestLockerCardPart.render();
    }

    /**
     * Initialize EggLocker card part
     */
    private initializeEggLockerCardPart(section: HTMLElement): void {
        if (!this.eggLockerCardPart) {
            const state = getLockerState();
            this.eggLockerCardPart = new EggLockerCardPart({
                defaultExpanded: state.get().ui.eggLockerExpanded,
                onExpandChange: setEggLockerExpanded,
            });
        }

        const eggLockerCard = this.eggLockerCardPart.build();
        section.appendChild(eggLockerCard);
        this.eggLockerCardPart.render();
    }

    /**
     * Initialize DecorLocker card part
     */
    private initializeDecorLockerCardPart(section: HTMLElement): void {
        if (!this.decorLockerCardPart) {
            const state = getLockerState();
            this.decorLockerCardPart = new DecorLockerCardPart({
                defaultExpanded: state.get().ui.decorLockerExpanded,
                onExpandChange: setDecorLockerExpanded,
            });
        }

        const decorLockerCard = this.decorLockerCardPart.build();
        section.appendChild(decorLockerCard);
        this.decorLockerCardPart.render();
    }
}
