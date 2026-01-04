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
}

export class TeamCardPart {
    private card: HTMLDivElement | null = null;
    private modeControl: SegmentedControlHandle | null = null;
    private modeContainer: HTMLDivElement | null = null;
    private teamContent: HTMLDivElement | null = null;
    private listContainer: HTMLElement | null = null;
    private dragState: DragState | null = null;
    private teamMode: "overview" | "manage" = "overview";
    private selectedTeamIds: Set<string> = new Set();
    private teamCheckboxes: Map<string, CheckboxHandle> = new Map();
    private onPointerMove: (ev: PointerEvent) => void;
    private onPointerUp: (ev: PointerEvent) => void;
    private onPointerCancel: (ev: PointerEvent) => void;
    private options: TeamCardPartOptions;

    constructor(options: TeamCardPartOptions = {}) {
        this.options = options;
        this.onPointerMove = this.handlePointerMove.bind(this);
        this.onPointerUp = this.handlePointerUp.bind(this);
        this.onPointerCancel = this.handlePointerCancel.bind(this);
    }

    build(): HTMLDivElement {
        if (this.card) return this.card;
        return this.createTeamCard();
    }

    destroy(): void {
        this.cleanupDrag();
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
            style: {
                display: "flex",
                flexDirection: "column",
                gap: "12px",
            },
        });

        this.modeContainer = element("div", {
            style: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
            },
        });
        cardWrapper.appendChild(this.modeContainer);

        this.teamContent = element("div", {
            style: {
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                width: "100%",
            },
        });
        cardWrapper.appendChild(this.teamContent);

        const card = Card({
            title: "Team",
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
            style: {
                textAlign: "center",
            },
        });

        const message = element("div", {
            textContent: "Pet Team feature is disabled",
            style: {
                color: "var(--muted)",
                fontSize: "14px",
                marginBottom: "12px",
            },
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
                style: {
                    color: "var(--muted)",
                    textAlign: "center",
                    fontSize: "14px",
                },
            });
            this.teamContent.appendChild(emptyState);
            return;
        }

        this.listContainer = element("div", {
            style: {
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                position: "relative",
                width: "100%",
            },
        });

        teams.forEach((team: PetTeam) => {
            const isActive = activeTeamId === team.id;
            const teamItem = TeamListItem({
                team,
                isActive,
            });

            if (this.teamMode === "overview") {
                teamItem.addEventListener("pointerdown", (ev: PointerEvent) => {
                    if (ev.button !== 0) return;
                    this.startDrag(ev, teamItem, team.id);
                });
                this.listContainer!.appendChild(teamItem);
            } else {
                teamItem.style.cursor = "default";
                const wrapper = this.createTeamItemWrapper(teamItem, team.id);
                this.listContainer!.appendChild(wrapper);
            }
        });

        this.teamContent.appendChild(this.listContainer);

        if (this.teamMode === "manage") {
            const actionsContainer = element("div", {
                style: {
                    display: "flex",
                    gap: "12px",
                    justifyContent: "center",
                    width: "100%",
                },
            });

            const newTeamButton = Button({
                label: "New Team",
                variant: "primary",
                onClick: () => {
                    console.log('[TeamCardPart] New team clicked');
                    // TODO: Implement create team logic
                },
            });

            const deleteTeamButton = Button({
                label: "Delete Team",
                variant: "danger",
                onClick: () => {
                    console.log('[TeamCardPart] Delete team clicked');
                    // TODO: Implement delete team logic
                },
            });

            actionsContainer.appendChild(newTeamButton);
            actionsContainer.appendChild(deleteTeamButton);
            this.teamContent.appendChild(actionsContainer);
        }
    }

    private createTeamItemWrapper(teamItem: HTMLDivElement, teamId: string): HTMLDivElement {
        const checkboxHandle = Checkbox({
            checked: this.selectedTeamIds.has(teamId),
            size: "md",
            onChange: (checked) => {
                if (checked) {
                    this.selectedTeamIds.add(teamId);
                } else {
                    this.selectedTeamIds.delete(teamId);
                }
                console.log('[TeamCardPart] Selection changed:', Array.from(this.selectedTeamIds));
            },
        });

        this.teamCheckboxes.set(teamId, checkboxHandle);

        const wrapper = element("div", {
            style: {
                display: "flex",
                alignItems: "center",
                gap: "8px",
                width: "100%",
            },
        });

        wrapper.appendChild(checkboxHandle.root);
        wrapper.appendChild(teamItem);

        return wrapper;
    }

    private cleanupDrag(): void {
        if (this.dragState) {
            window.removeEventListener("pointermove", this.onPointerMove);
            window.removeEventListener("pointerup", this.onPointerUp);
            window.removeEventListener("pointercancel", this.onPointerCancel);
            this.dragState = null;
        }
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
                const success = MGPetTeam.reorderTeams(teamIds);

                if (success) {
                    console.log('[TeamCardPart] Teams reordered successfully');
                    this.options.onTeamReordered?.(teamIds);
                } else {
                    console.warn('[TeamCardPart] Failed to reorder teams');
                }
            }
        }

        this.dragState = null;
    }
}
