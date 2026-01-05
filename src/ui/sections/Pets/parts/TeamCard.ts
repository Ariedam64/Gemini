/**
 * Team Card Part
 * Manages the Team card UI with overview and manage modes
 */

import { Card } from "../../../components/Card/Card";
import { TeamListItem } from "../../../components/TeamListItem/TeamListItem";
import { SegmentedControl, SegmentedControlHandle } from "../../../components/SegmentedControl/SegmentedControl";
import { Checkbox, CheckboxHandle } from "../../../components/Checkbox/Checkbox";
import { Button } from "../../../components/Button/Button";
import { element } from "../../../styles/helpers";
import { MGPetTeam } from "../../../../features/petTeam";
import { Globals } from "../../../../globals";
import { Store } from "../../../../atoms/store";
import { MGCustomModal, MGEnvironment } from "../../../../modules";
import type { PetTeam } from "../../../../features/petTeam";

type ScrollLockRelease = () => void;
type DragState = {
    itemEl: HTMLElement;
    pointerId: number;
    placeholder: HTMLElement;
    offsetY: number;
    fromIndex: number;
    teamId: string;
    captureTarget: HTMLElement;
    touchActionPrev: string;
    releaseScrollLock?: () => void;
};

type LongPressState = {
    pointerId: number;
    startX: number;
    startY: number;
    timeout: number;
    target: HTMLElement;
};

function isScrollable(el: HTMLElement): boolean {
    const style = getComputedStyle(el);
    if (!/(auto|scroll|overlay)/.test(style.overflowY + style.overflowX)) return false;
    const sh = el.scrollHeight;
    const ch = el.clientHeight;
    const sw = el.scrollWidth;
    const cw = el.clientWidth;
    return (sh > ch + 1) || (sw > cw + 1);
}

function lockElementScroll(el: HTMLElement): ScrollLockRelease {
    const prev = {
        overflow: el.style.overflow,
        overflowY: el.style.overflowY,
        overflowX: el.style.overflowX,
        touchAction: el.style.touchAction,
        overscrollBehavior: el.style.overscrollBehavior,
    };
    el.style.overflow = "hidden";
    el.style.overflowY = "hidden";
    el.style.overflowX = "hidden";
    el.style.touchAction = "none";
    el.style.overscrollBehavior = "contain";
    let released = false;
    return () => {
        if (released) return;
        released = true;
        el.style.overflow = prev.overflow;
        el.style.overflowY = prev.overflowY;
        el.style.overflowX = prev.overflowX;
        el.style.touchAction = prev.touchAction;
        el.style.overscrollBehavior = prev.overscrollBehavior;
    };
}

function collectScrollableAncestors(start: HTMLElement): HTMLElement[] {
    const out: HTMLElement[] = [];
    const seen = new Set<HTMLElement>();
    let node: Node | null = start;

    while (node) {
        if (node instanceof ShadowRoot) {
            node = node.host;
            continue;
        }
        if (node instanceof HTMLElement) {
            if (!seen.has(node) && node !== start && isScrollable(node)) {
                out.push(node);
                seen.add(node);
            }
            node = node.parentElement ?? node.parentNode;
        } else {
            break;
        }
    }

    if (document.body) out.push(document.body);
    if (document.documentElement) out.push(document.documentElement);

    return out.filter((el, idx, arr) => arr.indexOf(el) === idx);
}

function acquireScrollLock(origin: HTMLElement): ScrollLockRelease {
    const ancestors = collectScrollableAncestors(origin);
    const releases = ancestors.map(lockElementScroll);
    let released = false;
    return () => {
        if (released) return;
        released = true;
        for (let i = releases.length - 1; i >= 0; i--) {
            try { releases[i](); } catch {}
        }
    };
}

export interface TeamCardPartOptions {
    onTeamReordered?: (teamIds: string[]) => void;
    setHUDOpen?: (open: boolean) => void;
}

