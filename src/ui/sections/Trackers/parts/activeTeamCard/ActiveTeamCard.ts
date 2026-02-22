/**
 * Active Team Card
 *
 * A permanently-expanded tracker card that displays the player's 3 currently
 * active in-game pets with full feature-panel stats (XP, Growth, Value, etc.).
 *
 * Users can click any pet sprite slot to swap that slot's pet for comparison
 * purposes without changing their actual in-game active pets.
 *
 * Slot overrides are transient (in-memory only) and are cleared automatically
 * when the real active pets change or when the card is destroyed.
 *
 * Per .claude/rules/ui/sections.md — parts pattern.
 */

import { Card } from '../../../../components/Card/Card';
import { Button } from '../../../../components/Button/Button';
import { Modal } from '../../../../components/Modal/Modal';
import { Input } from '../../../../components/Input/Input';
import { element } from '../../../../styles/helpers';
import { MGPetTeam } from '../../../../../features/petTeam';
import { Globals } from '../../../../../globals';
import { Store } from '../../../../../atoms/store';
import { MGCustomModal, MGEnvironment, MGSprite } from '../../../../../modules';
import type { PetTeam } from '../../../../../features/petTeam';
import type { UnifiedPet } from '../../../../../globals/core/types';
import { TrackerExpansionHandler } from '../TrackerExpansion';

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

/** Stable synthetic team ID — never collides with real MGPetTeam IDs */
const VIRTUAL_TEAM_ID = 'gemini:active-tracker-virtual';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type SlotState = {
    petId: string | null;
    isOverride: boolean;
};

export interface ActiveTeamCardOptions {
    setHUDOpen?: (open: boolean) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// ActiveTeamCard
// ─────────────────────────────────────────────────────────────────────────────

export class ActiveTeamCard {
    private options: ActiveTeamCardOptions;
    private expansionHandler: TrackerExpansionHandler;

    // DOM references
    private card: HTMLDivElement | null = null;
    private slotsContainer: HTMLElement | null = null;
    private expansionContainer: HTMLElement | null = null;
    private saveRow: HTMLElement | null = null;
    private saveButton: ReturnType<typeof Button> | null = null;

    // Slot state: 3 fixed slots for the 3 active pet positions
    private slots: [SlotState, SlotState, SlotState] = [
        { petId: null, isOverride: false },
        { petId: null, isOverride: false },
        { petId: null, isOverride: false },
    ];

    // Cleanup
    private unsubMyPets?: () => void;
    private cleanups: (() => void)[] = [];

