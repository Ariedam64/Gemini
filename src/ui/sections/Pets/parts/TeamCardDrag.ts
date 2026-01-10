/**
 * Team Card Drag Handler
 * 
 * Manages drag-and-drop reordering of pet teams.
 * Uses long-press on touch devices, drag handle on desktop.
 * 
 * Per .claude/rules/ui/sections.md:
 * - Parts handle focused sub-features
 * - One part = one file
 */

import { MGPetTeam } from "../../../../features/petTeam";
import { acquireScrollLock, type ScrollLockRelease } from "../../../utils/scrollLock";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type DragState = {
    itemEl: HTMLElement;
    pointerId: number;
    placeholder: HTMLElement;
    offsetY: number;
    fromIndex: number;
    teamId: string;
    captureTarget: HTMLElement;
    touchActionPrev: string;
    releaseScrollLock?: ScrollLockRelease;
};

type LongPressState = {
    pointerId: number;
    startX: number;
    startY: number;
    timeout: number;
    target: HTMLElement;
};

export interface DragHandlerOptions {
    getListContainer: () => HTMLElement | null;
    onReorder: (teamIds: string[]) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Drag Handler
// ─────────────────────────────────────────────────────────────────────────────

export class TeamCardDragHandler {
    private dragState: DragState | null = null;
    private longPressState: LongPressState | null = null;
    private options: DragHandlerOptions;

    // Bound handlers for event cleanup
    private onPointerMove: (ev: PointerEvent) => void;
    private onPointerUp: (ev: PointerEvent) => void;
    private onPointerCancel: (ev: PointerEvent) => void;
    private onLongPressPointerMove: (ev: PointerEvent) => void;
    private onLongPressPointerUp: (ev: PointerEvent) => void;

    constructor(options: DragHandlerOptions) {
        this.options = options;

        // Bind handlers
        this.onPointerMove = this.handlePointerMove.bind(this);
        this.onPointerUp = this.handlePointerUp.bind(this);
        this.onPointerCancel = this.handlePointerCancel.bind(this);
        this.onLongPressPointerMove = this.handleLongPressPointerMove.bind(this);
        this.onLongPressPointerUp = this.handleLongPressPointerUp.bind(this);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Public API
    // ─────────────────────────────────────────────────────────────────────────

    startLongPress(ev: PointerEvent, itemEl: HTMLElement, teamId: string): void {
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

    startDrag(ev: PointerEvent, itemEl: HTMLElement, teamId: string): void {
        const listContainer = this.options.getListContainer();
        if (this.dragState || !listContainer) return;
        ev.preventDefault();

        const teams = MGPetTeam.getAllTeams();
        const fromIndex = teams.findIndex((t) => t.id === teamId);
        if (fromIndex === -1) return;

        const rect = itemEl.getBoundingClientRect();
        const trackRect = listContainer.getBoundingClientRect();

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

        if (!listContainer.style.position) {
            listContainer.style.position = "relative";
        }

        listContainer.insertBefore(placeholder, itemEl.nextSibling);
        listContainer.classList.add("is-reordering");

        if (itemEl.setPointerCapture) {
            try { itemEl.setPointerCapture(ev.pointerId); } catch { /* noop */ }
        }

        window.addEventListener("pointermove", this.onPointerMove, { passive: false });
        window.addEventListener("pointerup", this.onPointerUp, { passive: false });
        window.addEventListener("pointercancel", this.onPointerCancel, { passive: false });
    }

    cleanup(): void {
        this.cleanupDrag();
        this.cleanupLongPress();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Private - Event Handlers
    // ─────────────────────────────────────────────────────────────────────────

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
        const listContainer = this.options.getListContainer();
        if (!this.dragState || !listContainer || ev.pointerId !== this.dragState.pointerId) return;
        ev.preventDefault();

        const trackRect = listContainer.getBoundingClientRect();
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

    // ─────────────────────────────────────────────────────────────────────────
    // Private - Drag Logic
    // ─────────────────────────────────────────────────────────────────────────

    private updatePlaceholderPosition(clientY: number): void {
        const listContainer = this.options.getListContainer();
        if (!this.dragState || !listContainer) return;

        const { placeholder, itemEl } = this.dragState;
        const siblings = Array.from(listContainer.children).filter(
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
                    listContainer.insertBefore(placeholder, sibling);
                }
                inserted = true;
                break;
            }
        }

        if (!inserted) {
            listContainer.appendChild(placeholder);
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

    private finishDrag(opts: { revert?: boolean } = {}): void {
        const listContainer = this.options.getListContainer();
        if (!this.dragState || !listContainer) return;

        const { revert = false } = opts;
        const { itemEl, placeholder, fromIndex, touchActionPrev, releaseScrollLock, pointerId } = this.dragState;

        listContainer.classList.remove("is-reordering");

        if (itemEl.hasPointerCapture(pointerId)) {
            try { itemEl.releasePointerCapture(pointerId); } catch { /* noop */ }
        }

        window.removeEventListener("pointermove", this.onPointerMove);
        window.removeEventListener("pointerup", this.onPointerUp);
        window.removeEventListener("pointercancel", this.onPointerCancel);

        if (!revert) {
            const siblings = Array.from(listContainer.children).filter(
                (node) => node !== itemEl
            );
            const targetIndex = siblings.indexOf(placeholder);

            if (targetIndex !== -1) {
                const beforeNode = siblings[targetIndex];
                if (beforeNode !== placeholder) {
                    listContainer.insertBefore(placeholder, beforeNode);
                }
            }
        } else {
            const siblings = Array.from(listContainer.children).filter(
                (node): node is HTMLElement =>
                    node !== itemEl &&
                    node !== placeholder &&
                    node instanceof HTMLElement &&
                    node.classList.contains("team-list-item")
            );
            const ref = siblings[fromIndex] || null;
            if (ref) listContainer.insertBefore(placeholder, ref);
            else listContainer.appendChild(placeholder);
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

        const allSiblings = Array.from(listContainer.children).filter(
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
            const siblings = Array.from(listContainer.children).filter(
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
                this.options.onReorder(teamIds);
            }
        }

        this.dragState = null;
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
}