export class TeamCardPart {
    private card: HTMLDivElement | null = null;
    private modeControl: SegmentedControlHandle | null = null;
    private modeContainer: HTMLDivElement | null = null;
    private teamContent: HTMLDivElement | null = null;
    private listContainer: HTMLElement | null = null;
    private dragState: DragState | null = null;
    private longPressState: LongPressState | null = null;
    private teamMode: "overview" | "manage" = "overview";
    private selectedTeamIds: Set<string> = new Set();
    private teamCheckboxes: Map<string, CheckboxHandle> = new Map();
    private onPointerMove: (ev: PointerEvent) => void;
    private onPointerUp: (ev: PointerEvent) => void;
    private onPointerCancel: (ev: PointerEvent) => void;
    private onLongPressPointerMove: (ev: PointerEvent) => void;
    private onLongPressPointerUp: (ev: PointerEvent) => void;
    private options: TeamCardPartOptions;

    constructor(options: TeamCardPartOptions = {}) {
        this.options = options;
        this.onPointerMove = this.handlePointerMove.bind(this);
        this.onPointerUp = this.handlePointerUp.bind(this);
        this.onPointerCancel = this.handlePointerCancel.bind(this);
        this.onLongPressPointerMove = this.handleLongPressPointerMove.bind(this);
        this.onLongPressPointerUp = this.handleLongPressPointerUp.bind(this);
    }

    build(): HTMLDivElement {
        if (this.card) return this.card;
        return this.createTeamCard();
    }

    destroy(): void {
        this.cleanupDrag();
        this.cleanupLongPress();
        if (this.modeControl) {
            this.modeControl.destroy();
            this.modeControl = null;
        }
        this.teamCheckboxes.forEach((checkbox) => {
            checkbox.destroy();
        });
        this.teamCheckboxes.clear();
        this.selectedTeamIds.clear();
        this.card = null;
        this.modeContainer = null;
        this.teamContent = null;
        this.listContainer = null;
    }

    render(): void {
        if (!this.card) return;

        const isEnabled = MGPetTeam.isEnabled();

        if (!isEnabled) {
            this.renderDisabledState();
            return;
        }

        if (this.modeContainer) {
            this.modeContainer.style.display = "flex";
        }

        this.ensureModeControl();
        this.renderTeamContent();
    }

    private createTeamCard(): HTMLDivElement {
        const cardWrapper = element("div", {
            className: "team-card-wrapper",
        });

        this.modeContainer = element("div", {
            className: "team-card__mode-container",
        });
        cardWrapper.appendChild(this.modeContainer);

        this.teamContent = element("div", {
            className: "team-card__content",
        });
        cardWrapper.appendChild(this.teamContent);

        const card = Card({
            title: "Team",
            subtitle: "Organize and switch between pet teams",
            expandable: true,
            defaultExpanded: true,
        }, cardWrapper);

        this.card = card;
        return card;
    }

    private ensureModeControl(): void {
        if (!this.modeContainer) return;

        if (!this.modeControl) {
            this.modeControl = SegmentedControl({
                segments: [
                    { id: "overview", label: "Overview" },
                    { id: "manage", label: "Manage" },
                ],
                selected: this.teamMode,
                onChange: (id) => {
                    this.teamMode = id as "overview" | "manage";
                    this.renderTeamContent();
                },
            });

            this.modeContainer.appendChild(this.modeControl);
            return;
        }

        if (this.modeControl.getSelected() !== this.teamMode) {
            this.modeControl.select(this.teamMode);
        }
    }

    private renderDisabledState(): void {
        if (!this.teamContent) return;

        this.cleanupDrag();
        this.listContainer = null;

        if (this.modeContainer) {
            this.modeContainer.style.display = "none";
        }

        const disabledState = element("div", {
            className: "team-card__disabled-state",
        });

        const message = element("div", {
            textContent: "Pet Team feature is disabled",
            className: "team-card__disabled-message",
        });

        const enableButton = Button({
            label: "Enable Feature",
            onClick: () => {
                MGPetTeam.setEnabled(true);
                this.render();
            },
        });

        disabledState.appendChild(message);
        disabledState.appendChild(enableButton);
        this.teamContent.replaceChildren(disabledState);
    }

