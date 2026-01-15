/**
 * Team Card Part
 * Manages the Team card UI with overview and manage modes
 * 
 * Orchestrates TeamCardDrag handler
 * Per .claude/rules/ui/sections.md
 */

import { Card } from "../../../../components/Card/Card";
import { TeamListItem } from "../../../../components/TeamListItem/TeamListItem";
import { SegmentedControl, SegmentedControlHandle } from "../../../../components/SegmentedControl/SegmentedControl";
import { Checkbox, CheckboxHandle } from "../../../../components/Checkbox/Checkbox";
import { Button } from "../../../../components/Button/Button";
import { element } from "../../../../styles/helpers";
import { MGPetTeam } from "../../../../../features/petTeam";
import { Globals } from "../../../../../globals";
import { Store } from "../../../../../atoms/store";
import { MGCustomModal, MGEnvironment } from "../../../../../modules";
import type { PetTeam } from "../../../../../features/petTeam";
import { TeamCardDragHandler } from "./TeamCardDrag";

export interface TeamCardPartOptions {
    onTeamReordered?: (teamIds: string[]) => void;
    onTeamsUpdated?: () => void;
    setHUDOpen?: (open: boolean) => void;
}

export class TeamCardPart {
    private card: HTMLDivElement | null = null;
    private modeControl: SegmentedControlHandle | null = null;
    private modeContainer: HTMLDivElement | null = null;
    private teamContent: HTMLDivElement | null = null;
    private listContainer: HTMLElement | null = null;
    private teamMode: "overview" | "manage" = "overview";
    private selectedTeamIds: Set<string> = new Set();
    private teamCheckboxes: Map<string, CheckboxHandle> = new Map();
    private options: TeamCardPartOptions;

    // Extracted handlers
    private dragHandler: TeamCardDragHandler;

    constructor(options: TeamCardPartOptions = {}) {
        this.options = options;

        // Initialize handlers with dependency injection
        this.dragHandler = new TeamCardDragHandler({
            getListContainer: () => this.listContainer,
            onReorder: (teamIds) => {
                this.options.onTeamReordered?.(teamIds);
                this.options.onTeamsUpdated?.();
            },
        });
    }

    build(): HTMLDivElement {
        if (this.card) return this.card;
        return this.createTeamCard();
    }

    destroy(): void {
        this.dragHandler.cleanup();
        if (this.modeControl) {
            this.modeControl.destroy();
            this.modeControl = null;
        }
        this.teamCheckboxes.forEach((checkbox) => checkbox.destroy());
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

    // ─────────────────────────────────────────────────────────────────────────
    // Card Setup
    // ─────────────────────────────────────────────────────────────────────────

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

    // ─────────────────────────────────────────────────────────────────────────
    // Rendering
    // ─────────────────────────────────────────────────────────────────────────

    private renderDisabledState(): void {
        if (!this.teamContent) return;

        this.dragHandler.cleanup();
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

        this.dragHandler.cleanup();
        this.listContainer = null;
        this.teamContent.replaceChildren();
        this.teamCheckboxes.forEach((checkbox) => checkbox.destroy());
        this.teamCheckboxes.clear();
        this.selectedTeamIds.clear();

        const teams = MGPetTeam.getAllTeams();
        const activeTeamId = MGPetTeam.getActiveTeamId();

        if (teams.length === 0) {
            this.renderEmptyState();
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

            if (this.teamMode === "manage") {
                teamItem.classList.add("team-list-item--manage");
            }

            if (this.teamMode === "overview") {
                teamItem.addEventListener("click", async (ev: PointerEvent) => {
                    const dragHandle = (ev.target as HTMLElement).closest(".team-list-item__drag-handle");
                    if (dragHandle) return;

                    teamItem.classList.add("team-list-item--clicked");
                    setTimeout(() => {
                        teamItem.classList.remove("team-list-item--clicked");
                    }, 300);

                    try {
                        await MGPetTeam.activateTeam(team);
                        this.options.onTeamsUpdated?.();
                    } catch (error) {
                        console.error('[TeamCard] Failed to activate team:', error);
                    }
                });

                teamItem.addEventListener("pointerdown", (ev: PointerEvent) => {
                    if (ev.button !== 0) return;
                    const dragHandle = (ev.target as HTMLElement).closest(".team-list-item__drag-handle");
                    if (dragHandle) {
                        this.dragHandler.startDrag(ev, teamItem, team.id);
                    } else {
                        this.dragHandler.startLongPress(ev, teamItem, team.id);
                    }
                });
            }

            this.listContainer!.appendChild(teamItem);
        });

        this.teamContent.appendChild(this.listContainer);

        if (this.teamMode === "manage") {
            this.renderManageActions();
        }
    }

