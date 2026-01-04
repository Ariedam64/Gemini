/**
 * TeamListItem Component
 * Displays a single pet team in a list with drag handle and pet sprites
 */

import { element } from "../../styles/helpers";
import type { PetTeam } from "../../../features/petTeam";
import { MGSprite } from "../../../modules/sprite";
import { Globals } from "../../../globals";
import { Input } from "../Input/Input";

function createPlusIconSvg(): SVGSVGElement {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("width", "24");
    svg.setAttribute("height", "24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "white");
    svg.setAttribute("stroke-width", "2");
    svg.setAttribute("stroke-linecap", "round");

    const horizontal = document.createElementNS("http://www.w3.org/2000/svg", "line");
    horizontal.setAttribute("x1", "12");
    horizontal.setAttribute("y1", "5");
    horizontal.setAttribute("x2", "12");
    horizontal.setAttribute("y2", "19");

    const vertical = document.createElementNS("http://www.w3.org/2000/svg", "line");
    vertical.setAttribute("x1", "5");
    vertical.setAttribute("y1", "12");
    vertical.setAttribute("x2", "19");
    vertical.setAttribute("y2", "12");

    svg.appendChild(horizontal);
    svg.appendChild(vertical);

    return svg;
}

function createNameInput(currentName: string, onNameChange?: (newName: string) => void): HTMLDivElement {
    const originalName = currentName;

    // Create input component
    const inputHandle = Input({
        value: currentName,
        placeholder: "Team name",
        mode: "alphanumeric",
        allowSpaces: true,
        maxLength: 50,
        blockGameKeys: true,
        onEnter: (value) => {
            const finalName = value.trim() || originalName;
            if (finalName !== originalName) {
                onNameChange?.(finalName);
            }
        },
    });

    // Style the input wrapper to fit in the team-list-item layout
    inputHandle.root.className = "team-list-item__name-input";

    // Handle blur (save changes)
    inputHandle.input.addEventListener("blur", () => {
        const finalName = inputHandle.getValue().trim() || originalName;
        if (finalName !== originalName) {
            onNameChange?.(finalName);
        }
    });

    // Handle Escape key (discard changes)
    inputHandle.input.addEventListener("keydown", (ev: KeyboardEvent) => {
        if (ev.key === "Escape") {
            ev.preventDefault();
            inputHandle.input.blur();
        }
    });

    return inputHandle.root;
}

export interface TeamListItemProps {
    team: PetTeam;
    isActive: boolean;
    customIndicator?: HTMLElement;
    hideDragHandle?: boolean;
    isNameEditable?: boolean;
    onNameChange?: (newName: string) => void;
    onSlotClick?: (slotIndex: number) => void;
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

    // Team name - show Input directly in manage mode, otherwise show div
    const nameText = props.isNameEditable
        ? createNameInput(props.team.name, props.onNameChange)
        : element("div", {
            textContent: props.team.name,
            className: `team-list-item__name ${
                props.isActive
                    ? "team-list-item__name--active"
                    : "team-list-item__name--inactive"
            }`,
        });

    // Get all pets data
    const myPets = Globals.myPets.get();

    // Pet sprites container
    const spritesContainer = element("div", {
        className: "team-list-item__sprites",
    });

    // Render pet sprites or empty slots
    for (let i = 0; i < 3; i++) {
        const petId = props.team.petIds[i];
        const hasPet = petId && petId !== "";
        const spriteSlot = element("div", {
            className: `team-list-item__sprite-slot ${
                props.onSlotClick
                    ? hasPet
                        ? "team-list-item__sprite-slot--filled"
                        : "team-list-item__sprite-slot--empty"
                    : ""
            }`,
        });

        // Add click handler for slot editing
        if (props.onSlotClick) {
            spriteSlot.style.cursor = "pointer";
            spriteSlot.addEventListener("click", () => {
                props.onSlotClick!(i);
            });
        }

        if (hasPet) {
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
        } else if (props.onSlotClick) {
            // Empty slot in manage mode - add SVG plus icon
            const plusIcon = createPlusIconSvg();
            spriteSlot.appendChild(plusIcon);
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