    private renderTeamContent(): void {
        if (!this.teamContent) return;

        this.cleanupDrag();
        this.cleanupLongPress();
        this.listContainer = null;
        this.teamContent.replaceChildren();
        this.teamCheckboxes.forEach((checkbox) => checkbox.destroy());
        this.teamCheckboxes.clear();
        this.selectedTeamIds.clear();

        const teams = MGPetTeam.getAllTeams();
        const activeTeamId = MGPetTeam.getActiveTeamId();

        if (teams.length === 0) {
            const emptyState = element("div", {
                textContent: "No teams yet. Create your first team!",
                className: "team-card__empty-state",
            });
            this.teamContent.appendChild(emptyState);

            if (this.teamMode === "manage") {
                const actionsContainer = element("div", {
                    className: "team-card__actions",
                });

                const newTeamButton = Button({
                    label: "New Team",
                    variant: "primary",
                    onClick: () => {
                        this.handleCreateTeam();
                    },
                });

                actionsContainer.appendChild(newTeamButton);
                this.teamContent.appendChild(actionsContainer);
            }
            return;
        }

        this.listContainer = element("div", {
            className: "team-card__list-container",
        });

        teams.forEach((team: PetTeam) => {
            const isActive = activeTeamId === team.id;
            let checkboxHandle: CheckboxHandle | undefined;
            if (this.teamMode === "manage") {
                checkboxHandle = this.createCheckboxIndicator(team.id);
            }

            const teamItem = TeamListItem({
                team,
                isActive,
                customIndicator: checkboxHandle?.root,
                hideDragHandle: this.teamMode === "manage",
                isNameEditable: this.teamMode === "manage",
                showSlotStyles: this.teamMode === "manage",
                onNameChange: (newName) => {
                    this.handleRenameTeam(team.id, newName);
                },
                onSlotClick: this.teamMode === "manage"
                    ? (slotIndex) => {
                        this.handleRemovePet(team.id, slotIndex);
                    }
                    : undefined,
            });

            // Apply manage mode class to disable drag cursor
            if (this.teamMode === "manage") {
                teamItem.classList.add("team-list-item--manage");
            }

            // In overview mode: click to select, drag handle to reorder
            if (this.teamMode === "overview") {
                teamItem.addEventListener("click", async (ev: PointerEvent) => {
                    const dragHandle = (ev.target as HTMLElement).closest(".team-list-item__drag-handle");
                    if (!dragHandle) {
                        teamItem.classList.add("team-list-item--clicked");
                        setTimeout(() => {
                            teamItem.classList.remove("team-list-item--clicked");
                        }, 300);

                        try {
                            await MGPetTeam.activateTeam(team);
                        } catch (error) {
                            console.error('[TeamCard] Failed to activate team:', error);
                            // TODO: Show error notification to user
                        }
                    }
                });

                teamItem.addEventListener("pointerdown", (ev: PointerEvent) => {
                    if (ev.button !== 0) return;
                    const dragHandle = (ev.target as HTMLElement).closest(".team-list-item__drag-handle");
                    if (dragHandle) {
                        this.startDrag(ev, teamItem, team.id);
                    } else {
                        this.startLongPress(ev, teamItem, team.id);
                    }
                });
            }

            this.listContainer!.appendChild(teamItem);
        });

        this.teamContent.appendChild(this.listContainer);

        if (this.teamMode === "manage") {
            const actionsContainer = element("div", {
                className: "team-card__actions",
            });

            const newTeamButton = Button({
                label: "New Team",
                variant: "primary",
                onClick: () => {
                    this.handleCreateTeam();
                },
            });

            const deleteTeamButton = Button({
                label: "Delete Team",
                variant: "danger",
                disabled: this.selectedTeamIds.size === 0,
                onClick: () => {
                    this.handleDeleteTeam();
                },
            });
            deleteTeamButton.setAttribute("data-action", "delete-team");

            actionsContainer.appendChild(newTeamButton);
            actionsContainer.appendChild(deleteTeamButton);
            this.teamContent.appendChild(actionsContainer);
        }
    }

