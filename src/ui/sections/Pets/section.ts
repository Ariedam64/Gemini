/**
 * Pets Section
 * Manages pet teams and pet-related features
 */

import { BaseSection } from "../core/Section";
import { Card } from "../../components/Card/Card";
import { Button } from "../../components/Button/Button";
import { TeamListItem } from "../../components/TeamListItem/TeamListItem";
import { element } from "../../styles/helpers";
import { MGPetTeam } from "../../../features/petTeam";
import type { PetTeam } from "../../../features/petTeam";
import { Globals } from "../../../globals";

// Scroll lock utilities
function isScrollable(el: HTMLElement): boolean {
    const style = getComputedStyle(el);
    if (!/(auto|scroll|overlay)/.test(style.overflowY + style.overflowX)) return false;
    const sh = el.scrollHeight;
    const ch = el.clientHeight;
    const sw = el.scrollWidth;
    const cw = el.clientWidth;
    return (sh > ch + 1) || (sw > cw + 1);
}

type ScrollLockRelease = () => void;

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

export class PetsSection extends BaseSection {
    private unsubscribeMyPets?: () => void;
    private lastActiveTeamId: string | null = null;
    private dragState: DragState | null = null;
    private listContainer: HTMLElement | null = null;

    constructor() {
        super({ id: "tab-pets", label: "Pets" });
    }

    protected async build(container: HTMLElement): Promise<void> {
        this.container = container;
        const section = this.createGrid("12px");
        section.id = "pets";
        container.appendChild(section);

        this.renderContent();

        // Subscribe to stable pet changes (composition changes only)
        this.unsubscribeMyPets = Globals.myPets.subscribeStable(() => {
            // Check if active team changed
            const currentActiveTeamId = MGPetTeam.getActiveTeamId();
            if (currentActiveTeamId !== this.lastActiveTeamId) {
                this.lastActiveTeamId = currentActiveTeamId;
                this.renderContent();
            }
        });

        // Store initial active team ID
        this.lastActiveTeamId = MGPetTeam.getActiveTeamId();
    }

    protected async destroy(): Promise<void> {
        // Cleanup subscription
        if (this.unsubscribeMyPets) {
            this.unsubscribeMyPets();
            this.unsubscribeMyPets = undefined;
        }

        // Cleanup drag listeners
        this.cleanupDrag();
    }

    private cleanupDrag(): void {
        if (this.dragState) {
            window.removeEventListener("pointermove", this.onPointerMove);
            window.removeEventListener("pointerup", this.onPointerUp);
            window.removeEventListener("pointercancel", this.onPointerCancel);
            this.dragState = null;
        }
    }

    private onPointerMove = (ev: PointerEvent): void => {
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
    };

    private onPointerUp = (ev: PointerEvent): void => {
        if (!this.dragState || ev.pointerId !== this.dragState.pointerId) return;
        ev.preventDefault();
        this.finishDrag();
    };

    private onPointerCancel = (ev: PointerEvent): void => {
        if (!this.dragState || ev.pointerId !== this.dragState.pointerId) return;
        this.finishDrag({ revert: true });
    };

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

        // Capture positions BEFORE moving placeholder
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

        // Animate siblings to new positions
        siblings.forEach((el) => {
            const beforeTop = positionsBefore.get(el);
            const afterTop = el.getBoundingClientRect().top;

            if (beforeTop !== undefined && beforeTop !== afterTop) {
                const delta = beforeTop - afterTop;

                // Set initial transform (at old position)
                el.style.transform = `translateY(${delta}px)`;
                el.style.transition = "none";

                // Force reflow
                el.offsetHeight;

                // Animate to new position
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

        // Clone the item to create a placeholder with same dimensions
        const placeholder = itemEl.cloneNode(true) as HTMLElement;
        placeholder.classList.add("team-list-item--placeholder");
        placeholder.classList.remove("team-list-item--dragging");

        // Acquire scroll lock and set touch-action
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

        // Capture pointer for better touch handling
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

        // Release pointer capture
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

        // Clean up transforms from all siblings
        const allSiblings = Array.from(this.listContainer.children).filter(
            (node): node is HTMLElement =>
                node instanceof HTMLElement &&
                node.classList.contains("team-list-item")
        );
        allSiblings.forEach((el) => {
            el.style.transform = "";
            el.style.transition = "";
        });

        // Release scroll lock
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
                const success = MGPetTeam.reorderTeams(teamIds);

                if (success) {
                    console.log('[PetsSection] Teams reordered successfully');
                } else {
                    console.warn('[PetsSection] Failed to reorder teams');
                }
            }
        }

        this.dragState = null;
    }