    constructor(options: ActiveTeamCardOptions = {}) {
        this.options = options;
        this.expansionHandler = new TrackerExpansionHandler({
            // getListContainer is required by the constructor but never used
            // by expandInto (our code path). Provide a no-op.
            getListContainer: () => null,
        });
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Lifecycle
    // ─────────────────────────────────────────────────────────────────────────

    build(): HTMLDivElement {
        if (this.card) return this.card;

        const wrapper = element('div', { className: 'active-team-card' });

        // 3 clickable sprite slots (header row)
        this.slotsContainer = element('div', { className: 'active-team-card__slots' });
        wrapper.appendChild(this.slotsContainer);

        // Feature panels expansion area
        this.expansionContainer = element('div', {
            className: 'active-team-card__expansion team-expanded-container',
        });
        wrapper.appendChild(this.expansionContainer);

        // "Save as Team" button row (conditionally shown)
        this.saveRow = element('div', { className: 'active-team-card__save-row' });
        wrapper.appendChild(this.saveRow);

        this.card = Card({
            title: 'Active Pets',
            subtitle: 'Your current active pet team — click a slot to compare',
            expandable: false,
            defaultExpanded: true,
        }, wrapper) as HTMLDivElement;

        return this.card;
    }

    render(): void {
        if (!this.card) return;
        this.syncToActivePets();
        this.rebuildSlots();
        this.rebuildExpansion();
        this.updateSaveButton();
    }

    destroy(): void {
        this.cleanups.forEach(fn => fn());
        this.cleanups = [];

        if (this.unsubMyPets) {
            this.unsubMyPets();
            this.unsubMyPets = undefined;
        }

        this.expansionHandler.destroy();

        if (this.saveButton) {
            this.saveButton.remove();
            this.saveButton = null;
        }

        this.card = null;
        this.slotsContainer = null;
        this.expansionContainer = null;
        this.saveRow = null;
    }

    /** Wire up the myPets subscription after build() — call once. */
    subscribe(): void {
        let lastActiveIds = this.getActiveIds();

        this.unsubMyPets = Globals.myPets.subscribeStable(() => {
            const currentActiveIds = this.getActiveIds();

            // Only react if the active pets actually changed
            const changed = currentActiveIds.some((id, i) => id !== lastActiveIds[i]);
            if (!changed) return;

            lastActiveIds = currentActiveIds;

            // Clear overrides and sync to new active pets
            this.syncToActivePets();
            this.rebuildSlots();
            this.rebuildExpansion();
            this.updateSaveButton();
        });
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Private: state management
    // ─────────────────────────────────────────────────────────────────────────

    /** Read the 3 active pet IDs from the global (byLocation.active, ordered by position). */
    private getActiveIds(): [string | null, string | null, string | null] {
        const myPets = Globals.myPets.get();
        const active = myPets.byLocation.active ?? [];
        return [
            active[0]?.id ?? null,
            active[1]?.id ?? null,
            active[2]?.id ?? null,
        ];
    }

    /**
     * Reset all slot overrides and sync slot petIds to the current active pets.
     * This is called on initial render and when active pets change.
     */
    private syncToActivePets(): void {
        const [id0, id1, id2] = this.getActiveIds();
        this.slots[0] = { petId: id0, isOverride: false };
        this.slots[1] = { petId: id1, isOverride: false };
        this.slots[2] = { petId: id2, isOverride: false };
    }

    /** Build a virtual PetTeam from the current slot states. */
    private buildVirtualTeam(): PetTeam {
        return {
            id: VIRTUAL_TEAM_ID,
            name: 'Active Pets',
            petIds: [
                this.slots[0].petId ?? '',
                this.slots[1].petId ?? '',
                this.slots[2].petId ?? '',
            ] as [string, string, string],
            createdAt: 0,
            updatedAt: 0,
        };
    }

    /** Resolve current slot pets to UnifiedPet objects (null slots become absent). */
    private resolveSlotPets(): UnifiedPet[] {
        const myPets = Globals.myPets.get();
        return this.slots
            .map(slot => (slot.petId ? myPets.all.find(p => p.id === slot.petId) : undefined))
            .filter((p): p is UnifiedPet => p !== undefined);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Private: DOM building
    // ─────────────────────────────────────────────────────────────────────────

    private rebuildSlots(): void {
        if (!this.slotsContainer) return;
        this.slotsContainer.innerHTML = '';

        const myPets = Globals.myPets.get();

        for (let i = 0; i < 3; i++) {
            const slot = this.slots[i];
            const pet = slot.petId ? myPets.all.find(p => p.id === slot.petId) : null;

            const slotEl = element('button', {
                className: pet
                    ? 'active-team-card__slot'
                    : 'active-team-card__slot active-team-card__slot--empty',
                type: 'button',
            }) as HTMLButtonElement;

            // Sprite or placeholder
            const spriteWrap = element('div', { className: 'active-team-card__sprite' });

            if (pet) {
                try {
                    if (MGSprite.isReady() && MGSprite.has('pet', pet.petSpecies)) {
                        const canvas = MGSprite.toCanvas('pet', pet.petSpecies, {
                            mutations: (pet.mutations ?? []) as any,
                            scale: 0.9,
                            boundsMode: 'padded',
                        });
                        canvas.style.imageRendering = 'pixelated';
                        canvas.style.maxHeight = '48px';
                        canvas.style.width = 'auto';
                        spriteWrap.appendChild(canvas);
                    } else {
                        spriteWrap.textContent = '🐾';
                    }
                } catch {
                    spriteWrap.textContent = '🐾';
                }
            } else {
                const placeholder = element('div', { className: 'active-team-card__sprite-placeholder' });
                placeholder.textContent = '+';
                spriteWrap.appendChild(placeholder);
            }

            slotEl.appendChild(spriteWrap);

            // Swap icon hint
            const swapHint = element('span', {
                className: 'active-team-card__slot-swap',
                textContent: '⇄',
            });
            slotEl.appendChild(swapHint);

            // Override indicator
            if (slot.isOverride) {
                const badge = element('span', {
                    className: 'active-team-card__override-badge',
                    textContent: 'OVERRIDE',
                });
                slotEl.appendChild(badge);
            }

            const slotIndex = i;
            slotEl.addEventListener('click', () => {
                this.handleSlotClick(slotIndex);
            });

            this.slotsContainer.appendChild(slotEl);
        }
    }

    /**
     * Tear down and rebuild the feature-panel expansion into expansionContainer.
     * Called on initial render and whenever a slot override changes.
     */
    rebuildExpansion(): void {
        if (!this.expansionContainer) return;

        const virtualTeam = this.buildVirtualTeam();
        const pets = this.resolveSlotPets();

        this.expansionHandler.expandInto(
            this.expansionContainer,
            virtualTeam,
            pets,
            {
                // reexpand callback: when the handler itself needs to rebuild
                // (e.g. growth-view grouping toggle), it calls this instead of
                // the list-based collapse+expand flow.
                reexpand: () => this.rebuildExpansion(),
            }
        );
    }

    private updateSaveButton(): void {
        if (!this.saveRow) return;

        if (this.shouldShowSaveButton()) {
            if (!this.saveButton) {
                this.saveButton = Button({
                    label: 'Save as Team',
                    variant: 'primary',
                    size: 'sm',
                    onClick: () => this.handleSaveAsTeam(),
                });
                this.saveRow.appendChild(this.saveButton);
            }
        } else {
            if (this.saveButton) {
                this.saveButton.remove();
                this.saveButton = null;
            }
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Private: slot interaction
    // ─────────────────────────────────────────────────────────────────────────

    private async handleSlotClick(slotIndex: number): Promise<void> {
        const myPets = Globals.myPets.get();

        // Build the full pet list in the inventory modal shape
        const allPets = myPets.all.map(pet => ({
            id: pet.id,
            itemType: 'Pet' as const,
            petSpecies: pet.petSpecies,
            name: pet.name ?? null,
            xp: pet.xp,
            hunger: pet.hunger,
            mutations: pet.mutations ?? [],
            targetScale: pet.targetScale,
            abilities: pet.abilities ?? [],
        }));

        // Exclude the other 2 displayed slots from selection
        const excludedIds = new Set(
            this.slots
                .filter((_, i) => i !== slotIndex)
                .map(s => s.petId)
                .filter((id): id is string => id !== null)
        );
        const availablePets = allPets.filter(pet => !excludedIds.has(pet.id));

        await Store.set('myPossiblyNoLongerValidSelectedItemIndexAtom', null);

        // On small screens, close the HUD before opening the modal
        const env = MGEnvironment.detect();
        const isSmallScreen = env.platform === 'mobile' || env.viewportWidth < 768;
        if (isSmallScreen && this.options.setHUDOpen) {
            this.options.setHUDOpen(false);
        }

        let selectedPetId: string | null = null;

        const unsubscribeSelection = Globals.myInventory.subscribeSelection((event) => {
            if (event.current?.item) {
                selectedPetId = (event.current.item as any).id;
                Store.set('myPossiblyNoLongerValidSelectedItemIndexAtom', null);
                MGCustomModal.close();
            }
        });

        await MGCustomModal.show('inventory', {
            items: availablePets as any,
            favoritedItemIds: [],
        });

        await MGCustomModal.waitForClose();
        unsubscribeSelection();

        // Reopen HUD if it was closed
        const finalEnv = MGEnvironment.detect();
        const shouldReopenHUD = finalEnv.platform === 'mobile' || finalEnv.viewportWidth < 768;
        if (shouldReopenHUD && this.options.setHUDOpen) {
            this.options.setHUDOpen(true);
        }

        if (selectedPetId) {
            this.slots[slotIndex] = { petId: selectedPetId, isOverride: true };
            this.rebuildSlots();
            this.rebuildExpansion();
            this.updateSaveButton();
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Private: Save as Team
    // ─────────────────────────────────────────────────────────────────────────

    private shouldShowSaveButton(): boolean {
        const hasOverride = this.slots.some(s => s.isOverride);
        if (!hasOverride) return false;

        const ids = this.slots.map(s => s.petId ?? '');
        // Hide button if an identical team already exists
        return !MGPetTeam.getAllTeams().some(
            t => t.petIds[0] === ids[0] && t.petIds[1] === ids[1] && t.petIds[2] === ids[2]
        );
    }

    private handleSaveAsTeam(): void {
        // Build a unique default name
        const existingNames = new Set(MGPetTeam.getAllTeams().map(t => t.name));
        let defaultName = 'My Team';
        let counter = 1;
        while (existingNames.has(defaultName)) {
            defaultName = `My Team (${counter++})`;
        }

        // Name input
        const nameInput = Input({
            value: defaultName,
            placeholder: 'Team name…',
            mode: 'any',
            allowSpaces: true,
            maxLength: 32,
            blockGameKeys: true,
        });

        const inputWrapper = element('div', { className: 'active-team-name-input-wrapper' });
        const label = element('label', { textContent: 'Enter a name for this team:' });
        inputWrapper.appendChild(label);
        inputWrapper.appendChild(nameInput.root);

        // Footer with Save / Cancel
        const footer = element('div', { className: 'active-team-modal-footer' });

        let modal: ReturnType<typeof Modal> | null = null;

        const cancelBtn = Button({
            label: 'Cancel',
            variant: 'default',
            size: 'sm',
            onClick: () => modal?.close(),
        });

        const saveBtn = Button({
            label: 'Save',
            variant: 'primary',
            size: 'sm',
            onClick: () => {
                const name = nameInput.getValue().trim();
                if (!name) return;

                try {
                    const petIds = this.slots.map(s => s.petId ?? '');
                    MGPetTeam.createTeam(name, petIds);
                    modal?.close();
                    // Clear overrides since they're now a real team
                    this.slots = this.slots.map(s => ({ ...s, isOverride: false })) as [SlotState, SlotState, SlotState];
                    this.rebuildSlots();
                    this.updateSaveButton();
                } catch (err) {
                    // Briefly tint the input red to indicate an error (e.g. duplicate name)
                    nameInput.root.style.outline = '2px solid var(--color-danger, red)';
                    setTimeout(() => {
                        nameInput.root.style.outline = '';
                    }, 1500);
                }
            },
        });

        // Allow Enter key to trigger save
        nameInput.root.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key === 'Enter') saveBtn.click();
        });

        footer.appendChild(cancelBtn);
        footer.appendChild(saveBtn);

        modal = Modal({
            title: 'Save as Pet Team',
            content: inputWrapper,
            footer,
            size: 'sm',
            closeOnBackdrop: true,
            closeOnEscape: true,
            onClose: () => {
                nameInput.destroy();
            },
        });
        // Modal() auto-appends to the Gemini shadow root and opens itself.
        // Focus the input after the open animation.
        setTimeout(() => nameInput.focus(), 50);
    }
}