    private handleCreateTeam(): void {
        // Generate a unique team name
        const baseTeamName = "New Team";
        let teamName = baseTeamName;
        let counter = 1;

        const allTeams = MGPetTeam.getAllTeams();
        const existingTeamNames = new Set(allTeams.map((t) => t.name));

        // If "New Team" exists, add (1), (2), etc.
        while (existingTeamNames.has(teamName)) {
            teamName = `${baseTeamName} (${counter})`;
            counter++;
        }

        try {
            const success = MGPetTeam.createTeam(teamName, []);
            if (success) {
                this.render();
            }
        } catch (err) {
            // Error handled silently
        }
    }

    private handleDeleteTeam(): void {
        if (this.selectedTeamIds.size === 0) {
            return;
        }

        const teamIdsToDelete = Array.from(this.selectedTeamIds);

        for (const teamId of teamIdsToDelete) {
            MGPetTeam.deleteTeam(teamId);
        }

        this.render();
    }

    private handleRenameTeam(teamId: string, newName: string): void {
        MGPetTeam.renameTeam(teamId, newName);
    }

    private handleRemovePet(teamId: string, slotIndex: number): void {
        const team = MGPetTeam.getTeam(teamId);
        if (!team) {
            return;
        }

        const petIdAtSlot = team.petIds[slotIndex];

        // If slot is empty, show pet selection; if filled, remove pet
        if (!petIdAtSlot || petIdAtSlot === "") {
            this.handleAddPet(teamId, slotIndex);
        } else {
            this.handleRemovePetFromSlot(teamId, slotIndex);
        }
    }

    private handleRemovePetFromSlot(teamId: string, slotIndex: number): void {
        const team = MGPetTeam.getTeam(teamId);
        if (!team) {
            return;
        }

        const newPetIds = [...team.petIds];
        newPetIds[slotIndex] = "";
        MGPetTeam.updateTeam(teamId, { petIds: newPetIds as any });
        this.render();
    }

    private async handleAddPet(teamId: string, slotIndex: number): Promise<void> {
        const team = MGPetTeam.getTeam(teamId);
        if (!team) {
            return;
        }

        const myPets = Globals.myPets.get();

        // Transform pets to match the expected schema
        const allPets = myPets.all.map((pet) => ({
            id: pet.id,
            itemType: "Pet" as const,
            petSpecies: pet.petSpecies,
            name: pet.name ?? null,
            xp: pet.xp,
            hunger: pet.hunger,
            mutations: pet.mutations || [],
            targetScale: pet.targetScale,
            abilities: pet.abilities || [],
        }));

        // Filter out pets already in this team
        const alreadyInTeam = new Set(team.petIds.filter((id) => id !== ""));
        const availablePets = allPets.filter((pet) => !alreadyInTeam.has(pet.id));

        // Clear the selected item first
        await Store.set("myPossiblyNoLongerValidSelectedItemIndexAtom", null);

        // Close HUD on small screens (mobile or narrow viewport) when opening inventory modal
        const env = MGEnvironment.detect();
        const isSmallScreen = env.platform === "mobile" || env.viewportWidth < 768;
        console.log('[TeamCard] Environment detection:', {
            platform: env.platform,
            viewportWidth: env.viewportWidth,
            isSmallScreen,
            hasSetHUDOpen: !!this.options.setHUDOpen
        });
        if (isSmallScreen && this.options.setHUDOpen) {
            console.log('[TeamCard] Closing HUD for small screen');
            this.options.setHUDOpen(false);
        }

        // Subscribe to selection changes
        const unsubscribeSelection = Globals.myInventory.subscribeSelection((event) => {
            // Check if a pet was selected (not null)
            if (event.current && event.current.item) {
                const selectedPet = event.current.item as any;

                // Add pet to team at the specified slot
                const newPetIds = [...team.petIds];
                newPetIds[slotIndex] = selectedPet.id;
                MGPetTeam.updateTeam(teamId, { petIds: newPetIds as any });

                // Clear the selection
                Store.set("myPossiblyNoLongerValidSelectedItemIndexAtom", null);

                // Close the modal and re-render the team card
                MGCustomModal.close().then(() => {
                    // Reopen HUD on small screens after selection
                    const currentEnv = MGEnvironment.detect();
                    const shouldReopenHUD = currentEnv.platform === "mobile" || currentEnv.viewportWidth < 768;
                    console.log('[TeamCard] After selection - reopening HUD:', {
                        platform: currentEnv.platform,
                        viewportWidth: currentEnv.viewportWidth,
                        shouldReopenHUD,
                        hasSetHUDOpen: !!this.options.setHUDOpen
                    });
                    if (shouldReopenHUD && this.options.setHUDOpen) {
                        console.log('[TeamCard] Reopening HUD after selection');
                        this.options.setHUDOpen(true);
                    }
                    this.render();
                });
            }
        });

        // Show inventory modal with available pets
        await MGCustomModal.show("inventory", {
            items: availablePets as any,
            favoritedItemIds: [],
        });

        // Wait for modal to close
        await MGCustomModal.waitForClose();

        // Reopen HUD on small screens if modal was closed without selection
        const finalEnv = MGEnvironment.detect();
        const shouldReopenHUD = finalEnv.platform === "mobile" || finalEnv.viewportWidth < 768;
        console.log('[TeamCard] Modal closed without selection - reopening HUD:', {
            platform: finalEnv.platform,
            viewportWidth: finalEnv.viewportWidth,
            shouldReopenHUD,
            hasSetHUDOpen: !!this.options.setHUDOpen
        });
        if (shouldReopenHUD && this.options.setHUDOpen) {
            console.log('[TeamCard] Reopening HUD after modal close');
            this.options.setHUDOpen(true);
        }

        // Cleanup
        unsubscribeSelection();
    }