    private renderContent(): void {
        if (!this.container) return;

        const section = this.container.querySelector('#pets');
        if (!section) return;

        console.log('[PetsSection] Rendering content...');
        section.innerHTML = '';

        section.appendChild(this.createTeamCard());
        console.log('[PetsSection] Content rendered');
    }

    private createTeamCard(): HTMLDivElement {
        const card = Card({
            title: "Team",
            expandable: true,
            defaultExpanded: true,
        });

        // Check if feature is enabled
        const isEnabled = MGPetTeam.isEnabled();
        console.log('[PetsSection] Feature enabled:', isEnabled);

        if (!isEnabled) {
            const disabledState = element("div", {
                styles: {
                    textAlign: "center",
                },
            });

            const message = element("div", {
                textContent: "Pet Team feature is disabled",
                styles: {
                    color: "var(--muted)",
                    fontSize: "14px",
                    marginBottom: "12px",
                },
            });

            const enableButton = Button({
                label: "Enable Feature",
                onClick: () => {
                    MGPetTeam.setEnabled(true);
                    this.renderContent();
                },
            });

            disabledState.appendChild(message);
            disabledState.appendChild(enableButton);
            card.appendChild(disabledState);
            return card;
        }

        const teams = MGPetTeam.getAllTeams();
        const activeTeamId = MGPetTeam.getActiveTeamId();

        console.log('[PetsSection] Teams:', teams);
        console.log('[PetsSection] Active team ID:', activeTeamId);

        if (teams.length === 0) {
            const emptyState = element("div", {
                textContent: "No teams yet. Create your first team!",
                styles: {
                    color: "var(--muted)",
                    textAlign: "center",
                    fontSize: "14px",
                },
            });
            card.appendChild(emptyState);
        } else {
            // Team list container
            this.listContainer = element("div", {
                styles: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    position: "relative",
                },
            });

            // Render each team
            teams.forEach((team: PetTeam) => {
                const isActive = activeTeamId === team.id;
                const teamItem = TeamListItem({
                    team,
                    isActive,
                });

                // Add pointer event for drag
                teamItem.addEventListener("pointerdown", (ev: PointerEvent) => {
                    if (ev.button !== 0) return;
                    this.startDrag(ev, teamItem, team.id);
                });

                this.listContainer!.appendChild(teamItem);
            });

            card.appendChild(this.listContainer);
        }

        // Action buttons
        const actionsContainer = element("div", {
            styles: {
                display: "flex",
                gap: "8px",
                marginTop: "16px",
                paddingTop: "16px",
                borderTop: "1px solid var(--border)",
            },
        });

        const createButton = Button({
            label: "+ Create New Team",
            onClick: () => {
                console.log("[PetsSection] Create team clicked (not implemented yet)");
            },
            disabled: true,
        });

        const deleteButton = Button({
            label: "🗑️ Delete",
            onClick: () => {
                console.log("[PetsSection] Delete team clicked (not implemented yet)");
            },
            variant: "danger",
            disabled: true,
        });

        actionsContainer.appendChild(createButton);
        actionsContainer.appendChild(deleteButton);
        card.appendChild(actionsContainer);

        return card;
    }
}
