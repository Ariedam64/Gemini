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
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "2");
    svg.setAttribute("stroke-linecap", "round");
    svg.style.color = "var(--accent)";

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
    let lastSavedName = currentName;

    // Create input component with onChange callback
    const inputHandle = Input({
        value: currentName,
        placeholder: "Team name",
        mode: "alphanumeric",
        allowSpaces: true,
        maxLength: 50,
        blockGameKeys: true,
        onChange: (value) => {
            // Update on every keystroke (add or delete)
            const trimmedValue = value.trim();
            if (trimmedValue && trimmedValue !== lastSavedName) {
                lastSavedName = trimmedValue;
                onNameChange?.(trimmedValue);
            }
        },
        onEnter: (value) => {
            const finalName = value.trim() || originalName;
            if (finalName !== lastSavedName) {
                lastSavedName = finalName;
                onNameChange?.(finalName);
            }
        },
    });

    // Style the input wrapper to fit in the team-list-item layout
    inputHandle.root.className = "team-list-item__name-input";

    // Handle blur (save changes)
    inputHandle.input.addEventListener("blur", () => {
        const finalName = inputHandle.getValue().trim() || originalName;
        if (finalName !== lastSavedName) {
            lastSavedName = finalName;
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
    showSlotStyles?: boolean;
    onSlotClick?: (slotIndex: number) => void;
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

    // Pet sprites container
    const spritesContainer = element("div", {
        className: "team-list-item__sprites",
    });

    // Function to re-render all pet sprites when myPets changes
    function renderSprites(): void {
        const myPets = Globals.myPets.get();
        spritesContainer.innerHTML = "";

        // Render pet sprites or empty slots
        for (let i = 0; i < 3; i++) {
            const petId = props.team.petIds[i];
            const hasPet = petId && petId !== "";
            const spriteSlot = element("div", {
                className: `team-list-item__sprite-slot ${
                    props.showSlotStyles && !hasPet
                        ? "team-list-item__sprite-slot--empty"
                        : ""
                }`,
            });

            // Add click handler for filled slots to remove pet, empty slots to add pet
            if (props.onSlotClick) {
                spriteSlot.style.cursor = "pointer";
                spriteSlot.addEventListener("click", () => {
                    props.onSlotClick!(i);
                });
            }

            if (hasPet) {
                // Find pet in myPets first, then fall back to global cache
                let pet = myPets.all.find((p) => p.id === petId);

                // If not in myPets, try to get from global cache
                if (!pet) {
                    const globalCache = (window as any).__petDataCache;
                    if (globalCache && globalCache.has(petId)) {
                        pet = globalCache.get(petId);
                    }
                }

                if (pet) {
                    try {
                        // Render pet sprite using MGSprite
                        const cachedCanvas = MGSprite.toCanvas("pet", pet.petSpecies, {
                            mutations: pet.mutations as any,
                            scale: 1,
                        });

                        // Clone the canvas since MGSprite returns cached instances
                        // We need separate instances for each DOM location
                        const canvas = document.createElement("canvas");
                        canvas.width = cachedCanvas.width;
                        canvas.height = cachedCanvas.height;
                        const ctx = canvas.getContext("2d");
                        if (ctx) {
                            ctx.drawImage(cachedCanvas, 0, 0);
                        }

                        // Style canvas to fit slot
                        canvas.style.width = "100%";
                        canvas.style.height = "100%";
                        canvas.style.objectFit = "contain";

                        spriteSlot.appendChild(canvas);

                        // Add remove overlay in manage mode
                        if (props.showSlotStyles) {
                            const removeOverlay = element("div", {
                                className: "team-list-item__sprite-slot-overlay",
                            });
                            spriteSlot.appendChild(removeOverlay);
                            spriteSlot.classList.add("team-list-item__sprite-slot--filled");
                        }
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
                    // Pet not found, show loading placeholder and wait for myPets to update
                    const placeholder = element("div", {
                        textContent: "⏳",
                        className: "team-list-item__sprite-placeholder",
                    });
                    spriteSlot.appendChild(placeholder);

                    // Log for debugging
                    console.warn(`[TeamListItem] Pet ${petId} not found in myPets yet, waiting for update`);

                    // Subscribe to myPets changes to update this specific slot when pet data arrives
                    let slotUpdateDone = false;
                    const unsubscribeSlotUpdate = Globals.myPets.subscribe(() => {
                        if (slotUpdateDone) return;

                        const updatedMyPets = Globals.myPets.get();
                        const foundPet = updatedMyPets.all.find((p) => p.id === petId);

                        if (foundPet) {
                            slotUpdateDone = true;
                            unsubscribeSlotUpdate();

                            try {
                                // Clear placeholder
                                spriteSlot.innerHTML = "";

                                // Render pet sprite
                                const cachedCanvas = MGSprite.toCanvas("pet", foundPet.petSpecies, {
                                    mutations: foundPet.mutations as any,
                                    scale: 1,
                                });

                                const canvas = document.createElement("canvas");
                                canvas.width = cachedCanvas.width;
                                canvas.height = cachedCanvas.height;
                                const ctx = canvas.getContext("2d");
                                if (ctx) {
                                    ctx.drawImage(cachedCanvas, 0, 0);
                                }

                                // Style canvas to fit slot
                                canvas.style.width = "100%";
                                canvas.style.height = "100%";
                                canvas.style.objectFit = "contain";

                                spriteSlot.appendChild(canvas);

                                // Add remove overlay in manage mode
                                if (props.showSlotStyles) {
                                    const removeOverlay = element("div", {
                                        className: "team-list-item__sprite-slot-overlay",
                                    });
                                    spriteSlot.appendChild(removeOverlay);
                                    spriteSlot.classList.add("team-list-item__sprite-slot--filled");
                                }

                                console.log(`[TeamListItem] Pet ${petId} sprite updated`);
                            } catch (err) {
                                console.warn(`[TeamListItem] Failed to render sprite for pet ${foundPet.petSpecies}:`, err);
                                spriteSlot.innerHTML = "<div class='team-list-item__sprite-placeholder'>🐾</div>";
                            }
                        }
                    }, { immediate: false });
                }
            } else if (props.showSlotStyles && !hasPet) {
                // Empty slot with styles enabled - add SVG plus icon
                const plusIcon = createPlusIconSvg();
                spriteSlot.appendChild(plusIcon);
            }

            spritesContainer.appendChild(spriteSlot);
        }
    }

    // Initial render
    renderSprites();

    // Subscribe to myPets changes and re-render when they change
    const unsubscribe = Globals.myPets.subscribe(() => {
        renderSprites();
    });

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

    // Cleanup subscription when element is removed from DOM
    const observer = new MutationObserver(() => {
        if (!document.contains(container)) {
            observer.disconnect();
            unsubscribe();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return container;
}