    private createCheckboxIndicator(teamId: string): CheckboxHandle {
        const checkboxHandle = Checkbox({
            checked: this.selectedTeamIds.has(teamId),
            size: "md",
            onChange: (checked) => {
                if (checked) {
                    this.selectedTeamIds.add(teamId);
                } else {
                    this.selectedTeamIds.delete(teamId);
                }
                this.updateDeleteButtonState();
            },
        });

        this.teamCheckboxes.set(teamId, checkboxHandle);

        return checkboxHandle;
    }

    private updateDeleteButtonState(): void {
        // Find and update the delete button in the DOM
        const deleteButton = this.teamContent?.querySelector('[data-action="delete-team"]') as HTMLButtonElement | null;
        if (deleteButton) {
            deleteButton.disabled = this.selectedTeamIds.size === 0;
        }
    }

    private cleanupDrag(): void {
        if (this.dragState) {
            window.removeEventListener("pointermove", this.onPointerMove);
            window.removeEventListener("pointerup", this.onPointerUp);
            window.removeEventListener("pointercancel", this.onPointerCancel);
            this.dragState = null;
        }
    }

    private cleanupLongPress(): void {
        if (this.longPressState) {
            window.clearTimeout(this.longPressState.timeout);
            window.removeEventListener("pointermove", this.onLongPressPointerMove);
            window.removeEventListener("pointerup", this.onLongPressPointerUp);
            this.longPressState = null;
        }
    }

    private startLongPress(ev: PointerEvent, itemEl: HTMLElement, teamId: string): void {
        this.cleanupLongPress();

        const teams = MGPetTeam.getAllTeams();
        const fromIndex = teams.findIndex((t) => t.id === teamId);
        if (fromIndex === -1) return;

        const startX = ev.clientX;
        const startY = ev.clientY;

        const timeout = window.setTimeout(() => {
            if (!this.longPressState) return;
            this.startDrag(ev, itemEl, teamId);
        }, 500);

        this.longPressState = {
            pointerId: ev.pointerId,
            startX,
            startY,
            timeout,
            target: itemEl,
        };

        window.addEventListener("pointermove", this.onLongPressPointerMove, { passive: false });
        window.addEventListener("pointerup", this.onLongPressPointerUp, { passive: false });
    }

