/**
 * Locker section
 * Configuration UI for the HarvestLocker feature
 */

import { BaseSection } from '../core/Section';
import { HarvestLockerCardPart, harvestLockerCardCss } from './parts';
import { injectStyleOnce } from '../../styles/inject';

export class LockerSection extends BaseSection {
    private harvestLockerCardPart: HarvestLockerCardPart | null = null;

    constructor() {
        super({
            id: 'tab-locker',
            label: 'Locker',
        });
    }

    /**
     * Build the section UI
     */
    protected build(container: HTMLElement): void {
        // Inject styles into shadow root
        const shadow = container.getRootNode() as ShadowRoot;
        injectStyleOnce(shadow, harvestLockerCardCss, 'harvest-locker-card-styles');

        const section = this.createGrid("12px");
        section.id = "locker";
        container.appendChild(section);

        this.initializeHarvestLockerCardPart(section);
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
            this.harvestLockerCardPart = new HarvestLockerCardPart({
                defaultExpanded: true,
            });
        }

        const harvestLockerCard = this.harvestLockerCardPart.build();
        section.appendChild(harvestLockerCard);
        this.harvestLockerCardPart.render();
    }
}
