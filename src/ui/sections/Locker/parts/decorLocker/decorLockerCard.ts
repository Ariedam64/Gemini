/**
 * DecorLockerCard Part
 * Simple toggle to block/unblock all decors
 */

import { Card } from "../../../../components/Card/Card";
import { element } from "../../../../styles/helpers";
import { Switch } from "../../../../components/Switch/Switch";
import { MGDecorLocker } from "../../../../../features/decorLocker";
import { EVENTS } from "../../../../../utils/storage";

/* ─────────────────────────── Types ─────────────────────────── */

export interface DecorLockerCardOptions {
    defaultExpanded?: boolean;
    onExpandChange?: (expanded: boolean) => void;
}

export interface DecorLockerCardHandle {
    root: HTMLDivElement;
    render(): void;
    destroy(): void;
}

/* ─────────────────────────── Factory ─────────────────────────── */

export function createDecorLockerCard(options: DecorLockerCardOptions = {}): DecorLockerCardHandle {
    let content: HTMLDivElement | null = null;
    let card: HTMLDivElement | null = null;
    let switchHandle: ReturnType<typeof Switch> | null = null;
    let labelElement: HTMLDivElement | null = null;
    const cleanups: (() => void)[] = [];

    card = buildCard();

    /* ───────────────────── Build ───────────────────── */

    function buildCard(): HTMLDivElement {
        content = element("div", {
            className: "decor-locker-card__wrapper",
            style: "display: flex; flex-direction: column; gap: 16px;",
        }) as HTMLDivElement;

        renderContent();

        const cardEl = Card(
            {
                title: "Decor Pickup",
                subtitle: "Prevent decor pickups",
                expandable: true,
                defaultExpanded: options.defaultExpanded ?? true,
                onExpandChange: options.onExpandChange,
            },
            content
        );

        // Listen for updates
        const onUpdate = () => render();
        window.addEventListener(EVENTS.DECOR_LOCKER_LOCKS_UPDATED, onUpdate);
        cleanups.push(() => window.removeEventListener(EVENTS.DECOR_LOCKER_LOCKS_UPDATED, onUpdate));

        return cardEl;
    }

    /* ───────────────────── Render ───────────────────── */

    function renderContent(): void {
        if (!content) return;

        const availableCount = MGDecorLocker.getAvailableDecors().length;
        const blockedCount = MGDecorLocker.getBlockedDecors().length;
        const allBlocked = blockedCount === availableCount && availableCount > 0;

        // Create UI only once
        if (!switchHandle) {
            content.replaceChildren();

            // Toggle row
            const toggleRow = element("div", {
                style: `
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 12px;
                    background: color-mix(in oklab, var(--accent) 10%, transparent);
                    border-radius: 8px;
                `,
            });

            // Label (changes based on state)
            labelElement = element("div", {
                style: "font-size: 14px; font-weight: 500;",
            }, allBlocked ? "Decors Unpickable" : "Decors Pickable") as HTMLDivElement;

            // Switch
            switchHandle = Switch({
                checked: allBlocked,
                size: "md",
                onChange: (checked) => {
                    if (checked) {
                        MGDecorLocker.blockAllDecors();
                    } else {
                        MGDecorLocker.unblockAllDecors();
                    }
                },
            });

            cleanups.push(() => switchHandle?.destroy());

            toggleRow.appendChild(labelElement);
            toggleRow.appendChild(switchHandle.root);
            content.appendChild(toggleRow);
        } else {
            // Update existing switch state (this triggers the animation!)
            switchHandle.setChecked(allBlocked, true); // silent=true to avoid triggering onChange
            // Update label text
            if (labelElement) {
                labelElement.textContent = allBlocked ? "Decors Unpickable" : "Decors Pickable";
            }
        }
    }

    /* ───────────────────── Public API ───────────────────── */

    function render(): void {
        renderContent();
    }

    function destroy(): void {
        cleanups.forEach(fn => fn());
        cleanups.length = 0;
        content = null;
        card = null;
    }

    return {
        root: card,
        render,
        destroy,
    };
}

/* ─────────────────────────── Class Wrapper ─────────────────────────── */

export class DecorLockerCardPart {
    private handle: DecorLockerCardHandle | null = null;
    private options: DecorLockerCardOptions;

    constructor(options: DecorLockerCardOptions = {}) {
        this.options = options;
    }

    build(): HTMLDivElement {
        if (!this.handle) {
            this.handle = createDecorLockerCard(this.options);
        }
        return this.handle.root;
    }

    render(): void {
        this.handle?.render();
    }

    destroy(): void {
        this.handle?.destroy();
        this.handle = null;
    }
}