    private handleLongPressPointerMove(ev: PointerEvent): void {
        if (!this.longPressState || ev.pointerId !== this.longPressState.pointerId) return;

        const deltaX = Math.abs(ev.clientX - this.longPressState.startX);
        const deltaY = Math.abs(ev.clientY - this.longPressState.startY);
        const threshold = 10;

        if (deltaX > threshold || deltaY > threshold) {
            this.cleanupLongPress();
        }
    }

    private handleLongPressPointerUp(ev: PointerEvent): void {
        if (!this.longPressState || ev.pointerId !== this.longPressState.pointerId) return;
        this.cleanupLongPress();
    }

    private handlePointerMove(ev: PointerEvent): void {
        if (!this.dragState || !this.listContainer || ev.pointerId !== this.dragState.pointerId) return;
        ev.preventDefault();

        const trackRect = this.listContainer.getBoundingClientRect();
        let top = ev.clientY - trackRect.top - this.dragState.offsetY;
        const limit = trackRect.height - this.dragState.itemEl.offsetHeight;

        if (Number.isFinite(limit)) {
            top = Math.max(-8, Math.min(limit + 8, top));
        }

        this.dragState.itemEl.style.top = `${top}px`;
        this.updatePlaceholderPosition(ev.clientY);
    }

    private handlePointerUp(ev: PointerEvent): void {
        if (!this.dragState || ev.pointerId !== this.dragState.pointerId) return;
        ev.preventDefault();
        this.finishDrag();
    }

    private handlePointerCancel(ev: PointerEvent): void {
        if (!this.dragState || ev.pointerId !== this.dragState.pointerId) return;
        this.finishDrag({ revert: true });
    }

    private updatePlaceholderPosition(clientY: number): void {
        if (!this.dragState || !this.listContainer) return;

        const { placeholder, itemEl } = this.dragState;
        const siblings = Array.from(this.listContainer.children).filter(
            (node): node is HTMLElement =>
                node !== itemEl &&
                node !== placeholder &&
                node instanceof HTMLElement &&
                node.classList.contains("team-list-item")
        );

        const positionsBefore = new Map<HTMLElement, number>();
        siblings.forEach((el) => {
            positionsBefore.set(el, el.getBoundingClientRect().top);
        });

        let inserted = false;
        for (const sibling of siblings) {
            const rect = sibling.getBoundingClientRect();
            const mid = rect.top + rect.height / 2;

            if (clientY < mid) {
                if (placeholder.nextSibling !== sibling) {
                    this.listContainer.insertBefore(placeholder, sibling);
                }
                inserted = true;
                break;
            }
        }

        if (!inserted) {
            this.listContainer.appendChild(placeholder);
        }

        siblings.forEach((el) => {
            const beforeTop = positionsBefore.get(el);
            const afterTop = el.getBoundingClientRect().top;

            if (beforeTop !== undefined && beforeTop !== afterTop) {
                const delta = beforeTop - afterTop;

                el.style.transform = `translateY(${delta}px)`;
                el.style.transition = "none";

                el.offsetHeight;

                el.style.transition = "transform 0.14s ease";
                el.style.transform = "translateY(0)";
            }
        });
    }

    private startDrag(ev: PointerEvent, itemEl: HTMLElement, teamId: string): void {
        if (this.dragState || !this.listContainer) return;
        ev.preventDefault();

        const teams = MGPetTeam.getAllTeams();
        const fromIndex = teams.findIndex((t) => t.id === teamId);
        if (fromIndex === -1) return;

        const rect = itemEl.getBoundingClientRect();
        const trackRect = this.listContainer.getBoundingClientRect();

        const placeholder = itemEl.cloneNode(true) as HTMLElement;
        placeholder.classList.add("team-list-item--placeholder");
        placeholder.classList.remove("team-list-item--dragging");

        const touchActionPrev = itemEl.style.touchAction;
        itemEl.style.touchAction = "none";
        const releaseScrollLock = acquireScrollLock(itemEl);

        this.dragState = {
            itemEl,
            pointerId: ev.pointerId,
            placeholder,
            offsetY: ev.clientY - rect.top,
            fromIndex,
            teamId,
            captureTarget: itemEl,
            touchActionPrev,
            releaseScrollLock,
        };

        itemEl.classList.add("team-list-item--dragging");
        itemEl.style.width = `${rect.width}px`;
        itemEl.style.height = `${rect.height}px`;
        itemEl.style.left = `${rect.left - trackRect.left}px`;
        itemEl.style.top = `${rect.top - trackRect.top}px`;
        itemEl.style.position = "absolute";
        itemEl.style.zIndex = "30";
        itemEl.style.pointerEvents = "none";

        if (!this.listContainer.style.position) {
            this.listContainer.style.position = "relative";
        }

        this.listContainer.insertBefore(placeholder, itemEl.nextSibling);
        this.listContainer.classList.add("is-reordering");

        if (itemEl.setPointerCapture) {
            try { itemEl.setPointerCapture(ev.pointerId); } catch { /* noop */ }
        }

        window.addEventListener("pointermove", this.onPointerMove, { passive: false });
        window.addEventListener("pointerup", this.onPointerUp, { passive: false });
        window.addEventListener("pointercancel", this.onPointerCancel, { passive: false });
    }

