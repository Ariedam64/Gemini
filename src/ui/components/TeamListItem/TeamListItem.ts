/**
 * TeamListItem Component
 * Displays a single pet team in a list with drag handle and pet sprites
 */

import { element } from "../../styles/helpers";
import type { PetTeam } from "../../../features/petTeam";
import { MGSprite } from "../../../modules/sprite";
import { Globals } from "../../../globals";
import { Input } from "../Input/Input";

function enableNameEdit(nameEl: HTMLDivElement, currentName: string, onNameChange?: (newName: string) => void): void {
    const originalName = currentName;
    const parent = nameEl.parentElement;
    if (!parent) return;

    // Create input component
    const inputHandle = Input({
        value: currentName,
        placeholder: "Team name",
        mode: "alphanumeric",
        allowSpaces: true,
        maxLength: 50,
        blockGameKeys: true,
        onEnter: (value) => {
            finishEdit(true, value);
        },
    });

    // Replace div with input
    nameEl.replaceWith(inputHandle.root);

    // Add editing class for styling
    inputHandle.root.classList.add("team-list-item__name--editing");

    // Focus and select all text
    inputHandle.focus();
    inputHandle.input.select();

    function finishEdit(save: boolean, newValue?: string): void {
        const finalName = (newValue || inputHandle.getValue()).trim() || originalName;

        // Determine active/inactive class
        const isActive = nameEl.classList.contains("team-list-item__name--active");
        const statusClass = isActive ? "team-list-item__name--active" : "team-list-item__name--inactive";

        // Replace input back with div
        const newNameEl = element("div", {
            textContent: finalName,
            className: `team-list-item__name ${statusClass} team-list-item__name--editable`,
        });

        inputHandle.root.replaceWith(newNameEl);
        inputHandle.destroy();

        // Re-attach double-click handler
        newNameEl.addEventListener("dblclick", () => {
            enableNameEdit(newNameEl, finalName, onNameChange);
        });

        if (save && finalName !== originalName) {
            onNameChange?.(finalName);
        }
    }

    // Handle blur (unfocus)
    inputHandle.input.addEventListener("blur", () => {
        finishEdit(true);
    });

    // Handle Escape key
    inputHandle.input.addEventListener("keydown", (ev: KeyboardEvent) => {
        if (ev.key === "Escape") {
            ev.preventDefault();
            finishEdit(false);
        }
    });
}

export interface TeamListItemProps {
    team: PetTeam;
    isActive: boolean;
    customIndicator?: HTMLElement;
    hideDragHandle?: boolean;
    isNameEditable?: boolean;
    onNameChange?: (newName: string) => void;
}

export function TeamListItem(props: TeamListItemProps): HTMLDivElement {
    const container = element("div", {
        className: "team-list-item",
    });

    // Active indicator (green dot or gray circle) or custom indicator
    const indicator = props.customIndicator ?? element("div", {
        className: `team-list-item__indicator ${
            props.isActive
                ? "team-list-item__indicator--active"
                : "team-list-item__indicator--inactive"
        }`,
    });

    // Team name
    const nameText = element("div", {
        textContent: props.team.name,
        className: `team-list-item__name ${
            props.isActive
                ? "team-list-item__name--active"
                : "team-list-item__name--inactive"
        } ${props.isNameEditable ? "team-list-item__name--editable" : ""}`,
    });

    // Add double-click handler for editing if name is editable
    if (props.isNameEditable) {
        nameText.addEventListener("dblclick", () => {
            enableNameEdit(nameText, props.team.name, props.onNameChange);
        });
    }

    // Get all pets data
    const myPets = Globals.myPets.get();

    // Pet sprites container
    const spritesContainer = element("div", {
        className: "team-list-item__sprites",
    });

    // Render pet sprites or empty slots
    for (let i = 0; i < 3; i++) {
        const petId = props.team.petIds[i];
        const spriteSlot = element("div", {
            className: "team-list-item__sprite-slot",
        });

        if (petId && petId !== "") {
            // Find pet in myPets
            const pet = myPets.all.find((p) => p.id === petId);

            if (pet) {
                try {
                    // Render pet sprite using MGSprite
                    const canvas = MGSprite.toCanvas("pet", pet.petSpecies, {
                        mutations: pet.mutations as any,
                        scale: 1,
                    });

                    // Style canvas to fit slot
                    canvas.style.width = "100%";
                    canvas.style.height = "100%";
                    canvas.style.objectFit = "contain";

                    spriteSlot.appendChild(canvas);
                } catch (err) {
                    console.warn(`[TeamListItem] Failed to render sprite for pet ${pet.petSpecies}:`, err);
                    // Fallback to placeholder on error
                    const placeholder = element("div", {
                        textContent: "🐾",
                        className: "team-list-item__sprite-placeholder",
                    });
                    spriteSlot.appendChild(placeholder);
                }
            } else {
                // Pet not found, show placeholder
                const placeholder = element("div", {
                    textContent: "?",
                    className: "team-list-item__sprite-placeholder",
                });
                spriteSlot.appendChild(placeholder);
            }
        }

        spritesContainer.appendChild(spriteSlot);
    }

    // Drag handle (hidden if hideDragHandle is true)
    if (!props.hideDragHandle) {
        const dragHandle = element("div", {
            textContent: "⋮⋮",
            className: "team-list-item__drag-handle",
        });
        container.appendChild(dragHandle);
    }

    // Assemble
    container.appendChild(indicator);
    container.appendChild(nameText);
    container.appendChild(spritesContainer);

    return container;
}