    private renderEmptyState(): void {
        if (!this.teamContent) return;

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
    }

    private renderManageActions(): void {
        if (!this.teamContent) return;

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

    // ─────────────────────────────────────────────────────────────────────────
    // CRUD Handlers
    // ─────────────────────────────────────────────────────────────────────────

    private handleCreateTeam(): void {
        const baseTeamName = "New Team";
        let teamName = baseTeamName;
        let counter = 1;

        const allTeams = MGPetTeam.getAllTeams();
        const existingTeamNames = new Set(allTeams.map((t) => t.name));

        while (existingTeamNames.has(teamName)) {
            teamName = `${baseTeamName} (${counter})`;
            counter++;
        }

        try {
            const success = MGPetTeam.createTeam(teamName, []);
            if (success) {
                this.render();
                this.options.onTeamsUpdated?.();
            }
        } catch (err) {
            // Error handled silently
        }
    }

    private handleDeleteTeam(): void {
        if (this.selectedTeamIds.size === 0) return;

        const teamIdsToDelete = Array.from(this.selectedTeamIds);
        for (const teamId of teamIdsToDelete) {
            MGPetTeam.deleteTeam(teamId);
        }

        this.render();
        this.options.onTeamsUpdated?.();
    }

    private handleRenameTeam(teamId: string, newName: string): void {
        MGPetTeam.renameTeam(teamId, newName);
        this.options.onTeamsUpdated?.();
    }

    private handleRemovePet(teamId: string, slotIndex: number): void {
        const team = MGPetTeam.getTeam(teamId);
        if (!team) return;

        const petIdAtSlot = team.petIds[slotIndex];

        if (!petIdAtSlot || petIdAtSlot === "") {
            this.handleAddPet(teamId, slotIndex);
        } else {
            this.handleRemovePetFromSlot(teamId, slotIndex);
        }
    }

    private handleRemovePetFromSlot(teamId: string, slotIndex: number): void {
        const team = MGPetTeam.getTeam(teamId);
        if (!team) return;

        const newPetIds = [...team.petIds];
        newPetIds[slotIndex] = "";
        MGPetTeam.updateTeam(teamId, { petIds: newPetIds as any });
        this.render();
        this.options.onTeamsUpdated?.();
    }

    private async handleAddPet(teamId: string, slotIndex: number): Promise<void> {
        const team = MGPetTeam.getTeam(teamId);
        if (!team) return;

        const myPets = Globals.myPets.get();

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

        const alreadyInTeam = new Set(team.petIds.filter((id) => id !== ""));
        const availablePets = allPets.filter((pet) => !alreadyInTeam.has(pet.id));

        await Store.set("myPossiblyNoLongerValidSelectedItemIndexAtom", null);

        const env = MGEnvironment.detect();
        const isSmallScreen = env.platform === "mobile" || env.viewportWidth < 768;
        if (isSmallScreen && this.options.setHUDOpen) {
            this.options.setHUDOpen(false);
        }

        const unsubscribeSelection = Globals.myInventory.subscribeSelection((event) => {
            if (event.current && event.current.item) {
                const selectedPet = event.current.item as any;

                const newPetIds = [...team.petIds];
                newPetIds[slotIndex] = selectedPet.id;
                MGPetTeam.updateTeam(teamId, { petIds: newPetIds as any });
                this.options.onTeamsUpdated?.();

                Store.set("myPossiblyNoLongerValidSelectedItemIndexAtom", null);

                MGCustomModal.close().then(() => {
                    const currentEnv = MGEnvironment.detect();
                    const shouldReopenHUD = currentEnv.platform === "mobile" || currentEnv.viewportWidth < 768;
                    if (shouldReopenHUD && this.options.setHUDOpen) {
                        this.options.setHUDOpen(true);
                    }
                    this.render();
                    this.options.onTeamsUpdated?.();
                });
            }
        });

        await MGCustomModal.show("inventory", {
            items: availablePets as any,
            favoritedItemIds: [],
        });

        await MGCustomModal.waitForClose();

        const finalEnv = MGEnvironment.detect();
        const shouldReopenHUD = finalEnv.platform === "mobile" || finalEnv.viewportWidth < 768;
        if (shouldReopenHUD && this.options.setHUDOpen) {
            this.options.setHUDOpen(true);
        }

        unsubscribeSelection();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Checkbox Management
    // ─────────────────────────────────────────────────────────────────────────

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
        const deleteButton = this.teamContent?.querySelector('[data-action="delete-team"]') as HTMLButtonElement | null;
        if (deleteButton) {
            deleteButton.disabled = this.selectedTeamIds.size === 0;
        }
    }
}