    private finishDrag(opts: { revert?: boolean } = {}): void {
        if (!this.dragState || !this.listContainer) return;

        const { revert = false } = opts;
        const { itemEl, placeholder, fromIndex, teamId, touchActionPrev, releaseScrollLock, pointerId } = this.dragState;

        this.listContainer.classList.remove("is-reordering");

        if (itemEl.hasPointerCapture(pointerId)) {
            try { itemEl.releasePointerCapture(pointerId); } catch { /* noop */ }
        }

        window.removeEventListener("pointermove", this.onPointerMove);
        window.removeEventListener("pointerup", this.onPointerUp);
        window.removeEventListener("pointercancel", this.onPointerCancel);

        if (!revert) {
            const siblings = Array.from(this.listContainer.children).filter(
                (node) => node !== itemEl
            );
            const targetIndex = siblings.indexOf(placeholder);

            if (targetIndex !== -1) {
                const beforeNode = siblings[targetIndex];
                if (beforeNode !== placeholder) {
                    this.listContainer.insertBefore(placeholder, beforeNode);
                }
            }
        } else {
            const siblings = Array.from(this.listContainer.children).filter(
                (node): node is HTMLElement =>
                    node !== itemEl &&
                    node !== placeholder &&
                    node instanceof HTMLElement &&
                    node.classList.contains("team-list-item")
            );
            const ref = siblings[fromIndex] || null;
            if (ref) this.listContainer.insertBefore(placeholder, ref);
            else this.listContainer.appendChild(placeholder);
        }

        placeholder.replaceWith(itemEl);
        placeholder.remove();

        itemEl.classList.remove("team-list-item--dragging");
        itemEl.style.width = "";
        itemEl.style.height = "";
        itemEl.style.left = "";
        itemEl.style.top = "";
        itemEl.style.position = "";
        itemEl.style.zIndex = "";
        itemEl.style.pointerEvents = "";
        itemEl.style.touchAction = touchActionPrev ?? "";

        const allSiblings = Array.from(this.listContainer.children).filter(
            (node): node is HTMLElement =>
                node instanceof HTMLElement &&
                node.classList.contains("team-list-item")
        );
        allSiblings.forEach((el) => {
            el.style.transform = "";
            el.style.transition = "";
        });

        releaseScrollLock?.();

        if (!revert) {
            const siblings = Array.from(this.listContainer.children).filter(
                (node): node is HTMLElement =>
                    node instanceof HTMLElement &&
                    node.classList.contains("team-list-item")
            );
            const newIndex = siblings.indexOf(itemEl);

            if (newIndex !== -1 && newIndex !== fromIndex) {
                const teams = MGPetTeam.getAllTeams();
                const updated = teams.slice();
                const [moved] = updated.splice(fromIndex, 1);
                updated.splice(newIndex, 0, moved);

                const teamIds = updated.map((team) => team.id);
                MGPetTeam.reorderTeams(teamIds);
                this.options.onTeamReordered?.(teamIds);
            }
        }

        this.dragState = null;
    }
}
