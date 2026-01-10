/**
 * Base Pet Card Component
 * 
 * Part of the "Blank Shell" architecture. Handles pet identity, 
 * sprite rendering, and basic STR stats. Provides a slot for 
 * feature-specific trackers (XP, Growth, etc.) via the Stat Grid.
 */

import { MGSprite } from '../../../modules/sprite';
import type { UnifiedPet } from '../../../globals/core/types';
import type { MutationName } from '../../../modules/sprite';
import { Badge } from '../Badge/Badge';

export interface BasePetCardOptions {
    /** Callback when card is clicked */
    onClick?: (pet: UnifiedPet) => void;
    /** Custom CSS classes */
    className?: string;
    /** Hide the STR badge if needed */
    hideStr?: boolean;
}

export class BasePetCard {
    public root: HTMLElement;
    private pet: UnifiedPet;
    private options: BasePetCardOptions;
    private contentSlot: HTMLElement | null = null;
    private isBuilt = false;

    constructor(pet: UnifiedPet, options: BasePetCardOptions = {}) {
        this.pet = pet;
        this.options = options;
        this.root = document.createElement('div');
        this.root.className = 'base-pet-card';
        if (options.className) this.root.classList.add(options.className);
    }

    /**
     * Build the shell structure
     */
    build(): HTMLElement {
        if (this.isBuilt) return this.root;

        // Apply state classes
        this.updateStateClasses();

        // Left Identity Section
        const left = document.createElement('div');
        left.className = 'base-pet-card__left';

        // Sprite
        const spriteWrapper = document.createElement('div');
        spriteWrapper.className = 'base-pet-card__sprite-wrapper';
        this.renderSprite(spriteWrapper);
        left.appendChild(spriteWrapper);

        // Info (Name + STR)
        const info = document.createElement('div');
        info.className = 'base-pet-card__info';

        const name = document.createElement('div');
        name.className = 'base-pet-card__name';
        name.textContent = this.pet.name || this.pet.petSpecies;
        info.appendChild(name);

        if (!this.options.hideStr) {
            const str = document.createElement('div');
            str.className = 'base-pet-card__str';
            this.renderStr(str);
            info.appendChild(str);
        }
        left.appendChild(info);

        this.root.appendChild(left);

        // Right Content Slot (The "Blank" part)
        this.contentSlot = document.createElement('div');
        this.contentSlot.className = 'base-pet-card__content';
        this.root.appendChild(this.contentSlot);

        // Click interaction
        if (this.options.onClick) {
            this.root.style.cursor = 'pointer';
            this.root.addEventListener('click', () => this.options.onClick?.(this.pet));
        }

        this.isBuilt = true;
        return this.root;
    }

    /**
     * Get the hook for trackers to inject their UI
     */
    getContentSlot(): HTMLElement {
        if (!this.contentSlot) throw new Error('BasePetCard must be built before getting slot');
        return this.contentSlot;
    }

    /**
     * Refresh the shell identity (e.g. if STR or hunger changes)
     */
    update(updatedPet: UnifiedPet): void {
        this.pet = updatedPet;
        if (!this.isBuilt) return;

        this.updateStateClasses();

        // Update name/STR
        const nameEl = this.root.querySelector('.base-pet-card__name');
        if (nameEl) nameEl.textContent = updatedPet.name || updatedPet.petSpecies;

        const strEl = this.root.querySelector('.base-pet-card__str') as HTMLElement;
        if (strEl) this.renderStr(strEl);

        // Re-render sprite if mutations or species could have changed (unlikely for a single update, but safe)
        const spriteWrapper = this.root.querySelector('.base-pet-card__sprite-wrapper');
        if (spriteWrapper instanceof HTMLElement) {
            this.renderSprite(spriteWrapper);
        }
    }

    private updateStateClasses(): void {
        this.root.classList.toggle('base-pet-card--max', this.pet.currentStrength >= this.pet.maxStrength);
        this.root.classList.toggle('base-pet-card--starving', (this.pet.hunger || 0) === 0);
    }

    private renderStr(container: HTMLElement): void {
        const isMax = this.pet.currentStrength >= this.pet.maxStrength;
        const labelText = isMax
            ? `MAX ${this.pet.maxStrength}`
            : `STR ${this.pet.currentStrength}/${this.pet.maxStrength}`;

        container.innerHTML = '';
        const badge = Badge({
            label: labelText,
            type: 'neutral',
            tone: 'soft',
            size: 'sm',
            pill: true
        });
        container.appendChild(badge.root);
    }

    /**
     * Toggles centered layout for pets with no feature slot content
     */
    setCentered(centered: boolean): void {
        this.root.classList.toggle('base-pet-card--centered', centered);
    }

    private renderSprite(container: HTMLElement): void {
        container.innerHTML = '';
        try {
            const mutations = (this.pet.mutations || []) as MutationName[];
            if (MGSprite.has('pet', this.pet.petSpecies)) {
                const canvas = MGSprite.toCanvas('pet', this.pet.petSpecies, {
                    mutations,
                    scale: 1,
                    boundsMode: 'padded'
                });
                canvas.style.width = '64px';
                canvas.style.height = '64px';
                canvas.style.objectFit = 'contain';
                container.appendChild(canvas);
            } else {
                container.innerHTML = '<div class="base-pet-card__sprite-fallback">🐾</div>';
            }
        } catch (error) {
            container.innerHTML = '<div class="base-pet-card__sprite-fallback">🐾</div>';
        }
    }

    destroy(): void {
        this.root.remove();
        this.contentSlot = null;
        this.isBuilt = false;
    }
}
